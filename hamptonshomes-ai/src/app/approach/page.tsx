import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { ClosingInvitation, PageHero, SectionLabel, revealDelay } from "@/components/Editorial";
import { PERSON_ID, SITE_URL, WEBSITE_ID, breadcrumbListJsonLd, routeMetadata } from "@/lib/schema";

const DESCRIPTION =
  "How Barry McGovern advises on Hamptons oceanfront, waterfront, and estate property, as a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties.";

export const metadata: Metadata = routeMetadata({
  title: "Approach",
  description: DESCRIPTION,
  path: "/approach",
  image: "/og/about.jpg",
});

const WAYS = [
  { n: "01", title: "The market", text: "A clear read of the market." },
  { n: "02", title: "The property", text: "Careful underwriting of each property." },
  { n: "03", title: "The close", text: "Complete confidentiality." },
];

export default function ApproachPage() {
  return (
    <div className="bg-paper text-ink">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          "@id": `${SITE_URL}/approach#webpage`,
          url: `${SITE_URL}/approach`,
          name: "Approach",
          description: DESCRIPTION,
          isPartOf: { "@id": WEBSITE_ID },
          about: { "@id": PERSON_ID },
          mainEntity: { "@id": PERSON_ID },
        }}
      />
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Approach", path: "/approach" },
        ])}
      />

      <PageHero
        light
        eyebrow="Approach"
        title="Patience"
        italic="and precision"
        intro={
          <p>
            East End property rewards patience and precision. I advise on oceanfront, waterfront, and estate homes
            across the Hamptons, <em className="italic text-ink">with discretion from the first conversation to a quiet closing.</em>
          </p>
        }
      />

      <section className="pb-24 md:pb-40">
        <div className="frame grid gap-y-14 md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-3">
            <SectionLabel n="I">The work</SectionLabel>
            <p data-reveal style={revealDelay(80)} className="eyebrow mt-8 !leading-[2.1] text-ink-faint">
              <span className="block text-ink">Licensed Real Estate Salesperson</span>
              <span className="block">New York License #10401353717</span>
              <span className="block">Hedgerow Exclusive Properties</span>
              <a href="tel:+16463390154" className="mt-4 block text-ink transition-colors hover:text-ocean">
                646.339.0154
              </a>
            </p>
          </div>

          <div className="md:col-span-8 md:col-start-5">
            <div className="max-w-[62ch] space-y-7 text-[16px] leading-[1.9] text-ink-muted md:text-[17px]">
              <p data-reveal>
                I am a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury
                Hamptons brokerage. Dublin-born, I have called the Hamptons home since 2013 and consider myself a Sag Harbor local.
              </p>
              <p data-reveal style={revealDelay(80)}>
                Buyers and sellers come to me for a clear read of the market, careful underwriting of each property,
                and complete confidentiality. The work runs from Southampton to Montauk: oceanfront, waterfront, and estate property.
              </p>
            </div>

            <dl data-reveal style={revealDelay(140)} className="mt-16 grid border-t border-ink/80 sm:grid-cols-3">
              {WAYS.map((way, i) => (
                <div key={way.n} className={`border-b border-line py-8 sm:border-b-0 ${i ? "sm:border-l sm:pl-6" : "sm:pr-6"}`}>
                  <dt className="eyebrow text-ink-faint">{way.n}</dt>
                  <dd className="mt-4 font-serif text-[1.7rem] font-light leading-tight text-ink">{way.title}</dd>
                  <dd className="mt-3 text-[15px] leading-[1.7] text-ink-muted">{way.text}</dd>
                </div>
              ))}
            </dl>

            <p data-reveal style={revealDelay(200)} className="mt-14 flex flex-wrap gap-x-10 gap-y-4">
              <Link href="/about" className="eyebrow link-line text-ink">About Barry</Link>
              <Link href="/market" className="eyebrow link-line text-ink-muted hover:text-ink">Market research</Link>
              <Link href="/contact" className="eyebrow link-line text-ink-muted hover:text-ink">Inquire</Link>
            </p>
          </div>
        </div>
      </section>

      <ClosingInvitation
        n="II"
        label="Inquire"
        title="From the first conversation"
        italic="to a quiet closing."
        body="Oceanfront, waterfront, and estate property, from Southampton to Montauk."
        cta="Begin a conversation"
      />
    </div>
  );
}
