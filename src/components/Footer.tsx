import Link from "next/link";
import { fullAddress, site } from "@/config/site";
import { telHref, whatsappUrl } from "@/lib/format";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto bg-ink text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-display text-2xl font-bold tracking-tight">
            {site.name}
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/60">
            {site.slogan}
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            İletişim
          </h2>
          <address className="mt-4 space-y-2 text-sm not-italic text-white/85">
            <p>{fullAddress}</p>
            <p>
              <a href={telHref} className="transition hover:text-accent">
                {site.phoneDisplay}
              </a>
            </p>
            <p>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:text-accent"
              >
                WhatsApp
              </a>
            </p>
          </address>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/45">
            Çalışma saatleri
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            {site.hours.map((h) => (
              <li key={h.days} className="flex justify-between gap-4">
                <span>{h.days}</span>
                <span className="text-white/60">{h.time}</span>
              </li>
            ))}
          </ul>
          <nav aria-label="Alt menü" className="mt-6 flex gap-4 text-sm">
            <Link href="/araclar" className="transition hover:text-accent">
              Araçlar
            </Link>
            <Link href="/#iletisim" className="transition hover:text-accent">
              İletişim
            </Link>
          </nav>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-6xl px-5 py-5 text-xs text-white/45 sm:px-8">
          © {year} {site.name}. Bu site bir tanıtım demosudur, araçlar ve
          iletişim bilgileri gerçek değildir.
        </p>
      </div>
    </footer>
  );
}
