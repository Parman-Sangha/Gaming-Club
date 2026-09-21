import type { ClubEvent } from "./types";

/**
 * Date handling for event content.
 *
 * Event times are stored as *floating* local strings ("2026-09-14T09:00") —
 * they mean 9am in Calgary regardless of where the server runs.
 *
 * Formatting therefore parses the string by hand instead of going through
 * `new Date(...)`. Passing a local ISO string to the Date constructor resolves
 * it against the *runtime's* timezone, which differs between the build server
 * and the visitor's browser and produces React hydration mismatches.
 * String parsing is identical everywhere.
 */

const MONTHS_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
] as const;

const MONTHS_LONG = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

const WEEKDAYS = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
] as const;

export interface ParsedDateTime {
  year: number;
  /** 1-indexed, as written in the string. */
  month: number;
  day: number;
  hour: number;
  minute: number;
}

/** Parse "2026-09-14T09:00" without any timezone interpretation. */
export function parseLocal(iso: string): ParsedDateTime {
  const [datePart, timePart = "00:00"] = iso.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hour, minute] = timePart.split(":").map(Number);
  return { year, month, day, hour, minute };
}

/** Day of the week, derived arithmetically so it never depends on a timezone. */
export function weekdayOf(iso: string): string {
  const { year, month, day } = parseLocal(iso);
  return WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
}

/** "Sep" */
export function monthShort(iso: string): string {
  return MONTHS_SHORT[parseLocal(iso).month - 1];
}

/** "September" */
export function monthLong(iso: string): string {
  return MONTHS_LONG[parseLocal(iso).month - 1];
}

/** "14" */
export function dayOfMonth(iso: string): number {
  return parseLocal(iso).day;
}

/** "9:00 AM" */
export function formatTime(iso: string): string {
  const { hour, minute } = parseLocal(iso);
  const period = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const mm = String(minute).padStart(2, "0");
  return `${h12}:${mm} ${period}`;
}

/** "9:00 AM – 5:00 PM" */
export function formatTimeRange(start: string, end: string): string {
  return `${formatTime(start)} – ${formatTime(end)}`;
}

/** "Monday, September 14, 2026" */
export function formatFullDate(iso: string): string {
  const { year, day } = parseLocal(iso);
  return `${weekdayOf(iso)}, ${monthLong(iso)} ${day}, ${year}`;
}

/** Machine-readable value for a <time dateTime> attribute. */
export function isoAttribute(iso: string): string {
  return iso;
}

/**
 * Epoch milliseconds in the *visitor's* timezone.
 *
 * Only safe to call on the client — on the server it would resolve against the
 * build machine's timezone. Event status is computed after mount for this
 * reason (see `useEventStatus`).
 */
export function toLocalTimestamp(iso: string): number {
  const { year, month, day, hour, minute } = parseLocal(iso);
  return new Date(year, month - 1, day, hour, minute).getTime();
}

export function isPast(event: ClubEvent, now: number): boolean {
  return toLocalTimestamp(event.end) < now;
}

/** Soonest event that has not finished yet, or null if they have all passed. */
export function nextUpcoming(events: ClubEvent[], now: number): ClubEvent | null {
  const upcoming = events
    .filter((e) => !isPast(e, now))
    .sort((a, b) => toLocalTimestamp(a.start) - toLocalTimestamp(b.start));
  return upcoming[0] ?? null;
}

/** Sort chronologically; `direction` flips it for past events. */
export function sortByStart(events: ClubEvent[], direction: "asc" | "desc" = "asc") {
  const factor = direction === "asc" ? 1 : -1;
  return [...events].sort(
    (a, b) => (toLocalTimestamp(a.start) - toLocalTimestamp(b.start)) * factor,
  );
}

/* -------------------------------------------------------------------------- */
/* Calendar export                                                             */
/* -------------------------------------------------------------------------- */

/** "2026-09-14T09:00" -> "20260914T090000" (floating, no Z suffix). */
function toIcsStamp(iso: string): string {
  const { year, month, day, hour, minute } = parseLocal(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${year}${p(month)}${p(day)}T${p(hour)}${p(minute)}00`;
}

/** RFC 5545 requires escaping these in TEXT values. */
function escapeIcs(value: string): string {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/;/g, "\\;")
    .replace(/,/g, "\\,")
    .replace(/\n/g, "\\n");
}

/** Build a single-event .ics file body. */
export function buildIcs(event: ClubEvent, organizer: string): string {
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//UCalgary Gaming Club//Website//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${event.slug}@ucalgarygamingclub`,
    `DTSTART:${toIcsStamp(event.start)}`,
    `DTEND:${toIcsStamp(event.end)}`,
    `SUMMARY:${escapeIcs(event.title)}`,
    `DESCRIPTION:${escapeIcs(event.description)}`,
    `LOCATION:${escapeIcs(event.location)}`,
    `ORGANIZER;CN=${escapeIcs(organizer)}:mailto:noreply@ucalgarygamingclub`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

/** Trigger a browser download of the event as a .ics file. */
export function downloadIcs(event: ClubEvent, organizer: string): void {
  const blob = new Blob([buildIcs(event, organizer)], {
    type: "text/calendar;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${event.slug}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
