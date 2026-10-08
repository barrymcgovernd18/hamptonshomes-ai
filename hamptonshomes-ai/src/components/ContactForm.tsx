"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { LEAD_DONE_KEY } from "@/lib/lead-keys";
import { FORM_STYLES } from "@/components/LeadForm";

const st = FORM_STYLES.dark;
const fieldClass = st.field;

/** The /contact form, set on a navy panel to match the listing inquiry. */
export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // "Ask about this sale" links arrive as /contact?about=<address>; start the message with it.
  useEffect(() => {
    const about = new URLSearchParams(window.location.search).get("about")?.trim().slice(0, 120);
    if (about && messageRef.current && !messageRef.current.value) {
      messageRef.current.value = `I would like to know more about ${about}.`;
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      interest: (form.elements.namedItem("interest") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
      website: (form.elements.namedItem("website") as HTMLInputElement | null)?.value ?? "",
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        try {
          localStorage.setItem(LEAD_DONE_KEY, String(Date.now()));
        } catch {}
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <p className="display-3 mb-3 font-light text-paper">Message sent</p>
        <p className="text-[14px] text-paper/80">Barry will be in touch shortly.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-[11px] uppercase tracking-[0.2em] text-paper/80 transition-colors hover:text-gold"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7">
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      {[
        { id: "name", label: "Name", type: "text", required: true, autoComplete: "name", placeholder: "Your full name" },
        { id: "email", label: "Email", type: "email", required: true, autoComplete: "email", placeholder: "you@example.com" },
        { id: "phone", label: "Phone", type: "tel", required: false, autoComplete: "tel", placeholder: "Optional" },
      ].map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className={st.label}>
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            className={fieldClass}
            required={field.required}
            autoComplete={field.autoComplete}
            placeholder={field.placeholder}
          />
        </div>
      ))}

      <div>
        <label htmlFor="interest" className={st.label}>
          Interest
        </label>
        <select id="interest" name="interest" className={`${fieldClass} h-[52px] [&>option]:text-ink`}>
          <option value="buying">Buying</option>
          <option value="selling">Selling</option>
          <option value="renting">Renting</option>
          <option value="valuation">Property Valuation</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className={st.label}>
          Message
        </label>
        <textarea
          ref={messageRef}
          id="message"
          name="message"
          rows={4}
          placeholder="What you are looking for, or the property you have in mind"
          className={`${fieldClass} min-h-[120px] max-h-[220px] resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className={`${st.button} mt-2 sm:w-full`}
      >
        {status === "sending" ? "Sending" : status === "error" ? "Try again" : "Send message"}
        <span aria-hidden="true">→</span>
      </button>

      {status === "error" && (
        <p className={`text-center text-[13px] ${st.error}`}>Something went wrong. Please call 646.339.0154 instead.</p>
      )}
      <p className={`text-center text-[12px] leading-relaxed ${st.note}`}>
        By sending, you agree to the{" "}
        <Link href="/privacy" className={st.link}>
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className={st.link}>
          Terms of Use
        </Link>
        .
      </p>
    </form>
  );
}
