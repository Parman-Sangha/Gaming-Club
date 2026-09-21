"use client";

import { useMemo, useState } from "react";
import { CalendarPlus, Clock, ExternalLink, MapPin } from "lucide-react";
import { Button, LinkButton } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHead, Wrap } from "@/components/ui/section";
import { club, events } from "@/content";
import type { ClubEvent } from "@/lib/types";
import {
  dayOfMonth,
  downloadIcs,
  formatFullDate,
  formatTimeRange,
  isPast,
  monthShort,
  nextUpcoming,
  sortByStart,
  toLocalTimestamp,
  weekdayOf,
} from "@/lib/datetime";
import { cn } from "@/lib/utils";
import { useMountTime, useNow } from "@/lib/client-hooks";

type Filter = "all" | "upcoming" | "past";

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All events" },
  { id: "upcoming", label: "Upcoming" },
  { id: "past", label: "Past" },
];

export function Events() {
  const [filter, setFilter] = useState<Filter>("all");

  /**
   * Null until hydration.
   *
   * Whether an event is past depends on the viewer's clock and timezone, which
   * the server cannot know — deriving it during SSR would produce different
   * markup on the server and the client. This is the page-load time rather than
   * a ticking clock, so filtering never re-runs on its own.
   */
  const now = useMountTime();

  const visible = useMemo(() => {
    const sorted = sortByStart(events, "asc");
    if (now === null || filter === "all") return sorted;

    return filter === "upcoming"
      ? sorted.filter((e) => !isPast(e, now))
      : sortByStart(sorted.filter((e) => isPast(e, now)), "desc");
  }, [filter, now]);

  return (
    <Section id="events">
      <Wrap>
        <SectionHead
          kicker="What's On"
          title={<>Come <span className="text-brand">play</span> with us</>}
          lede="Drop-in nights, brackets with real prizes, and booths you can walk straight up to. No membership required to come say hello."
        />

        <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
          <Countdown />

          <div role="group" aria-label="Filter events" className="flex flex-wrap gap-1.5">
            {FILTERS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setFilter(id)}
                aria-pressed={filter === id}
                className={cn(
                  "rounded-full px-4 py-2 text-[0.86rem] font-semibold transition-[color,box-shadow,background-color] duration-300",
                  filter === id
                    ? "bg-brand text-on-brand shadow-[inset_0_0_0_1px_var(--brand)]"
                    : "text-fg-muted shadow-[inset_0_0_0_1px_var(--border)] hover:text-fg hover:shadow-[inset_0_0_0_1px_var(--border-loud)]",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {visible.length === 0 ? (
          <p className="rounded-[22px] border-2 border-dashed border-line px-4 py-14 text-center text-fg-dim">
            Nothing here right now — follow{" "}
            <a href={club.instagram} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand underline underline-offset-4">
              {club.instagramHandle}
            </a>{" "}
            to hear about the next one first.
          </p>
        ) : (
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((event, i) => (
              <EventCard
                key={event.slug}
                event={event}
                index={i}
                past={now !== null && isPast(event, now)}
              />
            ))}
          </ul>
        )}
      </Wrap>
    </Section>
  );
}

function EventCard({
  event,
  index,
  past,
}: {
  event: ClubEvent;
  index: number;
  past: boolean;
}) {
  return (
    <Reveal
      as="li"
      delay={Math.min(index, 5) * 0.06}
      className={cn(
        event.featured && "lg:col-span-2",
        past && "opacity-60 transition-opacity hover:opacity-100",
      )}
    >
      <article
        className={cn(
          "flex h-full flex-col overflow-hidden rounded-[22px] bg-surface transition-[transform,box-shadow] duration-300 ease-brand hover:-translate-y-1.5",
          event.featured
            ? "shadow-[0_0_0_1px_var(--brand-line),0_10px_30px_rgb(0_0_0/0.28)]"
            : "shadow-[inset_0_0_0_1px_var(--border)] hover:shadow-[inset_0_0_0_1px_var(--brand-line),0_10px_30px_rgb(0_0_0/0.28)]",
        )}
      >
        <div className="flex items-start gap-4 p-5 pb-0">
          <time
            dateTime={event.start}
            className="relative w-16 shrink-0 overflow-hidden rounded-[10px] bg-brand px-1 py-2 text-center text-on-brand shadow-[0_2px_8px_rgb(0_0_0/0.3)]"
          >
            <span className="block font-display text-[1.9rem] leading-none font-extrabold">
              {dayOfMonth(event.start)}
            </span>
            <span className="mt-1 block font-arcade text-[0.42rem] tracking-[0.1em]">
              {monthShort(event.start).toUpperCase()}
            </span>
          </time>

          <div className="min-w-0 flex-1">
            <span className="mb-2 inline-block rounded-[5px] bg-brand-soft px-2 py-1 font-arcade text-[0.4rem] tracking-[0.12em] text-brand uppercase">
              {event.tag}
            </span>
            {past && (
              <span className="mb-2 ml-1.5 inline-block rounded-[5px] bg-surface-2 px-2 py-1 font-arcade text-[0.4rem] tracking-[0.12em] text-fg-dim uppercase">
                Past
              </span>
            )}
            <h3 className="text-[1.42rem] leading-[1.02]">{event.title}</h3>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 pt-3.5">
          <ul className="mb-3.5 grid gap-1.5 text-[0.87rem] text-fg-muted">
            <li className="flex items-center gap-2.5">
              <CalendarPlus className="size-4 shrink-0 text-brand" aria-hidden />
              {weekdayOf(event.start)}, {monthShort(event.start)} {dayOfMonth(event.start)}
            </li>
            <li className="flex items-center gap-2.5">
              <Clock className="size-4 shrink-0 text-brand" aria-hidden />
              {formatTimeRange(event.start, event.end)}
            </li>
            <li className="flex items-center gap-2.5">
              <MapPin className="size-4 shrink-0 text-brand" aria-hidden />
              {event.location}
            </li>
          </ul>

          <p className="mb-5 text-[0.93rem] text-fg-muted">{event.description}</p>

          <div className="mt-auto flex flex-wrap gap-2.5">
            {event.cta.type === "calendar" ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => downloadIcs(event, club.name)}
              >
                <CalendarPlus className="size-4" aria-hidden />
                {event.cta.label}
                <span className="sr-only"> for {event.title}</span>
              </Button>
            ) : (
              <LinkButton href={event.cta.url ?? club.linktree} size="sm">
                {event.cta.label}
                <ExternalLink className="size-4" aria-hidden />
                <span className="sr-only"> for {event.title}</span>
              </LinkButton>
            )}
          </div>
        </div>

        {/* Full date, for screen readers and for search engines. */}
        <span className="sr-only">{formatFullDate(event.start)}</span>
      </article>
    </Reveal>
  );
}

