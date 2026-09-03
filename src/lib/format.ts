import { site } from "@/config/site";
import type { Car } from "@/data/cars";

const trNumber = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 0 });

export function formatPrice(value: number): string {
  return `${trNumber.format(value)} TL`;
}

export function formatKm(value: number): string {
  return `${trNumber.format(value)} km`;
}

export function carTitle(car: Pick<Car, "brand" | "model" | "year">): string {
  return `${car.brand} ${car.model} ${car.year}`;
}

export function whatsappUrl(message?: string): string {
  const base = `https://wa.me/${site.whatsappNumber}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function carWhatsappUrl(car: Pick<Car, "brand" | "model" | "year">): string {
  return whatsappUrl(
    `Merhaba, ${carTitle(car)} ilanı hakkında bilgi almak istiyorum`,
  );
}

export const telHref = `tel:${site.phoneE164}`;
