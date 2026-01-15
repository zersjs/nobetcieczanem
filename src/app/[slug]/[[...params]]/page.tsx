import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer, StatusBar, Breadcrumb, LocalBusinessJsonLd, DateSeoJsonLd, SearchForm, PharmacyCard, PharmacyCardSkeleton } from "@/components";
import { Pagination } from "./Pagination";
import { ILLER } from "@/constants/iller";
import { Eczane, EczaneApiResponse } from "@/types";
import { getFormattedDate, getShortDate, getSEODateKeywords, getISODate } from "@/lib/date-utils";
import { parseSlug, parseIlceSlug, parseSayfaSlug, buildCityUrl, normalizeForUrl } from "@/lib/url-utils";
import { decryptData, isEncryptedResponse } from "@/lib/crypto";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ITEMS_PER_PAGE = 12;

interface PageProps {
  params: Promise<{ slug: string; params?: string[] }>;
}

async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url, { cache: 'no-store' });
    if (response.ok) return response;
    if (i < retries - 1) await new Promise(r => setTimeout(r, 500 * (i + 1)));
  }
  throw new Error('Fetch failed after retries');
}

async function getPharmaciesForMeta(il: string): Promise<Eczane[]> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  try {
    const response = await fetchWithRetry(`${baseUrl}/api/eczane?il=${il}`);
    const rawResult = await response.json();
    let result: EczaneApiResponse;
    if (isEncryptedResponse(rawResult)) {
      result = await decryptData<EczaneApiResponse>(rawResult._e);
    } else {
      result = rawResult;
    }
    if (!result.success) return [];
    return result.data || [];
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, params: urlParams } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) return { title: "Sayfa Bulunamadı" };

  const today = new Date();
  const shortDate = getShortDate(today);
  const formattedDate = getFormattedDate(today);
  const dateKeywords = getSEODateKeywords(today);

  let ilceLabel = "";
  let pageNum = 1;

  if (urlParams && urlParams.length > 0) {
    const firstParam = urlParams[0];
    const sayfaFirst = parseSayfaSlug(firstParam);
    if (sayfaFirst) {
      pageNum = sayfaFirst;
    } else {
      ilceLabel = firstParam.replace(/-/g, " ");
      if (urlParams.length > 1) {
        const sayfaSecond = parseSayfaSlug(urlParams[1]);
        if (sayfaSecond) pageNum = sayfaSecond;
      }
    }
  }

  const allPharmacies = await getPharmaciesForMeta(parsed.il);
  const filteredPharmacies = ilceLabel
    ? allPharmacies.filter((p) => normalizeForUrl(p.ilce) === normalizeForUrl(ilceLabel))
    : allPharmacies;

  const pharmacyNames = filteredPharmacies.slice(0, 5).map((p) => p.eczaneAdi).join(" · ");
  const pageText = pageNum > 1 ? ` Sayfa ${pageNum}` : "";
  const ilceText = ilceLabel ? ` ${ilceLabel}` : "";
  const title = `${parsed.ilLabel}${ilceText} Nöbetçi Eczane Listesi ${shortDate}${pageText}`;
  const description = pharmacyNames
    ? `${parsed.ilLabel}${ilceText} nöbetçi eczaneler: ${pharmacyNames}. ${formattedDate} güncel adres ve telefon bilgileri.`
    : `${formattedDate} tarihinde ${parsed.ilLabel}${ilceText} nöbetçi eczane listesi${pageText}. Güncel adres, telefon ve harita bilgileri.`;

  const canonicalUrl = buildCityUrl(parsed.il, ilceLabel || undefined, pageNum > 1 ? pageNum : undefined);

  return {
    title,
    description,
    keywords: [
      `${parsed.ilLabel} nöbetçi eczane`,
      `${parsed.ilLabel} nöbetçi eczane ${shortDate}`,
      `${shortDate} ${parsed.ilLabel} nöbetçi eczane`,
      `${parsed.ilLabel} açık eczane`,
      ...dateKeywords.map((k) => `${parsed.ilLabel} ${k}`),
      ...(ilceLabel ? [`${ilceLabel} nöbetçi eczane`, `${parsed.ilLabel} ${ilceLabel} nöbetçi eczane`] : []),
    ],
    openGraph: { title, description, type: "website", locale: "tr_TR" },
    twitter: { card: "summary", title, description },
    alternates: { canonical: canonicalUrl },
  };
}

