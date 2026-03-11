import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import { getFormattedDate, getSEODateKeywords, getShortDate } from "@/lib/date-utils";
import { InstallPWA } from "@/components";
import { PWAProvider } from "./PWAProvider";
import { headers } from "next/headers";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-manrope",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  await headers();
  const today = new Date();
  const dateStr = getFormattedDate(today);
  const shortDate = getShortDate(today);
  const dateKeywords = getSEODateKeywords(today);

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://nobetcieczane.com"),
    title: {
      default: `Nöbetçi Eczanem - ${shortDate} Açık Eczaneler`,
      template: `%s | Nöbetçi Eczanem`,
    },
    description: `${dateStr} tarihinde Türkiye'nin 81 ilinde güncel nöbetçi eczane bilgilerine anında ulaşın. İl ve ilçe bazında nöbetçi eczane adresleri, telefon numaraları ve konum bilgileri.`,
    keywords: [
      "nöbetçi eczane",
      "nobetci eczane",
      "eczane",
      "nöbetçi",
      "ilaç",
      "sağlık",
      "acil eczane",
      "gece eczane",
      "hafta sonu eczane",
      ...dateKeywords,
    ],
    authors: [{ name: "Nöbetçi Eczanem" }],
    creator: "Nöbetçi Eczanem",
    publisher: "Nöbetçi Eczanem",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      siteName: "Nöbetçi Eczanem",
      title: `Nöbetçi Eczanem - ${shortDate} Açık Eczaneler`,
      description: `${dateStr} tarihinde Türkiye'nin 81 ilinde güncel nöbetçi eczane bilgilerine anında ulaşın.`,
      images: [{ url: "/og-image.svg", width: 1200, height: 630, alt: "Nöbetçi Eczanem" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `Nöbetçi Eczanem - ${shortDate} Açık Eczaneler`,
      description: `${dateStr} tarihinde Türkiye'nin 81 ilinde güncel nöbetçi eczane bilgilerine anında ulaşın.`,
      images: ["/og-image.svg"],
    },
    alternates: { canonical: "/" },
    verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
    category: "health",
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ff000d",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nobetcieczane.com";
  const today = new Date();
  const dateStr = getFormattedDate(today);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Nöbetçi Eczanem",
    url: siteUrl,
    description: `${dateStr} tarihinde Türkiye'nin 81 ilinde güncel nöbetçi eczane bilgilerine anında ulaşın.`,
    dateModified: today.toISOString(),
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${siteUrl}/{il}` },
      "query-input": "required name=il",
    },
  };

  return (
    <html lang="tr" className={manrope.variable} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body className="bg-[var(--color-bg-secondary)] text-[var(--color-text)] transition-colors duration-300 font-[family-name:var(--font-manrope)]" suppressHydrationWarning>
        <Toaster
          position="top-center"
          toastOptions={{
            style: { background: "var(--color-bg)", color: "var(--color-text)", border: "1px solid var(--color-border)" },
            className: "font-[family-name:var(--font-manrope)]",
          }}
          richColors
        />
        <PWAProvider>
          <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden md:pb-0 pb-16">
            {children}
          </div>
          <InstallPWA />
        </PWAProvider>
      </body>
    </html>
  );
}
