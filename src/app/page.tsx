import { Header, Footer, FAQJsonLd } from "@/components";
import { ILLER } from "@/constants/iller";
import { getShortDate, getFormattedDate } from "@/lib/date-utils";
import { normalizeForUrl } from "@/lib/url-utils";
import { CityGrid } from "./CityGrid";
import { LocationHero } from "./LocationHero";

const faqData = [
  { question: "Nöbetçi eczane nedir?", answer: "Nöbetçi eczane, normal çalışma saatleri dışında (gece, hafta sonu ve resmi tatillerde) 24 saat hizmet veren eczanedir." },
  { question: "Nöbetçi eczane nasıl bulunur?", answer: "Bulunduğunuz ili seçerek o ildeki tüm nöbetçi eczaneleri görebilirsiniz. İlçe bazında filtreleme yaparak size en yakın nöbetçi eczaneyi bulabilirsiniz." },
  { question: "Nöbetçi eczane bilgileri ne sıklıkla güncellenir?", answer: "Nöbetçi eczane bilgileri her gün otomatik olarak güncellenmektedir." },
  { question: "Nöbetçi eczaneden ilaç alabilir miyim?", answer: "Evet, nöbetçi eczanelerden reçeteli veya reçetesiz tüm ilaçları satın alabilirsiniz. Nöbetçi eczaneler 24 saat açıktır." },
];

export default function HomePage() {
  const cities = ILLER.map((il) => ({
    plaka: il.plaka,
    ad: il.ad,
    label: il.label,
    href: `/${normalizeForUrl(il.label)}-nobetci-eczane`,
  }));
  const popularCities = cities.filter((il) => ["istanbul", "ankara", "izmir", "bursa", "antalya", "adana", "konya", "gaziantep", "kayseri", "mersin", "diyarbakir", "samsun"].includes(il.ad));
  const today = new Date();
  const shortDate = getShortDate(today);
  const formattedDate = getFormattedDate(today);

  return (
    <>
      <FAQJsonLd questions={faqData} />
      <div className="relative">
        <div className="fixed inset-0 bg-gradient-to-br from-white via-red-50/30 to-pink-50/20 pointer-events-none -z-10"></div>
        <Header />
        <main className="flex-1 relative">
          <LocationHero shortDate={shortDate} formattedDate={formattedDate} />

          <CityGrid popularCities={popularCities} allCities={cities} shortDate={shortDate} />

          <section className="py-16 px-6">
            <div className="max-w-[800px] mx-auto">
              <h2 className="text-3xl font-bold mb-10 text-center text-[var(--color-text)] animate-fadeIn">Sıkça Sorulan Sorular</h2>
              <div className="space-y-4">
                {faqData.map((faq, index) => (
                  <details 
                    key={index} 
                    className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm hover:shadow-lg border border-[var(--color-border)] hover:border-[var(--color-primary)] overflow-hidden transition-all duration-300 hover:-translate-y-0.5"
                  >
                    <summary className="flex items-center justify-between p-6 font-bold text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors duration-300 cursor-pointer">
                      {faq.question}
                      <span className="material-symbols-outlined text-[var(--color-text-muted)] group-open:rotate-180 transition-transform duration-300">expand_more</span>
                    </summary>
                    <p className="px-6 pb-6 text-[var(--color-text-secondary)] leading-relaxed animate-fadeIn">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
