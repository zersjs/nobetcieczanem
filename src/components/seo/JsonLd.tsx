interface PharmacyJsonLdProps {
  name: string;
  address: string;
  telephone: string;
  city: string;
  district: string;
  date?: string;
}

export function PharmacyJsonLd({ name, address, telephone, city, district, date }: PharmacyJsonLdProps) {
  const today = date || new Date().toISOString().split("T")[0];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Pharmacy",
    name: `${name} Eczanesi`,
    address: { "@type": "PostalAddress", streetAddress: address, addressLocality: district, addressRegion: city, addressCountry: "TR" },
    telephone,
    openingHours: "Mo-Su 00:00-23:59",
    isAcceptingNewPatients: true,
    validFrom: today,
    validThrough: today,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

interface BreadcrumbJsonLdProps {
  items: { name: string; href: string }[];
  baseUrl?: string;
}

export function BreadcrumbJsonLd({ items, baseUrl = "" }: BreadcrumbJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.href}`,
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

interface FAQJsonLdProps {
  questions: { question: string; answer: string }[];
}

export function FAQJsonLd({ questions }: FAQJsonLdProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: { "@type": "Answer", text: q.answer },
    })),
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

interface LocalBusinessJsonLdProps {
  city: string;
  pharmacyCount: number;
  date?: string;
}

export function LocalBusinessJsonLd({ city, pharmacyCount, date }: LocalBusinessJsonLdProps) {
  const today = new Date();
  const dateStr = date || today.toISOString().split("T")[0];
  const formattedDate = today.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${city} Nöbetçi Eczaneler - ${formattedDate}`,
    description: `${formattedDate} tarihinde ${city} ilinde açık olan ${pharmacyCount} nöbetçi eczane listesi`,
    numberOfItems: pharmacyCount,
    itemListOrder: "https://schema.org/ItemListUnordered",
    datePublished: dateStr,
    dateModified: dateStr,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

interface DateSeoJsonLdProps {
  city: string;
  date: Date;
}

export function DateSeoJsonLd({ city, date }: DateSeoJsonLdProps) {
  const formattedDate = date.toLocaleDateString("tr-TR", { day: "numeric", month: "long", year: "numeric" });
  const isoDate = date.toISOString().split("T")[0];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: `${city} Nöbetçi Eczane - ${formattedDate}`,
    description: `${formattedDate} tarihinde ${city} ilinde nöbetçi eczaneler`,
    datePublished: isoDate,
    dateModified: isoDate,
    mainEntity: {
      "@type": "MedicalWebPage",
      about: { "@type": "MedicalSpecialty", name: "Pharmacy" },
      specialty: "Nöbetçi Eczane",
      lastReviewed: isoDate,
    },
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
