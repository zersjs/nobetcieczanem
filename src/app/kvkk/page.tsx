import { Metadata } from "next";
import { Header, Footer, Breadcrumb } from "@/components";
import { getFormattedDate, getShortDate } from "@/lib/date-utils";

const today = new Date();
const formattedDate = getFormattedDate(today);
const shortDate = getShortDate(today);

export const metadata: Metadata = {
  title: `KVKK Aydınlatma Metni | ${shortDate} Nöbetçi Eczane`,
  description: `Nöbetçi Eczanem ${formattedDate} - KVKK kapsamında kişisel verilerin işlenmesine ilişkin aydınlatma metni.`,
  alternates: { canonical: "/kvkk" },
};

export default function KvkkPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const breadcrumbItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "KVKK Aydınlatma Metni", href: "/kvkk" },
  ];

  const sections = [
    {
      title: "1. Veri Sorumlusu",
      content: `6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca, Nöbetçi Eczanem olarak kişisel verilerinizin güvenliği konusunda azami hassasiyet göstermekteyiz. ${formattedDate} tarihli bu aydınlatma metni ile sizi bilgilendiriyoruz.`,
    },
    {
      title: "2. Kişisel Verilerin Toplanması",
      content: `${shortDate} nöbetçi eczane hizmeti kapsamında sitemiz üzerinden doğrudan kişisel veri toplamamaktayız. İl ve ilçe bazlı aramalarınız anlık olarak işlenir ve saklanmaz.`,
    },
    {
      title: "3. Otomatik Olarak Toplanan Veriler",
      content: `Sitemizi ziyaret ettiğinizde sunucu kayıtları aracılığıyla; IP adresi, tarayıcı türü, ziyaret tarihi ve saati, görüntülenen sayfalar gibi teknik bilgiler otomatik olarak kaydedilebilir. Bu bilgiler anonim istatistiksel analiz için kullanılır.`,
    },
    {
      title: "4. Verilerin İşlenme Amaçları",
      content: `Toplanan veriler; ${shortDate} nöbetçi eczane hizmetinin sunulması, sitenin güvenliğinin sağlanması, teknik sorunların giderilmesi ve hizmet kalitesinin artırılması amacıyla işlenmektedir.`,
    },
    {
      title: "5. Verilerin Aktarılması",
      content: `Kişisel verileriniz yasal zorunluluklar dışında üçüncü kişilerle paylaşılmamaktadır. Analitik hizmet sağlayıcıları ile yalnızca anonim veriler paylaşılabilir.`,
    },
    {
      title: "6. Veri Güvenliği",
      content: `Verilerinizin güvenliği için SSL şifreleme, güvenlik duvarı ve düzenli güvenlik taramaları gibi teknik önlemler uygulanmaktadır.`,
    },
    {
      title: "7. Veri Saklama Süresi",
      content: `Sunucu kayıtları en fazla 1 yıl süreyle saklanmakta ve ardından otomatik olarak silinmektedir.`,
    },
    {
      title: "8. KVKK Kapsamındaki Haklarınız",
      content: `KVKK'nın 11. maddesi uyarınca aşağıdaki haklara sahipsiniz: Kişisel verilerinizin işlenip işlenmediğini öğrenme, işlenmişse bilgi talep etme, işlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme, yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme, eksik veya yanlış işlenmişse düzeltilmesini isteme, KVKK'nın 7. maddesinde öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme, aktarıldığı üçüncü kişilere bildirilmesini isteme, münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme, kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme.`,
    },
    {
      title: "9. Başvuru Yöntemi",
      content: `KVKK kapsamındaki taleplerinizi destek@nobetcieczanem.com adresine yazılı olarak iletebilirsiniz. Başvurularınız en geç 30 gün içinde sonuçlandırılacaktır.`,
    },
    {
      title: "10. Değişiklikler",
      content: `Bu aydınlatma metni ${formattedDate} tarihinde güncellenmiştir. KVKK mevzuatındaki değişiklikler doğrultusunda güncellenebilir.`,
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
                KVKK Aydınlatma Metni
              </h1>
              <p className="text-[var(--color-text-secondary)] mb-4 max-w-2xl mx-auto">
                6698 Sayılı Kişisel Verilerin Korunması Kanunu Kapsamında Aydınlatma Metni
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">Son güncelleme: {formattedDate}</p>
            </div>
          </div>
        </section>

        <section className="max-w-[900px] mx-auto px-6 py-16">
          <div className="bg-[var(--color-bg-card)] rounded-2xl p-8 border border-[var(--color-border)]">
            <div className="space-y-8">
              {sections.map((section, index) => (
                <div key={index}>
                  <h2 className="text-xl font-bold mb-3 text-[var(--color-text)]">{section.title}</h2>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed whitespace-pre-line">{section.content}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-[var(--color-text-secondary)] text-sm">
              {shortDate} nöbetçi eczane hizmeti - Verileriniz bizimle güvende.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
