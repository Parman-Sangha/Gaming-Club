"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps } from "react";

/**
 * Thin wrapper so the root layout can stay a server component.
 *
 * next-themes handles persisting the choice to localStorage and writing the
 * class onto <html> before first paint, which is what stops the theme from
 * flashing on load.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
