import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areas } from "@/lib/areas";
import { getTownComps } from "@/lib/comps";
import { formatSaleStatus, notableSales } from "@/lib/sales";
import { OCEANFRONT_BY_VILLAGE, OCEANFRONT_STUDY_PATH, OCEANFRONT_STUDY_TITLE, formatMillions } from "@/lib/oceanfront";
import { postsByDate } from "@/lib/blog";
import JsonLd from "@/components/JsonLd";
import { ClosingInvitation, PageHero, SectionLabel, revealDelay } from "@/components/Editorial";
import { OG_VILLAGES } from "@/lib/og-images";
import { BARRY_BLURB, breadcrumbListJsonLd, placeJsonLd, routeMetadata } from "@/lib/schema";

type Props = { params: Promise<{ area: string }> };

/** First sentence as the lede, the rest as body copy, so the overview never becomes a wall of display type. */
function splitLede(text: string) {
  const m = /^([^]+?[.!?])\s+([^]+)$/.exec(text.trim());
  return m ? { lede: m[1], rest: m[2] } : { lede: text, rest: "" };
}

const briefSlugs = new Set(["sag-harbor", "southampton", "east-hampton"]);

function formatPrice(price: number) {
  return `$${price.toLocaleString("en-US")}`;
}

function formatDate(date: string | null) {
  if (!date) return "Undisclosed";
  const parsed = new Date(`${date}T12:00:00Z`);
  return Number.isNaN(parsed.getTime())
    ? "Undisclosed"
    : new Intl.DateTimeFormat("en-US", { month: "short", year: "numeric", timeZone: "UTC" }).format(parsed);
}

function formatMarket(market: string | null) {
  const labels: Record<string, string> = {
    oceanfront: "Oceanfront",
    waterfront_soh: "Waterfront · South of the Highway",
    southampton_soh: "South of the Highway",
    southampton_noh: "North of the Highway",
    sag_harbor: "Sag Harbor village market",
    east_hampton_soh: "East Hampton · South of the Highway",
    eh_village_fringe: "East Hampton village fringe",
  };
  return market ? labels[market] || market.replace(/_/g, " ") : "Hamptons market record";
}

