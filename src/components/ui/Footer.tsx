import Link from "next/link";
import Image from "next/image";
import { ILLER } from "@/constants/iller";
import { normalizeForUrl } from "@/lib/url-utils";
import { getShortDate, getFormattedDate } from "@/lib/date-utils";
import { PWAInstallButton } from "./PWAInstallButton";

export function Footer() {
  const today = new Date();
  const shortDate = getShortDate(today);
  const formattedDate = getFormattedDate(today);
  const currentYear = today.getFullYear();

  const topCities = ILLER.filter((il) =>
    ["istanbul", "ankara", "izmir", "bursa", "antalya", "adana", "konya", "gaziantep", "mersin", "kayseri", "eskisehir", "samsun", "diyarbakir", "sanliurfa", "trabzon", "ordu"].includes(il.ad)
  );

  const marmaraCities = ILLER.filter((il) => 
    ["istanbul", "bursa", "kocaeli", "tekirdag", "sakarya", "edirne", "kirklareli", "canakkale", "balikesir", "yalova", "bilecik", "duzce"].includes(il.ad)
  );

  const egeCities = ILLER.filter((il) => 
    ["izmir", "manisa", "aydin", "denizli", "mugla", "usak", "kutahya", "afyonkarahisar"].includes(il.ad)
  );

  const akdenizCities = ILLER.filter((il) => 
    ["antalya", "adana", "mersin", "hatay", "kahramanmaras", "osmaniye", "isparta", "burdur"].includes(il.ad)
  );

  const icAnadoluCities = ILLER.filter((il) => 
    ["ankara", "konya", "kayseri", "eskisehir", "sivas", "aksaray", "nigde", "nevsehir", "kirsehir", "karaman", "kirikkale", "cankiri", "yozgat"].includes(il.ad)
  );

  const karadenizCities = ILLER.filter((il) => 
    ["samsun", "trabzon", "ordu", "zonguldak", "rize", "giresun", "tokat", "amasya", "sinop", "artvin", "gumushane", "bayburt", "bartin", "karabuk", "kastamonu", "corum"].includes(il.ad)
  );

  const doguCities = ILLER.filter((il) => 
    ["erzurum", "malatya", "elazig", "van", "agri", "erzincan", "mus", "bingol", "tunceli", "bitlis", "hakkari", "ardahan", "igdir", "kars"].includes(il.ad)
  );

  const guneydoguCities = ILLER.filter((il) => 
    ["gaziantep", "diyarbakir", "sanliurfa", "mardin", "batman", "adiyaman", "siirt", "sirnak", "kilis"].includes(il.ad)
  );

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nobetcieczane.com";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Nöbetçi Eczanem",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.svg`,
    "description": `${formattedDate} tarihinde Türkiye'nin 81 ilinde güncel nöbetçi eczane bilgilerine ücretsiz ulaşın.`,
    "sameAs": [
      "https://twitter.com/nobetcieczanem",
      "https://instagram.com/nobetcieczanem",
      "https://facebook.com/nobetcieczanem"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Turkish"],
      "areaServed": "TR"
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <footer className="mt-auto w-full bg-gradient-to-b from-[var(--color-bg)] to-[var(--color-bg-secondary)] border-t border-[var(--color-border)]" itemScope itemType="https://schema.org/WPFooter">
        <div className="max-w-[1600px] mx-auto px-6 py-12">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
            
            <div className="lg:col-span-3">
              <Link href="/" className="flex items-center gap-3 mb-4 group" itemProp="url" title={`${shortDate} Nöbetçi Eczane Anasayfa`}>
                <div className="size-12 text-[var(--color-primary)] group-hover:scale-110 transition-transform">
                  <Image src="/logo.svg" alt="Nöbetçi Eczanem Logo" width={48} height={48} priority />
                </div>
                <div>
                  <h2 className="text-xl font-black text-[var(--color-text)] group-hover:text-[var(--color-primary)] transition-colors" itemProp="name">Nöbetçi Eczanem</h2>
                  <p className="text-xs text-[var(--color-primary)] font-medium">{shortDate} Güncel</p>
                </div>
              </Link>
              <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-6" itemProp="description">
                Türkiye&apos;nin 81 ilinde {formattedDate} tarihinde nöbetçi olan tüm eczanelerin güncel listesi. Adres, telefon ve konum bilgileriyle size en yakın açık eczaneyi kolayca bulun.
              </p>
              <div className="flex items-center gap-3 p-3 bg-[var(--color-primary-muted)] rounded-xl border border-[var(--color-primary)]/20 mb-4">
                <span className="material-symbols-outlined text-[var(--color-primary)]">emergency</span>
                <div>
                  <p className="text-xs font-bold text-[var(--color-text)]">Acil Durumlar İçin</p>
                  <a href="tel:112" className="text-lg font-black text-[var(--color-primary)] hover:underline" title="Acil Sağlık Hizmetleri 112">112</a>
                </div>
              </div>
              <div className="flex gap-2 mb-4">
                <a href="https://twitter.com/nobetcieczanem" target="_blank" rel="noopener noreferrer nofollow" className="size-9 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg flex items-center justify-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all text-[var(--color-text-secondary)]" title="Twitter" aria-label="Twitter'da Takip Edin">
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="https://instagram.com/nobetcieczanem" target="_blank" rel="noopener noreferrer nofollow" className="size-9 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg flex items-center justify-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all text-[var(--color-text-secondary)]" title="Instagram" aria-label="Instagram'da Takip Edin">
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="https://facebook.com/nobetcieczanem" target="_blank" rel="noopener noreferrer nofollow" className="size-9 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-lg flex items-center justify-center hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-all text-[var(--color-text-secondary)]" title="Facebook" aria-label="Facebook'ta Takip Edin">
                  <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
              <div className="text-xs text-[var(--color-text-muted)] space-y-1">
                <p className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-green-500">verified</span>
                  SSL Sertifikalı Güvenli Site
                </p>
                <p>Son Güncelleme: {formattedDate}</p>
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-bold mb-4 text-[var(--color-text)] flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--color-primary)] text-lg">star</span>
                En Popüler İller
              </h3>
              <nav>
                <ul className="space-y-2 text-sm">
                  {topCities.map((il) => (
                    <li key={il.plaka}>
                      <Link href={`/${normalizeForUrl(il.label)}-nobetci-eczane`} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1" title={`${il.label} ${shortDate} Nöbetçi Eczane Listesi - Adres ve Telefon`}>
                        <span className="text-[var(--color-primary)]">›</span>
                        {il.label} Nöbetçi Eczane
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-bold mb-4 text-[var(--color-text)] flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--color-primary)] text-lg">location_city</span>
                Marmara Bölgesi
              </h3>
              <nav>
                <ul className="space-y-2 text-sm">
                  {marmaraCities.map((il) => (
                    <li key={il.plaka}>
                      <Link href={`/${normalizeForUrl(il.label)}-nobetci-eczane`} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1" title={`${il.label} Nöbetçi Eczane`}>
                        <span className="text-[var(--color-primary)]">›</span>
                        {il.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-bold mb-4 text-[var(--color-text)] flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--color-primary)] text-lg">wb_sunny</span>
                Ege Bölgesi
              </h3>
              <nav>
                <ul className="space-y-2 text-sm">
                  {egeCities.map((il) => (
                    <li key={il.plaka}>
                      <Link href={`/${normalizeForUrl(il.label)}-nobetci-eczane`} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1" title={`${il.label} Nöbetçi Eczane`}>
                        <span className="text-[var(--color-primary)]">›</span>
                        {il.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <h3 className="font-bold mt-6 mb-4 text-[var(--color-text)] flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--color-primary)] text-lg">beach_access</span>
                Akdeniz Bölgesi
              </h3>
              <nav>
                <ul className="space-y-2 text-sm">
                  {akdenizCities.map((il) => (
                    <li key={il.plaka}>
                      <Link href={`/${normalizeForUrl(il.label)}-nobetci-eczane`} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1" title={`${il.label} Nöbetçi Eczane`}>
                        <span className="text-[var(--color-primary)]">›</span>
                        {il.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-bold mb-4 text-[var(--color-text)] flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--color-primary)] text-lg">landscape</span>
                İç Anadolu
              </h3>
              <nav>
                <ul className="space-y-2 text-sm">
                  {icAnadoluCities.map((il) => (
                    <li key={il.plaka}>
                      <Link href={`/${normalizeForUrl(il.label)}-nobetci-eczane`} className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1" title={`${il.label} Nöbetçi Eczane`}>
                        <span className="text-[var(--color-primary)]">›</span>
                        {il.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            <div className="lg:col-span-1">
              <h3 className="font-bold mb-4 text-[var(--color-text)] flex items-center gap-2">
                <span className="material-symbols-outlined text-[var(--color-primary)] text-lg">info</span>
                Hızlı Linkler
              </h3>
              <nav>
                <ul className="space-y-2 text-sm">
                  <li>
                    <Link href="/" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1" title="Anasayfa">
                      <span className="text-[var(--color-primary)]">›</span>
                      Anasayfa
                    </Link>
                  </li>
                  <li>
                    <Link href="/nasil-calisir" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1" title="Nasıl Çalışır?">
                      <span className="text-[var(--color-primary)]">›</span>
                      Nasıl Çalışır?
                    </Link>
                  </li>
                  <li>
                    <Link href="/iletisim" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1" title="İletişim">
                      <span className="text-[var(--color-primary)]">›</span>
                      İletişim
                    </Link>
                  </li>
                  <li>
                    <Link href="/kullanim-kosullari" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1" title="Kullanım Koşulları">
                      <span className="text-[var(--color-primary)]">›</span>
                      Kullanım Koşulları
                    </Link>
                  </li>
                  <li>
                    <Link href="/gizlilik-politikasi" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1" title="Gizlilik Politikası">
                      <span className="text-[var(--color-primary)]">›</span>
                      Gizlilik Politikası
                    </Link>
                  </li>
                  <li>
                    <Link href="/kvkk" className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)] transition-colors flex items-center gap-1" title="KVKK Aydınlatma Metni">
                      <span className="text-[var(--color-primary)]">›</span>
                      KVKK
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          <div className="border-t border-[var(--color-border)] pt-8 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <h3 className="font-bold mb-4 text-[var(--color-text)] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[var(--color-primary)] text-lg">water_drop</span>
                  Karadeniz Bölgesi
                </h3>
                <nav>
                  <div className="flex flex-wrap gap-2">
                    {karadenizCities.map((il) => (
                      <Link key={il.plaka} href={`/${normalizeForUrl(il.label)}-nobetci-eczane`} className="px-3 py-1.5 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full text-xs text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors" title={`${il.label} Nöbetçi Eczane`}>
                        {il.label}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-[var(--color-text)] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[var(--color-primary)] text-lg">terrain</span>
                  Doğu Anadolu
                </h3>
                <nav>
                  <div className="flex flex-wrap gap-2">
                    {doguCities.map((il) => (
                      <Link key={il.plaka} href={`/${normalizeForUrl(il.label)}-nobetci-eczane`} className="px-3 py-1.5 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full text-xs text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors" title={`${il.label} Nöbetçi Eczane`}>
                        {il.label}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-[var(--color-text)] flex items-center gap-2">
                  <span className="material-symbols-outlined text-[var(--color-primary)] text-lg">sunny</span>
                  Güneydoğu Anadolu
                </h3>
                <nav>
                  <div className="flex flex-wrap gap-2">
                    {guneydoguCities.map((il) => (
                      <Link key={il.plaka} href={`/${normalizeForUrl(il.label)}-nobetci-eczane`} className="px-3 py-1.5 bg-[var(--color-bg-card)] border border-[var(--color-border)] rounded-full text-xs text-[var(--color-text-secondary)] hover:border-[var(--color-primary)] hover:text-[var(--color-primary)] transition-colors" title={`${il.label} Nöbetçi Eczane`}>
                        {il.label}
                      </Link>
                    ))}
                  </div>
                </nav>
              </div>
            </div>
          </div>

          <div className="bg-[var(--color-bg-card)] rounded-2xl p-6 border border-[var(--color-border)] mb-8">
            <h3 className="font-bold mb-3 text-[var(--color-text)] flex items-center gap-2">
              <span className="material-symbols-outlined text-[var(--color-primary)]">info</span>
              Nöbetçi Eczanem Nedir?
            </h3>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
              <strong className="text-[var(--color-text)]">Nöbetçi Eczanem</strong>, {formattedDate} tarihinde ve her gün Türkiye&apos;nin 81 ilinde nöbetçi olan eczanelerin güncel listesini sunan ücretsiz bir sağlık bilgi platformudur. İstanbul, Ankara, İzmir, Bursa, Antalya başta olmak üzere tüm illerdeki {shortDate} nöbetçi eczane listelerine anında ulaşabilirsiniz. Eczane adresleri, telefon numaraları ve harita üzerinde konum bilgileriyle size en yakın açık eczaneyi kolayca bulabilirsiniz. <strong className="text-[var(--color-text)]">Verilerimiz Türkiye İlaç ve Tıbbi Cihaz Kurumu (TİTCK) ve il sağlık müdürlüklerinden alınarak düzenli olarak güncellenmektedir. <strong></strong> Acil sağlık durumlarında 112 Acil Sağlık Hizmetlerini arayabilirsiniz.</strong>
            </p>
          </div>

          <div className="flex flex-col items-center gap-6 pt-6 border-t border-[var(--color-border)]">
            <PWAInstallButton />
            
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6 w-full">
              <div className="text-center lg:text-left">
                <p className="text-xs text-[var(--color-text-muted)]">
                  © 2025 - {new Date().getFullYear()}  <strong className="text-[var(--color-text)]"> Nöbetçi Eczanem</strong>. Tüm hakları saklıdır.
                </p>
              </div>
              <nav className="flex flex-wrap items-center justify-center gap-4 text-xs">
              <Link href="/kullanim-kosullari" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors" title="Kullanım Koşulları">
                Kullanım Koşulları
              </Link>
              <span className="text-[var(--color-border)]">•</span>
              <Link href="/gizlilik-politikasi" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors" title="Gizlilik Politikası">
                Gizlilik Politikası
              </Link>
              <span className="text-[var(--color-border)]">•</span>
              <Link href="/kvkk" className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors" title="KVKK Aydınlatma Metni">
                KVKK
              </Link>
              <span className="text-[var(--color-border)]">•</span>
              <span className="text-[var(--color-text)]">
                <a
                  href="https://apiservisim.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--color-text)] hover:text-[var(--color-primary)] transition-colors font-semibold"
                  title="API Servisim"
                >
                  API Servisim
                </a>{" "}
                tarafından desteklenmektedir.
              </span>
            </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export function FooterSkeleton() {
  return (
    <footer className="mt-auto w-full bg-[var(--color-bg)] border-t border-[var(--color-border)] py-12">
      <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-3">
          <div className="flex items-center gap-3 mb-4">
            <div className="skeleton size-12 rounded-xl" />
            <div>
              <div className="skeleton w-40 h-5 rounded mb-1" />
              <div className="skeleton w-24 h-3 rounded" />
            </div>
          </div>
          <div className="skeleton w-full h-16 rounded mb-4" />
          <div className="skeleton w-full h-14 rounded-xl" />
        </div>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="lg:col-span-1.5">
            <div className="skeleton w-28 h-5 rounded mb-4" />
            <div className="space-y-2">
              {[1, 2, 3, 4, 5, 6].map((j) => (
                <div key={j} className="skeleton w-24 h-4 rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </footer>
  );
}
