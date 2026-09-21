import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "solid" | "ghost" | "outline" | "invert";
type Size = "sm" | "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  solid:
    "bg-brand text-on-brand hover:shadow-[0_10px_26px_rgb(232_25_44/0.34)]",
  ghost:
    "text-fg shadow-[inset_0_0_0_2px_var(--border-loud)] hover:bg-brand hover:text-on-brand hover:shadow-[inset_0_0_0_2px_var(--brand)]",
  outline:
    "text-brand shadow-[inset_0_0_0_2px_var(--brand)] hover:bg-brand hover:text-on-brand",
  /* For use on a red background, e.g. the hiring banner. */
  invert:
    "bg-white text-brand-deep hover:shadow-[0_10px_26px_rgb(0_0_0/0.28)]",
};

const SIZES: Record<Size, string> = {
  sm: "px-4 py-2.5 text-[0.95rem] rounded-lg",
  md: "px-6 py-3.5 text-[1.12rem] rounded-[10px]",
  lg: "px-8 py-4 text-[1.3rem] rounded-xl",
};

const BASE = [
  "group relative inline-flex items-center justify-center gap-2 overflow-hidden",
  "font-display font-extrabold uppercase tracking-[0.05em] leading-none",
  "transition-[transform,box-shadow,background-color,color] duration-300 ease-brand",
  "hover:-translate-y-0.5 active:translate-y-0",
  "focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-brand",
  "max-sm:w-full",
].join(" ");

/** Diagonal sheen that sweeps across on hover — the brand's slash motif. */
function Sheen() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-[120%] bg-[linear-gradient(115deg,transparent_38%,rgb(255_255_255/0.28)_50%,transparent_62%)] transition-transform duration-[600ms] ease-brand group-hover:translate-x-[120%]"
    />
  );
}

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
}

type ButtonProps = CommonProps &
  Omit<ComponentProps<"button">, keyof CommonProps>;

export function Button({
  variant = "solid",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(BASE, VARIANTS[variant], SIZES[size], className)} {...props}>
      <Sheen />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </button>
  );
}

type LinkButtonProps = CommonProps & {
  href: string;
  /** Adds target=_blank plus the matching rel. Defaults to true for http(s) links. */
  external?: boolean;
} & Omit<ComponentProps<typeof Link>, keyof CommonProps | "href">;

export function LinkButton({
  href,
  external,
  variant = "solid",
  size = "md",
  className,
  children,
  ...props
}: LinkButtonProps) {
  const isExternal = external ?? /^https?:\/\//.test(href);

  return (
    <Link
      href={href}
      className={cn(BASE, VARIANTS[variant], SIZES[size], className)}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      <Sheen />
      <span className="relative inline-flex items-center gap-2">{children}</span>
    </Link>
  );
}
