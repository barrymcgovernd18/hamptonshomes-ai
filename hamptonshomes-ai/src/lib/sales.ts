import { DUCK_POND_BLURB, SAGAPONACK_MAIN_BLURB } from "./seo-copy";

export interface Sale {
  address: string;
  area: string;
  slug: string;
  price: string;
  status: string;
  beds?: string;
  baths?: string;
  sqft?: string;
  acres?: string;
  description?: string;
  image?: string;
  listingUrl?: string;
  /** Hedgerow Exclusive Properties' (firm) role in Hedgerow's own words, e.g. "Hedgerow represented the seller". Never a personal side. */
  roleNote?: string;
  /** Short card copy. Factual property notes only; no personal representation claims. */
  blurb?: string;
}

export const notableSales: Sale[] = [
{
    address: "67 Surfside Drive",
    area: "Bridgehampton",
    slug: "67-surfside-drive-bridgehampton",
    price: "$32,000,000",
    status: "Sold 4/04/2025",
    beds: "4",
    baths: "5.5",
    sqft: "6,714",
    acres: "2.20",
    description: "Ultimate oceanfront living on Surfside Drive. Re-crafted in 2016 by Ed Bulgin. 187 feet of ocean frontage, gunite pool and spa, outdoor kitchen with pizza oven, private beach walkway, three-car garage with gym and studio.",
    image: "/images/67-surfside.jpg",
    listingUrl: "https://hedgerow.eastendli.com/property/915177/",
    roleNote: "Hedgerow represented both sides",
    blurb: "Bridgehampton oceanfront. 187 feet of frontage on 2.2 acres. Closed April 2025.",
  },
{
    address: "33 Lily Pond Lane",
    area: "East Hampton",
    slug: "33-lily-pond-lane-east-hampton",
    price: "$31,500,000",
    status: "Sold 9/10/2025",
    beds: "6",
    baths: "8",
    sqft: "7,000",
    acres: "1.81",
    description: "Oceanfront oasis on one of the world's most coveted streets. 171 feet of private ocean frontage, separate guest house, pool, jacuzzi, sauna, and professionally lit tennis and basketball courts. Two pristine acres.",
    image: "/images/33-lily-pond.jpg",
    listingUrl: "https://hedgerow.eastendli.com/property/922825/",
    roleNote: "Hedgerow represented the seller",
    blurb: "East Hampton oceanfront on Lily Pond Lane. 171 feet of private frontage on nearly two acres. Closed September 2025.",
  },
{
    address: "109 Duck Pond Lane",
    area: "Southampton",
    slug: "109-duck-pond-southampton",
    price: "$20,000,000",
    status: "Sold 1/16/2026",
    beds: "8",
    baths: "8",
    sqft: "8,700",
    acres: "2.00",
    description: "Southampton waterfront estate on Wickapogue Pond. Sweeping views of the pond and Atlantic Ocean. Double-height entry, walls of glass, expansive terraces and waterside pool.",
    image: "/images/109-duck-pond.jpg",
    listingUrl: "https://hedgerow.eastendli.com/property/923559/",
    roleNote: DUCK_POND_BLURB.roleNote,
    blurb: DUCK_POND_BLURB.blurb,
  },
{
    address: "234 Wickapogue Road",
    area: "Southampton",
    slug: "234-wickapogue-road-southampton",
    price: "$12,500,000",
    status: "Sold 10/10/2023",
    beds: "6",
    baths: "7.5",
    sqft: "11,500",
    acres: "1.00",
    description: "Southampton Village estate in the premier estate section. Renovated in 2018, no detail spared. Grand marble foyer, chef's kitchen, ocean views from the second floor, adjacent to a village preserve.",
    image: "/images/234-wickapogue.jpg",
    listingUrl: "https://hedgerow.eastendli.com/property/899418/",
    roleNote: "Hedgerow represented both sides",
    blurb: "Southampton estate section. Ocean views from the second floor, adjacent to a village preserve. Closed October 2023.",
  },
{
    address: "193 Sagaponack Main Street",
    area: "Sagaponack",
    slug: "193-sag-main-st-sagaponack",
    price: "$10,500,000",
    status: "Sold 5/24/2023",
    beds: "5",
    baths: "4F 4H",
    sqft: "5,000",
    acres: "2.17",
    description: "Sagaponack South exquisite 2.2-acre estate. Double-gated entry, exceptional perennial gardens, chef's kitchen, pool house, and guest wing. Classic worldly feel with ocean proximity.",
    image: "/images/193-sagaponack.jpg",
    listingUrl: "https://hedgerow.eastendli.com/property/897949/",
    roleNote: SAGAPONACK_MAIN_BLURB.roleNote,
    blurb: SAGAPONACK_MAIN_BLURB.blurb,
  },
{
    address: "55 Marine Boulevard",
    area: "Amagansett",
    slug: "55-marine-blvd-amagansett",
    price: "$9,000,000",
    status: "Sold 5/01/2022",
    description: "Oceanfront property in Amagansett. Off-market transaction.",
    roleNote: "Hedgerow represented both sides",
  },
{
    address: "36 Chase Court",
    area: "Bridgehampton",
    slug: "36-chase-court-bridgehampton",
    price: "$7,300,000",
    status: "Sold 11/05/2025",
    beds: "6",
    baths: "7.5",
    sqft: "8,200",
    acres: "0.97",
    description: "Bridgehampton farmhouse on a quiet cul-de-sac. Cathedral ceilings, gourmet kitchen, oak library, finished lower level with bar, media room, gym and wine cellar. Heated gunite pool.",
    image: "/images/36-chase-court.jpg",
    listingUrl: "https://hedgerow.eastendli.com/property/915755/",
    roleNote: "A Hedgerow transaction",
    blurb: "Bridgehampton farmhouse on a quiet cul-de-sac. Closed November 2025 at $7.3 million.",
  },
{
    address: "40 Hedges Banks Drive",
    area: "East Hampton",
    slug: "40-hedges-banks-dr-east-hampton",
    price: "$5,500,000",
    status: "Sold 2022",
    beds: "4",
    baths: "5.5",
    sqft: "4,500",
    acres: "0.92",
    description: "Contemporary waterfront in East Hampton with panoramic Gardiner's Bay views. Double-height floor-to-ceiling windows, glass-enclosed solarium, saltwater pool and spa, separate cabana with bar.",
    image: "/images/40-hedges-banks.jpg",
    roleNote: "Hedgerow represented the seller",
    blurb: "East Hampton waterfront with panoramic Gardiner's Bay views. Closed November 2022.",
  },
{
    address: "55 Halsey Lane",
    area: "Bridgehampton",
    slug: "55-halsey-lane-bridgehampton",
    price: "$4,235,000",
    status: "Sold 10/11/2024",
    beds: "4",
    baths: "4.5",
    sqft: "3,270",
    acres: "0.32",
    description: "Beautifully renovated South of the Highway farmhouse, circa 1906. Heated gunite pool, chic pool house, Wolf and Subzero kitchen. Steps to village shops and ocean beaches.",
    image: "/images/55-halsey-lane.jpg",
    listingUrl: "https://hedgerow.eastendli.com/property/914822/",
    roleNote: "Hedgerow represented both sides",
    blurb: "South of the Highway farmhouse in Bridgehampton, circa 1906. Closed October 2024.",
  },
{
    address: "47B South Ferry Road",
    area: "Shelter Island",
    slug: "47b-s-ferry-road-shelter-island",
    price: "$3,500,000",
    status: "Sold 4/20/2026",
    description: "Shelter Island sale, April 2026.",
    roleNote: "Hedgerow represented the seller",
  },
];

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

/** "Sold 4/04/2025" reads as "Sold April 2025"; anything else is returned unchanged. */
export function formatSaleStatus(status: string) {
  const m = /^(\w[\w ]*?)\s+(\d{1,2})\/\d{1,2}\/(\d{4})$/.exec(status.trim());
  return m ? `${m[1]} ${MONTHS[Number(m[2]) - 1]} ${m[3]}` : status;
}

export const personalVolume = "$250M+";
export const firmVolume = "over $2B";
export const firmVolumeLabel = "Firm transactions";
