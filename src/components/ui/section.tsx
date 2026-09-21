import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page-width container. */
export function Wrap({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1200px] px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}

export function Section({
  id,
  alt = false,
  className,
  children,
  ...rest
}: {
  id?: string;
  /** Uses the alternate background so adjacent sections separate visually. */
  alt?: boolean;
  className?: string;
  children: ReactNode;
} & React.ComponentProps<"section">) {
  return (
    <section
      id={id}
      className={cn(
        "relative scroll-mt-24 py-18 sm:py-24 lg:py-32",
        alt && "bg-bg-alt",
        className,
      )}
      {...rest}
    >
      {children}
    </section>
  );
}

/** Small arcade-styled label with the brand's diagonal slash. */
export function Kicker({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "inline-flex items-center gap-2.5 font-arcade text-[0.58rem] uppercase leading-[1.8] tracking-[0.14em] text-brand sm:text-[0.68rem]",
        className,
      )}
    >
      <span aria-hidden className="h-[3px] w-6 -skew-x-[28deg] bg-brand" />
      {children}
    </p>
  );
}

export function SectionHead({
  kicker,
  title,
  lede,
  center = false,
  className,
}: {
  kicker: string;
  title: ReactNode;
  lede?: ReactNode;
  center?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 max-w-[62ch] sm:mb-14",
        center && "mx-auto text-center",
        className,
      )}
    >
      <Kicker>{kicker}</Kicker>
      <h2 className="mt-3 mb-3 text-[clamp(2.2rem,5.6vw,4rem)]">{title}</h2>
      {lede ? (
        <p className="text-[clamp(1.02rem,1.7vw,1.2rem)] text-fg-muted">{lede}</p>
      ) : null}
    </div>
  );
}

/** Decorative diagonal stripes echoing the logo's slash accents. */
export function Slashes({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <span className="absolute -top-[30%] left-[6%] h-[170%] w-[78px] -skew-x-[18deg] bg-brand opacity-[0.07]" />
      <span className="absolute -top-[30%] left-[16%] h-[170%] w-[26px] -skew-x-[18deg] bg-brand opacity-[0.10]" />
      <span className="absolute -top-[30%] right-[12%] h-[170%] w-[120px] -skew-x-[18deg] bg-brand opacity-[0.05]" />
      <span className="absolute -top-[30%] right-[26%] h-[170%] w-[34px] -skew-x-[18deg] bg-brand opacity-[0.09]" />
    </div>
  );
}
