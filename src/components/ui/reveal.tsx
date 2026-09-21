"use client";

import { useCallback, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type RevealTag = "div" | "li" | "article" | "section";

/**
 * Fades content up as it scrolls into view.
 *
 * Deliberately CSS-driven rather than animated in JS. A motion library applies
 * its `initial` state as an inline `opacity: 0` during SSR, which leaves every
 * wrapped section invisible if scripts fail to run. Here the default state is
 * *visible*: the hidden-then-revealed behaviour only switches on once the
 * inline script in the layout adds `.js` to <html>, so a broken or blocked
 * bundle degrades to a plain, fully readable page.
 *
 * Reduced-motion users get the content with no transition at all.
 */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: {
  children: ReactNode;
  /** Seconds to stagger by — useful when mapping over a list. */
  delay?: number;
  className?: string;
  as?: RevealTag;
}) {
  /* A callback ref rather than useRef + useEffect: React 19 runs the returned
     function as cleanup, so the observer is set up and torn down in one place. */
  const attach = useCallback((node: HTMLElement | null) => {
    if (!node) return;

    // Very old browsers: just show the content.
    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("is-in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-in");
          observer.unobserve(entry.target); // reveal once
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const classes = cn("reveal", className);
  const style = delay ? { transitionDelay: `${delay}s` } : undefined;

  switch (as) {
    case "li":
      return <li ref={attach} className={classes} style={style}>{children}</li>;
    case "article":
      return <article ref={attach} className={classes} style={style}>{children}</article>;
    case "section":
      return <section ref={attach} className={classes} style={style}>{children}</section>;
    default:
      return <div ref={attach} className={classes} style={style}>{children}</div>;
  }
}
