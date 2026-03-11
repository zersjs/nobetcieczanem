export * from './iller';

export const API_CONFIG = {
  eczanelerGenTr: {
    baseUrl: 'https://www.eczaneler.gen.tr',
  },
  istanbulUrl: 'https://www.istanbuleczaciodasi.org.tr/nobetci-eczane/index.php',
  timeout: 15000,
  retryCount: 3,
  retryDelay: 1000,
} as const;

export const CACHE_CONFIG = {
  defaultTTL: 5 * 60 * 1000,
  maxEntries: 100,
} as const;

export const ERROR_CODES = {
  INVALID_IL: 'INVALID_IL',
  INVALID_TARIH: 'INVALID_TARIH',
  API_ERROR: 'API_ERROR',
  TIMEOUT: 'TIMEOUT',
  NETWORK_ERROR: 'NETWORK_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL_ERROR: 'INTERNAL_ERROR',
} as const;

export const ERROR_MESSAGES: Record<string, string> = {
  [ERROR_CODES.INVALID_IL]: 'Geçersiz il adı. Lütfen geçerli bir il adı giriniz.',
  [ERROR_CODES.INVALID_TARIH]: 'Geçersiz tarih formatı. YYYY-MM-DD formatında giriniz.',
  [ERROR_CODES.API_ERROR]: 'Harici API\'den veri alınamadı.',
  [ERROR_CODES.TIMEOUT]: 'İstek zaman aşımına uğradı.',
  [ERROR_CODES.NETWORK_ERROR]: 'Ağ bağlantı hatası oluştu.',
  [ERROR_CODES.NOT_FOUND]: 'Belirtilen kriterlere uygun nöbetçi eczane bulunamadı.',
  [ERROR_CODES.INTERNAL_ERROR]: 'Sunucu hatası oluştu.',
};
