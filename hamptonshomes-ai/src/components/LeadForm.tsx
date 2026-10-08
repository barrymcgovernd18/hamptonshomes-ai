"use client";

import { useId, useState } from "react";
import Link from "next/link";

export type LeadKind = "listing" | "valuation" | "signup" | "popup" | "search";

import { LEAD_DONE_KEY, OCEANFRONT_STUDY } from "@/lib/lead-keys";

/** Underlined field, kept for the one-row mobile banner. */
const inlineFieldClass =
  "w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 text-[16px] text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] duration-300 focus:border-ocean-deep focus:shadow-[0_1px_0_0_var(--color-ocean-deep)] focus:outline-none";

export type FormTone = "light" | "dark";

/** Boxed fields. Dark: cream type on navy with a gold focus ring. Light: paper boxes with a navy focus ring. */
export const FORM_STYLES: Record<FormTone, { field: string; label: string; button: string; note: string; link: string; error: string }> = {
  dark: {
    field:
      "mt-2 block w-full rounded-none border border-paper/35 bg-paper/[0.06] px-4 py-3.5 text-[16px] text-paper placeholder:text-paper/60 transition-[border-color,box-shadow,background-color] duration-300 hover:border-paper/60 focus:border-gold focus:bg-paper/[0.1] focus:shadow-[0_0_0_1px_var(--color-gold)] focus:outline-none",
    label: "eyebrow block text-paper/85",
    button:
      "eyebrow inline-flex w-full items-center justify-center gap-3 bg-paper px-10 py-5 text-[12px] text-ocean-deep transition-colors duration-300 hover:bg-gold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:opacity-60 sm:w-auto",
    note: "text-paper/75",
    link: "underline decoration-paper/40 underline-offset-[3px] hover:text-gold",
    error: "text-[#f3b8a8]",
  },
  light: {
    field:
      "mt-2 block w-full rounded-none border border-line bg-paper-soft px-4 py-3.5 text-[16px] text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] duration-300 hover:border-ink-faint/60 focus:border-ocean-deep focus:shadow-[0_0_0_1px_var(--color-ocean-deep)] focus:outline-none",
    label: "eyebrow block text-ink-muted",
    button:
      "eyebrow inline-flex w-full items-center justify-center gap-3 bg-ocean-deep px-10 py-5 text-[12px] text-paper transition-colors duration-300 hover:bg-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ocean-deep disabled:opacity-60 sm:w-auto",
    note: "text-ink-faint",
    link: "underline decoration-ink-faint/40 underline-offset-[3px] hover:text-ocean",
    error: "text-[#8a2a1a]",
  },
};

type Field = { name: string; label: string; type: string; required?: boolean; autoComplete?: string; textarea?: boolean; placeholder?: string };

