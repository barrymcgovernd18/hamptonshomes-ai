import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import InView from "@/components/InView";
import { ClosingInvitation, PageHero, SectionLabel, revealDelay } from "@/components/Editorial";
import { personalVolume, firmVolume, firmVolumeLabel } from "@/lib/sales";
import {
  hedgerowActiveListings,
  hedgerowFirmHistory,
  hedgerowSold2021,
  type HedgerowGroup,
  type HedgerowSoldDeal,
} from "@/lib/portfolio";
import { activeListingsItemListJsonLd, routeMetadata, salesItemListJsonLd } from "@/lib/schema";
import { SALES_PAGE } from "@/lib/seo-copy";
import { listingPathByHedgerowUrl } from "@/lib/listing-pages";

export const metadata: Metadata = routeMetadata({
  title: SALES_PAGE.title,
  description: SALES_PAGE.description,
  path: "/sales",
  image: "/og/sales.jpg",
});

const OCEANFRONT_ARTICLE = "/blog/hamptons-oceanfront-market-2021-2026";

const GROUPS: { key: HedgerowGroup; label: string; note: string }[] = [
  { key: "Oceanfront", label: "Oceanfront", note: "Oceanfront sales across the South Fork." },
  { key: "Waterfront", label: "Waterfront and bayfront", note: "Bay, pond, and harbor frontage." },
  { key: "Estate and village", label: "Estates, village, and other", note: "Estate section, farmland, village, and other Hedgerow sales." },
];

function ListingLink({ listing, className, label, children }: { listing: { listingUrl: string; alt: string }; className: string; label?: boolean; children: React.ReactNode }) {
  const internal = listingPathByHedgerowUrl[listing.listingUrl];
  return internal ? (
    <Link href={internal} aria-label={label ? listing.alt.replace(/\. Photo courtesy.*$/, "") : undefined} className={className}>
      {children}
    </Link>
  ) : (
    <Link href={`/contact?about=${encodeURIComponent(listing.alt.replace(/\. Photo courtesy.*$/, ""))}`} aria-label={label ? listing.alt.replace(/\. Photo courtesy.*$/, "") : undefined} className={className}>
      {children}
    </Link>
  );
}

/** Selected transactions: Barry-involved Hedgerow trades, newest first, mixed by village and setting. Facts as published by Hedgerow. */
const SELECTED: { address: string; price: string; setting: string; image: string; position?: string; blurb: string }[] = [
  { address: "33 Dinah Rock Road", price: "$6,995,000", setting: "Waterfront", image: "/images/selected/33-dinah-rock-road-shelter-island.jpg", position: "50% 60%", blurb: "West-facing Shelter Island waterfront on about 2.1 acres, with 186 feet of natural beachfront." },
  { address: "55 Dunes Lane", price: "$43,500,000", setting: "Oceanfront", image: "/images/trades/55-dunes-lane-amagansett.jpg", position: "42% 50%", blurb: "A gated modern oceanfront estate on 2.8 acres, with unobstructed views to the east." },
  { address: "109 Duck Pond Lane", price: "$20,000,000", setting: "Waterfront", image: "/images/109-duck-pond.jpg", blurb: "A contemporary residence of about 8,700 square feet on two acres, with views over Wickapogue Pond to the Atlantic." },
  { address: "79 Surfside Drive", price: "$28,000,000", setting: "Oceanfront", image: "/images/selected/79-surfside-drive-bridgehampton.jpg", position: "50% 55%", blurb: "About 1.5 acres on Surfside Drive with 140 feet of direct ocean frontage." },
  { address: "33 Lily Pond Lane", price: "$31,500,000", setting: "Oceanfront", image: "/images/33-lily-pond.jpg", blurb: "East Hampton oceanfront on Lily Pond Lane, with 171 feet of private frontage on nearly two acres." },
  { address: "42 Old Montauk Highway", price: "$18,500,000", setting: "Oceanfront", image: "/images/selected/42-old-montauk-highway-montauk.jpg", position: "50% 55%", blurb: "More than 35 acres of Montauk oceanfront, with roughly 485 feet of private beach." },
  { address: "35 Potato Road & 543 Daniels Lane", price: "$46,500,000", setting: "Oceanfront and land", image: "/images/trades/35-potato-road-543-daniels-lane-sagaponack.jpg", position: "50% 58%", blurb: "Two lots of about four acres in Sagaponack: an oceanfront parcel and an inland parcel across the street." },
];

