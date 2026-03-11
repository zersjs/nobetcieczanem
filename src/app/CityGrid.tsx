"use client";

import Link from "next/link";
import { useRef, useEffect } from "react";
import gsap from "gsap";

interface City {
  plaka: number;
  ad: string;
  label: string;
  href: string;
}

interface CityGridProps {
  popularCities: City[];
  allCities: City[];
  shortDate: string;
}

export function CityGrid({ popularCities, allCities, shortDate }: CityGridProps) {
  const popularRef = useRef<HTMLDivElement>(null);
  const allRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (popularRef.current) {
      gsap.fromTo(popularRef.current.children, { opacity: 0, y: 20, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.4, stagger: 0.05, ease: "power2.out" });
    }
    if (allRef.current) {
      gsap.fromTo(allRef.current.children, { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.01, ease: "power2.out", delay: 0.3 });
    }
  }, []);

  return (
    <>
      <section className="py-12 px-6">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-xl font-bold mb-6 text-center text-gray-900">Popüler İller</h2>
          <div ref={popularRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {popularCities.map((il) => (
              <Link
                key={il.plaka}
                href={il.href}
                className="group relative p-4 bg-white rounded-xl transition-all duration-200 text-center border border-gray-100 hover:border-red-200 shadow-sm hover:shadow-xl hover:-translate-y-1"
              >
                <span className="text-sm font-bold text-gray-700 group-hover:text-red-600 transition-colors">
                  {il.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-gray-50/50">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-xl font-bold mb-6 text-center text-gray-900">Tüm İller</h2>
          <div ref={allRef} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {allCities.map((il) => (
              <Link
                key={il.plaka}
                href={il.href}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-white bg-white hover:bg-gradient-to-r hover:from-red-500 hover:to-rose-500 rounded-lg transition-all duration-200 text-center border border-transparent hover:border-red-200 hover:shadow-md"
              >
                {il.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
