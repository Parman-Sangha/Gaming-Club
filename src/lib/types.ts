/**
 * Shared content types.
 *
 * Everything the site renders is typed here, so editing `src/content/*`
 * gets you autocomplete and a build-time error when a field is wrong.
 */

export type SponsorTier = "headline" | "gold" | "silver" | "community";

export interface Sponsor {
  /** Display name, also used as the logo's alt text. */
  name: string;
  /** Path under /public, e.g. "/sponsors/acme.svg" */
  logo: string;
  /** Outbound link. Opens in a new tab. */
  url: string;
  tier: SponsorTier;
}

export interface HeadlineSponsor extends Sponsor {
  tier: "headline";
  /** One or two sentences shown beside the logo in the feature card. */
  blurb: string;
  /** Year the partnership started, e.g. "2025". */
  since: string;
}

export type EventTag =
  | "Booth"
  | "Sponsored"
  | "Tournament"
  | "Social"
  | "LAN"
  | "Workshop";

export interface EventCta {
  label: string;
  /** "link" renders an anchor; "calendar" generates a .ics download. */
  type: "link" | "calendar";
  url?: string;
}

export interface ClubEvent {
  /** Stable, URL-safe id. Used as the React key and the .ics filename. */
  slug: string;
  title: string;
  tag: EventTag;
  /** Local Calgary time, ISO format without a timezone: "2026-09-14T09:00" */
  start: string;
  end: string;
  location: string;
  description: string;
  cta: EventCta;
  /** Featured events span two columns on desktop. */
  featured?: boolean;
}

export type SocialPlatform =
  | "instagram"
  | "discord"
  | "linkedin"
  | "email"
  | "twitch";

export type Socials = Partial<Record<SocialPlatform, string>>;

export interface ExecMember {
  name: string;
  role: string;
  /** Path under /public, e.g. "/execs/jane.jpg" */
  photo: string;
  bio: string;
  socials: Socials;
}

export type PillarIcon = "controller" | "trophy" | "booth" | "dice";

export interface Pillar {
  icon: PillarIcon;
  title: string;
  text: string;
}

export interface GalleryPhoto {
  src: string;
  alt: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Stat {
  value: number;
  suffix?: string;
  label: string;
}
