/**
 * Canonical entity + JSON-LD for HamptonsHomes.ai.
 * Do not put firm volume, rankings, or personal production figures in schema.
 */

export const SITE_URL = "https://hamptonshomes.ai";
export const SITE_NAME = "HamptonsHomes.ai";
export const COASTAL_ABOUT_URL = "https://hamptonscoastal.com/about/barry-mcgovern";

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
  "Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage. Public firm materials describe nearly $2 billion in Hamptons transactions. Dublin-born and a Sag Harbor local since 2013, Barry focuses on oceanfront, waterfront, estate-section, and private-market opportunities from Southampton to Montauk, and has been involved with the firm's landmark and record-breaking work.";

/** Schema description: same blurb without the firm-volume sentence. */
export const BARRY_SCHEMA_DESCRIPTION =
  "Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage. Dublin-born and a Sag Harbor local since 2013, Barry focuses on oceanfront, waterfront, estate-section, and private-market opportunities from Southampton to Montauk, and has been involved with the firm's landmark and record-breaking work.";

export const BARRY_SAME_AS = [
  "https://hedgerowexclusive.com/members/barry-mcgovern/",
  "https://www.linkedin.com/in/barry-mcgovern-9346133b",
  "https://www.instagram.com/barrymcgovern_/",
  "https://hamptonshomes.ai/",
  "https://outeast.com/agents/9187/barry-mcgovern/bridgehampton",
  COASTAL_ABOUT_URL,
] as const;

export const PERSON_ID = `${SITE_URL}/about#person`;
export const SITE_ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export const BARRY_FAQS: { question: string; answer: string }[] = [
  {
    question: "Who is Barry McGovern?",
    answer: BARRY_BLURB,
  },
  {
    question: "Which areas does Barry McGovern cover?",
    answer:
      "Barry covers the East End from Southampton to Montauk: Southampton, Water Mill, Bridgehampton, Sagaponack, Sag Harbor, Wainscott, East Hampton, Amagansett, Montauk, and Shelter Island.",
  },
  {
    question: "What is Hedgerow Exclusive Properties?",
    answer:
      "Hedgerow Exclusive Properties is a boutique ultra-luxury Hamptons brokerage based in Bridgehampton. Public firm materials describe nearly $2 billion in Hamptons transactions.",
  },
  {
    question: "How do I contact Barry McGovern?",
    answer:
      "Email barry@hedgerowexclusive.com or call +1-646-339-0154. The office is at 2495 Montauk Hwy, Bridgehampton, NY 11932.",
  },
  {
    question: "What is Barry McGovern's real estate license?",
    answer:
      "Barry McGovern is a Licensed Real Estate Salesperson in New York, license number 10401353717. He is not a broker.",
  },
];

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
    url: `${SITE_URL}/`,
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
    knowsAbout: [
      "oceanfront",
      "waterfront",
      "estate-section",
      "private-market",
      "Hamptons luxury real estate",
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

export function faqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: BARRY_FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    author: { "@id": PERSON_ID },
    publisher: { "@id": SITE_ORG_ID },
  };
}
