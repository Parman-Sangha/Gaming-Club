"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/ui/logo";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { Wrap } from "@/components/ui/section";
import { LinkButton } from "@/components/ui/button";
import { club } from "@/content";
import { cn } from "@/lib/utils";
import { useMediaQuery, useScrolledPast } from "@/lib/client-hooks";

const NAV = [
  { href: "#sponsors", label: "Sponsors" },
  { href: "#events", label: "Events" },
  { href: "#about", label: "About" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const stuck = useScrolledPast(8);
  const navRef = useRef<HTMLElement>(null);
  // The nav is always visible from md up; `inert` must only apply to the
  // collapsed mobile sheet, never to the desktop bar.
  const isMobile = useMediaQuery("(max-width: 767px)");

  /* Scrollspy: highlight the nav link for whichever section is in view. */
  useEffect(() => {
    const sections = NAV
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Prefer whichever intersecting section is highest up the page.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(`#${visible[0].target.id}`);
      },
      // Band across the middle of the viewport, so a section counts as "current"
      // once it dominates the screen rather than the moment it peeks in.
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* Close the mobile menu on Escape, and on any click outside it. */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const onClick = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setOpen(false);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  return (
    <header
      className={cn(
        "no-print sticky top-0 z-100 h-17 backdrop-blur-xl backdrop-saturate-150 transition-[border-color,background-color,box-shadow] duration-300 ease-brand",
        "bg-[color-mix(in_srgb,var(--bg)_82%,transparent)]",
        stuck
          ? "border-b border-line shadow-[0_2px_8px_rgb(0_0_0/0.28)]"
          : "border-b border-transparent",
      )}
    >
      <Wrap className="flex h-full items-center gap-3">
        {/* Brand */}
        <Link
          href="#top"
          className="mr-auto flex items-center gap-2.5 text-fg"
          aria-label={`${club.name} — back to top`}
        >
          <Logo className="w-11 shrink-0" />
          <span className="flex flex-col leading-none">
            <span className="font-display text-xl font-extrabold uppercase sm:text-[1.3rem]">
              UCalgary <span className="text-brand">Gaming</span>
            </span>
            <span className="mt-1.5 hidden font-arcade text-[0.43rem] tracking-[0.19em] text-fg-dim sm:block">
              WHERE EVERY GAMER BELONGS
            </span>
          </span>
        </Link>

        {/* Navigation */}
        <nav
          ref={navRef}
          id="primary-navigation"
          aria-label="Primary"
          className={cn(
            "flex items-center gap-0.5",
            // Mobile: a sheet that slides down from under the header.
            "max-md:fixed max-md:inset-x-0 max-md:top-17 max-md:z-50 max-md:max-h-[calc(100dvh-4.25rem)] max-md:flex-col max-md:items-stretch max-md:gap-0 max-md:overflow-y-auto max-md:border-b max-md:border-line max-md:bg-bg max-md:px-5 max-md:pb-6 max-md:pt-3 max-md:shadow-[0_24px_60px_rgb(0_0_0/0.45)]",
            "max-md:transition-transform max-md:duration-300 max-md:ease-brand",
            open ? "max-md:translate-y-0" : "max-md:-translate-y-[115%]",
          )}
          // Keep the off-screen sheet out of the tab order and the a11y tree.
          inert={isMobile && !open}
        >
          {NAV.map(({ href, label }) => {
            const isActive = active === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group relative rounded-lg px-3 py-2 text-[0.93rem] font-semibold transition-colors duration-300",
                  "max-md:border-b max-md:border-line max-md:px-1 max-md:py-3.5 max-md:text-[1.05rem]",
                  isActive ? "text-fg max-md:text-brand" : "text-fg-muted hover:text-fg",
                )}
              >
                {label}
                <span
                  aria-hidden
                  className={cn(
                    "absolute inset-x-3 bottom-1 h-0.5 origin-left -skew-x-[20deg] bg-brand transition-transform duration-300 ease-brand max-md:hidden",
                    isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                  )}
                />
              </Link>
            );
          })}

          <LinkButton
            href={club.linktree}
            size="sm"
            className="ml-2 max-md:mt-4 max-md:ml-0"
          >
            Join the Club
          </LinkButton>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="primary-navigation"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-[10px] text-fg shadow-[inset_0_0_0_1px_var(--border)] transition-colors md:hidden"
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </Wrap>
    </header>
  );
}
