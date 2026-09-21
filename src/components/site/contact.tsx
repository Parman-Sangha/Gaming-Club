import { ArrowRight, Link2, Mail } from "lucide-react";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { LinkButton } from "@/components/ui/button";
import { DiscordIcon } from "@/components/ui/brand-icons";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Wrap } from "@/components/ui/section";
import { ContactForm } from "@/components/site/contact-form";
import { Faq } from "@/components/site/faq";
import { club, faq } from "@/content";

export function Contact() {
  const links = [
    {
      href: club.linktree,
      Icon: Link2,
      title: "linktr.ee/ucalgarygamingclub",
      sub: "Membership, event sign-ups and every other link",
    },
    {
      href: club.instagram,
      Icon: InstagramIcon,
      title: club.instagramHandle,
      sub: "Event announcements, photos and stories",
    },
    {
      href: club.discord,
      Icon: DiscordIcon,
      title: "Join the Discord",
      sub: "Find people to play with between events",
    },
    {
      href: `mailto:${club.email}`,
      Icon: Mail,
      title: club.email,
      sub: "For anything that needs a longer reply",
    },
  ];

  return (
    <Section id="contact" alt>
      <Wrap>
        <SectionHead
          kicker="Sign Up"
          title={<>Ready to <span className="text-brand">play</span>?</>}
          lede="Membership takes about a minute. Everything starts at our Linktree."
        />

        <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-14">
          {/* ---- Join card ---- */}
          <Reveal>
            <div className="relative overflow-hidden rounded-[22px] bg-surface p-6 shadow-[0_0_0_1px_var(--brand-line),0_10px_30px_rgb(0_0_0/0.28)] sm:p-9">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[linear-gradient(140deg,var(--brand-soft),transparent_52%)]"
              />
              <div className="relative">
                <h3 className="mb-2.5 text-[clamp(1.7rem,3.2vw,2.3rem)]">
                  Join the Club
                </h3>
                <p className="mb-6 text-fg-muted">
                  Open to every UCalgary student, whatever you play and however
                  seriously you play it.
                </p>

                <LinkButton href={club.linktree} size="lg" className="w-full">
                  Go to our Linktree
                  <ArrowRight className="size-5" aria-hidden />
                </LinkButton>

                <ul className="mt-6 grid gap-2.5">
                  {links.map(({ href, Icon, title, sub }) => {
                    const isMailto = href.startsWith("mailto:");
                    return (
                      <li key={href}>
                        <a
                          href={href}
                          {...(isMailto ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                          className="flex items-center gap-3.5 rounded-[14px] px-4 py-3.5 text-fg shadow-[inset_0_0_0_1px_var(--border)] transition-[transform,box-shadow,background-color] duration-300 ease-brand hover:translate-x-1 hover:bg-brand-soft hover:shadow-[inset_0_0_0_1px_var(--brand-line)]"
                        >
                          <Icon className="size-5 shrink-0 text-brand" aria-hidden />
                          <span className="min-w-0">
                            <b className="block truncate text-[0.95rem]">{title}</b>
                            <small className="text-[0.8rem] text-fg-dim">{sub}</small>
                          </span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* ---- Contact form ---- */}
          <Reveal delay={0.1}>
            <div>
              <h3 className="mb-2.5 text-[clamp(1.7rem,3.2vw,2.3rem)]">
                Send us a message
              </h3>
              <p className="mb-6 text-fg-muted">
                Questions about an event, sponsorship, or joining the exec team?
                This reaches the whole team.
              </p>
              <ContactForm />
            </div>
          </Reveal>
        </div>

        <Faq items={faq} />
      </Wrap>
    </Section>
  );
}
