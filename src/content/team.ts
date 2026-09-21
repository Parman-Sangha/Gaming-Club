import type { ExecMember } from "@/lib/types";

/**
 * Exec team grid.
 *
 * TODO: REPLACE every entry — names, roles, bios and photos are placeholders.
 * Drop real photos into /public/execs/ (square images, 600×600 or larger look
 * best) and point `photo` at them, e.g. "/execs/jane-doe.jpg".
 */
export const team: ExecMember[] = [
  {
    name: "First Last",
    role: "President",
    photo: "/execs/exec-1.svg",
    bio: "Runs the club, herds the exec team, and somehow still finds time to lose in bracket.",
    socials: { instagram: "#", linkedin: "#", email: "mailto:ucalgarygamingclub@gmail.com" },
  },
  {
    name: "First Last",
    role: "Vice President",
    photo: "/execs/exec-2.svg",
    bio: "Second-in-command and the reason events actually start on time.",
    socials: { instagram: "#", linkedin: "#" },
  },
  {
    name: "First Last",
    role: "VP Events",
    photo: "/execs/exec-3.svg",
    bio: "Books the rooms, builds the brackets, and owns more extension cords than anyone should.",
    socials: { instagram: "#", discord: "#" },
  },
  {
    name: "First Last",
    role: "VP Finance",
    photo: "/execs/exec-4.svg",
    bio: "Keeps the budget alive so the prize table stays stocked.",
    socials: { linkedin: "#", email: "mailto:ucalgarygamingclub@gmail.com" },
  },
  {
    name: "First Last",
    role: "VP Marketing",
    photo: "/execs/exec-5.svg",
    bio: "Behind every post on the Instagram and every poster you have seen in MacEwan.",
    socials: { instagram: "#", linkedin: "#" },
  },
  {
    name: "First Last",
    role: "VP Sponsorship",
    photo: "/execs/exec-6.svg",
    bio: "Talks to the brands. The reason 7-Eleven shows up with snacks.",
    socials: { linkedin: "#", email: "mailto:ucalgarygamingclub@gmail.com" },
  },
  {
    name: "First Last",
    role: "VP Community",
    photo: "/execs/exec-7.svg",
    bio: "Runs the Discord and makes sure new members get talked to on day one.",
    socials: { discord: "#", instagram: "#" },
  },
  {
    name: "First Last",
    role: "VP Tabletop",
    photo: "/execs/exec-8.svg",
    bio: "Dungeon master, rules lawyer, and permanent supplier of dice.",
    socials: { instagram: "#", discord: "#" },
  },
];

/** Exec recruitment banner. Set `active: false` to hide it entirely. */
export const hiring = {
  active: true,
  headline: "We're Hiring!",
  text:
    "Exec applications are open. Help run the biggest gaming community on campus — " +
    "no prior club experience needed, just enthusiasm.",
  cta: "Apply to the exec team",
} as const;
