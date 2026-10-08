import Image from "next/image";
import Link from "next/link";
import InView from "@/components/InView";
import { hedgerowFirmHistory, hedgerowSold2021, type HedgerowSoldDeal } from "@/lib/portfolio";

/** High-resolution Hedgerow photography for the homepage showcase, keyed by address. */
const PHOTOS: Record<string, { src: string; position?: string }> = {
  "70 & 71 Cobb Lane": { src: "/images/trades/70-71-cobb-lane-water-mill.jpg", position: "50% 60%" },
  "90 Jule Pond Drive": { src: "/images/trades/90-jule-pond-drive-water-mill.jpg", position: "50% 55%" },
  "43 East Dune Lane": { src: "/images/43-east-dune-lane.jpg", position: "50% 62%" },
  "1080 & 1100 Meadow Lane": { src: "/images/trades/1080-1100-meadow-lane-southampton.jpg", position: "38% 60%" },
  "165 Surfside Drive": { src: "/images/trades/165-surfside-drive-bridgehampton.jpg", position: "50% 52%" },
  "442 Further Lane": { src: "/images/trades/442-further-lane-east-hampton.jpg", position: "46% 55%" },
  "35 Potato Road & 543 Daniels Lane": { src: "/images/trades/35-potato-road-543-daniels-lane-sagaponack.jpg", position: "50% 58%" },
  "55 Dunes Lane": { src: "/images/trades/55-dunes-lane-amagansett.jpg", position: "42% 50%" },
  "40 Meadow Lane": { src: "/images/trades/40-meadow-lane-southampton.jpg", position: "40% 50%" },
  "93, 97, 101 Lily Pond Lane": { src: "/images/trades/93-97-101-lily-pond-lane-east-hampton.jpg", position: "50% 55%" },
  "278 Further Lane": { src: "/images/trades/278-further-lane-east-hampton.jpg", position: "50% 55%" },
  "Lily Pond Compound": { src: "/images/trades/lily-pond-compound-east-hampton.jpg", position: "50% 50%" },
  "70 Further Lane": { src: "/images/trades/70-further-lane-east-hampton.jpg", position: "50% 55%" },
  "616 & 640 Ox Pasture": { src: "/images/trades/616-640-ox-pasture-southampton.jpg", position: "50% 55%" },
  "125 Mid Ocean Drive": { src: "/images/trades/125-mid-ocean-drive-bridgehampton.jpg", position: "50% 55%" },
};

type Trade = HedgerowSoldDeal & { photo: { src: string; position?: string }; label?: string };

/** Homepage lead: the firm's largest trade, 2021, at the price Hedgerow publishes. */
const LEAD_TRADE: HedgerowSoldDeal & { label: string } = {
  address: "70 & 71 Cobb Lane",
  area: "Water Mill",
  price: "$121,500,000",
  priceNum: 121500000,
  date: "2021",
  dateText: "2021",
  hedgerowRole: "Both sides",
  roleLabel: "Hedgerow represented both sides",
  group: "Waterfront",
  label: "The firm's largest trade",
};

/** East End trades only: the Manhattan penthouse stays on /sales. */
const EAST_END = (deal: HedgerowSoldDeal) => deal.area !== "New York, NY";

/** The lead trade, then the firm's largest East End trades from the full Hedgerow record, largest first. */
function largestTrades(limit = 11): Trade[] {
  const deals = [...hedgerowSold2021, ...hedgerowFirmHistory]
    .filter((deal) => EAST_END(deal) && deal.priceNum > 0 && deal.address !== LEAD_TRADE.address)
    .sort((a, b) => b.priceNum - a.priceNum)
    .filter((deal) => PHOTOS[deal.address])
    .slice(0, limit);
  return [LEAD_TRADE, ...deals].map((deal) => ({ ...deal, photo: PHOTOS[deal.address] }));
}

