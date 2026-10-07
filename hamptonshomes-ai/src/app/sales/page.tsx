import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import InView from "@/components/InView";
import { ClosingInvitation, PageHero, SectionLabel, revealDelay } from "@/components/Editorial";
import { notableSales, personalVolume, firmVolume, firmVolumeLabel } from "@/lib/sales";
import {
  hedgerowActiveListings,
  hedgerowFirmHistory,
  hedgerowSold2021,
  type HedgerowGroup,
  type HedgerowSoldDeal,
} from "@/lib/portfolio";
import { activeListingsItemListJsonLd, routeMetadata, salesItemListJsonLd } from "@/lib/schema";
import { SALES_PAGE } from "@/lib/seo-copy";

export const metadata: Metadata = routeMetadata({
  title: SALES_PAGE.title,
  description: SALES_PAGE.description,
  path: "/sales",
});

const OCEANFRONT_ARTICLE = "/blog/hamptons-oceanfront-market-2021-2026";

const GROUPS: { key: HedgerowGroup; label: string; note: string }[] = [
  { key: "Oceanfront", label: "Oceanfront", note: "Oceanfront sales across the South Fork." },
  { key: "Waterfront", label: "Waterfront and bayfront", note: "Bay, pond, and harbor frontage." },
  { key: "Estate and village", label: "Estates, village, and other", note: "Estate section, farmland, village, and other Hedgerow sales." },
];

function salePriceValue(price: string) {
  return Number(price.replace(/[^0-9.]/g, ""));
}

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
        <p className="eyebrow text-ink-faint">{deal.area} · Sold {deal.dateText}</p>
        <div className="mt-3 flex items-baseline justify-between gap-4">
          <h4 className="font-serif text-[1.55rem] font-light leading-tight text-ink">{deal.address}</h4>
          {deal.price ? <p className="whitespace-nowrap font-serif text-[1.35rem] text-ocean">{deal.price}</p> : null}
        </div>
        <p className="mt-4 border-t border-line pt-4 text-[11px] uppercase tracking-[0.2em] text-ink-muted">Hedgerow&apos;s role: {deal.hedgerowRole}</p>
        {deal.barryInvolved ? (
          <p className="mt-2 font-serif text-[15px] italic text-ink-muted">Barry McGovern was involved</p>
        ) : null}
      </div>
    </article>
  );
}

