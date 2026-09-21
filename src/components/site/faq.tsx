"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import type { FaqItem } from "@/lib/types";
import { cn } from "@/lib/utils";

export function Faq({ items }: { items: FaqItem[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-14 max-w-[860px]">
      <h3 className="mb-4 text-center text-[1.6rem]">Common questions</h3>

      <ul>
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <li key={item.q} className="border-b border-line">
              <h4>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  id={`faq-trigger-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-4.5 text-left font-display text-[1.22rem] font-bold uppercase text-fg transition-colors duration-300 hover:text-brand"
                >
                  {item.q}
                  <span
                    aria-hidden
                    className={cn(
                      "grid size-6 shrink-0 place-items-center rounded-full transition-[transform,background-color,color] duration-300",
                      isOpen
                        ? "rotate-45 bg-brand text-on-brand"
                        : "bg-brand-soft text-brand",
                    )}
                  >
                    <Plus className="size-3.5" />
                  </span>
                </button>
              </h4>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 0.68, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="max-w-[70ch] pb-5 text-fg-muted">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
