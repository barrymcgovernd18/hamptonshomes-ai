import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { postsByDate } from "@/lib/blog";
import { areas } from "@/lib/areas";
import { SITE_URL, breadcrumbListJsonLd, routeMetadata } from "@/lib/schema";

const MARKET_TITLE = "Hamptons Market Research and Reports";
const MARKET_DESCRIPTION =
  "Hamptons luxury market research by Barry McGovern: oceanfront data from 2021 to 2026, village reports from Southampton to Montauk, and private-market notes.";

export const metadata: Metadata = routeMetadata({
  title: MARKET_TITLE,
  description: MARKET_DESCRIPTION,
  path: "/market",
});

function formatDate(date: string, withDay = false) {
  return new Date(`${date}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    ...(withDay ? { day: "numeric" } : {}),
    year: "numeric",
    timeZone: "UTC",
  });
}

/** Headline figures from the oceanfront research note (see /blog/hamptons-oceanfront-market-2021-2026). */
const OCEANFRONT_FIGURES = [
  { value: "87", label: "Oceanfront sales", sub: "Southampton to Montauk, 2021 to 2026" },
  { value: "$2.61B", label: "Total volume", sub: "Recorded sales in the period" },
  { value: "$24.5M", label: "Median price", sub: "All 87 sales" },
  { value: "$43.5M", label: "2026 median", sub: "Seven sales to date, top-weighted" },
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

      <section className="bg-paper-deep pb-16 pt-36 md:pb-20 md:pt-44">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-ocean">Research</p>
          <h1 className="font-serif text-5xl leading-tight text-ink md:text-7xl">
            Market <span className="block font-normal italic text-ink-muted">Intelligence</span>
          </h1>
          <p className="mt-7 max-w-2xl text-[15px] leading-[1.9] text-ink-muted">
            Research notes, village reports, and commentary on Hamptons luxury real estate from Southampton to Montauk.
            Written by Barry McGovern, Licensed Real Estate Salesperson with Hedgerow Exclusive Properties.
          </p>
        </div>
      </section>

      {latest && (
        <section className="py-20 md:py-24">
          <div className="mx-auto max-w-7xl px-6 md:px-8">
            <p className="mb-8 text-[11px] uppercase tracking-[0.3em] text-ocean">Latest research</p>
            <Link href={`/blog/${latest.slug}`} className="group grid gap-10 md:grid-cols-12 md:items-center md:gap-14">
              {latest.image && (
                <div className="relative aspect-[3/2] overflow-hidden bg-paper-deep md:col-span-7">
                  <Image
                    src={latest.image}
                    alt={latest.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                </div>
              )}
              <div className="md:col-span-5">
                <p className="mb-4 text-[11px] uppercase tracking-[0.24em] text-ink-faint">
                  {latest.category} · {formatDate(latest.date, true)}
                </p>
                <h2 className="font-serif text-3xl leading-snug text-ink transition-colors group-hover:text-ocean md:text-4xl">
                  {latest.title}
                </h2>
                <p className="mt-6 text-[15px] leading-[1.9] text-ink-muted">{latest.excerpt}</p>
                <p className="mt-8 inline-block border-b border-ocean pb-1 text-sm text-ocean">
                  Read the note <span aria-hidden="true">↗</span>
                </p>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="border-y border-line bg-paper-soft py-14">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="mb-8 text-[11px] uppercase tracking-[0.3em] text-ocean">Hamptons oceanfront at a glance</p>
          <dl className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
            {OCEANFRONT_FIGURES.map((figure) => (
              <div key={figure.label} className="bg-paper-soft p-6 md:p-8">
                <dt className="text-[11px] uppercase tracking-[0.2em] text-ink-muted">{figure.label}</dt>
                <dd className="mt-3 font-serif text-3xl text-ink md:text-4xl">{figure.value}</dd>
                <dd className="mt-2 text-[13px] text-ink-faint">{figure.sub}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 text-[13px] text-ink-faint">
            Source: recorded deed transfers and MLS comparable-sales data, January 2021 to early October 2026. Method and village detail in the{" "}
            <Link href="/blog/hamptons-oceanfront-market-2021-2026" className="text-ocean underline decoration-ocean/30 underline-offset-4 hover:text-ocean-deep">
              full note
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="grid gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-4">
              <p className="mb-5 text-[11px] uppercase tracking-[0.3em] text-ocean">Village reports</p>
              <h2 className="font-serif text-4xl leading-tight text-ink">
                Southampton <span className="block font-normal italic text-ink-muted">to Montauk</span>
              </h2>
              <p className="mt-6 text-[15px] leading-[1.9] text-ink-muted">
                Each village trades on its own terms. These pages set out the micro-markets, price ranges, and recent records.
              </p>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <ul className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
                {areas.map((area) => (
                  <li key={area.slug}>
                    <Link href={`/${area.slug}`} className="group flex items-baseline justify-between gap-4 border-b border-line py-4">
                      <span className="font-serif text-xl text-ink group-hover:text-ocean">{area.name}</span>
                      <span className="text-[13px] text-ink-faint">{area.priceRange}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-line pb-24 pt-20 md:pb-32">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="mb-10 text-[11px] uppercase tracking-[0.3em] text-ocean">All research and notes</p>
          <ul className="divide-y divide-line border-y border-line">
            {rest.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="group grid gap-3 py-8 md:grid-cols-12 md:gap-10">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-ink-faint md:col-span-3 md:pt-2">
                    {formatDate(post.date)}
                    <span className="block pt-1 normal-case tracking-normal text-ink-faint">{post.category}</span>
                  </p>
                  <div className="md:col-span-8">
                    <h3 className="font-serif text-2xl leading-snug text-ink transition-colors group-hover:text-ocean">{post.title}</h3>
                    <p className="mt-3 max-w-3xl text-[15px] leading-[1.8] text-ink-muted">{post.excerpt}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-ocean py-20 text-paper md:py-24">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 md:flex-row md:items-end md:justify-between md:px-8">
          <div>
            <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-paper/75">Private briefings</p>
            <h2 className="font-serif text-3xl leading-tight md:text-4xl">A read on your property or search.</h2>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-paper/80">
              Confidential, comps-based analysis for owners and buyers across the East End.
            </p>
          </div>
          <Link href="/contact" className="inline-block border border-paper/60 px-8 py-3.5 text-center text-[11px] uppercase tracking-[0.24em] text-paper hover:bg-paper hover:text-ocean">
            Request a briefing
          </Link>
        </div>
      </section>
    </div>
  );
}
