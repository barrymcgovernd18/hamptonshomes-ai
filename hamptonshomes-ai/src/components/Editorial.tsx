import type { CSSProperties, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

/** Stagger helper for [data-reveal] elements. */
export const revealDelay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

/** Numbered small-caps section label, e.g. "I.  Approach". */
export function SectionLabel({
  n,
  children,
  className = "text-ocean",
  as: Tag = "p",
  id,
}: {
  n?: string;
  children: ReactNode;
  className?: string;
  as?: "p" | "h2" | "h3";
  id?: string;
}) {
  return (
    <Tag id={id} data-reveal className={`eyebrow ${className}`}>
      {n ? (
        <>
          {n}. <span aria-hidden="true">&nbsp;</span>
        </>
      ) : null}
      {children}
    </Tag>
  );
}

type HeroProps = {
  eyebrow: ReactNode;
  title: ReactNode;
  italic?: ReactNode;
  intro?: ReactNode;
  aside?: ReactNode;
  footer?: ReactNode;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  /** Cream hero instead of the dark photographic one. */
  light?: boolean;
  compact?: boolean;
};

/** Shared page hero: full-bleed black-and-white photograph, or a quiet cream masthead. */
export function PageHero({ eyebrow, title, italic, intro, aside, footer, image, imageAlt = "", imagePosition = "50% 50%", light, compact }: HeroProps) {
  if (light) {
    return (
      <section className="bg-paper pb-16 pt-40 md:pb-24 md:pt-52">
        <div className="frame">
          <div className="grid gap-12 md:grid-cols-12 md:items-end">
            <div className="md:col-span-8">
              <p className="eyebrow hero-rise text-ocean" style={{ animationDelay: "120ms" }}>{eyebrow}</p>
              <h1 className="display-1 hero-rise mt-6 text-ink" style={{ animationDelay: "220ms" }}>
                {title}
                {italic ? (
                  <>
                    {" "}
                    <em className="block italic text-ink-muted">{italic}</em>
                  </>
                ) : null}
              </h1>
            </div>
            {aside ? <div className="hero-rise md:col-span-4" style={{ animationDelay: "420ms" }}>{aside}</div> : null}
          </div>
          {intro ? (
            <div className="hero-rise mt-12 border-t border-line pt-8 md:mt-16" style={{ animationDelay: "520ms" }}>
              <div className="body-copy text-ink-muted md:ml-[33.333%]">{intro}</div>
            </div>
          ) : null}
          {footer}
        </div>
      </section>
    );
  }
  return (
    <section
      className={`relative isolate overflow-hidden bg-ocean-deep text-paper ${
        compact ? "min-h-[560px] md:h-[72svh] md:max-h-[820px]" : "min-h-[620px] h-[88svh] max-h-[980px]"
      }`}
    >
      {image ? (
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          quality={80}
          sizes="100vw"
          className="hero-img photo-mono -z-10 object-cover"
          style={{ objectPosition: imagePosition }}
        />
      ) : null}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-52 bg-gradient-to-b from-black/60 to-transparent" />
      {image ? <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 bg-[rgba(12,24,29,0.32)] md:bg-[rgba(12,24,29,0.12)]" /> : null}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgba(12,24,29,0.9)_0%,rgba(12,24,29,0.6)_30%,rgba(12,24,29,0.15)_60%,rgba(12,24,29,0)_75%),linear-gradient(to_right,rgba(12,24,29,0.45)_0%,rgba(12,24,29,0)_55%)]"
      />
      <div className="frame flex h-full min-h-[inherit] flex-col justify-end pb-10 pt-32 md:pb-14">
        <div className="grid gap-10 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <p className="eyebrow hero-rise text-paper/85" style={{ animationDelay: "200ms" }}>{eyebrow}</p>
            <h1 className="display-1 hero-rise mt-6 text-paper" style={{ animationDelay: "320ms" }}>
              {title}
              {italic ? (
                <>
                  {" "}
                  <em className="block italic text-paper/80">{italic}</em>
                </>
              ) : null}
            </h1>
            {intro ? (
              <div className="hero-rise mt-7 max-w-[36rem] text-[15px] leading-[1.8] text-paper/85" style={{ animationDelay: "520ms" }}>
                {intro}
              </div>
            ) : null}
          </div>
          {aside ? (
            <div className="hero-rise md:col-span-4" style={{ animationDelay: "650ms" }}>{aside}</div>
          ) : null}
        </div>
        {footer ? (
          <div className="hero-rise mt-10 border-t border-paper/25 pt-6 md:mt-14" style={{ animationDelay: "800ms" }}>{footer}</div>
        ) : null}
      </div>
    </section>
  );
}

/** Quiet closing call to action on cream, so the dark footer always has a clear edge above it. */
export function ClosingInvitation({
  n,
  label,
  title,
  italic,
  body,
  href = "/contact",
  cta,
}: {
  n?: string;
  label: string;
  title: ReactNode;
  italic?: ReactNode;
  body?: ReactNode;
  href?: string;
  cta: string;
}) {
  return (
    <section className="border-t border-line bg-paper-deep py-24 md:py-36">
      <div className="frame grid gap-10 md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <SectionLabel n={n}>{label}</SectionLabel>
          <h2 data-reveal style={revealDelay(80)} className="display-2 mt-6 text-ink">
            {title}
            {italic ? (
              <>
                {" "}
                <em className="block italic text-ink-muted">{italic}</em>
              </>
            ) : null}
          </h2>
        </div>
        <div data-reveal style={revealDelay(160)} className="md:col-span-4 md:col-start-9">
          {body ? <p className="body-copy text-ink-muted">{body}</p> : null}
          <Link
            href={href}
            className="eyebrow mt-8 inline-block bg-ocean-deep px-9 py-4 text-paper transition-colors duration-500 hover:bg-ink"
          >
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
