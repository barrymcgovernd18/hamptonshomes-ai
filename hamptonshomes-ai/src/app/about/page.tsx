import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Barry McGovern",
  description:
    "Barry McGovern is a luxury real estate broker and oceanfront & waterfront specialist at Hedgerow Exclusive Properties. 6 years in the Hamptons luxury market, covering oceanfront estates and waterfront homes from Southampton to Montauk, Sag Harbor, and Shelter Island.",
  alternates: { canonical: "https://hamptonshomes.ai/about" },
};

export default function AboutPage() {
  return (
    <div className="bg-black">
      {/* Hero */}
      <section className="relative h-[50vh] flex items-end overflow-hidden">
        <Image
          src="/images/barry-mcgovern.jpg"
          alt="Barry McGovern"
          fill
          className="object-cover object-top grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 pb-16 w-full">
          <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-4">About</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white">Barry McGovern</h1>
        </div>
      </section>

      {/* Bio */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-12 gap-20">
            <div className="md:col-span-7">
              <div className="space-y-6 text-white/35 text-[15px] leading-[1.95]">
                <p className="text-white/50 text-xl leading-[1.7]">
                  Oceanfront and waterfront specialist. Luxury real estate broker at{" "}
                  <a href="https://hedgerowexclusive.com" target="_blank" rel="noopener" className="text-gold hover:text-gold-light transition-colors duration-500">
                    Hedgerow Exclusive Properties
                  </a>
                , the firm behind nearly $2 billion in Hamptons transactions and the most expensive 
                  sale in Hamptons history.
                </p>
                <p>
                  As part of the Hedgerow team, Barry has been involved in some of the most significant 
                  real estate transactions on the East End, from record-setting oceanfront trades to 
                  nine-figure compound sales. He brings six years of Hamptons luxury experience and a 
                  reputation built on discretion, deep market knowledge, and results.
                </p>
                <p>
                  Originally from Dublin, Ireland, Barry has called the Hamptons home since 2013 and proudly 
                  considers himself a Sag Harbor local. His deep roots in the community, combined with 
                  Hedgerow&apos;s nearly $2 billion in transactions since 2020, give his clients an unmatched 
                  advantage in one of the world&apos;s most competitive luxury markets.
                </p>
                <p>
                  Barry&apos;s expertise centers on oceanfront and waterfront properties, from 
                  Further Lane and Meadow Lane oceanfront estates to Sag Harbor and Shelter Island 
                  waterfront homes. He also covers raw land, development opportunities, and off-market 
                  inventory, offering clients access to exclusive opportunities that never reach the public market.
                </p>
                <p>
                  Covering the full East End from Southampton to Montauk, including Sag Harbor, Shelter Island, 
                  Bridgehampton, East Hampton, Sagaponack, Water Mill, Wainscott, and Amagansett.
                </p>
              </div>

              {/* Specialties */}
              <div className="mt-20 pt-16 border-t border-white/5">
                <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-8">Specialties</p>
                <div className="grid grid-cols-2 gap-y-4 gap-x-12 text-white/30 text-[13px]">
                  {[
                    "Oceanfront estates & homes",
                    "Waterfront properties",
                    "Off-market transactions",
                    "Luxury sales & acquisitions",
                    "Beachfront & bayfront",
                    "Land & development",
                    "Estate compounds",
                    "Complimentary valuations",
                  ].map((s) => (
                    <p key={s} className="flex items-start gap-3">
                      <span className="text-gold/40 mt-0.5">·</span>
                      <span>{s}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="md:col-span-4 md:col-start-9 space-y-12">
              <div className="relative">
                <Image
                  src="/images/barry-mcgovern-2.jpg"
                  alt="Barry McGovern at Hedgerow Exclusive Properties"
                  width={400}
                  height={500}
                  className="object-cover w-full"
                />
                <div className="absolute inset-0 border border-gold/10" />
              </div>

              {/* Hedgerow */}
              <div className="border border-white/5 p-8">
                <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-4">Brokerage</p>
                <p className="font-serif text-xl text-white mb-4">Hedgerow Exclusive Properties</p>
                <p className="text-white/30 text-[13px] leading-[1.8]">
                  Boutique luxury firm based in Bridgehampton. Founded 2020. Nearly $2 billion in transactions 
                  including the most expensive trade in Hamptons history ($121.5M) and some of the largest 
                  oceanfront sales nationwide. Ranked #1 Hamptons, #1 New York, #4 USA by WSJ/RealTrends. Featured in{" "}
                  <a
                    href="https://www.forbes.com/sites/emmareynolds/2024/12/19/behind-hedgerow-the-most-exclusive-hamptons-real-estate-firm/"
                    target="_blank"
                    rel="noopener"
                    className="text-gold hover:text-gold-light transition-colors duration-500"
                  >
                    Forbes
                  </a>.
                </p>
              </div>

              <Link
                href="/contact"
                className="inline-block bg-gold text-black px-8 py-3.5 text-[11px] tracking-[0.3em] uppercase hover:bg-gold-light transition-all duration-500 w-full text-center"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
