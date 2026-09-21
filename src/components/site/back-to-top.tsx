"use client";

import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { useScrolledPast } from "@/lib/client-hooks";

export function BackToTop() {
  const visible = useScrolledPast(700);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      // Hidden from the tab order until it is actually on screen.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "no-print fixed right-5 bottom-5 z-90 grid size-11.5 place-items-center rounded-xl bg-brand text-on-brand shadow-[0_10px_30px_rgb(0_0_0/0.28)] transition-[opacity,visibility,transform] duration-300 ease-brand hover:-translate-y-1",
        visible ? "visible opacity-100" : "invisible translate-y-3 opacity-0",
      )}
    >
      <ArrowUp className="size-5" aria-hidden />
    </button>
  );
}
