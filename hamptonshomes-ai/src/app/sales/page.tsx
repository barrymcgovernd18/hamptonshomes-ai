import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notableSales } from "@/lib/sales";
import { activeListings, totalPortfolioValue } from "@/lib/listings";

export const metadata: Metadata = {
  title: "Portfolio | Hedgerow Active Listings & Notable Sales",
  description:
    "Browse Hedgerow Exclusive Properties' active listings across the Hamptons, from $99.5M oceanfront compounds in Water Mill to village homes in East Hampton and Shelter Island. Over $450M in active inventory. Barry McGovern, oceanfront and waterfront specialist.",
  alternates: { canonical: "https://hamptonshomes.ai/sales" },
};

function formatPortfolioValue(value: number): string {
  if (value >= 1_000_000_000) return `$${(value / 1_000_000_000).toFixed(1)}B`;
  return `$${Math.round(value / 1_000_000)}M`;
}

export default function SalesPage() {
  const withPhotos = notableSales.filter((s) => s.image);
  const privateSales = notableSales.filter((s) => !s.image);
  const portfolioDisplay = formatPortfolioValue(totalPortfolioValue);

  return (
    <div className="bg-black">
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-4">Hedgerow Portfolio</p>
          <div className="flex flex-col md:flex-row justify-between md:items-end gap-6">
            <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight">
              Active
              <br />
              <span className="italic font-normal text-white/60">Listings</span>
            </h1>
            <div className="text-right mb-2">
              <p className="text-white/20 text-[13px] max-w-xs leading-relaxed">
                {activeListings.length} properties across the East End
              </p>
              <span className="font-serif text-gold text-3xl md:text-4xl block mt-2">
                {portfolioDisplay}+
              </span>
              <span className="text-white/20 text-[11px] tracking-wide block mt-1">
                in active inventory
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Stats ribbon */}
      <section className="border-y border-white/5 py-6 mb-16">
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <p className="font-serif text-2xl md:text-3xl text-gold">{activeListings.length}</p>
            <p className="text-white/25 text-[10px] tracking-[0.3em] uppercase mt-1">Active Listings</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-2xl md:text-3xl text-gold">{portfolioDisplay}+</p>
            <p className="text-white/25 text-[10px] tracking-[0.3em] uppercase mt-1">Portfolio Value</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-2xl md:text-3xl text-gold">~$2B</p>
            <p className="text-white/25 text-[10px] tracking-[0.3em] uppercase mt-1">Career Transactions</p>
          </div>
          <div className="text-center">
            <p className="font-serif text-2xl md:text-3xl text-gold">#1</p>
            <p className="text-white/25 text-[10px] tracking-[0.3em] uppercase mt-1">Hamptons Firm</p>
          </div>
        </div>
      </section>

      {/* Featured listing (hero card for the top property) */}
      <section className="pb-10">
        <div className="max-w-7xl mx-auto px-8">
          <a
            href={activeListings[0].listingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden"
          >
            <div className="relative aspect-[4/3] md:aspect-[21/9] overflow-hidden">
              <Image
                src={activeListings[0].image}
                alt={`${activeListings[0].address}, ${activeListings[0].area}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                sizes="100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
              <div className="absolute top-4 left-6 md:top-6 md:left-8">
                <span className="bg-gold/90 text-black text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 font-medium">
                  Featured Listing
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
              <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2">{activeListings[0].area}</p>
              <h2 className="font-serif text-2xl md:text-4xl text-white mb-2">{activeListings[0].address}</h2>
              <p className="hidden md:block text-white/40 text-[13px] max-w-lg mb-3">{activeListings[0].description}</p>
              <div className="flex flex-wrap gap-3 md:gap-5 text-white/30 text-[11px] md:text-[12px] mb-3">
                {activeListings[0].beds && <span>{activeListings[0].beds} Bed</span>}
                {activeListings[0].baths && <span>{activeListings[0].baths} Bath</span>}
                {activeListings[0].sqft && <span>{activeListings[0].sqft} SF</span>}
                {activeListings[0].acres && <span>{activeListings[0].acres} AC</span>}
              </div>
              <div className="flex items-end justify-between">
                <p className="font-serif text-2xl md:text-4xl text-gold">{activeListings[0].price}</p>
                <p className="text-white/30 text-[11px] tracking-wide group-hover:text-gold/60 transition-colors">
                  View Details &rarr;
                </p>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Active listings grid */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activeListings.slice(1).map((listing) => (
              <a
                key={listing.slug}
                href={listing.listingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block overflow-hidden border border-white/5 hover:border-gold/20 transition-all duration-700"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={listing.image}
                    alt={`${listing.address}, ${listing.area}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-1000"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {listing.isLand && (
                    <span className="absolute top-3 right-3 bg-white/10 backdrop-blur-sm text-white/70 text-[9px] tracking-[0.2em] uppercase px-2.5 py-1">
                      Land
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <p className="text-gold/50 text-[9px] tracking-[0.3em] uppercase mb-1">{listing.area}</p>
                      <h3 className="font-serif text-lg text-white group-hover:text-gold transition-colors duration-500">
                        {listing.address}
                      </h3>
                    </div>
                    <p className="font-serif text-lg text-gold shrink-0">{listing.price}</p>
                  </div>
                  <p className="text-white/25 text-[12px] leading-relaxed mb-4 line-clamp-2">
                    {listing.description}
                  </p>
                  <div className="flex gap-4 text-white/20 text-[11px]">
                    {listing.beds && <span>{listing.beds} BD</span>}
                    {listing.baths && <span>{listing.baths} BA</span>}
                    {listing.sqft && <span>{listing.sqft} SF</span>}
                    {listing.acres && <span>{listing.acres} AC</span>}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <section className="max-w-7xl mx-auto px-8">
        <div className="border-t border-white/5" />
      </section>

      {/* Notable Sales section */}
      <section className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-4">Track Record</p>
          <h2 className="font-serif text-4xl md:text-6xl text-white leading-tight mb-16">
            Notable
            <br />
            <span className="italic font-normal text-white/60">Transactions</span>
          </h2>
        </div>
      </section>

      {/* Featured sales with photos */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-8 space-y-5">
          {withPhotos.map((sale) => (
            <div
              key={sale.slug}
              className="group relative aspect-[21/9] overflow-hidden"
            >
              <Image
                src={sale.image!}
                alt={`${sale.address}, ${sale.area}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                  <div>
                    <p className="text-gold text-[10px] tracking-[0.3em] uppercase mb-2">{sale.area}</p>
                    <h3 className="font-serif text-2xl md:text-3xl text-white mb-2">{sale.address}</h3>
                    {(sale.beds || sale.sqft) && (
                      <div className="flex gap-5 text-white/30 text-[12px]">
                        {sale.beds && <span>{sale.beds} Bed</span>}
                        {sale.baths && <span>{sale.baths} Bath</span>}
                        {sale.sqft && <span>{sale.sqft} SF</span>}
                        {sale.acres && <span>{sale.acres} AC</span>}
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="font-serif text-2xl md:text-3xl text-gold">{sale.price}</p>
                    <p className="text-white/25 text-[11px] tracking-wide">{sale.status}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Private sales */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-10">Private Transactions</p>
          <div className="grid sm:grid-cols-3 gap-5">
            {privateSales.map((sale) => (
              <div
                key={sale.slug}
                className="border border-white/5 p-8 hover:border-gold/20 transition-all duration-700 group"
              >
                <p className="font-serif text-xl text-white group-hover:text-gold transition-colors duration-500 mb-1">
                  {sale.address}
                </p>
                <p className="text-gold/40 text-[10px] tracking-[0.3em] uppercase mb-4">{sale.area}</p>
                <p className="font-serif text-xl text-white">{sale.price}</p>
                <p className="text-white/20 text-[12px] mt-1">{sale.status}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/5 py-24">
        <div className="max-w-3xl mx-auto px-8 text-center">
          <p className="font-serif text-2xl text-white mb-3">Interested in a Property?</p>
          <p className="text-white/25 text-[14px] mb-8">
            Schedule a private showing or request additional details on any listing.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-gold text-black px-8 py-3.5 text-[11px] tracking-[0.3em] uppercase hover:bg-gold-light transition-all duration-500"
          >
            Schedule a Showing
          </Link>
        </div>
      </section>
    </div>
  );
}
