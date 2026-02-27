import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Barry McGovern",
  description:
    "Contact Barry McGovern for luxury Hamptons real estate. oceanfront estates, waterfront properties, and off-market opportunities. Call 646-339-0154.",
  alternates: { canonical: "https://hamptonshomes.ai/contact" },
};

export default function ContactPage() {
  return (
    <div className="bg-black min-h-screen">
      <section className="pt-32 pb-28">
        <div className="max-w-5xl mx-auto px-8">
          <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-4">Contact</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight mb-20">
            Let&apos;s
            <br />
            <span className="italic font-normal text-white/60">Talk</span>
          </h1>

          <div className="grid md:grid-cols-2 gap-24">
            {/* Left. info */}
            <div>
              <p className="text-white/30 text-[15px] leading-[1.9] mb-16">
                Every conversation is confidential. Whether buying, selling, renting, 
                or seeking a valuation. reach out directly.
              </p>

              <div className="space-y-12">
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-white/15 mb-3">Phone</p>
                  <a href="tel:+16463390154" className="font-serif text-3xl text-white hover:text-gold transition-colors duration-500">
                    646-339-0154
                  </a>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-white/15 mb-3">Email</p>
                  <a href="mailto:barry@hedgerowexclusive.com" className="text-white/50 hover:text-gold transition-colors duration-500 text-[15px]">
                    barry@hedgerowexclusive.com
                  </a>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-white/15 mb-3">Office</p>
                  <p className="text-white/30 text-[14px] leading-[1.8]">
                    Hedgerow Exclusive Properties
                    <br />
                    2495 Montauk Highway
                    <br />
                    Bridgehampton, NY 11932
                  </p>
                </div>

                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-white/15 mb-4">Social</p>
                  <div className="flex gap-6">
                    {[
                      { href: "https://x.com/hedgequity", label: "X" },
                      { href: "https://www.instagram.com/barrymcgovern_/", label: "Instagram" },
                      { href: "https://www.linkedin.com/in/barry-mcgovern-9346133b/", label: "LinkedIn" },
                    ].map((s) => (
                      <a
                        key={s.label}
                        href={s.href}
                        target="_blank"
                        rel="noopener"
                        className="text-white/30 hover:text-gold transition-colors duration-500 text-[11px] tracking-[0.2em] uppercase"
                      >
                        {s.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right. form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
