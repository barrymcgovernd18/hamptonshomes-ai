/**
 * Canonical entity + JSON-LD for HamptonsHomes.ai.
 * Do not put firm volume, rankings, or personal production figures in schema.
 */

import type { Metadata } from "next";
import { OG_ALT } from "@/lib/seo-copy";

export const SITE_URL = "https://hamptonshomes.ai";
export const SITE_NAME = "HamptonsHomes.ai";
export const COASTAL_ABOUT_URL = "https://hamptonscoastal.com/about/barry-mcgovern";
export const PERSON_CANONICAL_URL = `${SITE_URL}/about`;

export const HEDGEROW = {
  name: "Hedgerow Exclusive Properties",
  url: "https://hedgerowexclusive.com/",
  id: "https://hedgerowexclusive.com/#organization",
  memberUrl: "https://hedgerowexclusive.com/members/barry-mcgovern/",
} as const;

export const OFFICE_ADDRESS = {
  "@type": "PostalAddress" as const,
  streetAddress: "2495 Montauk Highway",
  addressLocality: "Bridgehampton",
  addressRegion: "NY",
  postalCode: "11932",
  addressCountry: "US",
};

export const PLACE_NAMES = [
  "Southampton",
  "Water Mill",
  "Bridgehampton",
  "Sagaponack",
  "Sag Harbor",
  "Wainscott",
  "East Hampton",
  "Amagansett",
  "Montauk",
  "Shelter Island",
] as const;

export const PLACE_SLUGS: Record<(typeof PLACE_NAMES)[number], string> = {
  Southampton: "southampton",
  "Water Mill": "water-mill",
  Bridgehampton: "bridgehampton",
  Sagaponack: "sagaponack",
  "Sag Harbor": "sag-harbor",
  Wainscott: "wainscott",
  "East Hampton": "east-hampton",
  Amagansett: "amagansett",
  Montauk: "montauk",
  "Shelter Island": "shelter-island",
};

/** Locked entity blurb. $2B is firm-level prose only. */
export const BARRY_BLURB =
  "Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020. Dublin-born and a Sag Harbor local since 2013, Barry focuses on oceanfront, waterfront, estate-section, and private-market opportunities from Southampton to Montauk, and has been involved with the firm's landmark and record-breaking work.";

/** Schema description: same blurb without the firm-volume sentence. */
export const BARRY_SCHEMA_DESCRIPTION =
  "Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage. Dublin-born and a Sag Harbor local since 2013, Barry focuses on oceanfront, waterfront, estate-section, and private-market opportunities from Southampton to Montauk, and has been involved with the firm's landmark and record-breaking work.";

export const BARRY_SAME_AS = [
  "https://hedgerowexclusive.com/members/barry-mcgovern/",
  "https://www.linkedin.com/in/barry-mcgovern-9346133b",
  "https://www.instagram.com/barrymcgovern_/",
  "https://outeast.com/agents/9187/barry-mcgovern/bridgehampton",
  COASTAL_ABOUT_URL,
] as const;

export const PERSON_ID = `${SITE_URL}/about#person`;
export const SITE_ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

const FAQ_WHO = { question: "Who is Barry McGovern?", answer: BARRY_BLURB };
const FAQ_TITLE = {
  question: "What is Barry McGovern's title and license?",
  answer:
    "Barry McGovern is a Licensed Real Estate Salesperson in New York, license number 10401353717, with Hedgerow Exclusive Properties in Bridgehampton.",
};
const FAQ_EXPERIENCE = {
  question: "How long has Barry McGovern worked in Hamptons real estate?",
  answer:
    "Barry brings six years of Hamptons luxury real estate experience. Originally from Dublin, Ireland, he has called the Hamptons home since 2013 and is a Sag Harbor local.",
};
const FAQ_SPECIALTY = {
  question: "What does Barry McGovern specialize in?",
  answer:
    "Oceanfront and waterfront property, estate-section homes, land and development opportunities, and off-market transactions across the East End.",
};
const FAQ_AREAS = {
  question: "Which areas does Barry McGovern cover?",
  answer:
    "Barry covers the East End from Southampton to Montauk: Southampton, Water Mill, Bridgehampton, Sagaponack, Sag Harbor, Wainscott, East Hampton, Amagansett, Montauk, and Shelter Island.",
};
const FAQ_FIRM = {
  question: "What is Hedgerow Exclusive Properties?",
  answer:
    "Hedgerow Exclusive Properties is a boutique ultra-luxury Hamptons brokerage based in Bridgehampton. Since 2020, it has facilitated over $2 billion in transactions.",
};
const FAQ_VOLUME = {
  question: "What is Barry McGovern's sales volume?",
  answer:
    "Barry McGovern's personal sales volume is $250M+. Hedgerow Exclusive Properties, the firm he works with, has facilitated over $2 billion in transactions since 2020.",
};
const FAQ_RESEARCH = {
  question: "Does Barry McGovern publish Hamptons market research?",
  answer:
    "Yes. His study Hamptons Oceanfront, 2021 to 2026 covers 87 oceanfront sales from Southampton to Montauk, about $2.61 billion in total, with a median price of $24.5 million. Village reports and market commentary are collected on the Market page.",
};
const FAQ_CONTACT = {
  question: "How do I contact Barry McGovern?",
  answer:
    "Email barry@hedgerowexclusive.com or call 646.339.0154. The office is at 2495 Montauk Highway, Bridgehampton, NY 11932.",
};

