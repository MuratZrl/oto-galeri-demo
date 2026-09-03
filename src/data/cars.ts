export const fuels = ["Benzin", "Dizel", "Hibrit"] as const;
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

function photoSet(seed: string, count: number): string[] {
  return Array.from(
    { length: count },
    (_, i) => `https://picsum.photos/seed/${seed}-${i + 1}/1200/800`,
  );
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
    photos: photoSet("egea-2021", 5),
    featured: true,
  },
  {
    slug: "renault-clio-2022",
    brand: "Renault",
    model: "Clio 1.0 TCe Touch",
    year: 2022,
    km: 45_000,
    fuel: "Benzin",
    gearbox: "Otomatik",
    color: "Gri",
    price: 950_000,
    description:
      "Düşük kilometreli, garantisi devam eden otomatik vites Clio. Geri görüş kamerası, dijital gösterge paneli ve Apple CarPlay desteği bulunuyor. Takas ve kredi imkanı vardır.",
    photos: photoSet("clio-2022", 6),
    featured: true,
  },
  {
    slug: "toyota-corolla-hybrid-2021",
    brand: "Toyota",
    model: "Corolla 1.8 Hybrid Dream",
    year: 2021,
    km: 92_000,
    fuel: "Hibrit",
    gearbox: "Otomatik",
    color: "Gümüş",
    price: 1_350_000,
    description:
      "Şehir içinde 4 litrenin altında yakıt tüketen hibrit Corolla. Hibrit batarya garantisi devam ediyor, servis geçmişi eksiksiz. Hatasız, değişensiz araç.",
    photos: photoSet("corolla-2021", 6),
    featured: true,
  },
  {
    slug: "volkswagen-passat-2019",
    brand: "Volkswagen",
    model: "Passat 1.6 TDI Business",
    year: 2019,
    km: 145_000,
    fuel: "Dizel",
    gearbox: "Otomatik",
    color: "Siyah",
    price: 1_450_000,
    description:
      "Uzun yol için düşünülmüş, DSG şanzımanlı dizel Passat. Deri döşeme, LED farlar ve adaptif hız sabitleyici standart. Yeni lastikler ve yeni triger bakımı yapıldı.",
    photos: photoSet("passat-2019", 5),
    featured: false,
  },
  {
    slug: "honda-civic-2020",
    brand: "Honda",
    model: "Civic 1.6 i-VTEC Eco Elegance",
    year: 2020,
    km: 78_000,
    fuel: "Benzin",
    gearbox: "Otomatik",
    color: "Kırmızı",
    price: 1_250_000,
    description:
      "Sorunsuz motoruyla bilinen 1.6 i-VTEC Civic, tek elden ve bakımlı. Cam tavan, ısıtmalı koltuklar ve kör nokta kamerası mevcut. Ağır hasar kaydı yok, ekspertiz raporuyla teslim edilir.",
    photos: photoSet("civic-2020", 6),
    featured: false,
  },
  {
    slug: "hyundai-i20-2020",
    brand: "Hyundai",
    model: "i20 1.4 MPI Style",
    year: 2020,
    km: 61_000,
    fuel: "Benzin",
    gearbox: "Otomatik",
    color: "Mavi",
    price: 820_000,
    description:
      "Şehir içi kullanım için pratik, otomatik vitesli i20. Park sensörü, geri görüş kamerası ve ısıtmalı direksiyon bulunuyor. Boyasız ve değişensiz, ekspertizli araç.",
    photos: photoSet("i20-2020", 5),
    featured: false,
  },
];

export const featuredCars = cars.filter((car) => car.featured);

export function getCarBySlug(slug: string): Car | undefined {
  return cars.find((car) => car.slug === slug);
}
