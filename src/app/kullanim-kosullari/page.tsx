import { Metadata } from "next";
import { Header, Footer, Breadcrumb } from "@/components";
import { getFormattedDate, getShortDate } from "@/lib/date-utils";

const today = new Date();
const formattedDate = getFormattedDate(today);
const shortDate = getShortDate(today);

export const metadata: Metadata = {
  title: `Kullanım Koşulları | ${shortDate} Nöbetçi Eczane`,
  description: `Nöbetçi Eczanem ${formattedDate} - Kullanım koşulları ve şartları hakkında bilgi edinin.`,
  alternates: { canonical: "/kullanim-kosullari" },
};

export default function KullanimKosullariPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const breadcrumbItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Kullanım Koşulları", href: "/kullanim-kosullari" },
  ];

  const sections = [
    {
      title: "1. Genel Hükümler",
      content: `Bu web sitesi ("Nöbetçi Eczanem") Türkiye genelindeki nöbetçi eczane bilgilerini ücretsiz olarak sunan bir bilgi platformudur. Siteyi kullanarak aşağıdaki koşulları kabul etmiş sayılırsınız.`,
    },
    {
      title: "2. Hizmet Kapsamı",
      content: `Nöbetçi Eczanem, ${formattedDate} tarihinde ve her gün güncel nöbetçi eczane bilgilerini kullanıcılara sunar. Bu bilgiler; eczane adı, adresi, telefon numarası ve konum bilgilerini içerir. Sunulan veriler il sağlık müdürlüklerinden temin edilmektedir.`,
    },
    {
      title: "3. Bilgilerin Doğruluğu",
      content: `Her ne kadar ${shortDate} nöbetçi eczane bilgilerinin doğruluğu için azami özen gösterilse de, eczane çalışma saatleri veya nöbet değişiklikleri gibi durumlarda bilgiler anlık olarak değişebilir. Kritik durumlarda eczaneyi arayarak teyit almanızı öneririz.`,
    },
    {
      title: "4. Sorumluluk Sınırları",
      content: `Sitede yer alan bilgilerin kullanımından doğabilecek doğrudan veya dolaylı zararlardan Nöbetçi Eczanem sorumlu tutulamaz. Acil sağlık durumlarında 112 Acil Yardım hattını aramanızı tavsiye ederiz.`,
    },
    {
      title: "5. Fikri Mülkiyet",
      content: `Site tasarımı, logosu, yazılımı ve içerikleri Nöbetçi Eczanem'e aittir ve telif hakkı yasaları ile korunmaktadır. İçeriklerin izinsiz kopyalanması, çoğaltılması veya dağıtılması yasaktır.`,
    },
    {
      title: "6. Gizlilik",
      content: `Kişisel verilerinizin korunması bizim için önemlidir. Gizlilik politikamız hakkında detaylı bilgi için "Gizlilik Politikası" sayfamızı ziyaret edebilirsiniz.`,
    },
    {
      title: "7. Değişiklikler",
      content: `Bu kullanım koşulları önceden haber verilmeksizin güncellenebilir. Güncellemeler sitede yayınlandığı anda yürürlüğe girer. Düzenli olarak bu sayfayı kontrol etmenizi öneririz.`,
    },
    {
      title: "8. İletişim",
      content: `Kullanım koşulları hakkında sorularınız için destek@nobetcieczanem.com adresine e-posta gönderebilirsiniz.`,
    },
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
                Kullanım Koşulları
              </h1>
              <p className="text-[var(--color-text-secondary)] mb-4 max-w-2xl mx-auto">
                Son güncelleme: {formattedDate}
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-[900px] mx-auto px-6 py-16">
          <div className="bg-[var(--color-bg-card)] rounded-2xl p-8 border border-[var(--color-border)]">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-xl font-bold mb-3 text-[var(--color-text)]">{section.title}</h2>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed">{section.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[var(--color-text-secondary)] text-sm">
              {shortDate} nöbetçi eczane hizmeti Nöbetçi Eczanem tarafından sağlanmaktadır.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
