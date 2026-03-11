import { API_CONFIG, ERROR_CODES, findIl } from "@/constants";
import { Eczane, EczaneQueryParams } from "@/types";

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
    public statusCode: number = 500,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

async function fetchWithTimeout(
  url: string,
  options: RequestInit = {},
  timeout: number = API_CONFIG.timeout,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, {
      ...options,
      cache: 'no-store',
      signal: controller.signal,
    });
    return response;
  } finally {
    clearTimeout(timeoutId);
  }
}

function parseApiResponse(data: ExternalApiResponse): Eczane[] {
  if (Array.isArray(data))
    return data.map((e) => normalizeEczane(e as unknown as Record<string, unknown>));
  if (data.veri && Array.isArray(data.veri))
    return data.veri.map((e) => normalizeEczane(e as unknown as Record<string, unknown>));
  if (data.eczaneler && Array.isArray(data.eczaneler))
    return data.eczaneler.map((e) => normalizeEczane(e as unknown as Record<string, unknown>));
  if (data.data && Array.isArray(data.data))
    return data.data.map((e) => normalizeEczane(e as unknown as Record<string, unknown>));
  if (data.result && Array.isArray(data.result))
    return data.result.map((e) => normalizeEczane(e as unknown as Record<string, unknown>));
  return [];
}

function normalizeEczane(eczane: Record<string, unknown>): Eczane {
  const lat = eczane.lat || eczane.latitude;
  const lng = eczane.lng || eczane.longitude;

  let adresi = String(eczane.adres || eczane.adresi || eczane.Adresi || eczane.address || "");
  if (!adresi && (eczane.mahalle || eczane.cadde_sokak)) {
    const parts = [eczane.mahalle, eczane.cadde_sokak, eczane.bina_kapi ? `No: ${eczane.bina_kapi}` : null].filter(Boolean);
    adresi = parts.join(", ");
  }

  return {
    eczaneAdi: String(eczane.eczane_ad || eczane["eczane_adı"] || eczane.eczaneAdi || eczane.EczaneAdi || eczane.name || eczane.adi || ""),
    adresi,
    telefon: String(eczane.eczane_tel || eczane.telefon || eczane.Telefon || eczane.tel || eczane.phone || ""),
    il: String(eczane.il || eczane.Il || eczane.sehir || ""),
    ilce: String(eczane["ilçe"] || eczane.ilce || eczane.Ilce || eczane.district || ""),
    semt: eczane.semt ? String(eczane.semt) : undefined,
    latitude: typeof lat === "number" ? lat : typeof lat === "string" ? parseFloat(lat) : undefined,
    longitude: typeof lng === "number" ? lng : typeof lng === "string" ? parseFloat(lng) : undefined,
  };
}

async function fetchIstanbulEczaneler(): Promise<Eczane[]> {
  try {
    const response = await fetchWithTimeout(API_CONFIG.istanbulUrl, {
      method: "POST",
      headers: {
        Accept: "application/json, text/javascript, */*; q=0.01",
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        Origin: "https://www.istanbuleczaciodasi.org.tr",
        Referer: "https://www.istanbuleczaciodasi.org.tr/nobetci-eczane/",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
      body: "ilce=&hsv=",
    });

    if (!response.ok) {
      throw new ApiError(ERROR_CODES.API_ERROR, `İstanbul API hatası: ${response.status}`, response.status);
    }

    const data: ExternalApiResponse = await response.json();
    return parseApiResponse(data);
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(ERROR_CODES.NETWORK_ERROR, `İstanbul API bağlantı hatası`, 503);
  }
}

function slugifyCity(cityName: string): string {
  const turkishMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'c', 'ğ': 'g', 'Ğ': 'g', 'ı': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o', 'ş': 's', 'Ş': 's', 'ü': 'u', 'Ü': 'u',
  };
  return cityName.split('').map(char => turkishMap[char] || char).join('').toLowerCase().replace(/\s+/g, '-');
}

async function fetchFromEczanelerGenTr(il: string): Promise<Eczane[]> {
  const slug = slugifyCity(il);
  const url = `${API_CONFIG.eczanelerGenTr.baseUrl}/nobetci-${slug}`;
  
  try {
    const response = await fetchWithTimeout(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml',
        'Accept-Language': 'tr-TR,tr;q=0.9',
      },
    });
    
    if (!response.ok) return [];
    
    const html = await response.text();
    return parseEczanelerGenTrHtml(html, il);
  } catch {
    return [];
  }
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&raquo;/g, '»')
    .replace(/&nbsp;/g, ' ');
}

