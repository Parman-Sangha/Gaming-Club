import { ArrowRight } from "lucide-react";
import { InstagramIcon } from "@/components/ui/brand-icons";
import { LinkButton } from "@/components/ui/button";
import { CountUp } from "@/components/ui/count-up";
import { Logo } from "@/components/ui/logo";
import { Slashes, Wrap } from "@/components/ui/section";
import { club, stats, tickerPhrases } from "@/content";

export function Hero() {
  return (
    <>
      <section
        id="top"
        className="relative overflow-hidden py-12 sm:py-16 lg:py-24"
        style={{
          background:
            "radial-gradient(900px 480px at 78% 18%, var(--brand-soft), transparent 68%), radial-gradient(700px 400px at 8% 88%, var(--brand-soft), transparent 70%)",
        }}
      >
        <Slashes />

        <Wrap className="relative z-1">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            {/* ---- Copy ---- */}
            <div className="max-lg:order-2">
              <p className="mb-5 inline-flex items-center gap-2.5 rounded-full bg-brand-soft px-3.5 py-1.5 text-[0.78rem] font-semibold text-fg shadow-[inset_0_0_0_1px_var(--brand-line)]">
                <span
                  aria-hidden
                  className="animate-pulse-ring size-1.5 shrink-0 rounded-full bg-brand"
                />
                Official University of Calgary SU Club
              </p>

              <h1 className="text-[clamp(2.9rem,9vw,6.4rem)]">
                {/* Each line clips its own slide-up so the reveal reads as typeset. */}
                <span className="block overflow-hidden">
                  <span className="block animate-[riseIn_0.85s_var(--ease-brand)_both]">
                    UCalgary
                  </span>
                </span>
                <span className="block overflow-hidden">
                  <span className="block animate-[riseIn_0.85s_var(--ease-brand)_0.09s_both] text-brand">
                    Gaming Club
                  </span>
                </span>
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
                  <InstagramIcon className="size-5" aria-hidden />
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

            {/* ---- Mascot ---- */}
            <div className="relative grid place-items-center max-lg:order-1 max-lg:mx-auto max-lg:max-w-sm">
              <div
                aria-hidden
                className="animate-breathe absolute aspect-square w-[78%] rounded-full blur-[46px]"
                style={{
                  background:
                    "radial-gradient(circle, var(--brand) 0%, transparent 62%)",
                }}
              />
              <Logo className="animate-bob relative w-full max-w-[460px] drop-shadow-[0_22px_40px_rgb(0_0_0/0.45)]" />
            </div>
          </div>
        </Wrap>
      </section>

      <Ticker />
    </>
  );
}

/** Skewed scrolling band of the kinds of gaming the club covers. */
function Ticker() {
  // Duplicated so the -50% translate loops seamlessly.
  const phrases = [...tickerPhrases, ...tickerPhrases];

  return (
    <div
      className="marquee-host no-print relative z-2 -my-2.5 -skew-y-[1.1deg] overflow-hidden bg-brand py-2.5 text-on-brand shadow-[0_10px_30px_rgb(0_0_0/0.30)]"
      aria-hidden
    >
      <div className="animate-marquee flex w-max">
        {phrases.map((phrase, i) => (
          <span
            key={`${phrase}-${i}`}
            className="inline-flex items-center gap-4.5 px-4.5 font-display text-[1.05rem] font-extrabold uppercase tracking-[0.06em] whitespace-nowrap"
          >
            {phrase}
            <span className="text-[0.62rem] opacity-75">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