export default function SalesPage() {
  const featured = [...notableSales]
    .filter((sale) => sale.image)
    .sort((a, b) => salePriceValue(b.price) - salePriceValue(a.price));
  const actives = [...hedgerowActiveListings].sort((a, b) => b.priceNum - a.priceNum);
  const involvedCount = hedgerowSold2021.filter((deal) => deal.barryInvolved).length;
  return (
    <div className="bg-paper text-ink">
      <JsonLd data={activeListingsItemListJsonLd(actives)} />
      <JsonLd data={salesItemListJsonLd(hedgerowSold2021)} />

      <PageHero
        eyebrow="Barry McGovern · Portfolio"
        title="Hedgerow"
        italic="Portfolio"
        image="/images/67-surfside.jpg"
        imageAlt="67 Surfside Drive, Bridgehampton, an oceanfront Hedgerow sale, in black and white"
        imagePosition="62% 55%"
        intro={
          <p>
            Current listings and sales from Hedgerow Exclusive Properties, the boutique firm I work with, including {involvedCount} trades Hedgerow and I have been involved in since 2021, 18 of them oceanfront.
          </p>
        }
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
        footer={
          <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:justify-between md:gap-10">
            <p className="text-[13px] leading-relaxed text-paper/80">
              For the oceanfront market behind many of these trades, read{" "}
              <Link href={OCEANFRONT_ARTICLE} className="link-line text-paper">
                Hamptons Oceanfront, 2021 to 2026
              </Link>
              .
            </p>
            <p className="eyebrow shrink-0 text-paper/70">Pictured: 67 Surfside Drive, Bridgehampton, a Hedgerow transaction</p>
          </div>
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
              <article key={listing.listingUrl} data-reveal style={revealDelay((i % 2) * 100)} className="group flex flex-col">
                <a href={listing.listingUrl} target="_blank" rel="noopener noreferrer" aria-label={listing.alt} className="relative block aspect-[16/11] overflow-hidden bg-paper-deep">
                  <InView>
                    <Image src={listing.image} alt={listing.alt} fill quality={50} className="photo-bw object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
                  </InView>
                </a>
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
                    <a href={listing.listingUrl} target="_blank" rel="noopener noreferrer" className="link-line eyebrow text-ocean">
                      View on Hedgerow
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-14 text-[11px] leading-relaxed text-ink-faint">Listings courtesy of Hedgerow Exclusive Properties. Availability and pricing subject to change.</p>
        </div>
      </section>

      {/* II. Selected transactions: full-bleed plates */}
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
        <div className="space-y-2">
          {featured.map((sale) => (
            <article key={sale.slug} className="group">
              <div data-reveal="image" className="relative aspect-[4/5] overflow-hidden bg-ocean-deep sm:aspect-[16/10] md:aspect-[21/9]">
                <Image src={sale.image!} alt={`${sale.address}, ${sale.area}`} fill quality={50} className="photo-bw object-cover" sizes="100vw" />
                <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top,rgba(12,24,29,0.85)_0%,rgba(12,24,29,0.35)_40%,rgba(12,24,29,0)_70%)]" />
                <div className="frame absolute inset-x-0 bottom-0 pb-8 text-paper md:pb-12">
                  <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                    <div>
                      <p className="eyebrow text-paper/80">{sale.area}</p>
                      <h3 className="display-2 mt-4 !text-[clamp(2.1rem,4vw,3.9rem)]">{sale.address}</h3>
                      <p className="mt-4 text-[12px] tracking-[0.04em] text-paper/80">
                        {sale.status}
                        {sale.sqft ? ` · ${sale.sqft} SF` : ""}
                        {sale.acres ? ` · ${sale.acres} acres` : ""}
                      </p>
                    </div>
                    <p className="font-serif text-[2rem] font-light md:text-[2.6rem]">{sale.price}</p>
                  </div>
                </div>
              </div>
              {sale.blurb || sale.roleNote ? (
                <div className="frame grid gap-4 py-8 md:grid-cols-12 md:py-10">
                  {sale.roleNote ? <p className="eyebrow text-ocean md:col-span-4">{sale.roleNote}</p> : null}
                  {sale.blurb ? <p className="body-copy text-ink-muted md:col-span-7 md:col-start-6">{sale.blurb}</p> : null}
                </div>
              ) : null}
            </article>
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
              {hedgerowSold2021.length} Hedgerow sales since 2021, newest first. Those marked with my name are trades Hedgerow and I were involved in together.
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
              <h2 data-reveal style={revealDelay(80)} className="display-2 mt-6">Earlier Hedgerow transactions</h2>
            </div>
            <p data-reveal style={revealDelay(160)} className="body-copy text-ink-muted md:col-span-4 md:col-start-9">
              Prominent transactions from the Hedgerow record, including deals that closed before 2021.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] border-t border-ink/80 text-left">
              <thead>
                <tr className="border-b border-line">
                  {["Property", "Area", "Price", "Hedgerow's role", "Closed"].map((h) => (
                    <th key={h} className="eyebrow whitespace-nowrap px-4 py-4 font-medium text-ink first:pl-0">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hedgerowFirmHistory.map((deal) => (
                  <tr key={`${deal.address}-${deal.price}`} className="border-b border-line transition-colors duration-300 hover:bg-paper-soft">
                    <td className="py-4 pl-0 pr-4 font-serif text-[1.2rem] text-ink">{deal.address}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-[13px] text-ink-muted">{deal.area}</td>
                    <td className="whitespace-nowrap px-4 py-4 font-serif text-[1.1rem] text-ocean">{deal.price}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-[13px] text-ink-muted">{deal.hedgerowRole}</td>
                    <td className="whitespace-nowrap px-4 py-4 text-[13px] text-ink-muted">{deal.dateText || "Undisclosed"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <ClosingInvitation
        n="V"
        label="Private inquiries"
        title="Looking for the right setting?"
        body="Barry offers confidential guidance for buyers and sellers across the East End, from Southampton to Montauk."
        cta="Start a conversation"
      />
    </div>
  );
}