function Panel({ trade, index, sizes, className, large = false, compact = false }: { trade: Trade; index: number; sizes: string; className: string; large?: boolean; compact?: boolean }) {
  return (
    <Link href="/sales#sold" className={`group relative block overflow-hidden bg-ocean-deep ${className}`}>
      {/* Mounted near the viewport only, so the gallery never competes with the hero on first load. */}
      <InView margin="200px">
        <Image
          src={trade.photo.src}
          alt={`${trade.address}, ${trade.area}. Photo courtesy of Hedgerow Exclusive Properties`}
          fill
          quality={75}
          sizes={sizes}
          style={{ objectPosition: trade.photo.position }}
          className="object-cover transition-transform duration-[2400ms] ease-[cubic-bezier(0.22,0.61,0.21,1)] group-hover:scale-[1.035] motion-reduce:transition-none"
        />
      </InView>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgba(10,20,24,0.82)_0%,rgba(10,20,24,0.5)_32%,rgba(10,20,24,0)_62%)]" />
      {trade.label && <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-[rgba(10,20,24,0.55)] to-transparent md:h-48" />}
      <span aria-hidden="true" className="eyebrow absolute left-5 top-5 text-paper/85 [text-shadow:0_1px_10px_rgba(0,0,0,0.35)] md:left-8 md:top-8">
        {String(index + 1).padStart(2, "0")}
        {trade.label && <span className="ml-4 border-l border-paper/40 pl-4">{trade.label}</span>}
      </span>
      <div className={`absolute inset-x-0 bottom-0 flex flex-col gap-2.5 p-4 sm:gap-4 sm:p-5 md:p-8 ${compact ? "" : "sm:flex-row sm:items-end sm:justify-between sm:gap-8 lg:p-10"}`}>
        <div>
          <p className="eyebrow text-paper/85">
            {trade.area}
            {trade.dateText ? ` · ${trade.dateText}` : ""}
          </p>
          <h3 className={`mt-1.5 sm:mt-2.5 font-serif font-light leading-[1.04] text-paper ${large ? "text-[1.5rem] sm:text-[1.85rem] md:text-[2.4rem] lg:text-[2.8rem]" : "text-[1.4rem] sm:text-[1.75rem] md:text-[2rem] lg:text-[2.35rem]"}`}>
            {trade.address}
          </h3>
        </div>
        <div className={`flex shrink-0 flex-wrap items-baseline gap-x-4 gap-y-1 sm:gap-y-1.5 ${compact ? "" : "sm:block sm:max-w-[15rem] sm:text-right lg:max-w-[17rem]"}`}>
          <p className={`font-serif font-light leading-none text-paper ${large ? "text-[1.2rem] sm:text-[1.5rem] md:text-[2rem] lg:text-[2.4rem]" : "text-[1.15rem] sm:text-[1.5rem] md:text-[1.8rem] lg:text-[2.05rem]"}`}>
            {trade.price}
          </p>
          <p className={`eyebrow text-paper/80 ${compact ? "" : "sm:mt-2.5"}`}>{trade.roleLabel || "A Hedgerow transaction"}</p>
        </div>
      </div>
    </Link>
  );
}

const PAIR_ROW = "grid gap-1.5 md:h-[32vw] md:max-h-[440px] md:grid-cols-12";
const PAIR_CELL = "aspect-[4/3] md:aspect-auto md:h-full";
const SPAN = {
  5: { col: "md:col-span-5", sizes: "(max-width: 768px) 100vw, 42vw" },
  6: { col: "md:col-span-6", sizes: "(max-width: 768px) 100vw, 50vw" },
  7: { col: "md:col-span-7", sizes: "(max-width: 768px) 100vw, 58vw" },
} as const;
const TRIO_ROW = "grid gap-1.5 md:h-[26vw] md:max-h-[360px] md:grid-cols-3";
const TRIO_CELL = "aspect-[4/3] md:aspect-auto md:h-full";
type Span = keyof typeof SPAN;
const FULL = "aspect-[4/3] md:aspect-auto md:h-[58vh] md:min-h-[400px] md:max-h-[560px]";

export default function TradesShowcase() {
  const [t1, t2, t3, t4, t5, t6, t7, t8, t9, t10, t11, t12] = largestTrades();
  const pair = (left: Trade | undefined, right: Trade | undefined, i: number, leftSpan: Span, rightSpan: Span) =>
    left && (
      <div className={PAIR_ROW}>
        <Panel trade={left} index={i} sizes={SPAN[leftSpan].sizes} className={`${PAIR_CELL} ${SPAN[leftSpan].col}`} />
        {right && <Panel trade={right} index={i + 1} sizes={SPAN[rightSpan].sizes} className={`${PAIR_CELL} ${SPAN[rightSpan].col}`} />}
      </div>
    );

  return (
    <section aria-labelledby="trades-heading" className="bg-paper">
      <div className="frame grid gap-6 py-16 md:grid-cols-12 md:items-end md:py-24">
        <div className="md:col-span-8">
          <p data-reveal className="eyebrow text-ocean">I. &nbsp;The trades</p>
          <h2 id="trades-heading" data-reveal className="display-2 mt-5 text-balance text-ink">
            The largest trades, <em className="italic text-ink-muted">by price</em>
          </h2>
        </div>
        <p data-reveal className="body-copy text-balance text-ink-muted md:col-span-4 md:text-right">
          The largest sales by Hedgerow Exclusive Properties.
        </p>
      </div>

      <div className="frame flex flex-col gap-1.5">
        {t1 && <Panel trade={t1} index={0} large sizes="(max-width: 1440px) 100vw, 1360px" className={FULL} />}
        {pair(t2, t3, 1, 7, 5)}
        {t4 && <Panel trade={t4} index={3} large sizes="(max-width: 1440px) 100vw, 1360px" className={FULL} />}
        {pair(t5, t6, 4, 5, 7)}
        {t7 && (
          <div className={TRIO_ROW}>
            {[t7, t8, t9].map((trade, i) =>
              trade ? <Panel key={trade.address} trade={trade} index={6 + i} compact sizes="(max-width: 768px) 100vw, 33vw" className={TRIO_CELL} /> : null,
            )}
          </div>
        )}
        {t10 && (
          <div className={TRIO_ROW}>
            {[t10, t11, t12].map((trade, i) =>
              trade ? <Panel key={trade.address} trade={trade} index={9 + i} compact sizes="(max-width: 768px) 100vw, 33vw" className={TRIO_CELL} /> : null,
            )}
          </div>
        )}
      </div>

      <div className="frame flex justify-center py-14 md:py-20">
        <Link href="/sales" className="eyebrow link-line text-ink">View the full portfolio</Link>
      </div>
    </section>
  );
}
