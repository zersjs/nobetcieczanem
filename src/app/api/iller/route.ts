import { NextResponse } from 'next/server';
import { ILLER } from '@/constants';

export const dynamic = 'force-static';
export const revalidate = 86400;

export async function GET(): Promise<NextResponse> {
  const iller = ILLER.map(il => ({
    plaka: il.plaka,
    ad: il.ad,
    label: il.label,
  }));

  return NextResponse.json(
    {
      success: true,
      data: iller,
      meta: {
        toplam: iller.length,
      },
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=86400, immutable',
      },
    }
  );
}
