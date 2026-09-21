"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { GalleryPhoto } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Photo grid with a keyboard-navigable lightbox.
 * Arrow keys move between photos, Escape closes.
 */
export function Gallery({ photos }: { photos: GalleryPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const isOpen = openIndex !== null;

  const close = useCallback(() => setOpenIndex(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpenIndex((current) =>
        current === null ? null : (current + delta + photos.length) % photos.length,
      ),
    [photos.length],
  );

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };

    document.addEventListener("keydown", onKey);
    // Stop the page scrolling behind the overlay.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, close, step]);

  const active = openIndex === null ? null : photos[openIndex];

  return (
    <>
      <ul className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 lg:mt-14">
        {photos.map((photo, i) => (
          <li
            key={photo.src}
            className={cn(i === 0 && "col-span-2 md:row-span-2")}
          >
            <button
              type="button"
              onClick={() => setOpenIndex(i)}
              className={cn(
                "group relative block h-full w-full overflow-hidden rounded-[14px] shadow-[inset_0_0_0_1px_var(--border)] transition-[transform,box-shadow] duration-300 ease-brand hover:shadow-[inset_0_0_0_1px_var(--brand-line),0_10px_30px_rgb(0_0_0/0.28)]",
                i === 0 ? "aspect-[4/3] md:aspect-auto" : "aspect-[4/3]",
              )}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 ease-brand group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute inset-0 bg-[linear-gradient(0deg,rgb(232_25_44/0.30),transparent_55%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span className="sr-only">View larger: {photo.alt}</span>
            </button>
          </li>
        ))}
      </ul>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          onClick={close}
          className="fixed inset-0 z-200 grid place-items-center bg-[rgb(4_4_8/0.92)] p-6 backdrop-blur-sm"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-5 right-5 grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:scale-110 hover:bg-brand"
          >
            <X className="size-5" aria-hidden />
          </button>

          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(-1); }}
                aria-label="Previous photo"
                className="absolute top-1/2 left-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:scale-110 hover:bg-brand sm:left-5"
              >
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); step(1); }}
                aria-label="Next photo"
                className="absolute top-1/2 right-3 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition hover:scale-110 hover:bg-brand sm:right-5"
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </>
          )}

          <Image
            src={active.src}
            alt={active.alt}
            width={1200}
            height={900}
            onClick={(e) => e.stopPropagation()}
            className="max-h-[82vh] w-auto max-w-[min(1040px,100%)] rounded-[14px] object-contain shadow-[0_24px_60px_rgb(0_0_0/0.55)]"
          />

          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 text-center text-[0.85rem] text-white/70">
            {active.alt}
            <span className="ml-2 text-white/40">
              {openIndex! + 1} / {photos.length}
            </span>
          </p>
        </div>
      )}
    </>
  );
}
