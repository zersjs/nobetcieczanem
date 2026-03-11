"use client";

import { useRouter } from "next/navigation";

interface DistrictSelectProps {
  districts: string[];
  selectedIlce: string | null;
  allPharmaciesCount: number;
  pharmacyCounts: Record<string, number>;
  baseUrl: string;
}

export function DistrictSelect({ 
  districts, 
  selectedIlce, 
  allPharmaciesCount, 
  pharmacyCounts,
  baseUrl 
}: DistrictSelectProps) {
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value) {
      router.push(`${baseUrl}/${encodeURIComponent(value.toLowerCase().replace(/\s+/g, '-').replace(/ğ/g, 'g').replace(/ü/g, 'u').replace(/ş/g, 's').replace(/ı/g, 'i').replace(/ö/g, 'o').replace(/ç/g, 'c'))}`);
    } else {
      router.push(baseUrl);
    }
  };

  return (
    <select
      defaultValue={selectedIlce || ""}
      onChange={handleChange}
      className="h-9 px-3 pr-8 text-sm border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 cursor-pointer"
    >
      <option value="">Tüm İlçeler ({allPharmaciesCount})</option>
      {districts.map((district) => (
        <option key={district} value={district}>
          {district} ({pharmacyCounts[district] || 0})
        </option>
      ))}
    </select>
  );
}
