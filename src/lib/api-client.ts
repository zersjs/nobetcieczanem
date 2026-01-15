import { API_CONFIG, ERROR_CODES, ERROR_MESSAGES } from '@/constants';
import { Eczane, EczaneQueryParams } from '@/types';

interface ExternalApiResponse {
  success?: boolean;
  veri?: RawEczane[];
  eczaneler?: Eczane[];
  data?: Eczane[];
  result?: Eczane[];
  [key: string]: unknown;
}

interface RawEczane {
  eczane_adı?: string;
  ilçe?: string;
  telefon?: string;
  adres?: string;
  [key: string]: unknown;
}

export class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public statusCode: number = 500
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = API_CONFIG.timeout
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function retryFetch(
  url: string,
  options: RequestInit = {},
  retries: number = API_CONFIG.retryCount
): Promise<Response> {
  let lastError: Error | null = null;
  for (let attempt = 0; attempt < retries; attempt++) {
    try {
      const response = await fetchWithTimeout(url, options);
      if (response.ok) return response;
      if (response.status >= 400 && response.status < 500) {
        throw new ApiError(
          ERROR_CODES.API_ERROR,
          `API hatası: ${response.status}`,
          response.status
        );
      }
    } catch (error) {
      lastError = error as Error;
      if (error instanceof ApiError && error.statusCode < 500) throw error;
      if (attempt < retries - 1) {
        await new Promise(resolve => 
          setTimeout(resolve, API_CONFIG.retryDelay * Math.pow(2, attempt))
        );
      }
    }
  }
  throw lastError || new ApiError(ERROR_CODES.NETWORK_ERROR, ERROR_MESSAGES[ERROR_CODES.NETWORK_ERROR]);
}

function buildUrl(params: EczaneQueryParams): string {
  const url = new URL(`${API_CONFIG.baseUrl}${API_CONFIG.endpoints.eczane}`);
  url.searchParams.set('il', params.il);
  return url.toString();
}

function parseApiResponse(data: ExternalApiResponse): Eczane[] {
  if (Array.isArray(data)) return data.map(e => normalizeEczane(e as unknown as Record<string, unknown>));
  if (data.veri && Array.isArray(data.veri)) {
    return data.veri.map(e => normalizeEczane(e as unknown as Record<string, unknown>));
  }
  if (data.eczaneler && Array.isArray(data.eczaneler)) {
    return data.eczaneler.map(e => normalizeEczane(e as unknown as Record<string, unknown>));
  }
  if (data.data && Array.isArray(data.data)) {
    return data.data.map(e => normalizeEczane(e as unknown as Record<string, unknown>));
  }
  if (data.result && Array.isArray(data.result)) {
    return data.result.map(e => normalizeEczane(e as unknown as Record<string, unknown>));
  }
  return [];
}

function normalizeEczane(eczane: Record<string, unknown>): Eczane {
  const lat = eczane.lat || eczane.latitude;
  const lng = eczane.lng || eczane.longitude;
  
  let adresi = String(eczane.adres || eczane.adresi || eczane.Adresi || eczane.address || '');
  if (!adresi && (eczane.mahalle || eczane.cadde_sokak)) {
    const parts = [
      eczane.mahalle,
      eczane.cadde_sokak,
      eczane.bina_kapi ? `No: ${eczane.bina_kapi}` : null
    ].filter(Boolean);
    adresi = parts.join(', ');
  }
  
  return {
    eczaneAdi: String(eczane.eczane_ad || eczane['eczane_adı'] || eczane.eczaneAdi || eczane.EczaneAdi || eczane.name || eczane.adi || ''),
    adresi,
    telefon: String(eczane.eczane_tel || eczane.telefon || eczane.Telefon || eczane.tel || eczane.phone || ''),
    il: String(eczane.il || eczane.Il || eczane.sehir || ''),
    ilce: String(eczane['ilçe'] || eczane.ilce || eczane.Ilce || eczane.district || ''),
    semt: eczane.semt ? String(eczane.semt) : undefined,
    latitude: typeof lat === 'number' ? lat : (typeof lat === 'string' ? parseFloat(lat) : undefined),
    longitude: typeof lng === 'number' ? lng : (typeof lng === 'string' ? parseFloat(lng) : undefined),
  };
}

async function fetchIstanbulEczaneler(): Promise<Eczane[]> {
  try {
    const response = await fetch(API_CONFIG.istanbulUrl, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/javascript, */*; q=0.01',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://www.istanbuleczaciodasi.org.tr',
        'Referer': 'https://www.istanbuleczaciodasi.org.tr/nobetci-eczane/',
      },
      body: '',
    });
    
    if (!response.ok) {
      throw new ApiError(
        ERROR_CODES.API_ERROR,
        `İstanbul API hatası: ${response.status}`,
        response.status
      );
    }
    
    const data: ExternalApiResponse = await response.json();
    return parseApiResponse(data);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(ERROR_CODES.TIMEOUT, ERROR_MESSAGES[ERROR_CODES.TIMEOUT], 408);
    }
    throw new ApiError(
      ERROR_CODES.NETWORK_ERROR,
      `İstanbul API bağlantı hatası: ${error instanceof Error ? error.message : 'Bilinmeyen hata'}`,
      503
    );
  }
}

export async function fetchEczaneler(params: EczaneQueryParams): Promise<Eczane[]> {
  if (params.il.toLowerCase() === 'istanbul') {
    return fetchIstanbulEczaneler();
  }
  
  const url = buildUrl(params);
  try {
    const response = await retryFetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const data: ExternalApiResponse = await response.json();
    return parseApiResponse(data);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError(ERROR_CODES.TIMEOUT, ERROR_MESSAGES[ERROR_CODES.TIMEOUT], 408);
    }
    throw new ApiError(
      ERROR_CODES.NETWORK_ERROR,
      ERROR_MESSAGES[ERROR_CODES.NETWORK_ERROR],
      503
    );
  }
}

export async function checkApiHealth(): Promise<boolean> {
  try {
    const url = `${API_CONFIG.baseUrl}${API_CONFIG.endpoints.eczane}?il=ankara`;
    const response = await fetchWithTimeout(url, {}, 5000);
    return response.ok;
  } catch {
    return false;
  }
}
