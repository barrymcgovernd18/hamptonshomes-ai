import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, SectionLabel, revealDelay } from "@/components/Editorial";
import { routeMetadata } from "@/lib/schema";
import { featuredPress, hedgerowPress, type PressItem } from "@/lib/press";

export const metadata: Metadata = routeMetadata({
  title: "Press",
  description:
    "Barry McGovern in Behind The Hedges, 27East and James Lane Post, and Hedgerow Exclusive Properties in The Wall Street Journal, Forbes and The Real Deal.",
  path: "/press",
  image: "/og/press.jpg",
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
  const outlets = Array.from(new Set([...featuredPress, ...hedgerowPress].map((item) => item.outlet)));
  return (
    <div className="bg-paper text-ink">
      <PageHero
        compact
        eyebrow="Press"
        title="In the"
        italic="Headlines"
        intro={<p>Barry McGovern on the East End market, and Hedgerow Exclusive Properties in print and online.</p>}
        aside={
          <ul aria-label="Outlets" className="hidden columns-2 gap-8 border-l border-paper/20 pl-8 font-serif text-[1.15rem] italic leading-[1.9] text-paper/75 md:block">
            {outlets.map((outlet) => (
              <li key={outlet} className="break-inside-avoid">{outlet}</li>
            ))}
          </ul>
        }
      />

      {/* I. Featured: independent articles that name Barry */}
      <section className="py-24 md:py-36">
        <div className="frame grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel n="I" as="h2">Featuring Barry</SectionLabel>
            <p data-reveal style={revealDelay(80)} className="display-3 mt-6 max-w-[16ch] font-light text-ink">
              Quoted, interviewed, <em className="italic text-ink-muted">and on the panel.</em>
            </p>
          </div>
          <ol className="border-t border-ink/80 md:col-span-8">
            {featuredPress.map((item, i) => (
              <li key={item.url} data-reveal style={revealDelay((i % 4) * 60)} className="border-b border-line">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-3 py-8 sm:grid-cols-[9.5rem_1fr] sm:gap-8 md:py-9"
                >
                  <div className="flex items-baseline gap-4 sm:block">
                    <p className="eyebrow text-ink-faint"><time dateTime={item.date}>{item.dateText}</time></p>
                    {item.role ? <p className="eyebrow text-ocean sm:mt-3">{item.role}</p> : null}
                  </div>
                  <div>
                    <p className="font-serif text-[1.05rem] italic text-ink-muted">{item.outlet}</p>
                    <h3 className="mt-1.5 font-serif text-[1.65rem] font-light leading-[1.2] text-ink transition-colors duration-500 group-hover:text-ocean md:text-[1.9rem]">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-[60ch] text-[14px] leading-[1.8] text-ink-muted">{item.summary}</p>
                    <p className="mt-4">
                      <span className="link-line eyebrow text-ink">Read at {item.outlet} <span aria-hidden="true">→</span></span>
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* II. Hedgerow Exclusive in the press */}
      <section className="defer-render border-t border-line bg-paper-soft py-24 md:py-36">
        <div className="frame">
          <SectionLabel n="II" as="h2">Hedgerow Exclusive Properties in the press</SectionLabel>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
            {hedgerowPress.map((item, i) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                style={revealDelay((i % 3) * 80)}
                className="group flex flex-col"
              >
                {item.image ? (
                  <div className="relative aspect-[3/2] overflow-hidden bg-paper-deep">
                    <Image
                      src={item.image}
                      alt={item.alt ?? item.title}
                      fill
                      className="photo-bw object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                ) : null}
                <div className="flex flex-1 flex-col pt-6">
                  <Meta item={item} className="eyebrow text-ink-faint" />
                  <h3 className="mt-3 font-serif text-[1.45rem] font-light leading-[1.25] text-ink transition-colors duration-500 group-hover:text-ocean">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-[13px] leading-[1.75] text-ink-muted">{item.summary}</p>
                  <p className="mt-auto pt-5">
                    <span className="link-line eyebrow text-ink-muted">Read at {item.outlet} <span aria-hidden="true">→</span></span>
                  </p>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-16 border-t border-line pt-6 text-[11px] leading-relaxed text-ink-faint">
            Images courtesy of Hedgerow Exclusive Properties.
          </p>
        </div>
      </section>
    </div>
  );
}
