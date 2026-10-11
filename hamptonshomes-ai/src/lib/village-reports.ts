import type { BlogChartRow, BlogPost } from "./blog";

function years(
  caption: string,
  rows: { label: string; value: number; display: string; detail: string; highlight?: boolean }[]
) {
  return {
    title: "Median sale price by year",
    caption,
    rows,
  };
}

function supply(caption: string, rows: BlogChartRow[]) {
  return {
    title: "Active listings by price band",
    caption,
    rows,
  };
}

function band(label: string, listings: number, pace: string, highlight = false): BlogChartRow {
  return { label, value: listings, display: String(listings), detail: pace, highlight, prefix: "" };
}

const measured = `Sales are kept in the village named on the MLS city field, so a closing that turns up in a neighboring search is counted once, in the village it names. Duplicate MLS records of the same closing are counted once, including a second record of the same address within three weeks at a nearly identical price. Commercial property is excluded. Vacant land at $5 million and above is included. A sale with no reported price is excluded. South of the highway means the mapped location sits south of Montauk Highway, and in Southampton south of County Road 39 as well. Highway-frontage addresses are excluded. An address that could not be located is left out. Recorded deeds are added only when that closing is not in the MLS search, and they are labeled recorded deed. Where an MLS price and a deed price differ, the MLS price is used. This snapshot follows the MLS sold search of October 11, 2026, plus those deeds. A sale reported elsewhere, including in the oceanfront study on this site, is not added back when it is absent from both. These figures do not include trades that never appear in public MLS or deed records.`;