/** FAQ shown on /about. */
export const ABOUT_FAQS: { question: string; answer: string }[] = [
  FAQ_WHO,
  FAQ_TITLE,
  FAQ_EXPERIENCE,
  FAQ_SPECIALTY,
  FAQ_AREAS,
  FAQ_FIRM,
  FAQ_VOLUME,
  FAQ_RESEARCH,
  FAQ_CONTACT,
];

/** FAQPage JSON-LD for /about: the visible FAQ minus personal production figures (kept out of schema). */
export const BARRY_FAQS: { question: string; answer: string }[] = ABOUT_FAQS.filter((faq) => faq !== FAQ_VOLUME);

function placeRef(name: (typeof PLACE_NAMES)[number]) {
  const slug = PLACE_SLUGS[name];
  return {
    "@type": "Place" as const,
    "@id": `${SITE_URL}/${slug}#place`,
    name,
    url: `${SITE_URL}/${slug}`,
  };
}

export function hedgerowOrganization() {
  return {
    "@type": "Organization",
    "@id": HEDGEROW.id,
    name: HEDGEROW.name,
    url: HEDGEROW.url,
    address: OFFICE_ADDRESS,
  };
}

export function siteOrganization() {
  return {
    "@type": "Organization",
    "@id": SITE_ORG_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description:
      "Personal site for Barry McGovern, Licensed Real Estate Salesperson with Hedgerow Exclusive Properties.",
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icons/icon-512.png`,
      width: 512,
      height: 512,
    },
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    publisher: { "@id": SITE_ORG_ID },
    about: { "@id": PERSON_ID },
  };
}

export function barryPersonNode() {
  return {
    "@type": ["Person", "RealEstateAgent"],
    "@id": PERSON_ID,
    name: "Barry McGovern",
    jobTitle: "Licensed Real Estate Salesperson",
    description: BARRY_SCHEMA_DESCRIPTION,
    url: PERSON_CANONICAL_URL,
    telephone: "+1-646-339-0154",
    email: "barry@hedgerowexclusive.com",
    image: `${SITE_URL}/images/barry-mcgovern.jpg`,
    identifier: {
      "@type": "PropertyValue",
      name: "New York real estate license",
      value: "10401353717",
    },
    address: OFFICE_ADDRESS,
    worksFor: { "@id": HEDGEROW.id },
    affiliation: { "@id": HEDGEROW.id },
    sameAs: [...BARRY_SAME_AS],
    birthPlace: {
      "@type": "City",
      name: "Dublin",
      addressCountry: "IE",
    },
    homeLocation: {
      "@type": "Place",
      name: "Sag Harbor",
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "license",
      name: "New York Real Estate Salesperson License",
      identifier: "10401353717",
      recognizedBy: { "@type": "GovernmentOrganization", name: "New York Department of State" },
    },
    knowsAbout: [
      "Hamptons oceanfront real estate",
      "Waterfront real estate",
      "Estate-section properties",
      "Off-market real estate",
      "Land and development",
      "Hamptons luxury real estate market",
    ],
    areaServed: PLACE_NAMES.map(placeRef),
  };
}

export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      hedgerowOrganization(),
      siteOrganization(),
      websiteNode(),
      barryPersonNode(),
    ],
  };
}

/** /about as a ProfilePage, with independent press that names Barry attached to the Person entity. */
export function profilePageJsonLd(press: { outlet: string; title: string; date: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${PERSON_CANONICAL_URL}#profile`,
    url: PERSON_CANONICAL_URL,
    name: "About Barry McGovern",
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": ["Person", "RealEstateAgent"],
      "@id": PERSON_ID,
      name: "Barry McGovern",
      subjectOf: press.map((item) => ({
        "@type": "NewsArticle",
        headline: item.title,
        url: item.url,
        datePublished: item.date,
        publisher: { "@type": "Organization", name: item.outlet },
      })),
    },
  };
}

export function faqPageJsonLd(faqs: { question: string; answer: string }[] = BARRY_FAQS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function breadcrumbListJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path.startsWith("http") ? item.path : `${SITE_URL}${item.path}`,
    })),
  };
}

