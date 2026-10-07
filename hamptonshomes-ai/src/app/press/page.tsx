import type { Metadata } from "next";
import Image from "next/image";
import { routeMetadata } from "@/lib/schema";
import { featuredPress, hedgerowPress, type PressItem } from "@/lib/press";

export const metadata: Metadata = routeMetadata({
  title: "Press",
  description:
    "Barry McGovern and Hedgerow Exclusive Properties in the press: Forbes, The Wall Street Journal, Architectural Digest, Vogue, The Real Deal, Robb Report, Mansion Global, and more, with links to the original articles.",
  path: "/press",
});

function Meta({ item, className }: { item: PressItem; className: string }) {
  return (
    <p className={className}>
      {item.outlet}
      <span className="mx-2 opacity-50">·</span>
      <time dateTime={item.date}>{item.dateText}</time>
    </p>
  );
}

export default function PressPage() {
  return (
    <div className="bg-ocean-deep">
      {/* Hero */}
      <section className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-ocean-soft/60 text-[10px] tracking-[0.5em] uppercase mb-4">Press</p>
          <h1 className="font-serif text-5xl md:text-7xl text-white leading-tight">
            In the
            <br />
            <span className="italic font-normal text-white/60">Headlines</span>
          </h1>
          <p className="mt-8 max-w-xl text-[14px] leading-relaxed text-white/45">
            My own press first, then Hedgerow Exclusive Properties in the press. Each item links to the original article at the publisher.
          </p>
        </div>
      </section>

      {/* Featured: Barry's own mentions */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-ocean-soft/60 text-[10px] tracking-[0.5em] uppercase mb-10">Featured</p>
          <div className="grid md:grid-cols-3 gap-5">
            {featuredPress.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-white/5 hover:border-ocean-soft/30 transition-all duration-700 group flex flex-col overflow-hidden"
              >
                {item.image ? (
                  <div className="relative h-56 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt ?? item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 via-ocean-deep/20 to-transparent" />
                  </div>
                ) : (
                  <div className="flex h-56 items-end bg-gradient-to-br from-ocean/40 to-ocean-deep p-8">
                    <p className="font-serif text-4xl italic text-white/25">{item.outlet}</p>
                  </div>
                )}
                <div className="flex flex-1 flex-col p-8">
                  <Meta item={item} className="text-ocean-soft/70 text-[10px] tracking-[0.3em] uppercase mb-4" />
                  <h2 className="font-serif text-xl md:text-2xl text-white group-hover:text-ocean-soft transition-colors duration-500 leading-snug">
                    {item.title}
                  </h2>
                  <p className="mt-4 text-[14px] leading-relaxed text-white/45">{item.summary}</p>
                  <p className="mt-auto pt-6 text-white/20 text-[11px] tracking-[0.2em] uppercase group-hover:text-ocean-soft/70 transition-colors duration-500">
                    Read the original →
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Hedgerow Exclusive in the press */}
      <section className="pb-32">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <p className="text-ocean-soft/60 text-[10px] tracking-[0.5em] uppercase">Hedgerow Exclusive in the press</p>
            <p className="text-white/30 text-[11px]">{hedgerowPress.length} articles, newest first</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hedgerowPress.map((item) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden border border-white/5 hover:border-ocean-soft/20 transition-all duration-500"
              >
                {item.image ? (
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.alt ?? item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/70 to-transparent" />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col p-6">
                  <Meta item={item} className="text-ocean-soft/55 text-[9px] tracking-[0.3em] uppercase mb-3" />
                  <h3 className="text-white/80 group-hover:text-white text-[15px] leading-relaxed transition-colors duration-500">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-white/40">{item.summary}</p>
                  <p className="mt-auto pt-5 text-white/20 text-[10px] tracking-[0.2em] uppercase group-hover:text-ocean-soft/70 transition-colors duration-500">
                    Read at {item.outlet} →
                  </p>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-10 text-[11px] leading-relaxed text-white/25">
            Headlines and dates as listed on the Hedgerow Exclusive Properties press page. Images courtesy of Hedgerow Exclusive Properties. Articles belong to their publishers.
          </p>
        </div>
      </section>
    </div>
  );
}
