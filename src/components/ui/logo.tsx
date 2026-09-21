import { cn } from "@/lib/utils";

/**
 * Club mascot: a red T-rex playing an arcade machine.
 *
 * The cabinet body uses `currentColor` so it stays visible in both themes —
 * set the text colour on the wrapper (the component defaults to `text-fg`).
 *
 * TODO: REPLACE with the club's official logo artwork when available. Keep it
 * as inline SVG rather than an <img> so it keeps adapting to the theme.
 */
export function Logo({
  className,
  title = "UCalgary Gaming Club logo: a red T-rex playing an arcade machine",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 256 224"
      role="img"
      aria-label={title}
      className={cn("text-fg", className)}
    >
      {/* ground shadow */}
      <ellipse cx="118" cy="206" rx="104" ry="10" fill="currentColor" opacity=".18" />

      {/* ---- arcade cabinet ---- */}
      <path fill="currentColor" d="M156 204V98c0-9 7-16 16-16h52c9 0 16 7 16 16v106z" />
      <rect x="163" y="88" width="70" height="20" rx="5" fill="var(--brand-strong)" />
      <rect x="171" y="95" width="54" height="6" rx="3" fill="#fff" opacity=".85" />
      <rect x="164" y="116" width="68" height="44" rx="5" fill="#08080c" />
      <rect x="171" y="124" width="10" height="10" rx="2" fill="var(--brand-strong)" />
      <rect x="187" y="124" width="10" height="10" rx="2" fill="var(--brand-strong)" opacity=".65" />
      <rect x="203" y="124" width="10" height="10" rx="2" fill="var(--brand-strong)" opacity=".4" />
      <rect x="171" y="146" width="26" height="5" rx="2.5" fill="#fff" opacity=".9" />
      <rect x="203" y="144" width="20" height="9" rx="3" fill="#fff" opacity=".55" />
      <path fill="var(--brand-deep)" d="M150 190l6-20h84l6 20z" />
      <rect x="176" y="166" width="5" height="12" rx="2.5" fill="currentColor" />
      <circle cx="178.5" cy="164" r="6.5" fill="var(--brand-strong)" />
      <circle cx="205" cy="178" r="5" fill="#fff" />
      <circle cx="220" cy="174" r="5" fill="#fff" opacity=".75" />

      {/* ---- t-rex ---- */}
      <path fill="var(--brand-strong)" d="M64 142c-16 4-30 0-44-12 16 2 26 0 34-8z" />
      <path fill="var(--brand-deep)" d="M66 160h20v34a6 6 0 0 1-6 6H66a6 6 0 0 1-6-6v-28a6 6 0 0 1 6-6z" />
      <path fill="var(--brand-strong)" d="M96 160h22v34a6 6 0 0 1-6 6H96a6 6 0 0 1-6-6v-28a6 6 0 0 1 6-6z" />
      <path fill="currentColor" opacity=".35" d="M56 194h32v6a4 4 0 0 1-4 4H60a4 4 0 0 1-4-4z" />
      <path fill="var(--brand-strong)" d="M66 92c26-10 52-4 62 16 8 15 6 36-6 48-12 13-40 16-56 6-15-9-20-30-14-48 3-9 8-17 14-22z" />
      <path fill="var(--brand-deep)" opacity=".55" d="M78 150c14 8 34 7 44-2-2 10-12 18-26 18-9 0-15-6-18-16z" />
      <path fill="var(--brand-deep)" d="M120 126c14-2 30 8 42 22l-9 7c-10-11-22-18-33-17z" />
      <path fill="#fff" opacity=".9" d="M150 152l10 8-6 4-8-7z" />
      <path fill="var(--brand-strong)" d="M74 62c0-13 12-23 28-23h36c12 0 20 7 20 16v12c0 7-5 12-13 12h-8l-6 10H92c-11 0-18-7-18-17z" />
      <path fill="#fff" opacity=".95" d="M100 79h58l-6 8h-46z" />
      <path fill="var(--brand-deep)" d="M104 79l5 8h-9zm14 0l5 8h-9zm14 0l5 8h-9zm14 0l5 8h-9z" />
      <circle cx="130" cy="58" r="9" fill="#fff" />
      <circle cx="133" cy="58" r="4.5" fill="currentColor" />
      <path fill="var(--brand-deep)" opacity=".7" d="M116 44h30v7h-30zM74 74l-10-6 12-5zM80 96l-14-4 12-8z" />
      <circle cx="152" cy="62" r="3" fill="var(--brand-deep)" />
    </svg>
  );
}
