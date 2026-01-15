import { isValidIl, findIl } from '@/constants';
import { EczaneQueryParams } from '@/types';

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  normalized?: EczaneQueryParams;
}

export function validateTarih(tarih: string): boolean {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  if (!regex.test(tarih)) return false;
  const date = new Date(tarih);
  return date instanceof Date && !isNaN(date.getTime());
}

export function normalizeIlce(ilce: string): string {
  return ilce
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .trim();
}

export function validateEczaneParams(params: {
  il?: string;
  ilce?: string;
  tarih?: string;
}): ValidationResult {
  const errors: string[] = [];

  if (!params.il) {
    errors.push('İl parametresi zorunludur.');
    return { valid: false, errors };
  }

  const il = findIl(params.il);
  if (!il) {
    errors.push(`Geçersiz il: ${params.il}`);
    return { valid: false, errors };
  }

  if (params.tarih && !validateTarih(params.tarih)) {
    errors.push('Geçersiz tarih formatı. YYYY-MM-DD formatında olmalıdır.');
    return { valid: false, errors };
  }

  const normalized: EczaneQueryParams = {
    il: il.ad,
    ilce: params.ilce ? normalizeIlce(params.ilce) : undefined,
    tarih: params.tarih || getTodayDate(),
  };

  return { valid: true, errors: [], normalized };
}

export function getTodayDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>\"\'&]/g, '')
    .trim()
    .slice(0, 100);
}
