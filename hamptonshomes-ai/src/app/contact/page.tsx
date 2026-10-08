import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { PageHero, SectionLabel, revealDelay } from "@/components/Editorial";
import { routeMetadata } from "@/lib/schema";

export const metadata: Metadata = routeMetadata({
  title: "Contact",
  description:
    "Contact Barry McGovern for Hamptons oceanfront, waterfront, and private-market real estate. Licensed Real Estate Salesperson at Hedgerow Exclusive Properties.",
  path: "/contact",
  image: "/og/contact.jpg",
});

const SOCIAL = [
  { href: "https://www.instagram.com/barrymcgovern_/", label: "Instagram" },
  { href: "https://www.linkedin.com/in/barry-mcgovern-9346133b/", label: "LinkedIn" },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <PageHero
        light
        eyebrow="Contact"
        title={
          <>
            Let&apos;s
          </>
        }
        italic="Talk"
        aside={
          <p className="body-copy text-ink-muted">
            Every conversation is confidential. Whether buying, selling, renting, or seeking a valuation, reach out directly.
          </p>
        }
      />

      <section className="border-t border-line pb-28 pt-16 md:pb-40 md:pt-24">
        <div className="frame grid gap-20 md:grid-cols-12 md:gap-10">
          <div className="md:col-span-5">
            <SectionLabel n="I">Direct</SectionLabel>
            <dl className="mt-10 divide-y divide-line border-y border-line">
              <div data-reveal className="py-7">
                <dt className="eyebrow text-ink-faint">Phone</dt>
                <dd className="mt-3">
                  <a href="tel:+16463390154" className="font-serif text-[2.4rem] font-light leading-none text-ink transition-colors duration-500 hover:text-ocean">
                    646.339.0154
                  </a>
                </dd>
              </div>
              <div data-reveal style={revealDelay(60)} className="py-7">
                <dt className="eyebrow text-ink-faint">Email</dt>
                <dd className="mt-3">
                  <a href="mailto:barry@hedgerowexclusive.com" className="link-line font-serif text-[1.45rem] text-ink">
                    barry@hedgerowexclusive.com
                  </a>
                </dd>
              </div>
              <div data-reveal style={revealDelay(120)} className="py-7">
                <dt className="eyebrow text-ink-faint">Office</dt>
                <dd className="mt-3 text-[15px] leading-[1.8] text-ink-muted">
                  Hedgerow Exclusive Properties <br />
                  2495 Montauk Highway <br />
                  Bridgehampton, NY 11932
                </dd>
              </div>
              <div data-reveal style={revealDelay(180)} className="py-7">
                <dt className="eyebrow text-ink-faint">Social</dt>
                <dd className="mt-4 flex gap-8">
                  {SOCIAL.map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noopener" className="link-line eyebrow text-ink-muted">
                      {link.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
            <p className="mt-8 text-[13px] text-ink-faint">Licensed Real Estate Salesperson · NY License #10401353717</p>
            <p className="mt-2 text-[13px] text-ink-faint">
              <Link href="/privacy" className="hover:text-ocean">Privacy</Link> · <Link href="/terms" className="hover:text-ocean">Terms</Link>
            </p>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <SectionLabel n="II">Send a message</SectionLabel>
            <div data-reveal style={revealDelay(80)} className="mt-10 border-t border-ink/80 pt-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
