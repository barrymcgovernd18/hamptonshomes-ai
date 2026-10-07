"use client";

import { useState } from "react";
import Link from "next/link";

const fieldClass =
  "w-full rounded-none border-0 border-b border-line bg-transparent px-0 py-3 text-[16px] text-ink placeholder:text-ink-faint transition-[border-color,box-shadow] duration-300 focus:border-ocean-deep focus:shadow-[0_1px_0_0_var(--color-ocean-deep)] focus:outline-none";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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
        <p className="display-3 mb-3 font-light text-ink">Message Sent</p>
        <p className="text-[14px] text-ink-muted">Barry will be in touch shortly.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-[11px] uppercase tracking-[0.2em] text-ink-faint transition-colors hover:text-ocean"
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
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "tel", required: false },
      ].map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="eyebrow block text-ink-faint">
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            className={fieldClass}
            required={field.required}
          />
        </div>
      ))}

      <div>
        <label htmlFor="interest" className="eyebrow block text-ink-faint">
          Interest
        </label>
        <select id="interest" name="interest" className={`${fieldClass} h-12`}>
          <option value="buying">Buying</option>
          <option value="selling">Selling</option>
          <option value="renting">Renting</option>
          <option value="valuation">Property Valuation</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="eyebrow block text-ink-faint">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${fieldClass} min-h-[96px] max-h-[160px] resize-y`}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="eyebrow mt-4 w-full bg-ocean-deep py-4 text-paper transition-colors duration-500 hover:bg-ink disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : status === "error" ? "Try Again" : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-center text-[12px] text-red-700/70">Something went wrong. Try calling instead.</p>
      )}
      <p className="text-center text-[11px] leading-relaxed text-ink-faint">
        By sending, you agree to the{" "}
        <Link href="/privacy" className="text-ocean underline decoration-ocean/40 underline-offset-[3px] hover:text-ocean-deep">
          Privacy Policy
        </Link>{" "}
        and{" "}
        <Link href="/terms" className="text-ocean underline decoration-ocean/40 underline-offset-[3px] hover:text-ocean-deep">
          Terms of Use
        </Link>
        .
      </p>
    </form>
  );
}
