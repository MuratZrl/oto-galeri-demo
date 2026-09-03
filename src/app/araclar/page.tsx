import { Suspense } from "react";
import type { Metadata } from "next";
import { CarCatalog } from "@/components/CarCatalog";
import { site } from "@/config/site";
import { cars } from "@/data/cars";

const description = `${site.name} stoğundaki ${cars.length} ikinci el aracı marka, yakıt, vites ve fiyata göre filtreleyin.`;

export const metadata: Metadata = {
  title: "Araçlar",
  description,
  robots: { index: false, follow: false },
  openGraph: {
    title: `Araçlar | ${site.name}`,
    description,
  },
};

export default function CarsPage() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:py-16">
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
          Stok
        </p>
        <h1 className="mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl">
          Araçlar
        </h1>
        <p className="mt-3 max-w-xl text-ink-soft/80">
          Tüm araçlar ekspertiz raporludur. Beğendiğiniz aracı WhatsApp
          üzerinden sorun, randevu alıp yerinde görün.
        </p>
      </div>
      <Suspense
        fallback={
          <p className="text-sm font-semibold text-ink-soft">
            Araçlar yükleniyor...
          </p>
        }
      >
        <CarCatalog />
      </Suspense>
    </section>
  );
}
