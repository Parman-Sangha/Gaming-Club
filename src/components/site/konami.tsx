"use client";

import { useEffect, useState } from "react";

const SEQUENCE = [
  "ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown",
  "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight",
  "b", "a",
];

/**
 * Konami code easter egg. It is a gaming club, after all.
 * Purely decorative — it never blocks anything or traps focus.
 */
export function Konami() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    let progress = 0;

    const onKey = (e: KeyboardEvent) => {
      // Ignore keystrokes aimed at the contact form.
      const target = e.target as HTMLElement | null;
      if (target && /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName)) return;

      const expected = SEQUENCE[progress];
      const matches =
        expected.startsWith("Arrow")
          ? e.key === expected
          : e.key.toLowerCase() === expected;

      progress = matches ? progress + 1 : 0;

      if (progress === SEQUENCE.length) {
        progress = 0;
        setActive(true);
        window.setTimeout(() => setActive(false), 2600);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!active) return;
    document.documentElement.style.filter = "hue-rotate(160deg) saturate(1.8)";
    document.documentElement.style.transition = "filter 0.6s ease";
    return () => {
      document.documentElement.style.filter = "";
      document.documentElement.style.transition = "";
    };
  }, [active]);

  if (!active) return null;

  return (
    <p
      role="status"
      className="no-print fixed bottom-8 left-1/2 z-250 -translate-x-1/2 rounded-[10px] bg-brand px-6 py-4 font-arcade text-[0.6rem] tracking-[0.1em] text-on-brand shadow-[0_24px_60px_rgb(0_0_0/0.55)]"
    >
      + 30 LIVES — WELCOME, PLAYER ONE
    </p>
  );
}
