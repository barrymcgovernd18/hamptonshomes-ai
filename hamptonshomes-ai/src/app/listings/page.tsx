import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import LeadForm from "@/components/LeadForm";
import EqualHousingLogo from "@/components/EqualHousing";
import ListingSearchForm, { type SearchField } from "@/components/ListingSearchForm";
import { SectionLabel } from "@/components/Editorial";
import { LISTINGS_VERIFIED } from "@/lib/listing-pages";
import {
  ACRE_STEPS,
  BATH_STEPS,
  BED_STEPS,
  PRICE_STEPS,
  SETTING_OPTIONS,
  SORT_OPTIONS,
  VILLAGE_OPTIONS,
  activeFilters,
  applyFilters,
  describeSearch,
  formatPrice,
  isFiltered,
  parseFilters,
  searchListings,
  shortPrice,
  type Filters,
  type SearchListing,
} from "@/lib/listing-search";
import { SITE_URL, breadcrumbListJsonLd, routeMetadata } from "@/lib/schema";

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const TITLE = "Search Hamptons Homes for Sale";
const DESCRIPTION =
  "Search Hamptons homes and land for sale by village, price, bedrooms, acreage and waterfront, each offered through Hedgerow Exclusive Properties.";
const FAIR_HOUSING_NOTICE =
  "https://dos.ny.gov/system/files/documents/2025/03/nys-housing-and-anti-discrimination-notice_02.2025.pdf";

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const filters = parseFilters(await searchParams);
  const base = routeMetadata({ title: TITLE, description: DESCRIPTION, path: "/listings", image: "/og/listings-search.jpg" });
  // Every filtered or re-sorted permutation points at the one canonical index and stays out of search results.
  return isFiltered(filters) ? { ...base, robots: { index: false, follow: true } } : base;
}

