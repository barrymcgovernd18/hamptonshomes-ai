import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { ClosingInvitation, PageHero, SectionLabel, revealDelay } from "@/components/Editorial";
import { postsByDate } from "@/lib/blog";
import { areas } from "@/lib/areas";
import { SITE_URL, breadcrumbListJsonLd, routeMetadata } from "@/lib/schema";
import BarChart from "@/components/BarChart";
import { OCEANFRONT_BY_VILLAGE, OCEANFRONT_BY_YEAR, OCEANFRONT_STUDY_PATH, formatMillions } from "@/lib/oceanfront";

const MARKET_TITLE = "Hamptons Market Research and Reports";
const MARKET_DESCRIPTION =
  "Hamptons luxury market research by Barry McGovern: oceanfront data from 2021 to 2026, village reports from Southampton to Montauk, and private-market commentary.";

export const metadata: Metadata = routeMetadata({
  title: MARKET_TITLE,
  description: MARKET_DESCRIPTION,
  path: "/market",
  image: "/og/market.jpg",
});

function formatDate(date: string, withDay = false) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    ...(withDay ? { day: "numeric" } : {}),
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Headline figures from the oceanfront study (see /blog/hamptons-oceanfront-market-2021-2026). */
const OCEANFRONT_FIGURES = [
  { value: "87", label: "Oceanfront sales", sub: "Southampton to Montauk, 2021 to 2026" },
  { value: "$2.61B", label: "Total volume", sub: "Recorded sales in the period" },
  { value: "$24.5M", label: "Median price", sub: "All 87 sales" },
  { value: "$43.5M", label: "2026 median", sub: "Seven sales through early October" },
];

