import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CarCard } from "@/components/CarCard";
import {
  ArrowRightIcon,
  CheckIcon,
  ClockIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { fullAddress, site } from "@/config/site";
import { cars, featuredCars } from "@/data/cars";
import { telHref, whatsappUrl } from "@/lib/format";

const homeTitle = `${site.name} | ${site.district}`;

export const metadata: Metadata = {
  title: { absolute: homeTitle },
  description: site.description,
  robots: { index: false, follow: false },
  openGraph: {
    title: homeTitle,
    description: site.description,
  },
};

const highlights = [
  "Ekspertiz raporlu araçlar",
  "Takas ve kredi imkanı",
  "Noter işlemlerinde destek",
] as const;

export default function HomePage() {
  const heroCar = featuredCars[0] ?? cars[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 hidden h-full w-[42%] skew-x-[-8deg] bg-accent/90 lg:block"
        />
        <div className="mx-auto grid max-w-6xl gap-10 px-5 pb-16 pt-14 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-24 lg:pt-20">
          <div className="relative z-10 flex flex-col items-start gap-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
              <MapPinIcon className="h-3.5 w-3.5 text-accent" />
              {site.district} / {site.city}
            </p>
            <h1 className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-6xl lg:text-7xl">
              {site.name}
            </h1>
            <p className="max-w-md text-lg leading-relaxed text-white/75 sm:text-xl">
              {site.slogan}
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={whatsappUrl("Merhaba, araçlarınız hakkında bilgi almak istiyorum")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-bold text-white shadow-lg shadow-whatsapp/25 transition hover:bg-whatsapp-deep"
              >
                <WhatsAppIcon className="h-5 w-5" />
                WhatsApp&apos;tan yaz
              </a>
              <Link
                href="/araclar"
                className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3.5 font-bold text-white transition hover:border-white hover:bg-white hover:text-ink"
              >
                Araçları gör
                <ArrowRightIcon className="h-5 w-5" />
              </Link>
            </div>
            <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
              {highlights.map((item) => (
                <li key={item} className="inline-flex items-center gap-2">
                  <CheckIcon className="h-4 w-4 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 lg:pl-6">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white/10 shadow-2xl shadow-black/40 lg:rotate-[-2deg]">
              <Image
                src={heroCar.photos[0]}
                alt={`${heroCar.brand} ${heroCar.model}`}
                fill
                priority
                sizes="(min-width: 1024px) 520px, 100vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-5 left-4 rounded-xl bg-paper px-4 py-3 text-ink shadow-xl lg:-left-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-accent">
                Stokta
              </p>
              <p className="font-display text-2xl font-extrabold leading-none">
                {cars.length} araç
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured cars */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8 lg:py-24">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Vitrin
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Öne çıkan araçlar
            </h2>
          </div>
          <Link
            href="/araclar"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink underline-offset-4 transition hover:text-accent hover:underline"
          >
            Tüm araçlar
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCars.map((car) => (
            <li key={car.slug}>
              <CarCard car={car} />
            </li>
          ))}
        </ul>
      </section>

      {/* About */}
      <section className="bg-paper-deep">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-16 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:py-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              Hakkımızda
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Pendik&apos;te 2009&apos;dan beri
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-ink-soft">
            {site.name}, Pendik Kurtköy&apos;de aile işletmesi olarak hizmet
            veren bir ikinci el araç galerisidir. Sattığımız her araç bağımsız
            ekspertizden geçer, raporu alıcıya olduğu gibi teslim edilir.
            Takas, kredi ve noter işlemlerinde baştan sona yanınızdayız.
          </p>
        </div>
      </section>

      {/* Contact */}
      <section
        id="iletisim"
        className="mx-auto max-w-6xl scroll-mt-20 px-5 py-16 sm:px-8 lg:py-24"
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
          İletişim
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Gelin, aracı yerinde görün
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="flex flex-col gap-6 rounded-2xl border border-line bg-white p-6 shadow-sm">
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <MapPinIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display font-bold">Adres</h3>
                <p className="mt-1 text-ink-soft">{fullAddress}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <PhoneIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display font-bold">Telefon</h3>
                <a
                  href={telHref}
                  className="mt-1 block text-lg font-bold text-ink underline-offset-4 hover:text-accent hover:underline"
                >
                  {site.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
                <ClockIcon className="h-5 w-5" />
              </span>
              <div>
                <h3 className="font-display font-bold">Çalışma saatleri</h3>
                <ul className="mt-1 space-y-1 text-ink-soft">
                  {site.hours.map((h) => (
                    <li key={h.days}>
                      {h.days}: {h.time}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-white transition hover:bg-whatsapp-deep"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp&apos;tan yaz
            </a>
          </div>

          <div
            role="img"
            aria-label="Harita alanı"
            className="relative min-h-72 overflow-hidden rounded-2xl border-2 border-dashed border-line bg-paper-deep"
          >
            <div
              aria-hidden
              className="absolute inset-0 opacity-40 [background-image:linear-gradient(var(--color-line)_1px,transparent_1px),linear-gradient(90deg,var(--color-line)_1px,transparent_1px)] [background-size:32px_32px]"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
              <span className="grid h-14 w-14 place-items-center rounded-full bg-accent text-white shadow-lg shadow-accent/30">
                <MapPinIcon className="h-7 w-7" />
              </span>
              <p className="font-display text-lg font-bold">Harita alanı</p>
              <p className="max-w-xs text-sm text-ink-soft/80">
                Gerçek sitede buraya Google Haritalar yerleşimi ve yol tarifi
                bağlantısı eklenir.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