const FIELDS: Record<LeadKind, Field[]> = {
  listing: [
    { name: "name", label: "Name", type: "text", required: true, autoComplete: "name", placeholder: "Your full name" },
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", placeholder: "you@example.com" },
    { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", placeholder: "Optional" },
    { name: "message", label: "Message", type: "text", textarea: true, placeholder: "Timing, questions or a preferred time to view" },
  ],
  valuation: [
    { name: "name", label: "Name", type: "text", required: true, autoComplete: "name", placeholder: "Your full name" },
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", placeholder: "you@example.com" },
    { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", placeholder: "Optional" },
    { name: "property", label: "Property address", type: "text", required: true, autoComplete: "street-address", placeholder: "Street and village" },
    { name: "message", label: "Anything to add (optional)", type: "text", textarea: true },
  ],
  search: [
    { name: "name", label: "Name", type: "text", required: true, autoComplete: "name", placeholder: "Your full name" },
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", placeholder: "you@example.com" },
    { name: "phone", label: "Phone", type: "tel", autoComplete: "tel", placeholder: "Optional" },
    { name: "message", label: "What you're looking for", type: "text", textarea: true, placeholder: "Village, budget, bedrooms, waterfront, timing" },
  ],
  signup: [
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", placeholder: "you@example.com" },
    { name: "name", label: "Name (optional)", type: "text", autoComplete: "name", placeholder: "Your name" },
  ],
  popup: [
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email", placeholder: "you@example.com" },
    { name: "name", label: "Name (optional)", type: "text", autoComplete: "name", placeholder: "Your name" },
  ],
};

const CTA: Record<LeadKind, string> = {
  listing: "Send inquiry",
  search: "Send to Barry",
  valuation: "Request a valuation",
  signup: "Send me the study",
  popup: "Sign up",
};

export default function LeadForm({
  kind,
  listing,
  defaultMessage,
  compact,
  inline,
  tone = "light",
  onDone,
}: {
  kind: LeadKind;
  /** Listing slug, for listing inquiries. */
  listing?: string;
  defaultMessage?: string;
  compact?: boolean;
  /** One-row email field and button, for the mobile banner. */
  inline?: boolean;
  /** Dark for navy inquiry panels; light for valuation and signup on paper. */
  tone?: FormTone;
  onDone?: () => void;
}) {
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const isSignup = kind === "signup" || kind === "popup";
  const st = FORM_STYLES[tone];
  const dark = tone === "dark";

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!form.reportValidity()) return;
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, kind, listing, pageUrl: window.location.href }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(res.status === 400 && body.error ? body.error : "");
      }
      try {
        localStorage.setItem(LEAD_DONE_KEY, String(Date.now()));
      } catch {}
      setStatus("sent");
      onDone?.();
    } catch (err) {
      setError((err as Error).message || "Something went wrong. Please call 646.339.0154 or email barry@hedgerowexclusive.com.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className={inline ? "" : compact ? "py-2" : "py-6"}>
        <p className={`font-serif font-light leading-tight ${dark ? "text-paper" : "text-ink"} ${inline ? "text-[1.3rem]" : "text-[1.7rem]"}`}>
          {isSignup ? "Thank you, you're on the list." : "Thank you. Barry will be in touch shortly."}
        </p>
        {isSignup ? (
          <Link href={OCEANFRONT_STUDY} className={`link-line eyebrow inline-block text-ocean ${inline ? "mt-3" : "mt-5"}`}>
            Read the oceanfront study <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <p className={`mt-3 text-[13.5px] ${dark ? "text-paper/80" : "text-ink-muted"}`}>
            For anything urgent, call <a href="tel:+16463390154" className={`link-line ${dark ? "text-paper" : "text-ink"}`}>646.339.0154</a>.
          </p>
        )}
      </div>
    );
  }

  if (inline) {
    return (
      <form onSubmit={submit} noValidate>
        <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <div className="flex items-end gap-3">
          <div className="min-w-0 flex-1">
            <label htmlFor={`${uid}-email`} className="sr-only">Email</label>
            <input id={`${uid}-email`} name="email" type="email" required autoComplete="email" placeholder="Email address" maxLength={200} className={inlineFieldClass} />
          </div>
          <button type="submit" disabled={status === "sending"} className="eyebrow shrink-0 bg-ocean-deep px-5 py-3.5 text-paper disabled:opacity-60">
            {status === "sending" ? "Sending" : "Sign up"}
          </button>
        </div>
        {status === "error" ? <p aria-live="polite" className="mt-2 text-[12px] text-[#8a2a1a]">{error}</p> : null}
      </form>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={compact ? "space-y-4" : "space-y-6"}>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div className={isSignup && !compact ? "grid gap-6 sm:grid-cols-2" : compact ? "space-y-4" : "space-y-6"}>
        {FIELDS[kind].map((f) => (
          <div key={f.name}>
            <label htmlFor={`${uid}-${f.name}`} className={st.label}>
              {f.label}
            </label>
            {f.textarea ? (
              <textarea
                id={`${uid}-${f.name}`}
                name={f.name}
                rows={3}
                maxLength={4000}
                placeholder={f.placeholder}
                defaultValue={f.name === "message" ? defaultMessage : undefined}
                className={`${st.field} min-h-[104px] max-h-[200px] resize-y`}
              />
            ) : (
              <input
                id={`${uid}-${f.name}`}
                name={f.name}
                type={f.type}
                required={f.required}
                autoComplete={f.autoComplete}
                placeholder={f.placeholder}
                maxLength={200}
                className={st.field}
              />
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className={st.button}
      >
        {status === "sending" ? "Sending" : CTA[kind]}
        <span aria-hidden="true">→</span>
      </button>
      <p aria-live="polite" className={`text-[12.5px] leading-relaxed ${status === "error" ? st.error : st.note}`}>
        {status === "error" ? (
          error
        ) : (
          <>
            {isSignup ? "Occasional research and new listings from Barry. Unsubscribe anytime. " : ""}See the{" "}
            <Link href="/privacy" className={st.link}>
              Privacy Policy
            </Link>
            .
          </>
        )}
      </p>
    </form>
  );
}
