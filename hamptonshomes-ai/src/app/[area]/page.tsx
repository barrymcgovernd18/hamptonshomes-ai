import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { areas } from "@/lib/areas";
import { getTownComps } from "@/lib/comps";
import { notableSales } from "@/lib/sales";
import JsonLd from "@/components/JsonLd";
import { placeJsonLd } from "@/lib/schema";

 type Props = { params: Promise<{ area: string }> };

const briefSlugs = new Set(["sag-harbor", "southampton", "east-hampton"]);

function formatPrice(price: number) {
  return `$${price.toLocaleString("en-US")}`;
}

function formatDate(date: string | null) {
  if (!date) return "Date not reported";
  const parsed = new Date(`${date}T12:00:00Z`);
  return Number.isNaN(parsed.getTime())
    ? "Date not reported"
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
  return {
    title: `${area.name} Real Estate | Oceanfront & Waterfront Specialist`,
    description:
      area.editorial || `${area.name} luxury real estate. Oceanfront estates, waterfront properties, and off-market opportunities. Barry McGovern at Hedgerow Exclusive Properties, the #1 ranked Hamptons firm.`,
    alternates: { canonical: `https://hamptonshomes.ai/${area.slug}` },
    openGraph: {
      title: `${area.name} Luxury Real Estate | Barry McGovern`,
      description: area.editorial || `Oceanfront and waterfront specialist in ${area.name}. Hedgerow Exclusive Properties, nearly $2B in Hamptons transactions.`,
    },
  };
}