function parseEczanelerGenTrHtml(html: string, il: string): Eczane[] {
  const eczaneler: Eczane[] = [];
  const seen = new Set<string>();
  
  const rowPattern = /<tr><td colspan="3" class="border-bottom">[\s\S]*?<\/tr>/gi;
  const rows = html.match(rowPattern) || [];
  
  for (const row of rows) {
    const nameMatch = row.match(/<span class="isim">([^<]+)<\/span>/i);
    if (!nameMatch) continue;
    
    const eczaneAdi = decodeHtmlEntities(nameMatch[1].trim());
    
    const uniqueKey = eczaneAdi.toLowerCase();
    if (seen.has(uniqueKey)) continue;
    seen.add(uniqueKey);
    
    const ilceMatch = row.match(/<span class="[^"]*bg-(?:info|secondary)[^"]*">([^<]+)<\/span>/i);
    const ilce = ilceMatch ? decodeHtmlEntities(ilceMatch[1].trim()) : '';
    
    let adresi = '';
    const adresMatch = row.match(/<div class='col-lg-6'>([^<]+)/i);
    if (adresMatch) {
      adresi = decodeHtmlEntities(adresMatch[1].trim());
    }
    
    const phoneMatch = row.match(/<div class='col-lg-3 py-lg-2'>([^<]+)<\/div>/i);
    const telefon = phoneMatch ? phoneMatch[1].trim().replace(/\s/g, '') : '';
    
    const coordMatch = row.match(/maps\?daddr=([\d.-]+),([\d.-]+)/i);
    let latitude: number | undefined;
    let longitude: number | undefined;
    if (coordMatch) {
      latitude = parseFloat(coordMatch[1]);
      longitude = parseFloat(coordMatch[2]);
    }
    
    eczaneler.push({
      eczaneAdi,
      adresi,
      telefon,
      il,
      ilce,
      latitude: !isNaN(latitude!) ? latitude : undefined,
      longitude: !isNaN(longitude!) ? longitude : undefined,
    });
  }
  
  if (eczaneler.length === 0) {
    const simpleNamePattern = /<b>([^<]+Eczanesi)<\/b>/gi;
    let match;
    while ((match = simpleNamePattern.exec(html)) !== null) {
      const name = decodeHtmlEntities(match[1].trim());
      if (!seen.has(name.toLowerCase())) {
        seen.add(name.toLowerCase());
        
        const afterName = html.substring(match.index, match.index + 1500);
        
        const phoneMatch = afterName.match(/(\d[\s()]?\d{3}[\s()-]?\d{2,3}[\s()-]?\d{2}[\s()-]?\d{2})/);
        const coordMatch = afterName.match(/maps\?daddr=([\d.-]+),([\d.-]+)/i);
        const ilceMatch = afterName.match(/\(([^)]+)\)<\/td>/);
        const addrMatch = afterName.match(/<td[^>]*>([^<]*Mahallesi[^<]*)<\/td>/i);
        
        let latitude: number | undefined;
        let longitude: number | undefined;
        if (coordMatch) {
          latitude = parseFloat(coordMatch[1]);
          longitude = parseFloat(coordMatch[2]);
        }
        
        eczaneler.push({
          eczaneAdi: name,
          adresi: addrMatch ? decodeHtmlEntities(addrMatch[1].trim()) : '',
          telefon: phoneMatch ? phoneMatch[1].replace(/\s/g, '') : '',
          il,
          ilce: ilceMatch ? decodeHtmlEntities(ilceMatch[1].trim()) : '',
          latitude: !isNaN(latitude!) ? latitude : undefined,
          longitude: !isNaN(longitude!) ? longitude : undefined,
        });
      }
    }
  }
  
  return eczaneler;
}

async function fetchEczanelerInternal(params: EczaneQueryParams): Promise<Eczane[]> {
  const il = findIl(params.il);
  const ilLabel = il?.label || params.il;
  
  const isIstanbul = params.il.toLowerCase() === "istanbul" || params.il.toLowerCase() === "istanbul" || ilLabel.toLowerCase() === "istanbul" || ilLabel === "İstanbul";
  
  if (isIstanbul) {
    console.log(`[API] İstanbul Eczacı Odası kullanılıyor`);
    try {
      return await fetchIstanbulEczaneler();
    } catch {
      console.log(`[API] İstanbul API başarısız, eczaneler.gen.tr deneniyor`);
      return await fetchFromEczanelerGenTr("İstanbul");
    }
  }

  console.log(`[API] eczaneler.gen.tr kullanılıyor - ${ilLabel}`);
  const data = await fetchFromEczanelerGenTr(ilLabel);
  console.log(`[API] ${ilLabel}: ${data.length} eczane bulundu`);
  return data;
}

export const fetchEczaneler = fetchEczanelerInternal;

export async function checkApiHealth(): Promise<boolean> {
  try {
    const response = await fetchWithTimeout(`${API_CONFIG.eczanelerGenTr.baseUrl}/nobetci-istanbul`, {}, 5000);
    return response.ok;
  } catch {
    return false;
  }
}
