# Nöbetçi Eczanem

Türkiye'nin **81 ilinde** güncel nöbetçi eczane bilgilerine saniyeler içinde ulaşabileceğiniz modern web uygulaması.

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

## Demo

🔗 **Canlı Site:** [nobetcieczanem.com](https://nobetcieczanem.com)

## Özellikler

### Kullanıcı Deneyimi
- **81 İl Desteği** — Türkiye'nin tüm illerinde nöbetçi eczane bilgileri
- **İlçe Filtreleme** — İlçe bazında eczane listesi görüntüleme
- **Tek Tıkla Arama** — Eczaneyi direkt telefondan arama
- **Yol Tarifi** — Google Maps entegrasyonu ile konum bilgisi
- **PWA Desteği** — Mobil cihazlara yüklenebilir uygulama
- **Konum Bazlı Arama** — GPS ile en yakın eczaneleri bulma

### Teknik Özellikler
- **API Şifreleme** — AES-256-GCM ile şifrelenmiş API yanıtları
- **Akıllı Cache** — unstable_cache ile optimize edilmiş veri önbelleği
- **SEO Optimize** — Dinamik meta etiketleri, JSON-LD schema, sitemap
- **Server-Side Rendering** — Next.js App Router ile SSR/ISR
- **Responsive Tasarım** — Tüm cihazlarda uyumlu arayüz
- **GSAP Animasyonlar** — Profesyonel kullanıcı deneyimi

## Teknoloji Stack

| Teknoloji | Versiyon | Kullanım Alanı |
|-----------|----------|----------------|
| Next.js | 16.1 | React Framework (App Router) |
| TypeScript | 5.x | Tip Güvenliği |
| TailwindCSS | 4.x | Stil Yönetimi |
| GSAP | 3.14 | Animasyonlar |
| Sonner | 2.x | Bildirim Sistemi |

## Kurulum

```bash
git clone https://github.com/kullanici/nobetci-eczane.git
cd nobetci-eczane
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

## Ortam Değişkenleri

Proje kök dizininde `.env.local` dosyası oluşturun:

```env
NEXT_PUBLIC_SITE_URL=https://nobetcieczanem.com
ENCRYPTION_KEY=your-secret-key
GOOGLE_SITE_VERIFICATION=your-verification-code
```

## Proje Yapısı

```
src/
├── app/
│   ├── [slug]/[[...params]]/   → Dinamik il/ilçe sayfaları
│   ├── api/eczane/             → Şifreli API endpoint
│   ├── gizlilik-politikasi/    → Gizlilik politikası
│   ├── hakkimizda/             → Hakkımızda sayfası
│   ├── iletisim/               → İletişim sayfası
│   ├── kullanim-kosullari/     → Kullanım koşulları
│   ├── kvkk/                   → KVKK aydınlatma metni
│   ├── nasil-calisir/          → Nasıl çalışır sayfası
│   ├── layout.tsx              → Root layout
│   └── page.tsx                → Ana sayfa
├── components/
│   ├── seo/                    → JSON-LD schema bileşenleri
│   └── ui/                     → UI bileşenleri
├── constants/
│   ├── iller.ts                → 81 il verisi (koordinatlar dahil)
│   └── index.ts                → API ve cache konfigürasyonu
├── hooks/
│   └── usePWA.ts               → PWA hook
├── lib/
│   ├── api-client.ts           → Harici API istemcisi
│   ├── cache.ts                → Bellek içi cache yönetimi
│   ├── crypto.ts               → AES-256-GCM şifreleme
│   ├── date-utils.ts           → Tarih yardımcı fonksiyonları
│   ├── url-utils.ts            → URL yardımcı fonksiyonları
│   └── validator.ts            → Input doğrulama
└── types/
    └── eczane.ts               → TypeScript tip tanımları
```

## API Şifreleme

API yanıtları AES-256-GCM algoritmasıyla şifrelenir:

```json
{"_e":"U2FsdGVkX1...şifrelenmiş_veri..."}
```

Bu sayede:
- Eczane verileri DevTools'da okunamaz
- Veri kazıma (scraping) önlenir
- Kullanıcı gizliliği korunur

## SEO Optimizasyonu

- **Dinamik Meta Etiketleri** — Her il için özel title/description
- **JSON-LD Schema** — LocalBusiness, FAQ, Pharmacy, WebSite şemaları
- **Otomatik Sitemap** — 81 il için dinamik sitemap.xml
- **Canonical URL'ler** — Duplicate content önleme
- **Open Graph & Twitter Cards** — Sosyal medya paylaşım kartları

## Performans

| Metrik | Skor |
|--------|------|
| Performance | 98+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

*Lighthouse skorları*

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kullanici/nobetci-eczane)

1. GitHub'a push yapın
2. Vercel üzerinden repository'yi bağlayın
3. Environment variables ekleyin
4. Deploy butonuna tıklayın

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/yeni-ozellik`)
3. Değişikliklerinizi commit edin (`git commit -m 'Yeni özellik eklendi'`)
4. Branch'e push yapın (`git push origin feature/yeni-ozellik`)
5. Pull Request açın

## Lisans

MIT License

## Teşekkürler

Nöbetçi eczane verilerini sağlayan [apiservisim.vercel.app](https://apiservisim.vercel.app)'e teşekkürler.

---

<p align="center">
  <b>Sağlıklı günler!</b> 💊
</p>
