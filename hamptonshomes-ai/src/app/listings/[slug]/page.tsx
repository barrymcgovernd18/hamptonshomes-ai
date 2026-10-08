import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import LeadForm from "@/components/LeadForm";
import EqualHousingLogo from "@/components/EqualHousing";
import { PageHero, SectionLabel, revealDelay } from "@/components/Editorial";
import { formatPrice, listingBySlug, listingPages, type ListingPage } from "@/lib/listing-pages";
import { HEDGEROW, OFFICE_ADDRESS, PERSON_ID, PLACE_SLUGS, SITE_URL, breadcrumbListJsonLd, routeMetadata } from "@/lib/schema";

type Props = { params: Promise<{ slug: string }> };

const FAIR_HOUSING_NOTICE =
  "https://dos.ny.gov/system/files/documents/2025/03/nys-housing-and-anti-discrimination-notice_02.2025.pdf";

export const dynamicParams = false;

export function generateStaticParams() {
  return listingPages.map((l) => ({ slug: l.slug }));
}

function metaDescription(l: ListingPage) {
  const facts = [l.beds && `${l.beds} bedrooms`, l.sqft && `${l.sqft} sq ft`, l.acres && `${l.acres} acres`].filter(Boolean).join(", ");
  const base = `${l.address}, ${l.area}, ${l.status === "In contract" ? "in contract" : "offered"} at ${formatPrice(l.price)}${facts ? `: ${facts}` : ""}. ${l.headline}. Inquire with Barry McGovern, Hedgerow Exclusive Properties.`;
  if (base.length <= 155) return base;
  const short = `${l.address}, ${l.area}, ${formatPrice(l.price)}${facts ? `: ${facts}` : ""}.`;
  const tail = " Inquire with Barry McGovern, Hedgerow Exclusive Properties.";
  const withHeadline = `${short} ${l.headline}.${tail}`;
  return withHeadline.length <= 155 ? withHeadline : `${short}${tail}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const l = listingBySlug(slug);
  if (!l) return {};
  return routeMetadata({
    title: `${l.address}, ${l.area}`,
    description: metaDescription(l),
    path: `/listings/${l.slug}`,
    image: `/og/listings/${l.slug}.jpg`,
  });
}

function bathsTotal(baths?: string) {
  if (!baths) return undefined;
  const nums = baths.match(/\d+/g)?.map(Number) ?? [];
  return nums.length ? nums.reduce((a, b) => a + b, 0) : undefined;
}

function listingJsonLd(l: ListingPage) {
  const url = `${SITE_URL}/listings/${l.slug}`;
  const address = {
    "@type": "PostalAddress",
    streetAddress: l.address,
    addressLocality: l.area,
    addressRegion: "NY",
    postalCode: l.zip,
    addressCountry: "US",
  };
  const residence =
    l.type === "Land"
      ? { "@type": "Place", name: `${l.address}, ${l.area}`, address }
      : {
          "@type": l.type === "Compound" ? "Accommodation" : "SingleFamilyResidence",
          name: `${l.address}, ${l.area}`,
          address,
          ...(l.beds ? { numberOfBedrooms: Number(l.beds) } : {}),
          ...(bathsTotal(l.baths) ? { numberOfBathroomsTotal: bathsTotal(l.baths) } : {}),
          ...(l.sqft ? { floorSize: { "@type": "QuantitativeValue", value: Number(l.sqft.replace(/,/g, "")), unitCode: "FTK" } } : {}),
          ...(l.yearBuilt ? { yearBuilt: Number(l.yearBuilt) } : {}),
        };
  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": `${url}#listing`,
    url,
    name: `${l.address}, ${l.area}, NY`,
    description: l.description.join(" "),
    image: l.images.slice(0, 4).map((src) => `${SITE_URL}${src}`),
    about: residence,
    offers: {
      "@type": "Offer",
      price: l.price,
      priceCurrency: "USD",
      availability: l.status === "For sale" ? "https://schema.org/InStock" : "https://schema.org/LimitedAvailability",
      businessFunction: "http://purl.org/goodrelations/v1#Sell",
      offeredBy: { "@type": "RealEstateAgent", "@id": HEDGEROW.id, name: HEDGEROW.name, url: HEDGEROW.url, address: OFFICE_ADDRESS },
    },
    provider: { "@id": PERSON_ID },
  };
}

