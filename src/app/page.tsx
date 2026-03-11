import { Metadata } from "next";
import Link from "next/link";
import { Header, Footer, FAQJsonLd } from "@/components";
import { ILLER } from "@/constants/iller";
import { getShortDate, getFormattedDate } from "@/lib/date-utils";
import { normalizeForUrl } from "@/lib/url-utils";
import { LocationHero } from "./LocationHero";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const faqData = [
  { question: "Nöbetçi eczane nedir?", answer: "Nöbetçi eczane, normal çalışma saatleri dışında (gece, hafta sonu ve resmi tatillerde) 24 saat hizmet veren eczanedir." },
  { question: "Nöbetçi eczane nasıl bulunur?", answer: "Bulunduğunuz ili seçerek o ildeki tüm nöbetçi eczaneleri görebilirsiniz. İlçe bazında filtreleme yaparak size en yakın nöbetçi eczaneyi bulabilirsiniz." },
  { question: "Nöbetçi eczane bilgileri ne sıklıkla güncellenir?", answer: "Nöbetçi eczane bilgileri her gün otomatik olarak güncellenmektedir." },
  { question: "Nöbetçi eczaneden ilaç alabilir miyim?", answer: "Evet, nöbetçi eczanelerden reçeteli veya reçetesiz tüm ilaçları satın alabilirsiniz. Nöbetçi eczaneler 24 saat açıktır." },
];

export async function generateMetadata(): Promise<Metadata> {
  const today = new Date();
  const formattedDate = getFormattedDate(today);
  
  return {
    title: `Nöbetçi Eczane - ${formattedDate} Güncel Liste`,
    description: `${formattedDate} tarihinde Türkiye'nin 81 ilinde nöbetçi eczaneleri bulun. Adres, telefon ve yol tarifi bilgileriyle size en yakın açık eczaneyi hemen öğrenin.`,
    keywords: ["nöbetçi eczane", "bugün nöbetçi eczane", "açık eczane", "nöbetçi eczane listesi", "en yakın nöbetçi eczane"],
    openGraph: {
      title: `Nöbetçi Eczane - ${formattedDate}`,
      description: `Türkiye genelinde ${formattedDate} tarihli nöbetçi eczane listesi`,
      type: "website",
    },
  };
}

export default function HomePage() {
  const cities = ILLER.map((il) => ({
    plaka: il.plaka,
    ad: il.ad,
    label: il.label,
    href: `/${normalizeForUrl(il.label)}-nobetci-eczane`,
  }));
  
  const popularCities = cities.filter((il) => 
    ["istanbul", "ankara", "izmir", "bursa", "antalya", "adana", "konya", "gaziantep", "kayseri", "mersin", "diyarbakir", "samsun"].includes(il.ad)
  );

  const today = new Date();
  const shortDate = getShortDate(today);
  const formattedDate = getFormattedDate(today);

  return (
    <>
      <FAQJsonLd questions={faqData} />
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        
        <main className="flex-1">
          {/* Hero - Basit ve Temiz */}
          <LocationHero shortDate={shortDate} formattedDate={formattedDate} />

          {/* Popüler İller */}
          <section className="py-10 px-4 bg-white border-b border-gray-100">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Popüler İller</h2>
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                {popularCities.map((il) => (
                  <Link
                    key={il.plaka}
                    href={il.href}
                    className="px-3 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-red-50 hover:text-red-600 rounded-lg text-center transition-colors"
                  >
                    {il.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Tüm İller */}
          <section className="py-10 px-4">
            <div className="max-w-5xl mx-auto">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Tüm İller ({cities.length} il)</h2>
              <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-1.5">
                {cities.map((il) => (
                  <Link
                    key={il.plaka}
                    href={il.href}
                    className="px-2 py-2 text-xs font-medium text-gray-600 hover:text-red-600 hover:bg-white rounded text-center transition-colors"
                    title={`${il.label} Nöbetçi Eczane - ${shortDate}`}
                  >
                    {il.label}
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* SSS - Minimal */}
          <section className="py-10 px-4 bg-white border-t border-gray-100">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">Sıkça Sorulan Sorular</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <article key={index} className="border-b border-gray-100 pb-4 last:border-0">
                    <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* SEO İçerik */}
          <section className="py-10 px-4 bg-gray-50">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Nöbetçi Eczane Hakkında</h2>
              <div className="prose prose-sm prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  <strong>Nöbetçi eczaneler</strong>, normal mesai saatleri dışında ilaç ihtiyacınızı karşılamak için 24 saat hizmet veren eczanelerdir. 
                  Hafta sonları, resmi tatillerde ve gece saatlerinde açık olan bu eczaneler, acil ilaç ihtiyaçlarınız için her zaman ulaşılabilir durumdadır.
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  Sitemiz üzerinden <strong>{formattedDate}</strong> tarihinde Türkiye&apos;nin tüm illerinde nöbetçi olan eczanelerin güncel listesine ulaşabilirsiniz. 
                  Her eczane için adres, telefon numarası ve harita üzerinde konum bilgisi sunulmaktadır.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Nöbetçi eczane bilgileri günlük olarak güncellenmekte olup, Türkiye Eczacılar Birliği ve il eczacı odalarının resmi verileri kullanılmaktadır.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
