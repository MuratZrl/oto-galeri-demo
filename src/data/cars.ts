export const fuels = ["Benzin", "Dizel", "Hibrit", "Elektrik"] as const;
export const gearboxes = ["Manuel", "Otomatik"] as const;

export type Fuel = (typeof fuels)[number];
export type Gearbox = (typeof gearboxes)[number];

export interface Car {
  slug: string;
  brand: string;
  model: string;
  year: number;
  km: number;
  fuel: Fuel;
  gearbox: Gearbox;
  color: string;
  /** Price in Turkish lira. */
  price: number;
  description: string;
  photos: readonly string[];
  /** Shown in the "Öne çıkan araçlar" section on the home page. */
  featured: boolean;
}

/** Local photos live in public/cars/<slug>/1.jpg .. <count>.jpg */
function photoSet(slug: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/cars/${slug}/${i + 1}.jpg`);
}

export const cars: readonly Car[] = [
  {
    slug: "fiat-egea-2021",
    brand: "Fiat",
    model: "Egea 1.4 Fire Urban",
    year: 2021,
    km: 68_000,
    fuel: "Benzin",
    gearbox: "Manuel",
    color: "Beyaz",
    price: 780_000,
    description:
      "İlk sahibinden, tüm bakımları yetkili serviste yapılmış Egea. Değişensiz ve boyasız, ekspertiz raporu mevcut. Ekonomik yakıt tüketimiyle günlük kullanım için ideal.",
    photos: photoSet("fiat-egea-2021", 4),
    featured: true,
  },
  {
    slug: "renault-clio-rs-2011",
    brand: "Renault",
    model: "Clio III 2.0 RS",
    year: 2011,
    km: 140_000,
    fuel: "Benzin",
    gearbox: "Manuel",
    color: "Siyah",
    price: 875_000,
    description:
      "Renault Sport imzalı, doğal emişli 2.0 motoruyla 200 beygir üreten Clio III RS. Orijinal jantları ve Recaro koltukları yerinde, koleksiyon değeri her yıl artıyor. Bakımları düzenli, ağır hasar kaydı yok.",
    photos: photoSet("renault-clio-rs-2011", 4),
    featured: true,
  },
  {
    slug: "mercedes-a180-2017",
    brand: "Mercedes-Benz",
    model: "A180 1.6 AMG Line",
    year: 2017,
    km: 110_000,
    fuel: "Benzin",
    gearbox: "Otomatik",
    color: "Kırmızı",
    price: 1_690_000,
    description:
      "AMG Line paketli, 7G-DCT çift kavramalı şanzımanlı A180. Panoramik cam tavan, LED farlar ve geri görüş kamerası mevcut. Yetkili servis bakımlı, ekspertiz raporuyla teslim edilir.",
    photos: photoSet("mercedes-a180-2017", 5),
    featured: true,
  },
  {
    slug: "mercedes-amg-eqe-53-2023",
    brand: "Mercedes-Benz",
    model: "AMG EQE 53 4MATIC+",
    year: 2023,
    km: 25_000,
    fuel: "Elektrik",
    gearbox: "Otomatik",
    color: "Siyah",
    price: 5_950_000,
    description:
      "Çift elektrik motorundan 625 beygir üreten, dört çeker AMG EQE 53. 0-100 km/s hızlanması 3,5 saniye, WLTP menzili 500 kilometrenin üzerinde. İlk sahibinden, garantisi devam ediyor, hatasız.",
    photos: photoSet("mercedes-amg-eqe-53-2023", 5),
    featured: false,
  },
];

export const featuredCars = cars.filter((car) => car.featured);

export function getCarBySlug(slug: string): Car | undefined {
  return cars.find((car) => car.slug === slug);
}
