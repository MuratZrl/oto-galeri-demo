# Demo Oto Galeri

Pendik / İstanbul'daki kurgusal bir ikinci el araç galerisi için tanıtım sitesi. Müşteri adaylarına "gerçek siteniz böyle görünür" demek için hazırlanmış bir demodur: backend, CMS veya admin paneli yoktur, tüm içerik kod içindeki iki dosyadan gelir.

## Teknoloji

- Next.js (App Router, TypeScript strict)
- Tailwind CSS v4
- next/image, fotoğraflar `public/cars/` altında yerel dosya olarak
- next/font/google: Bricolage Grotesque (başlıklar), Manrope (metin)

## Çalıştırma

```bash
npm install
npm run dev
```

Kontroller:

```bash
npm run lint
npm run build
```

## Sayfalar

| Rota | İçerik |
| --- | --- |
| `/` | Hero, öne çıkan 3 araç, hakkımızda, iletişim bloğu ve harita alanı |
| `/araclar` | Tüm araçlar; marka, yakıt, vites, maksimum fiyat filtreleri ve sıralama. Filtre durumu URL'de tutulur (`?marka=Fiat&yakit=Benzin&vites=Manuel&fiyat=1000000&sirala=fiyat-artan`) |
| `/araclar/[slug]` | Fotoğraf galerisi (klavye ile gezilebilir), teknik özellikler, açıklama, mobilde yapışkan WhatsApp / Ara çubuğu |

Her sayfa `robots: noindex, nofollow` ile işaretlidir; demo arama motorlarına açık değildir.

## Gerçek veriyle değiştirme

Site iki dosyadan beslenir. Gerçek bir galeri için yalnızca bunları düzenlemek yeterlidir.

### 1. `src/config/site.ts`: galeri bilgileri

Galeri adı, slogan, telefon, WhatsApp numarası, adres ve çalışma saatleri burada tutulur. Header, footer, iletişim bloğu, `tel:` ve `wa.me` bağlantıları bu dosyayı okur.

- `phoneDisplay`: ziyaretçiye gösterilen biçim, örn. `0216 555 00 00`
- `phoneE164`: `tel:` bağlantısı için uluslararası biçim, örn. `+902165550000`
- `whatsappNumber`: ülke kodu dahil, sadece rakam, örn. `905321234567`

### 2. `src/data/cars.ts`: araç listesi

`cars` dizisindeki her kayıt bir ilandır. Alanlar:

| Alan | Açıklama |
| --- | --- |
| `slug` | URL'de kullanılır, benzersiz olmalı (`/araclar/<slug>`) |
| `brand`, `model`, `year`, `km`, `color` | Teknik özellikler tablosunda ve kartlarda gösterilir |
| `fuel` | `Benzin`, `Dizel`, `Hibrit` veya `Elektrik` |
| `gearbox` | `Manuel` veya `Otomatik` |
| `price` | TL cinsinden tam sayı, biçimlendirme otomatik yapılır |
| `description` | 2-3 cümlelik açıklama |
| `photos` | Fotoğraf yolları; ilk fotoğraf kart ve kapak görseli olur |
| `featured` | `true` olanlar ana sayfadaki "Öne çıkan araçlar" bölümünde çıkar |

Filtrelerdeki marka listesi ve fiyat aralıkları bu diziden otomatik türetilir; ayrıca bir yerde güncelleme gerekmez.

### Fotoğraflar

Fotoğraflar `public/cars/<slug>/1.jpg`, `2.jpg`, ... yolunda tutulur; `photos` alanı `photoSet(slug, adet)` ile bu yolları üretir. Yeni bir araç eklerken aynı adla bir klasör açıp fotoğrafları sırayla numaralandırın, ilk fotoğraf kapak olur. Fotoğrafları yüklemeden önce uzun kenarı 1600 piksele küçültmek sayfa hızı için yeterlidir.

Fotoğrafları bir CDN'den çekecekseniz `next.config.ts` içine `images.remotePatterns` ekleyin ve `photos` alanına tam URL yazın.

### Yayına almadan önce

- `src/app/layout.tsx` ve sayfa dosyalarındaki `robots: { index: false, follow: false }` satırlarını kaldırın veya `index: true` yapın.
- Footer'daki "Bu site bir tanıtım demosudur" notunu silin (`src/components/Footer.tsx`).
