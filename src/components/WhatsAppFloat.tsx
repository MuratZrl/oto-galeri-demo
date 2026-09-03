"use client";

import { usePathname } from "next/navigation";
import { WhatsAppIcon } from "@/components/icons";
import { whatsappUrl } from "@/lib/format";

export function WhatsAppFloat() {
  const pathname = usePathname();
  // Car detail pages have a sticky bottom bar on mobile; lift the button above it.
  const onCarDetail = /^\/araclar\/[^/]+$/.test(pathname);

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp ile yazın"
      className={`fixed right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-whatsapp text-white shadow-lg shadow-black/25 transition hover:scale-105 hover:bg-whatsapp-deep sm:right-6 ${
        onCarDetail ? "bottom-24 md:bottom-6" : "bottom-5 sm:bottom-6"
      }`}
    >
      <WhatsAppIcon className="h-7 w-7" />
    </a>
  );
}
