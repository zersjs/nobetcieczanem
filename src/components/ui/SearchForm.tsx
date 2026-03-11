"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";

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
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedDistrict, setSelectedDistrict] = useState(initialDistrict);
  const [districts, setDistricts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

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
      toast.error("Lütfen bir il seçin");
      return;
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
    <div className="flex flex-col sm:flex-row gap-2">
      <select
        value={selectedCity}
        onChange={handleCityChange}
        className="flex-1 h-10 px-3 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
      >
        <option value="">İl seçin</option>
        {cities.map((city) => (
          <option key={city.plaka} value={city.ad}>{city.label}</option>
        ))}
      </select>
      <select
        value={selectedDistrict}
        onChange={(e) => setSelectedDistrict(e.target.value)}
        disabled={!selectedCity || loading}
        className="flex-1 h-10 px-3 rounded-lg border border-gray-200 bg-white text-gray-900 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 disabled:opacity-50 disabled:bg-gray-50"
      >
        <option value="">{loading ? "Yükleniyor..." : "Tüm ilçeler"}</option>
        {districts.map((district) => (
          <option key={district} value={district}>{district}</option>
        ))}
      </select>
      <button
        onClick={handleSearch}
        disabled={!selectedCity}
        className="h-10 px-5 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Ara
      </button>
    </div>
  );
}

export function SearchFormSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-2 animate-pulse">
      <div className="flex-1 h-10 rounded-lg bg-gray-200" />
      <div className="flex-1 h-10 rounded-lg bg-gray-200" />
      <div className="w-16 h-10 rounded-lg bg-gray-200" />
    </div>
  );
}
