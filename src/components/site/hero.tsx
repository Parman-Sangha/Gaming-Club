import { ArrowRight } from "lucide-react";
import { LinkButton } from "@/components/ui/button";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { CountUp } from "@/components/ui/count-up";
import { Logo } from "@/components/ui/logo";
import { Wrap } from "@/components/ui/section";
import { club, stats } from "@/content";

export function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden py-12 sm:py-16 lg:py-24"
      style={{
        background:
          "radial-gradient(900px 480px at 78% 18%, var(--brand-soft), transparent 68%)",
      }}
    >
      <Wrap className="relative z-1">
        <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
          {/* ---- Copy ---- */}
          <div className="max-lg:order-2">
            <p className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-brand-soft px-3.5 py-1.5 text-[0.78rem] font-semibold text-fg shadow-[inset_0_0_0_1px_var(--brand-line)]">
              Official University of Calgary SU Club
            </p>

            <h1 className="text-[clamp(2.9rem,9vw,6.4rem)]">
              <span className="block">UCalgary</span>
              <span className="block text-brand">Gaming Club</span>
            </h1>

            <p className="relative mt-5 mb-6 inline-block pl-4.5 font-arcade text-[clamp(0.68rem,1.9vw,1rem)] tracking-[0.04em] text-fg">
              <span
                aria-hidden
                className="absolute top-[4%] left-0 h-[92%] w-[5px] -skew-x-[16deg] bg-brand"
              />
              {club.tagline}
            </p>

            <p className="mb-8 max-w-[56ch] text-[clamp(1.02rem,1.7vw,1.2rem)] text-fg-muted">
              {club.blurb}
            </p>

            <div className="mb-10 flex flex-wrap gap-3.5">
              <LinkButton href={club.linktree} size="lg">
                Join the Club
                <ArrowRight className="size-5" aria-hidden />
              </LinkButton>
              <LinkButton href={club.instagram} variant="ghost" size="lg">
                <InstagramIcon className="size-5" />
                Follow us
              </LinkButton>
            </div>

            <dl className="grid grid-cols-2 gap-x-2 gap-y-5 border-t border-line pt-6 sm:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <dt className="font-display text-[clamp(1.7rem,3.4vw,2.5rem)] font-extrabold leading-none text-brand">
                    <CountUp value={stat.value} suffix={stat.suffix} />
                  </dt>
                  <dd className="mt-1.5 text-[0.73rem] uppercase tracking-[0.07em] text-fg-dim">
                    {stat.label}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* ---- Logo ---- */}
          <div className="relative grid place-items-center max-lg:order-1 max-lg:mx-auto max-lg:max-w-sm">
            <Logo
              priority
              sizes="(max-width: 1024px) 80vw, 460px"
              className="max-w-[460px]"
            />
          </div>
        </div>
      </Wrap>
    </section>
  );
}
