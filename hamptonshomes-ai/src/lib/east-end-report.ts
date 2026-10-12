import type { BlogChartRow, BlogPost } from "./blog";

/**
 * Every figure is a published report total or a sum of those published rows.
 * Setting totals can differ by a tenth of a million from year rows. Headlines
 * keep the billions already published on this roll-up ($6.494 and $7.354).
 * Sagaponack publishes a dollar total for 2026 only, so there is no combined
 * volume-by-year chart.
 */

const HREF = {
  southampton: "/blog/southampton-luxury-market-overview-2026-10",
  waterMill: "/blog/water-mill-luxury-market-overview-2026-10",
  bridgehampton: "/blog/bridgehampton-luxury-market-overview-2026-10",
  sagaponack: "/blog/sagaponack-luxury-market-overview-2026-10",
  wainscott: "/blog/wainscott-luxury-market-snapshot-2026-10",
  eastHampton: "/blog/east-hampton-luxury-market-overview-2026-10",
  sagHarbor: "/blog/sag-harbor-village-luxury-market-overview-2026-10",
  sagHarborWater: "/blog/sag-harbor-waterfront-luxury-market-2026-10",
  northHaven: "/blog/north-haven-luxury-market-2026-10",
  shelter: "/blog/shelter-island-luxury-market-2026-10",
  shelterWater: "/blog/shelter-island-waterfront-luxury-market-2026-10",
  oceanfront: "/blog/hamptons-oceanfront-market-2021-2026",
} as const;

type Hamlet = {
  key: string;
  label: string;
  table: string;
  href: string;
  coast: "south" | "harbor";
  sales: number;
  /** Setting-table volume in tenths of a million. */
  volumeTenths: number;
  volumeDisplay: string;
  median: number;
  medianDisplay: string;
  /** Sales count from that report's 2026 year row. */
  y2026: number;
  y2026Median: number;
  y2026Display: string;
  /** Year-table sales: 2023, 2024, 2025, 2026. */
  years: readonly [number, number, number, number];
};