export const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-share.jpg`;
export const OG_SHARE_PATH = "/images/og-share.jpg";

export function shareImages(alt: string = OG_ALT) {
  return [
    {
      url: DEFAULT_OG_IMAGE,
      width: 1200,
      height: 630,
      alt,
    },
  ];
}

export function absoluteUrl(path: string) {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function postOgImageUrl(image?: string) {
  return image ? absoluteUrl(image) : DEFAULT_OG_IMAGE;
}

export function canonicalUrl(path: string) {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

export function routeMetadata({
  title,
  description,
  path,
  type = "website",
  absoluteTitle = false,
  image,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  /** Use the title as-is, without the "| Barry McGovern" template suffix. */
  absoluteTitle?: boolean;
  /** Path to a 1200x630 share card under /public, e.g. "/og/about.jpg". */
  image?: string;
}): Metadata {
  const url = canonicalUrl(path);
  const cardUrl = image ? absoluteUrl(image) : DEFAULT_OG_IMAGE;
  /** Share titles match the rendered <title>, template suffix included. */
  const shareTitle = absoluteTitle ? title : `${title} | Barry McGovern`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type,
      locale: "en_US",
      url,
      siteName: "Barry McGovern | Hamptons Real Estate",
      title: shareTitle,
      description,
      images: [{ url: cardUrl, width: 1200, height: 630, alt: image ? title : OG_ALT }],
    },
    twitter: {
      card: "summary_large_image",
      title: shareTitle,
      description,
      images: [cardUrl],
    },
  };
}

export function salesItemListJsonLd(
  sales: {
    address: string;
    area: string;
    price: string;
    dateText: string;
    hedgerowRole: string;
    roleLabel?: string;
  }[],
  name = "Hedgerow Exclusive Properties sales, 2021 to 2026",
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    description:
      "Sold transactions published by Hedgerow Exclusive Properties, the boutique Hamptons firm Barry McGovern works with. Roles shown are the firm's, in the firm's words.",
    url: `${SITE_URL}/sales`,
    numberOfItems: sales.length,
    itemListElement: sales.map((sale, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${sale.address}, ${sale.area}`,
      description: `${sale.address}, ${sale.area}.${sale.dateText ? ` Sold ${sale.dateText}.` : ""}${sale.price ? ` ${sale.price}.` : ""} ${sale.roleLabel || "A Hedgerow transaction"}.`,
    })),
  };
}

export function activeListingsItemListJsonLd(
  listings: { address: string; area: string; price: string; status: string; listingUrl: string; image: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Exclusively listed with Hedgerow Exclusive Properties",
    url: `${SITE_URL}/sales`,
    numberOfItems: listings.length,
    itemListElement: listings.map((listing, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${listing.address}, ${listing.area}`,
      url: listing.listingUrl,
      image: `${SITE_URL}${listing.image}`,
      description: `${listing.status}. ${listing.price}. Exclusively listed with Hedgerow Exclusive Properties.`,
    })),
  };
}

export function placeJsonLd(area: {
  name: string;
  slug: string;
  zipCode: string;
  tagline: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${SITE_URL}/${area.slug}#place`,
    name: area.name,
    url: `${SITE_URL}/${area.slug}`,
    description: area.tagline,
    address: {
      "@type": "PostalAddress",
      addressLocality: area.name,
      addressRegion: "NY",
      postalCode: area.zipCode,
      addressCountry: "US",
    },
    containedInPlace: {
      "@type": "Place",
      name: "the East End",
      alternateName: "The Hamptons",
      address: {
        "@type": "PostalAddress",
        addressRegion: "NY",
        addressCountry: "US",
      },
    },
  };
}

export function articleJsonLd(post: {
  title: string;
  metaDescription: string;
  date: string;
  slug: string;
  image?: string;
  dateModified?: string;
  about?: (typeof PLACE_NAMES)[number][];
  keywords?: string;
}) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    dateModified: post.dateModified ?? post.date,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: postOgImageUrl(post.image),
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Barry McGovern",
      jobTitle: "Licensed Real Estate Salesperson",
      image: `${SITE_URL}/images/barry-mcgovern.jpg`,
      url: PERSON_CANONICAL_URL,
      email: "barry@hedgerowexclusive.com",
      telephone: "+1-646-339-0154",
      worksFor: {
        "@type": "Organization",
        "@id": HEDGEROW.id,
        name: HEDGEROW.name,
        url: HEDGEROW.url,
      },
      sameAs: [...BARRY_SAME_AS],
    },
    publisher: { "@id": SITE_ORG_ID },
    ...(post.about?.length ? { about: post.about.map(placeRef) } : {}),
    ...(post.keywords ? { keywords: post.keywords } : {}),
  };
}
