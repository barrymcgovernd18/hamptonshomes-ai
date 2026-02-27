"use client";

import { useState } from "react";

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
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-gold font-serif text-2xl mb-3">Message Sent</p>
        <p className="text-white/30 text-[14px]">Barry will be in touch shortly.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-8 text-white/20 text-[11px] tracking-[0.2em] uppercase hover:text-gold transition-colors duration-500"
        >
          Send Another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {[
        { id: "name", label: "Name", type: "text", required: true },
        { id: "email", label: "Email", type: "email", required: true },
        { id: "phone", label: "Phone", type: "tel", required: false },
      ].map((field) => (
        <div key={field.id}>
          <label htmlFor={field.id} className="text-[10px] tracking-[0.3em] uppercase text-white/15 block mb-3">
            {field.label}
          </label>
          <input
            type={field.type}
            id={field.id}
            name={field.id}
            className="w-full border-b border-white/10 bg-transparent px-0 py-3 text-white text-[15px] focus:outline-none focus:border-gold/50 transition-colors duration-500 placeholder:text-white/10"
            required={field.required}
          />
        </div>
      ))}

      <div>
        <label htmlFor="interest" className="text-[10px] tracking-[0.3em] uppercase text-white/15 block mb-3">
          Interest
        </label>
        <select
          id="interest"
          name="interest"
          className="w-full border-b border-white/10 bg-transparent px-0 py-3 text-white/50 text-[15px] focus:outline-none focus:border-gold/50 transition-colors duration-500 appearance-none"
        >
          <option value="buying" className="bg-black">Buying</option>
          <option value="selling" className="bg-black">Selling</option>
          <option value="renting" className="bg-black">Renting</option>
          <option value="valuation" className="bg-black">Property Valuation</option>
          <option value="other" className="bg-black">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="text-[10px] tracking-[0.3em] uppercase text-white/15 block mb-3">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={3}
          className="w-full border-b border-white/10 bg-transparent px-0 py-3 text-white text-[15px] focus:outline-none focus:border-gold/50 transition-colors duration-500 resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full bg-gold text-black py-4 text-[11px] tracking-[0.3em] uppercase hover:bg-gold-light transition-all duration-500 font-medium mt-4 disabled:opacity-50"
      >
        {status === "sending" ? "Sending..." : status === "error" ? "Try Again" : "Send Message"}
      </button>

      {status === "error" && (
        <p className="text-red-400/60 text-[12px] text-center">Something went wrong. Try calling instead.</p>
      )}
    </form>
  );
}
