import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import TradesShowcase from "@/components/TradesShowcase";
import { areas } from "@/lib/areas";
import { blogPosts } from "@/lib/blog";
import { allPress } from "@/lib/press";

const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

const KEY_NUMBERS = [
  { figure: "$250M+", label: "Personal sales volume" },
  { figure: "Over $2B", label: "Hedgerow transactions since 2020" },
  { figure: "18", label: "Oceanfront trades with Hedgerow since 2021" },
  { figure: "2013", label: "Sag Harbor local since" },
];

const PRESS = [
  "The Wall Street Journal",
  "Forbes",
  "Architectural Digest",
  "Robb Report",
  "Mansion Global",
  "The Real Deal",
  "Vogue",
  "27East",
];

export default function Home() {
  const note = blogPosts.find((p) => p.slug === "hamptons-oceanfront-market-2021-2026");

  return (
    <>
      {/* Hero */}
      <section data-hero className="relative isolate h-[100svh] min-h-[640px] max-h-[1080px] overflow-hidden bg-ocean-deep text-paper">
        <Image
          src="/images/barry-mcgovern-2.jpg"
          alt="Bayfront estate on the East End, in black and white"
          fill
          priority
          fetchPriority="high"
          quality={82}
          sizes="100vw"
          className="hero-zoom -z-10 object-cover object-[50%_58%]"
        />
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-44 bg-gradient-to-b from-black/40 to-transparent" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(12,24,29,0.88)_0%,rgba(12,24,29,0.55)_26%,rgba(12,24,29,0.12)_52%,rgba(12,24,29,0)_68%),linear-gradient(to_right,rgba(12,24,29,0.4)_0%,rgba(12,24,29,0)_50%)]"
        />

        <div className="frame flex h-full flex-col justify-end pb-10 md:pb-14">
          <div className="max-w-[44rem]">
            <p className="eyebrow text-paper/85">
              Hamptons Real Estate
            </p>
            <h1 className="display-1 mt-6 text-paper">
              Barry <br />
              McGovern
            </h1>
            <p
              className="mt-7 max-w-[30rem] font-serif text-[1.3rem] font-light leading-snug text-paper/95 md:text-[1.6rem]"
            >
              Oceanfront, waterfront, and estate properties, <em className="italic">from Southampton to Montauk.</em>
            </p>
          </div>

          <div
            className="mt-10 grid grid-cols-[1fr_auto] items-center gap-6 border-t border-paper/25 pt-6 md:mt-14 md:grid-cols-[1fr_auto_1fr]"
          >
            <div className="flex items-center gap-8">
              <Link href="/contact" className="eyebrow link-line text-paper">Inquire</Link>
              <Link href="/sales" className="eyebrow link-line text-paper/85 hover:text-paper">The Portfolio</Link>
            </div>
            <p className="eyebrow hidden whitespace-nowrap text-center text-paper/75 md:block">
              Licensed Real Estate Salesperson · Hedgerow Exclusive Properties
            </p>
            <div className="hidden items-center justify-end gap-4 sm:flex" aria-hidden="true">
              <span className="eyebrow text-paper/70">Scroll</span>
              <span className="relative block h-10 w-px overflow-hidden bg-paper/20">
                <span className="scroll-cue absolute inset-0 bg-paper" />
              </span>
            </div>
          </div>
          <p className="eyebrow mt-5 text-paper/75 md:hidden">Licensed Real Estate Salesperson<span className="block">Hedgerow Exclusive Properties</span></p>
        </div>
      </section>

      {/* I. Trades */}
      <TradesShowcase />

      {/* II. Key numbers */}
      <section aria-labelledby="numbers-heading" className="bg-ocean-deep py-24 text-paper md:py-32">
        <div className="frame">
          <div className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between">
            <p data-reveal className="eyebrow text-paper/70">II. &nbsp;In figures</p>
            <h2 id="numbers-heading" data-reveal className="display-3 max-w-xl font-light text-paper/90 md:text-right">
              A boutique firm, <em className="italic">over $2 billion</em> in Hamptons transactions.
            </h2>
          </div>
          <dl className="grid grid-cols-2 border-t border-paper/15 lg:grid-cols-4">
            {KEY_NUMBERS.map((item, i) => (
              <div
                key={item.label}
                data-reveal
                style={delay(i * 120)}
                className={`flex flex-col-reverse justify-end gap-4 border-b border-paper/15 py-8 sm:gap-5 sm:py-10 lg:border-b-0 lg:py-14 ${
                  i % 2 === 0 ? "pr-4 sm:pr-8" : "border-l pl-4 sm:px-8"
                } ${i === 2 ? "lg:border-l lg:pl-8" : ""}`}
              >
                <dt className="eyebrow max-w-[19em] text-paper/70">{item.label}</dt>
                <dd className="whitespace-nowrap font-serif text-[2.35rem] font-light leading-none tracking-[-0.01em] sm:text-[3.4rem] lg:text-[clamp(3rem,4.3vw,4.6rem)]">
                  {item.figure}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* III. Research */}
      {note && (
        <section className="bg-paper-deep py-28 md:py-40">
          <div className="frame grid gap-14 md:grid-cols-12 md:items-center md:gap-10">
            <Link href={`/blog/${note.slug}`} className="group block md:col-span-6" tabIndex={-1} aria-hidden="true">
              <div data-reveal="image" className="relative aspect-[4/5] overflow-hidden bg-ocean-deep md:aspect-[5/6]">
                <Image src="/images/33-lily-pond-lane-dusk.jpg" alt="" fill quality={50} sizes="(max-width: 768px) 100vw, 50vw" className="photo-bw object-cover object-[60%_50%]" />
              </div>
            </Link>
            <div className="md:col-span-5 md:col-start-8">
              <p data-reveal className="eyebrow text-ocean">III. &nbsp;Research · October 2026</p>
              <h2 data-reveal style={delay(80)} className="display-3 mt-6 text-ink">
                <Link href={`/blog/${note.slug}`} className="transition-colors hover:text-ocean">{note.title}</Link>
              </h2>
              <p data-reveal style={delay(160)} className="body-copy mt-6 text-ink-muted">{note.excerpt}</p>
              <dl data-reveal style={delay(240)} className="mt-10 grid grid-cols-3 border-y border-line">
                {[
                  { k: "87", v: "Oceanfront sales" },
                  { k: "$2.61B", v: "Total volume" },
                  { k: "$24.5M", v: "Median price" },
                ].map((s, i) => (
                  <div key={s.v} className={`flex flex-col-reverse gap-2 py-6 ${i ? "border-l border-line pl-5" : "pr-5"}`}>
                    <dt className="text-[11.5px] leading-snug text-ink-faint">{s.v}</dt>
                    <dd className="font-serif text-[1.9rem] font-light leading-none text-ink md:text-[2.3rem]">{s.k}</dd>
                  </div>
                ))}
              </dl>
              <div data-reveal style={delay(320)} className="mt-10 flex flex-wrap gap-x-10 gap-y-4">
                <Link href={`/blog/${note.slug}`} className="eyebrow link-line text-ink">Read the research</Link>
                <Link href="/market" className="eyebrow link-line text-ink-muted hover:text-ink">All market research</Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* IV. Approach */}
      <section className="bg-paper py-28 md:py-44">
        <div className="frame grid gap-12 md:grid-cols-12">
          <div className="md:col-span-3">
            <p data-reveal className="eyebrow text-ocean">IV. &nbsp;Approach</p>
          </div>
          <div className="md:col-span-9 lg:col-span-8">
            <p data-reveal className="lede text-ink">
              East End property rewards patience and precision. I advise on oceanfront, waterfront, and estate
              homes across the Hamptons, <em className="italic text-ink-muted">with discretion from the first conversation to a quiet closing.</em>
            </p>
            <div className="mt-14 grid gap-10 border-t border-line pt-10 sm:grid-cols-2 md:mt-20">
              <p data-reveal style={delay(100)} className="body-copy text-ink-muted">
                I am a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury
                Hamptons brokerage. Dublin-born, I have called the Hamptons home since 2013 and consider myself a Sag Harbor local.
              </p>
              <div data-reveal style={delay(200)}>
                <p className="body-copy text-ink-muted">
                  Buyers and sellers come to me for a clear read of the market, careful underwriting of each property,
                  and complete confidentiality.
                </p>
                <Link href="/about" className="eyebrow link-line mt-8 inline-block text-ink">About Barry</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* V. Press */}
      <section aria-labelledby="press-heading" className="border-t border-line bg-paper py-24 md:py-32">
        <div className="frame">
          <div className="flex items-end justify-between gap-8">
            <h2 id="press-heading" data-reveal className="eyebrow text-ocean">V. &nbsp;In the press</h2>
            <Link href="/press" data-reveal className="eyebrow link-line text-ink">All press</Link>
          </div>
          <div className="mt-12 grid gap-14 md:grid-cols-12 md:gap-10">
            <div className="md:col-span-7">
              <p data-reveal className="eyebrow text-ink-faint">Latest coverage</p>
              <ul className="mt-6 border-t border-ink/80">
                {allPress.slice(0, 4).map((item, i) => (
                  <li key={item.url} data-reveal style={delay(i * 70)} className="border-b border-line">
                    <a href={item.url} target="_blank" rel="noopener noreferrer" className="group grid gap-2 py-6 sm:grid-cols-[1fr_auto] sm:items-baseline sm:gap-8">
                      <span>
                        <span className="block font-serif text-[1rem] italic text-ink-muted">{item.outlet}</span>
                        <span className="mt-1 block font-serif text-[1.45rem] font-light leading-[1.25] text-ink transition-colors duration-500 group-hover:text-ocean md:text-[1.6rem]">{item.title}</span>
                      </span>
                      <span className="eyebrow whitespace-nowrap text-ink-faint">{item.role ? `${item.role} · ` : ""}{item.dateText.replace(/^(\w+) \d+, /, "$1 ")}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-4 md:col-start-9">
              <p data-reveal className="eyebrow text-ink-faint">Hedgerow Exclusive Properties, covered by</p>
              <ul className="mt-6 grid grid-cols-2 border-l border-t border-line">
                {PRESS.map((outlet, i) => (
                  <li key={outlet} data-reveal style={delay((i % 2) * 60)} className="border-b border-r border-line">
                    <Link
                      href="/press"
                      className="flex h-20 items-center justify-center px-3 text-center font-serif text-[1.05rem] leading-tight text-ink-muted transition-colors duration-500 hover:bg-paper-soft hover:text-ink md:h-24 md:text-[1.15rem]"
                    >
                      <span className={i % 3 === 1 ? "italic" : ""}>{outlet}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* VI. Villages */}
      <section className="border-t border-line bg-paper py-28 md:py-40">
        <div className="frame grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p data-reveal className="eyebrow text-ocean">VI. &nbsp;The villages</p>
            <h2 data-reveal style={delay(80)} className="display-2 mt-6 text-ink">
              Southampton <br />
              <em className="italic text-ink-muted">to Montauk</em>
            </h2>
            <p data-reveal style={delay(160)} className="body-copy mt-8 text-ink-muted">
              Ten villages, each its own market. Reports on pricing, setting, and recent sales.
            </p>
          </div>
          <ol className="md:col-span-7 md:col-start-6 md:grid md:grid-cols-2 md:gap-x-12">
            {areas.map((area, i) => (
              <li key={area.slug} data-reveal style={delay((i % 2) * 80)} className="border-b border-line first:border-t md:[&:nth-child(2)]:border-t">
                <Link href={`/${area.slug}`} className="group flex items-baseline gap-5 py-5">
                  <span className="eyebrow w-6 text-ink-faint">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-[1.55rem] font-light leading-none text-ink transition-transform duration-700 group-hover:translate-x-1.5">
                    {area.name}
                  </span>
                  <span className="ml-auto text-[12px] text-ink-faint">{area.priceRange.replace(/\s*-\s*/, " to ")}</span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* VII. Contact */}
      <section className="bg-paper-soft">
        <div className="frame grid gap-14 py-28 md:grid-cols-12 md:items-center md:py-40">
          <div data-reveal="image" className="relative aspect-[4/5] overflow-hidden bg-paper-deep md:col-span-5">
            <Image src="/images/barry-mcgovern.jpg" alt="Barry McGovern" fill sizes="(max-width: 768px) 100vw, 40vw" className="photo-bw object-cover object-top" />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <p data-reveal className="eyebrow text-ocean">VII. &nbsp;Private inquiries</p>
            <h2 data-reveal style={delay(80)} className="display-2 mt-6 text-ink">
              A conversation, <br />
              <em className="italic text-ink-muted">in confidence.</em>
            </h2>
            <p data-reveal style={delay(160)} className="body-copy mt-8 text-ink-muted">
              Complimentary valuations and confidential guidance, whether you are buying, selling, or simply watching the market.
            </p>
            <dl data-reveal style={delay(240)} className="mt-12 divide-y divide-line border-y border-line text-[15px]">
              <div className="flex items-baseline justify-between gap-6 py-5">
                <dt className="eyebrow text-ink-faint">Telephone</dt>
                <dd><a href="tel:+16463390154" className="font-serif text-[1.35rem] text-ink hover:text-ocean">646.339.0154</a></dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-5">
                <dt className="eyebrow text-ink-faint">Email</dt>
                <dd><a href="mailto:barry@hedgerowexclusive.com" className="font-serif text-[1.2rem] text-ink hover:text-ocean sm:text-[1.35rem]">barry@hedgerowexclusive.com</a></dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-5">
                <dt className="eyebrow text-ink-faint">Office</dt>
                <dd className="text-right text-[13.5px] leading-relaxed text-ink-muted">Hedgerow Exclusive Properties<br />2495 Montauk Highway, Bridgehampton</dd>
              </div>
            </dl>
            <Link
              href="/contact"
              data-reveal
              style={delay(320)}
              className="eyebrow mt-12 inline-block bg-ocean-deep px-9 py-4 text-paper transition-colors duration-500 hover:bg-ink"
            >
              Send a message
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
