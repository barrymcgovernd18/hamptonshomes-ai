export interface Area {
  name: string;
  slug: string;
  tagline: string;
  description: string;
  highlights: string[];
  beaches: string[];
  priceRange: string;
  vibe: string;
  zipCode: string;
  domain?: string;
}

export const areas: Area[] = [
  {
    name: "East Hampton",
    slug: "east-hampton",
    tagline: "The Crown Jewel of the East End",
    description:
      "East Hampton is the epicenter of Hamptons luxury, home to some of the most expensive oceanfront estates in the country. From the legendary Lily Pond Lane and Further Lane corridors to the charming village center, East Hampton offers an unmatched combination of world-class beaches, historic architecture, and elite privacy. This is where nine-figure trades happen and where the most discerning buyers seek their forever homes.",
    highlights: [
      "Home to the Hamptons' most expensive streets: Lily Pond Lane, Further Lane, and West End Road",
      "Record-breaking sales including $121.5M (Cobb Lane), $110M (Lily Pond), and $105M (Jule Pond)",
      "Village center with high-end boutiques, restaurants, and galleries",
      "East Hampton Main Beach, consistently ranked among America's best",
      "Historic estates dating to the 1600s alongside modern architectural masterpieces",
    ],
    beaches: ["Main Beach", "Two Mile Hollow", "Egypt Beach", "Georgica Beach", "Wiborg Beach"],
    priceRange: "$2M – $150M+",
    vibe: "Old money elegance meets modern luxury. Private, prestigious, and timeless.",
    zipCode: "11937",
    domain: "easthampton.ai",
  },
  {
    name: "Sag Harbor",
    slug: "sag-harbor",
    tagline: "The Hamptons' Most Charming Village",
    description:
      "Once a thriving whaling port, Sag Harbor has evolved into the creative and cultural heart of the Hamptons. Its walkable village, historic harbor, and waterfront dining scene attract a sophisticated mix of artists, writers, and professionals seeking a different kind of Hamptons experience. Waterfront properties here, whether harborfront, bayfront, or cove-side, command premium prices and rarely hit the open market.",
    highlights: [
      "Historic waterfront village with year-round community",
      "Premium bayfront and harborfront properties with private docks",
      "Walkable downtown with restaurants, galleries, shops, cinema, and the iconic American Hotel",
      "Bay Street Theater, Sag Harbor Whaling Museum, and thriving arts scene",
      "Protected harbor with world-class marina and boating access",
    ],
    beaches: ["Long Beach (Noyac)", "Havens Beach", "Foster Memorial Beach"],
    priceRange: "$1.5M – $35M+",
    vibe: "Creative, cultured, and community-driven. The anti-scene scene.",
    zipCode: "11963",
    domain: "sagharbor.ai",
  },
  {
    name: "Bridgehampton",
    slug: "bridgehampton",
    tagline: "Where Oceanfront Meets Horse Country",
    description:
      "Bridgehampton sits at the geographic heart of the South Fork, offering some of the Hamptons' most spectacular oceanfront estates alongside rolling farmland and world-class equestrian facilities. The Bridgehampton-Sagaponack corridor consistently ranks among the most expensive zip codes in America. From Surfside Drive's dramatic ocean bluffs to the pastoral beauty of the reserve, Bridgehampton delivers the full spectrum of Hamptons luxury.",
    highlights: [
      "Surfside Drive: dramatic oceanfront estates on 2+ acre bluffs",
      "Home to the Hampton Classic Horse Show, the premier equestrian event in the Northeast",
      "Bridgehampton-Sagaponack corridor: one of America's most expensive zip codes",
      "Bobby Van's, Almond, Candy Kitchen, iconic Hamptons dining and village life",
      "Proximity to reserve farmland preserves the rural character and open views",
    ],
    beaches: ["Mecox Beach", "W. Scott Cameron Beach", "Sagg Main Beach"],
    priceRange: "$2M – $60M+",
    vibe: "Sporty luxury. Equestrian estates, ocean bluffs, and farm-to-table everything.",
    zipCode: "11932",
    domain: "bridgehampton.ai",
  },
  {
    name: "Sagaponack",
    slug: "sagaponack",
    tagline: "America's Most Expensive Zip Code",
    description:
      "Sagaponack has earned its reputation as one of the most exclusive addresses in the country. This tiny hamlet of fewer than 600 year-round residents, is defined by vast oceanfront parcels, protected farmland, and an almost otherworldly sense of space and privacy. Daniels Lane, Sagaponack Main Street, and the oceanfront corridor have produced some of the highest-priced residential sales in US history.",
    highlights: [
      "Regularly ranked the #1 most expensive zip code in America (11962)",
      "Vast oceanfront parcels, many 2-5+ acres with private beach access",
      "Protected agricultural reserve ensures open views and low density",
      "Sagaponack Main Street: quiet, prestigious, and deeply private",
      "Minutes to Bridgehampton village amenities while maintaining total seclusion",
    ],
    beaches: ["Sagg Main Beach", "Gibson Beach", "Peter's Pond Beach"],
    priceRange: "$3M – $100M+",
    vibe: "Ultra-private. Vast estates, open farmland, and the sound of the ocean. Nothing else.",
    zipCode: "11962",
    domain: "sagaponack.ai",
  },
];
