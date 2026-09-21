import type { Stat } from "@/lib/types";

/**
 * Club identity, links and contact details.
 * TODO: REPLACE every value marked below with the club's real details.
 */
export const club = {
  name: "UCalgary Gaming Club",
  shortName: "UCGC",
  tagline: "Where Every Gamer Belongs.",
  blurb:
    "We're the official University of Calgary Students' Union club for all kinds of gamers to " +
    "connect and play. Console, PC, handheld, retro, tabletop — casual button-mashers and " +
    "bracket-climbing competitors are equally welcome. No skill requirement, no gatekeeping, " +
    "and no need to bring your own setup. Just show up and play.",

  // TODO: REPLACE — real club inbox
  email: "ucalgarygamingclub@gmail.com",

  instagram: "https://instagram.com/ucalgarygamingclub",
  instagramHandle: "@ucalgarygamingclub",
  linktree: "https://linktr.ee/ucalgarygamingclub",

  // TODO: REPLACE — real Discord invite link
  discord: "https://linktr.ee/ucalgarygamingclub",
  // TODO: REPLACE — the club's listing on the SU clubs directory
  suPage: "https://www.su.ucalgary.ca/clubs/",
  // TODO: REPLACE — exec application form (Google Form, etc.)
  execApplication: "https://linktr.ee/ucalgarygamingclub",
  // TODO: REPLACE — who sponsorship enquiries should reach
  sponsorEmail: "ucalgarygamingclub@gmail.com",

  /**
   * Where the contact form posts.
   *
   * Leave as `null` and the form falls back to opening the visitor's email
   * client with the message pre-filled — works with zero setup.
   *
   * To collect submissions properly, create a free endpoint at formspree.io
   * (or basin / getform) and paste the URL here:
   *   formEndpoint: "https://formspree.io/f/xxxxxxxx",
   */
  formEndpoint: null as string | null,
} as const;

/** Small stat strip under the hero. TODO: REPLACE with real numbers. */
export const stats: Stat[] = [
  { value: 400, suffix: "+", label: "Members" },
  { value: 30, suffix: "+", label: "Events / Year" },
  { value: 12, label: "Game Titles" },
  { value: 1, label: "Very Red T-Rex" },
];

/** Scrolling ticker phrases between the hero and the sponsors section. */
export const tickerPhrases: string[] = [
  "Console",
  "PC",
  "Handheld",
  "Retro",
  "Tabletop",
  "Fighting Games",
  "Card Games",
  "Speedruns",
  "Co-op Nights",
  "Everyone Welcome",
];
