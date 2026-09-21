import Link from "next/link";
import { Link2, Mail } from "lucide-react";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { DiscordIcon } from "@/components/ui/brand-icons";
import { Logo } from "@/components/ui/logo";
import { Wrap } from "@/components/ui/section";
import { club } from "@/content";

const EXPLORE = [
  { href: "#sponsors", label: "Sponsors" },
  { href: "#events", label: "Events" },
  { href: "#about", label: "About" },
  { href: "#team", label: "Team" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  const socials = [
    { href: club.instagram, Icon: InstagramIcon, label: "Instagram" },
    { href: club.discord, Icon: DiscordIcon, label: "Discord" },
    { href: club.linktree, Icon: Link2, label: "Linktree" },
    { href: `mailto:${club.email}`, Icon: Mail, label: "Email" },
  ];

  return (
    <footer className="border-t border-line bg-bg-alt pt-14 pb-8">
      <Wrap>
        <div className="mb-10 grid gap-9 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Brand */}
          <div>
            <Link href="#top" className="mb-4 flex items-center gap-2.5 text-fg">
              <Logo className="h-10 w-11.5 shrink-0" />
              <span className="font-display text-[1.3rem] font-extrabold uppercase leading-none">
                UCalgary <span className="text-brand">Gaming</span>
              </span>
            </Link>
            <p className="max-w-[40ch] text-[0.92rem] text-fg-muted">
              For all kinds of gamers to connect and play. {club.tagline}
            </p>

            <ul className="mt-5 flex gap-2">
              {socials.map(({ href, Icon, label }) => {
                const isMailto = href.startsWith("mailto:");
                return (
                  <li key={label}>
                    <a
                      href={href}
                      {...(isMailto ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                      aria-label={label}
                      className="grid size-9.5 place-items-center rounded-[10px] text-fg-muted shadow-[inset_0_0_0_1px_var(--border)] transition-[color,background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:bg-brand hover:text-on-brand hover:shadow-[inset_0_0_0_1px_var(--brand)]"
                    >
                      <Icon className="size-4" aria-hidden />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Explore */}
          <nav aria-label="Footer">
            <h4 className="mb-3.5 text-base tracking-[0.04em]">Explore</h4>
            <ul className="grid gap-2">
              {EXPLORE.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-[0.92rem] text-fg-muted transition-colors duration-300 hover:text-brand"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Get involved */}
          <div>
            <h4 className="mb-3.5 text-base tracking-[0.04em]">Get involved</h4>
            <ul className="grid gap-2">
              <li>
                <a href={club.linktree} target="_blank" rel="noopener noreferrer" className="text-[0.92rem] text-fg-muted transition-colors duration-300 hover:text-brand">
                  Become a member
                </a>
              </li>
              <li>
                <a href={club.execApplication} target="_blank" rel="noopener noreferrer" className="text-[0.92rem] text-fg-muted transition-colors duration-300 hover:text-brand">
                  Join the exec team
                </a>
              </li>
              <li>
                <a href={`mailto:${club.sponsorEmail}?subject=Sponsorship%20enquiry`} className="text-[0.92rem] text-fg-muted transition-colors duration-300 hover:text-brand">
                  Sponsor us
                </a>
              </li>
              <li>
                <a href={club.suPage} target="_blank" rel="noopener noreferrer" className="text-[0.92rem] text-fg-muted transition-colors duration-300 hover:text-brand">
                  SU clubs directory
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-[0.84rem] text-fg-dim">
          <p className="inline-flex items-center gap-2 font-semibold text-fg-muted">
            <span aria-hidden className="h-[3px] w-4 -skew-x-[28deg] bg-brand" />
            Official UCalgary SU Club
          </p>
          <p>
            © {year} {club.name}. All rights reserved.
          </p>
        </div>
      </Wrap>
    </footer>
  );
}
