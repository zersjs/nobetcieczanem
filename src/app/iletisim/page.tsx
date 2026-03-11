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
    title: `İletişim | ${shortDate} Nöbetçi Eczane`,
    description: `Nöbetçi Eczanem ${formattedDate} - Bizimle iletişime geçin. Öneri, şikayet ve sorularınız için buradayız.`,
    alternates: { canonical: "/iletisim" },
  };
}

export default function IletisimPage() {
  const today = new Date();
  const formattedDate = getFormattedDate(today);
  const shortDate = getShortDate(today);
  
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const breadcrumbItems = [
    { name: "Ana Sayfa", href: "/" },
    { name: "İletişim", href: "/iletisim" },
  ];

  const contactMethods = [
    {
      icon: "mail",
      title: "E-posta",
      value: "destek@nobetcieczanem.com",
      description: "Sorularınız için 7/24 ulaşabilirsiniz.",
      href: "mailto:destek@nobetcieczanem.com",
    },
    {
      icon: "alternate_email",
      title: "Twitter",
      value: "@nobetcieczanem",
      description: "Güncel duyurular ve hızlı iletişim.",
      href: "https://twitter.com/nobetcieczanem",
    },
    {
      icon: "photo_camera",
      title: "Instagram",
      value: "@nobetcieczanem",
      description: "Sağlık içerikleri ve kampanyalar.",
      href: "https://instagram.com/nobetcieczanem",
    },
  ];

  const faqs = [
    {
      question: "Eczane bilgileri ne sıklıkla güncellenir?",
      answer: "Nöbetçi eczane listeleri her gün gece yarısı otomatik olarak güncellenir. Ayrıca gün içinde de düzenli kontroller yapılır.",
    },
    {
      question: "Yanlış bir eczane bilgisi gördüm, ne yapmalıyım?",
      answer: "Hatalı bilgileri bize e-posta ile bildirmenizi rica ederiz. En kısa sürede düzeltme yapacağız.",
    },
    {
      question: "Hangi illerin eczane bilgilerine ulaşabilirim?",
      answer: "Türkiye'nin 81 ilindeki tüm nöbetçi eczane bilgilerine ücretsiz olarak ulaşabilirsiniz.",
    },
    {
      question: "Mobil uygulama var mı?",
      answer: "Şu an için mobil uygulamamız bulunmuyor ancak web sitemiz tüm mobil cihazlarla tam uyumludur.",
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
                İletişim
              </h1>
              <p className="text-[var(--color-text-secondary)] mb-4 max-w-2xl mx-auto">
                {formattedDate} - Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçin.
              </p>
            </div>
          </div>
        </section>

        <section className="max-w-[1200px] mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[var(--color-bg-card)] rounded-2xl p-8 border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-all group"
              >
                <div className="size-14 bg-[var(--color-primary-muted)] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[var(--color-primary)] transition-colors">
                  <span className="material-symbols-outlined text-[var(--color-primary)] text-2xl group-hover:text-white transition-colors">{method.icon}</span>
                </div>
                <h3 className="font-bold text-lg mb-1 text-[var(--color-text)]">{method.title}</h3>
                <p className="text-[var(--color-primary)] font-medium mb-2">{method.value}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">{method.description}</p>
              </a>
            ))}
          </div>

          <div className="bg-[var(--color-bg-card)] rounded-2xl p-8 border border-[var(--color-border)]">
            <h2 className="text-2xl font-bold mb-8 text-[var(--color-text)]">Sıkça Sorulan Sorular</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[var(--color-border)] pb-6 last:border-0 last:pb-0">
                  <h3 className="font-bold text-lg mb-2 text-[var(--color-text)] flex items-start gap-3">
                    <span className="material-symbols-outlined text-[var(--color-primary)]">help_outline</span>
                    {faq.question}
                  </h3>
                  <p className="text-[var(--color-text-secondary)] pl-9">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-[var(--color-text-secondary)] text-sm">
              {shortDate} nöbetçi eczane bilgileri için Nöbetçi Eczanem yanınızda.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
