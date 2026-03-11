"use client";

import { PharmacyJsonLd } from "@/components/seo/JsonLd";

interface PharmacyCardProps {
  eczaneAdi: string;
  adresi: string;
  telefon: string;
  il: string;
  ilce: string;
  tarih?: string;
  showJsonLd?: boolean;
}

export function PharmacyCard({ eczaneAdi, adresi, telefon, il, ilce, tarih, showJsonLd = false }: PharmacyCardProps) {
  const cleanPhone = telefon.replace(/[^0-9+]/g, "");
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${eczaneAdi} ${adresi} ${ilce} ${il}`)}`;

  return (
    <article className="bg-white p-4 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors">
      {showJsonLd && <PharmacyJsonLd name={eczaneAdi} address={adresi} telephone={telefon} city={il} district={ilce} date={tarih} />}
      
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-start gap-2.5">
          <div className="size-8 bg-red-50 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <svg className="size-4 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 leading-tight">{eczaneAdi}</h3>
            <span className="text-xs text-gray-500">{ilce}</span>
          </div>
        </div>
        <span className="shrink-0 px-2 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-600">Açık</span>
      </div>
      
      <p className="text-xs text-gray-500 mb-3 leading-relaxed line-clamp-2">{adresi || `${ilce}, ${il}`}</p>
      
      <div className="flex gap-2">
        <a
          href={`tel:${cleanPhone}`}
          className="flex-1 flex items-center justify-center gap-1.5 h-9 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          {telefon || "Ara"}
        </a>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 px-3 h-9 rounded-lg border border-gray-200 text-gray-600 text-sm font-medium hover:border-gray-300 hover:text-gray-900 transition-colors"
        >
          <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Yol
        </a>
      </div>
    </article>
  );
}

export function PharmacyCardSkeleton() {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 animate-pulse">
      <div className="flex items-start justify-between gap-2 mb-3">
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-32 mb-1" />
          <div className="h-3 bg-gray-200 rounded w-20" />
        </div>
        <div className="h-5 bg-gray-200 rounded w-10" />
      </div>
      <div className="h-3 bg-gray-200 rounded w-full mb-1" />
      <div className="h-3 bg-gray-200 rounded w-2/3 mb-3" />
      <div className="flex gap-2">
        <div className="flex-1 h-9 bg-gray-200 rounded-lg" />
        <div className="h-9 bg-gray-200 rounded-lg w-16" />
      </div>
    </div>
  );
}
