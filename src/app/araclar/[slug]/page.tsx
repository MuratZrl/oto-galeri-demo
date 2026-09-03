import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { site } from "@/config/site";
import { cars, getCarBySlug } from "@/data/cars";
import { carTitle, carWhatsappUrl, formatKm, formatPrice, telHref } from "@/lib/format";

type CarPageProps = PageProps<"/araclar/[slug]">;

export function generateStaticParams() {
  return cars.map((car) => ({ slug: car.slug }));
}

export async function generateMetadata({
  params,
}: CarPageProps): Promise<Metadata> {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) {
    return { title: "İlan bulunamadı", robots: { index: false, follow: false } };
  }

  const title = carTitle(car);
  const description = `${title}, ${formatKm(car.km)}, ${car.fuel}, ${car.gearbox}, ${formatPrice(car.price)}. ${site.name}, ${site.district}.`;

  return {
    title,
    description,
    robots: { index: false, follow: false },
    openGraph: {
      title: `${title} | ${site.name}`,
      description,
      images: [{ url: car.photos[0], width: 1200, height: 800, alt: title }],
    },
  };
}

export default async function CarPage({ params }: CarPageProps) {
  const { slug } = await params;
  const car = getCarBySlug(slug);
  if (!car) notFound();

  const title = carTitle(car);
  const whatsapp = carWhatsappUrl(car);

  const specs = [
    { label: "Marka", value: car.brand },
    { label: "Model", value: car.model },
    { label: "Yıl", value: String(car.year) },
    { label: "Kilometre", value: formatKm(car.km) },
    { label: "Yakıt", value: car.fuel },
    { label: "Vites", value: car.gearbox },
    { label: "Renk", value: car.color },
    { label: "Fiyat", value: formatPrice(car.price) },
  ] as const;

  return (
    <article className="mx-auto max-w-6xl px-5 pb-28 pt-8 sm:px-8 md:pb-16 lg:pt-12">
      <Link
        href="/araclar"
        className="inline-flex items-center gap-1.5 text-sm font-bold text-ink-soft transition hover:text-accent"
      >
        <ChevronLeftIcon className="h-4 w-4" />
        Tüm araçlar
      </Link>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-10">
        <div className="lg:col-start-1 lg:row-start-1">
          <Gallery key={car.slug} photos={car.photos} title={title} />
        </div>

        <aside className="flex flex-col gap-6 lg:sticky lg:top-24 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-start">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
              {car.brand} / {car.year}
            </p>
            <h1 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
              {car.model}
            </h1>
            <p className="mt-4 font-display text-4xl font-extrabold tracking-tight text-ink">
              {formatPrice(car.price)}
            </p>
          </div>

          <div className="hidden gap-3 md:grid">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-bold text-white transition hover:bg-whatsapp-deep"
            >
              <WhatsAppIcon className="h-5 w-5" />
              WhatsApp&apos;tan sor
            </a>
            <a
              href={telHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-ink px-6 py-3 font-bold text-ink transition hover:bg-ink hover:text-white"
            >
              <PhoneIcon className="h-5 w-5" />
              Ara: {site.phoneDisplay}
            </a>
          </div>

          <table className="w-full overflow-hidden rounded-2xl border border-line bg-white text-sm shadow-sm">
            <caption className="sr-only">{title} teknik özellikleri</caption>
            <tbody>
              {specs.map((spec) => (
                <tr key={spec.label} className="border-b border-line last:border-0">
                  <th
                    scope="row"
                    className="px-4 py-3 text-left font-semibold text-ink-muted"
                  >
                    {spec.label}
                  </th>
                  <td className="px-4 py-3 text-right font-bold text-ink">
                    {spec.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <p className="text-xs leading-relaxed text-ink-muted">
            Fiyat ve stok bilgisi değişebilir. Kesin bilgi için lütfen bize
            ulaşın.
          </p>

          <Link
            href="/araclar"
            className="inline-flex items-center gap-2 text-sm font-bold text-ink underline-offset-4 transition hover:text-accent hover:underline"
          >
            Diğer araçlara bak
            <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </aside>

        <section
          aria-labelledby="aciklama"
          className="lg:col-start-1 lg:row-start-2"
        >
          <h2
            id="aciklama"
            className="font-display text-2xl font-bold tracking-tight"
          >
            Açıklama
          </h2>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">
            {car.description}
          </p>
        </section>
      </div>

      {/* Sticky mobile action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-4 py-3 shadow-[0_-8px_24px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
        <div className="mx-auto flex max-w-xl gap-3">
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex flex-[1.4] items-center justify-center gap-2 whitespace-nowrap rounded-full bg-whatsapp px-4 py-3 text-sm font-bold text-white transition hover:bg-whatsapp-deep"
          >
            <WhatsAppIcon className="h-5 w-5 shrink-0" />
            WhatsApp&apos;tan sor
          </a>
          <a
            href={telHref}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-ink px-4 py-3 text-sm font-bold text-ink transition hover:bg-ink hover:text-white"
          >
            <PhoneIcon className="h-5 w-5" />
            Ara
          </a>
        </div>
      </div>
    </article>
  );
}