export function generateStaticParams() {
  return areas.map((a) => ({ area: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { area: slug } = await params;
  const area = areas.find((a) => a.slug === slug);
  if (!area) return {};
  const title = `${area.name} Real Estate`;
  const description =
    area.metaDescription ||
    `${area.name} luxury real estate. Oceanfront estates, waterfront properties, and off-market opportunities with Barry McGovern, Licensed Real Estate Salesperson at Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage.`;
  return routeMetadata({
    title,
    description,
    path: `/${area.slug}`,
    image: OG_VILLAGES.includes(area.slug) ? `/og/village/${area.slug}.jpg` : undefined,
  });
}

export default async function AreaPage({ params }: Props) {
  const { area: slug } = await params;
  const area = areas.find((a) => a.slug === slug);
  if (!area) notFound();

  const isBrief = briefSlugs.has(slug);
  const townComps = isBrief ? await getTownComps(area.name) : null;
  const areaPosts = postsByDate
    .filter((post) => post.about?.includes(area.name as never) || `${post.title} ${post.slug.replace(/-/g, " ")}`.toLowerCase().includes(area.name.toLowerCase()))
    .slice(0, 4);
  const areaSales = notableSales.filter(
    (s) => s.area.toLowerCase().replace(/\s+/g, "-") === slug
  );

  const overview = splitLede(area.editorial || area.description);
  const oceanfront = OCEANFRONT_BY_VILLAGE.find((v) => v.slug === slug);

  const numerals = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];
  let section = 0;
  const nextNumeral = () => numerals[section++];

  return (
    <div className="bg-paper text-ink">
      <JsonLd data={placeJsonLd(area)} />
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: area.name, path: `/${area.slug}` },
        ])}
      />

      <PageHero
        compact={!area.heroImage}
        eyebrow={`${area.name} Real Estate`}
        title={area.name}
        image={area.heroImage}
        imageAlt={`${area.name} luxury real estate`}
        intro={<p className="font-serif text-[clamp(1.45rem,2.2vw,2rem)] font-light italic leading-[1.3] text-paper/90">{area.tagline}</p>}
        footer={
          <dl className="grid gap-8 sm:grid-cols-[auto_auto_1fr] sm:gap-16">
            <div className="flex flex-col-reverse">
              <dd className="mt-2 font-serif text-[1.6rem] font-light text-paper">{area.priceRange.replace(/\s*-\s*/, " to ")}</dd>
              <dt className="eyebrow text-paper/75">Price Range</dt>
            </div>
            <div className="flex flex-col-reverse">
              <dd className="mt-2 font-serif text-[1.6rem] font-light text-paper">{area.zipCode}</dd>
              <dt className="eyebrow text-paper/75">Zip Code</dt>
            </div>
            <div className="flex flex-col-reverse">
              <dd className="mt-2 max-w-md text-[14px] leading-relaxed text-paper/85">{area.vibe}</dd>
              <dt className="eyebrow text-paper/75">Character</dt>
            </div>
          </dl>
        }
      />

      <section className="py-24 md:py-36">
        <div className="frame grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <SectionLabel n={nextNumeral()}>Overview</SectionLabel>
          </div>
          <div className="md:col-span-9 lg:col-span-8">
            <p data-reveal className="lede text-ink">{overview.lede}</p>
            <div data-reveal style={revealDelay(100)} className="mt-10 grid gap-8 border-t border-line pt-8 md:ml-[25%]">
              {overview.rest ? <p className="body-copy text-ink-muted">{overview.rest}</p> : null}
              {area.editorial ? <p className="body-copy text-ink-muted">{area.description}</p> : null}
            </div>
          </div>
        </div>
      </section>

      {isBrief && area.marketBrief && (
        <section className="border-y border-line bg-paper-soft py-24 md:py-36">
          <div className="frame grid gap-12 md:grid-cols-12">
            <div className="md:col-span-4">
              <SectionLabel n={nextNumeral()}>A closer read</SectionLabel>
              <h2 data-reveal style={revealDelay(80)} className="display-2 mt-6 text-ink">How {area.name} is moving</h2>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p data-reveal className="text-[17px] leading-[1.85] text-ink-muted">{area.marketBrief}</p>
              <div className="mt-12 grid gap-10 border-t border-ink/80 pt-8 md:grid-cols-2">
                <div data-reveal style={revealDelay(80)}>
                  <p className="eyebrow text-ocean">Buyer lens</p>
                  <p className="mt-4 text-[15px] leading-[1.8] text-ink-muted">{area.buyerLens}</p>
                </div>
                <div data-reveal style={revealDelay(160)}>
                  <p className="eyebrow text-ocean">Seller lens</p>
                  <p className="mt-4 text-[15px] leading-[1.8] text-ink-muted">{area.sellerLens}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-24 md:py-36">
        <div className="frame grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <SectionLabel n={nextNumeral()}>What makes {area.name} special</SectionLabel>
          </div>
          <ol className="border-t border-ink/80 md:col-span-9">
            {area.highlights.map((h, i) => (
              <li key={i} data-reveal style={revealDelay((i % 4) * 60)} className="grid grid-cols-[3rem_1fr] items-baseline gap-4 border-b border-line py-6">
                <span className="font-serif text-[1.4rem] font-light text-ocean">{String(i + 1).padStart(2, "0")}</span>
                <p className="font-serif text-[1.45rem] font-light leading-[1.35] text-ink">{h}</p>
              </li>
            ))}
          </ol>
          <div className="md:col-span-9 md:col-start-4">
            <p data-reveal className="eyebrow mt-8 text-ink-faint">Beaches</p>
            <ul data-reveal style={revealDelay(80)} className="mt-5 flex flex-wrap gap-x-3 gap-y-2 font-serif text-[1.3rem] italic text-ink-muted">
              {area.beaches.map((b, i) => (
                <li key={b}>
                  {b}
                  {i < area.beaches.length - 1 ? <span aria-hidden="true" className="ml-3 not-italic text-line">/</span> : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {oceanfront && (
        <section aria-labelledby="oceanfront-heading" className="bg-ocean-deep py-24 text-paper md:py-32">
          <div className="frame">
            <div className="grid gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-7">
                <SectionLabel n={nextNumeral()} className="text-paper/75">Oceanfront, 2021 to 2026</SectionLabel>
                <h2 id="oceanfront-heading" data-reveal style={revealDelay(80)} className="display-2 mt-6">
                  {area.name} <em className="italic text-paper/80">on the ocean</em>
                </h2>
              </div>
              <p data-reveal style={revealDelay(160)} className="text-[14px] leading-relaxed text-paper/80 md:col-span-4 md:col-start-9">
                {area.name} recorded {oceanfront.sales} oceanfront sales from January 2021 to early October 2026, at a median of {formatMillions(oceanfront.median)}.
              </p>
            </div>
            <dl className="mt-14 grid grid-cols-2 border-t border-paper/20 lg:grid-cols-4">
              {[
                { k: "Oceanfront sales", v: String(oceanfront.sales) },
                { k: "Median price", v: formatMillions(oceanfront.median) },
                { k: "Range", v: oceanfront.range },
                { k: "Notable sale", v: oceanfront.notable },
              ].map((item, i) => (
                <div key={item.k} data-reveal style={revealDelay(i * 80)} className={`flex flex-col-reverse justify-end gap-3 border-b border-paper/15 py-8 lg:border-b-0 ${i % 2 ? "border-l pl-5 lg:pl-8" : "pr-5 lg:pr-8"} ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}>
                  <dt className="eyebrow text-paper/70">{item.k}</dt>
                  <dd className={`font-serif font-light leading-[1.15] ${i < 2 ? "text-[2.4rem] md:text-[3rem]" : "text-[1.3rem] md:text-[1.5rem]"}`}>{item.v}</dd>
                </div>
              ))}
            </dl>
            <Link href={OCEANFRONT_STUDY_PATH} className="link-line eyebrow mt-12 inline-block text-paper">
              Read {OCEANFRONT_STUDY_TITLE} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
      )}

      {townComps && townComps.comps.length > 0 && (
        <section className="border-t border-line py-24 md:py-36">
          <div className="frame">
            <div className="mb-14 grid gap-8 md:grid-cols-12 md:items-end">
              <div className="md:col-span-8">
                <SectionLabel n={nextNumeral()}>Recent comparable sales</SectionLabel>
                <h2 data-reveal style={revealDelay(80)} className="display-2 mt-6 text-ink">The local evidence</h2>
              </div>
              <p data-reveal style={revealDelay(160)} className="text-[12px] leading-relaxed text-ink-faint md:col-span-4 md:text-right">
                Recorded sales, compiled by Barry McGovern.
              </p>
            </div>
            <div className="grid border-t border-ink/80 md:grid-cols-2">
              {townComps.comps.map((comp, i) => {
                const details = [
                  comp.beds !== null ? `${comp.beds} BD` : null,
                  comp.baths !== null ? `${comp.baths} BA` : null,
                  comp.sqft !== null ? `${comp.sqft.toLocaleString("en-US")} SF` : null,
                  comp.lotAcres !== null ? `${comp.lotAcres} AC` : null,
                ].filter(Boolean).join(" · ");
                return (
                  <div
                    key={`${comp.address}-${comp.soldDate}`}
                    data-reveal
                    style={revealDelay((i % 2) * 80)}
                    className={`border-b border-line py-8 transition-colors duration-500 hover:bg-paper-soft ${i % 2 ? "md:border-l md:pl-10" : "md:pr-10"}`}
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="font-serif text-[2rem] font-light leading-none text-ocean">{formatPrice(comp.soldPrice)}</p>
                      <p className="eyebrow text-ink-faint">{formatDate(comp.soldDate)}</p>
                    </div>
                    <p className="mt-4 font-serif text-[1.3rem] text-ink">{comp.address}</p>
                    <p className="mt-1 text-[13px] text-ink-faint">{formatMarket(comp.microMarket)}</p>
                    {details && <p className="mt-3 text-[12px] tracking-[0.04em] text-ink-faint">{details}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {!isBrief && areaSales.length > 0 && (
        <section className="border-t border-line py-24 md:py-36">
          <div className="frame">
            <SectionLabel n={nextNumeral()}>Hedgerow sales {area.slug === "shelter-island" ? "on" : "in"} {area.name}</SectionLabel>
            <div className="mt-12 grid border-t border-ink/80 md:grid-cols-2">
              {areaSales.map((sale, i) => (
                <div key={sale.slug} data-reveal style={revealDelay((i % 2) * 80)} className={`border-b border-line py-8 ${i % 2 ? "md:border-l md:pl-10" : "md:pr-10"}`}>
                  <p className="font-serif text-[2rem] font-light leading-none text-ocean">{sale.price}</p>
                  <p className="mt-4 font-serif text-[1.3rem] text-ink">{sale.address}, {sale.area}</p>
                  <p className="mt-1 text-[13px] text-ink-faint">{formatSaleStatus(sale.status)}{sale.roleNote ? ` · ${sale.roleNote}` : ""}</p>
                  {[sale.beds && `${sale.beds} BD`, sale.baths && `${sale.baths} BA`, sale.sqft && `${sale.sqft} SF`, sale.acres && `${sale.acres} AC`].filter(Boolean).length ? (
                    <p className="mt-1 text-[12px] tracking-[0.04em] text-ink-faint">
                      {[sale.beds && `${sale.beds} BD`, sale.baths && `${sale.baths} BA`, sale.sqft && `${sale.sqft} SF`, sale.acres && `${sale.acres} AC`].filter(Boolean).join(" · ")}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
            <Link href="/sales" className="link-line eyebrow mt-10 inline-block text-ocean">The full Hedgerow portfolio <span aria-hidden="true">→</span></Link>
          </div>
        </section>
      )}

      {areaPosts.length > 0 && (
        <section className="border-t border-line bg-paper-soft py-24 md:py-36">
          <div className="frame grid gap-12 md:grid-cols-12">
            <div className="md:col-span-3">
              <SectionLabel n={nextNumeral()}>Research on {area.name}</SectionLabel>
            </div>
            <div className="md:col-span-9">
              <ul className="border-t border-ink/80">
                {areaPosts.map((post, i) => (
                  <li key={post.slug} data-reveal style={revealDelay(i * 60)} className="border-b border-line">
                    <Link href={`/blog/${post.slug}`} className="group flex flex-col gap-2 py-6 md:flex-row md:items-baseline md:justify-between md:gap-8">
                      <span className="font-serif text-[1.5rem] font-light leading-snug text-ink transition-colors duration-500 group-hover:text-ocean">{post.title}</span>
                      <span className="eyebrow shrink-0 text-ink-faint">{post.category}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/market" className="link-line eyebrow mt-8 inline-block text-ocean">All market research <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </section>
      )}

      <ClosingInvitation
        n={nextNumeral()}
        label="Private inquiries"
        title={`Buying or selling ${area.slug === "shelter-island" ? "on" : "in"} ${area.name}?`}
        body={`Confidential guidance on ${area.name} and the wider East End, including on-market and off-market opportunities, from an oceanfront and waterfront specialist at Hedgerow Exclusive Properties.`}
        cta={`Inquire about ${area.name}`}
      />

      <section className="bg-paper-deep pb-14">
        <div className="frame border-t border-line pt-8">
          <p className="max-w-3xl text-[12.5px] leading-relaxed text-ink-muted">
            {BARRY_BLURB}{" "}
            <Link href="/about" className="link-line text-ink">About Barry</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