const HAMLETS: readonly Hamlet[] = [
  {
    key: "eastHampton",
    label: "East Hampton",
    table: "East Hampton South",
    href: HREF.eastHampton,
    coast: "south",
    sales: 100,
    volumeTenths: 19553,
    volumeDisplay: "$1,955.3M",
    median: 11.05,
    medianDisplay: "$11.05M",
    y2026: 18,
    y2026Median: 9.5,
    y2026Display: "$9.50M",
    years: [21, 31, 30, 18],
  },
  {
    key: "sagaponack",
    label: "Sagaponack",
    table: "Sagaponack South",
    href: HREF.sagaponack,
    coast: "south",
    sales: 56,
    volumeTenths: 7188,
    volumeDisplay: "$718.8M",
    median: 10.5,
    medianDisplay: "$10.50M",
    y2026: 12,
    y2026Median: 15.9,
    y2026Display: "$15.9M",
    years: [14, 16, 14, 12],
  },
  {
    key: "bridgehampton",
    label: "Bridgehampton",
    table: "Bridgehampton South",
    href: HREF.bridgehampton,
    coast: "south",
    sales: 65,
    volumeTenths: 8804,
    volumeDisplay: "$880.4M",
    median: 10.2,
    medianDisplay: "$10.2M",
    y2026: 13,
    y2026Median: 9.85,
    y2026Display: "$9.85M",
    years: [14, 18, 20, 13],
  },
  {
    key: "waterMill",
    label: "Water Mill",
    table: "Water Mill South",
    href: HREF.waterMill,
    coast: "south",
    sales: 78,
    volumeTenths: 8549,
    volumeDisplay: "$854.9M",
    median: 9.45,
    medianDisplay: "$9.45M",
    y2026: 16,
    y2026Median: 10.36,
    y2026Display: "$10.36M",
    years: [20, 17, 25, 16],
  },
  {
    key: "wainscott",
    label: "Wainscott",
    table: "Wainscott South",
    href: HREF.wainscott,
    coast: "south",
    sales: 22,
    volumeTenths: 2818,
    volumeDisplay: "$281.8M",
    median: 9.05,
    medianDisplay: "$9.05M",
    y2026: 5,
    y2026Median: 9.5,
    y2026Display: "$9.50M",
    years: [4, 5, 8, 5],
  },
  {
    key: "southampton",
    label: "Southampton",
    table: "Southampton South",
    href: HREF.southampton,
    coast: "south",
    sales: 133,
    volumeTenths: 18029,
    volumeDisplay: "$1,802.9M",
    median: 8.84,
    medianDisplay: "$8.84M",
    y2026: 27,
    y2026Median: 13.75,
    y2026Display: "$13.75M",
    years: [28, 29, 49, 27],
  },
  {
    key: "northHaven",
    label: "North Haven",
    table: "North Haven",
    href: HREF.northHaven,
    coast: "harbor",
    sales: 27,
    volumeTenths: 2830,
    volumeDisplay: "$283.0M",
    median: 8.25,
    medianDisplay: "$8.25M",
    y2026: 8,
    y2026Median: 8.25,
    y2026Display: "$8.25M",
    years: [5, 9, 5, 8],
  },
  {
    key: "shelter",
    label: "Shelter Island",
    table: "Shelter Island",
    href: HREF.shelter,
    coast: "harbor",
    sales: 14,
    volumeTenths: 1207,
    volumeDisplay: "$120.7M",
    median: 7.9,
    medianDisplay: "$7.9M",
    y2026: 6,
    y2026Median: 6.5,
    y2026Display: "$6.50M",
    years: [3, 2, 3, 6],
  },
  {
    key: "sagHarbor",
    label: "Sag Harbor",
    table: "Sag Harbor Village",
    href: HREF.sagHarbor,
    coast: "harbor",
    sales: 51,
    volumeTenths: 4008,
    volumeDisplay: "$400.8M",
    median: 6.3,
    medianDisplay: "$6.3M",
    y2026: 17,
    y2026Median: 6,
    y2026Display: "$6.00M",
    years: [8, 9, 17, 17],
  },
];

/** Noyac Bay and Sag Harbor Bay shore. Not a hamlet year row. */
const OUTSIDE = {
  label: "Noyac and Sag Harbor Bay",
  href: HREF.sagHarborWater,
  sales: 8,
  volumeTenths: 558,
  volumeDisplay: "$55.8M",
  median: 6.63,
  medianDisplay: "$6.63M",
} as const;

const NORTH_MARKETS = "Sag Harbor, North Haven, and Shelter Island";

function sum(values: readonly number[]) {
  return values.reduce((total, value) => total + value, 0);
}

function assert(condition: boolean, message: string) {
  if (!condition) throw new Error(`East End roll-up: ${message}`);
}

for (const hamlet of HAMLETS) {
  assert(sum(hamlet.years) === hamlet.sales, `${hamlet.key} year rows`);
  assert(hamlet.years[3] === hamlet.y2026, `${hamlet.key} 2026 count`);
}

const SOUTH = HAMLETS.filter((hamlet) => hamlet.coast === "south");
const HARBOR_HAMLETS = HAMLETS.filter((hamlet) => hamlet.coast === "harbor");
const SOUTH_SALES = sum(SOUTH.map((hamlet) => hamlet.sales));
const HARBOR_SALES = sum(HARBOR_HAMLETS.map((hamlet) => hamlet.sales)) + OUTSIDE.sales;
const COUNTED_SALES = SOUTH_SALES + HARBOR_SALES;
const SOUTH_TENTHS = sum(SOUTH.map((hamlet) => hamlet.volumeTenths));
const HARBOR_TENTHS = sum(HARBOR_HAMLETS.map((hamlet) => hamlet.volumeTenths)) + OUTSIDE.volumeTenths;
const YEAR_SALES = [0, 1, 2, 3].map((index) => sum(HAMLETS.map((hamlet) => hamlet.years[index])));
const SALES_2026 = sum(HAMLETS.map((hamlet) => hamlet.y2026));

