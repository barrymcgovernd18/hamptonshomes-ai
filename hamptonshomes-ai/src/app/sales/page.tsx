import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
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

function SoldCard({ deal }: { deal: HedgerowSoldDeal }) {
  return (
    <article className="flex flex-col border border-line bg-paper">
      {deal.image ? (
        <div className="relative aspect-[3/2] overflow-hidden bg-paper-deep">
          <Image src={deal.image} alt={deal.alt || `${deal.address}, ${deal.area}`} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw" />
        </div>
      ) : (
        <div className="flex aspect-[3/2] items-end bg-ocean-deep p-6">
          <p className="font-serif text-2xl leading-tight text-paper/85">{deal.address}</p>
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-ocean">{deal.area} · Sold {deal.dateText}</p>
        <h3 className="font-serif text-xl text-ink">{deal.address}</h3>
        {deal.price ? <p className="mt-3 font-serif text-xl text-ocean">{deal.price}</p> : null}
        <p className="mt-4 text-[11px] uppercase tracking-[0.2em] text-ink-muted">Hedgerow&apos;s role: {deal.hedgerowRole}</p>
        {deal.barryInvolved ? (
          <p className="mt-2 text-[12px] italic text-ink-muted">Barry McGovern was involved</p>
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
      <section className="border-b border-line bg-ocean-deep pt-32 pb-20 text-paper">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ocean-soft">Barry McGovern · Portfolio</p>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h1 className="font-serif text-5xl leading-tight md:text-7xl">Hedgerow <br /><span className="font-normal italic text-paper/65">Portfolio</span></h1>
              <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-paper/65">Current listings and sales from Hedgerow Exclusive Properties, the boutique firm I work with, including {involvedCount} trades Hedgerow and I have been involved in since 2021, 18 of them oceanfront.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-left md:text-right">
              <div><p className="font-serif text-2xl text-paper">{personalVolume}</p><p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-paper/70">Personal volume</p></div>
              <div><p className="font-serif text-2xl text-paper">{firmVolume}</p><p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-paper/70">{firmVolumeLabel}</p></div>
            </div>
          </div>
          <p className="mt-10 max-w-xl text-[12px] leading-relaxed text-paper/70">For the oceanfront market behind many of these trades, read <Link href={OCEANFRONT_ARTICLE} className="underline decoration-paper/30 underline-offset-4 hover:text-paper">Hamptons Oceanfront, 2021 to 2026</Link>.</p>
        </div>
      </section>

      <section id="listings" className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-ocean">Available now</p>
            <h2 className="font-serif text-4xl md:text-5xl">Exclusively listed with Hedgerow</h2>
          </div>
          <p className="max-w-xs text-[12px] leading-relaxed text-ink-muted md:text-right">
            {actives.length} residences for sale or in contract, offered exclusively through Hedgerow Exclusive Properties.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {actives.map((listing) => (
            <article key={listing.listingUrl} className="group flex flex-col border border-line bg-paper">
              <a href={listing.listingUrl} target="_blank" rel="noopener noreferrer" className="relative block aspect-[16/10] overflow-hidden bg-paper-deep">
                <Image
                  src={listing.image}
                  alt={listing.alt}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </a>
              <div className="flex flex-1 flex-col border-t border-line p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="mb-2 text-[10px] uppercase tracking-[0.25em] text-ocean">{listing.status} · {listing.area}</p>
                    <h3 className="font-serif text-2xl text-ink">{listing.address}</h3>
                    <p className="mt-2 text-[12px] text-ink-muted">
                      {[listing.beds && `${listing.beds} BD`, listing.baths && `${listing.baths} BA`, listing.sqft && `${listing.sqft} SF`, listing.acres && `${listing.acres} acres`]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  </div>
                  <p className="whitespace-nowrap font-serif text-xl text-ocean">{listing.price}</p>
                </div>
                <div className="mt-6 flex flex-col gap-2 border-t border-line pt-4 text-[11px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
                  <p>Exclusively listed with Hedgerow Exclusive Properties</p>
                  <a href={listing.listingUrl} target="_blank" rel="noopener noreferrer" className="uppercase tracking-[0.2em] text-ocean hover:text-ocean-deep">
                    View on Hedgerow
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-[11px] leading-relaxed text-ink-faint">Listings courtesy of Hedgerow Exclusive Properties. Availability and pricing subject to change.</p>
      </section>

      <section id="selected" className="mx-auto max-w-7xl px-6 pb-20 md:px-8 md:pb-28">
        <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-ocean">Sold</p>
            <h2 className="font-serif text-4xl md:text-5xl">Selected transactions</h2>
          </div>
          <p className="max-w-xs text-[12px] leading-relaxed text-ink-muted md:text-right">
            Hedgerow transactions I have been involved in.
          </p>
        </div>
        <div className="space-y-6">
          {featured.map((sale) => (
            <article key={sale.slug} className="group bg-ocean-deep">
              <div className="relative overflow-hidden">
                <div className="relative aspect-[16/10] md:aspect-[21/9]">
                  <Image
                    src={sale.image!}
                    alt={`${sale.address}, ${sale.area}`}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
                    sizes="100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/90 via-ocean-deep/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-paper md:p-10">
                    <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
                      <div>
                        <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-ocean-soft">{sale.area}</p>
                        <h3 className="font-serif text-2xl md:text-4xl">{sale.address}</h3>
                        <p className="mt-3 text-[12px] text-paper/55">
                          {sale.status}
                          {sale.sqft ? ` · ${sale.sqft} SF` : ""}
                          {sale.acres ? ` · ${sale.acres} acres` : ""}
                        </p>
                      </div>
                      <p className="font-serif text-2xl md:text-3xl">{sale.price}</p>
                    </div>
                  </div>
                </div>
              </div>
              {sale.blurb || sale.roleNote ? (
                <div className="border-t border-paper/10 bg-paper px-6 py-5 md:px-10 md:py-6">
                  {sale.roleNote ? (
                    <p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-ocean">{sale.roleNote}</p>
                  ) : null}
                  {sale.blurb ? <p className="max-w-3xl text-[14px] leading-relaxed text-ink-muted">{sale.blurb}</p> : null}
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <section id="sold" className="border-t border-line bg-paper-soft py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <div className="mb-14 max-w-3xl">
            <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-ocean">Sold, 2021 to 2026</p>
            <h2 className="font-serif text-4xl md:text-5xl">Hedgerow sales</h2>
            <p className="mt-6 text-[14px] leading-relaxed text-ink-muted">
              {hedgerowSold2021.length} Hedgerow sales since 2021, newest first. Those marked with my name are trades Hedgerow and I were involved in together.
            </p>
          </div>
          {GROUPS.map((group) => {
            const deals = hedgerowSold2021.filter((deal) => deal.group === group.key);
            if (!deals.length) return null;
            return (
              <div key={group.key} className="mb-20 last:mb-0">
                <div className="mb-8 flex items-end justify-between gap-6 border-b border-line pb-4">
                  <h3 className="font-serif text-3xl text-ink">{group.label}</h3>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-ink-faint">{deals.length} sales</p>
                </div>
                {group.key === "Oceanfront" ? (
                  <p className="-mt-4 mb-8 text-[13px] text-ink-muted">
                    {group.note} See also <Link href={OCEANFRONT_ARTICLE} className="text-ocean underline decoration-ocean/30 underline-offset-4">Hamptons Oceanfront, 2021 to 2026</Link>.
                  </p>
                ) : (
                  <p className="-mt-4 mb-8 text-[13px] text-ink-muted">{group.note}</p>
                )}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {deals.map((deal) => (
                    <SoldCard key={`${deal.address}-${deal.date}`} deal={deal} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section id="firm-history" className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="mb-10 max-w-3xl">
          <p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-ocean">The Hedgerow record</p>
          <h2 className="font-serif text-4xl md:text-5xl">Earlier Hedgerow transactions</h2>
          <p className="mt-6 text-[14px] leading-relaxed text-ink-muted">
            Prominent transactions from the Hedgerow record, including deals that closed before 2021.
          </p>
        </div>
        <div className="overflow-x-auto border border-line">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-line bg-paper-soft">
                {["Property", "Area", "Price", "Hedgerow's role", "Closed"].map((h) => (
                  <th key={h} className="whitespace-nowrap px-4 py-3 font-serif text-[12px] font-normal uppercase tracking-[0.12em] text-ink">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {hedgerowFirmHistory.map((deal) => (
                <tr key={`${deal.address}-${deal.price}`} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 text-[14px] text-ink">{deal.address}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-[13px] text-ink-muted">{deal.area}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-[13px] text-ink-muted">{deal.price}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-[13px] text-ink-muted">{deal.hedgerowRole}</td>
                  <td className="whitespace-nowrap px-4 py-3 text-[13px] text-ink-muted">{deal.dateText || "Undisclosed"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:px-8"><h2 className="font-serif text-3xl md:text-4xl">Looking for the right setting?</h2><p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink-muted">Barry offers confidential guidance for buyers and sellers across the East End, from Southampton to Montauk.</p><Link href="/contact" className="mt-8 inline-block bg-ocean px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] text-paper transition-colors hover:bg-ocean-deep">Start a conversation</Link></section>
    </div>
  );
}
