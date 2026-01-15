import { ILLER, findIl } from "@/constants/iller";

export function normalizeForUrl(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function parseSlug(slug: string): { il: string; ilLabel: string } | null {
  const match = slug.match(/^(.+)-nobetci-eczane$/);
  if (!match) return null;

  const ilSlug = match[1];

  for (const il of ILLER) {
    if (normalizeForUrl(il.label) === ilSlug || il.ad === ilSlug) {
      return { il: il.ad, ilLabel: il.label };
    }
  }

  return null;
}

export function parseIlceSlug(ilceSlug: string, allDistricts: string[]): string | null {
  for (const district of allDistricts) {
    if (normalizeForUrl(district) === ilceSlug) {
      return district;
    }
  }
  return null;
}

export function parseSayfaSlug(sayfaSlug: string): number | null {
  const match = sayfaSlug.match(/^sayfa-(\d+)$/);
  if (!match) return null;
  const page = parseInt(match[1], 10);
  return page > 0 ? page : null;
}

export function buildCityUrl(il: string, ilce?: string, sayfa?: number): string {
  const city = findIl(il);
  if (!city) return "/";

  const baseSlug = `/${normalizeForUrl(city.label)}-nobetci-eczane`;

  if (!ilce && !sayfa) return baseSlug;
  if (!ilce && sayfa && sayfa > 1) return `${baseSlug}/sayfa-${sayfa}`;
  if (ilce && !sayfa) return `${baseSlug}/${normalizeForUrl(ilce)}`;
  if (ilce && sayfa && sayfa > 1) return `${baseSlug}/${normalizeForUrl(ilce)}/sayfa-${sayfa}`;

  return baseSlug;
}

export function generateAllCitySlugs(): { slug: string }[] {
  return ILLER.map((il) => ({
    slug: `${normalizeForUrl(il.label)}-nobetci-eczane`,
  }));
}
