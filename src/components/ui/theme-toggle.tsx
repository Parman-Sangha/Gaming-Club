"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useHydrated } from "@/lib/client-hooks";

/**
 * Light/dark switch for the header.
 *
 * The active theme is only known in the browser, so the icon stays blank until
 * hydration — rendering one on the server would mismatch for half of visitors.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hydrated = useHydrated();

  const isDark = resolvedTheme === "dark";
  const label = hydrated
    ? `Switch to ${isDark ? "light" : "dark"} mode`
    : "Toggle colour theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className="grid size-10 place-items-center rounded-[10px] text-fg-muted shadow-[inset_0_0_0_1px_var(--border)] transition-[color,box-shadow,transform] duration-300 ease-brand hover:-rotate-12 hover:text-brand hover:shadow-[inset_0_0_0_1px_var(--brand-line)]"
    >
      {/* Keep the box filled before hydration so the header doesn't shift. */}
      {!hydrated ? (
        <span className="size-[19px]" aria-hidden />
      ) : isDark ? (
        <Sun className="size-[19px]" aria-hidden />
      ) : (
        <Moon className="size-[19px]" aria-hidden />
      )}
    </button>
  );
}
