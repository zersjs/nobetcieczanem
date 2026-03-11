"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ILLER } from "@/constants/iller";
import { normalizeForUrl } from "@/lib/url-utils";
import { getShortDate, getFormattedDate } from "@/lib/date-utils";

export function Footer() {
  const [shortDate, setShortDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    const today = new Date();
    setShortDate(getShortDate(today));
    setFormattedDate(getFormattedDate(today));
    setCurrentYear(today.getFullYear());
  }, []);

  const popularCities = ILLER.filter((il) =>
    ["istanbul", "ankara", "izmir", "bursa", "antalya", "adana", "konya", "gaziantep", "mersin", "kayseri", "diyarbakir", "samsun"].includes(il.ad)
  );

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nobetcieczane.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nöbetçi Eczanem",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.svg`,
    "description": `${formattedDate} tarihinde Türkiye'nin 81 ilinde güncel nöbetçi eczane bilgilerine ücretsiz ulaşın.`,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Turkish"],
      "areaServed": "TR"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <footer className="mt-auto bg-white border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-8">
          
          {/* Üst Bölüm */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            
            {/* Logo ve Açıklama */}
            <div className="md:col-span-1">
              <Link href="/" className="text-lg font-bold text-gray-900 hover:text-red-600 transition-colors">
                Nöbetçi Eczanem
              </Link>
              <p className="text-xs text-gray-500 mt-1 mb-3">{shortDate} · Güncel</p>
              <p className="text-xs text-gray-500 leading-relaxed">
                Türkiye genelinde 81 ilde nöbetçi eczane bilgilerine ücretsiz ulaşın.
              </p>
            </div>

            {/* Popüler İller */}
            <div className="md:col-span-2">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Popüler İller</h3>
              <div className="grid grid-cols-3 gap-1">
                {popularCities.map((il) => (
                  <Link
                    key={il.plaka}
                    href={`/${normalizeForUrl(il.label)}-nobetci-eczane`}
                    className="text-xs text-gray-500 hover:text-red-600 transition-colors py-1"
                    title={`${il.label} Nöbetçi Eczane`}
                  >
                    {il.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Hızlı Linkler */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Linkler</h3>
              <nav className="space-y-1">
                <Link href="/nasil-calisir" className="block text-xs text-gray-500 hover:text-red-600 transition-colors py-1">
                  Nasıl Çalışır?
                </Link>
                <Link href="/iletisim" className="block text-xs text-gray-500 hover:text-red-600 transition-colors py-1">
                  İletişim
                </Link>
                <Link href="/hakkimizda" className="block text-xs text-gray-500 hover:text-red-600 transition-colors py-1">
                  Hakkımızda
                </Link>
              </nav>
            </div>
          </div>

          {/* Alt Bölüm */}
          <div className="pt-6 border-t border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-xs text-gray-400">
                © {currentYear} Nöbetçi Eczanem. Tüm hakları saklıdır.
              </p>
              <nav className="flex items-center gap-4 text-xs">
                <Link href="/kullanim-kosullari" className="text-gray-400 hover:text-gray-600 transition-colors">
                  Kullanım Koşulları
                </Link>
                <Link href="/gizlilik-politikasi" className="text-gray-400 hover:text-gray-600 transition-colors">
                  Gizlilik
                </Link>
                <Link href="/kvkk" className="text-gray-400 hover:text-gray-600 transition-colors">
                  KVKK
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="mt-auto bg-white border-t border-gray-200 py-8">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 animate-pulse">
          <div>
            <div className="h-5 bg-gray-200 rounded w-32 mb-2" />
            <div className="h-3 bg-gray-200 rounded w-20 mb-3" />
            <div className="h-10 bg-gray-200 rounded w-full" />
          </div>
          <div className="md:col-span-2">
            <div className="h-4 bg-gray-200 rounded w-24 mb-3" />
            <div className="grid grid-cols-3 gap-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-3 bg-gray-200 rounded" />
              ))}
            </div>
          </div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-16 mb-3" />
            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-3 bg-gray-200 rounded w-20" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
