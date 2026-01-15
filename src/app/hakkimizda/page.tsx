import { Metadata } from "next";
import { Header, Footer, Breadcrumb } from "@/components";
import { getFormattedDate, getShortDate } from "@/lib/date-utils";

const today = new Date();
const formattedDate = getFormattedDate(today);
const shortDate = getShortDate(today);

export const metadata: Metadata = {
  title: `Hakkımızda | ${shortDate} Nöbetçi Eczane`,
  description: `Nöbetçi Eczanem ${formattedDate} - Nöbetçi Eczanem hakkında bilgi edinin.`,
  alternates: { canonical: "/hakkimizda" },
};

export default function HakkimizdaPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const breadcrumbItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "Hakkımızda", href: "/hakkimizda" },
  ];
  const sections = [
    {
      title: "Nöbetçi Eczanem Nedir?",
      icon: "local_pharmacy",
      content: `Nöbetçi Eczanem Hakkında`,
    },
    {
      title: "Veri Kaynaklarımız",
      icon: "verified",
      content: `Nöbetçi eczane verilerimiz, Türkiye İlaç ve Tıbbi Cihaz Kurumu (TİTCK), il sağlık müdürlükleri ve eczacı odalarından resmi kanallar aracılığıyla alınmaktadır. Veriler düzenli olarak güncellenmekte ve doğruluğu kontrol edilmektedir. ${shortDate} tarihli nöbetçi eczane listelerinin güncel ve doğru olması için sürekli çalışıyoruz. Ancak acil durumlarda eczaneyi aramadan önce telefonla teyit etmenizi öneririz.`,
    },
    {
      title: "Sunduğumuz Hizmetler",
      icon: "medical_services",
      content: `• İl ve ilçe bazında nöbetçi eczane arama
• Eczane adres, telefon ve konum bilgileri
• Google Haritalar ile yol tarifi
• Eczaneye tek tıkla arama özelliği
• Mobil uyumlu responsive tasarım
• PWA (Progressive Web App) desteği ile çevrimdışı erişim
• Hızlı yükleme süreleri ve optimize edilmiş performans
• Türkiye'nin 81 ilinde ve 973 ilçesinde hizmet
• Günlük otomatik veri güncelleme`,
    },
    {
      title: "Neden Nöbetçi Eczanem?",
      icon: "star",
      content: `• %100 Ücretsiz: Hiçbir ücret ödemeden tüm özellikleri kullanabilirsiniz
• Güncel Veriler: Nöbetçi eczane listeleri her gün otomatik olarak güncellenir
• Kolay Kullanım: Sade ve anlaşılır arayüz ile saniyeler içinde eczane bulun
• Hızlı Erişim: Optimize edilmiş altyapı ile anında sonuç alın
• Mobil Uyumlu: Telefon, tablet ve bilgisayardan sorunsuz erişim
• Reklamsız Deneyim: Kullanıcı deneyimini bozan reklamlar yok
• Güvenilir Kaynak: Resmi kurumlardan alınan doğrulanmış veriler`,
    },
    {
      title: "Kapsam Alanımız",
      icon: "map",
      content: `Nöbetçi Eczanem, Türkiye'nin tüm coğrafi bölgelerinde hizmet vermektedir:

• Marmara Bölgesi: İstanbul, Bursa, Kocaeli, Balıkesir, Tekirdağ, Edirne, Çanakkale, Sakarya, Yalova, Kırklareli, Bilecik
• Ege Bölgesi: İzmir, Manisa, Aydın, Denizli, Muğla, Afyonkarahisar, Kütahya, Uşak
• Akdeniz Bölgesi: Antalya, Adana, Mersin, Hatay, Kahramanmaraş, Osmaniye, Isparta, Burdur
• İç Anadolu Bölgesi: Ankara, Konya, Kayseri, Eskişehir, Sivas, Aksaray, Nevşehir, Kırıkkale, Kırşehir, Niğde, Karaman, Yozgat, Çankırı
• Karadeniz Bölgesi: Samsun, Trabzon, Ordu, Zonguldak, Rize, Giresun, Kastamonu, Tokat, Çorum, Amasya, Sinop, Bartın, Karabük, Düzce, Bolu, Artvin, Gümüşhane, Bayburt
• Doğu Anadolu Bölgesi: Erzurum, Van, Malatya, Elazığ, Ağrı, Erzincan, Muş, Bingöl, Bitlis, Hakkari, Kars, Iğdır, Ardahan, Tunceli
• Güneydoğu Anadolu Bölgesi: Gaziantep, Diyarbakır, Şanlıurfa, Mardin, Batman, Siirt, Şırnak, Adıyaman, Kilis`,
    },
    {
      title: "Teknik Altyapımız",
      icon: "code",
      content: `Nöbetçi Eczanem, modern web teknolojileri kullanılarak geliştirilmiştir. Next.js framework'ü üzerine inşa edilen platformumuz, React tabanlı kullanıcı arayüzü, TypeScript ile tip güvenli kod yapısı ve Tailwind CSS ile responsive tasarım sunmaktadır. Vercel altyapısı üzerinde barındırılan sitemiz, CDN desteği ile Türkiye'nin her yerinden hızlı erişim sağlar. SSL sertifikası ile tüm bağlantılarınız şifrelenmektedir.`,
    },
    {
      title: "İletişim ve Destek",
      icon: "support_agent",
      content: `Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçebilirsiniz. Kullanıcı memnuniyeti bizim için çok önemlidir. Hatalı eczane bilgisi, eksik veri veya teknik sorunlar için bize ulaşmanız yeterlidir. En kısa sürede geri dönüş yaparak sorununuzu çözmeye çalışacağız. Acil sağlık durumlarında lütfen 112 Acil Sağlık Hizmetlerini arayınız.`,
    },
  ];

  return (
    <>
      <Header />
      <main className="max-w-[1200px] mx-auto px-6 py-16">
        <Breadcrumb items={breadcrumbItems} />
        
        <div className="mb-12 text-center">
          <div className="inline-flex items-center justify-center size-20 bg-[var(--color-primary-muted)] rounded-full mb-6">
            <span className="material-symbols-outlined text-4xl text-[var(--color-primary)]">info</span>
          </div>
          <h1 className="text-4xl font-black mb-4 text-[var(--color-text)]">Hakkımızda</h1>
          <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
            {formattedDate} tarihinde ve her gün Türkiye genelinde nöbetçi eczane bilgilerine ücretsiz erişim sağlayan güvenilir sağlık platformu
          </p>
        </div>

        <div className="grid gap-6">
          {sections.map((section, index) => (
            <div
              key={index}
              className="bg-[var(--color-bg-card)] rounded-2xl p-8 border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
            >
              <h2 className="text-2xl font-bold mb-4 text-[var(--color-text)] flex items-center gap-3">
                <span className="material-symbols-outlined text-[var(--color-primary)] text-3xl">{section.icon}</span>
                {section.title}
              </h2>
              <p className="text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-hover)] rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Sağlığınız Bizim İçin Önemli</h2>
          <p className="text-white/90 mb-6 max-w-2xl mx-auto">
            Nöbetçi Eczanem olarak {shortDate} tarihinde ve her gün 7/24 hizmetinizdeyiz. Acil ilaç ihtiyaçlarınızda yanınızdayız.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[var(--color-primary)] rounded-xl font-bold hover:bg-white/90 transition-colors"
            >
              <span className="material-symbols-outlined">search</span>
              Nöbetçi Eczane Ara
            </a>
            <a
              href="/iletisim"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 text-white rounded-xl font-bold hover:bg-white/30 transition-colors"
            >
              <span className="material-symbols-outlined">mail</span>
              İletişime Geç
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}