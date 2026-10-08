import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import ListingSearchForm, { type SearchField } from "@/components/ListingSearchForm";
import { ClosingInvitation, PageHero, SectionLabel } from "@/components/Editorial";
import {
  PRICE_BANDS,
  SETTINGS,
  SORTS,
  VILLAGES,
  YEARS,
  applyFilters,
  filterQuery,
  firmSales,
  formatVolume,
  parseFilters,
  type FirmSale,
  type SalesFilters,
} from "@/lib/hedgerow-sales";
import { HEDGEROW, SITE_URL, breadcrumbListJsonLd, routeMetadata } from "@/lib/schema";

const PATH = "/hedgerow-sales";

export const metadata: Metadata = routeMetadata({
  title: "Recent Hedgerow Exclusive Sales",
  description:
    "Recent Hamptons sales by Hedgerow Exclusive Properties, with village, price, date and the firm's role. Filter by village, price, year and setting.",
  path: PATH,
  image: "/og/sales.jpg",
});

function SaleCard({ sale, priority }: { sale: FirmSale; priority?: boolean }) {
  return (
    <article className="flex flex-col">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
        {sale.image ? (
          <Image
            src={sale.image}
            alt={sale.alt}
            fill
            quality={50}
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full flex-col justify-between bg-ocean-deep p-6 text-paper">
            <p className="eyebrow text-gold">Hedgerow Exclusive Properties</p>
            <p className="font-serif text-[1.9rem] font-light leading-[1.05]">
              {sale.address}
              <span className="mt-2 block text-[1.1rem] italic text-paper/80">{sale.village}</span>
            </p>
          </div>
        )}
      </div>
      <p className="eyebrow mt-4 text-ink-muted">
        {sale.village} · {sale.settingLabel}
        {sale.dateText ? ` · ${sale.dateText}` : ""}
      </p>
      <div className="mt-2 flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-[1.35rem] font-light leading-tight text-ink">{sale.address}</h3>
        <p className="shrink-0 font-serif text-[1.2rem] text-ocean">{sale.price}</p>
      </div>
      <p className="mt-1.5 text-[13px] text-ink-muted">{sale.role}</p>
    </article>
  );
}

function Grid({ sales, eager = 0 }: { sales: FirmSale[]; eager?: number }) {
  return (
    <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {sales.map((s, i) => (
        <SaleCard key={s.id} sale={s} priority={i < eager} />
      ))}
    </div>
  );
}

function searchFields(f: SalesFilters): SearchField[] {
  const opts = (any: string | null, list: { key: string; label: string }[]) => [
    ...(any ? [{ value: "", label: any }] : []),
    ...list.map((o) => ({ value: o.key, label: o.label })),
  ];
  return [
    { name: "village", label: "Village", value: f.village ?? "", options: opts("All villages", VILLAGES), wide: true },
    { name: "type", label: "Setting", value: f.type ?? "", options: opts("All settings", SETTINGS) },
    { name: "price", label: "Price", value: f.price ?? "", options: opts("Any price", PRICE_BANDS.map((b) => ({ key: b.key, label: b.label }))) },
    { name: "year", label: "Year", value: f.year ?? "", options: opts("Any year", YEARS.map((y) => ({ key: String(y), label: String(y) }))) },
    { name: "sort", label: "Sort", value: f.sort, options: opts(null, SORTS.map((o) => ({ key: o.key, label: o.label }))) },
  ];
}

function activeSummary(f: SalesFilters) {
  const parts = [
    VILLAGES.find((v) => v.key === f.village)?.label,
    SETTINGS.find((s) => s.key === f.type)?.label,
    PRICE_BANDS.find((b) => b.key === f.price)?.label,
    f.year,
  ].filter(Boolean);
  return parts.join(" · ");
}

