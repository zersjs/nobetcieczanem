"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { SearchForm } from "@/components";
import { ILLER } from "@/constants/iller";

interface LocationHeroProps {
  shortDate: string;
  formattedDate: string;
}

export function LocationHero({ shortDate, formattedDate }: LocationHeroProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const findNearestCity = (lat: number, lng: number) => {
    let nearest = ILLER[0];
    let minDistance = Infinity;

    for (const il of ILLER) {
      const distance = calculateDistance(lat, lng, il.lat, il.lng);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = il;
      }
    }
    return nearest;
  };

  const handleLocationClick = () => {
    if (!navigator.geolocation) {
      toast.error("Tarayıcınız konum özelliğini desteklemiyor");
      return;
    }

    setLoading(true);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearest = findNearestCity(latitude, longitude);
        setLoading(false);
        toast.success(`${nearest.label} bulundu`);
        router.push(`/${nearest.ad}-nobetci-eczane`);
      },
      () => {
        setLoading(false);
        toast.error("Konum alınamadı");
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  };

  const cities = ILLER.map((il) => ({ plaka: il.plaka, ad: il.ad, label: il.label }));

  return (
    <section className="bg-white py-12 px-4 border-b border-gray-100">
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-medium text-red-600 mb-2">{shortDate} · Güncel</p>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
          Nöbetçi Eczane Bul
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Türkiye genelinde 81 ilde açık eczaneleri bulun
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-6">
          <button
            onClick={handleLocationClick}
            disabled={loading}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
            {loading ? "Konum alınıyor..." : "Konumuma Göre Bul"}
          </button>
        </div>

        <div className="flex items-center gap-3 justify-center mb-6">
          <span className="h-px w-12 bg-gray-200"></span>
          <span className="text-xs text-gray-400">veya şehir seçin</span>
          <span className="h-px w-12 bg-gray-200"></span>
        </div>

        <div className="max-w-md mx-auto">
          <SearchForm cities={cities} />
        </div>
      </div>
    </section>
  );
}
