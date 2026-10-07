import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areas } from "@/lib/areas";
import { getTownComps } from "@/lib/comps";
import { notableSales } from "@/lib/sales";
import { postsByDate } from "@/lib/blog";
import JsonLd from "@/components/JsonLd";
import { ClosingInvitation, PageHero, SectionLabel, revealDelay } from "@/components/Editorial";
import { BARRY_BLURB, breadcrumbListJsonLd, placeJsonLd, routeMetadata } from "@/lib/schema";

 type Props = { params: Promise<{ area: string }> };

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
              <dd className="mt-2 font-serif text-[1.6rem] font-light text-paper">{area.priceRange}</dd>
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
            <p data-reveal className="lede text-ink">{area.editorial || area.description}</p>
            {area.editorial && (
              <p data-reveal style={revealDelay(100)} className="body-copy mt-10 border-t border-line pt-8 text-ink-muted md:ml-[25%]">
                {area.description}
              </p>
            )}
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
            <SectionLabel n={nextNumeral()}>What Makes {area.name} Special</SectionLabel>
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
            <SectionLabel n={nextNumeral()}>Hedgerow sales in {area.name}</SectionLabel>
            <div className="mt-12 grid border-t border-ink/80 md:grid-cols-2">
              {areaSales.map((sale, i) => (
                <div key={sale.slug} data-reveal style={revealDelay((i % 2) * 80)} className={`border-b border-line py-8 ${i % 2 ? "md:border-l md:pl-10" : "md:pr-10"}`}>
                  <p className="font-serif text-[2rem] font-light leading-none text-ocean">{sale.price}</p>
                  <p className="mt-4 font-serif text-[1.3rem] text-ink">{sale.address}, {sale.area}</p>
                  <p className="mt-1 text-[13px] text-ink-faint">{sale.status}</p>
                  <p className="mt-1 text-[12px] tracking-[0.04em] text-ink-faint">{sale.beds} BD · {sale.baths} BA · {sale.sqft} SF · {sale.acres} AC</p>
                </div>
              ))}
            </div>
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
              <Link href="/market" className="link-line eyebrow mt-8 inline-block text-ocean">All market research <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>
      )}

      <ClosingInvitation
        n={nextNumeral()}
        label={`Your ${area.name} Specialist`}
        title={`Looking to Buy or Sell in ${area.name}?`}
        body={`As an oceanfront and waterfront specialist at Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage, Barry offers access to on-market and off-market opportunities across ${area.name} and the entire East End.`}
        cta={`Inquire about ${area.name}`}
      />

      <section className="bg-paper-deep pb-12">
        <div className="frame border-t border-line pt-8">
          <p className="max-w-2xl text-[11px] leading-relaxed text-ink-faint">{BARRY_BLURB} Serving {area.name} and the East End from Southampton to Montauk.</p>
        </div>
      </section>
    </div>
  );
}