function Facts({ l }: { l: ListingPage }) {
  const rows: [string, string][] = [
    ["Price", formatPrice(l.price)],
    ["Status", l.status],
    ["Village", l.area],
    ...(l.beds ? [["Bedrooms", l.beds] as [string, string]] : []),
    ...(l.baths ? [["Baths", l.baths] as [string, string]] : []),
    ...(l.sqft ? [["Interior", `${l.sqft} sq ft`] as [string, string]] : []),
    ...(l.acres ? [["Lot", `${l.acres} acres`] as [string, string]] : []),
    ...(l.yearBuilt ? [["Built", l.yearBuilt] as [string, string]] : []),
    ...(l.type === "Land" ? [["Type", "Land"] as [string, string]] : []),
  ];
  return (
    <dl className="divide-y divide-line border-y border-ink/80">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-baseline justify-between gap-6 py-4">
          <dt className="eyebrow text-ink-faint">{k}</dt>
          <dd className={k === "Price" ? "font-serif text-[1.6rem] text-ocean" : "text-right text-[15px] text-ink"}>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function related(l: ListingPage) {
  const others = listingPages.filter((x) => x.slug !== l.slug);
  const same = others.filter((x) => x.area === l.area);
  const rest = others.filter((x) => x.area !== l.area).sort((a, b) => Math.abs(a.price - l.price) - Math.abs(b.price - l.price));
  return [...same, ...rest].slice(0, 3);
}

export default async function ListingPageRoute({ params }: Props) {
  const { slug } = await params;
  const l = listingBySlug(slug);
  if (!l) notFound();
  const [hero, ...gallery] = l.images;
  const villageSlug = PLACE_SLUGS[l.area as keyof typeof PLACE_SLUGS];
  const stats = [l.beds && `${l.beds} BD`, l.baths && `${l.baths.replace(/ full, /, "F ").replace(/ half/, "H")} BA`, l.sqft && `${l.sqft} SF`, l.acres && `${l.acres} AC`].filter(Boolean);

  return (
    <div className="bg-paper text-ink">
      <JsonLd data={listingJsonLd(l)} />
      <JsonLd
        data={breadcrumbListJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/sales" },
          { name: `${l.address}, ${l.area}`, path: `/listings/${l.slug}` },
        ])}
      />

      <PageHero
        compact
        eyebrow={`${l.status} · ${l.area}`}
        title={l.address}
        italic={l.area}
        image={hero}
        imageAlt={`${l.address}, ${l.area}. Photo courtesy of Hedgerow Exclusive Properties`}
        aside={
          <div className="md:text-right">
            <p className="font-serif text-[2.6rem] font-light leading-none text-paper">{formatPrice(l.price)}</p>
            {stats.length ? <p className="mt-4 text-[12px] tracking-[0.08em] text-paper/85">{stats.join(" · ")}</p> : null}
          </div>
        }
      />

      <nav aria-label="Breadcrumb" className="frame pt-8">
        <ol className="flex flex-wrap gap-x-3 text-[12px] text-ink-faint">
          <li><Link href="/sales" className="hover:text-ocean">Portfolio</Link></li>
          <li aria-hidden="true">/</li>
          {villageSlug ? (
            <>
              <li><Link href={`/${villageSlug}`} className="hover:text-ocean">{l.area}</Link></li>
              <li aria-hidden="true">/</li>
            </>
          ) : null}
          <li aria-current="page" className="text-ink-muted">{l.address}</li>
        </ol>
      </nav>

      {/* I. The property */}
      <section className="py-20 md:py-28">
        <div className="frame grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel n="I">The property</SectionLabel>
            <h2 data-reveal style={revealDelay(80)} className="display-2 mt-6 text-ink">{l.headline}</h2>
            <div className="mt-10 space-y-6">
              {l.description.map((p, i) => (
                <p key={i} className={i === 0 ? "lede text-ink" : "body-copy text-ink-muted"}>{p}</p>
              ))}
            </div>
          </div>
          <div className="md:col-span-4 md:col-start-9 md:pt-2">
            <Facts l={l} />
            <a href="#inquire" className="eyebrow mt-8 inline-block w-full bg-ocean-deep px-8 py-4 text-center text-paper transition-colors duration-500 hover:bg-ink">
              Inquire with Barry
            </a>
            <p className="mt-4 text-center text-[13px] text-ink-muted">
              Or call <a href="tel:+16463390154" className="link-line text-ink">646.339.0154</a>
            </p>
          </div>
        </div>
      </section>

      {/* II. Gallery */}
      {gallery.length ? (
        <section aria-labelledby="gallery-heading" className="defer-render pb-20 md:pb-28">
          <div className="frame">
            <SectionLabel n="II" as="h2" id="gallery-heading">Gallery</SectionLabel>
            <div className="mt-10 grid grid-cols-2 gap-2 md:grid-cols-6">
              {gallery.map((src, i) => {
                const wide = i % 5 === 0;
                return (
                  <div key={src} className={`relative overflow-hidden bg-paper-deep ${wide ? "col-span-2 aspect-[16/10] md:col-span-4" : "aspect-[4/3] md:col-span-2"} ${i % 5 === 1 ? "md:aspect-auto md:row-span-1" : ""}`}>
                    <Image
                      src={src}
                      alt={`${l.address}, ${l.area}, photograph ${i + 2} of ${l.images.length}. Courtesy of Hedgerow Exclusive Properties`}
                      fill
                      quality={60}
                      sizes={wide ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 50vw, 33vw"}
                      className="object-cover"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* III. Highlights */}
      <section className="defer-render border-t border-line bg-paper-soft py-20 md:py-28">
        <div className="frame grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <SectionLabel n="III">Highlights</SectionLabel>
          </div>
          <ul className="grid gap-x-12 md:col-span-8 md:grid-cols-2">
            {l.highlights.map((h) => (
              <li key={h} className="border-b border-line py-4 font-serif text-[1.25rem] font-light leading-snug text-ink">{h}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* IV. Inquire */}
      <section id="inquire" aria-labelledby="inquire-heading" className="scroll-mt-24 border-t border-line bg-paper-deep py-20 md:py-28">
        <div className="frame grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <SectionLabel n="IV">Private inquiries</SectionLabel>
            <h2 id="inquire-heading" data-reveal style={revealDelay(80)} className="display-2 mt-6 text-ink">
              Inquire about <em className="block italic text-ink-muted">{l.address}</em>
            </h2>
            <p className="body-copy mt-6 text-ink-muted">
              Request the full brochure, floor plans or a private showing. Barry McGovern replies personally, in confidence.
            </p>
            <dl className="mt-10 divide-y divide-line border-y border-line text-[15px]">
              <div className="flex items-baseline justify-between gap-6 py-4">
                <dt className="eyebrow text-ink-faint">Telephone</dt>
                <dd><a href="tel:+16463390154" className="font-serif text-[1.3rem] text-ink hover:text-ocean">646.339.0154</a></dd>
              </div>
              <div className="flex items-baseline justify-between gap-6 py-4">
                <dt className="eyebrow text-ink-faint">Email</dt>
                <dd><a href="mailto:barry@hedgerowexclusive.com" className="font-serif text-[1.1rem] text-ink hover:text-ocean sm:text-[1.3rem]">barry@hedgerowexclusive.com</a></dd>
              </div>
            </dl>
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <LeadForm kind="listing" listing={l.slug} defaultMessage={`I would like more information on ${l.address}, ${l.area}.`} />
          </div>
        </div>

        {/* Compliance */}
        <div className="frame mt-20 border-t border-ink/80 pt-8 md:mt-24">
          <div className="grid gap-8 text-[12.5px] leading-relaxed text-ink-muted md:grid-cols-12">
            <div className="md:col-span-8">
              <p className="eyebrow text-ink">Listing courtesy of Hedgerow Exclusive Properties</p>
              <p className="mt-3">
                Hedgerow Exclusive Properties, 2495 Montauk Highway, Bridgehampton, NY 11932. Barry McGovern, Licensed Real Estate Salesperson,
                NY License #10401353717. <a href="tel:+16463390154" className="underline decoration-ink-faint/40 underline-offset-[3px]">646.339.0154</a>
                {" · "}
                <a href="mailto:barry@hedgerowexclusive.com" className="underline decoration-ink-faint/40 underline-offset-[3px]">barry@hedgerowexclusive.com</a>
              </p>
              <p className="mt-3">
                Listing information is provided by Hedgerow Exclusive Properties and deemed reliable but not guaranteed. Price, availability and
                dimensions are approximate and subject to change. Photographs courtesy of Hedgerow Exclusive Properties.
              </p>
            </div>
            <div className="flex items-start gap-4 md:col-span-4 md:justify-end">
              <EqualHousingLogo className="h-10 w-10 shrink-0 text-ink" />
              <p>
                Equal Housing Opportunity.{" "}
                <a href={FAIR_HOUSING_NOTICE} target="_blank" rel="noopener" className="underline decoration-ink-faint/40 underline-offset-[3px]">
                  New York State Fair Housing Notice
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* V. More listings */}
      <section className="defer-render border-t border-line py-20 md:py-28">
        <div className="frame">
          <SectionLabel n="V">Also available</SectionLabel>
          <div className="mt-10 grid gap-x-8 gap-y-12 md:grid-cols-3">
            {related(l).map((r) => (
              <Link key={r.slug} href={`/listings/${r.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-paper-deep">
                  <Image src={r.images[0]} alt={`${r.address}, ${r.area}`} fill quality={50} sizes="(max-width: 768px) 100vw, 33vw" className="photo-bw object-cover" />
                </div>
                <p className="eyebrow mt-5 text-ocean">{r.status} · {r.area}</p>
                <div className="mt-2 flex items-baseline justify-between gap-4">
                  <p className="font-serif text-[1.45rem] font-light leading-tight text-ink">{r.address}</p>
                  <p className="whitespace-nowrap font-serif text-[1.2rem] text-ocean">{formatPrice(r.price)}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link href="/sales#listings" className="link-line eyebrow mt-12 inline-block text-ocean">
            All Hedgerow listings <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
