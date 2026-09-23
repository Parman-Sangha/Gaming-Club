import Image from "next/image";
import { ExternalLink, Handshake } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Wrap } from "@/components/ui/section";
import { club, headlineSponsor, sponsors } from "@/content";

export function Sponsors() {
  return (
    <Section id="sponsors" alt className="overflow-hidden">
      <Wrap>
        <SectionHead
          kicker="Our Sponsors"
          title={<>Backed by brands who <span className="text-brand">get it</span></>}
          lede="Their support is what keeps our events free, our prize tables stocked and our doors open to every student on campus."
        />

        {/* ---- Headline sponsor feature card ---- */}
        <Reveal>
          <a
            href={headlineSponsor.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative mb-10 grid items-center gap-6 overflow-hidden rounded-[22px] bg-surface p-6 shadow-[0_0_0_1px_var(--brand-line),0_10px_30px_rgb(0_0_0/0.28)] transition-shadow duration-300 hover:shadow-[0_0_0_1px_var(--brand),0_18px_46px_rgb(0_0_0/0.34)] sm:p-8 md:grid-cols-[minmax(240px,380px)_1fr] md:gap-12 lg:mb-14"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[linear-gradient(112deg,var(--brand-soft)_0%,transparent_46%)]"
            />
            <div className="relative grid place-items-center rounded-[14px] bg-surface-2 p-5 shadow-[inset_0_0_0_1px_var(--border)] transition-transform duration-300 ease-brand group-hover:scale-[1.025] sm:p-7">
              <Image
                src={headlineSponsor.logo}
                alt={`${headlineSponsor.name} logo`}
                width={360}
                height={150}
                className="h-auto w-full max-w-[300px]"
                priority
              />
            </div>

            <div className="relative">
              <p className="mb-2 font-arcade text-[0.5rem] tracking-[0.14em] text-brand uppercase">
                Headline sponsor
              </p>
              <h3 className="mb-2.5 text-[clamp(1.6rem,3.2vw,2.3rem)]">
                {headlineSponsor.name}
              </h3>
              <p className="mb-5 max-w-[52ch] text-fg-muted">{headlineSponsor.blurb}</p>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <span className="inline-flex items-center gap-2 font-display text-lg font-extrabold uppercase tracking-[0.05em] text-brand">
                  Visit {headlineSponsor.name}
                  <ExternalLink className="size-4" aria-hidden />
                </span>
                <span className="text-[0.75rem] uppercase tracking-[0.1em] text-fg-dim">
                  Partner since {headlineSponsor.since}
                </span>
              </div>
            </div>
          </a>
        </Reveal>
      </Wrap>

      {/* ---- Auto-scrolling logo carousel (full-bleed) ---- */}
      <SponsorCarousel />

      <Wrap>
        <div className="mt-10 flex flex-col items-center gap-4 text-center lg:mt-14">
          <p className="max-w-[46ch] text-fg-muted">
            Want to reach hundreds of engaged students on campus? We build sponsorship
            packages around what your brand actually wants.
          </p>
          <LinkButton href={`mailto:${club.sponsorEmail}?subject=Sponsorship%20enquiry`}>
            <Handshake className="size-5" aria-hidden />
            Become a Sponsor
          </LinkButton>
        </div>
      </Wrap>
    </Section>
  );
}

function SponsorCarousel() {
  // The list is rendered twice so the -50% marquee translate loops seamlessly.
  const loop = [...sponsors, ...sponsors];

  return (
    <div
      className="marquee-host mask-fade-x relative"
      // Pausing is handled in CSS (:hover / :focus-within) so it keeps working
      // without JS and for keyboard users tabbing through the logos.
      style={{ ["--marquee-duration" as string]: "40s" }}
    >
      <ul className="animate-marquee flex w-max gap-4">
        {loop.map((sponsor, i) => (
          <li key={`${sponsor.name}-${i}`}>
            <a
              href={sponsor.url}
              target="_blank"
              rel="noopener noreferrer"
              // The second copy is a visual duplicate — hide it from screen
              // readers so every sponsor is announced exactly once.
              {...(i >= sponsors.length ? { "aria-hidden": true, tabIndex: -1 } : {})}
              className="group relative grid h-30 w-[clamp(192px,22vw,244px)] shrink-0 place-items-center overflow-hidden rounded-[14px] bg-surface px-5 py-4 shadow-[inset_0_0_0_1px_var(--border)] transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-1.5 hover:shadow-[inset_0_0_0_1px_var(--brand-line),0_10px_30px_rgb(0_0_0/0.28)]"
            >
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-brand transition-transform duration-300 ease-brand group-hover:scale-x-100"
              />
              <Image
                src={sponsor.logo}
                alt={`${sponsor.name} logo`}
                width={320}
                height={120}
                className="max-h-[74px] w-full object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
