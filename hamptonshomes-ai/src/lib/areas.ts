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
  editorial?: string;
  marketBrief?: string;
  buyerLens?: string;
  sellerLens?: string;
  heroImage?: string;
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
    editorial:
      "East Hampton is a market of contrasts: a walkable village core, old lanes lined with cedar-shingled houses, and an oceanfront estate belt where land scarcity does the talking. The most useful distinction is not simply village versus beach, but how a property relates to Main Beach, Georgica, Lily Pond, and the quiet western edge. Buyers who understand those micro-markets can find very different forms of privacy within the same 11937 address.",
    marketBrief:
      "Recent records show the breadth of East Hampton pricing. The 24 & 36 Jeffreys Lane sale reached $36.25M on November 18, 2025, while 32 St Marys Lane traded at $23M the day before; at a more accessible scale, 10 Wagon Lane sold for $4.8M on January 9, 2026. Together, they point to a market that rewards frontage, acreage, and finish rather than a single village-wide average.",
    buyerLens:
      "For a buyer, the decision is often between a legacy address with irreplaceable setting and a quieter village-fringe compound with more flexibility. Recent sales suggest that both can work when the land, water relationship, and renovation story are clear.",
    sellerLens:
      "For a seller, presentation needs to explain the property’s micro-market—not just its room count. A well-positioned East Hampton home should make its approach to the beach, village, or protected landscape legible before a buyer ever visits.",
    heroImage: "/images/33-lily-pond.jpg",
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
    editorial:
      "Sag Harbor feels less like a seasonal resort than a working village with a remarkable waterfront. The center is compact and social; just beyond it, Noyac, North Haven, and the coves open into a quieter vocabulary of docks, sunsets, and wooded lots. That mix gives Sag Harbor unusual resilience: a buyer can be close to the theater and restaurants without giving up the privacy or boating access that makes the harbor valuable.",
    marketBrief:
      "The latest records show a wide but coherent Sag Harbor spectrum: 100 Bay Street sold for $11.25M on December 15, 2025, 40 Redwood Road for $7.5M on January 14, 2026, and 6 Harding Terrace for $5.5M two days later. These are different property types, but each sale reinforces the premium for a strong village or waterfront relationship; smaller in-town homes still trade actively below that tier.",
    buyerLens:
      "For a buyer, start with the daily route: walkability, harbor access, or a quieter Noyac setting. Sag Harbor rewards clarity about that choice more than a generic search for ‘waterfront.’",
    sellerLens:
      "For a seller, the strongest story is specific: a dock, a village walk, a protected view, or a renovation that respects the home’s history. Those details help a property stand apart in a market with many superficially similar listings.",
    heroImage: "/images/117-main-st.jpg",
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
  {
    name: "Southampton",
    slug: "southampton",
    tagline: "The Original Hamptons Address",
    description:
      "Southampton combines the grandeur of the Hamptons’ oldest village with exceptional oceanfront, bayfront, and estate properties. From Meadow Lane and Gin Lane to the village’s historic streets, buyers find a rare balance of private acreage, walkable amenities, and direct access to some of the South Fork’s most beautiful beaches.",
    highlights: [
      "Meadow Lane estate corridor with ocean and bay frontage",
      "Historic village center with restaurants, galleries, and boutiques",
      "World-class ocean beaches including Cooper’s Beach",
      "Waterfront homes along Shinnecock Bay and the Atlantic shore",
      "Convenient access to Manhattan and the full East End",
    ],
    beaches: ["Cooper’s Beach", "Flying Point Beach", "Cryder Beach", "Little Plains Beach"],
    editorial:
      "Southampton is the East End’s broadest luxury market, spanning a real village downtown, the estate scale of Meadow Lane and Gin Lane, and inland neighborhoods where a pool, light, and privacy can matter more than a famous street name. Cooper’s Beach is a landmark, but the market’s depth comes from the number of distinct ways to live here—from a walkable historic house to a bayfront compound with room for generations.",
    marketBrief:
      "Recent Southampton sales make the segmentation visible. 346 Meadow Lane sold for $28M on January 13, 2026, 109 Duck Pond Lane for $20M on January 16, and 344 Great Plains Road for $11.75M two days earlier; 16 Kings Lane, a smaller inland sale, closed at $1.5375M on January 12. The range is not noise—it reflects frontage, village proximity, acreage, and the difference between South of the Highway and North of the Highway micro-markets.",
    buyerLens:
      "For a buyer, Southampton offers the most room to calibrate: beach access and legacy prestige at one end, village convenience and value discipline at the other. A precise brief can uncover more than a broad ‘Southampton’ search.",
    sellerLens:
      "For a seller, the address should be framed by its strongest local comparison set. Meadow Lane, the village estate section, and inland Southampton each speak to a different buyer and deserve different evidence.",
    heroImage: "/images/109-duck-pond.jpg",
    priceRange: "$2M – $100M+",
    vibe: "Established, elegant, and quietly expansive. The Hamptons at its most classic.",
    zipCode: "11968",
  },
  {
    name: "Water Mill",
    slug: "water-mill",
    tagline: "Quiet Luxury Between Village and Sea",
    description:
      "Water Mill is prized for its open farmland, ocean beaches, and unusually private estate settings between Southampton and Bridgehampton. Protected vistas, historic windmills, and a low-density landscape give this small hamlet a sense of permanence while its oceanfront and waterfront homes remain among the East End’s most sought-after properties.",
    highlights: [
      "Large estate parcels bordered by protected agricultural reserve",
      "Direct access to ocean beaches and Mecox Bay",
      "The historic Water Mill Museum and village character",
      "Rare oceanfront and pond-front properties with exceptional privacy",
      "Minutes from Southampton and Bridgehampton dining and culture",
    ],
    beaches: ["Flying Point Beach", "Scott Cameron Beach", "Mecox Beach", "Cedar Point Beach"],
    priceRange: "$2.5M – $125M+",
    vibe: "Pastoral and polished. Open land, quiet lanes, and serious privacy.",
    zipCode: "11976",
  },
  {
    name: "Amagansett",
    slug: "amagansett",
    tagline: "Wide Open, Wildly Refined",
    description:
      "Amagansett pairs a relaxed village atmosphere with some of the East End’s most dramatic natural landscapes. Oceanfront estates, dune-backed modern homes, and expansive agricultural parcels stretch from the village to Napeague, attracting buyers who value privacy, design, and a direct connection to the coastline.",
    highlights: [
      "Pristine oceanfront and dune-side homes along Further Lane",
      "Walkable village with independent shops, restaurants, and galleries",
      "Protected farmland and open landscapes around Town Lane",
      "Napeague and Gardiners Bay access for boating and water sports",
      "A creative, understated alternative to the more formal villages",
    ],
    beaches: ["Indian Wells Beach", "Atlantic Avenue Beach", "Amagansett Beach", "Napeague Beach"],
    priceRange: "$2M – $50M+",
    vibe: "Natural, creative, and unshowy. Beach life with room to breathe.",
    zipCode: "11930",
  },
  {
    name: "Montauk",
    slug: "montauk",
    tagline: "The End of the World, in the Best Way",
    description:
      "Montauk is the East End’s most distinctive coastal market, shaped by open ocean, working harbor, and a rugged landscape that feels far removed from the city. From oceanfront compounds and bluff-top retreats to harbor homes and quiet acreage, Montauk offers a rare combination of adventure, privacy, and year-round community.",
    highlights: [
      "Bluff-top oceanfront estates with uninterrupted Atlantic views",
      "Montauk Harbor marinas, fishing fleet, and waterfront dining",
      "Ditch Plains and Kirk Park for iconic surf and beach access",
      "Montauk Point Lighthouse and protected natural landscapes",
      "A strong year-round community with an independent coastal identity",
    ],
    beaches: ["Ditch Plains Beach", "Kirk Park Beach", "Gin Beach", "Hither Hills State Park"],
    priceRange: "$1.5M – $40M+",
    vibe: "Free-spirited and elemental. Surf, boats, open sky, and serious coastline.",
    zipCode: "11954",
  },
  {
    name: "Shelter Island",
    slug: "shelter-island",
    tagline: "Island Privacy Between Two Forks",
    description:
      "Shelter Island offers a pace and sense of seclusion unlike anywhere else in the Hamptons. Accessible only by ferry or private boat, the island is defined by preserved land, quiet coves, and a close-knit community. Waterfront homes, historic cottages, and private compounds appeal to buyers seeking a genuine escape without leaving the East End.",
    highlights: [
      "Protected bays, coves, and private waterfront with exceptional boating",
      "Mashomack Preserve’s thousands of acres of conserved landscape",
      "Historic homes and summer cottages alongside discreet new construction",
      "Walkable Greenport and Sag Harbor access by ferry",
      "Low-density island living with a deeply private character",
    ],
    beaches: ["Wades Beach", "Shell Beach", "Crescent Beach", "Hay Beach"],
    priceRange: "$1M – $25M+",
    vibe: "Private, pastoral, and authentic. An island refuge with deep roots.",
    zipCode: "11964",
  },
  {
    name: "Wainscott",
    slug: "wainscott",
    tagline: "Between the Villages, Away from the Crowd",
    description:
      "Wainscott occupies a coveted stretch between East Hampton and Bridgehampton, with a small village center, protected farmland, and direct access to the ocean. Its large parcels and central location make it a natural choice for buyers who want privacy and open views while remaining close to the East End’s best dining, beaches, and cultural life.",
    highlights: [
      "Oceanfront and near-ocean homes on quiet lanes and private acreage",
      "Wainscott Main Street farm stands, shops, and local character",
      "Protected farmland and wide-open views uncommon near the villages",
      "Convenient access to East Hampton, Bridgehampton, and Sagaponack",
      "A discreet market with a strong mix of legacy and newly built estates",
    ],
    beaches: ["Wainscott Beach", "Gibson Beach", "Town Line Beach", "Atlantic Beach"],
    priceRange: "$2M – $60M+",
    vibe: "Central yet secluded. Country lanes, ocean air, and understated luxury.",
    zipCode: "11975",
  },
];