const SELECTED_ROWS: { i: number; span: string }[][] = [
  [{ i: 0, span: "md:col-span-7" }, { i: 1, span: "md:col-span-5" }],
  [{ i: 2, span: "md:col-span-5" }, { i: 3, span: "md:col-span-7" }],
  [{ i: 4, span: "md:col-span-4" }, { i: 5, span: "md:col-span-4" }, { i: 6, span: "md:col-span-4" }],
];

function SoldCard({ deal, index }: { deal: HedgerowSoldDeal; index: number }) {
  return (
    <article data-reveal style={revealDelay((index % 3) * 80)} className="group flex flex-col">
      {deal.image ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
          <Image src={deal.image} alt={deal.alt || `${deal.address}, ${deal.area}`} fill quality={50} className="photo-bw object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
        </div>
      ) : (
        <div className="flex aspect-[4/3] items-end bg-ocean-deep p-7">
          <p className="font-serif text-[1.9rem] font-light leading-tight text-paper/85">{deal.address}</p>
        </div>
      )}
      <div className="flex flex-1 flex-col pt-6">
        <p className="eyebrow text-ink-faint">{deal.area}{deal.dateText ? ` · Sold ${deal.dateText}` : ""}</p>
        <div className="mt-3 flex items-baseline justify-between gap-4">
          <h4 className="font-serif text-[1.55rem] font-light leading-tight text-ink">{deal.address}</h4>
          {deal.price ? <p className="whitespace-nowrap font-serif text-[1.35rem] text-ocean">{deal.price}</p> : null}
        </div>
        <p className="mt-4 border-t border-line pt-4 text-[11px] uppercase tracking-[0.2em] text-ink-muted">{deal.roleLabel || "A Hedgerow transaction"}</p>
        {deal.barryInvolved ? (
          <p className="mt-2 font-serif text-[15px] italic text-ink-muted">Barry McGovern was involved</p>
        ) : null}
        <p className="mt-auto pt-4">
          <Link
            href={`/contact?about=${encodeURIComponent(`${deal.address}, ${deal.area}`)}`}
            className="link-line eyebrow text-[10px] text-ink-muted hover:text-ocean"
          >
            Ask about this sale
          </Link>
        </p>
      </div>
    </article>
  );
}

