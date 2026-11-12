import type { Metadata, Viewport } from "next";
import Image from "next/image";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { SectionLabel, revealDelay } from "@/components/Editorial";
import JsonLd from "@/components/JsonLd";
import { contactPageJsonLd, routeMetadata } from "@/lib/schema";

export const metadata: Metadata = routeMetadata({
  title: "Contact",
  description:
    "Barry McGovern helps clients buy, rent, or sell from Southampton to Montauk. Part of a Hedgerow team with over $2 billion in sales. Call 646.339.0154.",
  path: "/contact",
  image: "/og/contact.jpg",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const PHONE_HREF = "tel:+16463390154";
const PHONE_LABEL = "646.339.0154";
const EMAIL_HREF = "mailto:barry@hedgerowexclusive.com";
const EMAIL_LABEL = "barry@hedgerowexclusive.com";

const SOCIAL = [
  { href: "https://www.instagram.com/barrymcgovern_/", label: "Instagram" },
  { href: "https://www.linkedin.com/in/barry-mcgovern-9346133b/", label: "LinkedIn" },
];

const actionClass =
  "group flex min-h-14 items-center justify-between gap-4 px-5 py-3.5 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold sm:px-6";

export default function ContactPage() {
  return (
    <div className="bg-paper text-ink">
      <JsonLd data={contactPageJsonLd()} />

      <section data-hero className="contact-hero relative bg-ocean-deep text-paper lg:h-[100svh] lg:max-h-[980px] lg:min-h-[720px]">
        <div className="frame relative pb-[calc(5.5rem+env(safe-area-inset-bottom,0px))] pt-5 lg:flex lg:h-full lg:items-center lg:pb-16 lg:pt-0">
          <div className="contact-portrait relative shrink-0 overflow-hidden">
            <Image
              src="/images/barry-mcgovern.jpg"
              alt="Portrait of Barry McGovern, a Hamptons luxury specialist at Hedgerow Exclusive Properties"
              fill
              priority
              fetchPriority="high"
              sizes="(max-width: 1024px) 240px, 440px"
              className="photo-mono object-cover object-[center_12%]"
            />
          </div>

          <div className="pt-6 lg:max-w-[48%] lg:pt-28">
            <p className="eyebrow text-paper/80" style={{ letterSpacing: "0.18em" }}>
              Buy · Rent · Sell in the Hamptons
            </p>
            <h1 className="mt-2 font-serif text-[2.65rem] font-light leading-[0.92] tracking-[-0.015em] text-paper lg:text-[4.75rem]">
              Barry
              <span className="block">McGovern</span>
            </h1>
            <p className="mt-3 max-w-[28rem] font-serif text-[1.15rem] font-light leading-snug text-paper/95 lg:mt-4 lg:text-[1.55rem]">
              A Hamptons luxury specialist, <em className="italic">from Southampton to Montauk.</em>
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-gold lg:mt-4">Barry replies personally, usually within a few hours.</p>

            <div className="mt-4 grid max-w-md gap-2.5 lg:mt-6 lg:gap-3">
              <a href={PHONE_HREF} className={`${actionClass} bg-paper text-ocean-deep hover:bg-gold`}>
                <span>
                  <span className="eyebrow block text-ocean/75">Call</span>
                  <span className="mt-1 block font-serif text-[1.85rem] font-light leading-none tracking-[-0.01em]">{PHONE_LABEL}</span>
                </span>
                <span aria-hidden="true" className="font-serif text-[1.6rem] leading-none">→</span>
              </a>
              <a href={EMAIL_HREF} className={`${actionClass} border border-paper/45 text-paper hover:border-paper hover:bg-paper hover:text-ocean-deep`}>
                <span className="min-w-0">
                  <span className="eyebrow block text-paper/75 group-hover:text-ocean/75">Email</span>
                  <span className="mt-1 block font-serif text-[1.2rem] font-light leading-tight tracking-[-0.01em] sm:text-[1.35rem]">{EMAIL_LABEL}</span>
                </span>
                <span aria-hidden="true" className="font-serif text-[1.6rem] leading-none">→</span>
              </a>
            </div>
            <p className="mt-5 hidden max-w-[34rem] text-[15px] leading-relaxed text-paper/80 lg:block">
              Hedgerow Exclusive Properties, Bridgehampton. Every conversation is confidential.
            </p>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-16 md:py-28" aria-labelledby="about-barry">
        <div className="frame grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel n="I" as="h2" id="about-barry">About Barry</SectionLabel>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <p data-reveal className="max-w-[18em] font-serif text-[clamp(1.85rem,3vw,2.6rem)] font-light leading-[1.2] text-ink">
              Quiet advice for buying, renting, or selling.
            </p>
            <div className="mt-8 max-w-[62ch] space-y-6 text-[16px] leading-[1.85] text-ink-muted md:text-[17px]">
              <p data-reveal style={revealDelay(60)}>
                Barry McGovern is a Hamptons luxury specialist at Hedgerow Exclusive Properties. He works with people buying, renting, or selling from Southampton to Montauk, and he is part of a team with over $2 billion in sales.
              </p>
              <p data-reveal style={revealDelay(100)}>
                The office is at 2495 Montauk Highway, Bridgehampton, NY 11932. Conversations stay confidential.
              </p>
            </div>

            <dl data-reveal style={revealDelay(140)} className="mt-12 grid grid-cols-2 border-t border-ink/80">
              <div className="flex flex-col-reverse justify-end gap-2 border-b border-line py-6 pr-5">
                <dt className="eyebrow text-ink-faint">Team sales</dt>
                <dd className="font-serif text-[2rem] font-light leading-none text-ink md:text-[2.4rem]">Over $2B</dd>
              </div>
              <div className="flex flex-col-reverse justify-end gap-2 border-b border-l border-line py-6 pl-5">
                <dt className="eyebrow text-ink-faint">Office</dt>
                <dd className="font-serif text-[1.35rem] font-light leading-[1.25] text-ink md:text-[1.55rem]">
                  2495 Montauk Highway
                  <span className="mt-1 block text-[0.82em] text-ink-muted">Bridgehampton</span>
                </dd>
              </div>
            </dl>

            <p data-reveal style={revealDelay(180)} className="mt-8 text-[13px] leading-relaxed text-ink-faint">
              Licensed Real Estate Salesperson · NY License #10401353717
            </p>
            <div data-reveal style={revealDelay(200)} className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
              {SOCIAL.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener" className="link-line eyebrow text-ink-muted">
                  {link.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              ))}
            </div>
            <p className="mt-5 text-[13px] text-ink-faint">
              <Link href="/privacy" className="hover:text-ocean">Privacy</Link>
              <span aria-hidden="true"> · </span>
              <Link href="/terms" className="hover:text-ocean">Terms</Link>
            </p>
          </div>
        </div>
      </section>

      <section id="write" className="border-t border-line pb-24 pt-16 md:pb-36 md:pt-24" aria-labelledby="send-a-message">
        <div className="frame grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionLabel n="II" as="h2" id="send-a-message">Send a message</SectionLabel>
            <p data-reveal style={revealDelay(60)} className="mt-6 max-w-[28ch] text-[15px] leading-[1.85] text-ink-muted">
              A short note is enough. Share the village, the house, or whether you are buying, renting, or selling.
            </p>
          </div>
          <div className="bg-ocean-deep px-6 py-10 text-paper sm:px-10 lg:col-span-7 lg:col-start-6 lg:px-12 lg:py-12">
            <p className="mb-8 flex items-center gap-3 text-[14px] text-gold">
              <span aria-hidden="true" className="inline-block h-px w-8 bg-gold" />
              Barry replies personally, usually within a few hours.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>

      <nav data-contact-dock aria-label="Call or email Barry" className="contact-dock fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 backdrop-blur-md lg:hidden">
        <div className="grid grid-cols-2 gap-2 px-3 py-2.5">
          <a href={PHONE_HREF} className="flex min-h-12 flex-col items-center justify-center bg-ocean-deep px-2 py-2 text-center text-paper transition-colors duration-300 hover:bg-ink">
            <span className="eyebrow text-paper/75">Call</span>
            <span className="mt-1 font-serif text-[1.12rem] font-light leading-none">{PHONE_LABEL}</span>
          </a>
          <a href={EMAIL_HREF} aria-label={`Email Barry at ${EMAIL_LABEL}`} className="flex min-h-12 items-center justify-center border border-ocean-deep px-3 py-2 text-center font-serif text-[1.2rem] font-light leading-none text-ocean-deep transition-colors duration-300 hover:bg-ocean-deep hover:text-paper">
            Email Barry
          </a>
        </div>
      </nav>
    </div>
  );
}
