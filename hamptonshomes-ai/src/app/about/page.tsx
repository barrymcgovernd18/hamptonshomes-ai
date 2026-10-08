import type { Metadata } from "next";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import AlsoOnStrip from "@/components/AlsoOnStrip";
import { ClosingInvitation, SectionLabel, revealDelay } from "@/components/Editorial";
import { ABOUT_FAQS, faqPageJsonLd, profilePageJsonLd, routeMetadata } from "@/lib/schema";
import { featuredPress } from "@/lib/press";
import { FIRM_ACCOLADES } from "@/lib/seo-copy";

export const metadata: Metadata = routeMetadata({
  title: "About Barry McGovern | Hamptons Real Estate Salesperson",
  absoluteTitle: true,
  description:
    "Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique Hamptons firm focused on oceanfront and waterfront.",
  path: "/about",
  image: "/og/about.jpg",
});

/** Facts as published elsewhere on the site, set out so readers (and search and AI tools) can lift them cleanly. */
const AT_A_GLANCE = [
  { label: "Personal sales volume", value: "$250M+" },
  { label: "Hamptons luxury experience", value: "Six years" },
  { label: "Originally from", value: "Dublin, Ireland" },
  { label: "On the East End since", value: "2013" },
  { label: "Home village", value: "Sag Harbor" },
  { label: "Coverage", value: "Southampton to Montauk" },
];

const FIRM_FIGURES = [
  { figure: "Over $2B", label: "Transactions since 2020" },
  { figure: "$121.5M", label: "The firm's largest trade" },
  { figure: "#1", label: "Hamptons, WSJ/RealTrends" },
  { figure: "#1", label: "New York, WSJ/RealTrends" },
];

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
      <JsonLd data={profilePageJsonLd(featuredPress)} />

      {/* Hero: portrait panel on the right, name set large on deep ocean. */}
      <section data-hero className="relative isolate overflow-hidden bg-ocean-deep text-paper md:h-[88svh] md:min-h-[640px] md:max-h-[960px]">
        <div className="relative h-[72svh] min-h-[460px] w-full md:absolute md:inset-y-0 md:right-0 md:h-auto md:w-[46%]">
          <Image
            src="/images/barry-mcgovern.jpg"
            alt="Barry McGovern"
            fill
            priority
            fetchPriority="high"
            sizes="(max-width: 768px) 100vw, 46vw"
            className="photo-mono object-cover object-[center_18%] md:object-[center_22%]"
          />
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-black/45 to-transparent" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-ocean-deep via-ocean-deep/20 to-transparent md:hidden" />
          <div aria-hidden="true" className="absolute inset-y-0 left-0 hidden w-2/5 bg-gradient-to-r from-ocean-deep to-transparent md:block" />
        </div>
        <div className="frame relative -mt-40 pb-12 md:mt-0 md:flex md:h-full md:items-end md:pb-16">
          <div className="md:max-w-[52%]">
            <p className="eyebrow text-paper/85">About</p>
            <h1 className="display-1 mt-6 text-paper">
              Barry <br />
              McGovern
            </h1>
            <p className="eyebrow mt-8 text-paper/75">
              Licensed Real Estate Salesperson
              <span className="block">Hedgerow Exclusive Properties</span>
            </p>
          </div>
        </div>
      </section>

      {/* I. Profile */}
      <section className="py-24 md:py-40">
        <div className="frame grid gap-y-12 md:grid-cols-12 md:grid-rows-[auto_1fr] md:gap-x-10">
          <div className="md:col-span-3">
            <SectionLabel n="I">Profile</SectionLabel>
          </div>

          <div className="md:col-span-8 md:col-start-5 md:row-span-2 lg:col-span-7 lg:col-start-5">
            <p data-reveal className="max-w-[30ch] font-serif text-[clamp(1.95rem,2.9vw,2.75rem)] font-light leading-[1.28] tracking-[-0.005em] text-ink">
              Oceanfront, waterfront, and estate real estate, <em className="italic text-ink-muted">from Southampton to Montauk.</em>
            </p>
            <div className="mt-12 max-w-[62ch] space-y-7 border-t border-line pt-10 text-[16px] leading-[1.85] text-ink-muted md:mt-16 md:text-[17px]">
              <p data-reveal>
                Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020. As part of the Hedgerow team, Barry has been involved in some of the most significant real estate transactions on the East End, from record-setting oceanfront trades to nine-figure compound sales. He brings six years of Hamptons luxury experience and a reputation built on discretion and deep market knowledge.
              </p>
              <p data-reveal style={revealDelay(60)}>
                Originally from Dublin, Ireland, Barry has called the Hamptons home since 2013 and proudly considers himself a Sag Harbor local. His expertise centers on oceanfront and waterfront properties, from Further Lane and Meadow Lane oceanfront estates to Sag Harbor and Shelter Island waterfront homes. He also covers raw land, development opportunities, and off-market inventory.
              </p>
            </div>
            <dl data-reveal className="mt-14 grid grid-cols-2 border-t border-ink/80 md:mt-16 lg:grid-cols-3">
              {AT_A_GLANCE.map((fact, i) => (
                <div key={fact.label} className={`flex flex-col-reverse justify-end gap-2 border-b border-line py-6 ${i % 2 ? "pl-5 max-lg:border-l" : "pr-5"} ${i % 3 ? "lg:border-l lg:pl-6" : "lg:pl-0"}`}>
                  <dt className="eyebrow text-ink-faint">{fact.label}</dt>
                  <dd className="font-serif text-[1.45rem] font-light leading-[1.2] text-ink md:text-[1.6rem]">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div data-reveal style={revealDelay(160)} className="border-t border-line pt-6 md:col-span-3 md:row-start-2 md:self-start md:border-t-0 md:pt-0 md:-mt-4">
            <p className="eyebrow !leading-[2.1] text-ink-faint">
              <span className="block text-ink">Licensed Real Estate Salesperson</span>
              <span className="block">New York License #10401353717</span>
              <span className="block">Hedgerow Exclusive Properties</span>
            </p>
          </div>
        </div>
      </section>

      {/* Full-bleed interlude */}
      <div data-reveal="image" className="relative h-[56svh] min-h-[360px] overflow-hidden bg-ocean-deep md:h-[78svh] md:max-h-[860px]">
        <Image src="/images/trades/442-further-lane-east-hampton.jpg" alt="442 Further Lane, East Hampton, a Hedgerow transaction, with the Atlantic beyond" fill quality={50} sizes="100vw" className="photo-mono object-cover object-[50%_55%]" />
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
        <dl className="frame mt-16 grid grid-cols-2 border-t border-paper/15 md:mt-20 lg:grid-cols-4">
          {FIRM_FIGURES.map((item, i) => (
            <div key={item.label} data-reveal style={revealDelay(i * 90)} className={`flex flex-col-reverse justify-end gap-4 border-b border-paper/15 py-8 lg:border-b-0 lg:py-12 ${i % 2 ? "border-l pl-5 lg:pl-8" : "pr-5 lg:pr-8"} ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}>
              <dt className="eyebrow text-paper/70">{item.label}</dt>
              <dd className="whitespace-nowrap font-serif text-[2.3rem] font-light leading-none md:text-[3rem]">{item.figure}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* IV. Questions */}
      <section className="py-24 md:py-36">
        <div className="frame grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <SectionLabel n="IV" as="h2">Frequently asked questions</SectionLabel>
          </div>
          <div className="divide-y divide-line border-y border-line md:col-span-9">
            {ABOUT_FAQS.map((faq, i) => (
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
