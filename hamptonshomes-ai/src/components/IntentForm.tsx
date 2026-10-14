"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { LEAD_DONE_KEY } from "@/lib/lead-keys";
import { INTENTS, TIMINGS, type Intent } from "@/lib/intent";
import { FORM_STYLES } from "@/components/LeadForm";

/** Short intent form: Buy, Sell, Rent or Valuation, then name, email, phone; address for Sell and Valuation. */
export default function IntentForm({
  initialIntent,
  village,
  source,
  compact,
  onDone,
}: {
  initialIntent?: Intent;
  village?: string;
  /** Where the form was opened from, for the lead email (e.g. "Header", "Reader slide-in"). */
  source: string;
  compact?: boolean;
  onDone?: () => void;
}) {
  const uid = useId();
  const st = FORM_STYLES.light;
  const [intent, setIntent] = useState<Intent | undefined>(initialIntent);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const needsAddress = intent === "sell" || intent === "valuation";
  const field = `${st.field} ${compact ? "py-3" : ""}`;

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    if (!intent) {
      setError("Please choose Buy, Sell, Rent or Valuation.");
      setStatus("error");
      return;
    }
    if (!form.reportValidity()) return;
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(form).entries());
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, kind: "intent", intent, village, source, pageUrl: window.location.href }),
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
      <div role="status" className="py-4">
        <p className="font-serif text-[1.6rem] font-light leading-tight text-ink">Thank you. Barry will be in touch shortly.</p>
        <p className="mt-3 text-[13.5px] text-ink-muted">
          For anything urgent, call <a href="tel:+16463390154" className="link-line text-ink">646.339.0154</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className={compact ? "space-y-4" : "space-y-5"}>
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${uid}-website`}>Website</label>
        <input id={`${uid}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <fieldset>
        <legend className={st.label}>I would like to</legend>
        <div role="radiogroup" className="mt-2 grid grid-cols-4 border border-line">
          {INTENTS.map((o, i) => {
            const on = intent === o.value;
            return (
              <button
                key={o.value}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => {
                  setIntent(o.value);
                  if (status === "error") setStatus("idle");
                }}
                className={`eyebrow min-h-11 px-1 py-3 text-[10.5px] transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ocean-deep ${i ? "border-l border-line" : ""} ${on ? "bg-ocean-deep text-paper" : "bg-paper-soft text-ink hover:bg-paper-deep"}`}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </fieldset>
      <div className={compact ? "space-y-3" : "grid gap-4 sm:grid-cols-2"}>
        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor={`${uid}-name`} className={st.label}>Name</label>
          <input id={`${uid}-name`} name="name" type="text" required autoComplete="name" maxLength={120} placeholder="Your full name" className={field} />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={st.label}>Email</label>
          <input id={`${uid}-email`} name="email" type="email" required autoComplete="email" maxLength={200} placeholder="you@example.com" className={field} />
        </div>
        <div>
          <label htmlFor={`${uid}-phone`} className={st.label}>Phone</label>
          <input id={`${uid}-phone`} name="phone" type="tel" autoComplete="tel" maxLength={40} placeholder="Optional" className={field} />
        </div>
        {needsAddress ? (
          <div className={compact ? "" : "sm:col-span-2"}>
            <label htmlFor={`${uid}-property`} className={st.label}>Property address</label>
            <input id={`${uid}-property`} name="property" type="text" required autoComplete="street-address" maxLength={200} placeholder={village ? `Street, ${village}` : "Street and village"} className={field} />
          </div>
        ) : null}
        <div className={compact ? "" : "sm:col-span-2"}>
          <label htmlFor={`${uid}-timing`} className={st.label}>Timing (optional)</label>
          <select id={`${uid}-timing`} name="timing" defaultValue="" className={`${field} h-[50px]`}>
            <option value="">Select</option>
            {TIMINGS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
      </div>
      <button type="submit" disabled={status === "sending"} className={`${st.button} sm:w-full`}>
        {status === "sending" ? "Sending" : intent === "valuation" ? "Request a valuation" : "Send to Barry"}
        <span aria-hidden="true">→</span>
      </button>
      <p aria-live="polite" className={`text-[12px] leading-relaxed ${status === "error" ? st.error : st.note}`}>
        {status === "error" ? error : (
          <>
            Confidential. See the <Link href="/privacy" className={st.link}>Privacy Policy</Link>.
          </>
        )}
      </p>
    </form>
  );
}