/** Live countdown to whichever event starts next. */
function Countdown() {
  // Ticks once a second from a shared timer; null until hydration.
  const tick = useNow();
  const next = tick === null ? null : nextUpcoming(events, tick);

  // Reserve the same footprint before mount so the row doesn't jump.
  if (tick === null || next === null) {
    return (
      <div className="min-h-[5.25rem] rounded-[14px] px-4 py-3.5 shadow-[inset_0_0_0_1px_var(--border)]">
        <p className="font-arcade text-[0.44rem] leading-[1.7] tracking-[0.13em] text-fg-dim uppercase">
          Next event
        </p>
        <p className="mt-1.5 text-[0.9rem] text-fg-muted">
          {tick === null ? "Loading…" : "To be announced"}
        </p>
      </div>
    );
  }

  const remaining = Math.max(toLocalTimestamp(next.start) - tick, 0);
  const seconds = Math.floor(remaining / 1000);
  const units = [
    { value: Math.floor(seconds / 86400), label: "Days" },
    { value: Math.floor((seconds % 86400) / 3600), label: "Hrs" },
    { value: Math.floor((seconds % 3600) / 60), label: "Min" },
    { value: seconds % 60, label: "Sec" },
  ];

  return (
    <div className="flex items-center gap-4 rounded-[14px] bg-surface px-4 py-3.5 shadow-[inset_0_0_0_1px_var(--border)] max-sm:w-full max-sm:justify-between">
      <p className="max-w-[9ch] font-arcade text-[0.44rem] leading-[1.7] tracking-[0.13em] text-fg-dim uppercase">
        Next event
      </p>
      {/* Announce the summary rather than a per-second stream of updates. */}
      <p className="sr-only" aria-live="polite">
        {next.title} starts in {units[0].value} days, {units[1].value} hours.
      </p>
      <div aria-hidden className="flex gap-2.5">
        {units.map((unit) => (
          <div key={unit.label} className="min-w-11 text-center">
            <b className="block font-display text-[1.65rem] leading-none font-extrabold tabular-nums text-brand">
              {String(unit.value).padStart(2, "0")}
            </b>
            <span className="text-[0.58rem] uppercase tracking-[0.1em] text-fg-dim">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
