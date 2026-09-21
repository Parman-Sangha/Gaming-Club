import type { ClubEvent } from "@/lib/types";

/**
 * Event schedule.
 *
 * `start` / `end` are ISO datetimes in local Calgary time (no timezone suffix).
 * Upcoming vs. past is worked out automatically from the current date, so old
 * events move themselves into the "Past" filter — no cleanup needed.
 *
 * TODO: REPLACE the placeholder events at the bottom with the real schedule,
 * and check the year on the Clubs Week / Gaming Lounge entries each term.
 */
export const events: ClubEvent[] = [
  {
    slug: "7-eleven-gaming-lounge",
    title: "7-Eleven Gaming Lounge",
    tag: "Sponsored",
    start: "2026-09-09T11:00",
    end: "2026-09-09T15:00",
    location: "Life Design Hub — MSC 171",
    description:
      "Our headline sponsor takes over the Life Design Hub. Free entry, open play across console " +
      "and PC, snacks on the house and prizes on the table all afternoon.",
    cta: { label: "Free entry — details", type: "link", url: "https://linktr.ee/ucalgarygamingclub" },
    featured: true,
  },
  {
    slug: "clubs-week-day-1",
    title: "Clubs Week — Day 1",
    tag: "Booth",
    start: "2026-09-14T09:00",
    end: "2026-09-14T17:00",
    location: "MacEwan Hall — Table 95",
    description:
      "Find us at Table 95 for Clubs Week. Try a handheld, enter the raffle, meet the exec team " +
      "and sign up for the year on the spot.",
    cta: { label: "Add to calendar", type: "calendar" },
  },
  {
    slug: "clubs-week-day-2",
    title: "Clubs Week — Day 2",
    tag: "Booth",
    start: "2026-09-18T09:00",
    end: "2026-09-18T17:00",
    location: "MacEwan Hall — Table 39",
    description:
      "Round two of Clubs Week, this time at Table 39. Same games, same free stickers, and your " +
      "last chance to grab an early-bird membership.",
    cta: { label: "Add to calendar", type: "calendar" },
  },

  // ---- TODO: REPLACE the placeholder events below ------------------------
  {
    slug: "smash-monthly-october",
    title: "Smash Bros. Monthly",
    tag: "Tournament",
    start: "2026-10-16T17:00",
    end: "2026-10-16T22:00",
    location: "MacEwan Hall — Ballroom",
    description:
      "Double-elimination bracket, open to every skill level. Setups provided, bring your own " +
      "controller. Prize pool covered by our sponsors.",
    cta: { label: "Register", type: "link", url: "https://linktr.ee/ucalgarygamingclub" },
  },
  {
    slug: "tabletop-night-october",
    title: "Tabletop & Board Game Night",
    tag: "Social",
    start: "2026-10-29T18:00",
    end: "2026-10-29T22:00",
    location: "MacEwan Student Centre — room TBD",
    description:
      "D&D one-shots, party games and a shelf of board games. New players genuinely welcome — " +
      "we will teach you the rules.",
    cta: { label: "Add to calendar", type: "calendar" },
  },
  {
    slug: "end-of-term-lan",
    title: "End-of-Term LAN Party",
    tag: "LAN",
    start: "2026-11-27T16:00",
    end: "2026-11-27T23:30",
    location: "Engineering Building — room TBD",
    description:
      "Haul your rig over or borrow one of ours. Valorant, CS2, Rocket League and whatever else " +
      "the room votes for. Pizza included.",
    cta: { label: "Register", type: "link", url: "https://linktr.ee/ucalgarygamingclub" },
  },
];
