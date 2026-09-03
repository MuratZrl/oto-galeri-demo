import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-start gap-6 px-5 py-24 sm:px-8">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        404
      </p>
      <h1 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
        Aradığınız sayfa bulunamadı.
      </h1>
      <p className="text-lg text-ink-soft/80">
        İlan kaldırılmış veya adres hatalı olabilir. Güncel araç listemize göz
        atabilirsiniz.
      </p>
      <Link
        href="/araclar"
        className="inline-flex items-center rounded-full bg-ink px-6 py-3 font-semibold text-white transition hover:bg-accent"
      >
        Araçları gör
      </Link>
    </section>
  );
}
