import type { FaqItem, GalleryPhoto, Pillar } from "@/lib/types";

export const mission =
  "We exist so that nobody at UCalgary has to game alone. The club is a standing invitation: " +
  "a place to find people who play what you play, try things you have never touched, and turn " +
  "a shared hobby into an actual friend group.";

export const pillars: Pillar[] = [
  {
    icon: "controller",
    title: "Game Nights",
    text:
      "Regular drop-in sessions across console, PC and handheld. No commitment and no bracket — " +
      "show up and play whatever is on.",
  },
  {
    icon: "trophy",
    title: "Tournaments",
    text:
      "Competitive brackets with real prize support from our sponsors: Smash, Valorant, " +
      "Rocket League and rotating titles.",
  },
  {
    icon: "booth",
    title: "Campus Booths",
    text:
      "Clubs Week tables and pop-up setups around MacEwan Hall where anyone walking past can " +
      "grab a controller.",
  },
  {
    icon: "dice",
    title: "Tabletop & Socials",
    text:
      "Board games, D&D one-shots, movie nights and end-of-term parties for people who came " +
      "for the games and stayed for the group.",
  },
];

/**
 * Photo gallery.
 * TODO: REPLACE with real event photos — .jpg and .png work fine here.
 * The first photo renders as a large 2×2 tile on desktop.
 */
export const gallery: GalleryPhoto[] = [
  { src: "/gallery/photo-1.svg", alt: "Members playing at a club game night" },
  { src: "/gallery/photo-2.svg", alt: "A tournament bracket in progress" },
  { src: "/gallery/photo-3.svg", alt: "The club booth during Clubs Week" },
  { src: "/gallery/photo-4.svg", alt: "Smash Bros. bracket finals" },
  { src: "/gallery/photo-5.svg", alt: "Tabletop and board game night" },
  { src: "/gallery/photo-6.svg", alt: "LAN party setup" },
  { src: "/gallery/photo-7.svg", alt: "Club social event" },
  { src: "/gallery/photo-8.svg", alt: "Retro arcade setup" },
];

export const faq: FaqItem[] = [
  {
    q: "Do I need to be good at games to join?",
    a:
      "No. Most of our events are drop-in and casual, and our tournaments run open brackets where " +
      "beginners are expected. Nobody is going to quiz you.",
  },
  {
    q: "Do I have to be a UCalgary student?",
    a:
      "Membership runs through the Students' Union, so it is aimed at UCalgary students — but our " +
      "public booths and lounge events are open to anyone on campus.",
  },
  {
    q: "Do I need to bring my own console or PC?",
    a:
      "Never required. We provide setups at every event. If you would rather play on your own gear, " +
      "you are welcome to bring it to LAN nights.",
  },
  {
    q: "How much does it cost?",
    a:
      "Membership is low-cost through the SU, and most events — including the 7-Eleven Gaming " +
      "Lounge — are free to attend.",
  },
];
