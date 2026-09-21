import { Dices, Gamepad2, Store, Trophy } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Wrap } from "@/components/ui/section";
import { Gallery } from "@/components/site/gallery";
import { club, gallery, mission, pillars } from "@/content";
import type { PillarIcon } from "@/lib/types";

const PILLAR_ICONS: Record<PillarIcon, LucideIcon> = {
  controller: Gamepad2,
  trophy: Trophy,
  booth: Store,
  dice: Dices,
};

export function About() {
  return (
    <Section id="about" alt>
      <Wrap>
        <SectionHead
          kicker="About Us"
          title={<>More than a <span className="text-brand">group chat</span></>}
        />

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <blockquote className="border-l-[5px] border-brand pl-6 font-display text-[clamp(1.5rem,2.9vw,2.15rem)] font-bold leading-[1.12] normal-case tracking-normal">
              {mission}
            </blockquote>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2">
            {pillars.map((pillar, i) => {
              const Icon = PILLAR_ICONS[pillar.icon];
              return (
                <Reveal as="li" key={pillar.title} delay={i * 0.08}>
                  <div className="h-full rounded-[14px] bg-surface p-6 shadow-[inset_0_0_0_1px_var(--border)] transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-1 hover:shadow-[inset_0_0_0_1px_var(--brand-line),0_2px_8px_rgb(0_0_0/0.28)]">
                    <span className="mb-4 grid size-11 place-items-center rounded-[11px] bg-brand-soft text-brand">
                      <Icon className="size-5.5" aria-hidden />
                    </span>
                    <h3 className="mb-2 text-[1.22rem]">{pillar.title}</h3>
                    <p className="text-[0.9rem] text-fg-muted">{pillar.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ul>
        </div>

        <Gallery photos={gallery} />

        <div className="mt-7 flex justify-center">
          <LinkButton href={club.instagram} variant="outline">
            <InstagramIcon className="size-5" aria-hidden />
            See more on Instagram
          </LinkButton>
        </div>
      </Wrap>
    </Section>
  );
}
