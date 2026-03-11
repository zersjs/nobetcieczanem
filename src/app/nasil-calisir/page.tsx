import { Metadata } from "next";
import { Header, Footer, Breadcrumb } from "@/components";
import { getFormattedDate, getShortDate } from "@/lib/date-utils";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateMetadata(): Promise<Metadata> {
  const today = new Date();
  const formattedDate = getFormattedDate(today);
  const shortDate = getShortDate(today);
  
  return {
    title: `Nasıl Çalışır? | ${shortDate} Nöbetçi Eczane`,
    description: `Nöbetçi Eczanem ${formattedDate} - Nöbetçi eczane bilgilerine nasıl ulaşabilirsiniz? Sistemimiz nasıl çalışır?`,
    alternates: { canonical: "/nasil-calisir" },
  };
}

export default function NasilCalisirPage() {
  const today = new Date();
  const formattedDate = getFormattedDate(today);
  const shortDate = getShortDate(today);
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const breadcrumbItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Nasıl Çalışır?", href: "/nasil-calisir" },
  ];

  const steps = [
    {
      icon: "location_city",
      title: "İl Seçin",
      description: "Ana sayfadaki il listesinden veya arama kutusundan bulunduğunuz ili seçin.",
    },
    {
      icon: "apartment",
      title: "İlçe Filtreleyin",
      description: "Dilerseniz ilçe bazında filtreleme yaparak size en yakın eczaneleri görüntüleyin.",
    },
    {
      icon: "local_pharmacy",
      title: "Eczane Bilgilerine Ulaşın",
      description: "Nöbetçi eczanenin adres, telefon ve konum bilgilerine anında erişin.",
    },
    {
      icon: "directions",
      title: "Yol Tarifi Alın",
      description: "Harita butonuna tıklayarak seçtiğiniz eczaneye yol tarifi alın.",
    },
  ];

  const features = [
    { icon: "update", title: "Güncel Veri", text: "Eczane bilgileri her gün otomatik güncellenir." },
    { icon: "verified", title: "Resmi Kaynak", text: "Veriler il sağlık müdürlüklerinden alınır." },
    { icon: "speed", title: "Hızlı Erişim", text: "Saniyeler içinde istediğiniz eczaneyi bulun." },
    { icon: "phone_android", title: "Mobil Uyumlu", text: "Her cihazda sorunsuz çalışır." },
  ];

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="w-full bg-gradient-to-b from-[var(--color-primary-muted)] to-transparent py-12 px-6">
          <div className="max-w-[960px] mx-auto">
            <Breadcrumb items={breadcrumbItems} baseUrl={baseUrl} />
            <div className="text-center">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-[var(--color-primary-muted)] text-[var(--color-primary)] text-xs font-bold mb-4">
                <span className="material-symbols-outlined text-sm mr-1">calendar_today</span>
                {shortDate.toUpperCase()}
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight mb-4 text-[var(--color-text)]">
                Nasıl Çalışır?
              </h1>
              <p className="text-[var(--color-text-secondary)] mb-4 max-w-2xl mx-auto">
                {formattedDate} tarihinde Türkiye genelindeki nöbetçi eczanelere nasıl ulaşabileceğinizi öğrenin.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-4">4 Adımda Nöbetçi Eczane Bulun</h2>
            <p className="text-[var(--color-text-secondary)]">{shortDate} nöbetçi eczane bilgilerine ulaşmak çok kolay</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="relative bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)] hover:border-[var(--color-border-hover)] transition-all">
                <div className="absolute -top-3 -left-3 size-8 bg-[var(--color-primary)] rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="size-14 bg-[var(--color-primary-muted)] rounded-xl flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined text-[var(--color-primary)] text-2xl">{step.icon}</span>
                </div>
                <h3 className="font-bold text-lg mb-2 text-[var(--color-text)]">{step.title}</h3>
                <p className="text-sm text-[var(--color-text-secondary)]">{step.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-[var(--color-bg-card)] rounded-2xl p-8 border border-[var(--color-border)]">
            <h2 className="text-2xl font-bold text-center mb-8 text-[var(--color-text)]">Neden Nöbetçi Eczanem?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="text-center">
                  <div className="size-12 bg-[var(--color-primary-muted)] rounded-full flex items-center justify-center mx-auto mb-3">
                    <span className="material-symbols-outlined text-[var(--color-primary)]">{feature.icon}</span>
                  </div>
                  <h4 className="font-bold mb-1 text-[var(--color-text)]">{feature.title}</h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
