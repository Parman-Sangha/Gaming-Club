# UCalgary Gaming Club

The official website for the University of Calgary Gaming Club — an SU club
"for all kinds of gamers to connect and play."

**Where Every Gamer Belongs.**

---

## Stack

| Layer | Choice |
| --- | --- |
| Framework | [Next.js 16](https://nextjs.org) (App Router, React Server Components) |
| Language | TypeScript (strict) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com) with CSS-variable design tokens |
| Theming | [next-themes](https://github.com/pacocoursey/next-themes) — dark default, persisted to `localStorage` |
| Animation | [Motion](https://motion.dev) for the FAQ accordion; CSS for everything else |
| Icons | [lucide-react](https://lucide.dev), plus hand-rolled brand glyphs |

The whole site is statically prerendered — it deploys to any static host and
costs nothing to run.

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
```

Other scripts:

```bash
npm run build       # production build
npm run start       # serve the production build
npm run lint        # eslint
npm run type-check  # tsc --noEmit
```

---

## Editing the site

**You almost never need to touch the components.** Every section renders from
typed data in [`src/content/`](src/content/):

| File | Controls |
| --- | --- |
| `club.ts` | Club name, tagline, all links, contact email, hero stats, ticker |
| `sponsors.ts` | Headline sponsor card + carousel logos |
| `events.ts` | The events list |
| `team.ts` | Exec grid + the "We're Hiring!" banner |
| `about.ts` | Mission, the four pillars, photo gallery, FAQ |

Because the content is typed, a mistyped field is a build error rather than a
broken page. Run `npm run type-check` after editing.

### Adding an event

Add an entry to `events` in [`src/content/events.ts`](src/content/events.ts):

```ts
{
  slug: "winter-lan-2027",            // unique, URL-safe
  title: "Winter LAN Party",
  tag: "LAN",                         // Booth | Sponsored | Tournament | Social | LAN | Workshop
  start: "2027-01-23T16:00",          // local Calgary time, no timezone suffix
  end: "2027-01-23T23:00",
  location: "MacEwan Hall — Ballroom",
  description: "One or two sentences.",
  cta: { label: "Register", type: "link", url: "https://…" },
  featured: false,                    // true = double-width card on desktop
}
```

Past and upcoming are worked out automatically from the current date, so old
events move themselves into the "Past" filter. You never have to delete them.

`cta.type: "calendar"` renders an **Add to calendar** button that generates a
`.ics` download instead of linking out.

### Hiring banner

Set `hiring.active` to `false` in `team.ts` to hide it when applications close.

---

## ⚠️ Placeholders to replace

Everything below is stand-in content. Search the repo for `TODO: REPLACE` to
find each one in context.

**Content**
- [ ] **Exec team** — all 8 entries in `team.ts` are "First Last" with placeholder bios
- [ ] **Exec photos** — `/public/execs/*.svg` say "ADD PHOTO". Square images, 600×600+
- [ ] **Gallery photos** — `/public/gallery/*.svg`. The first one renders as a large 2×2 tile
- [ ] **Sponsor logos** — `/public/sponsors/sponsor-*.svg` and their `url`s in `sponsors.ts`
- [ ] **7-Eleven logo** — `/public/sponsors/7-eleven.svg` is a marked placeholder; drop in the official brand asset
- [ ] **Hero stats** — the member/event counts in `club.ts` are made up

**Links** (all in `club.ts`)
- [ ] `email` / `sponsorEmail` — currently a Gmail placeholder
- [ ] `discord` — currently points at the Linktree
- [ ] `execApplication` — the real application form
- [ ] `suPage` — the club's SU directory listing

**Event dates**

> The Clubs Week and 7-Eleven Gaming Lounge entries use the dates given
> (Sept 9 / 14 / 18) with the year set to **2026**, which means they now sit in
> the past and display under the "Past" filter. Update the year in `events.ts`
> each term.

**Contact form**

The form currently opens the visitor's email client with the message
pre-filled — no setup, works immediately. To collect submissions properly,
create a free endpoint at [formspree.io](https://formspree.io) and set it in
`club.ts`:

```ts
formEndpoint: "https://formspree.io/f/xxxxxxxx",
```

**Logo**

`src/components/ui/logo.tsx` is a hand-drawn stand-in for the club's T-rex
mascot. Replace the paths with the official artwork, but keep it as inline SVG
— the cabinet uses `currentColor` so it adapts between light and dark themes.

---

## Deploying

Push to GitHub, then import the repo at [vercel.com/new](https://vercel.com/new).
Vercel detects Next.js automatically; no configuration needed. Every push to
`main` redeploys.

Any static host works too — `npm run build` output is fully prerendered.

---

## Notes on the implementation

A few decisions that aren't obvious from reading the code:

- **Dark is the default theme**, so the dark palette sits on `:root` and
  `.light` overrides it. The first paint is correct before JS runs.
- **Event times are stored as "floating" local strings** and formatted by
  parsing the string directly, never via `new Date()`. Passing a local ISO
  string to the `Date` constructor resolves it against the *runtime's*
  timezone, which differs between the build server and the visitor's browser
  and causes React hydration mismatches.
- **Scroll reveals are CSS-driven, gated behind a `.js` class** added by an
  inline script. Animating them in JS would server-render `opacity: 0`, leaving
  half the page invisible if scripts fail to load.
- **Browser-only values use `useSyncExternalStore`**, not the
  `useEffect(() => setMounted(true))` pattern, which costs an extra render on
  every mount.
- **Both palettes are checked for WCAG AA contrast**, and every animation is
  disabled under `prefers-reduced-motion`.
