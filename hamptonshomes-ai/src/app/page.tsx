import Image from "next/image";
import Link from "next/link";
import { notableSales } from "@/lib/sales";
import { areas } from "@/lib/areas";

export default function Home() {
  const featuredSale = notableSales[0];
  const supportingSales = notableSales.filter((sale) => sale.image && sale.slug !== featuredSale.slug).slice(0, 3);
  const townAreas = areas.slice(0, 4);

  return (
    <>
      <section className="relative flex min-h-[640px] h-[82svh] max-h-[900px] items-end overflow-hidden bg-ocean-deep">
        <Image
          src="/images/hero-waterfront.jpg"
          alt="Waterfront estate compound on the East End"
          fill
          className="object-cover object-[center_48%]"
          priority
          quality={90}
          sizes="100vw"
        />
        {/* Keep nav readable without crushing the aerial */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-ocean-deep/55 to-transparent" />
        {/* Bottom scrim so type sits on quiet dark, photo stays open above */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ocean-deep/90 via-ocean-deep/35 to-transparent" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-14 pt-28 md:px-8 md:pb-20">
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] tracking-tight text-white md:text-7xl">
            Barry McGovern
          </h1>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/88 md:text-base">
            Oceanfront and estate specialist
          </p>
          <div className="mt-10">
            <Link
              href="/contact"
              className="inline-block border border-white/55 bg-white/10 px-8 py-3.5 text-[11px] uppercase tracking-[0.24em] text-white backdrop-blur-[2px] transition-colors hover:border-white hover:bg-white/20"
            >
              Inquire
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-paper py-24 md:py-32"><div className="mx-auto max-w-7xl px-6 md:px-8"><div className="grid gap-12 md:grid-cols-12 md:items-start md:gap-16"><div className="md:col-span-4"><p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-ocean">The East End, in full</p><h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">Place matters.<br /><span className="font-normal italic text-ink-muted">So does perspective.</span></h2></div><div className="md:col-span-6 md:col-start-7"><p className="text-lg leading-[1.8] text-ink-muted">Barry McGovern brings local fluency and a long view to oceanfront, waterfront, and estate transactions across the Hamptons.</p><p className="mt-6 text-[15px] leading-[1.9] text-ink-faint">From a first conversation through a quiet closing, every detail is handled with discretion, clarity, and an understanding of what makes an East End property endure.</p><Link href="/about" className="mt-8 inline-block border-b border-ocean pb-1 text-sm text-ocean hover:border-ink hover:text-ink">About Barry <span aria-hidden="true">↗</span></Link></div></div></div></section>

      <section className="border-y border-line bg-paper-soft py-24 md:py-32"><div className="mx-auto max-w-7xl px-6 md:px-8"><div className="mb-10 flex items-end justify-between gap-8"><div><p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-ocean">Recent sale</p><h2 className="font-serif text-4xl text-ink md:text-5xl">A closer look</h2></div><Link href="/sales" className="hidden border-b border-ocean pb-1 text-sm text-ocean md:block">View portfolio <span aria-hidden="true">↗</span></Link></div><Link href="/sales" className="group relative block aspect-[16/10] overflow-hidden md:aspect-[2/1]"><Image src={featuredSale.image!} alt={`${featuredSale.address}, ${featuredSale.area}`} fill className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 1200px" /><div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/75 via-ocean-deep/10 to-transparent" /><div className="absolute bottom-0 left-0 right-0 flex flex-col gap-4 p-6 md:flex-row md:items-end md:justify-between md:p-10"><div><p className="mb-2 text-sm text-white/75">{featuredSale.area} · {featuredSale.status}</p><h3 className="font-serif text-3xl text-white md:text-5xl">{featuredSale.address}</h3></div><p className="font-serif text-2xl text-white md:text-3xl">{featuredSale.price}</p></div></Link></div></section>

      <section className="bg-paper py-24 md:py-32"><div className="mx-auto max-w-7xl px-6 md:px-8"><div className="mb-12 flex items-end justify-between gap-8"><div><p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-ocean">Selected sales</p><h2 className="font-serif text-4xl text-ink md:text-5xl">The work, in place</h2></div><Link href="/sales" className="hidden border-b border-ocean pb-1 text-sm text-ocean md:block">All sales <span aria-hidden="true">↗</span></Link></div><div className="grid gap-10 md:grid-cols-3">{supportingSales.map((sale) => <Link key={sale.slug} href="/sales" className="group block"><div className="relative aspect-[4/3] overflow-hidden bg-paper-deep"><Image src={sale.image!} alt={`${sale.address}, ${sale.area}`} fill className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]" sizes="(max-width: 768px) 100vw, 33vw" /></div><div className="mt-5 flex items-start justify-between gap-4 border-t border-line pt-4"><div><h3 className="font-serif text-xl text-ink">{sale.address}</h3><p className="mt-1 text-sm text-ink-faint">{sale.area} · {sale.status}</p></div><p className="font-serif text-lg text-ocean">{sale.price}</p></div></Link>)}</div></div></section>

      <section className="bg-ocean py-24 text-paper md:py-32"><div className="mx-auto max-w-7xl px-6 md:px-8"><div className="grid gap-14 md:grid-cols-12 md:items-start md:gap-16"><div className="md:col-span-5"><p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-paper/65">Coverage</p><h2 className="font-serif text-4xl leading-tight md:text-5xl">Southampton<br /><span className="font-normal italic text-paper/65">to Montauk</span></h2><p className="mt-7 max-w-md text-[15px] leading-relaxed text-paper/70">Village lanes, bayfront mornings, and open ocean. One perspective across the full East End.</p></div><div className="md:col-span-6 md:col-start-7"><div className="grid grid-cols-2 gap-x-8">{areas.map((area) => <Link href={`/${area.slug}`} key={area.slug} className="group border-b border-paper/20 py-4 text-paper/80 transition-colors hover:text-white"><span className="font-serif text-lg">{area.name}</span><span className="ml-2 text-sm text-paper/45 group-hover:text-white">↗</span></Link>)}</div></div></div></div></section>

      <section className="bg-paper-deep py-24 md:py-32"><div className="mx-auto max-w-7xl px-6 text-center md:px-8"><p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-ocean">Explore by area</p><h2 className="mb-14 font-serif text-4xl text-ink md:text-5xl">The East End</h2><div className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">{townAreas.map((area) => <Link key={area.slug} href={`/${area.slug}`} className="bg-paper-deep p-7 text-left transition-colors hover:bg-paper-soft"><p className="font-serif text-xl text-ink">{area.name}</p><p className="mt-2 text-sm text-ink-faint">{area.priceRange}</p></Link>)}</div></div></section>

      <section className="bg-paper px-6 py-24 md:px-8 md:py-32"><div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-12 md:gap-16"><div className="relative aspect-[4/5] overflow-hidden md:col-span-6 md:aspect-[4/5]"><Image src="/images/barry-mcgovern.jpg" alt="Barry McGovern" fill className="object-cover object-top" sizes="(max-width: 768px) 100vw, 50vw" /></div><div className="md:col-span-5 md:col-start-8"><p className="mb-5 text-[11px] uppercase tracking-[0.28em] text-ocean">Start a conversation</p><h2 className="font-serif text-4xl leading-tight text-ink md:text-5xl">A move made<br /><span className="font-normal italic text-ink-muted">with intention.</span></h2><p className="mt-7 text-[15px] leading-relaxed text-ink-muted">Confidential guidance and complimentary valuations, whether buying or selling.</p><div className="mt-9 flex flex-wrap gap-3"><a href="tel:+16463390154" className="bg-ocean px-7 py-3.5 text-sm text-paper hover:bg-ocean-deep">646-339-0154</a><Link href="/contact" className="border border-ocean px-7 py-3.5 text-sm text-ocean hover:bg-ocean hover:text-paper">Send a message</Link></div></div></div></section>
    </>
  );
}
