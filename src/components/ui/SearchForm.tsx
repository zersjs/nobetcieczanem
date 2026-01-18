"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import gsap from "gsap";

import { getDistricts } from "@/app/actions";

interface City {
  plaka: number;
  ad: string;
  label: string;
}

interface SearchFormProps {
  cities: City[];
  initialCity?: string;
  initialDistrict?: string;
}

export function SearchForm({ cities, initialCity = "", initialDistrict = "" }: SearchFormProps) {
  const router = useRouter();
  const formRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [districts, setDistricts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(formRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" });
    }
  }, []);

  useEffect(() => {
    if (selectedCity) {
      setLoading(true);
      getDistricts(selectedCity)
        .then((result) => {
          if (result.success && result.data) {
            setDistricts(result.data);
          } else {
            setDistricts([]);
          }
        })
        .catch(() => setDistricts([]))
        .finally(() => setLoading(false));
    } else {
      setDistricts([]);
    }
  }, [selectedCity]);

  const normalizeForUrl = (text: string) => {
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
  };

  const handleSearch = () => {
    if (!selectedCity) {
      toast.error("Lütfen bir il seçin", { description: "Arama yapmak için önce il seçmelisiniz." });
      return;
    }

    if (buttonRef.current) {
      gsap.fromTo(buttonRef.current, { scale: 0.95 }, { scale: 1, duration: 0.2, ease: "back.out(1.7)" });
    }

    const baseUrl = `/${selectedCity}-nobetci-eczane`;
    const targetUrl = selectedDistrict ? `${baseUrl}/${normalizeForUrl(selectedDistrict)}` : baseUrl;

    router.push(targetUrl);
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict("");
  };

  return (
    <div ref={formRef} className="bg-[var(--color-bg)] p-4 rounded-xl shadow-xl border border-[var(--color-border)] flex flex-col md:flex-row gap-4 items-end">
      <div className="flex flex-col w-full md:flex-1 text-left">
        <label className="text-xs font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider ml-1">İl Seçiniz</label>
        <select
          value={selectedCity}
          onChange={handleCityChange}
          className="custom-select-icon w-full h-14 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] px-4 text-base font-medium cursor-pointer transition-all hover:border-[var(--color-border-hover)]"
        >
          <option value="">Şehir Seçin</option>
          {cities.map((city) => (
            <option key={city.plaka} value={city.ad}>{city.label}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col w-full md:flex-1 text-left">
        <label className="text-xs font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wider ml-1">İlçe Seçiniz</label>
        <select
          value={selectedDistrict}
          onChange={(e) => setSelectedDistrict(e.target.value)}
          disabled={!selectedCity || loading}
          className="custom-select-icon w-full h-14 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text)] focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] px-4 text-base font-medium disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all hover:border-[var(--color-border-hover)]"
        >
          <option value="">{loading ? "Yükleniyor..." : "Tüm İlçeler"}</option>
          {districts.map((district) => (
            <option key={district} value={district}>{district}</option>
          ))}
        </select>
      </div>
      <button
        ref={buttonRef}
        onClick={handleSearch}
        disabled={!selectedCity}
        className="w-full md:w-auto h-14 px-10 bg-[var(--color-primary)] text-white rounded-lg font-bold text-lg flex items-center justify-center gap-2 hover:bg-[var(--color-primary-hover)] shadow-lg shadow-[var(--color-primary-shadow)] transition-all disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed active:scale-95"
      >
        <span className="material-symbols-outlined">search</span>
        Eczane Ara
      </button>
    </div>
  );
}

export function SearchFormSkeleton() {
  return (
    <div className="bg-[var(--color-bg)] p-4 rounded-xl shadow-xl border border-[var(--color-border)] flex flex-col md:flex-row gap-4 items-end">
      <div className="flex flex-col w-full md:flex-1">
        <div className="skeleton w-20 h-3 rounded mb-2 ml-1" />
        <div className="skeleton w-full h-14 rounded-lg" />
      </div>
      <div className="flex flex-col w-full md:flex-1">
        <div className="skeleton w-20 h-3 rounded mb-2 ml-1" />
        <div className="skeleton w-full h-14 rounded-lg" />
      </div>
      <div className="skeleton w-full md:w-40 h-14 rounded-lg" />
    </div>
  );
}
