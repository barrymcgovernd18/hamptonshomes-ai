import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hamptons Market Insights",
  description:
    "Hamptons real estate market intelligence from Barry McGovern at Hedgerow Exclusive Properties.",
  alternates: { canonical: "https://hamptonshomes.ai/market" },
};

export default function MarketPage() {
  return (
    <div className="bg-black">
      {/* Hero with image */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/listings/946-ocean-road.jpg"
            alt="Hamptons oceanfront estate"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-8 pb-16">
          <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-4">Insights</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight">
            Market
            <br />
            <span className="italic font-normal text-white/60">Intelligence</span>
          </h1>
        </div>
      </section>

      <section className="pb-32">
        <div className="max-w-4xl mx-auto px-8">
          <article>
            <div className="flex items-center gap-4 mb-12">
              <p className="text-gold text-[10px] tracking-[0.4em] uppercase">February 2026</p>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            <h2 className="font-serif text-3xl md:text-4xl text-white mb-14 leading-tight">
              Q4 2025: Record Prices as Demand Surges
            </h2>

            <div className="text-white/35 text-[15px] leading-[2] space-y-6">
              <p>
                The Hamptons luxury real estate market closed 2025 on a historic note. The median sale price 
                jumped 34% to $2.34 million in Q4, a new record. The average sale price reached $3.76 million, 
                driven by Wall Street bonuses and an influx of tech wealth.
              </p>
              <p>
                What&apos;s particularly notable this cycle is the speed at which summer rental inventory is being 
                absorbed. Brokers report that most prime summer 2026 inventory was locked up before February, 
                significantly earlier than typical years.
              </p>
              <p>
                The supply side remains tight. New listings in the luxury segment ($5M+) are down, as many 
                homeowners choose to hold rather than list in a market where replacement inventory is scarce.
              </p>
            </div>

            {/* Stats */}
            <div className="my-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5">
              {[
                { value: "$2.34M", label: "Median Price", sub: "+34% YoY" },
                { value: "$3.76M", label: "Average Price", sub: "Record" },
                { value: "$5M+", label: "Luxury Segment", sub: "Low inventory" },
                { value: "2026", label: "Summer Rentals", sub: "Committed" },
              ].map((stat) => (
                <div key={stat.label} className="bg-black p-8">
                  <p className="font-serif text-2xl text-gold mb-1">{stat.value}</p>
                  <p className="text-white/25 text-[10px] tracking-[0.2em] uppercase">{stat.label}</p>
                  <p className="text-white/15 text-[11px] mt-1">{stat.sub}</p>
                </div>
              ))}
            </div>

            {/* Inline property photo */}
            <div className="my-16 relative h-64 md:h-80 overflow-hidden">
              <Image
                src="/images/listings/70-71-cobb-lane.jpg"
                alt="70-71 Cobb Lane, Water Mill - Record $121.5M sale"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-6 text-white/40 text-[11px] tracking-[0.2em]">
                70-71 Cobb Lane, Water Mill · $121.5M Record Sale
              </p>
            </div>

            <div className="text-white/35 text-[15px] leading-[2] space-y-8">
              <div>
                <p className="text-gold/60 text-[10px] tracking-[0.4em] uppercase mb-4">For Buyers</p>
                <p>
                  The window for negotiation is narrowing. Properties in desirable locations move quickly, 
                  often before reaching the public market. Access to off-market inventory is essential.
                </p>
              </div>

              <div>
                <p className="text-gold/60 text-[10px] tracking-[0.4em] uppercase mb-4">For Sellers</p>
                <p>
                  Market conditions are exceptionally favorable. Record prices, strong demand, limited 
                  competition. A complimentary valuation reveals your property&apos;s current position.
                </p>
              </div>
            </div>

            {/* Second property photo */}
            <div className="my-16 relative h-64 md:h-80 overflow-hidden">
              <Image
                src="/images/listings/448-further-lane.jpg"
                alt="Further Lane, East Hampton - Premium oceanfront corridor"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-4 left-6 text-white/40 text-[11px] tracking-[0.2em]">
                Further Lane, East Hampton · Premium Oceanfront Corridor
              </p>
            </div>

            <div className="text-white/35 text-[15px] leading-[2] space-y-8">
              <div>
                <p className="text-gold/60 text-[10px] tracking-[0.4em] uppercase mb-4">Strongest Markets</p>
                <p>
                  East Hampton oceanfront, Sag Harbor village, and Bridgehampton south see the most 
                  competitive activity. Shelter Island is emerging as a sought-after market for buyers 
                  seeking privacy and waterfront at relative value.
                </p>
              </div>
            </div>

            {/* Area highlights grid */}
            <div className="my-20 grid md:grid-cols-2 gap-5">
              <div className="relative h-56 overflow-hidden group">
                <Image
                  src="/images/press/radziwill-95m.webp"
                  alt="East Hampton waterfront estate"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-2">East Hampton</p>
                  <p className="text-white/50 text-[13px]">Lily Pond, Further Lane, West End Road. The highest per-SF premiums in the Hamptons.</p>
                </div>
              </div>
              <div className="relative h-56 overflow-hidden group">
                <Image
                  src="/images/press/celtics-bridgehampton.jpg"
                  alt="Bridgehampton oceanfront"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-gold text-[10px] tracking-[0.4em] uppercase mb-2">Bridgehampton</p>
                  <p className="text-white/50 text-[13px]">Surfside Drive emerged as a hot corridor. Multiple $20M+ trades in 2025.</p>
                </div>
              </div>
            </div>
          </article>

          {/* CTA */}
          <div className="mt-24 pt-16 border-t border-white/5 text-center">
            <p className="font-serif text-2xl text-white mb-3">Want Personalized Intelligence?</p>
            <p className="text-white/25 text-[14px] mb-8">
              Insights tailored to your property or search criteria.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-gold text-black px-8 py-3.5 text-[11px] tracking-[0.3em] uppercase hover:bg-gold-light transition-all duration-500"
            >
              Get Market Updates
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