const verified = new Date(`${LISTINGS_VERIFIED}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });

function fields(f: Filters): SearchField[] {
  const any = (label: string) => ({ value: "", label });
  return [
    { name: "village", label: "Village", value: f.village ?? "", wide: true, options: [any("All villages"), ...VILLAGE_OPTIONS.map((v) => ({ value: v.slug, label: `${v.name} (${v.count})` }))] },
    { name: "min", label: "Min price", value: f.min?.toString() ?? "", options: [any("No min"), ...PRICE_STEPS.map((n) => ({ value: String(n), label: shortPrice(n) }))] },
    { name: "max", label: "Max price", value: f.max?.toString() ?? "", options: [any("No max"), ...PRICE_STEPS.map((n) => ({ value: String(n), label: shortPrice(n) }))] },
    { name: "beds", label: "Bedrooms", value: f.beds?.toString() ?? "", options: [any("Any"), ...BED_STEPS.map((n) => ({ value: String(n), label: `${n}+` }))] },
    { name: "baths", label: "Baths", value: f.baths?.toString() ?? "", options: [any("Any"), ...BATH_STEPS.map((n) => ({ value: String(n), label: `${n}+` }))] },
    { name: "acres", label: "Acreage", value: f.acres?.toString() ?? "", options: [any("Any"), ...ACRE_STEPS.map((n) => ({ value: String(n), label: `${n}+ acres` }))] },
    { name: "setting", label: "Setting", value: f.setting ?? "", options: [any("Any setting"), ...SETTING_OPTIONS] },
    { name: "sort", label: "Sort by", value: f.sort, wide: true, options: SORT_OPTIONS },
  ];
}

function stats(l: SearchListing) {
  return [
    l.beds && `${l.beds} BD`,
    l.baths && `${l.baths.replace(/ full, /, "F ").replace(/ half/, "H")} BA`,
    l.sqft && `${l.sqft} SF`,
    l.acres && `${l.acres} AC`,
  ].filter(Boolean) as string[];
}

const SETTING_LABEL = Object.fromEntries(SETTING_OPTIONS.map((s) => [s.value, s.label]));

function Card({ l }: { l: SearchListing }) {
  const tags = l.settings.includes("oceanfront") ? l.settings.filter((s) => s !== "waterfront") : l.settings;
  return (
    <li>
      <Link href={`/listings/${l.slug}`} className="group block">
        <div className="relative aspect-[3/2] overflow-hidden bg-ocean-deep sm:aspect-[4/3]">
          <Image
            src={l.images[0]}
            alt={`${l.address}, ${l.area}. Photo courtesy of Hedgerow Exclusive Properties`}
            fill
            quality={50}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover transition-transform duration-[2400ms] ease-[cubic-bezier(0.22,0.61,0.21,1)] group-hover:scale-[1.035] motion-reduce:transition-none"
          />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,20,24,0.8)_0%,rgba(10,20,24,0.42)_34%,rgba(10,20,24,0)_62%)]" />
          {l.status === "In contract" ? (
            <span className="eyebrow absolute left-4 top-4 bg-paper/95 px-2.5 py-1.5 text-[10px] text-ocean-deep">In contract</span>
          ) : null}
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 sm:p-5">
            <div className="min-w-0">
              <p className="eyebrow text-[10.5px] text-paper/85">{l.area}</p>
              <h3 className="mt-1.5 font-serif text-[1.4rem] font-light leading-[1.08] text-paper md:text-[1.5rem]">{l.address}</h3>
            </div>
            <p className="shrink-0 font-serif text-[1.2rem] font-light leading-none text-paper md:text-[1.3rem]">{formatPrice(l.price)}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 border-b border-line py-3.5">
          <p className="text-[12px] tracking-[0.04em] text-ink-muted">{stats(l).join(" · ") || l.headline}</p>
          {tags.length ? <p className="eyebrow text-[10px] text-ocean">{tags.map((t) => SETTING_LABEL[t]).join(" · ")}</p> : null}
        </div>
      </Link>
    </li>
  );
}

function EmptyState({ filters }: { filters: Filters }) {
  return (
    <section id="tell-barry" aria-labelledby="tell-heading" className="mt-4 bg-ocean-deep px-6 py-14 text-paper sm:px-10 md:px-14 md:py-20">
      <div className="grid gap-12 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <SectionLabel className="text-gold">No exact match</SectionLabel>
          <h2 id="tell-heading" className="display-2 mt-6 text-paper">
            Tell Barry what you&apos;re <em className="italic text-paper/80">looking for</em>
          </h2>
          <p className="body-copy mt-6 text-paper/85">
            Nothing listed matches this search today. Many Hamptons homes change hands quietly, before they are ever listed. Share what you
            have in mind and Barry will come back to you personally.
          </p>
          <p className="mt-4 flex items-center gap-3 text-[14px] text-gold">
            <span aria-hidden="true" className="inline-block h-px w-8 bg-gold" />
            In confidence. Barry replies personally.
          </p>
          <p className="mt-8 text-[14px] text-paper/80">
            Or call <a href="tel:+16463390154" className="font-serif text-[1.2rem] text-paper underline decoration-paper/30 underline-offset-[5px] hover:text-gold">646.339.0154</a>
          </p>
          <Link href="/listings" className="link-line eyebrow mt-8 inline-block text-paper/85 hover:text-paper">
            See all {searchListings.length} listings <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="md:col-span-6 md:col-start-7 md:border-l md:border-paper/15 md:pl-12">
          <LeadForm kind="search" tone="dark" defaultMessage={describeSearch(filters)} />
        </div>
      </div>
    </section>
  );
}

export default async function ListingsIndex({ searchParams }: Props) {
  const filters = parseFilters(await searchParams);
  const results = applyFilters(filters);
  const chips = activeFilters(filters);
  const total = searchListings.length;
  const formKey = JSON.stringify(filters);

  return (
    <div className="bg-paper text-ink">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": `${SITE_URL}/listings#page`,
          url: `${SITE_URL}/listings`,
          name: TITLE,
          description: DESCRIPTION,
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: total,
            itemListElement: applyFilters(parseFilters({})).map((l, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/listings/${l.slug}`,
              name: `${l.address}, ${l.area}`,
            })),
          },
        }}
      />
      <JsonLd data={breadcrumbListJsonLd([{ name: "Home", path: "/" }, { name: "Listings", path: "/listings" }])} />

      <section className="pb-10 pt-32 md:pb-14 md:pt-44">
        <div className="frame grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow text-ocean">Search · Hedgerow Exclusive Properties</p>
            <h1 className="display-1 mt-5 text-ink">
              Homes for sale <em className="block italic text-ink-muted">in the Hamptons</em>
            </h1>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="text-[14px] leading-relaxed text-ink-muted">
              {total} properties from Southampton to Montauk and Shelter Island, offered exclusively through Hedgerow Exclusive Properties.
            </p>
            <p className="eyebrow mt-3 text-[10.5px] text-ink-faint">Verified {verified}</p>
          </div>
        </div>
      </section>

      <section aria-label="Filters" className="border-y border-line bg-paper-deep py-8 md:py-10">
        <div className="frame">
          <ListingSearchForm key={formKey} fields={fields(filters)} />
        </div>
      </section>

      <section id="results" aria-labelledby="results-heading" className="scroll-mt-24 py-12 md:py-16">
        <div className="frame">
          <div className="flex flex-col gap-4 border-b border-ink/80 pb-5 md:flex-row md:items-end md:justify-between">
            <div role="status">
            <h2 id="results-heading" className="font-serif text-[1.6rem] font-light leading-tight text-ink md:text-[1.9rem]">
              {results.length === total && !chips.length
                ? `All ${total} properties`
                : `${results.length} of ${total} ${total === 1 ? "property" : "properties"}`}
              <span className="ml-3 align-middle font-sans text-[12.5px] tracking-[0.02em] text-ink-muted">
                Sorted by {SORT_OPTIONS.find((s) => s.value === filters.sort)?.label.toLowerCase()}
              </span>
            </h2>
            </div>
            {chips.length ? (
              <ul aria-label="Active filters" className="flex flex-wrap gap-2">
                {chips.map((c) => (
                  <li key={c.key}>
                    <Link
                      href={c.href}
                      scroll={false}
                      aria-label={`Remove filter: ${c.label}`}
                      className="inline-flex items-center gap-2 border border-line bg-paper-soft px-3 py-1.5 text-[12.5px] text-ink transition-colors hover:border-ocean-deep"
                    >
                      {c.label} <span aria-hidden="true" className="text-ink-faint">×</span>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          {results.length ? (
            <ul className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((l) => (
                <Card key={l.slug} l={l} />
              ))}
            </ul>
          ) : (
            <div className="mt-10">
              <EmptyState filters={filters} />
            </div>
          )}

          {results.length ? (
            <div className="mt-16 flex flex-col gap-4 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
              <p className="font-serif text-[1.35rem] font-light leading-snug text-ink">
                Looking for something not listed here?
              </p>
              <Link href="/contact" className="link-line eyebrow text-ocean">
                Tell Barry what you&apos;re looking for <span aria-hidden="true">→</span>
              </Link>
            </div>
          ) : null}
        </div>
      </section>

      <section aria-label="Listing compliance" className="bg-paper-deep py-12 md:py-14">
        <div className="frame grid gap-8 text-[12.5px] leading-relaxed text-ink-muted md:grid-cols-12">
          <div className="md:col-span-8">
            <p className="eyebrow text-ink">Listings courtesy of Hedgerow Exclusive Properties</p>
            <p className="mt-3">
              Hedgerow Exclusive Properties, 2495 Montauk Highway, Bridgehampton, NY 11932. Barry McGovern, Licensed Real Estate Salesperson,
              NY License #10401353717. Listing information is deemed reliable but not guaranteed. Price, availability and dimensions are
              approximate and subject to change. Photographs courtesy of Hedgerow Exclusive Properties.
            </p>
          </div>
          <div className="flex items-start gap-4 md:col-span-4 md:justify-end">
            <EqualHousingLogo className="h-10 w-10 shrink-0 text-ink" />
            <p>
              Equal Housing Opportunity.{" "}
              <a href={FAIR_HOUSING_NOTICE} target="_blank" rel="noopener" className="underline decoration-ink-faint/40 underline-offset-[3px]">
                New York State Fair Housing Notice
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
