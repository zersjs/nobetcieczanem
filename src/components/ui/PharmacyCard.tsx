"use client";

import { useRef, useEffect } from "react";
import { toast } from "sonner";
import gsap from "gsap";
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
  const cardRef = useRef<HTMLElement>(null);
  const callBtnRef = useRef<HTMLAnchorElement>(null);
  const directionsBtnRef = useRef<HTMLAnchorElement>(null);

  const cleanPhone = telefon.replace(/[^0-9+]/g, "");
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${eczaneAdi} Eczanesi ${adresi} ${ilce} ${il}`)}`;

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    }
  }, []);

  const animateButton = (element: HTMLElement | null) => {
    if (element) {
      gsap.fromTo(element, { scale: 0.95 }, { scale: 1, duration: 0.2, ease: "back.out(1.7)" });
    }
  };

  const handleCall = () => {
    animateButton(callBtnRef.current);
    toast.info("Aranıyor...", { description: `${eczaneAdi} aranıyor.`, duration: 1500 });
  };

  const handleDirections = () => {
    animateButton(directionsBtnRef.current);
    toast.info("Yol tarifi açılıyor...", { description: "Google Maps yönlendiriliyor.", duration: 1500 });
  };

  return (
    <article 
      ref={cardRef} 
      className="bg-[var(--color-bg-card)] p-6 rounded-xl border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all duration-300 shadow-sm hover:shadow-xl hover:-translate-y-1 group relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-muted)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      <div className="relative z-10">
        {showJsonLd && <PharmacyJsonLd name={eczaneAdi} address={adresi} telephone={telefon} city={il} district={ilce} date={tarih} />}
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300">{eczaneAdi}</h3>
          <span className="px-3 py-1.5 rounded-full bg-[var(--color-primary)] text-white text-[10px] font-bold uppercase shadow-sm group-hover:shadow-md transition-all duration-300">Nöbetçi</span>
        </div>
        <div className="flex items-start gap-3 mb-4 text-[var(--color-text-secondary)]">
          <span className="material-symbols-outlined text-[var(--color-primary)] shrink-0 group-hover:scale-110 transition-transform duration-300">location_on</span>
          <p className="text-sm leading-relaxed">{adresi}, {ilce} / {il}</p>
        </div>
        <div className="flex items-center gap-3 mb-6 text-[var(--color-primary)]">
          <span className="material-symbols-outlined shrink-0 text-xl group-hover:rotate-12 transition-transform duration-300">call</span>
          <a href={`tel:${cleanPhone}`} className="text-base font-bold hover:underline cursor-pointer">{telefon}</a>
        </div>
        <div className="flex gap-3">
          <a
            ref={callBtnRef}
            href={`tel:${cleanPhone}`}
            onClick={handleCall}
            className="flex-1 flex items-center justify-center gap-2 h-12 rounded-xl border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold text-sm hover:bg-[var(--color-primary)] hover:text-white transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
          >
            <span className="material-symbols-outlined text-lg">call</span>
            Ara
          </a>
          <a
            ref={directionsBtnRef}
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleDirections}
            className="flex-[1.5] flex items-center justify-center gap-2 h-12 rounded-xl bg-gradient-to-r from-[var(--color-primary)] to-[#ff4757] text-white font-bold text-sm hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 shadow-md"
          >
            <span className="material-symbols-outlined text-lg">directions</span>
            Yol Tarifi
          </a>
        </div>
      </div>
    </article>
  );
}

export function PharmacyCardSkeleton() {
  return (
    <div className="bg-[var(--color-bg-card)] p-6 rounded-xl border border-[var(--color-border)]">
      <div className="flex justify-between mb-4">
        <div className="skeleton w-32 h-6 rounded" />
        <div className="skeleton w-14 h-5 rounded" />
      </div>
      <div className="flex items-start gap-3 mb-4">
        <div className="skeleton size-5 rounded shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="skeleton w-full h-4 rounded" />
          <div className="skeleton w-2/3 h-4 rounded" />
        </div>
      </div>
      <div className="flex items-center gap-3 mb-6">
        <div className="skeleton size-5 rounded" />
        <div className="skeleton w-32 h-5 rounded" />
      </div>
      <div className="flex gap-2">
        <div className="skeleton flex-1 h-11 rounded-lg" />
        <div className="skeleton flex-[1.5] h-11 rounded-lg" />
      </div>
    </div>
  );
}