assert(SOUTH_SALES === 454 && HARBOR_SALES === 100 && COUNTED_SALES === 554, "sales scope");
assert(SOUTH_TENTHS === 64941 && HARBOR_TENTHS === 8603, "setting totals");
assert(YEAR_SALES[0] === 117 && YEAR_SALES[1] === 136 && YEAR_SALES[2] === 171 && YEAR_SALES[3] === 122, "year sales");
assert(sum(YEAR_SALES) === 546 && sum(YEAR_SALES) + OUTSIDE.sales === 554, "year rows plus outside village");
assert(SALES_2026 === 122, "2026 hamlet sales");

/** 2026 dollar rows, in tenths of a million, including Sagaponack's published $193.6 million. */
const VOLUME_2026_TENTHS = 3047 + 4200 + 1333 + 1858 + 977 + 1936 + 1122 + 890 + 488;
assert(VOLUME_2026_TENTHS === 15851, "2026 volume");

// Published price-band sales. South bands are $5–10, $10–20, $20–50, and $50+.
// Harbor reports publish $20 million and above as one band.
const SOUTH_UNDER_10 = 74 + 41 + 31 + 24 + 14 + 40;
const HARBOR_UNDER_10 = 41 + 15 + 10 + 7;
const SOUTH_10_20 = 37 + 28 + 24 + 20 + 5 + 30;
const HARBOR_10_20 = 9 + 10 + 4 + 1;
const SOUTH_20_PLUS = 21 + 9 + (19 + 3) + (8 + 2) + 9 + (2 + 1) + 12;
const HARBOR_20_PLUS = 1 + 2;
const SOUTH_50_PLUS = 9 + 3 + 2 + 1;
assert(SOUTH_UNDER_10 === 224 && HARBOR_UNDER_10 === 73, "under $10 million");
assert(SOUTH_10_20 === 144 && HARBOR_10_20 === 24, "$10 to $20 million");
assert(SOUTH_20_PLUS === 86 && HARBOR_20_PLUS === 3 && SOUTH_50_PLUS === 15, "$20 million and above");
assert(
  SOUTH_UNDER_10 + SOUTH_10_20 + SOUTH_20_PLUS === SOUTH_SALES &&
    HARBOR_UNDER_10 + HARBOR_10_20 + HARBOR_20_PLUS === HARBOR_SALES &&
    SOUTH_UNDER_10 + HARBOR_UNDER_10 === 297,
  "price bands"
);

const OCEAN_ON = 13 + 10 + 8 + 3 + 1 + 1;
const OCEAN_OFF = 82 + 121 + 55 + 18 + 55 + 69;
assert(OCEAN_ON === 36 && OCEAN_OFF === 400 && OCEAN_ON + OCEAN_OFF === 436, "ocean columns");
assert(7307 + 4900 + 2765 + 1110 + 145 + 100 === 16327, "oceanfront volume");

function ranked<T>(rows: readonly T[], compare: (a: T, b: T) => number) {
  return rows.slice().sort(compare);
}

function salesBar(label: string, sales: number, detail: string, href?: string, highlight = false): BlogChartRow {
  return { label, value: sales, display: String(sales), detail, href, highlight, prefix: "sales" };
}

function volumeBar(label: string, millions: number, display: string, detail: string, href?: string, highlight = false): BlogChartRow {
  return { label, value: millions, display, detail, href, highlight, prefix: "volume" };
}

function medianBar(label: string, millions: number, display: string, detail: string, href?: string, highlight = false): BlogChartRow {
  return { label, value: millions, display, detail, href, highlight };
}

function chartLabel(row: { label: string; table?: string }) {
  return row.table === "Sag Harbor Village" ? row.table : row.label;
}

const volumeRank = ranked(
  [
    ...HAMLETS.map((hamlet) => ({ ...hamlet, volume: hamlet.volumeTenths / 10 })),
    { ...OUTSIDE, volume: OUTSIDE.volumeTenths / 10, label: OUTSIDE.label },
  ],
  (a, b) => b.volume - a.volume
);

