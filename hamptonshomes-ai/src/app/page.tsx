import Image from "next/image";
import Link from "next/link";
import { notableSales } from "@/lib/sales";
import { areas } from "@/lib/areas";

export default function Home() {
  const featuredSale = notableSales[0];
  const supportingSales = notableSales
    .filter((sale) => sale.image && sale.slug !== featuredSale.slug)
    .slice(0, 3);
  const townAreas = areas.slice(0, 4);

  return (
    <>
      {/* Hero: let the property lead. */}
      <section className="relative flex min-h-[720px] h-[92svh] max-h-[980px] items-end overflow-hidden">
        <Image
          src="/images/67-surfside.jpg"
          alt="Oceanfront estate on Surfside Drive in Bridgehampton"
          fill
          className="object-cover"
          priority
          quality={90}
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-8 pb-20 md:pb-24">
          <p className="mb-5 text-sm text-white/70">Hedgerow Exclusive Properties</p>
          <h1 className="font-serif text-5xl leading-[1.02] text-white md:text-7xl lg:text-8xl">
            Barry McGovern
            <br />
            <span className="font-normal italic text-white/85">Oceanfront &amp; Waterfront</span>
          </h1>
          <p className="mt-7 max-w-md text-[15px] leading-relaxed text-white/70">
            Thoughtful representation for distinctive properties from Southampton to Montauk.
          </p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/contact" className="bg-white px-7 py-3.5 text-sm text-black transition-colors duration-500 hover:bg-gold">
              Inquire
            </Link>
            <Link href="/sales" className="border border-white/45 px-7 py-3.5 text-sm text-white transition-colors duration-500 hover:border-white hover:bg-white/10">
              View Portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* Lead with proof, before the geography. */}
      <section className="bg-black-light py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mb-10 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 text-sm text-gold/70">Recent sale</p>
              <h2 className="font-serif text-4xl text-white md:text-5xl">A closer look</h2>
            </div>
            <Link href="/sales" className="hidden border-b border-gold/40 pb-1 text-sm text-white/60 transition-colors hover:text-gold md:block">
              View portfolio <span aria-hidden="true">→</span>
            </Link>
          </div>
          <Link href="/sales" className="group relative block aspect-[16/10] overflow-hidden md:aspect-[2/1]">
            <Image
              src={featuredSale.image!}
              alt={`${featuredSale.address}, ${featuredSale.area}`}
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex flex-col gap-5 p-6 md:flex-row md:items-end md:justify-between md:p-10">
              <div>
                <p className="mb-2 text-sm text-white/60">{featuredSale.area} · {featuredSale.status}</p>
                <h3 className="font-serif text-3xl text-white md:text-5xl">{featuredSale.address}</h3>
              </div>
              <p className="font-serif text-2xl text-white md:text-3xl">{featuredSale.price}</p>
            </div>
          </Link>
        </div>
      </section>

      {/* About: Barry has a human, quieter presence here. */}
      <section className="bg-black py-32">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-8 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <Image src="/images/barry-mcgovern.jpg" alt="Barry McGovern" width={450} height={560} className="h-auto w-full object-cover" />
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <p className="mb-5 text-sm text-gold/70">About Barry</p>
            <h2 className="mb-8 font-serif text-4xl leading-tight text-white md:text-5xl">
              Local knowledge.<br />
              <span className="font-normal italic text-white/65">A long view.</span>
            </h2>
            <div className="space-y-5 text-[15px] leading-[1.9] text-white/50">
              <p>An oceanfront and waterfront specialist at Hedgerow Exclusive Properties, Barry works across the East End on considered sales, acquisitions, and private opportunities.</p>
              <p>Originally from Dublin and a Sag Harbor local since 2013, he brings a grounded perspective to everything from raw land and development to trophy oceanfront estates.</p>
            </div>
            <div className="mt-9 border-t border-white/10 pt-5 text-sm leading-relaxed text-white/45">
              <span className="text-white/70">Hedgerow Exclusive Properties</span><br />
              Nearly $2B in Hamptons transactions · $121.5M record Hamptons sale
            </div>
            <Link href="/about" className="mt-8 inline-block border-b border-gold/40 pb-1 text-sm text-gold transition-colors hover:text-gold-light">
              More about Barry <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Selected sales: a simple photographic edit. */}
      <section className="bg-black-light py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-8">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 text-sm text-gold/70">Selected sales</p>
              <h2 className="font-serif text-4xl text-white md:text-5xl">The work, in place</h2>
            </div>
            <Link href="/sales" className="hidden border-b border-gold/40 pb-1 text-sm text-white/60 transition-colors hover:text-gold md:block">
              All sales <span aria-hidden="true">→</span>
            </Link>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {supportingSales.map((sale) => (
              <Link key={sale.slug} href="/sales" className="group block">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image src={sale.image!} alt={`${sale.address}, ${sale.area}`} fill className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
                <div className="mt-5 flex items-start justify-between gap-4 border-t border-white/10 pt-4">
                  <div>
                    <h3 className="font-serif text-xl text-white">{sale.address}</h3>
                    <p className="mt-1 text-sm text-white/45">{sale.area} · {sale.status}</p>
                  </div>
                  <p className="font-serif text-lg text-white/80">{sale.price}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/sales" className="mt-10 inline-block border-b border-gold/40 pb-1 text-sm text-gold md:hidden">
            View all sales <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      {/* Coverage: useful, restrained, and unboxed. */}
      <section className="bg-black py-32">
        <div className="mx-auto max-w-7xl px-8">
          <div className="grid gap-14 md:grid-cols-12 md:items-start md:gap-16">
            <div className="md:col-span-5">
              <p className="mb-5 text-sm text-gold/70">Coverage</p>
              <h2 className="font-serif text-4xl leading-tight text-white md:text-5xl">
                Southampton<br />
                <span className="font-normal italic text-white/60">to Montauk</span>
              </h2>
              <p className="mt-7 max-w-md text-[15px] leading-relaxed text-white/45">From village lanes to open ocean, Barry brings one perspective to the full East End.</p>
            </div>
            <div className="md:col-span-6 md:col-start-7">
              <div className="grid grid-cols-2 gap-x-8">
                {areas.map((area) => (
                  <Link href={`/${area.slug}`} key={area.slug} className="group border-b border-white/10 py-4 text-white/55 transition-colors hover:text-white">
                    <span className="font-serif text-lg">{area.name}</span>
                    <span className="ml-2 text-sm text-white/25 transition-colors group-hover:text-gold/70">→</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Town edit, kept after proof and coverage. */}
      <section className="bg-black-light py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-8 text-center">
          <p className="mb-4 text-sm text-gold/70">Explore by area</p>
          <h2 className="mb-14 font-serif text-4xl text-white md:text-5xl">The East End</h2>
          <div className="grid grid-cols-2 gap-px bg-white/10 md:grid-cols-4">
            {townAreas.map((area) => (
              <Link key={area.slug} href={`/${area.slug}`} className="bg-black-light p-7 text-left transition-colors duration-500 hover:bg-black-mid">
                <p className="font-serif text-xl text-white">{area.name}</p>
                <p className="mt-2 text-sm text-white/35">{area.priceRange}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Closing invitation. */}
      <section className="relative overflow-hidden py-36">
        <Image src="/images/234-wickapogue.jpg" alt="Southampton waterfront estate" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 mx-auto max-w-3xl px-8 text-center">
          <p className="mb-5 text-sm text-white/65">Start a conversation</p>
          <h2 className="mb-6 font-serif text-4xl leading-tight text-white md:text-5xl">Ready to make<br /><span className="font-normal italic text-white/75">your move?</span></h2>
          <p className="mx-auto mb-10 max-w-lg text-[15px] leading-relaxed text-white/55">Confidential guidance and complimentary valuations, whether buying or selling.</p>
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <a href="tel:+16463390154" className="bg-white px-8 py-3.5 text-sm text-black transition-colors hover:bg-gold">646-339-0154</a>
            <Link href="/contact" className="border border-white/40 px-8 py-3.5 text-sm text-white transition-colors hover:border-white hover:bg-white/10">Send a message</Link>
          </div>
        </div>
      </section>
    </>
  );
}
