"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CarCard } from "@/components/CarCard";
import { cars, fuels, gearboxes, type Car } from "@/data/cars";
import { formatPrice } from "@/lib/format";

const sortOptions = [
  { value: "varsayilan", label: "Varsayılan" },
  { value: "fiyat-artan", label: "Fiyat (artan)" },
  { value: "fiyat-azalan", label: "Fiyat (azalan)" },
  { value: "yil-yeni", label: "Yıl (yeniden eskiye)" },
  { value: "yil-eski", label: "Yıl (eskiden yeniye)" },
] as const;

type SortKey = (typeof sortOptions)[number]["value"];

const sortKeys = sortOptions.map((option) => option.value);

const brands = Array.from(new Set(cars.map((car) => car.brand))).sort((a, b) =>
  a.localeCompare(b, "tr"),
);

const PRICE_STEP = 250_000;
/** One cap per car, rounded up to the next step, deduplicated and ascending. */
const priceCaps = Array.from(
  new Set(cars.map((car) => Math.ceil(car.price / PRICE_STEP) * PRICE_STEP)),
).sort((a, b) => a - b);

const PARAM = {
  brand: "marka",
  fuel: "yakit",
  gearbox: "vites",
  maxPrice: "fiyat",
  sort: "sirala",
} as const;

function pick<T extends string>(
  allowed: readonly T[],
  value: string | null,
): T | null {
  return value !== null && (allowed as readonly string[]).includes(value)
    ? (value as T)
    : null;
}

function parsePrice(value: string | null): number | null {
  if (value === null) return null;
  const parsed = Number(value);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : null;
}

function sortCars(list: Car[], sort: SortKey): Car[] {
  switch (sort) {
    case "fiyat-artan":
      return list.toSorted((a, b) => a.price - b.price);
    case "fiyat-azalan":
      return list.toSorted((a, b) => b.price - a.price);
    case "yil-yeni":
      return list.toSorted((a, b) => b.year - a.year);
    case "yil-eski":
      return list.toSorted((a, b) => a.year - b.year);
    case "varsayilan":
      return list;
  }
}

const selectClass =
  "w-full appearance-none rounded-xl border border-line bg-white px-3.5 py-2.5 pr-9 text-sm font-semibold text-ink shadow-sm transition hover:border-ink-muted focus:border-accent";

const selectWrapClass =
  "relative after:pointer-events-none after:absolute after:right-3.5 after:top-1/2 after:h-2 after:w-2 after:-translate-y-1/2 after:rotate-45 after:border-b-2 after:border-r-2 after:border-ink-muted";

export function CarCatalog() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const brand = pick(brands, searchParams.get(PARAM.brand));
  const fuel = pick(fuels, searchParams.get(PARAM.fuel));
  const gearbox = pick(gearboxes, searchParams.get(PARAM.gearbox));
  const maxPrice = parsePrice(searchParams.get(PARAM.maxPrice));
  const sort = pick(sortKeys, searchParams.get(PARAM.sort)) ?? "varsayilan";

  const filtered = sortCars(
    cars.filter(
      (car) =>
        (brand === null || car.brand === brand) &&
        (fuel === null || car.fuel === fuel) &&
        (gearbox === null || car.gearbox === gearbox) &&
        (maxPrice === null || car.price <= maxPrice),
    ),
    sort,
  );

  const hasFilters =
    brand !== null ||
    fuel !== null ||
    gearbox !== null ||
    maxPrice !== null ||
    sort !== "varsayilan";

  const update = (key: string, value: string) => {
    const next = new URLSearchParams(searchParams.toString());
    if (value === "") {
      next.delete(key);
    } else {
      next.set(key, value);
    }
    const query = next.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, {
      scroll: false,
    });
  };

  const reset = () => router.replace(pathname, { scroll: false });

  return (
    <div className="flex flex-col gap-8">
      <form
        aria-label="Araç filtreleri"
        onSubmit={(event) => event.preventDefault()}
        className="grid gap-3 rounded-2xl border border-line bg-white/70 p-4 shadow-sm sm:grid-cols-2 lg:grid-cols-5"
      >
        <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-ink-muted">
          Marka
          <span className={selectWrapClass}>
            <select
              className={selectClass}
              value={brand ?? ""}
              onChange={(event) => update(PARAM.brand, event.target.value)}
            >
              <option value="">Tüm markalar</option>
              {brands.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </span>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-ink-muted">
          Yakıt
          <span className={selectWrapClass}>
            <select
              className={selectClass}
              value={fuel ?? ""}
              onChange={(event) => update(PARAM.fuel, event.target.value)}
            >
              <option value="">Fark etmez</option>
              {fuels.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </span>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-ink-muted">
          Vites
          <span className={selectWrapClass}>
            <select
              className={selectClass}
              value={gearbox ?? ""}
              onChange={(event) => update(PARAM.gearbox, event.target.value)}
            >
              <option value="">Fark etmez</option>
              {gearboxes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </span>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-ink-muted">
          Maks. fiyat
          <span className={selectWrapClass}>
            <select
              className={selectClass}
              value={maxPrice ?? ""}
              onChange={(event) => update(PARAM.maxPrice, event.target.value)}
            >
              <option value="">Sınır yok</option>
              {priceCaps.map((cap) => (
                <option key={cap} value={cap}>
                  {formatPrice(cap)} ve altı
                </option>
              ))}
              {maxPrice !== null && !priceCaps.includes(maxPrice) && (
                <option value={maxPrice}>{formatPrice(maxPrice)} ve altı</option>
              )}
            </select>
          </span>
        </label>

        <label className="flex flex-col gap-1.5 text-xs font-bold uppercase tracking-[0.15em] text-ink-muted">
          Sırala
          <span className={selectWrapClass}>
            <select
              className={selectClass}
              value={sort}
              onChange={(event) =>
                update(
                  PARAM.sort,
                  event.target.value === "varsayilan" ? "" : event.target.value,
                )
              }
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </span>
        </label>
      </form>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-ink-soft" aria-live="polite">
          {filtered.length} araç listeleniyor
        </p>
        {hasFilters && (
          <button
            type="button"
            onClick={reset}
            className="text-sm font-bold text-accent underline-offset-4 hover:underline"
          >
            Filtreleri temizle
          </button>
        )}
      </div>

      {filtered.length > 0 ? (
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((car, i) => (
            <li key={car.slug}>
              <CarCard car={car} priority={i < 3} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-start gap-4 rounded-2xl border border-dashed border-line bg-white/60 px-6 py-14 sm:items-center sm:text-center">
          <p className="font-display text-2xl font-bold tracking-tight">
            Bu kriterlere uygun araç bulunamadı.
          </p>
          <p className="max-w-md text-ink-soft/80">
            Filtreleri gevşetmeyi deneyin veya aradığınız aracı bize WhatsApp
            üzerinden yazın, stoğa girdiğinde haber verelim.
          </p>
          <button
            type="button"
            onClick={reset}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-bold text-white transition hover:bg-accent"
          >
            Filtreleri temizle
          </button>
        </div>
      )}
    </div>
  );
}