export default function MarketPage() {
  const [latest, ...rest] = postsByDate;

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/market#collection`,
    name: MARKET_TITLE,
    description: MARKET_DESCRIPTION,
    url: `${SITE_URL}/market`,
    author: { "@id": `${SITE_URL}/about#person` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: postsByDate.length,
      itemListElement: postsByDate.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  };

  return (
    <div className="bg-paper text-ink">
      <JsonLd data={collectionJsonLd} />
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Market", path: "/market" },
        ])}
      />

      <PageHero
        light
        eyebrow="Research"
        title="Market"
        italic="Intelligence"
        intro={
          <p>
            Original research, village reports, and commentary on Hamptons luxury real estate from Southampton to Montauk,
            by Barry McGovern, Licensed Real Estate Salesperson with Hedgerow Exclusive Properties.
          </p>
        }
      />

      {latest && (
        <section className="pb-24 md:pb-36">
          <div className="frame">
            <SectionLabel n="I">Latest research</SectionLabel>
            <Link href={`/blog/${latest.slug}`} className="group mt-10 grid gap-10 md:mt-14 md:grid-cols-12 md:items-end md:gap-14">
              {latest.image && (
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep md:col-span-8 md:aspect-[16/10]">
                  <Image src={latest.image} alt={latest.title} fill priority fetchPriority="high" className="photo-bw object-cover" sizes="(max-width: 768px) 100vw, 66vw" />
                </div>
              )}
              <div className="md:col-span-4">
                <p className="eyebrow text-ink-faint">
                  {latest.category} · {formatDate(latest.date, true)}
                </p>
                <h2 className="display-3 mt-5 font-light text-ink transition-colors duration-500 group-hover:text-ocean">{latest.title}</h2>
                <p className="mt-6 text-[15px] leading-[1.85] text-ink-muted">{latest.excerpt}</p>
                <p className="mt-9">
                  <span className="link-line eyebrow text-ocean">
                    Read the research <span aria-hidden="true">→</span>
                  </span>
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="bg-ocean-deep py-24 text-paper md:py-32">
        <div className="frame">
          <SectionLabel n="II" className="text-paper/75">Hamptons oceanfront at a glance</SectionLabel>
          <dl className="mt-12 grid grid-cols-2 border-t border-paper/20 md:mt-16 md:grid-cols-4">
            {OCEANFRONT_FIGURES.map((figure, i) => (
              <div
                key={figure.label}
                data-reveal
                style={revealDelay(i * 90)}
                className={`flex flex-col-reverse justify-end border-b border-paper/20 py-8 md:border-b-0 md:py-12 ${
                  i % 2 ? "border-l pl-5 md:pl-8" : "pr-5 md:pr-8"
                } ${i === 2 ? "md:border-l md:pl-8" : ""}`}
              >
                <dd className="mt-3 text-[13px] leading-relaxed text-paper/70">{figure.sub}</dd>
                <dt className="eyebrow mt-5 text-paper/85">{figure.label}</dt>
                <dd className="font-serif text-[clamp(2.6rem,5vw,4.6rem)] font-light leading-none">{figure.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-16 grid gap-14 md:mt-20 md:grid-cols-2 md:gap-12">
            <BarChart
              tone="dark"
              title="Median oceanfront sale, by year"
              rows={OCEANFRONT_BY_YEAR.map((r) => ({
                label: r.label,
                value: r.median,
                display: formatMillions(r.median),
                detail: `${r.sales} sales`,
                highlight: r.label.startsWith("2026"),
              }))}
            />
            <BarChart
              tone="dark"
              title="Median oceanfront sale, by village"
              rows={OCEANFRONT_BY_VILLAGE.map((r) => ({
                label: r.label,
                value: r.median,
                display: formatMillions(r.median),
                detail: `${r.sales} sales`,
                href: `/${r.slug}`,
              }))}
            />
          </div>
          <p className="mt-12 max-w-3xl border-t border-paper/20 pt-6 text-[13px] leading-relaxed text-paper/70">
            Recorded deed transfers and MLS comparable sales, January 2021 to early October 2026. Village detail, repeat sales, and price per foot of frontage in the{" "}
            <Link href={OCEANFRONT_STUDY_PATH} className="link-line text-paper">
              full study
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-24 md:py-36">
        <div className="frame grid gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <SectionLabel n="III">Village reports</SectionLabel>
            <h2 data-reveal style={revealDelay(80)} className="display-2 mt-6 text-ink">
              Southampton <em className="block italic text-ink-muted">to Montauk</em>
            </h2>
            <p data-reveal style={revealDelay(160)} className="body-copy mt-8 text-ink-muted">
              Each village trades on its own terms. These pages set out the micro-markets, price ranges, and recent records.
            </p>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <ul className="border-t border-ink/80">
              {areas.map((area, i) => (
                <li key={area.slug} data-reveal style={revealDelay((i % 5) * 50)}>
                  <Link href={`/${area.slug}`} className="group grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-4 border-b border-line py-5">
                    <span className="eyebrow text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                    <span className="font-serif text-[1.65rem] font-light leading-tight text-ink transition-transform duration-500 [transition-timing-function:var(--ease-editorial)] group-hover:translate-x-2 group-hover:text-ocean">
                      {area.name}
                    </span>
                    <span className="text-right text-[13px] text-ink-faint">{area.priceRange.replace(/\s*-\s*/, " to ")}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-paper-soft py-24 md:py-36">
        <div className="frame">
          <SectionLabel n="IV">All research and commentary</SectionLabel>
          <ul className="mt-12 border-t border-ink/80 md:mt-16">
            {rest.map((post, i) => (
              <li key={post.slug} data-reveal style={revealDelay((i % 3) * 60)} className="border-b border-line">
                <Link href={`/blog/${post.slug}`} className="group grid gap-4 py-9 md:grid-cols-12 md:gap-10">
                  <p className="eyebrow text-ink-faint md:col-span-3 md:pt-2">
                    {formatDate(post.date)}
                    <span className="block pt-2 font-serif text-[15px] normal-case italic tracking-normal text-ink-muted">{post.category}</span>
                  </p>
                  <div className="md:col-span-7">
                    <h3 className="font-serif text-[1.75rem] font-light leading-[1.2] text-ink transition-colors duration-500 group-hover:text-ocean">{post.title}</h3>
                    <p className="mt-3 max-w-3xl text-[15px] leading-[1.8] text-ink-muted">{post.excerpt}</p>
                  </div>
                  <span aria-hidden="true" className="hidden self-center justify-self-end font-serif text-2xl text-ink-faint transition-transform duration-500 group-hover:translate-x-2 group-hover:text-ocean md:col-span-2 md:block">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingInvitation
        n="V"
        label="Private briefings"
        title="A read on your property or search."
        body="Confidential, comps-based analysis for owners and buyers across the East End."
        cta="Request a briefing"
      />
    </div>
  );
}
