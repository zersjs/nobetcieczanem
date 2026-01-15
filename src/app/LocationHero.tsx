"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import gsap from "gsap";
import { SearchForm } from "@/components";
import { ILLER } from "@/constants/iller";

interface LocationHeroProps {
  shortDate: string;
  formattedDate: string;
}

export function LocationHero({ shortDate, formattedDate }: LocationHeroProps) {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [loading, setLoading] = useState(false);
  const [locationFound, setLocationFound] = useState(false);
  const [nearestCity, setNearestCity] = useState<string | null>(null);

  useEffect(() => {
    if (heroRef.current) {
      gsap.fromTo(heroRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
    }
  }, []);

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
      toast.error("Konum desteği yok", { description: "Tarayıcınız konum özelliğini desteklemiyor." });
      return;
    }

    setLoading(true);
    if (buttonRef.current) {
      gsap.to(buttonRef.current, { scale: 0.95, duration: 0.1 });
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const nearest = findNearestCity(latitude, longitude);
        
        setNearestCity(nearest.label);
        setLocationFound(true);
        setLoading(false);

        if (buttonRef.current) {
          gsap.to(buttonRef.current, { scale: 1, duration: 0.2, ease: "back.out(1.7)" });
        }

        toast.success(`${nearest.label} bulundu!`, { description: "Nöbetçi eczanelere yönlendiriliyorsunuz..." });
        
        setTimeout(() => {
          router.push(`/${nearest.ad}-nobetci-eczane`);
        }, 800);
      },
      (error) => {
        setLoading(false);
        if (buttonRef.current) {
          gsap.to(buttonRef.current, { scale: 1, duration: 0.2 });
        }
        
        let message = "Konum alınamadı.";
        if (error.code === error.PERMISSION_DENIED) {
          message = "Konum izni reddedildi. Tarayıcı ayarlarından izin verin.";
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          message = "Konum bilgisi mevcut değil.";
        } else if (error.code === error.TIMEOUT) {
          message = "Konum isteği zaman aşımına uğradı.";
        }
        toast.error("Konum Hatası", { description: message });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 }
    );
  };

  const cities = ILLER.map((il) => ({ plaka: il.plaka, ad: il.ad, label: il.label }));

  return (
    <section className="w-full bg-gradient-to-b from-[var(--color-primary-muted)] to-transparent py-20 px-6">
      <div ref={heroRef} className="max-w-[960px] mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-red-500/10 to-rose-500/10 border border-red-500/20 text-red-600 text-xs font-semibold tracking-wider mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          CANLI · {shortDate.toUpperCase()}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight mb-6">
          <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">{shortDate}</span>
          <br />
          <span className="bg-gradient-to-r from-red-600 via-rose-600 to-red-600 bg-clip-text text-transparent">Nöbetçi Eczane</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-500 mb-10 max-w-xl mx-auto font-medium">
          <span className="text-gray-900 font-semibold">81 ilde</span> size en yakın açık eczaneleri anında bulun
        </p>

        <button
          ref={buttonRef}
          onClick={handleLocationClick}
          disabled={loading || locationFound}
          className="group mb-10 inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-2xl font-bold text-lg hover:from-red-700 hover:to-rose-700 shadow-xl shadow-red-500/25 transition-all duration-300 disabled:opacity-70 cursor-pointer disabled:cursor-wait active:scale-95 hover:shadow-2xl hover:shadow-red-500/30 hover:-translate-y-0.5"
        >
          {loading ? (
            <>
              <span className="material-symbols-outlined animate-spin">progress_activity</span>
              Konum Alınıyor...
            </>
          ) : locationFound ? (
            <>
              <span className="material-symbols-outlined">check_circle</span>
              {nearestCity} Bulundu
            </>
          ) : (
            <>
              <span className="material-symbols-outlined group-hover:animate-pulse">my_location</span>
              Konumuma Göre Bul
            </>
          )}
        </button>

        <div className="flex items-center justify-center gap-4 mb-10">
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-r from-transparent to-gray-300" />
          <span className="text-sm text-gray-400 font-medium tracking-wide">veya şehir seçin</span>
          <div className="h-px flex-1 max-w-[80px] bg-gradient-to-l from-transparent to-gray-300" />
        </div>

        <SearchForm cities={cities} />
      </div>
    </section>
  );
}
