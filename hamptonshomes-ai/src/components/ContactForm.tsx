"use client";

import { useState } from "react";

const fieldClass =
  "w-full border border-line bg-paper px-4 py-3 text-[15px] text-ink placeholder:text-ink-faint focus:border-ocean focus:outline-none";

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
        <p className="mb-3 font-serif text-2xl text-ocean">Message Sent</p>
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
    <form onSubmit={handleSubmit} className="space-y-5">
      {[
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "tel", required: false },
      ].map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ink-faint">
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
        <label htmlFor="interest" className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ink-faint">
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
        <label htmlFor="message" className="mb-2 block text-[10px] uppercase tracking-[0.3em] text-ink-faint">
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
        className="mt-2 w-full bg-ocean py-3.5 text-[11px] font-medium uppercase tracking-[0.3em] text-paper transition-all hover:bg-ocean-deep disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : status === "error" ? "Try Again" : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-center text-[12px] text-red-700/70">Something went wrong. Try calling instead.</p>
      )}
    </form>
  );
}
