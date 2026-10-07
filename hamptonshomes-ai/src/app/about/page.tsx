import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import AlsoOnStrip from "@/components/AlsoOnStrip";
import { ClosingInvitation, SectionLabel, revealDelay } from "@/components/Editorial";
import { BARRY_BLURB, BARRY_FAQS, faqPageJsonLd, routeMetadata } from "@/lib/schema";
import { FIRM_ACCOLADES } from "@/lib/seo-copy";

export const metadata: Metadata = routeMetadata({
  title: "About Barry McGovern | Hamptons Real Estate Salesperson",
  absoluteTitle: true,
  description:
    "Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique Hamptons brokerage, focused on oceanfront and waterfront.",
  path: "/about",
});

const specialties = [
  "Oceanfront estates & homes",
  "Waterfront properties",
  "Off-market transactions",
  "Luxury sales & acquisitions",
  "Beachfront & bayfront",
  "Land & development",
  "Estate compounds",
  "Complimentary valuations",
];

export default function AboutPage() {
  return (
    <div className="bg-paper text-ink">
      <JsonLd data={faqPageJsonLd()} />

      {/* Hero: portrait panel on the right, name set large on deep ocean. */}
      <section className="relative isolate overflow-hidden bg-ocean-deep text-paper md:h-[88svh] md:min-h-[640px] md:max-h-[960px]">
        <div className="relative h-[72svh] min-h-[460px] w-full md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[46%]">
          <Image
            src="/images/barry-mcgovern.jpg"
            alt="Barry McGovern"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 46vw"
            className="hero-img photo-mono object-cover object-[center_18%] md:object-[center_22%]"
          />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/45 to-transparent" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/20 to-transparent md:hidden" />
          <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-ocean-deep to-transparent md:block" />
        </div>
        <div className="frame relative -mt-40 pb-12 md:mt-0 md:flex md:h-full md:items-end md:pb-16">
          <div className="md:max-w-[52%]">
            <p className="eyebrow hero-rise text-paper/85" style={{ animationDelay: "200ms" }}>About</p>
            <h1 className="display-1 hero-rise mt-6 text-paper" style={{ animationDelay: "320ms" }}>
              Barry <br />
              McGovern
            </h1>
            <p className="eyebrow hero-rise mt-8 text-paper/75" style={{ animationDelay: "520ms" }}>
              Licensed Real Estate Salesperson
              <span className="block">Hedgerow Exclusive Properties</span>
            </p>
          </div>
        </div>
      </section>

      {/* I. Profile */}
      <section className="py-24 md:py-40">
        <div className="frame grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <SectionLabel n="I">Profile</SectionLabel>
          </div>
          <div className="md:col-span-9 lg:col-span-8">
            <p data-reveal className="lede text-ink">{BARRY_BLURB}</p>
            <div className="mt-14 grid gap-x-12 gap-y-6 border-t border-line pt-10 text-[15px] leading-[1.85] text-ink-muted md:mt-20 md:grid-cols-2">
              <div className="space-y-6">
                <p data-reveal className="eyebrow !leading-[1.9] text-ink">Licensed Real Estate Salesperson, New York license #10401353717.</p>
                <p data-reveal style={revealDelay(60)}>
                  As part of the Hedgerow team, Barry has been involved in some of the most significant real estate transactions on the East End, from record-setting oceanfront trades to nine-figure compound sales. He brings six years of Hamptons luxury experience and a reputation built on discretion, deep market knowledge, and results.
                </p>
                <p data-reveal style={revealDelay(120)}>
                  Originally from Dublin, Ireland, Barry has called the Hamptons home since 2013 and proudly considers himself a Sag Harbor local.
                </p>
              </div>
              <div className="space-y-6">
                <p data-reveal style={revealDelay(80)}>
                  Barry&apos;s expertise centers on oceanfront and waterfront properties, from Further Lane and Meadow Lane oceanfront estates to Sag Harbor and Shelter Island waterfront homes. He also covers raw land, development opportunities, and off-market inventory.
                </p>
                <p data-reveal style={revealDelay(140)}>
                  Covering the full East End from Southampton to Montauk, including Sag Harbor, Shelter Island, Bridgehampton, East Hampton, Sagaponack, Water Mill, Wainscott, and Amagansett.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed interlude */}
      <div data-reveal="image" className="relative h-[56svh] min-h-[360px] overflow-hidden bg-ocean-deep md:h-[78svh] md:max-h-[860px]">
        <Image src="/images/barry-mcgovern-2.jpg" alt="Bayfront estate, East End" fill sizes="100vw" className="photo-mono object-cover object-[50%_60%]" />
      </div>

      {/* II. Specialties */}
      <section className="py-24 md:py-36">
        <div className="frame grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <SectionLabel n="II" as="h2">Specialties</SectionLabel>
          </div>
          <ol className="grid border-t border-line sm:grid-cols-2 md:col-span-9">
            {specialties.map((item, i) => (
              <li
                key={item}
                data-reveal
                style={revealDelay((i % 2) * 80)}
                className={`flex items-baseline gap-6 border-b border-line py-6 ${i % 2 ? "sm:border-l sm:pl-8" : "sm:pr-8"}`}
              >
                <span className="eyebrow w-6 text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-[1.55rem] font-light leading-tight text-ink">{item}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* III. Firm */}
      <section className="bg-ocean-deep py-24 text-paper md:py-36">
        <div className="frame grid gap-12 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <SectionLabel n="III" className="text-paper/70">Firm</SectionLabel>
            <h2 data-reveal style={revealDelay(80)} className="display-2 mt-6">Hedgerow Exclusive Properties</h2>
          </div>
          <div data-reveal style={revealDelay(160)} className="md:col-span-5 md:col-start-8">
            <p className="text-[15px] leading-[1.85] text-paper/85">{FIRM_ACCOLADES}</p>
            <AlsoOnStrip className="mt-10 [&_a]:text-paper/85 [&_a:hover]:text-paper [&_p]:!text-paper/70" />
          </div>
        </div>
      </section>

      {/* IV. Questions */}
      <section className="py-24 md:py-36">
        <div className="frame grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <SectionLabel n="IV" as="h2">Frequently asked questions</SectionLabel>
          </div>
          <div className="divide-y divide-line border-y border-line md:col-span-9">
            {BARRY_FAQS.map((faq, i) => (
              <div key={faq.question} data-reveal style={revealDelay(i * 40)} className="grid gap-4 py-8 md:grid-cols-9 md:gap-10">
                <h3 className="display-3 !text-[1.6rem] font-light text-ink md:col-span-4">{faq.question}</h3>
                <p className="text-[15px] leading-[1.85] text-ink-muted md:col-span-5">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingInvitation
        n="V"
        label="Private inquiries"
        title="A conversation,"
        italic="in confidence."
        body="Complimentary valuations and confidential guidance, whether you are buying, selling, or simply watching the market."
        cta="Get in Touch"
      />
    </div>
  );
}
