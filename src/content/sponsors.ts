import type { HeadlineSponsor, Sponsor } from "@/lib/types";

/**
 * The big feature card at the top of the sponsors section.
 * TODO: REPLACE the logo with 7-Eleven's official brand asset — the file
 * currently at /public/sponsors/7-eleven.svg is a marked placeholder.
 */
export const headlineSponsor: HeadlineSponsor = {
  name: "7-Eleven",
  logo: "/sponsors/7-eleven.svg",
  url: "https://www.7-eleven.ca/",
  tier: "headline",
  since: "2025",
  blurb:
    "Our headline sponsor powers the 7-Eleven Gaming Lounge and keeps the snacks, Slurpees " +
    "and prize tables stocked at every major event we run.",
};

/**
 * Logos in the auto-scrolling carousel.
 * TODO: REPLACE all of these with real sponsors, their logo files and links.
 */
export const sponsors: Sponsor[] = [
  { name: "Sponsor One", logo: "/sponsors/sponsor-1.svg", url: "#", tier: "gold" },
  { name: "Sponsor Two", logo: "/sponsors/sponsor-2.svg", url: "#", tier: "gold" },
  { name: "Sponsor Three", logo: "/sponsors/sponsor-3.svg", url: "#", tier: "silver" },
  { name: "Sponsor Four", logo: "/sponsors/sponsor-4.svg", url: "#", tier: "silver" },
  { name: "Sponsor Five", logo: "/sponsors/sponsor-5.svg", url: "#", tier: "community" },
  { name: "Sponsor Six", logo: "/sponsors/sponsor-6.svg", url: "#", tier: "community" },
];