const salesRank = ranked(
  [...HAMLETS, { label: OUTSIDE.label, href: OUTSIDE.href, sales: OUTSIDE.sales, volumeDisplay: OUTSIDE.volumeDisplay }],
  (a, b) => b.sales - a.sales
);

const medianRank = ranked(
  [
    ...HAMLETS.map((hamlet) => ({
      label: hamlet.label,
      median: hamlet.median,
      medianDisplay: hamlet.medianDisplay,
      sales: hamlet.sales,
      href: hamlet.href,
    })),
    {
      label: OUTSIDE.label,
      median: OUTSIDE.median,
      medianDisplay: OUTSIDE.medianDisplay,
      sales: OUTSIDE.sales,
      href: OUTSIDE.href,
    },
  ],
  (a, b) => b.median - a.median
);
const median2026 = ranked(HAMLETS, (a, b) => b.y2026Median - a.y2026Median || b.y2026 - a.y2026);

const villageTable = HAMLETS.map(
  (hamlet) => `| [${hamlet.table}](${hamlet.href}) | ${hamlet.sales} | ${hamlet.volumeDisplay} | ${hamlet.medianDisplay} | ${hamlet.y2026} |`
).join("\n");

const oceanRows = [
  { label: "Southampton", href: HREF.southampton, off: 121, offMedian: "$8.00M", on: 10, onMedian: "$37.40M", onValue: 37.4 },
  { label: "Water Mill", href: HREF.waterMill, off: 69, offMedian: "$8.40M", on: 1, onMedian: "$14.5M", onValue: 14.5 },
  { label: "Bridgehampton", href: HREF.bridgehampton, off: 55, offMedian: "$8.60M", on: 8, onMedian: "$30.75M", onValue: 30.75 },
  { label: "Sagaponack", href: HREF.sagaponack, off: 55, offMedian: "$10.50M", on: 1, onMedian: "$10.0M", onValue: 10 },
  { label: "Wainscott", href: HREF.wainscott, off: 18, offMedian: "$8.45M", on: 3, onMedian: "$27.50M", onValue: 27.5 },
  { label: "East Hampton", href: HREF.eastHampton, off: 82, offMedian: "$10.00M", on: 13, onMedian: "$51.00M", onValue: 51 },
] as const;

const oceanTable = oceanRows
  .map((row) => `| [${row.label}](${row.href}) | ${row.off} | ${row.offMedian} | ${row.on} | ${row.onMedian} |`)
  .join("\n");

const harborSplit = [
  { label: "Sag Harbor Village", href: HREF.sagHarbor, water: 13, waterMedian: "$6.80M", interior: 38, interiorMedian: "$6.05M" },
  { label: "North Haven", href: HREF.northHaven, water: 13, waterMedian: "$10.40M", interior: 14, interiorMedian: "$6.31M" },
  { label: "Shelter Island", href: HREF.shelter, water: 9, waterMedian: "$9.00M", interior: 5, interiorMedian: "$6.55M" },
] as const;

assert(
  harborSplit[0].water + harborSplit[0].interior === 51 &&
    harborSplit[1].water + harborSplit[1].interior === 27 &&
    harborSplit[2].water + harborSplit[2].interior === 14,
  "harbor waterfront split"
);

const harborTable = harborSplit
  .map((row) => `| [${row.label}](${row.href}) | ${row.water} | ${row.waterMedian} | ${row.interior} | ${row.interiorMedian} |`)
  .join("\n");