export const villageReportPosts: BlogPost[] = [
  {
    slug: "east-hampton-luxury-market-overview-2026-10",
    title: "East Hampton Luxury Real Estate Market Overview 2026",
    excerpt:
      "Eighty-seven sales at $5 million and above south of Montauk Highway since January 2023, a median of $11 million, and a 2026 south record that stops on July 28. Later East Hampton closings in the October search are north of the highway.",
    date: "2026-10-11",
    dateModified: "2026-10-11",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/hedgerow/sold-43-east-dune-lane-east-hampton-2026.webp",
    authorBox: true,
    hideCta: true,
    about: ["East Hampton"],
    keywords:
      "East Hampton real estate, East Hampton luxury homes, East Hampton market 2026, Further Lane, Lily Pond Lane, East Hampton oceanfront",
    metaDescription:
      "East Hampton south of the highway: 87 sales at $5 million and above since 2023, an $11 million median, and no south closing after July 28, 2026.",
    charts: {
      "median-by-year": years("East Hampton south of Montauk Highway, sales at $5 million and above. The 2026 bar stops on July 28.", [
        { label: "2023", value: 11.5, display: "$11.50M", detail: "17 sales" },
        { label: "2024", value: 10.5, display: "$10.50M", detail: "25 sales" },
        { label: "2025", value: 12.99, display: "$12.99M", detail: "27 sales" },
        { label: "2026", value: 9.5, display: "$9.50M", detail: "18 sales", highlight: true },
      ]),
      "supply-by-band": supply(
        "Active listings on October 10, 2026. Sales per year cover January 2023 through July 28, 2026, about 3.75 years. The highlighted band is the shortest supply.",
        [
          band("$5M to $10M", 8, "about 9.6 sales a year", true),
          band("$10M to $20M", 9, "about 8 sales a year"),
          band("$20M to $50M", 4, "about 4.3 sales a year"),
          band("$50M and above", 2, "about 1.3 sales a year"),
        ]
      ),
    },
    content: `
## Key Takeaways

- Since January 2023, East Hampton south of Montauk Highway has recorded **87 sales at $5 million and above**, totaling **$1.44 billion**, at a **median of $11.0 million**.
- **The south record for 2026 stops on July 28.** Eighteen sales have closed south of the highway this year, at a $9.50 million median. East Hampton sales in the October 11 search that closed after that date are north of the highway.
- **The ocean still sets the ceiling.** Nine oceanfront sales posted a **$45 million median**, led by 43 East Dune Lane at $72 million in March 2026, where Hedgerow represented the seller.
- **The top end is closer to balance here than in the villages to the west.** Six listings ask $20 million or more, against about six sales a year at that level.

## East Hampton at a Glance

| East Hampton South, $5M and above | |
|---|---|
| Sales, Jan 2023 to Jul 28, 2026 | 87 |
| Median sale price | $11.0 million |
| Top sale | $72 million, 43 East Dune Lane (Mar 2026) |
| Sales in 2026, south of the highway | 18 |
| Latest south closing in this search | July 28, 2026 |
| Active listings, Oct 10, 2026 | 23 |
| Median asking price | $12.5 million |
| Contracts signed since Sep 1 | 6 |

South of Montauk Highway, East Hampton runs from the village to the ocean: Lily Pond Lane, Further Lane, Georgica, Dunemere, Hither and Jericho, and the dune lanes. This report covers that market only, at $5 million and above. Springs, Northwest, and the roads north of the highway are the comparison, not the count.

## The Price Trend

{{chart:median-by-year}}

| Year | Sales | Median | Total |
|---|---|---|---|
| 2023 | 17 | $11.50M | $301.9M |
| 2024 | 25 | $10.50M | $289.1M |
| 2025 | 27 | $12.99M | $540.7M |
| 2026 (through Jul 28) | 18 | $9.50M | $304.7M |

East Hampton South has held an eight-figure median in every full year of this window. 2025 was the strongest, at $540.7 million, including 370 and 372 Further Lane at $70 million and 105 and 111 Lily Pond Lane at $66.75 million. The 2026 median is lower, at $9.50 million, because the mix below $10 million is heavier. The year still contains the record sale, 43 East Dune Lane at $72 million on March 6, pictured above.

The MLS search behind this report runs through October 11, 2026. No East Hampton sale south of Montauk Highway in that search closed after July 28. The later East Hampton closings, including sales in early October, sit north of the highway: Springs, Northwest, Two Holes of Water Road, Old Stone Highway, and the roads around them. They are real sales. They are not part of this south count, and they are why an October pull does not extend the south record past July.

## Inland, Waterfront and Ocean

| Setting | Sales $5M+ | Median | Top sale | Total |
|---|---|---|---|---|
| Inland, south of the highway | 77 | $10.25M | $55.0M | $1,013.7M |
| Waterfront (Georgica Pond) | 1 | $36.25M | $36.25M | $36.3M |
| Oceanfront | 9 | $45.00M | $72.0M | $386.4M |
| **East Hampton South** | **87** | **$11.00M** | **$72.0M** | **$1,436.4M** |
| *North of the highway, including Springs and Northwest* | *59* | *$6.00M* | *$18.4M* | *$397.7M* |

**Inland** includes some of the most valuable addresses in the Hamptons that do not touch the ocean. 41 and 47 Cove Hollow Farm Road closed at $55 million in December 2025. That sale is the estate, not a vacant lot. 121 Further Lane, Lasata, closed at $52 million in August 2023. 42 Hither Lane and 55 Middle Lane closed at $30 million in January 2026. 32 St Marys Lane, in the village south of Main Street, closed at $23 million in November 2025. Hedgerow represented the seller at 11 Amy's Lane ($11.2 million, February 2024) and at 86 Skimhampton Road ($8.85 million, April 2025).

**Waterfront** on Georgica Pond is a single sale in this search: 24 and 36 Jeffreys Lane at $36.25 million in November 2025, where Hedgerow represented the seller.

**Oceanfront** in this count is East Dune Lane, West Dune Lane, Lily Pond Lane, and 370 and 372 Further Lane. Nine sales, a $45 million median, $386.4 million in all. Beyond 43 East Dune Lane, the benchmarks in the search are 370 and 372 Further Lane at $70 million (February 2025), 105 and 111 Lily Pond Lane at $66.75 million (August 2025), 201 Lily Pond Lane at $45 million (November 2023), and 9 West Dune Lane at $45 million (May 2026, recorded deed). 33 Lily Pond Lane closed at $31.5 million in September 2025, one sale, and Hedgerow represented the seller.

{{figure:/images/hedgerow/sold-33-lily-pond-lane-east-hampton-2025.webp|33 Lily Pond Lane, East Hampton, sold for $31.5 million in September 2025. Hedgerow represented the seller.}}

Other Further Lane sales in the search, including 121 Further Lane and 466 Further Lane at $24 million in February 2026, are inland. The north-of-highway comparison is a different market: 59 sales, a $6.00 million median, $397.7 million in total, topped by 62 Louse Point Road at $18.4 million. That row includes Springs and Northwest, which the East Hampton search folds in.

## Fall 2026: Inventory Versus Contracts

{{chart:supply-by-band}}

| Price band | Active listings, Oct 10 | Sales, Jan 2023 to Jul 28, 2026 | Sales per year | Supply at that pace |
|---|---|---|---|---|
| $5M to $10M | 8 | 36 | about 9.6 | about 10 months |
| $10M to $20M | 9 | 30 | about 8 | about 14 months |
| $20M to $50M | 4 | 16 | about 4.3 | about 11 months |
| $50M and above | 2 | 5 | about 1.3 | about 18 months |
| **Total** | **23** | **87** | **about 23** | |

- **Supply is inside a year and a half in every band.** That is unusual on the South Fork, where the top of the shelf often carries several years of inventory.
- **Two listings carry a large share of the asking dollars.** 75 and 69 West End Road at $165 million and 100 and 90 Briar Patch Road at $85 million account for about 45 percent of the $549.5 million shelf.
- **Fall contracts are steady.** Six deals signed between September 1 and October 9: 5 Spaeth Lane ($19.9 million last ask), 37 Cross Highway ($11.995 million), 381 Further Lane ($11.25 million), 399 Further Lane ($10.9 million), 18 Ruxton Road ($9.95 million) and 28 Pudding Hill Lane ($6.995 million). With 107 Georgica Road ($29.995 million) and 24 The Crossways ($28 million) from the summer, eight East Hampton South properties at $5 million and above are in contract.

Listing and contract counts are from MLS listing data on October 10 and through October 9. They are separate from the sold search, which is why the shelf can be current on October 10 while the south sold record stops in July.

## Top East Hampton South Sales Since 2023

| Address | Price | Closed | Setting |
|---|---|---|---|
| 43 East Dune Lane | $72,000,000 | Mar 2026 | Oceanfront |
| 370 and 372 Further Lane | $70,000,000 | Feb 2025 | Oceanfront |
| 105 and 111 Lily Pond Lane | $66,750,000 | Aug 2025 | Oceanfront |
| 41 and 47 Cove Hollow Farm Road | $55,000,000 | Dec 2025 | Inland |
| 121 Further Lane | $52,000,000 | Aug 2023 | Inland |
| 201 Lily Pond Lane | $45,000,000 | Nov 2023 | Oceanfront |
| 9 West Dune Lane | $45,000,000 | May 2026 | Oceanfront, recorded deed |
| 24 and 36 Jeffreys Lane | $36,250,000 | Nov 2025 | Georgica Pond |
| 51 West End Avenue | $35,000,000 | Jan 2023 | Inland |
| 33 Lily Pond Lane | $31,500,000 | Sep 2025 | Oceanfront |

*MLS sold data, October 11, 2026, plus recorded deeds that do not appear in that search. 9 West Dune Lane is a recorded deed. 43 East Dune Lane and 24 and 36 Jeffreys Lane: Hedgerow represented the seller. 33 Lily Pond Lane: Hedgerow represented the seller.*

{{figure:/images/hedgerow/sold-24-36-jeffreys-lane-east-hampton-2025.webp|24 and 36 Jeffreys Lane, on Georgica Pond, sold for $36.25 million in November 2025. Hedgerow represented the seller.}}

Six closings are in the recorded deeds and not in the MLS search: 9 West Dune Lane at $45 million (May 2026), 35 East Dune Lane at $25 million and 39 East Dune Lane at $15 million (May 2025), 54 Lee Avenue at $22.4 million (April 2025), 5 Hook Pond Lane at $7 million (February 2025), and 28 Ocean Avenue at $6.315 million (March 2026). They are recorded deeds, not a claim about how the sale was marketed.

## For Buyers and Sellers

**If you are buying:**
- Inventory is about a year deep through most of the market, so the best houses do not sit for long.
- The largest listings are where negotiation lives. Two properties account for almost half the asking dollars on the market.
- Six of the sales in this report appear only in the deed record. Private opportunities are a real part of this market.

**If you are selling:**
- The record supports eight-figure pricing south of the highway. The median was above $10 million in 2023, 2024, and 2025.
- Oceanfront in this search carries a median of $45 million, against $10.25 million inland. Georgica Pond has one print, at $36.25 million.
- Fall buyers are active between $7 million and $20 million, which is where the September and early October contracts landed.

## How These Figures Were Measured

- **Area.** Closed sales of $5 million and above with an East Hampton MLS city, south of Montauk Highway, from January 2023 through the latest south closing in the October 11, 2026 search, which is July 28, 2026. Packages count as one sale.
- **Oceanfront.** East Dune Lane, West Dune Lane, Lily Pond Lane, and 370 and 372 Further Lane. Pond frontage in this count is 24 and 36 Jeffreys Lane.
- **North comparison.** Fifty-nine sales from the same East Hampton search whose mapped location is north of Montauk Highway. That set includes Springs and Northwest. It is not a second south market.
- **Sources.** MLS sold data from the October 11, 2026 search, plus the six recorded deeds named above. ${measured}
- **Listings and contracts.** Active listings reflect MLS listing data on October 10, 2026. A parcel offered under two listings is counted once. Contracts reflect MLS listing data through October 9, 2026.
- **Limits.** Closings that have not yet been entered in MLS or recorded can still arrive. Nothing in this search adds a south-of-highway East Hampton sale after July 28, 2026.

## FAQ

### What is the median price of a luxury home in East Hampton?

Across 87 sales at $5 million and above south of the highway from January 2023 through July 28, 2026, the median was $11.0 million. In 2026, across 18 south-of-highway sales, it is $9.50 million.

### What is the most expensive home sold in East Hampton recently?

43 East Dune Lane closed at $72 million in March 2026, the top East Hampton South sale since 2023. Hedgerow represented the seller. It is pictured at the top of this report.

### How many luxury homes are for sale in East Hampton this fall?

As of October 10, 2026, there were 23 listings at $5 million and above south of the highway, asking a combined $549.5 million at a median of about $12.5 million.

### Is East Hampton a buyer's or seller's market?

It is close to balanced. Supply runs from about 10 months below $10 million to about 18 months above $50 million. That leans slightly toward sellers at the lower end of this range and gives buyers modest room on the largest listings.

### Who is Barry McGovern?

Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020. More at [hamptonshomes.ai/about](https://hamptonshomes.ai/about).

## Thinking About East Hampton?

Whether you are weighing a sale or looking for a house that may never reach the open market, I am glad to walk through what the record says about your street.

## Related

- [East Hampton town page](/east-hampton)
- [Lily Pond Lane and Further Lane, 2026](/blog/east-hampton-lily-pond-further-lane-2026)
- [Wainscott Luxury Market Snapshot 2026](/blog/wainscott-luxury-market-snapshot-2026-10)
- [The Hamptons Fall 2026 Pipeline](/blog/hamptons-fall-2026-contracts-inventory)
- [Recent Hedgerow Exclusive Sales](/hedgerow-sales)

*Images courtesy of Hedgerow Exclusive Properties.*
`,
  },
  {
    slug: "southampton-luxury-market-overview-2026-10",
    title: "Southampton Luxury Real Estate Market Overview 2026",
    excerpt:
      "One hundred twenty-five sales at $5 million and above south of the highway since January 2023, a median of $8.4 million, and a 2026 median of $11.6 million across 30 sales, led by Mylestone at 700 Meadow Lane.",
    date: "2026-10-11",
    dateModified: "2026-10-11",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/hedgerow/sold-109-duck-pond-lane-southampton-2026.webp",
    authorBox: true,
    hideCta: true,
    about: ["Southampton"],
    keywords:
      "Southampton real estate, Southampton Village luxury homes, Southampton market 2026, Meadow Lane, Gin Lane, Southampton oceanfront",
    metaDescription:
      "Southampton south of the highway: 125 sales at $5 million and above since 2023, an $8.4 million median, and a 2026 median of $11.6 million.",
    charts: {
      "median-by-year": years("Southampton south of Montauk Highway and County Road 39, sales at $5 million and above.", [
        { label: "2023", value: 7.95, display: "$7.95M", detail: "27 sales" },
        { label: "2024", value: 6.75, display: "$6.75M", detail: "23 sales" },
        { label: "2025", value: 7.6, display: "$7.60M", detail: "45 sales" },
        { label: "2026", value: 11.6, display: "$11.60M", detail: "30 sales", highlight: true },
      ]),
      "supply-by-band": supply(
        "Active listings on October 10, 2026. Sales per year cover January 2023 through October 9, 2026, about 3.75 years. The highlighted band is the shortest supply.",
        [
          band("$5M to $10M", 17, "about 19.5 sales a year", true),
          band("$10M to $20M", 11, "about 9.3 sales a year"),
          band("$20M to $50M", 12, "about 4 sales a year"),
          band("$50M and above", 1, "about 0.5 sales a year"),
        ]
      ),
    },
    content: `
## Key Takeaways

- Since January 2023, Southampton south of the highway has recorded **125 sales at $5 million and above**, totaling **$1.56 billion**, at a **median of $8.4 million**.
- **2026 has moved up.** Thirty sales so far carry an **$11.6 million median**, against medians between $6.75 million and $7.95 million in the prior three years.
- **Meadow Lane and Gin Lane set the ceiling.** Fifteen oceanfront sales posted a $24 million median, led by Mylestone at 700 Meadow Lane at $112.5 million in November 2023.
- **The shelf is priced ahead of much of the record.** As of October 10, 41 listings ask a combined $791.5 million, and 13 of them ask $20 million or more.

## Southampton at a Glance

| Southampton South, $5M and above | |
|---|---|
| Sales, Jan 2023 to Oct 9, 2026 | 125 |
| Median sale price | $8.40 million |
| Top sale | $112.5 million, 700 Meadow Lane (2023) |
| Sales in 2026 so far | 30 |
| Active listings, Oct 10, 2026 | 41 |
| Median asking price | $12.0 million |
| Contracts signed since Sep 1 | 6 |

This report covers Southampton Village and Southampton south of Montauk Highway and County Road 39: Meadow Lane, Gin Lane, First Neck and Halsey Neck, Ox Pasture, Wickapogue, Murray Lane, and the village streets in between. Sales the MLS city field places in Water Mill are in the Water Mill report.

## The Price Trend

{{chart:median-by-year}}

| Year | Sales | Median | Total |
|---|---|---|---|
| 2023 | 27 | $7.95M | $404.3M |
| 2024 | 23 | $6.75M | $191.6M |
| 2025 | 45 | $7.60M | $526.8M |
| 2026 (to Oct 9) | 30 | $11.60M | $438.1M |

2025 was the volume year, with 45 sales, while the median held at $7.60 million. In 2026 the mix changed. Eighteen of the 30 sales so far closed at $10 million or above, and seven closed at $20 million or above, including 137 Murray Lane at $41.65 million on October 9, 400 First Neck Lane at $29.5 million, and 346 Meadow Lane at $28 million. The 2026 median, $11.6 million, sits well above every prior year in this window. Late closings can still add to the year.

## Inland, Waterfront and Ocean

| Setting | Sales $5M+ | Median | Top sale | Total |
|---|---|---|---|---|
| Inland, south of the highway | 109 | $7.75M | $41.65M | $1,101.6M |
| Waterfront (bay) | 1 | $28.1M | $28.1M | $28.1M |
| Oceanfront | 15 | $24.00M | $112.5M | $431.1M |
| **Southampton South** | **125** | **$8.40M** | **$112.5M** | **$1,560.8M** |
| *North of the highway* | *30* | *$6.15M* | *$17.8M* | *$235.7M* |

**Inland** is the volume market, from village houses to estate lots on First Neck, Halsey Neck, and Ox Pasture. The top of that range is 137 Murray Lane at $41.65 million (October 9, 2026). It is the only inland sale above $30 million in this window. 400 First Neck Lane closed at $29.5 million in January 2026. It was entered in MLS without a street address, and it is an MLS sale. 623 Halsey Neck Lane closed at $29 million in May 2025. Hedgerow represented the seller at 109 Duck Pond Lane at $20 million in January 2026, pictured above, and represented both sides at 234 Wickapogue Road at $12.5 million in October 2023.

{{figure:/images/hedgerow/sold-234-wickapogue-road-southampton-2023.webp|234 Wickapogue Road, Southampton, sold for $12.5 million in October 2023. Hedgerow represented both sides.}}

**Oceanfront** in this count is Meadow Lane, including Mylestone at 700 Meadow Lane, Gin Lane, and 140 Murray Lane: 15 sales, a $24 million median, $431.1 million in all. The prints run from Mylestone at $112.5 million (November 2023) and 1010 Meadow Lane at $55.75 million (August 2025, recorded deed) through 1320 Meadow Lane at $40 million (January 2025), 140 Murray Lane at $34.8 million (July 2023), 1730 Meadow Lane at $32 million (June 2025), and 50 Gin Lane at $17 million (August 2026). 1320 Meadow Lane is an oceanfront sale on the lane, whatever property type the MLS record used.

**The bay** has one identified sale in this set: 1 Boatmans Lane at $28.125 million in February 2023.

North of the highway, the same Southampton search shows 30 sales, a $6.15 million median, and $235.7 million in total, topped by 320 Majors Path at $17.8 million.

## Fall 2026: Inventory Versus Contracts

{{chart:supply-by-band}}

| Price band | Active listings, Oct 10 | Sales, Jan 2023 to Oct 2026 | Sales per year | Supply at that pace |
|---|---|---|---|---|
| $5M to $10M | 17 | 73 | about 19.5 | about 10 months |
| $10M to $20M | 11 | 35 | about 9.3 | about 14 months |
| $20M to $50M | 12 | 15 | about 4 | about 3 years |
| $50M and above | 1 | 2 | about 0.5 | about 2 years |
| **Total** | **41** | **125** | **about 33** | |

- **Below $10 million, inventory is about 10 months of sales.** That band has done most of the count since 2023.
- **Above $20 million, the shelf is deep.** Thirteen listings ask a combined $514.4 million, about 65 percent of all asking dollars, led by 95 Down East Lane at $124 million.
- **Fall contracts are coming from several bands.** Six deals signed between September 1 and October 9: 134 Wyandanch Lane ($24.995 million last ask), 8 Squabble Lane ($24.95 million), 483 First Neck Lane ($19.95 million), 522 Wickapogue Road ($14.695 million), 100 Narrow Lane ($6.995 million) and 48 Captains Neck Lane ($6.995 million). Twelve Southampton South properties at $5 million and above are in contract in all, including 160 Wyandanch Lane at $38 million.

## Top Southampton South Sales Since 2023

| Address | Price | Closed | Setting |
|---|---|---|---|
| 700 Meadow Lane (Mylestone) | $112,500,000 | Nov 2023 | Oceanfront |
| 1010 Meadow Lane | $55,750,000 | Aug 2025 | Oceanfront, recorded deed |
| 137 Murray Lane | $41,650,000 | Oct 2026 | Inland |
| 1320 Meadow Lane | $40,000,000 | Jan 2025 | Oceanfront |
| 140 Murray Lane | $34,800,000 | Jul 2023 | Oceanfront |
| 1730 Meadow Lane | $32,000,000 | Jun 2025 | Oceanfront |
| 400 First Neck Lane | $29,500,000 | Jan 2026 | Inland |
| 623 Halsey Neck Lane | $29,000,000 | May 2025 | Inland |
| 1 Boatmans Lane | $28,125,000 | Feb 2023 | Bay |
| 346 Meadow Lane | $28,000,000 | Jan 2026 | Oceanfront |

*MLS sold data, October 11, 2026, plus recorded deeds. 1010 Meadow Lane is a recorded deed. 400 First Neck Lane was reported in MLS without a street address.*

{{figure:/images/hedgerow/sold-144-corrigan-street-southampton-2025.webp|144 Corrigan Street, Southampton, sold for $7.24 million in November 2025. Hedgerow represented both sides.}}

Five closings are in the recorded deeds and not in the MLS search: 1010 Meadow Lane at $55.75 million (August 2025), 153 Pond Lane at $16 million (July 2025), 262 Pond Lane at $14.5 million (March 2026), 242 South Main Street at $12 million (May 2025), and 120 Downs Path at $8.4 million (January 2026).

## For Buyers and Sellers

**If you are buying:**
- Under $10 million, the recent pace is about 19 sales a year and the shelf is 17 listings. Have the work done before the right house appears.
- Between $20 million and $50 million, there is room to negotiate. Twelve listings sit against about four sales a year.
- Five sales in this report appear only in the deed record.

**If you are selling:**
- The 2026 record, a $11.6 million median across 30 sales, sits above 2023, 2024, and 2025, especially from $10 million to $30 million.
- Above $30 million away from Meadow Lane and Gin Lane, one sale has cleared since 2023: 137 Murray Lane. A price there needs land, water, or a finished house the record can see.
- Fall contracts show buyers active from about $7 million to $25 million, and one contract is posted at $38 million.

## How These Figures Were Measured

- **Area.** Closed sales of $5 million and above with a Southampton MLS city, south of Montauk Highway and County Road 39, from January 17, 2023 through October 9, 2026. Packages count as one sale. One address, 508 Wickapogue Road, appeared twice in the search on the same day at the same price and is counted once.
- **Oceanfront.** Meadow Lane, including Mylestone, Gin Lane, and 140 Murray Lane. 137 Murray Lane is inland. The identified bay sale is 1 Boatmans Lane.
- **North comparison.** Thirty sales from the same Southampton search north of the highway: median $6.15 million, total $235.7 million, top sale 320 Majors Path at $17.8 million.
- **Sources.** MLS sold data from the October 11, 2026 search, plus the five recorded deeds named above. ${measured}
- **Listings and contracts.** Active listings reflect MLS listing data on October 10, 2026. A property offered both alone and as a package is counted once. 95 Down East Lane is counted once. Contracts reflect MLS listing data through October 9, 2026.
- **Limits.** These figures do not include trades that never appear in public MLS or deed records. Recent closings can take time to appear, so the 2026 count may rise.

## FAQ

### What is the median price of a luxury home in Southampton?

Across 125 sales at $5 million and above south of the highway from January 2023 through October 9, 2026, the median was $8.4 million. In 2026 so far, it is $11.6 million across 30 sales.

### What is the most expensive home sold in Southampton recently?

Mylestone, at 700 Meadow Lane, closed at $112.5 million in November 2023, the top Southampton sale in this window. In 2026, the top sale so far is 137 Murray Lane at $41.65 million.

### How many luxury homes are for sale in Southampton this fall?

As of October 10, 2026, there were 41 listings at $5 million and above south of the highway, asking a combined $791.5 million at a median of about $12 million.

### Is Southampton a buyer's or seller's market?

It depends on price. Below $20 million, inventory runs about 10 to 14 months of sales. Between $20 million and $50 million, there is about three years of supply at the recent pace, which gives buyers leverage.

### Who is Barry McGovern?

Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020. More at [hamptonshomes.ai/about](https://hamptonshomes.ai/about).

## Thinking About Southampton?

Whether you are weighing a sale or looking for a house that may never reach the open market, I am glad to walk through what the record says about your street.

## Related

- [Southampton town page](/southampton)
- [Water Mill Luxury Market Overview 2026](/blog/water-mill-luxury-market-overview-2026-10)
- [Sagaponack Luxury Market Overview 2026](/blog/sagaponack-luxury-market-overview-2026-10)
- [The Hamptons Fall 2026 Pipeline](/blog/hamptons-fall-2026-contracts-inventory)
- [Recent Hedgerow Exclusive Sales](/hedgerow-sales)

*Images courtesy of Hedgerow Exclusive Properties.*
`,
  },
  {
    slug: "bridgehampton-luxury-market-overview-2026-10",
    title: "Bridgehampton Luxury Real Estate Market Overview 2026",
    excerpt:
      "Fifty-nine sales at $5 million and above south of the highway since January 2023, a median of $10.3 million and $779.2 million in all, with 2025 still the oceanfront year and 13 sales already in 2026.",
    date: "2026-10-11",
    dateModified: "2026-10-11",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/hedgerow/sold-165-surfside-drive-bridgehampton-2025.webp",
    authorBox: true,
    hideCta: true,
    about: ["Bridgehampton"],
    keywords:
      "Bridgehampton real estate, Bridgehampton luxury homes, Bridgehampton market 2026, Surfside Drive, Bridgehampton oceanfront, Ocean Road",
    metaDescription:
      "Bridgehampton south of the highway: 59 sales at $5 million and above since 2023, a $10.3 million median, and $779.2 million in closed volume.",
    charts: {
      "median-by-year": years("Bridgehampton south of Montauk Highway, sales at $5 million and above.", [
        { label: "2023", value: 10.6, display: "$10.60M", detail: "13 sales" },
        { label: "2024", value: 8.89, display: "$8.89M", detail: "14 sales" },
        { label: "2025", value: 15.1, display: "$15.10M", detail: "19 sales" },
        { label: "2026", value: 9.85, display: "$9.85M", detail: "13 sales", highlight: true },
      ]),
      "supply-by-band": supply(
        "Active listings on October 10, 2026. Sales per year cover January 2023 through September 25, 2026, about 3.75 years. The highlighted band is the shortest supply.",
        [
          band("$5M to $10M", 2, "about 7.5 sales a year", true),
          band("$10M to $20M", 10, "about 6.4 sales a year"),
          band("$20M to $50M", 7, "about 1.3 sales a year"),
          band("$50M and above", 2, "about 0.5 sales a year"),
        ]
      ),
    },
    content: `
## Key Takeaways

- Since January 2023, Bridgehampton south of the highway has recorded **59 sales at $5 million and above**, totaling **$779.2 million**, at a **median of $10.3 million**.
- **2025 was the standout year.** Nineteen sales carried a **$15.1 million median** and $345.9 million, led by 165 Surfside Drive at $58 million and 125 Mid Ocean Drive at $57 million.
- **The ocean sets the ceiling.** Six oceanfront sales in this search posted a $30 million median.
- **The shelf sits high.** As of October 10, 21 listings ask a combined $477.6 million at a $17.5 million median. Only two ask under $10 million.

## Bridgehampton at a Glance

| Bridgehampton South, $5M and above | |
|---|---|
| Sales, Jan 2023 to Sep 25, 2026 | 59 |
| Median sale price | $10.30 million |
| Top sale | $58 million, 165 Surfside Drive (Nov 2025) |
| Sales in 2026 so far | 13 |
| Active listings, Oct 10, 2026 | 21 |
| Median asking price | $17.5 million |
| Contracts signed since Sep 1 | 3 |

South of Montauk Highway, Bridgehampton runs from the village down to the ocean: Ocean Road, Halsey Lane, Jobs Lane, Pauls Lane, Highland Terrace, and the oceanfront along Surfside Drive, Mid Ocean Drive, and Dune Road. Sales the MLS city field places in Water Mill, including Pointe Mecox, are in the Water Mill report.

## The Price Trend

{{chart:median-by-year}}

| Year | Sales | Median | Total |
|---|---|---|---|
| 2023 | 13 | $10.60M | $167.0M |
| 2024 | 14 | $8.89M | $132.9M |
| 2025 | 19 | $15.10M | $345.9M |
| 2026 (to Sep 25) | 13 | $9.85M | $133.3M |

2023 and 2025 are the sturdy years in this search: 13 sales and $167.0 million in 2023, then 19 sales and $345.9 million in 2025, when Surfside Drive and Mid Ocean Drive did the heavy lifting. 2024 is lighter here, 14 sales and $132.9 million. 2026 already has 13 sales through September 25, at a $9.85 million median and $133.3 million, led by 104 Quimby Lane at $22.15 million, where Hedgerow represented the seller. The latest sale in the search is September 25. Fall closings can still add to the year.

## Inland and Ocean

| Setting | Sales $5M+ | Median | Top sale | Total |
|---|---|---|---|---|
| Inland, south of the highway | 53 | $9.25M | $30.0M | $570.0M |
| Oceanfront | 6 | $30.00M | $58.0M | $209.2M |
| **Bridgehampton South** | **59** | **$10.30M** | **$58.0M** | **$779.2M** |
| *North of the highway* | *45* | *$7.79M* | *$20.5M* | *$402.5M* |

**Inland** carries the count, from village lanes to estate parcels on Ocean Road and Highland Terrace. The top inland sales are 1240 Ocean Road at $30 million (2023), 72 Highland Terrace at $24.3 million (July 2023), and 104 Quimby Lane at $22.15 million (April 2026). The MLS date on 1240 Ocean Road is a January 1 placeholder, so the year is 2023 and the month is not stated here.

{{figure:/images/hedgerow/sold-104-quimby-lane-bridgehampton-2026.webp|104 Quimby Lane, Bridgehampton, sold for $22.15 million in April 2026. Hedgerow represented the seller.}}

**Oceanfront** in this search is six sales: 165 Surfside Drive at $58 million (November 14, 2025), where Hedgerow advised the buyer; 125 Mid Ocean Drive at $57 million (October 22, 2025), entered in MLS without a street address, where Hedgerow represented the buyer; 67 Surfside Drive at $32 million and 79 Surfside Drive at $28 million, where Hedgerow represented both sides on each; 125 and 128 Dune Road at $17.5 million (January 2025); and 228 Surfside Drive at $16.65 million (January 2025). Together, $209.2 million, median $30 million. 165 Surfside Drive is pictured above.

North of the highway, the same Bridgehampton search shows 45 sales, a $7.79 million median, and $402.5 million, topped by 1953 Scuttle Hole Road at $20.5 million.

## Fall 2026: Inventory Versus Contracts

{{chart:supply-by-band}}

| Price band | Active listings, Oct 10 | Sales, Jan 2023 to Sep 2026 | Sales per year | Supply at that pace |
|---|---|---|---|---|
| $5M to $10M | 2 | 28 | about 7.5 | about 3 months |
| $10M to $20M | 10 | 24 | about 6.4 | about 19 months |
| $20M to $50M | 7 | 5 | about 1.3 | about 5 years |
| $50M and above | 2 | 2 | about 0.5 | about 4 years |
| **Total** | **21** | **59** | **about 16** | |

- **Under $10 million, there is almost nothing for sale.** Two listings sit against about 7.5 sales a year.
- **Above $20 million, buyers have time.** Nine listings, led by 125 Dune Road at $69 million and 795 Ocean Road at $58 million, ask $321.4 million, about two-thirds of all asking dollars. That is about five years of supply at the recent pace above $20 million.
- **Fall contracts.** Three deals signed between September 1 and October 9: 672 Halsey Lane ($24.995 million last ask), 109 Lockwood Avenue ($12.95 million) and 63 Newlight Lane ($11.995 million). Nine Bridgehampton South properties at $5 million and above are in contract in all, including 351 Jobs Lane at $9.65 million, where Hedgerow represented the seller.

## Top Bridgehampton South Sales Since 2023

| Address | Price | Closed | Setting |
|---|---|---|---|
| 165 Surfside Drive | $58,000,000 | Nov 2025 | Oceanfront |
| 125 Mid Ocean Drive | $57,000,000 | Oct 2025 | Oceanfront |
| 67 Surfside Drive | $32,000,000 | Apr 2025 | Oceanfront |
| 1240 Ocean Road | $30,000,000 | 2023 | Inland |
| 79 Surfside Drive | $28,000,000 | Nov 2025 | Oceanfront |
| 72 Highland Terrace | $24,300,000 | Jul 2023 | Inland |
| 104 Quimby Lane | $22,150,000 | Apr 2026 | Inland |
| 474 Jobs Lane | $18,200,000 | Sep 2025 | Inland |
| 201 Jobs Lane | $18,100,000 | Oct 2023 | Inland |
| 125 and 128 Dune Road | $17,500,000 | Jan 2025 | Oceanfront |

*MLS sold data, October 11, 2026. 125 Mid Ocean Drive was reported in MLS without a street address. 1240 Ocean Road is shown by year because the MLS date is a placeholder.*

## Hedgerow in Bridgehampton

Hedgerow had a role in 13 of these 59 sales, totaling $281.7 million, about 36 percent of the dollar volume. On the ocean, Hedgerow advised the buyer at 165 Surfside Drive and represented the buyer at 125 Mid Ocean Drive, and represented both sides at 67 Surfside Drive and 79 Surfside Drive. Inland, Hedgerow represented the seller at 104 Quimby Lane, 70 Matthews Lane ($17.25 million, 2025), 1076 Ocean Road ($10.3 million, September 2026), 81 Ocean Road, 25 Jobs Lane and 690 Ocean Road, and represented both sides at 385 Jobs Lane ($14.75 million, 2024), 191 Highland Terrace ($12.2 million, 2023) and 946 Ocean Road ($10.3 million, 2026).

{{figure:/images/hedgerow/sold-946-ocean-road-bridgehampton-2026.webp|946 Ocean Road, Bridgehampton, sold for $10.3 million in April 2026. Hedgerow represented both sides.}}

One closing is in the recorded deeds and not in the MLS search: 340 Sagaponack Road at $5.45 million, in 2026. The month is not stated, because the deed month used here is not a confirmed closing month. 1 Mecox Field Lane, 223 Church Lane, and 77 School Street are in the MLS search and are counted as MLS sales.

## For Buyers and Sellers

**If you are buying:**
- Under $10 million south of the highway, expect competition. There are two listings.
- Above $20 million, there is room. Nine listings sit against about two sales a year.
- The inland record supports up to $30 million for the best houses on Ocean Road, and $24.3 million on Highland Terrace. That is the range with a closed sale behind it.

**If you are selling:**
- Between $5 million and $10 million, buyers have few alternatives.
- Above $20 million, seven sales have cleared since 2023. Four were oceanfront: 165, 67, and 79 Surfside Drive, and 125 Mid Ocean Drive. The other three were 1240 Ocean Road, 72 Highland Terrace, and 104 Quimby Lane.
- A finished house between the village and the ocean is still the most liquid product in this set. Twenty-four of the 59 sales fell between $10 million and $20 million.

## How These Figures Were Measured

- **Area.** Closed sales of $5 million and above with a Bridgehampton MLS city, south of Montauk Highway, from January 2023 through September 25, 2026. Packages count as one sale. Pointe Mecox sales the MLS city field places in Water Mill are not in this count.
- **Oceanfront.** Surfside Drive, 125 Mid Ocean Drive, and 125 and 128 Dune Road. Ocean Road is inland here.
- **North comparison.** Forty-five sales from the same search north of the highway.
- **Sources.** MLS sold data from the October 11, 2026 search, plus 340 Sagaponack Road. ${measured}
- **Listings and contracts.** Active listings reflect MLS listing data on October 10, 2026. A property offered both alone and as a package is counted once. Contracts reflect MLS listing data through October 9, 2026.
- **Limits.** Recent closings can take time to appear, so the 2026 count may rise. A sale discussed in an earlier note and absent from this search is not added back.

## FAQ

### What is the median price of a luxury home in Bridgehampton?

Across 59 sales at $5 million and above south of the highway from January 2023 through September 25, 2026, the median was $10.3 million. In 2025, it was $15.1 million across 19 sales.

### What is the most expensive home sold in Bridgehampton recently?

165 Surfside Drive closed at $58 million in November 2025, the top Bridgehampton South sale since 2023. Hedgerow advised the buyer. 125 Mid Ocean Drive followed at $57 million in October 2025, and Hedgerow represented the buyer.

### How many luxury homes are for sale in Bridgehampton this fall?

As of October 10, 2026, there were 21 listings at $5 million and above south of the highway, asking a combined $477.6 million at a median of $17.5 million.

### Is Bridgehampton a buyer's or seller's market?

Both, depending on price. Under $10 million it is a seller's market, with about three months of supply. Above $20 million, there is about five years of supply at the recent pace, which favors buyers.

### Who is Barry McGovern?

Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020. More at [hamptonshomes.ai/about](https://hamptonshomes.ai/about).

## Thinking About Bridgehampton?

Whether you are weighing a sale or looking for a house that may never reach the open market, I am glad to walk through what the record says about your street.

## Related

- [Bridgehampton town page](/bridgehampton)
- [Bridgehampton Non-Water Luxury Market Overview 2026](/blog/bridgehampton-non-water-market-overview-2026-09)
- [Sagaponack Luxury Market Overview 2026](/blog/sagaponack-luxury-market-overview-2026-10)
- [Water Mill Luxury Market Overview 2026](/blog/water-mill-luxury-market-overview-2026-10)
- [Hamptons Oceanfront, 2021 to 2026](/blog/hamptons-oceanfront-market-2021-2026)
- [Recent Hedgerow Exclusive Sales](/hedgerow-sales)

*Images courtesy of Hedgerow Exclusive Properties.*
`,
  },
  {
    slug: "water-mill-luxury-market-overview-2026-10",
    title: "Water Mill Luxury Real Estate Market Overview 2026",
    excerpt:
      "Seventy-eight sales at $5 million and above south of the highway since January 2023, a median of $9.45 million, and a 2026 median of $10.36 million, with the fall shelf stacked above $20 million.",
    date: "2026-10-11",
    dateModified: "2026-10-11",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/hedgerow/sold-120-bay-lane-water-mill-2025.webp",
    authorBox: true,
    hideCta: true,
    about: ["Water Mill"],
    keywords:
      "Water Mill real estate, Water Mill luxury homes, Water Mill market 2026, Mecox Bay, Flying Point, Water Mill oceanfront",
    metaDescription:
      "Water Mill south of the highway: 78 sales at $5 million and above since 2023, a $9.45 million median, and a fall shelf priced well above the record.",
    charts: {
      "median-by-year": years("Water Mill south of Montauk Highway, sales at $5 million and above. 2024 is 17 sales.", [
        { label: "2023", value: 10.1, display: "$10.10M", detail: "20 sales" },
        { label: "2024", value: 9.1, display: "$9.10M", detail: "17 sales" },
        { label: "2025", value: 9.0, display: "$9.00M", detail: "25 sales" },
        { label: "2026", value: 10.36, display: "$10.36M", detail: "16 sales", highlight: true },
      ]),
      "supply-by-band": supply(
        "Active listings on October 10, 2026. Sales per year cover January 2023 through early October 2026. The highlighted band is the shortest supply.",
        [
          band("$5M to $10M", 8, "about 11 sales a year", true),
          band("$10M to $20M", 5, "about 7.5 sales a year"),
          band("$20M to $50M", 12, "about 2.4 sales a year"),
          band("$50M and above", 1, "no sale since 2023"),
        ]
      ),
    },
    content: `
## Key Takeaways

- Since January 2023, Water Mill south of the highway has recorded **78 sales at $5 million and above**, totaling **$854.9 million**, at a **median of $9.45 million**.
- **2026 is running ahead on price.** Sixteen sales so far this year carry a $10.36 million median, the highest of the four years, led by 127 Halsey Lane at $27.5 million.
- **The water sets the ceiling.** Eight bay and pond sales posted an $18.8 million median, about double the inland figure.
- **The fall shelf sits high.** As of October 10, 26 listings ask a combined $560.1 million. Thirteen of them ask $20 million or more, against nine sales at that level in almost four years.

## Water Mill at a Glance

| Water Mill South, $5M and above | |
|---|---|
| Sales, Jan 2023 to Oct 2026 | 78 |
| Median sale price | $9.45 million |
| Top sale | $27.5 million, 127 Halsey Lane (Apr 2026) |
| Sales in 2026 so far | 16 |
| Active listings, Oct 10, 2026 | 26 |
| Median asking price | $19.0 million |
| Contracts signed since Sep 1 | 2 |

South of Montauk Highway, Water Mill runs from the village center down to Mecox Bay, the ponds and Flying Point. The core streets are Rose Hill Road, Cobb Road and Cobb Isle Road, Fordune Drive, Jule Pond Drive, Davids Lane, Halsey Lane and the lanes off Flying Point Road. This report covers that market only, at $5 million and above.

## The Price Trend

{{chart:median-by-year}}

| Year | Sales | Median | Total |
|---|---|---|---|
| 2023 | 20 | $10.10M | $230.4M |
| 2024 | 17 | $9.10M | $174.3M |
| 2025 | 25 | $9.00M | $264.3M |
| 2026 (to Oct) | 16 | $10.36M | $185.8M |

The market has been steady rather than spiky. Volume peaked in 2025, with 25 sales, while the median held near $9 million. In 2026 the mix has moved up: six of the 16 sales so far are between $10 million and $20 million, and two are above $20 million. The 2026 figures will rise as late summer and fall closings are recorded.

## Inland, Waterfront and Ocean

| Setting | Sales $5M+ | Median | Top sale | Total |
|---|---|---|---|---|
| Inland, south of the highway | 69 | $8.40M | $27.5M | $698.1M |
| Waterfront (bay and pond) | 8 | $18.83M | $24.0M | $142.3M |
| Oceanfront | 1 | $14.5M | $14.5M | $14.5M |
| **Water Mill South** | **78** | **$9.45M** | **$27.5M** | **$854.9M** |
| *For comparison: north of the highway* | *51* | *$7.40M* | *$13.3M* | *$390.5M* |

**Inland** is the volume market. It is mostly newer houses on one to three acres between the village and the bay. The top of that range now belongs to 127 Halsey Lane at $27.5 million (April 2026), 53 Fordune Drive at $24.6 million (September 2025) and 951 Flying Point Road at $22.5 million (May 2025).

**Waterfront** on Mecox Bay, Hayground Cove and the ponds roughly doubles the price. 180 Pointe Mecox Lane closed at $24 million (August 2023), 217 Rose Hill Road at $20.5 million (November 2025), and 120 Bay Lane, on Mecox Bay, at $12.625 million (May 2025), pictured above. Hedgerow represented the seller at 120 Bay Lane.

**Oceanfront** in Water Mill almost never trades. The only oceanfront sale in this window was 1195 Flying Point Road at $14.5 million (October 2024). The village benchmarks sit just outside it:
- 90 Jule Pond Drive sold for $105 million in 2021. Hedgerow advised the seller.
- The four-parcel compound at 70 and 71 Cobb Lane on Mecox Bay traded for $121.5 million, and Hedgerow represented both sides.

## Fall 2026: Inventory Versus Contracts

{{chart:supply-by-band}}

| Price band | Active listings, Oct 10 | Sales, Jan 2023 to Oct 2026 | Sales per year | Supply at that pace |
|---|---|---|---|---|
| $5M to $10M | 8 | 41 | about 11 | about 9 months |
| $10M to $20M | 5 | 28 | about 7.5 | about 8 months |
| $20M to $50M | 12 | 9 | about 2.4 | about 5 years |
| $50M and above | 1 | 0 | 0 | no recent sale |
| **Total** | **26** | **78** | **about 21** | |

- **Below $20 million, the market is tight.** Thirteen listings sit against a pace of about 18 sales a year. The two contracts signed since September 1 both came from this range: 179 Davids Lane at a last ask of $15.995 million (October 5) and 25 Swans Neck Lane at $8.25 million (September 3).
- **Above $20 million, the market is waiting.** Thirteen listings, including 140 Hayground Cove Road at $68 million, ask a combined $436.9 million, or 78 percent of all asking dollars. Water Mill South has closed nine sales above $20 million since 2023, and none above $27.5 million.

## Top Water Mill South Sales Since 2023

| Address | Price | Closed | Setting |
|---|---|---|---|
| 127 Halsey Lane | $27,500,000 | Apr 2026 | Inland |
| 53 Fordune Drive | $24,600,000 | Sep 2025 | Inland |
| 180 Pointe Mecox Lane | $24,000,000 | Aug 2023 | Waterfront |
| 111 Rose Hill Road | $23,995,000 | Dec 2023 | Waterfront |
| 951 Flying Point Road | $22,500,000 | May 2025 | Inland |
| 217 Rose Hill Road | $20,500,000 | Nov 2025 | Waterfront |
| 199 Georgian Lane | $20,000,000 | Nov 2025 | Inland |
| 180 Rose Hill Road | $20,000,000 | Jan 2023 | Inland |
| 200 Rose Hill Road | $20,000,000 | Feb 2026 | Inland |
| 360 and 366 Cobb Road | $19,000,000 | Nov 2023 | Waterfront |

*Source: MLS listing data and recorded deeds. 200 Rose Hill Road appears in the recorded deeds only.* Hedgerow represented the seller at 180 Rose Hill Road.

## For Buyers and Sellers

**If you are buying:**
- Between $5 million and $20 million, good inventory moves within months, so be ready to act on the right house.
- Above $20 million, there is room to negotiate. The record supports $20 million to $27.5 million for the best inland and bay houses, and most of the shelf asks more.
- Some of the best Water Mill houses trade privately. Several 2026 sales appear only in the deed record.

**If you are selling:**
- Below $20 million, the numbers favor you. Price to the recent record and the market has been absorbing it.
- Above $20 million, a price needs a reason the record does not show yet: water, land, or a truly finished house.
- Waterfront earns a real premium. Bay or pond frontage roughly doubles the inland median.

## How These Figures Were Measured

- **Area.** Closed sales of $5 million and above in Water Mill, south of Montauk Highway, from January 3, 2023 through October 2, 2026. South of the highway was confirmed against the county parcel map. Waterfront means frontage on Mecox Bay, Hayground Cove or a pond. Packages count as one sale, and listings sold under more than one MLS number are counted once.
- **What is included.** The totals include eight vacant land sales. Commercial property is excluded.
- **Sources.** MLS listing data, checked against a full MLS sold search on October 11, 2026, and supplemented by recorded deeds for sales that did not appear in MLS. Where MLS and deed prices differ, the MLS price is used.
- **Listings.** Active listings reflect MLS listing data on October 10, 2026. Listings also offered as part of a larger package are counted once each. Contracts reflect MLS listing data through October 5, 2026.
- **Limits.** These figures do not include off-market trades that never appear in public MLS or deed records. Closings since late July may not yet appear in the deed record, so 2026 counts may rise.

## FAQ

### What is the median price of a luxury home in Water Mill?

Across 78 sales at $5 million and above south of the highway from January 2023 through early October 2026, the median was $9.45 million. In 2026 so far, it is $10.36 million across 16 sales.

### What is the most expensive home sold in Water Mill recently?

127 Halsey Lane closed at $27.5 million in April 2026, the top Water Mill South sale since 2023. The village's benchmarks outside this window are 90 Jule Pond Drive at $105 million in 2021, and the 70 and 71 Cobb Lane compound at $121.5 million, where Hedgerow represented both sides.

### How many luxury homes are for sale in Water Mill this fall?

As of October 10, 2026, there were 26 listings at $5 million and above south of the highway, asking a combined $560.1 million at a median of $19 million.

### Is Water Mill a buyer's or seller's market?

Both, depending on price. Below $20 million, inventory is under a year of sales and the market leans to sellers. Above $20 million, there is about five years of supply at the recent pace, which gives buyers room.

### Who is Barry McGovern?

Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020. More at [hamptonshomes.ai/about](https://hamptonshomes.ai/about).

## Thinking About Water Mill?

Whether you are weighing a sale or looking for a house that may never reach the open market, I am glad to walk through what the record says about your street.

## Related

- [Water Mill town page](/water-mill)
- [Sagaponack Luxury Market Overview 2026](/blog/sagaponack-luxury-market-overview-2026-10)
- [The Hamptons Fall 2026 Pipeline](/blog/hamptons-fall-2026-contracts-inventory)
- [Hamptons Oceanfront, 2021 to 2026](/blog/hamptons-oceanfront-market-2021-2026)
- [Recent Hedgerow Exclusive Sales](/hedgerow-sales)

*Images courtesy of Hedgerow Exclusive Properties.*
`,
  },
  {
    slug: "wainscott-luxury-market-snapshot-2026-10",
    title: "Wainscott Luxury Real Estate Market Snapshot 2026",
    excerpt:
      "Twenty sales at $5 million and above south of the highway since 2023, a median of $9.05 million, with Beach Lane accounting for both oceanfront sales and $86.5 million of the $251.8 million total.",
    date: "2026-10-11",
    dateModified: "2026-10-11",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/hedgerow/sold-51-wainscott-hollow-road-wainscott-2023.webp",
    authorBox: true,
    hideCta: true,
    about: ["Wainscott"],
    keywords:
      "Wainscott real estate, Wainscott luxury homes, Wainscott market 2026, Beach Lane, Wainscott Hollow Road",
    metaDescription:
      "Wainscott south of the highway: 20 sales at $5 million and above since 2023, a $9.05 million median, led by 115 Beach Lane at $59 million.",
    charts: {
      "median-by-year": years("Wainscott south of Montauk Highway, sales at $5 million and above. The latest sale in this search closed June 18, 2026.", [
        { label: "2023", value: 7.34, display: "$7.34M", detail: "4 sales" },
        { label: "2024", value: 9.0, display: "$9.00M", detail: "3 sales" },
        { label: "2025", value: 11.65, display: "$11.65M", detail: "8 sales" },
        { label: "2026", value: 9.5, display: "$9.50M", detail: "5 sales", highlight: true },
      ]),
      "supply-by-band": supply(
        "Active listings on October 10, 2026. Sales per year cover February 2023 through June 18, 2026, about 3.75 years.",
        [
          band("$5M to $10M", 8, "about 3.5 sales a year"),
          band("$10M to $20M", 2, "about 1.3 sales a year"),
          band("$20M to $50M", 4, "about 0.3 sales a year"),
          band("$50M and above", 0, "about 0.3 sales a year"),
        ]
      ),
    },
    content: `
## Key Takeaways

- Since January 2023, Wainscott south of the highway has recorded **20 sales at $5 million and above**, totaling **$251.8 million**, at a **median of $9.05 million**.
- **Beach Lane set the record.** 115 Beach Lane closed at **$59 million** in March 2026. The only other oceanfront sale in this search is 111 Beach Lane at $27.5 million.
- **Inland Wainscott tops out just above $15 million.** Eighteen inland sales posted an $8.75 million median. The top two are 4 Georgica Association Road at $15.2 million and 15 Wainscott Stone Road at $15 million.
- **Supply is ahead of the recent pace.** As of October 10, 14 listings ask $208.4 million, against about five sales a year at this level. No $5 million-plus contract has been signed south of the highway since September 1.

## Wainscott at a Glance

| Wainscott South, $5M and above | |
|---|---|
| Sales, Feb 2023 to Jun 18, 2026 | 20 |
| Median sale price | $9.05 million |
| Top sale | $59 million, 115 Beach Lane (Mar 2026) |
| Sales in 2026 so far | 5 |
| Active listings, Oct 10, 2026 | 14 |
| Median asking price | $7.95 million |
| Contracts signed since Sep 1 | 0 |

South of Montauk Highway, Wainscott runs from the hamlet down to Georgica Pond and the ocean: Beach Lane, Wainscott Main Street, Wainscott Hollow Road, Wainscott Stone Road, Sayres Path, and Westwood Road. The October 11 search did not add a south-of-highway sale after June 18, 2026. It also did not produce a north-of-highway Wainscott sale at $5 million or above to set beside this record.

## Sales by Year and Setting

{{chart:median-by-year}}

| Year | Sales | Median | Total |
|---|---|---|---|
| 2023 | 4 | $7.34M | $28.3M |
| 2024 | 3 | $9.00M | $25.1M |
| 2025 | 8 | $11.65M | $100.6M |
| 2026 (to Jun 18) | 5 | $9.50M | $97.7M |

| Setting | Sales $5M+ | Median | Top sale | Total |
|---|---|---|---|---|
| Inland, south of the highway | 18 | $8.75M | $15.2M | $165.3M |
| Oceanfront | 2 | $43.25M | $59.0M | $86.5M |
| **Wainscott South** | **20** | **$9.05M** | **$59.0M** | **$251.8M** |

The ocean accounts for two sales and about a third of the dollars: 115 Beach Lane at $59 million (March 17, 2026) and 111 Beach Lane at $27.5 million (April 30, 2025), together $86.5 million. Inland, the top sales are 4 Georgica Association Road at $15.2 million (February 18, 2025), on 2.7 acres, 15 Wainscott Stone Road at $15 million (June 18, 2026), 73 Wainscott Stone Road at $12.15 million (September 2025), and 28 Wainscott Hollow Road at $11.995 million (November 2025). Hedgerow represented both sides at 51 Wainscott Hollow Road, $7.1 million, in February 2023, pictured above.

{{figure:/images/hedgerow/sold-57-wainscott-hollow-road-wainscott-2022.webp|57 Wainscott Hollow Road sold for $9.1 million in November 2022, before this report's window. Hedgerow represented the seller.}}

One vacant land sale is in the set: 57 Wainscott Hollow Road at $11.3 million in November 2025, a recorded deed. That is a different closing from the 2022 sale pictured here.

## Fall 2026: Inventory Versus Sales

{{chart:supply-by-band}}

| Price band | Active listings, Oct 10 | Sales, Feb 2023 to Jun 2026 | Sales per year | Supply at that pace |
|---|---|---|---|---|
| $5M to $10M | 8 | 13 | about 3.5 | about 2.3 years |
| $10M to $20M | 2 | 5 | about 1.3 | about 18 months |
| $20M to $50M | 4 | 1 | about 0.3 | about 15 years |
| $50M and above | 0 | 1 | about 0.3 | none listed |
| **Total** | **14** | **20** | **about 5** | |

- **Four listings ask between $20 million and $50 million**, led by 105 Beach Lane and 30 Mathews Road at $35 million each and 109 Town Line Road at $29.995 million. That band has one closed sale since 2023: 111 Beach Lane at $27.5 million.
- **Nothing is listed above $50 million.** The only sale there is 115 Beach Lane at $59 million.
- **No $5 million-plus Wainscott South contract was signed between September 1 and October 9.** Two are in contract from earlier: a Wainscott Main Street listing at $7.995 million (August) and 75 and 89 Wainscott Main Street at $5.995 million.

## Top Wainscott South Sales Since 2023

| Address | Price | Closed | Setting |
|---|---|---|---|
| 115 Beach Lane | $59,000,000 | Mar 2026 | Oceanfront |
| 111 Beach Lane | $27,500,000 | Apr 2025 | Oceanfront |
| 4 Georgica Association Road | $15,200,000 | Feb 2025 | Inland |
| 15 Wainscott Stone Road | $15,000,000 | Jun 2026 | Inland |
| 73 Wainscott Stone Road | $12,150,000 | Sep 2025 | Inland |
| 28 Wainscott Hollow Road | $11,995,000 | Nov 2025 | Inland |
| 57 Wainscott Hollow Road | $11,300,000 | Nov 2025 | Land, recorded deed |
| 70 Westwood Road | $9,500,000 | May 2026 | Inland, recorded deed |
| 183 Sayres Path | $9,350,000 | Aug 2024 | Inland |
| 176 Sayres Path | $9,095,000 | Mar 2026 | Inland |

*MLS sold data, October 11, 2026, plus recorded deeds. 57 Wainscott Hollow Road and 70 Westwood Road are recorded deeds. 176 Sayres Path is in the MLS search.*

## For Buyers and Sellers

- **Buyers** have time through most of this market. Eight listings between $5 million and $10 million sit against about 3.5 sales a year. Inland, the closed record ends just above $15 million.
- **Sellers** inland do best priced to the $8 million to $12 million sales that make up the middle of the record. On the ocean, Beach Lane has cleared $59 million once, and $27.5 million once, in this window.

## How These Figures Were Measured

- **Area.** Closed sales of $5 million and above with a Wainscott MLS city, south of Montauk Highway, from February 2023 through June 18, 2026, the latest south closing in the October 11 search. Packages count as one sale. Sayres Path stays in Wainscott when that is the MLS city, even if the same row appears in an East Hampton search.
- **What is included.** Homes, and one vacant land sale at 57 Wainscott Hollow Road. Commercial property is excluded. Oceanfront in this search is 115 Beach Lane and 111 Beach Lane only.
- **Sources.** MLS sold data from the October 11, 2026 search, plus 57 Wainscott Hollow Road and 70 Westwood Road. ${measured}
- **Listings and contracts.** MLS listing data on October 10, 2026, for listings, and through October 9, 2026, for contracts.
- **Limits.** The search did not show a later south closing after June 18, or a north-of-highway sale at this price. A closing not yet in MLS or the deed record can still arrive.

## FAQ

### What is the median price of a luxury home in Wainscott?

Across 20 sales at $5 million and above south of the highway from February 2023 through June 18, 2026, the median was $9.05 million. Inland only, it was $8.75 million across 18 sales.

### What is the most expensive home sold in Wainscott recently?

115 Beach Lane closed at $59 million in March 2026, the top Wainscott sale in this window.

### How many luxury homes are for sale in Wainscott this fall?

As of October 10, 2026, there were 14 listings at $5 million and above south of the highway, asking a combined $208.4 million, at a median ask of $7.95 million.

### Is Wainscott a buyer's or seller's market?

At $5 million and above it leans to buyers. The $5 million to $10 million band has about 2.3 years of supply, and the $20 million to $50 million band has four listings against one sale since 2023.

### Who is Barry McGovern?

Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020. More at [hamptonshomes.ai/about](https://hamptonshomes.ai/about).

## Thinking About Wainscott?

Whether you are weighing a sale or looking for a house that may never reach the open market, I am glad to walk through what the record says about your street.

## Related

- [Wainscott town page](/wainscott)
- [East Hampton Luxury Market Overview 2026](/blog/east-hampton-luxury-market-overview-2026-10)
- [Sagaponack Luxury Market Overview 2026](/blog/sagaponack-luxury-market-overview-2026-10)
- [The Hamptons Fall 2026 Pipeline](/blog/hamptons-fall-2026-contracts-inventory)
- [Recent Hedgerow Exclusive Sales](/hedgerow-sales)

*Images courtesy of Hedgerow Exclusive Properties.*
`,
  },
];
