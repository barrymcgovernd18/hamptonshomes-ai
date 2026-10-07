import type { Metadata } from "next";
import Image from "next/image";
import { PageHero, SectionLabel, revealDelay } from "@/components/Editorial";
import { routeMetadata } from "@/lib/schema";
import { featuredPress, hedgerowPress, type PressItem } from "@/lib/press";

export const metadata: Metadata = routeMetadata({
  title: "Press",
  description:
    "Barry McGovern and Hedgerow Exclusive Properties in the press, from The Wall Street Journal and Forbes to The Real Deal, Robb Report, and 27East.",
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
  const outlets = Array.from(new Set([...featuredPress, ...hedgerowPress].map((item) => item.outlet)));
  return (
    <div className="bg-paper text-ink">
      <PageHero
        compact
        eyebrow="Press"
        title="In the"
        italic="Headlines"
        intro={<p>Barry McGovern and Hedgerow Exclusive Properties, in print and online.</p>}
        aside={
          <ul aria-label="Outlets" className="hidden columns-2 gap-8 border-l border-paper/20 pl-8 font-serif text-[1.15rem] italic leading-[1.9] text-paper/75 md:block">
            {outlets.map((outlet) => (
              <li key={outlet} className="break-inside-avoid">{outlet}</li>
            ))}
          </ul>
        }
      />

      {/* I. Featured: Barry's own mentions */}
      <section className="py-24 md:py-36">
        <div className="frame">
          <SectionLabel n="I">Featured</SectionLabel>
          <div className="mt-12 grid gap-x-10 gap-y-16 md:mt-16 md:grid-cols-3">
            {featuredPress.map((item, i) => (
              <a
                key={item.url}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                data-reveal
                style={revealDelay(i * 100)}
                className="group flex flex-col"
              >
                {item.image ? (
                  <div className="relative aspect-[4/5] overflow-hidden bg-paper-deep">
                    <Image src={item.image} alt={item.alt ?? item.title} fill className="photo-bw object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                  </div>
                ) : (
                  <div className="relative flex aspect-[4/5] flex-col justify-between overflow-hidden bg-ocean-deep p-8 md:p-10">
                    <p className="eyebrow text-paper/70">In conversation</p>
                    <div>
                      <p className="display-2 text-paper transition-transform duration-700 [transition-timing-function:var(--ease-editorial)] group-hover:-translate-y-1">{item.outlet}</p>
                      <div className="mt-6 h-px w-12 bg-paper/50 transition-all duration-700 group-hover:w-24" />
                    </div>
                  </div>
                )}
                <div className="flex flex-1 flex-col pt-7">
                  <Meta item={item} className="eyebrow text-ocean" />
                  <h2 className="display-3 mt-4 font-light text-ink">{item.title}</h2>
                  <p className="mt-4 text-[14px] leading-[1.8] text-ink-muted">{item.summary}</p>
                  <p className="mt-auto pt-7">
                    <span className="link-line eyebrow text-ink">Read at {item.outlet} →</span>
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* II. Hedgerow Exclusive in the press */}
      <section className="defer-render border-t border-line bg-paper-soft py-24 md:py-36">
        <div className="frame">
          <SectionLabel n="II" as="h2">Hedgerow Exclusive in the press</SectionLabel>
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
                    <span className="link-line eyebrow text-ink-muted">Read at {item.outlet} →</span>
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
