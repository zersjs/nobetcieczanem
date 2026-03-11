import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Header, Footer, Breadcrumb, LocalBusinessJsonLd, DateSeoJsonLd, PharmacyCard, DistrictSelect } from "@/components";
import { Pagination } from "./Pagination";
import { ILLER } from "@/constants/iller";
import { Eczane } from "@/types";
import { getShortDate, getSEODateKeywords, getISODate, getFormattedDate } from "@/lib/date-utils";
import { parseSlug, parseIlceSlug, parseSayfaSlug, buildCityUrl, normalizeForUrl } from "@/lib/url-utils";

import { fetchEczaneler } from '@/lib/api-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ITEMS_PER_PAGE = 12;

function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .replace(/ı/g, 'i')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
}

interface PageProps {
  params: Promise<{ slug: string; params?: string[] }>;
}

async function getPharmaciesForMeta(il: string): Promise<Eczane[]> {
  try {
    let eczaneler = await fetchEczaneler({ il, tarih: getISODate() });
    eczaneler = eczaneler.map(e => ({
      ...e,
      il: e.il || il,
    }));
    return eczaneler;
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
  const today = getISODate();
  const emptyResult = { data: [] as Eczane[], meta: { toplam: 0, tarih: today, guncellenme: new Date().toISOString() } };
  
  try {
    let eczaneler = await fetchEczaneler({ il, tarih: today });
    eczaneler = eczaneler.map(e => ({
      ...e,
      il: e.il || il,
    }));
    return { 
      data: eczaneler, 
      meta: { 
        toplam: eczaneler.length, 
        tarih: today, 
        guncellenme: new Date().toISOString() 
      } 
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
      <main className="flex-1 bg-gray-50">
        {/* Kompakt Header */}
        <section className="bg-white border-b border-gray-100 py-3 px-4">
          <div className="max-w-5xl mx-auto">
            <Breadcrumb items={breadcrumbItems} baseUrl={baseUrl} />
            <div className="flex items-center justify-between gap-3 mt-2">
              <div className="flex items-center gap-3">
                <div className="size-10 bg-red-100 rounded-lg flex items-center justify-center">
                  <svg className="size-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900">
                    {parsed.ilLabel} {selectedIlce && <span className="text-red-600">{selectedIlce}</span>}
                  </h1>
                  <p className="text-xs text-gray-500">{shortDate} · {filteredPharmacies.length} nöbetçi eczane</p>
                </div>
              </div>
              
              {/* İlçe Dropdown */}
              {districts.length > 1 && (
                <DistrictSelect
                  districts={districts}
                  selectedIlce={selectedIlce}
                  allPharmaciesCount={allPharmacies.length}
                  pharmacyCounts={Object.fromEntries(districts.map(d => [d, allPharmacies.filter(p => p.ilce === d).length]))}
                  baseUrl={buildCityUrl(parsed.il)}
                />
              )}
            </div>
          </div>
        </section>

        {/* Eczane Listesi */}
        <section className="max-w-5xl mx-auto px-4 py-4">
          {filteredPharmacies.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <svg className="size-12 text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Eczane Bulunamadı</h3>
              <p className="text-sm text-gray-500">
                {parsed.ilLabel}{selectedIlce ? ` ${selectedIlce}` : ""} için veri bulunamadı.
              </p>
            </div>
          ) : (
            <>
              {totalPages > 1 && (
                <p className="text-center text-xs text-gray-400 mb-3">
                  Sayfa {validPage} / {totalPages}
                </p>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
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
