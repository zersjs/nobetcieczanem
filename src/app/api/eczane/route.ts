import { NextRequest, NextResponse } from 'next/server';
import { validateEczaneParams, sanitizeInput, getTodayDate } from '@/lib/validator';
import { fetchEczaneler, ApiError } from '@/lib/api-client';
import { ERROR_CODES, ERROR_MESSAGES, findIl } from '@/constants';
import { Eczane, EczaneApiResponse, EczaneApiError } from '@/types';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function createErrorResponse(
  code: string,
  message: string,
  status: number = 400
): Promise<NextResponse> {
  const errorData = {
    success: false,
    error: { code, message },
  };
  return NextResponse.json(errorData, { status });
}

async function createSuccessResponse(
  eczaneler: Eczane[],
  params: { il: string; ilce?: string; tarih: string }
): Promise<NextResponse> {
  const il = findIl(params.il);
  const responseData: EczaneApiResponse = {
    success: true,
    data: eczaneler,
    meta: {
      il: il?.label || params.il,
      ilce: params.ilce,
      tarih: params.tarih,
      toplam: eczaneler.length,
      guncellenme: new Date().toISOString(),
    },
  };
  return NextResponse.json(responseData, {
    status: 200,
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      'X-Response-Time': `${Date.now()}`,
    },
  });
}

export async function GET(request: NextRequest): Promise<NextResponse> {
  const startTime = Date.now();
  try {
    const { searchParams } = new URL(request.url);
    const rawIl = searchParams.get('il');
    const rawIlce = searchParams.get('ilce');
    const rawTarih = searchParams.get('tarih');

    const validation = validateEczaneParams({
      il: rawIl ? sanitizeInput(rawIl) : undefined,
      ilce: rawIlce ? sanitizeInput(rawIlce) : undefined,
      tarih: rawTarih ? sanitizeInput(rawTarih) : undefined,
    });

    if (!validation.valid || !validation.normalized) {
      return await createErrorResponse(
        ERROR_CODES.INVALID_IL,
        validation.errors.join(' ')
      );
    }

    const { normalized } = validation;
    const rawEczaneler = await fetchEczaneler(normalized);
    let eczaneler = rawEczaneler.map(e => ({
      ...e,
      il: e.il || findIl(normalized.il)?.label || normalized.il,
    }));
    
    if (normalized.ilce) {
      const normalizeText = (text: string) => text
        .toLowerCase()
        .replace(/ı/g, 'i')
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c');
      const ilceNormalized = normalizeText(normalized.ilce);
      eczaneler = eczaneler.filter(e => {
        const eczaneIlce = normalizeText(e.ilce);
        return eczaneIlce.includes(ilceNormalized) || ilceNormalized.includes(eczaneIlce);
      });
    }

    const response = await createSuccessResponse(eczaneler, {
      il: normalized.il,
      ilce: normalized.ilce,
      tarih: normalized.tarih || getTodayDate(),
    });
    response.headers.set('X-Cache', 'MISS');
    response.headers.set('X-Response-Time', `${Date.now() - startTime}ms`);
    return response;
  } catch (error) {
    if (error instanceof ApiError) {
      return await createErrorResponse(error.code, error.message, error.statusCode);
    }
    return await createErrorResponse(
      ERROR_CODES.INTERNAL_ERROR,
      ERROR_MESSAGES[ERROR_CODES.INTERNAL_ERROR],
      500
    );
  }
}
