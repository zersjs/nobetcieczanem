export interface Eczane {
  eczaneAdi: string;
  adresi: string;
  telefon: string;
  il: string;
  ilce: string;
  tarpihi?: string;
  semt?: string;
  latitude?: number;
  longitude?: number;
}

export interface EczaneApiResponse {
  success: boolean;
  data: Eczane[];
  meta: {
    il: string;
    ilce?: string;
    tarih: string;
    toplam: number;
    guncellenme: string;
  };
}

export interface EczaneApiError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: string;
  };
}

export interface EczaneQueryParams {
  il: string;
  ilce?: string;
  tarih?: string;
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresAt: number;
}

export type EczaneResponse = EczaneApiResponse | EczaneApiError;