export default function SalesPage() {
  const selected = SELECTED.flatMap((pick) => {
    const deal = hedgerowSold2021.find((d) => d.address === pick.address && d.price === pick.price && d.barryInvolved);
    return deal ? [{ ...pick, deal }] : [];
  });
  const actives = [...hedgerowActiveListings].sort((a, b) => b.priceNum - a.priceNum);
  return (
    <div className="bg-paper text-ink">
      <JsonLd data={activeListingsItemListJsonLd(actives.map((a) => (listingPathByHedgerowUrl[a.listingUrl] ? { ...a, listingUrl: `https://hamptonshomes.ai${listingPathByHedgerowUrl[a.listingUrl]}` } : a)))} />
      <JsonLd data={salesItemListJsonLd(hedgerowSold2021)} />
      <JsonLd data={salesItemListJsonLd(hedgerowFirmHistory, "Prominent Hedgerow Exclusive Properties transactions")} />

      <PageHero
        eyebrow="Barry McGovern · Portfolio"
        title="Hedgerow"
        italic="Portfolio"
        image="/images/43-east-dune-lane.jpg"
        imageAlt="43 East Dune Lane, East Hampton, an oceanfront Hedgerow sale, with the Atlantic beyond"
        imagePosition="72% 40%"
        aside={
          <dl className="grid grid-cols-2 gap-8 md:text-right">
            <div className="flex flex-col-reverse">
              <dt className="eyebrow mt-3 text-paper/75">Personal volume</dt>
              <dd className="font-serif text-[2.4rem] font-light leading-none text-paper">{personalVolume}</dd>
            </div>
            <div className="flex flex-col-reverse">
              <dt className="eyebrow mt-3 text-paper/75">{firmVolumeLabel}</dt>
              <dd className="font-serif text-[2.4rem] font-light leading-none text-paper">{firmVolume}</dd>
            </div>
          </dl>
        }
      />

      {/* I. Available now */}
      <section id="listings" className="defer-render py-24 md:py-36">
        <div className="frame">
          <div className="mb-14 grid gap-8 md:mb-20 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <SectionLabel n="I">Available now</SectionLabel>
              <h2 data-reveal style={revealDelay(80)} className="display-2 mt-6">Exclusively listed with Hedgerow</h2>
            </div>
            <p data-reveal style={revealDelay(160)} className="text-[13px] leading-relaxed text-ink-muted md:col-span-4 md:text-right">
              {actives.length} residences for sale or in contract, offered exclusively through Hedgerow Exclusive Properties.
            </p>
          </div>
          <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
            {actives.map((listing, i) => (
              <article key={listing.address} data-reveal style={revealDelay((i % 2) * 100)} className="group flex flex-col">
                <ListingLink listing={listing} label className="relative block aspect-[16/11] overflow-hidden bg-paper-deep">
                  <InView>
                    <Image src={listing.image} alt={listing.alt} fill quality={50} className="photo-bw object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  </InView>
                </ListingLink>
                <div className="flex flex-1 flex-col pt-7">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <p className="eyebrow text-ocean">{listing.status} · {listing.area}</p>
                      <h3 className="display-3 mt-3 font-light text-ink">{listing.address}</h3>
                      <p className="mt-3 text-[12px] tracking-[0.04em] text-ink-muted">
                        {[listing.beds && `${listing.beds} BD`, listing.baths && `${listing.baths} BA`, listing.sqft && `${listing.sqft} SF`, listing.acres && `${listing.acres} acres`]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    </div>
                    <p className="whitespace-nowrap pt-7 font-serif text-[1.6rem] text-ocean">{listing.price}</p>
                  </div>
                  <div className="mt-7 flex flex-col gap-3 border-t border-line pt-5 text-[11px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
                    <p>Exclusively listed with Hedgerow Exclusive Properties</p>
                    <ListingLink listing={listing} className="link-line eyebrow text-ocean">
                      {listingPathByHedgerowUrl[listing.listingUrl] ? "View the property" : "Ask about this property"}
                    </ListingLink>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-14 text-[11px] leading-relaxed text-ink-faint">Listings courtesy of Hedgerow Exclusive Properties. Availability and pricing subject to change.</p>
        </div>
      </section>

      {/* II. Selected transactions: a curated grid inside the content width */}
      <section id="selected" className="defer-render pb-24 md:pb-36">
        <div className="frame mb-14 grid gap-8 border-t border-line pt-24 md:mb-20 md:grid-cols-12 md:items-end md:pt-36">
          <div className="md:col-span-8">
            <SectionLabel n="II">Sold</SectionLabel>
            <h2 data-reveal style={revealDelay(80)} className="display-2 mt-6">Selected transactions</h2>
          </div>
          <p data-reveal style={revealDelay(160)} className="text-[13px] leading-relaxed text-ink-muted md:col-span-4 md:text-right">
            Hedgerow transactions I have been involved in.
          </p>
        </div>
        <div className="frame flex flex-col gap-12 md:gap-14">
          {SELECTED_ROWS.map((row, r) => (
            <div key={r} className="grid gap-12 md:grid-cols-12 md:gap-6">
              {row.map(({ i, span }) => {
                const pick = selected[i];
                if (!pick) return null;
                const trio = row.length === 3;
                return (
                  <article key={pick.address} data-reveal style={revealDelay((i % 3) * 80)} className={`group flex flex-col ${span}`}>
                    <div className={`relative aspect-[4/3] overflow-hidden bg-ocean-deep md:aspect-auto ${trio ? "md:h-[360px]" : "md:h-[clamp(360px,30vw,440px)]"}`}>
                      <Image
                        src={pick.image}
                        alt={`${pick.address}, ${pick.deal.area}. Photo courtesy of Hedgerow Exclusive Properties`}
                        fill
                        quality={70}
                        style={{ objectPosition: pick.position }}
                        className="object-cover transition-transform duration-[2400ms] ease-[cubic-bezier(0.22,0.61,0.21,1)] group-hover:scale-[1.03] motion-reduce:transition-none"
                        sizes={trio ? "(max-width: 768px) 100vw, 33vw" : "(max-width: 768px) 100vw, 58vw"}
                      />
                      <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(10,20,24,0.8)_0%,rgba(10,20,24,0.4)_34%,rgba(10,20,24,0)_62%)]" />
                      <div className={`absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-5 text-paper md:p-7 ${trio ? "" : "md:flex-row md:items-end md:justify-between md:gap-4"}`}>
                        <h3 className={`font-serif font-light leading-[1.05] ${trio ? "text-[1.5rem] md:text-[1.7rem]" : "text-[1.6rem] md:text-[2.1rem]"}`}>{pick.address}</h3>
                        <p className={`shrink-0 font-serif font-light leading-none ${trio ? "text-[1.25rem] md:text-[1.4rem]" : "text-[1.35rem] md:text-[1.8rem]"}`}>{pick.price}</p>
                      </div>
                    </div>
                    <p className="eyebrow mt-5 text-ink-muted">
                      {pick.deal.area} · {pick.setting} · {pick.deal.dateText}
                    </p>
                    <p className="mt-2 text-[12px] font-medium uppercase tracking-[0.14em] text-ocean">{pick.deal.roleLabel || "A Hedgerow transaction"}</p>
                    <p className="mt-2 max-w-[56ch] text-[13.5px] leading-[1.75] text-ink-muted">{pick.blurb}</p>
                  </article>
                );
              })}
            </div>
          ))}
        </div>
      </section>

      {/* III. Hedgerow sales since 2021 */}
      <section id="sold" className="defer-render border-t border-line bg-paper-soft py-24 md:py-36">
        <div className="frame">
          <div className="mb-16 grid gap-8 md:mb-24 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <SectionLabel n="III">Sold, 2021 to 2026</SectionLabel>
              <h2 data-reveal style={revealDelay(80)} className="display-2 mt-6">Hedgerow sales</h2>
            </div>
            <p data-reveal style={revealDelay(160)} className="body-copy text-ink-muted md:col-span-4 md:col-start-9">
              {hedgerowSold2021.length} Hedgerow sales since 2021, newest first. Those marked with my name are trades Hedgerow and I were involved in.
            </p>
          </div>
          {GROUPS.map((group) => {
            const deals = hedgerowSold2021.filter((deal) => deal.group === group.key);
            if (!deals.length) return null;
            return (
              <div key={group.key} className="mb-24 last:mb-0">
                <div data-reveal className="mb-10 grid gap-4 border-b border-ink/80 pb-5 md:grid-cols-12 md:items-end">
                  <h3 className="display-3 font-light text-ink md:col-span-5">{group.label}</h3>
                  <p className="text-[13px] text-ink-muted md:col-span-5">
                    {group.note}
                    {group.key === "Oceanfront" ? (
                      <>
                        {" "}See also{" "}
                        <Link href={OCEANFRONT_ARTICLE} className="link-line text-ocean">
                          Hamptons Oceanfront, 2021 to 2026
                        </Link>
                        .
                      </>
                    ) : null}
                  </p>
                  <p className="eyebrow text-ink-faint md:col-span-2 md:text-right">{deals.length} sales</p>
                </div>
                <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
                  {deals.map((deal, i) => (
                    <SoldCard key={`${deal.address}-${deal.date}`} deal={deal} index={i} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* IV. The Hedgerow record */}
      <section id="firm-history" className="defer-render py-24 md:py-36">
        <div className="frame">
          <div className="mb-14 grid gap-8 md:grid-cols-12 md:items-end">
            <div className="md:col-span-7">
              <SectionLabel n="IV">The Hedgerow record</SectionLabel>
              <h2 data-reveal style={revealDelay(80)} className="display-2 mt-6">Prominent Hedgerow transactions</h2>
            </div>
            <p data-reveal style={revealDelay(160)} className="body-copy text-ink-muted md:col-span-4 md:col-start-9">
              {hedgerowFirmHistory.length} more transactions from Hedgerow&apos;s Prominent Deals, largest first.
            </p>
          </div>
          <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {hedgerowFirmHistory.map((deal, i) => (
              <SoldCard key={`${deal.address}-${deal.price}`} deal={deal} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ClosingInvitation
        n="V"
        label="Private inquiries"
        title="Looking for the right setting?"
        body="Confidential guidance for buyers and sellers across the East End, from Southampton to Montauk."
        cta="Start a conversation"
      />
    </div>
  );
}
