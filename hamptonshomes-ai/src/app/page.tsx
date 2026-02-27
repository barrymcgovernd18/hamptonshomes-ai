import Image from "next/image";
import Link from "next/link";
import { notableSales } from "@/lib/sales";

export default function Home() {
  const featured = notableSales.filter((s) => s.image).slice(0, 4);

  return (
    <>
      {/* Hero. cinematic property background */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <Image
          src="/images/hero-property.jpg"
          alt="Luxury Hamptons waterfront estate"
          fill
          className="object-cover"
          priority
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto px-8 pb-20 w-full">
          <p className="text-gold text-[10px] tracking-[0.5em] uppercase mb-5 opacity-80">
            Hedgerow Exclusive Properties
          </p>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white leading-[1.05] mb-6">
            Hamptons
            <br />
            <span className="italic font-normal text-white/80">Luxury</span>
          </h1>
          <p className="text-white/40 text-[15px] leading-relaxed max-w-md mb-10">
            Oceanfront and waterfront specialist. High-end properties 
            and exclusive off-market opportunities. Southampton to Montauk.
          </p>
          <div className="flex gap-5">
            <Link
              href="/sales"
              className="bg-white text-black px-8 py-3.5 text-[11px] tracking-[0.3em] uppercase hover:bg-gold hover:text-black transition-all duration-500"
            >
              View Portfolio
            </Link>
            <Link
              href="/contact"
              className="border border-white/25 text-white/70 px-8 py-3.5 text-[11px] tracking-[0.3em] uppercase hover:border-gold hover:text-gold transition-all duration-500"
            >
              Inquire
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 right-8 z-10 hidden md:block">
          <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/30 mx-auto mb-2" />
          <p className="text-white/20 text-[9px] tracking-[0.3em] uppercase">Scroll</p>
        </div>
      </section>

      {/* Intro. agent section */}
      <section className="bg-black py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-4">
              <div className="relative">
                <Image
                  src="/images/barry-mcgovern.jpg"
                  alt="Barry McGovern"
                  width={450}
                  height={560}
                  className="object-cover w-full grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 border border-gold/10" />
              </div>
            </div>
            <div className="md:col-span-7 md:col-start-6">
              <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-6">About</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight mb-8">
                Barry McGovern
              </h2>
              <div className="space-y-5 text-white/35 text-[15px] leading-[1.9]">
                <p>
                  An oceanfront and waterfront specialist at Hedgerow Exclusive Properties, the firm 
                  behind nearly $2 billion in Hamptons transactions, including the most expensive sale in 
                  Hamptons history at $121.5 million. Ranked #1 in the Hamptons, #1 in New York, and #4 in 
                  the USA by WSJ/RealTrends.
                </p>
                <p>
                  Originally from Dublin. A Sag Harbor local since 2013. From raw land and development 
                  to trophy oceanfront estates. covering the full East End.
                </p>
              </div>
              <Link
                href="/about"
                className="inline-block mt-8 text-gold text-[11px] tracking-[0.25em] uppercase hover:text-gold-light transition-colors duration-500"
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { value: "$2B", label: "Hedgerow Transactions" },
              { value: "#1", label: "Hamptons · NY · WSJ" },
              { value: "$121.5M", label: "Record Hamptons Sale" },
              { value: "10+", label: "Markets Covered" },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className={`py-12 text-center ${
                  i < 3 ? "border-r border-white/5" : ""
                }`}
              >
                <p className="font-serif text-4xl text-gold mb-2">{stat.value}</p>
                <p className="text-white/20 text-[10px] tracking-[0.3em] uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured portfolio */}
      <section className="bg-black-light py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex justify-between items-end mb-16">
            <div>
              <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-4">Portfolio</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white">Selected Sales</h2>
            </div>
            <Link
              href="/sales"
              className="hidden md:block text-gold text-[11px] tracking-[0.25em] uppercase hover:text-gold-light transition-colors duration-500"
            >
              View All →
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            {featured.map((sale) => (
              <Link
                key={sale.slug}
                href="/sales"
                className="group relative aspect-[16/10] overflow-hidden block"
              >
                <Image
                  src={sale.image!}
                  alt={`${sale.address}, ${sale.area}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-1000"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-7">
                  <p className="font-serif text-xl text-white mb-1">{sale.address}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-white/40 text-[11px] tracking-[0.2em] uppercase">{sale.area}</p>
                    <p className="font-serif text-lg text-gold">{sale.price}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="md:hidden text-center mt-10">
            <Link
              href="/sales"
              className="text-gold text-[11px] tracking-[0.25em] uppercase"
            >
              View All Sales →
            </Link>
          </div>
        </div>
      </section>

      {/* Second photo + areas */}
      <section className="bg-black py-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="grid md:grid-cols-12 gap-16 items-center">
            <div className="md:col-span-6">
              <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-4">Coverage</p>
              <h2 className="font-serif text-4xl md:text-5xl text-white mb-12 leading-tight">
                Southampton
                <br />
                <span className="italic font-normal text-white/60">to Montauk</span>
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "Southampton", "Water Mill", "Bridgehampton", "Sagaponack",
                  "Sag Harbor", "Wainscott", "East Hampton", "Amagansett",
                  "Montauk", "Shelter Island",
                ].map((area) => (
                  <div
                    key={area}
                    className="border border-white/5 py-4 px-5 hover:border-gold/20 transition-all duration-700 group"
                  >
                    <p className="text-white/30 text-[12px] tracking-[0.15em] group-hover:text-white/60 transition-colors duration-700">
                      {area}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:col-span-5 md:col-start-8">
              <div className="relative">
                <Image
                  src="/images/barry-mcgovern-2.jpg"
                  alt="Barry McGovern - Hedgerow Exclusive Properties"
                  width={500}
                  height={650}
                  className="object-cover w-full"
                />
                <div className="absolute inset-0 border border-gold/10" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-8 text-center">
          <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-4">Explore by Area</p>
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-16">
            The East End
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "East Hampton", slug: "east-hampton", range: "$2M – $150M+" },
              { name: "Sag Harbor", slug: "sag-harbor", range: "$1.5M – $35M+" },
              { name: "Bridgehampton", slug: "bridgehampton", range: "$2M – $60M+" },
              { name: "Sagaponack", slug: "sagaponack", range: "$3M – $100M+" },
            ].map((a) => (
              <Link
                key={a.slug}
                href={`/${a.slug}`}
                className="border border-white/5 p-8 hover:border-gold/30 transition-all duration-700 group"
              >
                <p className="font-serif text-lg text-white group-hover:text-gold transition-colors duration-500">
                  {a.name}
                </p>
                <p className="text-white/20 text-[11px] mt-2">{a.range}</p>
              </Link>
            ))}
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            {["Southampton", "Amagansett", "Montauk", "Shelter Island", "Water Mill", "Wainscott"].map((t) => (
              <span key={t} className="text-white/15 text-[12px] tracking-wider uppercase">{t}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-36 overflow-hidden">
        <Image
          src="/images/234-wickapogue.jpg"
          alt="Luxury Hamptons estate"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/75" />
        <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
          <p className="text-gold/60 text-[10px] tracking-[0.5em] uppercase mb-6">Get Started</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-6 leading-tight">
            Ready to Make
            <br />
            <span className="italic font-normal text-white/70">Your Move?</span>
          </h2>
          <p className="text-white/30 text-[15px] mb-10 leading-relaxed max-w-lg mx-auto">
            Confidential guidance. Complimentary valuations.
            Whether buying or selling, every conversation starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+16463390154"
              className="bg-gold text-black px-8 py-3.5 text-[11px] tracking-[0.3em] uppercase hover:bg-gold-light transition-all duration-500"
            >
              646-339-0154
            </a>
            <Link
              href="/contact"
              className="border border-white/20 text-white/70 px-8 py-3.5 text-[11px] tracking-[0.3em] uppercase hover:border-gold hover:text-gold transition-all duration-500"
            >
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