export default async function HedgerowSalesPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const filters = parseFilters(await searchParams);
  const { dated, undated, count, total } = applyFilters(filters);
  const filtered = Boolean(filters.village || filters.price || filters.year || filters.type);
  const shown = [...dated, ...undated];

  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Recent Hedgerow Exclusive Sales",
    description: "Closed sales published by Hedgerow Exclusive Properties, with village, price, date and the firm's role in the firm's words.",
    url: `${SITE_URL}${PATH}`,
    numberOfItems: shown.length,
    itemListElement: shown.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: `${s.address}, ${s.village}`,
      description: `${s.address}, ${s.village}. ${s.dateText ? `Sold ${s.dateText}. ` : ""}${s.price}. ${s.role}.`,
    })),
    provider: { "@type": "RealEstateAgent", "@id": HEDGEROW.id, name: HEDGEROW.name, url: HEDGEROW.url },
  };

  return (
    <div>
      <JsonLd data={itemList} />
      <JsonLd data={breadcrumbListJsonLd([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/sales" }, { name: "Recent Hedgerow Exclusive Sales", path: PATH }])} />

      <PageHero
        light
        eyebrow="Hedgerow Exclusive Properties · Track record"
        title="Recent Hedgerow"
        italic="Exclusive Sales"
        aside={
          <p className="body-copy text-ink-muted md:text-right">
            Hedgerow Exclusive Properties has completed over $2 billion in transactions since 2020.
          </p>
        }
      />

      <section id="results" aria-label="Hedgerow sales" className="scroll-mt-24 border-t border-line pb-24 pt-12 md:pb-32 md:pt-14">
        <div className="frame">
          <ListingSearchForm
            key={filterQuery(filters) || "all"}
            action={PATH}
            label="Filter Hedgerow sales"
            submitLabel="Show sales"
            defaults={{ sort: "price" }}
            gridClassName="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-5 lg:gap-x-3"
            fields={searchFields(filters)}
          />

          <div aria-live="polite" className="mt-10 flex flex-wrap items-baseline justify-between gap-x-10 gap-y-3 border-y border-ink/80 py-5">
            <p className="flex items-baseline gap-3">
              <span className="font-serif text-[2rem] font-light leading-none text-ink">{count}</span>
              <span className="eyebrow text-ink-muted">{count === 1 ? "sale shown" : "sales shown"}</span>
            </p>
            <p className="flex items-baseline gap-3">
              <span className="font-serif text-[2rem] font-light leading-none text-ink">{formatVolume(total)}</span>
              <span className="eyebrow text-ink-muted">in total</span>
            </p>
            <p className="text-[13.5px] text-ink-muted md:ml-auto">{filtered ? activeSummary(filters) : `All ${firmSales.length} published sales`}</p>
          </div>

          {count === 0 ? (
            <div className="py-20 text-center">
              <p className="font-serif text-[1.8rem] font-light text-ink">No sales match these filters.</p>
              <Link href={`${PATH}#results`} className="eyebrow mt-6 inline-block text-ocean underline decoration-ocean/40 underline-offset-[4px]">
                Show all sales
              </Link>
            </div>
          ) : null}

          {dated.length ? (
            <div className="mt-14">
              <h2 className="sr-only">Dated sales</h2>
              <Grid sales={dated} eager={0} />
            </div>
          ) : null}

          {undated.length ? (
            <div className="mt-24 border-t border-line pt-14">
              <SectionLabel as="h2">Additional Hedgerow transactions</SectionLabel>
              <p className="body-copy mt-4 max-w-[60ch] text-ink-muted">From Hedgerow&apos;s Prominent Deals, largest first.</p>
              <div className="mt-10">
                <Grid sales={undated} />
              </div>
            </div>
          ) : null}

          <p className="mt-20 text-[12.5px] text-ink-muted">Property images courtesy of Hedgerow Exclusive Properties.</p>
        </div>
      </section>

      <ClosingInvitation
        label="Private inquiries"
        title="Buying or selling in the Hamptons?"
        body="Confidential guidance and complimentary valuations across the East End, from Southampton to Montauk."
        cta="Start a conversation"
      />
    </div>
  );
}
