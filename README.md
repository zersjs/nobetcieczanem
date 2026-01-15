# Nöbetçi Eczanem

Türkiye'nin **81 ilinde** güncel nöbetçi eczane bilgilerine saniyeler içinde ulaşabileceğiniz modern web uygulaması.

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 🚀 Özellikler

### Kullanıcı Deneyimi
- **81 İl Desteği** — Türkiye'nin tüm illerinde nöbetçi eczane bilgileri
- **İlçe Filtreleme** — Sadece bulunduğun ilçedeki eczaneleri gör
- **Tek Tıkla Arama** — Eczaneyi direkt telefonundan ara
- **Yol Tarifi** — Google Maps entegrasyonu ile anında yol tarifi al

### Teknik
- **API Şifreleme** — AES-256-GCM ile şifrelenmiş API yanıtları (DevTools'da okunamaz)
- **Akıllı Cache** — 5 dakikalık önbellek ile hızlı yanıtlar
- **SEO Optimize** — Her il için ayrı sayfa, JSON-LD schema, dinamik sitemap
- **Server-Side Rendering** — İlk yüklemede anında içerik
- **GSAP Animasyonlar** — Akıcı ve profesyonel kullanıcı deneyimi

---

## 🛠️ Teknoloji Stack

| Teknoloji | Versiyon | Açıklama |
|-----------|----------|----------|
| Next.js | 16.1 | React framework (App Router) |
| TypeScript | 5.x | Tip güvenli geliştirme |
| TailwindCSS | 4.x | Utility-first CSS |
| GSAP | 3.14 | Profesyonel animasyonlar |
| Sonner | 2.x | Toast bildirimleri |

---

## 📦 Kurulum

```bash
# Repo'yu klonla
git clone https://github.com/kullanici/nobetci-eczane.git
cd nobetci-eczane

# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini aç.

---

## ⚙️ Ortam Değişkenleri

Proje kök dizininde `.env.local` dosyası oluştur:

```env
NEXT_PUBLIC_SITE_URL=https://senin-domain.com
NEXT_PUBLIC_API_URL=http://localhost:3000
ENCRYPTION_KEY=kendi-gizli-anahtarin 
```

---

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── [slug]/[[...params]]/   # Dinamik il/ilçe sayfaları
│   ├── api/eczane/             # Şifreli API endpoint
│   ├── gizlilik-politikasi/    # Statik sayfalar
│   ├── hakkimizda/
│   ├── iletisim/
│   └── page.tsx                # Ana sayfa
├── components/
│   ├── seo/                    # JSON-LD schema bileşenleri
│   └── ui/                     # UI bileşenleri
├── constants/
│   └── iller.ts                # 81 il verisi
├── hooks/
│   └── usePWA.ts               # PWA hook
├── lib/
│   ├── api-client.ts           # Harici API istemcisi
│   ├── cache.ts                # Bellek içi cache
│   ├── crypto.ts               # AES-256-GCM şifreleme
│   ├── date-utils.ts           # Tarih yardımcıları
│   ├── url-utils.ts            # URL yardımcıları
│   └── validator.ts            # Girdi doğrulama
└── types/
    └── eczane.ts               # TypeScript tipleri
```

---

## 🔐 API Şifreleme

API yanıtları AES-256-GCM algoritmasıyla şifrelenir. DevTools > Network sekmesinde görünen yanıt:

```json
{"_e":"ŞİFRELİ_BASE64_VERİ DÖNDÜRÜR..."}
```

Bu sayede:
- Eczane bilgileri DevTools'da okunamaz
- Veri kazıma (scraping) zorlaşır
- Kullanıcı gizliliği korunur

---

## 🌐 SEO

- **Dinamik Meta Etiketleri** — Her il için özel title/description
- **JSON-LD Schema** — LocalBusiness, FAQ, Pharmacy şemaları
- **Otomatik Sitemap** — 81 il için dinamik sitemap.xml
- **Canonical URL'ler** — Duplicate content önleme
- **Open Graph** — Sosyal medya paylaşım kartları


## 🚢 Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kullanici/nobetci-eczane)

1. GitHub'a push'la
2. [vercel.com](https://vercel.com) üzerinden repo'yu bağla
3. Environment Variables ekle
4. Deploy'a tıkla — bitti!

---

## 📊 Performans

| Metrik | Skor |
|--------|------|
| Performance | 98+ |
| Accessibility | 100 |
| Best Practices | 100 |
| SEO | 100 |

*Lighthouse skorları*

---

## 🤝 Bana Katkıda Bulunmak İstersen;

1. Fork'la
2. Feature branch oluştur (`git checkout -b feature/yeni-ozellik`)
3. Commit'le (`git commit -m 'Yeni özellik eklendi'`)
4. Push'la (`git push origin feature/yeni-ozellik`)
5. Pull Request aç

---

## 📄 Lisans

MIT License — İstediğin gibi kullan, değiştir, dağıt.

---

## Nöbetçi eczane verilerini sağlayan https://apiservisim.vercel.app 'e. 🙏 Sonsuz Teşekkürler.

---

<p align="center">
    <b>Sağlıklı günler! 💊</b> 
</p>
