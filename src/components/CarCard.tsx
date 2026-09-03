import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/data/cars";
import { carTitle, formatKm, formatPrice } from "@/lib/format";
import {
  ArrowRightIcon,
  FuelIcon,
  GaugeIcon,
  GearboxIcon,
} from "@/components/icons";

interface CarCardProps {
  car: Car;
  priority?: boolean;
}

export function CarCard({ car, priority = false }: CarCardProps) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-ink/10">
      <Link
        href={`/araclar/${car.slug}`}
        className="absolute inset-0 z-10 rounded-2xl"
        aria-label={`${carTitle(car)} ilanını incele`}
      />
      <div className="relative aspect-[3/2] overflow-hidden bg-paper-deep">
        <Image
          src={car.photos[0]}
          alt={carTitle(car)}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 384px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute left-3 top-3 rounded-md bg-ink/85 px-2 py-1 font-display text-xs font-bold tracking-wide text-white backdrop-blur">
          {car.year}
        </span>
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent px-4 pb-3 pt-10">
          <span className="font-display text-xl font-bold text-white">
            {formatPrice(car.price)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4 sm:p-5">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
            {car.brand}
          </p>
          <h3 className="mt-1 font-display text-lg font-bold leading-snug tracking-tight">
            {car.model}
          </h3>
        </div>

        <ul className="flex flex-wrap gap-2 text-xs font-semibold text-ink-soft">
          <li className="inline-flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-1">
            <GaugeIcon className="h-3.5 w-3.5 text-ink-muted" />
            {formatKm(car.km)}
          </li>
          <li className="inline-flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-1">
            <FuelIcon className="h-3.5 w-3.5 text-ink-muted" />
            {car.fuel}
          </li>
          <li className="inline-flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-1">
            <GearboxIcon className="h-3.5 w-3.5 text-ink-muted" />
            {car.gearbox}
          </li>
        </ul>

        <span className="mt-auto inline-flex items-center gap-2 text-sm font-bold text-ink transition group-hover:text-accent">
          İncele
          <ArrowRightIcon className="h-4 w-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
