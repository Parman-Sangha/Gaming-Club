import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { SOCIAL_ICONS } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Wrap } from "@/components/ui/section";
import { club, hiring, team } from "@/content";
import type { SocialPlatform } from "@/lib/types";

export function Team() {
  return (
    <Section id="team">
      <Wrap>
        <SectionHead
          kicker="The Team"
          title={<>Run by students, <span className="text-brand">for students</span></>}
          lede="The people who book the rooms, build the brackets and carry the consoles across campus."
        />

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member, i) => (
            <Reveal as="li" key={`${member.role}-${i}`} delay={Math.min(i, 7) * 0.05}>
              <article className="group h-full overflow-hidden rounded-[22px] bg-surface shadow-[inset_0_0_0_1px_var(--border)] transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-1.5 hover:shadow-[inset_0_0_0_1px_var(--brand-line),0_10px_30px_rgb(0_0_0/0.28)]">
                <div className="relative aspect-square overflow-hidden bg-surface-2">
                  <Image
                    src={member.photo}
                    alt={`${member.name}, ${member.role}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 ease-brand group-hover:scale-105"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(0deg,var(--surface)_2%,transparent_42%)]"
                  />
                  <span className="absolute bottom-3 left-3 z-1 rounded-[5px] bg-brand px-2.5 py-1.5 font-arcade text-[0.43rem] tracking-[0.1em] text-on-brand uppercase">
                    {member.role}
                  </span>
                </div>

                <div className="p-5">
                  <h3 className="mb-1.5 text-[1.28rem]">{member.name}</h3>
                  <p className="min-h-[3.6em] text-[0.86rem] text-fg-muted">{member.bio}</p>

                  <ul className="mt-3.5 flex gap-1.5">
                    {(Object.keys(member.socials) as SocialPlatform[]).map((platform) => {
                      const href = member.socials[platform];
                      if (!href) return null;

                      const { Icon, label } = SOCIAL_ICONS[platform];
                      const isMailto = href.startsWith("mailto:");

                      return (
                        <li key={platform}>
                          <a
                            href={href}
                            {...(isMailto
                              ? {}
                              : { target: "_blank", rel: "noopener noreferrer" })}
                            aria-label={`${member.name} on ${label}`}
                            className="grid size-8 place-items-center rounded-lg text-fg-muted shadow-[inset_0_0_0_1px_var(--border)] transition-[color,background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-on-brand hover:shadow-[inset_0_0_0_1px_var(--brand)]"
                          >
                            <Icon className="size-3.5" />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>

        {hiring.active && (
          <Reveal>
            <aside className="relative mt-10 grid items-center gap-6 overflow-hidden rounded-[22px] bg-[linear-gradient(112deg,var(--brand-strong),var(--brand-deep))] p-6 text-white shadow-[0_10px_30px_rgb(0_0_0/0.28)] sm:p-9 md:grid-cols-[1fr_auto] lg:mt-14">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(115deg,rgb(255_255_255/0.10)_0_22px,transparent_22px_52px)]"
              />
              <div className="relative">
                <h3 className="mb-1.5 text-[clamp(1.8rem,3.6vw,2.6rem)]">
                  {hiring.headline}
                </h3>
                <p className="max-w-[58ch] text-white/90">{hiring.text}</p>
              </div>
              <LinkButton
                href={club.execApplication}
                variant="invert"
                className="relative"
              >
                {hiring.cta}
                <ArrowRight className="size-5" aria-hidden />
              </LinkButton>
            </aside>
          </Reveal>
        )}
      </Wrap>
    </Section>
  );
}
