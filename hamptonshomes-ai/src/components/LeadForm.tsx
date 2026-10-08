"use client";

import { useId, useState } from "react";
import Link from "next/link";

export type LeadKind = "listing" | "valuation" | "signup" | "popup";

import { LEAD_DONE_KEY, OCEANFRONT_STUDY } from "@/lib/lead-keys";

const fieldClass =
  "w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 text-[16px] text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] duration-300 focus:border-ocean-deep focus:shadow-[0_1px_0_0_var(--color-ocean-deep)] focus:outline-none";

type Field = { name: string; label: string; type: string; required?: boolean; autoComplete?: string; textarea?: boolean };

const FIELDS: Record<LeadKind, Field[]> = {
  listing: [
    { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
    { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
    { name: "message", label: "Message", type: "text", textarea: true },
  ],
  valuation: [
    { name: "name", label: "Name", type: "text", required: true, autoComplete: "name" },
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
    { name: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
    { name: "property", label: "Property address", type: "text", required: true, autoComplete: "street-address" },
    { name: "message", label: "Anything to add (optional)", type: "text", textarea: true },
  ],
  signup: [
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
    { name: "name", label: "Name (optional)", type: "text", autoComplete: "name" },
  ],
  popup: [
    { name: "email", label: "Email", type: "email", required: true, autoComplete: "email" },
    { name: "name", label: "Name (optional)", type: "text", autoComplete: "name" },
  ],
};

const CTA: Record<LeadKind, string> = {
  listing: "Send inquiry",
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
  onDone,
}: {
  kind: LeadKind;
  /** Listing slug, for listing inquiries. */
  listing?: string;
  defaultMessage?: string;
  compact?: boolean;
  /** One-row email field and button, for the mobile banner. */
  inline?: boolean;
  onDone?: () => void;
}) {
  const uid = useId();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const isSignup = kind === "signup" || kind === "popup";

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
        <p className={`font-serif font-light leading-tight text-ink ${inline ? "text-[1.3rem]" : "text-[1.7rem]"}`}>
          {isSignup ? "Thank you, you're on the list." : "Thank you. Barry will be in touch shortly."}
        </p>
        {isSignup ? (
          <Link href={OCEANFRONT_STUDY} className={`link-line eyebrow inline-block text-ocean ${inline ? "mt-3" : "mt-5"}`}>
            Read the oceanfront study <span aria-hidden="true">→</span>
          </Link>
        ) : (
          <p className="mt-3 text-[13.5px] text-ink-muted">
            For anything urgent, call <a href="tel:+16463390154" className="link-line text-ink">646.339.0154</a>.
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
            <input id={`${uid}-email`} name="email" type="email" required autoComplete="email" placeholder="Email address" maxLength={200} className={fieldClass} />
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
            <label htmlFor={`${uid}-${f.name}`} className="eyebrow block text-ink-faint">
              {f.label}
            </label>
            {f.textarea ? (
              <textarea
                id={`${uid}-${f.name}`}
                name={f.name}
                rows={3}
                maxLength={4000}
                defaultValue={f.name === "message" ? defaultMessage : undefined}
                className={`${fieldClass} min-h-[84px] max-h-[180px] resize-y`}
              />
            ) : (
              <input
                id={`${uid}-${f.name}`}
                name={f.name}
                type={f.type}
                required={f.required}
                autoComplete={f.autoComplete}
                maxLength={f.type === "email" ? 200 : 200}
                className={fieldClass}
              />
            )}
          </div>
        ))}
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="eyebrow w-full bg-ocean-deep px-8 py-4 text-paper transition-colors duration-500 hover:bg-ink disabled:opacity-60 sm:w-auto"
      >
        {status === "sending" ? "Sending" : CTA[kind]}
      </button>
      <p aria-live="polite" className={`text-[12.5px] leading-relaxed ${status === "error" ? "text-[#8a2a1a]" : "text-ink-faint"}`}>
        {status === "error" ? (
          error
        ) : (
          <>
            {isSignup ? "Occasional research and new listings from Barry. Unsubscribe anytime. " : ""}See the{" "}
            <Link href="/privacy" className="underline decoration-ink-faint/40 underline-offset-[3px] hover:text-ocean">
              Privacy Policy
            </Link>
            .
          </>
        )}
      </p>
    </form>
  );
}
