"use client";

import Image from "next/image";
import { useState, type KeyboardEvent } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/icons";

interface GalleryProps {
  photos: readonly string[];
  title: string;
}

export function Gallery({ photos, title }: GalleryProps) {
  const [index, setIndex] = useState(0);
  const count = photos.length;

  const go = (delta: number) =>
    setIndex((current) => (current + delta + count) % count);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        go(-1);
        break;
      case "ArrowRight":
        event.preventDefault();
        go(1);
        break;
      case "Home":
        event.preventDefault();
        setIndex(0);
        break;
      case "End":
        event.preventDefault();
        setIndex(count - 1);
        break;
    }
  };

  return (
    <div
      role="group"
      aria-label={`${title} fotoğrafları`}
      aria-roledescription="galeri"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-3 rounded-2xl"
    >
      <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-paper-deep">
        <Image
          key={photos[index]}
          src={photos[index]}
          alt={`${title}, fotoğraf ${index + 1} / ${count}`}
          fill
          priority
          sizes="(min-width: 1024px) 720px, 100vw"
          className="object-cover"
        />
        <span
          aria-live="polite"
          className="absolute right-3 top-3 rounded-md bg-ink/80 px-2 py-1 text-xs font-bold text-white backdrop-blur"
        >
          {index + 1} / {count}
        </span>
        {count > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Önceki fotoğraf"
              className="absolute left-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow transition hover:bg-accent hover:text-white"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Sonraki fotoğraf"
              className="absolute right-3 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-ink shadow transition hover:bg-accent hover:text-white"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      <ul className="grid grid-cols-5 gap-2 sm:grid-cols-6">
        {photos.map((photo, i) => {
          const active = i === index;
          return (
            <li key={photo}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Fotoğraf ${i + 1}`}
                aria-current={active ? "true" : undefined}
                className={`relative block aspect-[3/2] w-full overflow-hidden rounded-lg border-2 bg-paper-deep transition ${
                  active
                    ? "border-accent"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              >
                <Image
                  src={photo}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
