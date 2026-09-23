import Image from "next/image";
import { cn } from "@/lib/utils";
import logoSrc from "../../../public/logo.png";

/**
 * The club logo: a pixel-art red T-rex at an arcade cabinet.
 *
 * Source artwork is `brand/logo-original.png`. The copy in `public/` differs in
 * two ways: the empty margin is trimmed, and the open mouth was filled with the
 * sprite's dark outline colour. The mouth was transparent in the original, which
 * read as white on paper but became a black void on the dark theme.
 *
 * Rendered with `image-rendering: pixelated` so the sprite keeps hard pixel
 * edges when scaled instead of being smoothed into mush.
 */
export function Logo({
  className,
  priority = false,
  sizes,
}: {
  className?: string;
  /** Set on the hero copy so it is not lazy-loaded. */
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={logoSrc}
      alt="UCalgary Gaming Club logo: a red T-rex playing an arcade machine"
      className={cn("h-auto w-full [image-rendering:pixelated]", className)}
      priority={priority}
      sizes={sizes}
      placeholder="blur"
    />
  );
}
