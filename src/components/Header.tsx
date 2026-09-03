import Link from "next/link";
import { site } from "@/config/site";
import { telHref } from "@/lib/format";
import { PhoneIcon } from "@/components/icons";

const nav = [
  { href: "/", label: "Ana Sayfa", mobile: false },
  { href: "/araclar", label: "Araçlar", mobile: true },
  { href: "/#iletisim", label: "İletişim", mobile: true },
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-ink text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5 sm:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5"
          aria-label={`${site.name} ana sayfa`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-md bg-accent font-display text-lg font-extrabold leading-none text-white transition group-hover:bg-accent-deep">
            D
          </span>
          <span className="flex flex-col leading-tight">
            <span className="whitespace-nowrap font-display text-base font-bold tracking-tight sm:text-lg">
              {site.name}
            </span>
            <span className="hidden whitespace-nowrap text-[11px] font-medium uppercase tracking-[0.18em] text-white/55 sm:block">
              {site.district} / {site.city}
            </span>
          </span>
        </Link>

        <nav aria-label="Ana menü" className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-2.5 py-2 text-sm font-semibold whitespace-nowrap text-white/80 transition hover:bg-white/10 hover:text-white sm:px-3 ${
                item.mobile ? "" : "hidden sm:inline-block"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={telHref}
            className="ml-1 inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 text-sm font-semibold transition hover:border-accent hover:bg-accent sm:ml-2 sm:px-4"
            aria-label={`Ara: ${site.phoneDisplay}`}
          >
            <PhoneIcon className="h-4 w-4" />
            <span className="hidden sm:inline">{site.phoneDisplay}</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
