import { Metadata } from "next";
import { Header, Footer, Breadcrumb } from "@/components";
import { getFormattedDate, getShortDate } from "@/lib/date-utils";

const today = new Date();
const formattedDate = getFormattedDate(today);
const shortDate = getShortDate(today);

export const metadata: Metadata = {
  title: `Gizlilik Politikası | ${shortDate} Nöbetçi Eczane`,
  description: `Nöbetçi Eczanem ${formattedDate} - Gizlilik politikamız ve kişisel verilerin korunması hakkında bilgi.`,
  alternates: { canonical: "/gizlilik-politikasi" },
};

export default function GizlilikPolitikasiPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const breadcrumbItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  ];

  const sections = [
    {
      title: "1. Giriş",
      content: `Nöbetçi Eczanem olarak ${formattedDate} tarihinde ve her zaman kullanıcılarımızın gizliliğine saygı duyuyoruz. Bu gizlilik politikası, sitemizi ziyaret ettiğinizde hangi bilgilerin toplandığını ve bu bilgilerin nasıl kullanıldığını açıklar.`,
    },
    {
      title: "2. Toplanan Bilgiler",
      content: `Sitemiz üzerinden herhangi bir kişisel veri (ad, e-posta, telefon vb.) toplamamaktayız. ${shortDate} nöbetçi eczane araması yaparken girdiğiniz il ve ilçe bilgileri yalnızca size uygun sonuçları göstermek için kullanılır ve saklanmaz.`,
    },
    {
      title: "3. Çerezler (Cookies)",
      content: `Sitemiz, kullanıcı deneyimini iyileştirmek amacıyla çerezler kullanabilir. Çerezler; tercihlerinizi hatırlamak, site performansını analiz etmek ve hizmetlerimizi geliştirmek için kullanılır.`,
    },
    {
      title: "4. Analitik Araçlar",
      content: `Site trafiğini analiz etmek için üçüncü taraf analitik araçları (Google Analytics gibi) kullanabiliriz. Bu araçlar anonim istatistiksel veriler toplar ve kişisel olarak sizi tanımlamaz.`,
    },
    {
      title: "5. Üçüncü Taraf Bağlantılar",
      content: `Sitemizde harita servisleri, sosyal medya butonları gibi üçüncü taraf hizmetlere bağlantılar bulunabilir. Bu hizmetlerin kendi gizlilik politikaları vardır ve bunlar üzerinde kontrolümüz bulunmamaktadır.`,
    },
    {
      title: "6. Veri Güvenliği",
      content: `Sitemizdeki tüm bağlantılar SSL sertifikası ile şifrelenmektedir. ${shortDate} nöbetçi eczane bilgilerine güvenli bir şekilde erişebilirsiniz.`,
    },
    {
      title: "7. Çocukların Gizliliği",
      content: `Sitemiz her yaştan kullanıcıya açıktır. Çocuklardan bilerek kişisel bilgi toplamıyoruz. 18 yaşından küçükler için ebeveyn gözetimi önerilir.`,
    },
    {
      title: "8. Politika Değişiklikleri",
      content: `Bu gizlilik politikası zaman zaman güncellenebilir. Önemli değişiklikler olması halinde sitemizde duyuru yapılacaktır.`,
    },
    {
      title: "9. İletişim",
      content: `Gizlilik politikamız hakkında sorularınız için destek@nobetcieczanem.com adresine ulaşabilirsiniz.`,
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
                Gizlilik Politikası
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
              Nöbetçi Eczanem - {shortDate} nöbetçi eczane bilgileri güvenle sizinle.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