export const eastEndReportPosts: BlogPost[] = [
  {
    slug: "east-end-luxury-market-overview-2026-10",
    title: "East End Luxury Real Estate Market Overview 2026",
    excerpt:
      "554 sales at $5 million and above since January 2023, $7.354 billion. East Hampton's median is $11.05 million. The largest parcel is 408 Further Lane at $115 million, off-market.",
    date: "2026-10-12",
    dateModified: "2026-10-12",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/heroes/950-meadow-lane-southampton.jpg",
    authorBox: true,
    hideCta: true,
    about: [
      "Southampton",
      "Water Mill",
      "Bridgehampton",
      "Sagaponack",
      "Wainscott",
      "East Hampton",
      "Sag Harbor",
      "North Haven",
      "Shelter Island",
      "Amagansett",
      "Montauk",
    ],
    keywords:
      "East End real estate, Hamptons luxury market 2026, Southampton, East Hampton, Sag Harbor, Shelter Island, oceanfront, $5 million",
    metaDescription:
      "East End at $5 million and above: 554 sales and $7.354 billion since 2023, from Southampton through East Hampton, Sag Harbor, North Haven, and Shelter Island.",
    charts: {
      "scope-volume": {
        title: "Volume since January 2023",
        kind: "bars",
        rows: [
          volumeBar("South of the highway", 6494, "$6.494B", `${SOUTH_SALES} sales`, undefined, true),
          volumeBar(NORTH_MARKETS, 860.3, "$860.3M", `${HARBOR_SALES} sales`),
        ],
      },
      "scope-sales": {
        title: "Sales since January 2023",
        kind: "bars",
        rows: [
          salesBar("South of the highway", SOUTH_SALES, "$6.494 billion", undefined, true),
          salesBar(NORTH_MARKETS, HARBOR_SALES, "$860.3 million"),
        ],
      },
      "volume-by-village": {
        title: "Volume by market",
        kind: "bars",
        rows: volumeRank.map((row, index) =>
          volumeBar(chartLabel(row), row.volume, row.volumeDisplay, `${row.sales} sales`, row.href, index === 0)
        ),
      },
      "sales-by-village": {
        title: "Sales by market",
        kind: "bars",
        rows: salesRank.map((row, index) => salesBar(chartLabel(row), row.sales, row.volumeDisplay, row.href, index === 0)),
      },
      "median-by-hamlet": {
        title: "Median sale",
        kind: "bars",
        rows: medianRank.map((row, index) =>
          medianBar(row.label, row.median, row.medianDisplay, `${row.sales} sales`, row.href, index === 0)
        ),
      },
      "sales-by-year": {
        title: "Sales by year",
        kind: "columns",
        rows: [
          salesBar("2023", YEAR_SALES[0], `${YEAR_SALES[0]} sales`),
          salesBar("2024", YEAR_SALES[1], `${YEAR_SALES[1]} sales`),
          salesBar("2025", YEAR_SALES[2], `${YEAR_SALES[2]} sales`, undefined, true),
          salesBar("2026", YEAR_SALES[3], "through early October"),
        ],
      },
      "median-2026": {
        title: "2026 median",
        kind: "bars",
        rows: median2026.map((hamlet, index) =>
          medianBar(hamlet.label, hamlet.y2026Median, hamlet.y2026Display, `${hamlet.y2026} sales`, hamlet.href, index === 0)
        ),
      },
      "price-bands": {
        title: "South of the highway",
        kind: "bars",
        rows: [
          salesBar("$5M to $10M", SOUTH_UNDER_10, `${SOUTH_UNDER_10} sales`, undefined, true),
          salesBar("$10M to $20M", SOUTH_10_20, `${SOUTH_10_20} sales`),
          salesBar("$20M and above", SOUTH_20_PLUS, `${SOUTH_20_PLUS} sales`),
        ],
      },
      "price-bands-north": {
        title: NORTH_MARKETS,
        kind: "bars",
        rows: [
          salesBar("$5M to $10M", HARBOR_UNDER_10, `${HARBOR_UNDER_10} sales`, undefined, true),
          salesBar("$10M to $20M", HARBOR_10_20, `${HARBOR_10_20} sales`),
          salesBar("$20M and above", HARBOR_20_PLUS, `${HARBOR_20_PLUS} sales`),
        ],
      },
      "ocean-median": {
        title: "Oceanfront median, south of the highway",
        kind: "bars",
        rows: ranked(oceanRows, (a, b) => b.onValue - a.onValue).map((row, index) =>
          medianBar(row.label, row.onValue, row.onMedian, `${row.on} ${row.on === 1 ? "sale" : "sales"}`, row.href, index === 0)
        ),
      },
    },
    content: `
## Key Takeaways

- **${COUNTED_SALES} sales, $7.354 billion**, at $5 million and above since January 2023. South of the highway is ${SOUTH_SALES} sales and $6.494 billion. ${NORTH_MARKETS} are ${HARBOR_SALES} sales and $860.3 million.
- **${SOUTH_UNDER_10 + HARBOR_UNDER_10} of the ${COUNTED_SALES} closed under $10 million.** South of the highway, ${SOUTH_UNDER_10} of ${SOUTH_SALES} did. East Hampton's median is **$11.05 million**. Sag Harbor Village's is **$6.3 million**.
- **${OCEAN_ON} oceanfront sales south of the highway total $1,632.7 million.** From Southampton to Montauk, January 2021 through early October 2026, oceanfront sales total 87, $2.61 billion, and a $24.5 million median.
- **408 Further Lane closed at $115 million, off-market.** The largest MLS sale is 700 Meadow Lane at **$112.5 million**.

## Since January 2023

South of Montauk Highway, Southampton through East Hampton account for $6.494 billion. ${NORTH_MARKETS} account for $860.3 million.

{{chart:scope-volume}}

{{chart:scope-sales}}

| Market | Sales | Volume |
|---|---:|---:|
| South of the highway | ${SOUTH_SALES} | $6.494 billion |
| ${NORTH_MARKETS} | ${HARBOR_SALES} | $860.3 million |
| **East End** | **${COUNTED_SALES}** | **$7.354 billion** |

| Oceanfront, Southampton to Montauk | Sales | Volume | Median |
|---|---:|---:|---:|
| [January 2021 to early October 2026](${HREF.oceanfront}) | 87 | $2.61 billion | $24.5 million |

## By Market

{{chart:volume-by-village}}

{{chart:sales-by-village}}

{{chart:median-by-hamlet}}

| Market | Sales | Volume | Median | 2026 sales |
|---|---:|---:|---:|---:|
${villageTable}

## By Year

{{chart:sales-by-year}}

{{chart:median-2026}}

## Price Bands

{{chart:price-bands}}

{{chart:price-bands-north}}

Fifteen sales south of the highway closed at $50 million or above: nine in East Hampton, three in Southampton, two in Bridgehampton, and one in Wainscott.

## On the Water

{{chart:ocean-median}}

| Market | Off the ocean | Median | On the ocean | Median |
|---|---:|---:|---:|---:|
${oceanTable}

Water Mill's bay and pond sales closed at an $18.83 million median. Sagaponack's oceanfront sale since 2023 is 2 Town Line Road at $10 million. In the longer oceanfront record, Sagaponack's median is $14.38 million across four sales back to 2021.

| Market | Waterfront | Median | Interior | Median |
|---|---:|---:|---:|---:|
${harborTable}

In the [oceanfront study](${HREF.oceanfront}), East Hampton's median is $48.5 million, Montauk's is $10.83 million, and Amagansett's is $9.5 million. Three sales cleared $100 million: 90 Jule Pond Drive at $105 million in 2021, where Hedgerow advised the seller, 700 Meadow Lane at $112.5 million, and 408 Further Lane at $115 million. Seven oceanfront sales in 2026 carry a $43.5 million median.

## The Largest Trades

| Address | Price | Closed | Record |
|---|---:|---|---|
| 408 Further Lane | $115,000,000 | Jul 31, 2025 | Off-market, oceanfront |
| 700 Meadow Lane | $112,500,000 | Nov 2023 | MLS, oceanfront |
| 26 and 32 Windmill Lane | $91,500,000 | Jan 11, 2023 | Off-market, oceanfront |
| 366 and 376 Gin Lane | $88,480,000 | Mar 2024 | MLS, oceanfront |
| 43 East Dune Lane | $72,000,000 | Mar 6, 2026 | MLS, oceanfront. Hedgerow represented the seller. |
| 370 and 372 Further Lane | $70,000,000 | Feb 2025 | MLS, oceanfront |
| 105 and 111 Lily Pond Lane | $66,750,000 | Aug 2025 | MLS, oceanfront |
| 115 Beach Lane | $59,000,000 | Mar 2026 | MLS, oceanfront |
| 165 Surfside Drive | $58,000,000 | Nov 2025 | MLS, oceanfront. Hedgerow advised the buyer. |
| 125 Mid Ocean Drive | $57,000,000 | Oct 2025 | MLS, oceanfront. A Hedgerow transaction. |
| 1010 Meadow Lane | $55,750,000 | Aug 2025 | Recorded deed, oceanfront |

408 Further Lane is the largest sale in East Hampton. 26 and 32 Windmill Lane closed as one trade on two deeds, $77,775,000 and $13,725,000. 700 Meadow Lane is the largest sale to go through the MLS.

41 and 47 Cove Hollow Farm Road, land bought by the Peconic Land Trust, sold for $55 million in December 2025.

70 and 71 Cobb Lane, a four-parcel compound at $121.5 million, closed before January 2023. Hedgerow represented both sides.

## FAQ

### How many luxury sales has the East End recorded since 2023?

Sales at $5 million and above total ${COUNTED_SALES} and $7.354 billion since January 2023. South of the highway is ${SOUTH_SALES} sales and $6.494 billion. ${NORTH_MARKETS} are ${HARBOR_SALES} sales and $860.3 million.

### Which hamlet has the highest median?

East Hampton, at $11.05 million across 100 sales. Sag Harbor Village is the lowest, at $6.3 million across 51 sales. Southampton has the most sales, 133, at an $8.84 million median.

### What is the largest sale in this record?

408 Further Lane closed at $115 million on July 31, 2025, off-market. The largest MLS sale is 700 Meadow Lane at $112.5 million in November 2023. The Cobb compound, at $121.5 million, closed before January 2023.

### Who is Barry McGovern?

Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020. More at [hamptonshomes.ai/about](https://hamptonshomes.ai/about).

## Thinking About the East End?

Whether you are weighing a sale or looking for a house that may never reach the open market, I am glad to walk through what these reports say about your street.

## Related

- [Southampton Luxury Market Overview 2026](/blog/southampton-luxury-market-overview-2026-10)
- [Water Mill Luxury Market Overview 2026](/blog/water-mill-luxury-market-overview-2026-10)
- [Bridgehampton Luxury Market Overview 2026](/blog/bridgehampton-luxury-market-overview-2026-10)
- [Sagaponack Luxury Market Overview 2026](/blog/sagaponack-luxury-market-overview-2026-10)
- [Wainscott Luxury Market Snapshot 2026](/blog/wainscott-luxury-market-snapshot-2026-10)
- [East Hampton Luxury Market Overview 2026](/blog/east-hampton-luxury-market-overview-2026-10)
- [Sag Harbor Village Luxury Market Overview 2026](/blog/sag-harbor-village-luxury-market-overview-2026-10)
- [Sag Harbor Waterfront Luxury Market 2026](/blog/sag-harbor-waterfront-luxury-market-2026-10)
- [North Haven Luxury Market 2026](/blog/north-haven-luxury-market-2026-10)
- [Shelter Island Luxury Market 2026](/blog/shelter-island-luxury-market-2026-10)
- [Shelter Island Waterfront Luxury Market 2026](/blog/shelter-island-waterfront-luxury-market-2026-10)
- [Hamptons Oceanfront, 2021 to 2026](/blog/hamptons-oceanfront-market-2021-2026)
- [Market research](/market)
- [Recent Hedgerow Exclusive Sales](/hedgerow-sales)

*Images courtesy of Hedgerow Exclusive Properties.*
`,
  },
];