export default async function AreaPage({ params }: Props) {
  const { area: slug } = await params;
  const area = areas.find((a) => a.slug === slug);
  if (!area) notFound();

  const isBrief = briefSlugs.has(slug);
  const townComps = isBrief ? await getTownComps(area.name) : null;
  const areaSales = notableSales.filter(
    (s) => s.area.toLowerCase().replace(/\s+/g, "-") === slug
  );

  return (
    <div className="bg-paper">
      <JsonLd data={placeJsonLd(area)} />
      <section className="pt-32 pb-20">
        <div className={`max-w-7xl mx-auto px-8 ${area.heroImage ? "grid md:grid-cols-[1fr_0.9fr] gap-14 items-end" : ""}`}>
          <div>
            <p className="text-ocean/70 text-[10px] tracking-[0.5em] uppercase mb-4">
              {area.name} Real Estate
            </p>
            <h1 className="font-serif text-5xl md:text-7xl text-ink leading-tight">
              {area.name}
            </h1>
            <p className="font-serif text-2xl md:text-3xl text-ink-muted italic mt-2">
              {area.tagline}
            </p>
          </div>
          {area.heroImage && (
            <div className="relative aspect-[4/3] overflow-hidden bg-white/5">
              <Image
                src={area.heroImage}
                alt={`${area.name} luxury real estate`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 45vw"
                className="object-cover opacity-80"
              />
            </div>
          )}
        </div>
      </section>

      <section className="border-y border-line py-8">
        <div className="max-w-7xl mx-auto px-8 flex flex-wrap gap-12 md:gap-20">
          <div>
            <p className="text-ocean text-[10px] tracking-[0.3em] uppercase mb-1">Price Range</p>
            <p className="font-serif text-xl text-ink">{area.priceRange}</p>
          </div>
          <div>
            <p className="text-ocean text-[10px] tracking-[0.3em] uppercase mb-1">Zip Code</p>
            <p className="font-serif text-xl text-ink">{area.zipCode}</p>
          </div>
          <div>
            <p className="text-ocean text-[10px] tracking-[0.3em] uppercase mb-1">Character</p>
            <p className="text-ink-muted text-sm max-w-xs">{area.vibe}</p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="max-w-3xl">
            <p className="text-ink-muted text-lg leading-[1.9]">{area.editorial || area.description}</p>
            {area.editorial && <p className="text-ink-faint text-[15px] leading-[1.9] mt-6">{area.description}</p>}
          </div>
        </div>
      </section>

      {isBrief && area.marketBrief && (
        <section className="border-y border-line py-20">
          <div className="max-w-7xl mx-auto px-8 grid lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-24">
            <div>
              <p className="text-ocean/70 text-[10px] tracking-[0.5em] uppercase mb-5">A closer read</p>
              <h2 className="font-serif text-3xl md:text-4xl text-ink leading-tight">How {area.name} is moving</h2>
            </div>
            <div>
              <p className="text-ink-muted text-[16px] leading-[1.9]">{area.marketBrief}</p>
              <div className="grid md:grid-cols-2 gap-8 mt-10 pt-8 border-t border-line">
                <div>
                  <p className="text-ocean/70 text-[10px] tracking-[0.35em] uppercase mb-3">Buyer lens</p>
                  <p className="text-ink-muted text-sm leading-relaxed">{area.buyerLens}</p>
                </div>
                <div>
                  <p className="text-ocean/70 text-[10px] tracking-[0.35em] uppercase mb-3">Seller lens</p>
                  <p className="text-ink-muted text-sm leading-relaxed">{area.sellerLens}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-ocean/70 text-[10px] tracking-[0.5em] uppercase mb-10">What Makes {area.name} Special</p>
          <div className="space-y-4">
            {area.highlights.map((h, i) => (
              <div key={i} className="flex items-start gap-4 py-3 border-b border-line">
                <span className="text-ocean/50 font-serif text-lg mt-px">{String(i + 1).padStart(2, "0")}</span>
                <p className="text-ink-muted text-[15px]">{h}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-ocean/70 text-[10px] tracking-[0.5em] uppercase mb-8">Beaches</p>
          <div className="flex flex-wrap gap-3">
            {area.beaches.map((b) => (
              <span key={b} className="border border-line text-ink-muted text-[13px] px-4 py-2">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {townComps && townComps.comps.length > 0 && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-ocean/70 text-[10px] tracking-[0.5em] uppercase mb-3">Recent comparable sales</p>
                <h2 className="font-serif text-3xl text-ink">The local evidence</h2>
              </div>
              <p className="text-ink-faint text-[11px] max-w-xs md:text-right leading-relaxed">
                {townComps.source === "live" ? "Live records from Supabase’s comparable_sales table." : "Curated records from Barry’s portfolio data."}
                {" "}Sales shown are market context, not an appraisal.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {townComps.comps.map((comp) => {
                const details = [
                  comp.beds !== null ? `${comp.beds} BD` : null,
                  comp.baths !== null ? `${comp.baths} BA` : null,
                  comp.sqft !== null ? `${comp.sqft.toLocaleString("en-US")} SF` : null,
                  comp.lotAcres !== null ? `${comp.lotAcres} AC` : null,
                ].filter(Boolean).join(" · ");
                return (
                  <div key={`${comp.address}-${comp.soldDate}`} className="border border-line p-7 hover:border-ocean/30 transition-all duration-500">
                    <div className="flex items-start justify-between gap-4">
                      <p className="font-serif text-2xl text-ocean">{formatPrice(comp.soldPrice)}</p>
                      <p className="text-ink-faint text-[11px] uppercase tracking-[0.15em]">{formatDate(comp.soldDate)}</p>
                    </div>
                    <p className="text-ink text-sm mt-3">{comp.address}</p>
                    <p className="text-ink-faint text-[12px] mt-2">{formatMarket(comp.microMarket)}</p>
                    {details && <p className="text-ink-faint text-[12px] mt-4">{details}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {!isBrief && areaSales.length > 0 && (
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-8">
            <p className="text-ocean/70 text-[10px] tracking-[0.5em] uppercase mb-10">Notable Sales in {area.name}</p>
            <div className="grid md:grid-cols-2 gap-5">
              {areaSales.map((sale) => (
                <div key={sale.slug} className="border border-line p-8 hover:border-ocean/30 transition-all duration-500">
                  <p className="font-serif text-2xl text-ocean mb-1">{sale.price}</p>
                  <p className="text-ink-muted text-sm">{sale.address}, {sale.area}</p>
                  <p className="text-ink-faint text-[12px] mt-1">{sale.status}</p>
                  <p className="text-ink-faint text-[12px] mt-1">{sale.beds} BD · {sale.baths} BA · {sale.sqft} SF · {sale.acres} AC</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="border border-line p-12 md:p-16 text-center">
            <p className="text-ocean/70 text-[10px] tracking-[0.5em] uppercase mb-4">Your {area.name} Specialist</p>
            <h2 className="font-serif text-3xl md:text-4xl text-ink mb-4">Looking to Buy or Sell in {area.name}?</h2>
            <p className="text-ink-muted text-[15px] max-w-lg mx-auto mb-8">As an oceanfront and waterfront specialist at Hedgerow Exclusive Properties, I offer access to on-market and off-market opportunities across {area.name} and the entire East End.</p>
            <Link href="/contact" className="inline-block border border-ocean text-ocean text-[11px] tracking-[0.3em] uppercase px-10 py-4 hover:bg-ocean/10 transition-all duration-500">Inquire about {area.name}</Link>
          </div>
        </div>
      </section>

      <section className="border-t border-line py-12">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-ink-faint text-[11px] leading-relaxed max-w-2xl">Barry McGovern is a Licensed Real Estate Salesperson and oceanfront &amp; waterfront specialist at Hedgerow Exclusive Properties, a leading Hamptons firm with nearly $2 billion in firm transactions. Specializing in {area.name} oceanfront estates, waterfront homes, off-market properties, and luxury real estate. Serving {area.name}, Southampton, Bridgehampton, Sag Harbor, Sagaponack, East Hampton, Amagansett, Montauk, and Shelter Island.</p>
        </div>
      </section>
    </div>
  );
}
