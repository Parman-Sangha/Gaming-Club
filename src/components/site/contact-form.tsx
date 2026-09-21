"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { club } from "@/content";
import { cn } from "@/lib/utils";

interface Errors {
  name?: string;
  email?: string;
  message?: string;
}

type Status =
  | { state: "idle" }
  | { state: "sending" }
  | { state: "sent"; message: string }
  | { state: "error"; message: string };

const SUBJECTS = [
  "General question",
  "Joining the club",
  "Sponsorship",
  "Exec applications",
  "Event enquiry",
] as const;

function validate(data: FormData): Errors {
  const errors: Errors = {};
  const name = String(data.get("name") ?? "").trim();
  const email = String(data.get("email") ?? "").trim();
  const message = String(data.get("message") ?? "").trim();

  if (!name) errors.name = "Please tell us your name.";
  // Deliberately loose: the only real test of an address is sending to it.
  if (!email) errors.email = "We need an email to reply to.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "That doesn't look like a valid email.";
  if (!message) errors.message = "Don't forget the message itself.";
  else if (message.length < 10) errors.message = "A little more detail, please.";

  return errors;
}

export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real users never fill a field they cannot see.
    if (String(data.get("company") ?? "")) return;

    const found = validate(data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      // Move focus to the first problem so keyboard and screen reader users
      // land on it rather than hunting for what failed.
      const firstKey = Object.keys(found)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    const name = String(data.get("name"));
    const email = String(data.get("email"));
    const subject = String(data.get("subject") ?? SUBJECTS[0]);
    const message = String(data.get("message"));

    /* No endpoint configured yet — fall back to the visitor's mail client so
       the form still does something useful out of the box. */
    if (!club.formEndpoint) {
      const body = `${message}\n\n— ${name} (${email})`;
      window.location.href =
        `mailto:${club.email}` +
        `?subject=${encodeURIComponent(`[Website] ${subject}`)}` +
        `&body=${encodeURIComponent(body)}`;
      setStatus({
        state: "sent",
        message: "Opening your email app with the message ready to send.",
      });
      return;
    }

    setStatus({ state: "sending" });
    try {
      const res = await fetch(club.formEndpoint, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: data,
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);

      form.reset();
      setStatus({
        state: "sent",
        message: "Thanks! We'll get back to you soon.",
      });
    } catch {
      setStatus({
        state: "error",
        message: `Something went wrong. Email us directly at ${club.email}.`,
      });
    }
  }

  const inputClass =
    "w-full rounded-[10px] border border-line bg-surface px-4 py-3 text-[0.95rem] transition-[border-color,box-shadow] duration-300 placeholder:text-fg-dim focus:border-brand focus:outline-none focus:ring-3 focus:ring-brand-soft";

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-4">
      {/* Honeypot — hidden from people, tempting to bots. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute -left-[9999px] size-px opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="name" label="Name" error={errors.name}>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={cn(inputClass, errors.name && "border-brand")}
          />
        </Field>

        <Field id="email" label="Email" error={errors.email}>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@ucalgary.ca"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={cn(inputClass, errors.email && "border-brand")}
          />
        </Field>
      </div>

      <Field id="subject" label="Subject" optional>
        <select id="subject" name="subject" className={inputClass} defaultValue={SUBJECTS[0]}>
          {SUBJECTS.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
      </Field>

      <Field id="message" label="Message" error={errors.message}>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="What's on your mind?"
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          className={cn(inputClass, "min-h-32 resize-y", errors.message && "border-brand")}
        />
      </Field>

      <Button type="submit" disabled={status.state === "sending"}>
        <Send className="size-4.5" aria-hidden />
        {status.state === "sending" ? "Sending…" : "Send message"}
      </Button>

      {/* Announced to screen readers when it appears. */}
      <p role="status" aria-live="polite" className="min-h-[1.25rem]">
        {status.state === "sent" || status.state === "error" ? (
          <span
            className={cn(
              "block rounded-[10px] px-4 py-3 text-[0.9rem] font-semibold",
              status.state === "sent"
                ? "bg-brand-soft text-fg shadow-[inset_0_0_0_1px_var(--brand-line)]"
                : "bg-brand-soft text-brand shadow-[inset_0_0_0_1px_var(--brand)]",
            )}
          >
            {status.message}
          </span>
        ) : null}
      </p>

      {!club.formEndpoint && (
        <p className="text-[0.8rem] text-fg-dim">
          {/* TODO: REPLACE — set `formEndpoint` in src/content/club.ts to collect
              submissions on a server instead of opening the visitor's mail app. */}
          This form opens your email app. Prefer to email us directly?{" "}
          <a
            href={`mailto:${club.email}`}
            className="font-semibold text-brand underline underline-offset-4"
          >
            {club.email}
          </a>
        </p>
      )}
    </form>
  );
}

function Field({
  id,
  label,
  error,
  optional,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <label htmlFor={id} className="text-[0.85rem] font-semibold">
        {label}
        {optional ? (
          <span className="ml-1 font-normal text-fg-dim">(optional)</span>
        ) : (
          <span className="ml-0.5 text-brand" aria-hidden>*</span>
        )}
      </label>
      {children}
      <p id={`${id}-error`} className="min-h-[1.1em] text-[0.8rem] font-semibold text-brand">
        {error}
      </p>
    </div>
  );
}
