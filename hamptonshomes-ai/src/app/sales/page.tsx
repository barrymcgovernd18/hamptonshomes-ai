import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notableSales, personalVolume, teamVolume } from "@/lib/sales";

export const metadata: Metadata = {
  title: "Portfolio | Barry McGovern Notable Sales",
  description: "Explore Barry McGovern's documented notable sales across the Hamptons, including oceanfront, waterfront, village, and private transactions.",
  alternates: { canonical: "https://hamptonshomes.ai/sales" },
};

export default function SalesPage() {
  const withPhotos = notableSales.filter((sale) => sale.image);
  const privateSales = notableSales.filter((sale) => !sale.image);
  return (
    <div className="bg-paper text-ink">
      <section className="border-b border-line bg-ocean-deep pt-32 pb-20 text-paper">
        <div className="mx-auto max-w-7xl px-6 md:px-8">
          <p className="mb-4 text-[10px] uppercase tracking-[0.5em] text-ocean-soft">Barry McGovern · Portfolio</p>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h1 className="font-serif text-5xl leading-tight md:text-7xl">Notable<br /><span className="font-normal italic text-paper/65">Sales</span></h1>
              <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-paper/65">A record of selected oceanfront, waterfront, village, and private transactions. These are Barry McGovern's portfolio records—not a feed of third-party listings.</p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-left md:text-right">
              <div><p className="font-serif text-2xl text-paper">{personalVolume}</p><p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-paper/45">Personal volume</p></div>
              <div><p className="font-serif text-2xl text-paper">{teamVolume}</p><p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-paper/45">Team volume</p></div>
            </div>
          </div>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-28">
        <div className="mb-12 flex items-end justify-between gap-6"><div><p className="mb-3 text-[10px] uppercase tracking-[0.4em] text-ocean">Documented portfolio</p><h2 className="font-serif text-4xl md:text-5xl">Selected transactions</h2></div><p className="hidden max-w-xs text-right text-[12px] leading-relaxed text-ink-muted md:block">Property details are presented as portfolio records and should not be read as current availability.</p></div>
        <div className="space-y-6">
          {withPhotos.map((sale) => <article key={sale.slug} className="group relative overflow-hidden bg-ocean-deep"><div className="relative aspect-[16/10] md:aspect-[21/9]"><Image src={sale.image!} alt={`${sale.address}, ${sale.area}`} fill className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]" sizes="100vw" /><div className="absolute inset-0 bg-gradient-to-r from-ocean-deep/90 via-ocean-deep/35 to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6 text-paper md:p-10"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><p className="mb-2 text-[10px] uppercase tracking-[0.3em] text-ocean-soft">{sale.area}</p><h3 className="font-serif text-2xl md:text-4xl">{sale.address}</h3><p className="mt-3 text-[12px] text-paper/55">{sale.status}{sale.sqft ? ` · ${sale.sqft} SF` : ""}{sale.acres ? ` · ${sale.acres} acres` : ""}</p></div><p className="font-serif text-2xl md:text-3xl">{sale.price}</p></div></div></div></article>)}
        </div>
      </section>
      <section className="border-y border-line bg-paper-soft py-20 md:py-24"><div className="mx-auto max-w-7xl px-6 md:px-8"><p className="mb-8 text-[10px] uppercase tracking-[0.4em] text-ocean">Private transactions</p><div className="grid gap-4 md:grid-cols-3">{privateSales.map((sale) => <div key={sale.slug} className="border border-line bg-paper p-7"><p className="font-serif text-xl">{sale.address}</p><p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-ocean">{sale.area}</p><p className="mt-6 font-serif text-xl">{sale.price}</p><p className="mt-1 text-[12px] text-ink-muted">{sale.status}</p></div>)}</div></div></section>
      <section className="mx-auto max-w-3xl px-6 py-24 text-center md:px-8"><h2 className="font-serif text-3xl md:text-4xl">Looking for the right setting?</h2><p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-ink-muted">Barry offers confidential guidance for buyers and sellers across the East End, from Southampton to Montauk.</p><Link href="/contact" className="mt-8 inline-block bg-ocean px-8 py-3.5 text-[11px] uppercase tracking-[0.3em] text-paper transition-colors hover:bg-ocean-deep">Start a conversation</Link></section>
    </div>
  );
}
