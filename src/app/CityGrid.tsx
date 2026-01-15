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
          <h2 className="text-2xl font-bold mb-8 text-center text-[var(--color-text)]">Popüler İller - {shortDate}</h2>
          <div ref={popularRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {popularCities.map((il) => (
              <Link
                key={il.plaka}
                href={il.href}
                className="group relative p-5 bg-gradient-to-br from-[var(--color-bg-card)] to-[var(--color-bg-secondary)] rounded-xl transition-all duration-300 text-center border border-[var(--color-border)] hover:border-[var(--color-primary)] shadow-sm hover:shadow-xl cursor-pointer hover:-translate-y-1 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)] to-[#ff4757] opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <span className="relative text-sm font-bold text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors duration-300">
                  {il.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-6 bg-[var(--color-bg)]">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-2xl font-bold mb-8 text-center text-[var(--color-text)]">Tüm İller</h2>
          <div ref={allRef} className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {allCities.map((il) => (
              <Link
                key={il.plaka}
                href={il.href}
                className="px-4 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-white bg-[var(--color-bg-card)] hover:bg-gradient-to-r hover:from-[var(--color-primary)] hover:to-[#ff4757] rounded-lg transition-all duration-300 text-center cursor-pointer hover:scale-105 active:scale-95 border border-transparent hover:border-[var(--color-primary)] shadow-sm hover:shadow-md"
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