async function getPharmacies(il: string): Promise<{ data: Eczane[]; meta: { toplam: number; tarih: string; guncellenme: string } }> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const emptyResult = { data: [] as Eczane[], meta: { toplam: 0, tarih: "", guncellenme: "" } };
  
  try {
    const response = await fetchWithRetry(`${baseUrl}/api/eczane?il=${il}`);
    const rawResult = await response.json();
    
    let result: EczaneApiResponse;
    if (isEncryptedResponse(rawResult)) {
      result = await decryptData<EczaneApiResponse>(rawResult._e);
    } else {
      result = rawResult;
    }
    
    if (!result.success || !result.data) return emptyResult;
    
    return { 
      data: result.data, 
      meta: result.meta || { toplam: result.data.length, tarih: "", guncellenme: new Date().toISOString() } 
    };
  } catch {
    return emptyResult;
  }
}

export default async function CityPage({ params }: PageProps) {
  const { slug, params: urlParams } = await params;
  const parsed = parseSlug(slug);
  if (!parsed) notFound();

  const { data: allPharmacies, meta } = await getPharmacies(parsed.il);
  const cities = ILLER.map((i) => ({ plaka: i.plaka, ad: i.ad, label: i.label }));
  const today = new Date();
  const shortDate = getShortDate(today);
  const isoDate = getISODate(today);
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";

  const districts = [...new Set(allPharmacies.map((p) => p.ilce).filter(Boolean))].sort();

  let selectedIlce: string | null = null;
  let currentPage = 1;

  if (urlParams && urlParams.length > 0) {
    const firstParam = urlParams[0];
    const sayfaFirst = parseSayfaSlug(firstParam);

    if (sayfaFirst) {
      currentPage = sayfaFirst;
    } else {
      selectedIlce = parseIlceSlug(firstParam, districts);
      if (!selectedIlce && districts.length > 0) {
        const normalizedFirst = firstParam.replace(/-/g, " ");
        for (const d of districts) {
          if (normalizeForUrl(d) === normalizeForUrl(normalizedFirst)) {
            selectedIlce = d;
            break;
          }
        }
      }

      if (urlParams.length > 1) {
        const sayfaSecond = parseSayfaSlug(urlParams[1]);
        if (sayfaSecond) currentPage = sayfaSecond;
      }
    }
  }

  const filteredPharmacies = selectedIlce
    ? allPharmacies.filter((p) => normalizeForUrl(p.ilce) === normalizeForUrl(selectedIlce!))
    : allPharmacies;

  const totalPages = Math.ceil(filteredPharmacies.length / ITEMS_PER_PAGE);
  const validPage = Math.min(currentPage, Math.max(1, totalPages));
  const startIndex = (validPage - 1) * ITEMS_PER_PAGE;
  const pharmacies = filteredPharmacies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const breadcrumbItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: `${parsed.ilLabel} Nöbetçi Eczane`, href: buildCityUrl(parsed.il) },
  ];

  if (selectedIlce) {
    breadcrumbItems.push({ name: selectedIlce, href: buildCityUrl(parsed.il, selectedIlce) });
  }

  if (validPage > 1) {
    breadcrumbItems.push({ name: `Sayfa ${validPage}`, href: buildCityUrl(parsed.il, selectedIlce || undefined, validPage) });
  }

  return (
    <>
      <LocalBusinessJsonLd city={parsed.ilLabel} pharmacyCount={filteredPharmacies.length} date={isoDate} />
      <DateSeoJsonLd city={parsed.ilLabel} date={today} />
      <Header />
      <main className="flex-1">
        <section className="w-full bg-gradient-to-b from-[var(--color-primary-muted)] to-transparent py-12 px-6">
          <div className="max-w-[960px] mx-auto">
            <Breadcrumb items={breadcrumbItems} baseUrl={baseUrl} />
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-primary-muted)] text-[var(--color-primary)] text-xs font-bold mb-4">
                <span className="material-symbols-outlined text-sm mr-1">calendar_today</span>
                {shortDate.toUpperCase()}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4 text-[var(--color-text)]">
                {parsed.ilLabel} {selectedIlce && <span className="text-[var(--color-primary)]">{selectedIlce}</span>} Nöbetçi Eczane
                {validPage > 1 && <span className="text-[var(--color-text-secondary)] text-2xl md:text-3xl"> - Sayfa {validPage}</span>}
              </h1>
              <p className="text-[var(--color-text-secondary)] mb-8">
                {shortDate} tarihinde {parsed.ilLabel}{selectedIlce ? ` ${selectedIlce}` : ""} nöbetçi eczane listesi
              </p>
            </div>
            <SearchForm cities={cities} initialCity={parsed.il} initialDistrict={selectedIlce || ""} />
          </div>
        </section>

        {filteredPharmacies.length > 0 && (
          <StatusBar city={parsed.ilLabel} district={selectedIlce || undefined} count={filteredPharmacies.length} lastUpdate={meta.guncellenme || new Date().toISOString()} />
        )}

        {districts.length > 1 && (
          <div className="max-w-[1200px] mx-auto px-6 py-4">
            <div className="flex flex-wrap gap-2">
              <a href={buildCityUrl(parsed.il)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer active:scale-95 ${!selectedIlce ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] text-[var(--color-text)]"}`}>
                Tümü ({allPharmacies.length})
              </a>
              {districts.map((district) => {
                const count = allPharmacies.filter((p) => p.ilce === district).length;
                const isActive = selectedIlce && normalizeForUrl(selectedIlce) === normalizeForUrl(district);
                return (
                  <a
                    key={district}
                    href={buildCityUrl(parsed.il, district)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer active:scale-95 ${isActive ? "bg-[var(--color-primary)] text-white" : "bg-[var(--color-bg-card)] border border-[var(--color-border)] hover:border-[var(--color-border-hover)] text-[var(--color-text)]"}`}
                  >
                    {district} ({count})
                  </a>
                );
              })}
            </div>
          </div>
        )}

        <section className="w-full max-w-[1200px] mx-auto px-6 pb-20">
          {filteredPharmacies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="size-24 bg-[var(--color-primary-muted)] rounded-full flex items-center justify-center text-[var(--color-primary)] mb-6">
                <span className="material-symbols-outlined text-5xl">search_off</span>
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[var(--color-text)]">Eczane Bulunamadı</h3>
              <p className="text-[var(--color-text-secondary)] max-w-md mb-4">
                {parsed.ilLabel}{selectedIlce ? ` ${selectedIlce}` : ""} için {shortDate} tarihinde nöbetçi eczane verisi bulunmamaktadır.
              </p>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Toplam <strong className="text-[var(--color-primary)]">{filteredPharmacies.length}</strong> eczane bulundu
                  {totalPages > 1 && ` • Sayfa ${validPage}/${totalPages}`}
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pharmacies.map((pharmacy, index) => (
                  <PharmacyCard
                    key={`${pharmacy.eczaneAdi}-${startIndex + index}`}
                    eczaneAdi={pharmacy.eczaneAdi}
                    adresi={pharmacy.adresi}
                    telefon={pharmacy.telefon}
                    il={pharmacy.il || parsed.ilLabel}
                    ilce={pharmacy.ilce}
                    tarih={isoDate}
                    showJsonLd={index < 10 && validPage === 1}
                  />
                ))}
                {pharmacies.length > 0 && pharmacies.length < 3 && totalPages === 1 && <PharmacyCardSkeleton />}
              </div>
              {totalPages > 1 && (
                <Pagination
                  currentPage={validPage}
                  totalPages={totalPages}
                  il={parsed.il}
                  ilce={selectedIlce || undefined}
                />
              )}
            </>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
