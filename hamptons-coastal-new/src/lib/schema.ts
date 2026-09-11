/**
 * Canonical entity + JSON-LD for Hamptons Coastal.
 * Hamptons Coastal is editorial / market intelligence, not a brokerage.
 * Do not put firm volume, rankings, or personal production figures in schema.
 */

export const SITE_URL = "https://hamptonscoastal.com";
export const SITE_NAME = "Hamptons Coastal";
export const HOMES_URL = "https://hamptonshomes.ai/";
export const BARRY_ABOUT_URL = `${SITE_URL}/about/barry-mcgovern`;

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

export const BARRY_BLURB =
  "Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage. Public firm materials describe nearly $2 billion in Hamptons transactions. Dublin-born and a Sag Harbor local since 2013, Barry focuses on oceanfront, waterfront, estate-section, and private-market opportunities from Southampton to Montauk, and has been involved with the firm's landmark and record-breaking work.";

export const BARRY_SCHEMA_DESCRIPTION =
  "Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage. Dublin-born and a Sag Harbor local since 2013, Barry focuses on oceanfront, waterfront, estate-section, and private-market opportunities from Southampton to Montauk, and has been involved with the firm's landmark and record-breaking work.";

export const BARRY_SAME_AS = [
  "https://hedgerowexclusive.com/members/barry-mcgovern/",
  "https://www.linkedin.com/in/barry-mcgovern-9346133b",
  "https://www.instagram.com/barrymcgovern_/",
  HOMES_URL,
  "https://outeast.com/agents/9187/barry-mcgovern/bridgehampton",
  BARRY_ABOUT_URL,
] as const;

export const PERSON_ID = `${BARRY_ABOUT_URL}#person`;
export const SITE_ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function hedgerowOrganization() {
  return {
    "@type": "Organization",
    "@id": HEDGEROW.id,
    name: HEDGEROW.name,
    url: HEDGEROW.url,
    address: OFFICE_ADDRESS,
  };
}

export function coastalOrganization() {
  return {
    "@type": "Organization",
    "@id": SITE_ORG_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    description:
      "Luxury real estate intelligence platform covering the Hamptons, Palm Beach, Miami, and Aspen. Editorial and market intelligence, not a brokerage.",
    email: "info@hamptonscoastal.com",
    sameAs: [
      "https://instagram.com/hamptons.coastal",
      "https://twitter.com/hamptonscoastal",
      "https://linkedin.com/in/hamptons-coastal-52179a3b1",
    ],
  };
}

export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    publisher: { "@id": SITE_ORG_ID },
  };
}

export function barryPersonNode() {
  return {
    "@type": ["Person", "RealEstateAgent"],
    "@id": PERSON_ID,
    name: "Barry McGovern",
    jobTitle: "Licensed Real Estate Salesperson",
    description: BARRY_SCHEMA_DESCRIPTION,
    url: BARRY_ABOUT_URL,
    telephone: "+1-646-339-0154",
    email: "barry@hedgerowexclusive.com",
    image: "https://hamptonshomes.ai/images/barry-mcgovern.jpg",
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
    areaServed: PLACE_NAMES.map((name) => ({
      "@type": "Place",
      name,
    })),
  };
}

export function siteGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [coastalOrganization(), websiteNode()],
  };
}

export function barryGraphJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [hedgerowOrganization(), barryPersonNode()],
  };
}

export function faqPageJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}
