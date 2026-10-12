import type { BlogChartRow, BlogPost } from "./blog";

function years(
  caption: string,
  rows: { label: string; value: number; display: string; detail: string; highlight?: boolean }[]
) {
  return {
    title: "Median sale price by year",
    kind: "trend" as const,
    caption,
    rows,
  };
}

function supply(caption: string, rows: BlogChartRow[]) {
  return {
    title: "Active listings by price band",
    kind: "columns" as const,
    caption,
    rows,
  };
}

function soldBands(caption: string, rows: { label: string; sales: number; highlight?: boolean }[]) {
  return {
    title: "Sales by price band",
    kind: "columns" as const,
    caption,
    rows: rows.map((row) => ({
      label: row.label,
      value: row.sales,
      display: String(row.sales),
      detail: row.sales === 1 ? "1 sale" : `${row.sales} sales`,
      highlight: row.highlight,
      prefix: "" as const,
    })),
  };
}

function band(label: string, listings: number, pace: string, highlight = false): BlogChartRow {
  return { label, value: listings, display: String(listings), detail: pace, highlight, prefix: "" };
}

export const villageReportPosts: BlogPost[] = [
  // TODO: Refresh East Hampton south-of-highway 2026 solds past July 28, 2026
  // once Ely sends the EastEndLI sold TSV. Do not invent closings.
  {
    slug: "east-hampton-luxury-market-overview-2026-10",
    title: "East Hampton Luxury Real Estate Market Overview 2026",
    excerpt:
      "One hundred sales at $5 million and above south of Montauk Highway since January 2023, a median of $11.05 million, led by 408 Further Lane at $115 million, off-market. The 2026 south record stops on July 28.",
    date: "2026-10-11",
    dateModified: "2026-10-12",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/hedgerow/sold-43-east-dune-lane-east-hampton-2026.webp",
    authorBox: true,
    hideCta: true,
    about: ["East Hampton"],
    keywords:
      "East Hampton real estate, East Hampton luxury homes, East Hampton market 2026, Further Lane, Lily Pond Lane, East Hampton oceanfront",
    metaDescription:
      "East Hampton south of the highway: 100 sales at $5 million and above since 2023, an $11.05 million median, led off-market at $115 million.",
    charts: {
      "median-by-year": years("East Hampton south of Montauk Highway, sales at $5 million and above. The 2026 bar stops on July 28.", [
        { label: "2023", value: 15.0, display: "$15.00M", detail: "21 sales" },
        { label: "2024", value: 10.5, display: "$10.50M", detail: "31 sales" },
        { label: "2025", value: 14.0, display: "$14.00M", detail: "30 sales" },
        { label: "2026", value: 9.5, display: "$9.50M", detail: "18 sales", highlight: true },
      ]),
      "supply-by-band": supply(
        "Active listings on October 10, 2026. Sales per year cover January 2023 through July 28, 2026, about 3.75 years. The highlighted band is the shortest supply.",
        [
          band("$5M to $10M", 8, "about 10.5 sales a year", true),
          band("$10M to $20M", 9, "about 8 sales a year"),
          band("$20M to $50M", 4, "about 5.6 sales a year"),
          band("$50M and above", 2, "about 2.4 sales a year"),
        ]
      ),
      "sales-by-band": soldBands(
        "East Hampton south of Montauk Highway, sales at $5 million and above, January 2023 through July 28, 2026. The highlighted band is where most of the sales landed.",
        [
          { label: "$5M to $10M", sales: 40, highlight: true },
          { label: "$10M to $20M", sales: 30 },
          { label: "$20M to $50M", sales: 21 },
          { label: "$50M and above", sales: 9 },
        ]
      ),
    },
    content: `
## Key Takeaways

- Since January 2023, East Hampton south of the highway has recorded **100 sales at $5 million and above**, totaling **$1.96 billion**, at a **median of $11.05 million**. Seven of those sales were off-market.
- **2025 was the peak year for volume.** Thirty sales carried about a $14.0 million median and $711.7 million. The south record for 2026 still stops on July 28: 18 sales, at a $9.50 million median.
- **The largest single parcel is off-market.** 408 Further Lane, on the East Hampton and Amagansett line, closed at **$115 million** on July 31, 2025. It is the largest single residential parcel in this record. The Cobb compound, at $121.5 million, is larger.
- **The top MLS sale is 43 East Dune Lane** at $72 million in March 2026, where Hedgerow represented the seller. With the off-market oceanfront trades included, thirteen oceanfront sales total $730.7 million, at a $51 million median.
- **The top end is closer to balance here than elsewhere.** Six listings ask $20 million or more, against about eight sales a year at that level.

## East Hampton at a Glance

| East Hampton South, $5M and above | |
|---|---|
| Sales, Jan 2023 to Jul 28, 2026 | 100 |
| Median sale price | $11.05 million |
| Largest single parcel | $115 million, 408 Further Lane, off-market (Jul 31, 2025) |
| Top MLS sale | $72 million, 43 East Dune Lane (Mar 2026) |
| Sales in 2026, south of the highway | 18 |
| Latest south closing | July 28, 2026 |
| Active listings, Oct 10, 2026 | 23 |
| Median asking price | $12.5 million |
| Contracts signed since Sep 1 | 6 |

South of Montauk Highway, East Hampton runs from the village to the ocean: Lily Pond Lane, Further Lane, Georgica, Dunemere, Hither and Jericho, and the dune lanes. This report covers that market only, at $5 million and above. Springs, Northwest, and the roads north of the highway are the comparison, not the count.

## The Price Trend

{{chart:median-by-year}}

| Year | Sales | Median | Total |
|---|---|---|---|
| 2023 | 21 | $15.00M | $513.4M |
| 2024 | 31 | $10.50M | $425.5M |
| 2025 | 30 | $14.00M | $711.7M |
| 2026 (through Jul 28) | 18 | $9.50M | $304.7M |

East Hampton South held a median at or above $10.5 million from 2023 through 2025. 2023 has the highest median, at $15.0 million, after off-market trades at 26 and 32 Windmill Lane, 442 Further Lane, 298 Further Lane, and 31 Two Mile Hollow Road. 2025 has the most dollars. Three houses closed at $50 million or more: 408 Further Lane at $115 million, 370 and 372 Further Lane at $70 million, and 105 and 111 Lily Pond Lane at $66.75 million. 294 Further Lane closed at $48.5 million, just under that line. 2026 includes the top MLS sale, 43 East Dune Lane at $72 million on March 6, pictured above. No south-of-highway closing at $5 million and above has been recorded since July 28. Summer contracts such as 107 Georgica Road and 24 The Crossways have yet to close.

Closings after July 28 that carry an East Hampton address are north of the highway, in Springs, Northwest, and along Two Holes of Water Road and Old Stone Highway. They belong with that northern market.

## Inland, Waterfront and Ocean

| Setting | Sales $5M+ | Median | Top sale | Total |
|---|---|---|---|---|
| Inland, south of the highway | 82 | $10.00M | $52.0M | $1,041.2M |
| Off-market, ocean frontage not confirmed | 4 | n/a | $48.5M | $147.1M |
| Waterfront (pond) | 1 | $36.25M | $36.25M | $36.25M |
| Oceanfront | 13 | $51.00M | $115.0M | $730.7M |
| **East Hampton South** | **100** | **$11.05M** | **$115.0M** | **$1,955.3M** |
| *North of the highway, including Springs and Northwest* | *56* | *$5.95M* | *$18.4M* | *$378.9M* |

Oceanfront is about five times the inland median. The gap is the off-market dune and Further Lane trades, not a change in the inland houses. The top inland house is 121 Further Lane at $52 million. Separately, 41 and 47 Cove Hollow Farm Road sold for $55 million in December 2025, land bought by the Peconic Land Trust. That sale is in the inland count. It is not in the top-sales ranking. Hedgerow represented the seller at 11 Amy's Lane ($11.2 million, February 2024) and at 86 Skimhampton Road ($8.85 million, April 2025).

{{figure:/images/hedgerow/sold-33-lily-pond-lane-east-hampton-2025.webp|33 Lily Pond Lane, East Hampton, sold for $31.5 million in September 2025. Hedgerow represented the seller.}}

North of the highway is a different market: 56 sales, a $5.95 million median, topped at $18.4 million.

## The Largest Trades

Off-market sales are in the 100. They rank by price. None of them has an EastEndLI listing, and none carries a Hedgerow credit.

| Address | Price | Closed | Record |
|---|---|---|---|
| 408 Further Lane | $115,000,000 | Jul 31, 2025 | Off-market, oceanfront |
| 26 and 32 Windmill Lane | $91,500,000 | Jan 11, 2023 | Off-market, oceanfront. One trade, two deeds. |
| 43 East Dune Lane | $72,000,000 | Mar 6, 2026 | MLS. Hedgerow represented the seller. |
| 370 and 372 Further Lane | $70,000,000 | Feb 2025 | MLS, oceanfront |
| 105 and 111 Lily Pond Lane | $66,750,000 | Aug 2025 | MLS, oceanfront |
| 90 and 100 Lily Pond Lane | $52,000,000 | Jul 2024 | MLS, oceanfront |
| 121 Further Lane | $52,000,000 | Aug 2023 | MLS, inland |
| 442 Further Lane | $51,000,000 | May 30, 2023 | Off-market, oceanfront |
| 294 Further Lane | $48,500,000 | May 6, 2025 | Off-market |
| 201 Lily Pond Lane | $45,000,000 | Nov 2023 | MLS, oceanfront |
| 9 West Dune Lane | $45,000,000 | May 2026 | Recorded deed, oceanfront |
| 298 Further Lane | $40,000,000 | Dec 11, 2023 | Off-market |
| 185 Further Lane | $38,000,000 | Sep 2024 | MLS, oceanfront |
| 24 and 36 Jeffreys Lane | $36,250,000 | Nov 2025 | MLS, Georgica Pond |
| 21 Spaeth Lane | $29,600,000 | Apr 5, 2024 | Off-market |
| 31 Two Mile Hollow Road | $29,000,000 | Mar 17, 2023 | Off-market |

26 and 32 Windmill Lane is $77,775,000 and $13,725,000 on the two deeds.

{{figure:/images/hedgerow/sold-24-36-jeffreys-lane-east-hampton-2025.webp|24 and 36 Jeffreys Lane, on Georgica Pond, sold for $36.25 million in November 2025. Hedgerow represented the seller.}}

## Fall 2026: Inventory Versus Contracts

{{chart:supply-by-band}}

{{chart:sales-by-band}}

| Price band | Active listings, Oct 10 | Sales since 2023 | Sales per year | Supply |
|---|---|---|---|---|
| $5M to $10M | 8 | 40 | about 10.5 | about 9 months |
| $10M to $20M | 9 | 30 | about 8 | about 14 months |
| $20M to $50M | 4 | 21 | about 5.6 | about 9 months |
| $50M and above | 2 | 9 | about 2.4 | about 10 months |
| **Total** | **23** | **100** | **about 27** | |

Supply is about a year in every band. Two listings, 75 and 69 West End Road at $165 million and 100 and 90 Briar Patch Road at $85 million, are about 45 percent of the $549.5 million shelf. Six contracts signed between September 1 and October 9, from 28 Pudding Hill Lane at $6.995 million to 5 Spaeth Lane at $19.9 million. With 107 Georgica Road and 24 The Crossways, eight south properties at $5 million and above are in contract.

## For Buyers and Sellers

Below $10 million the shelf is short. Above $20 million, two listings hold almost half the asking dollars, which is where negotiation lives. A seller pricing oceanfront is pricing a $51 million median. A seller inland is pricing about $10 million.

## How These Figures Were Measured

Closed sales of $5 million and above in East Hampton Village and East Hampton south of Montauk Highway, January 4, 2023 through October 11, 2026. The latest south closing is July 28. The 100 includes homes, four vacant land sales on the public record, and seven off-market trades. Cove Hollow Farm is land, not a house ranking. Packages count once. Where an MLS price and a deed price differ, the MLS price is used. 90 South Briar Patch Road and 96 Further Lane are not included. Active listings are as of October 10, 2026.

## FAQ

### What is the median price of a luxury home in East Hampton?

Across 100 sales at $5 million and above south of the highway from January 2023 through July 28, 2026, the median was $11.05 million. In 2026 it is $9.50 million across 18 sales.

### What is the most expensive home sold in East Hampton recently?

408 Further Lane closed at $115 million on July 31, 2025, off-market. It is the largest single residential parcel here. The Cobb compound, at $121.5 million, is larger. The top MLS sale is 43 East Dune Lane at $72 million. Hedgerow represented the seller.

### How many luxury homes are for sale in East Hampton this fall?

Twenty-three listings south of the highway on October 10, 2026, asking $549.5 million at a median of about $12.5 million.

### Is East Hampton a buyer's or seller's market?

Close to balanced. Supply is about 9 to 14 months in each band, slightly tighter below $10 million.

### Who is Barry McGovern?

Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020. More at [hamptonshomes.ai/about](https://hamptonshomes.ai/about).

## Thinking About East Hampton?

Whether you are weighing a sale or looking for a house that may never reach the open market, I am glad to walk through what the record says about your street.

## Related

- [East Hampton town page](/east-hampton)
- [Lily Pond Lane and Further Lane, 2026](/blog/east-hampton-lily-pond-further-lane-2026)
- [Wainscott Luxury Market Snapshot 2026](/blog/wainscott-luxury-market-snapshot-2026-10)
- [Sagaponack Luxury Market Overview 2026](/blog/sagaponack-luxury-market-overview-2026-10)
- [The Hamptons Fall 2026 Pipeline](/blog/hamptons-fall-2026-contracts-inventory)
- [Recent Hedgerow Exclusive Sales](/hedgerow-sales)

*Images courtesy of Hedgerow Exclusive Properties.*
`,
  },
  {
    slug: "southampton-luxury-market-overview-2026-10",
    title: "Southampton Luxury Real Estate Market Overview 2026",
    excerpt:
      "One hundred thirty-three sales at $5 million and above south of the highway since January 2023, a median of $8.84 million, and a 2026 median of $13.75 million across 27 sales, led by Mylestone at 700 Meadow Lane.",
    date: "2026-10-11",
    dateModified: "2026-10-12",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/hedgerow/sold-109-duck-pond-lane-southampton-2026.webp",
    authorBox: true,
    hideCta: true,
    about: ["Southampton"],
    keywords:
      "Southampton real estate, Southampton Village luxury homes, Southampton market 2026, Meadow Lane, Gin Lane, Southampton oceanfront",
    metaDescription:
      "Southampton south of the highway: 133 sales at $5 million and above since 2023, an $8.84 million median, and a 2026 median of $13.75 million.",
    charts: {
      "median-by-year": years("Southampton south of Montauk Highway and County Road 39, sales at $5 million and above.", [
        { label: "2023", value: 7.73, display: "$7.73M", detail: "28 sales" },
        { label: "2024", value: 7.49, display: "$7.49M", detail: "29 sales" },
        { label: "2025", value: 7.6, display: "$7.60M", detail: "49 sales" },
        { label: "2026", value: 13.75, display: "$13.75M", detail: "27 sales", highlight: true },
      ]),
      "supply-by-band": supply(
        "Active listings on October 10, 2026. Sales per year cover January 2023 through October 9, 2026, about 3.75 years. The highlighted band is the shortest supply.",
        [
          band("$5M to $10M", 17, "about 20 sales a year", true),
          band("$10M to $20M", 11, "about 10 sales a year"),
          band("$20M to $50M", 12, "about 5 sales a year"),
          band("$50M and above", 1, "about 0.8 sales a year"),
        ]
      ),
      "sales-by-band": soldBands(
        "Southampton south of Montauk Highway and County Road 39, sales at $5 million and above, January 2023 through October 2026. The highlighted band is where most of the sales landed.",
        [
          { label: "$5M to $10M", sales: 74, highlight: true },
          { label: "$10M to $20M", sales: 37 },
          { label: "$20M to $50M", sales: 19 },
          { label: "$50M and above", sales: 3 },
        ]
      ),
    },
    content: `
## Key Takeaways

- Since January 2023, Southampton south of the highway has recorded **133 sales at $5 million and above**, totaling **$1.80 billion**, at a **median of $8.84 million**.
- **2026 has moved up a level.** Twenty-seven sales so far carry a **$13.75 million median**, against roughly $7.5 million in each of the prior three years.
- **The ocean sets the ceiling.** Ten oceanfront sales posted a $37.4 million median, led by Mylestone at 700 Meadow Lane at $112.5 million and La Dune at 366 and 376 Gin Lane at $88.48 million.
- **The shelf is priced ahead of much of the record.** As of October 10, 41 listings ask a combined $791.5 million, and 13 of them ask $20 million or more.

## Southampton at a Glance

| Southampton South, $5M and above | |
|---|---|
| Sales, Jan 2023 to Oct 9, 2026 | 133 |
| Median sale price | $8.84 million |
| Top sale | $112.5 million, 700 Meadow Lane (2023) |
| Sales in 2026 so far | 27 |
| Active listings, Oct 10, 2026 | 41 |
| Median asking price | $12.0 million |
| Contracts signed since Sep 1 | 6 |

This report covers Southampton Village and Southampton south of Montauk Highway and County Road 39: Meadow Lane, Gin Lane, First Neck and Halsey Neck, Ox Pasture, Wickapogue, Murray Lane, and the village streets in between. Sales the MLS city field places in Water Mill are in the Water Mill report.

## The Price Trend

{{chart:median-by-year}}

| Year | Sales | Median | Total |
|---|---|---|---|
| 2023 | 28 | $7.73M | $410.2M |
| 2024 | 29 | $7.49M | $414.3M |
| 2025 | 49 | $7.60M | $558.3M |
| 2026 (to Oct 9) | 27 | $13.75M | $420.0M |

Volume nearly doubled in 2025, with 49 sales, while the median held near $7.6 million. In 2026 the mix changed rather than the count: 18 of the 27 sales so far closed above $10 million, including 137 Murray Lane at $41.65 million on October 9, 400 First Neck Lane at $29.5 million, and 346 Meadow Lane at $28 million. Late-year closings will add to 2026.

## Inland, Waterfront and Ocean

| Setting | Sales $5M+ | Median | Top sale | Total |
|---|---|---|---|---|
| Inland, south of the highway | 121 | $8.00M | $41.65M | $1,261.7M |
| Waterfront (bay and pond) | 2 | $25.61M | $28.1M | $51.2M |
| Oceanfront | 10 | $37.40M | $112.5M | $490.0M |
| **Southampton South** | **133** | **$8.84M** | **$112.5M** | **$1,802.9M** |
| *North of the highway* | *33* | *$6.06M* | *$17.8M* | *$243.4M* |

**Inland** is the volume market, from village houses near Main Street to estate lots on First Neck, Halsey Neck, and Ox Pasture. The top of that range is 137 Murray Lane at $41.65 million (October 2026), 400 First Neck Lane at $29.5 million (January 2026), and 623 Halsey Neck Lane at $29 million (May 2025). 400 First Neck Lane was entered in MLS without a street address, and it is an MLS sale. Hedgerow represented the seller at 109 Duck Pond Lane at $20 million (January 2026), pictured above, and represented both sides at 234 Wickapogue Road at $12.5 million (October 2023).

{{figure:/images/hedgerow/sold-234-wickapogue-road-southampton-2023.webp|234 Wickapogue Road, Southampton, sold for $12.5 million in October 2023. Hedgerow represented both sides.}}

**Oceanfront** on Meadow Lane, Gin Lane, and Murray Lane trades at nearly five times the inland median: 700 Meadow Lane at $112.5 million (2023), 366 and 376 Gin Lane at $88.48 million (2024), 1010 Meadow Lane at $55.75 million (2025, recorded deed), 1560 Meadow Lane at $47.5 million (2024), and 1320 Meadow Lane at $40 million (2025). Ten sales, a $37.4 million median, $490 million in all.

**Waterfront** on the bay and ponds is thin here, with two sales, led by 1 Boatmans Lane at $28.125 million (2023).

North of the highway, the same Southampton search shows 33 sales, a $6.06 million median, and $243.4 million in total, topped by 320 Majors Path at $17.8 million.

## Fall 2026: Inventory Versus Contracts

{{chart:supply-by-band}}

{{chart:sales-by-band}}

| Price band | Active listings, Oct 10 | Sales, Jan 2023 to Oct 2026 | Sales per year | Supply at that pace |
|---|---|---|---|---|
| $5M to $10M | 17 | 74 | about 20 | about 10 months |
| $10M to $20M | 11 | 37 | about 10 | about 13 months |
| $20M to $50M | 12 | 19 | about 5 | about 2.4 years |
| $50M and above | 1 | 3 | about 0.8 | about 15 months |
| **Total** | **41** | **133** | **about 35** | |

- **Below $10 million, inventory is under a year of sales.** That band has done most of the volume since 2023.
- **Above $20 million, the shelf is deep.** Thirteen listings ask a combined $514.4 million, about 65 percent of all asking dollars, led by 95 Down East Lane at $124 million.
- **Fall contracts are coming from several bands.** Six deals signed between September 1 and October 9: 134 Wyandanch Lane ($24.995 million last ask), 8 Squabble Lane ($24.95 million), 483 First Neck Lane ($19.95 million), 522 Wickapogue Road ($14.695 million), 100 Narrow Lane ($6.995 million) and 48 Captains Neck Lane ($6.995 million). Twelve Southampton South properties at $5 million and above are in contract in all, including 160 Wyandanch Lane at $38 million.

## Top Southampton South Sales Since 2023

| Address | Price | Closed | Setting |
|---|---|---|---|
| 700 Meadow Lane (Mylestone) | $112,500,000 | Nov 2023 | Oceanfront |
| 366 and 376 Gin Lane | $88,480,000 | Mar 2024 | Oceanfront |
| 1010 Meadow Lane | $55,750,000 | Aug 2025 | Oceanfront, recorded deed |
| 1560 Meadow Lane | $47,500,000 | Mar 2024 | Oceanfront |
| 137 Murray Lane | $41,650,000 | Oct 2026 | Inland |
| 1320 Meadow Lane | $40,000,000 | Jan 2025 | Oceanfront |
| 140 Murray Lane | $34,800,000 | Jul 2023 | Oceanfront |
| 1730 Meadow Lane | $32,000,000 | Jun 2025 | Oceanfront |
| 400 First Neck Lane | $29,500,000 | Jan 2026 | Inland |
| 623 Halsey Neck Lane | $29,000,000 | May 2025 | Inland |

*MLS sold data, October 11, 2026, plus recorded deeds. 1010 Meadow Lane is a recorded deed. 400 First Neck Lane was reported in MLS without a street address. 366 and 376 Gin Lane closed at the MLS price of $88.48 million.*

{{figure:/images/hedgerow/sold-144-corrigan-street-southampton-2025.webp|144 Corrigan Street, Southampton, sold for $7.24 million in November 2025. Hedgerow represented both sides.}}

Five closings are in the recorded deeds and not in the MLS search: 1010 Meadow Lane at $55.75 million (August 2025), 153 Pond Lane at $16 million (July 2025), 262 Pond Lane at $14.5 million (March 2026), 242 South Main Street at $12 million (May 2025), and 120 Downs Path at $8.4 million (January 2026). Three First Neck Lane sales are also outside that search and are in the 133: 484 First Neck Lane at $27.5 million (April 23, 2024, off-market), 383 First Neck Lane at $20.75 million (February 2024, off-market), and 496 First Neck Lane at $10.9 million (August 28, 2024, recorded deed). They sit below the top ten. 400 First Neck Lane at $29.5 million is an MLS sale.

## For Buyers and Sellers

Under $10 million, good houses move within a season. Between $20 million and $50 million, twelve listings sit against about five sales a year. Above $30 million away from Meadow Lane and Gin Lane, the only print since 2023 is 137 Murray Lane. The 2026 median, $13.75 million across 27 sales, is the pricing reference for the middle of the market.

## How These Figures Were Measured

- **Area.** Closed sales of $5 million and above in Southampton Village and Southampton south of Montauk Highway and County Road 39, from January 17, 2023 through October 9, 2026. Sales on the Water Mill side of the line are counted in the Water Mill report. Packages count as one sale, and listings sold under more than one MLS number are counted once.
- **What is included.** Homes and four vacant land sales. Commercial property and sales to government or land trusts are excluded. A sale with no reported price is excluded.
- **Oceanfront.** Meadow Lane, including Mylestone, Gin Lane, and oceanfront Murray Lane. 137 Murray Lane is inland. Waterfront on the bay and ponds is two sales, led by 1 Boatmans Lane.
- **North comparison.** Thirty-three sales from the same Southampton search north of the highway: median $6.06 million, total $243.4 million, top sale 320 Majors Path at $17.8 million.
- **Sources.** MLS listing data, checked against a full MLS sold search on October 11, 2026, plus the recorded deeds and off-market First Neck Lane trades named above. Where an MLS price and a deed price differ, the MLS price is used. 366 and 376 Gin Lane is the MLS sold price.
- **Listings and contracts.** Active listings reflect MLS listing data on October 10, 2026. A property offered both alone and as a package is counted once. 95 Down East Lane is counted once. Contracts reflect MLS listing data through October 9, 2026.
- **Limits.** These figures do not include trades that never appear in public MLS or deed records. MLS sales are checked through October 11, 2026. Recorded deeds are complete through late July 2026.

## FAQ

### What is the median price of a luxury home in Southampton?

Across 133 sales at $5 million and above south of the highway from January 2023 through October 9, 2026, the median was $8.84 million. In 2026 so far, it is $13.75 million across 27 sales.

### What is the most expensive home sold in Southampton recently?

Mylestone, at 700 Meadow Lane, closed at $112.5 million in 2023, the top Southampton sale in this window, followed by 366 and 376 Gin Lane at $88.48 million in 2024. In 2026, the top sale so far is 137 Murray Lane at $41.65 million.

### How many luxury homes are for sale in Southampton this fall?

As of October 10, 2026, there were 41 listings at $5 million and above south of the highway, asking a combined $791.5 million at a median of about $12 million.

### Is Southampton a buyer's or seller's market?

It depends on price. Below $20 million, inventory runs about 10 to 14 months of sales, which is balanced to slightly favoring sellers. Between $20 million and $50 million, there is close to three years of supply at the recent pace, which gives buyers leverage.

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
      "Sixty-five sales at $5 million and above south of the highway since January 2023, a median of $10.2 million and $880.4 million in all, with 2025 still the oceanfront year.",
    date: "2026-10-11",
    dateModified: "2026-10-12",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/hedgerow/sold-125-mid-ocean-drive-bridgehampton-2025.webp",
    authorBox: true,
    hideCta: true,
    about: ["Bridgehampton"],
    keywords:
      "Bridgehampton real estate, Bridgehampton luxury homes, Bridgehampton market 2026, Surfside Drive, Bridgehampton oceanfront, Ocean Road",
    metaDescription:
      "Bridgehampton south of the highway: 65 sales at $5 million and above since 2023, a $10.2 million median, and $880.4 million in closed volume.",
    charts: {
      "median-by-year": years("Bridgehampton south of Montauk Highway, sales at $5 million and above.", [
        { label: "2023", value: 10.6, display: "$10.60M", detail: "14 sales" },
        { label: "2024", value: 8.89, display: "$8.89M", detail: "18 sales" },
        { label: "2025", value: 14.25, display: "$14.25M", detail: "20 sales" },
        { label: "2026", value: 9.85, display: "$9.85M", detail: "13 sales", highlight: true },
      ]),
      "supply-by-band": supply(
        "Active listings on October 10, 2026. Sales per year cover January 2023 through September 25, 2026, about 3.75 years. The highlighted band is the shortest supply.",
        [
          band("$5M to $10M", 2, "about 8 sales a year", true),
          band("$10M to $20M", 10, "about 6.4 sales a year"),
          band("$20M to $50M", 7, "about 2.1 sales a year"),
          band("$50M and above", 2, "about 0.5 sales a year"),
        ]
      ),
      "sales-by-band": soldBands(
        "Bridgehampton south of Montauk Highway, sales at $5 million and above, January 2023 through September 2026. The highlighted band is where most of the sales landed.",
        [
          { label: "$5M to $10M", sales: 31, highlight: true },
          { label: "$10M to $20M", sales: 24 },
          { label: "$20M to $50M", sales: 8 },
          { label: "$50M and above", sales: 2 },
        ]
      ),
    },
    content: `
## Key Takeaways

- Since January 2023, Bridgehampton south of the highway has recorded **65 sales at $5 million and above**, totaling **$880.4 million**, at a **median of $10.2 million**.
- **2025 was the standout year.** Twenty sales carried a **$14.25 million median** and $352.2 million. The top sale is still 165 Surfside Drive at $58 million.
- **Oceanfront is a separate market.** Eight sales, a $30.75 million median, against $8.60 million inland. 35 Dune Road, at $33.48 million, is off-market and ranks third.
- **The shelf sits high.** As of October 10, 21 listings ask a combined $477.6 million at a $17.5 million median. Only two ask under $10 million.

## Bridgehampton at a Glance

| Bridgehampton South, $5M and above | |
|---|---|
| Sales, Jan 2023 to Sep 25, 2026 | 65 |
| Median sale price | $10.2 million |
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
| 2023 | 14 | $10.60M | $200.5M |
| 2024 | 18 | $8.89M | $194.4M |
| 2025 | 20 | $14.25M | $352.2M |
| 2026 (to Sep 25) | 13 | $9.85M | $133.3M |

2025 nearly doubled 2024's dollar volume, driven by the oceanfront: four Surfside Drive and Mid Ocean Drive sales closed between $28 million and $58 million. 2026 has been quieter at the top, led by 104 Quimby Lane at $22.15 million, where Hedgerow represented the seller. September was busy: 1076 Ocean Road at $10.3 million, where Hedgerow represented the seller, 53 Matthews Lane at $15.25 million, 95 Jobs Lane at $8.6 million, and 523 Pauls Lane at $5.85 million all closed. The latest sale in the search is September 25.

## Inland, Waterfront and Ocean

| Setting | Sales $5M+ | Median | Top sale | Total |
|---|---|---|---|---|
| Inland, south of the highway | 55 | $8.60M | $30.0M | $578.3M |
| Waterfront (bay and pond) | 2 | $12.83M | $13.45M | $25.7M |
| Oceanfront | 8 | $30.75M | $58.0M | $276.5M |
| **Bridgehampton South** | **65** | **$10.2M** | **$58.0M** | **$880.4M** |
| *North of the highway* | *41* | *$8.45M* | *$48.0M* | *$402.4M* |

**Inland** carries the count, from village lanes to estate parcels on Ocean Road and Highland Terrace. The top inland sales are 1240 Ocean Road at $30 million (2023), 72 Highland Terrace at $24.3 million (July 2023), and 104 Quimby Lane at $22.15 million (April 2026). 1240 Ocean Road closed in 2023. The month is not confirmed.

{{figure:/images/hedgerow/sold-104-quimby-lane-bridgehampton-2026.webp|104 Quimby Lane, Bridgehampton, sold for $22.15 million in April 2026. Hedgerow represented the seller.}}

**Oceanfront** is where the records are set: eight sales, a $30.75 million median, $276.5 million. 165 Surfside Drive at $58 million, where Hedgerow advised the buyer, and 125 Mid Ocean Drive at $57 million, an MLS sale without a street address. A Hedgerow transaction. 35 Dune Road sold off-market for $33.48 million on January 5, 2023. A Hedgerow transaction. 125 Mid Ocean Drive is pictured above.

**Waterfront** on Mecox Bay and the ponds is two sales since 2023, topping out at $13.45 million.

North of the highway, the same Bridgehampton search shows 41 sales, an $8.45 million median, and $402.4 million, topped at $48 million. Sales the MLS city field places in Water Mill, including Pointe Mecox, stay in the Water Mill report.

## Fall 2026: Inventory Versus Contracts

{{chart:supply-by-band}}

{{chart:sales-by-band}}

| Price band | Active listings, Oct 10 | Sales, Jan 2023 to Sep 2026 | Sales per year | Supply at that pace |
|---|---|---|---|---|
| $5M to $10M | 2 | 31 | about 8 | about 3 months |
| $10M to $20M | 10 | 24 | about 6.4 | about 19 months |
| $20M to $50M | 7 | 8 | about 2.1 | about 3.3 years |
| $50M and above | 2 | 2 | about 0.5 | about 3.8 years |
| **Total** | **21** | **65** | **about 17** | |

- **Under $10 million, there is almost nothing for sale.** Two listings sit against about eight sales a year.
- **Above $20 million, buyers have time.** Nine listings, led by 125 Dune Road at $69 million and 795 Ocean Road at $58 million, ask $321.4 million, about two-thirds of all asking dollars.
- **Fall contracts.** Three deals signed between September 1 and October 9: 672 Halsey Lane ($24.995 million last ask), 109 Lockwood Avenue ($12.95 million) and 63 Newlight Lane ($11.995 million). Nine Bridgehampton South properties at $5 million and above are in contract in all, including 351 Jobs Lane at $9.65 million, where Hedgerow represented the seller.

## Top Bridgehampton South Sales Since 2023

| Address | Price | Closed | Setting |
|---|---|---|---|
| 165 Surfside Drive | $58,000,000 | Nov 2025 | Oceanfront |
| 125 Mid Ocean Drive | $57,000,000 | Oct 2025 | Oceanfront |
| 35 Dune Road | $33,480,000 | Jan 5, 2023 | Oceanfront, off-market |
| 67 Surfside Drive | $32,000,000 | Apr 2025 | Oceanfront |
| 1240 Ocean Road | $30,000,000 | 2023 | Inland |
| 55 Surfside Drive | $29,500,000 | May 2024 | Oceanfront |
| 79 Surfside Drive | $28,000,000 | Nov 2025 | Oceanfront |
| 72 Highland Terrace | $24,300,000 | Jul 2023 | Inland |
| 104 Quimby Lane | $22,150,000 | Apr 2026 | Inland |
| 220 Dune Road | $21,000,000 | Feb 2024 | Oceanfront |
| 474 Jobs Lane | $18,200,000 | Sep 2025 | Inland |

*35 Dune Road sold off-market on January 5, 2023, recorded deed, and is in the 65. A Hedgerow transaction. 125 Mid Ocean Drive was reported in MLS without a street address. A Hedgerow transaction. 1240 Ocean Road closed in 2023. The month is not confirmed.*

## Hedgerow in Bridgehampton

Hedgerow had a role in 14 of these 65 sales, $315.2 million, more than a third of the dollar volume. On the ocean, Hedgerow advised the buyer at 165 Surfside Drive. 125 Mid Ocean Drive: A Hedgerow transaction. 35 Dune Road: A Hedgerow transaction. Hedgerow represented both sides at 67 Surfside Drive and 79 Surfside Drive. Inland, Hedgerow represented the seller at 104 Quimby Lane, 70 Matthews Lane ($17.25 million, 2025), 1076 Ocean Road ($10.3 million, September 2026), 81 Ocean Road, 25 Jobs Lane, and 690 Ocean Road, and represented both sides at 385 Jobs Lane ($14.75 million, 2024), 191 Highland Terrace ($12.2 million, 2023, land), and 946 Ocean Road ($10.3 million, 2026).

{{figure:/images/hedgerow/sold-946-ocean-road-bridgehampton-2026.webp|946 Ocean Road, Bridgehampton, sold for $10.3 million in April 2026. Hedgerow represented both sides.}}

340 Sagaponack Road closed at $5.45 million in 2026, a recorded deed. The closing month is not confirmed. 1 Mecox Field Lane, 223 Church Lane, and 77 School Street are MLS sales.

## For Buyers and Sellers

Under $10 million there are two listings against about eight sales a year. Above $20 million the shelf holds more than three years of supply. Ten sales have cleared $20 million since 2023, most of them oceanfront or on Ocean Road and Highland Terrace. That is the pricing record. A finished house between the village and the ocean is still the most liquid product.

## How These Figures Were Measured

- **Area.** Closed sales of $5 million and above in Bridgehampton south of Montauk Highway, from January 2023 through September 25, 2026. Sales on the Water Mill side of the line, including Pointe Mecox, are counted in the Water Mill report. Packages count as one sale, and listings sold under more than one MLS number are counted once.
- **What is included.** Homes and six vacant land sales. Commercial property and sales to government or land trusts are excluded. Ocean Road is inland here. 125 Mid Ocean Drive is an MLS sale reported without a street address.
- **North comparison.** Forty-one sales from the same search north of the highway: median $8.45 million, total $402.4 million, top sale $48 million.
- **Sources.** MLS listing data, checked against a full MLS sold search on October 11, 2026, plus the recorded deed at 340 Sagaponack Road. Where an MLS price and a deed price differ, the MLS price is used.
- **Listings and contracts.** Active listings reflect MLS listing data on October 10, 2026. A property offered both alone and as a package is counted once. Contracts reflect MLS listing data through October 9, 2026.
- **Limits.** The 65-sale median includes the public record and the off-market sale at 35 Dune Road. The latest south closing is September 25, 2026.

## FAQ

### What is the median price of a luxury home in Bridgehampton?

Across 65 sales at $5 million and above south of the highway from January 2023 through September 25, 2026, the median was $10.2 million. In 2025, it was $14.25 million across 20 sales.

### What is the most expensive home sold in Bridgehampton recently?

165 Surfside Drive closed at $58 million in November 2025, the top Bridgehampton South sale since 2023. Hedgerow advised the buyer. 125 Mid Ocean Drive followed at $57 million in October 2025. A Hedgerow transaction.

### How many luxury homes are for sale in Bridgehampton this fall?

As of October 10, 2026, there were 21 listings at $5 million and above south of the highway, asking a combined $477.6 million at a median of $17.5 million.

### Is Bridgehampton a buyer's or seller's market?

Both, depending on price. Under $10 million it is a seller's market, with about three months of supply. Above $20 million, there are nearly four years of supply at the recent pace, which favors buyers.

### Who is Barry McGovern?

Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020. More at [hamptonshomes.ai/about](https://hamptonshomes.ai/about).

## Thinking About Bridgehampton?

Whether you are weighing a sale or looking for a house that may never reach the open market, I am glad to walk through what the record says about your street.

## Related

- [Bridgehampton town page](/bridgehampton)
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
    dateModified: "2026-10-12",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/hedgerow/sold-180-rose-hill-road-water-mill-2023.webp",
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
      "sales-by-band": soldBands(
        "Water Mill south of Montauk Highway, sales at $5 million and above, January 2023 through October 2026. The highlighted band is where most of the sales landed.",
        [
          { label: "$5M to $10M", sales: 41, highlight: true },
          { label: "$10M to $20M", sales: 28 },
          { label: "$20M to $50M", sales: 9 },
          { label: "$50M and above", sales: 0 },
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

**Waterfront** on Mecox Bay, Hayground Cove and the ponds roughly doubles the price. 180 Pointe Mecox Lane closed at $24 million (August 2023), 217 Rose Hill Road at $20.5 million (November 2025), and 120 Bay Lane, on Mecox Bay, at $12.625 million (May 2025). Hedgerow represented the seller at 120 Bay Lane and at 180 Rose Hill Road, pictured above.

**Oceanfront** in Water Mill almost never trades. The only oceanfront sale in this window was 1195 Flying Point Road at $14.5 million (October 2024). The village benchmarks sit just outside it:
- 90 Jule Pond Drive sold for $105 million in 2021. Hedgerow advised the seller.
- The four-parcel compound at 70 and 71 Cobb Lane on Mecox Bay traded for $121.5 million, and Hedgerow represented both sides.

## Fall 2026: Inventory Versus Contracts

{{chart:supply-by-band}}

{{chart:sales-by-band}}

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

Below $20 million the market has been absorbing houses priced to the recent record. Above $20 million, thirteen listings ask most of the dollars against nine sales since 2023, none above $27.5 million. Bay or pond frontage roughly doubles the inland median. Several 2026 sales appear only in the deed record.

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
- [Southampton Luxury Market Overview 2026](/blog/southampton-luxury-market-overview-2026-10)
- [Bridgehampton Luxury Market Overview 2026](/blog/bridgehampton-luxury-market-overview-2026-10)
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
      "Twenty-two sales at $5 million and above south of the highway since 2023, a median of $9.05 million, with three Beach Lane oceanfront sales accounting for $111 million of the $281.8 million total.",
    date: "2026-10-11",
    dateModified: "2026-10-12",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/hedgerow/sold-51-wainscott-hollow-road-wainscott-2023.webp",
    authorBox: true,
    hideCta: true,
    about: ["Wainscott"],
    keywords:
      "Wainscott real estate, Wainscott luxury homes, Wainscott market 2026, Beach Lane, Wainscott Hollow Road",
    metaDescription:
      "Wainscott south of the highway: 22 sales at $5 million and above since 2023, a $9.05 million median, led by 115 Beach Lane at $59 million.",
    charts: {
      "median-by-year": years("Wainscott south of Montauk Highway, sales at $5 million and above. The latest sale closed June 18, 2026.", [
        { label: "2023", value: 7.34, display: "$7.34M", detail: "4 sales" },
        { label: "2024", value: 9.0, display: "$9.00M", detail: "5 sales" },
        { label: "2025", value: 11.65, display: "$11.65M", detail: "8 sales" },
        { label: "2026", value: 9.5, display: "$9.50M", detail: "5 sales", highlight: true },
      ]),
      "supply-by-band": supply(
        "Active listings on October 10, 2026. Sales per year cover January 2023 through June 18, 2026, about 3.75 years. The highlighted band is the shortest supply.",
        [
          band("$5M to $10M", 8, "about 3.7 sales a year"),
          band("$10M to $20M", 2, "about 1.3 sales a year", true),
          band("$20M to $50M", 4, "about 0.5 sales a year"),
          band("$50M and above", 0, "about 0.3 sales a year"),
        ]
      ),
      "sales-by-band": soldBands(
        "Wainscott south of Montauk Highway, sales at $5 million and above, January 2023 through June 18, 2026. The highlighted band is where most of the sales landed.",
        [
          { label: "$5M to $10M", sales: 14, highlight: true },
          { label: "$10M to $20M", sales: 5 },
          { label: "$20M to $50M", sales: 2 },
          { label: "$50M and above", sales: 1 },
        ]
      ),
    },
    content: `
## Key Takeaways

- Since January 2023, Wainscott south of the highway has recorded **22 sales at $5 million and above**, totaling **$281.8 million**, at a **median of $9.05 million**.
- **Beach Lane set the record.** 115 Beach Lane closed at **$59 million** in March 2026, more than double any other Wainscott sale in this window.
- **Inland Wainscott is a $7 million to $15 million market.** Eighteen inland sales posted an $8.45 million median, and none exceeded $15 million.
- **Supply is ahead of demand.** As of October 10, 14 listings ask $208.4 million, against about six sales a year at this level. No $5 million-plus contract has been signed south of the highway since September 1.

## Wainscott at a Glance

| Wainscott South, $5M and above | |
|---|---|
| Sales, Jan 2023 to Jun 18, 2026 | 22 |
| Median sale price | $9.05 million |
| Top sale | $59 million, 115 Beach Lane (Mar 2026) |
| Sales in 2026 so far | 5 |
| Active listings, Oct 10, 2026 | 14 |
| Median asking price | $7.95 million |
| Contracts signed since Sep 1 | 0 |

South of Montauk Highway, Wainscott runs from the hamlet down to Georgica Pond and the ocean: Beach Lane, Wainscott Main Street, Wainscott Hollow Road, Wainscott Stone Road, Sayres Path, and Westwood Road. The October 11 search shows no south-of-highway sale after June 18, 2026. The north-of-highway comparison is a single sale and is left out of this snapshot.

## Sales by Year and Setting

{{chart:median-by-year}}

| Year | Sales | Median | Total |
|---|---|---|---|
| 2023 | 4 | $7.34M | $28.3M |
| 2024 | 5 | $9.00M | $55.1M |
| 2025 | 8 | $11.65M | $100.6M |
| 2026 (to Jun 18) | 5 | $9.50M | $97.7M |

| Setting | Sales $5M+ | Median | Top sale | Total |
|---|---|---|---|---|
| Inland, south of the highway | 18 | $8.45M | $15.0M | $155.6M |
| Georgica Pond | 1 | $15.20M | $15.2M | $15.2M |
| Oceanfront | 3 | $27.50M | $59.0M | $111.0M |
| **Wainscott South** | **22** | **$9.05M** | **$59.0M** | **$281.8M** |

The ocean accounts for three sales and 39 percent of the dollars: 115 Beach Lane at $59 million (2026), 111 Beach Lane at $27.5 million (2025), and 95 Beach Lane at $24.5 million (2024). Inland, the top sales are 15 Wainscott Stone Road at $15 million (June 2026), 73 Wainscott Stone Road at $12.15 million (2025), and 28 Wainscott Hollow Road at $11.995 million (2025). None of the inland sales exceeded $15 million. On Georgica Pond, 4 Georgica Association Road sold for $15.2 million in February 2025. Hedgerow represented both sides at 51 Wainscott Hollow Road, $7.1 million, in 2023, pictured above. The search shows no south-of-highway closing after June 18, 2026.

{{figure:/images/hedgerow/sold-57-wainscott-hollow-road-wainscott-2022.webp|57 Wainscott Hollow Road sold for $9.1 million in November 2022, before this report's window. Hedgerow represented the seller.}}

57 Wainscott Hollow Road at $11.3 million in November 2025 is vacant land and a recorded deed. That is a different closing from the 2022 sale pictured here.

## Fall 2026: Inventory Versus Sales

{{chart:supply-by-band}}

{{chart:sales-by-band}}

| Price band | Active listings, Oct 10 | Sales, Jan 2023 to Jun 2026 | Sales per year | Supply at that pace |
|---|---|---|---|---|
| $5M to $10M | 8 | 14 | about 3.7 | about 2 years |
| $10M to $20M | 2 | 5 | about 1.3 | about 1.5 years |
| $20M to $50M | 4 | 2 | about 0.5 | about 7 years |
| $50M and above | 0 | 1 | about 0.3 | none listed |
| **Total** | **14** | **22** | **about 6** | |

- **Four listings ask $20 million or more**, led by 105 Beach Lane and 30 Mathews Road at $35 million each and 109 Town Line Road at $29.995 million. Wainscott South has closed three sales above $20 million since 2023, all on Beach Lane.
- **Nothing is listed above $50 million.** The only sale there is 115 Beach Lane at $59 million.
- **No $5 million-plus Wainscott South contract was signed between September 1 and October 9.** Two are in contract from earlier: a Wainscott Main Street listing at $7.995 million (August) and 75 and 89 Wainscott Main Street at $5.995 million.

## Top Wainscott South Sales Since 2023

| Address | Price | Closed | Setting |
|---|---|---|---|
| 115 Beach Lane | $59,000,000 | Mar 2026 | Oceanfront |
| 111 Beach Lane | $27,500,000 | Apr 2025 | Oceanfront |
| 95 Beach Lane | $24,500,000 | Jun 2024 | Oceanfront |
| 4 Georgica Association Road | $15,200,000 | Feb 2025 | Georgica Pond |
| 15 Wainscott Stone Road | $15,000,000 | Jun 2026 | Inland |
| 73 Wainscott Stone Road | $12,150,000 | Sep 2025 | Inland |
| 28 Wainscott Hollow Road | $11,995,000 | Nov 2025 | Inland |
| 57 Wainscott Hollow Road (land) | $11,300,000 | Nov 2025 | Inland, recorded deed |
| 70 Westwood Road | $9,500,000 | May 2026 | Inland, recorded deed |
| 183 Sayres Path | $9,350,000 | Aug 2024 | Inland |

*MLS sold data, October 11, 2026, plus recorded deeds. 57 Wainscott Hollow Road and 70 Westwood Road appear in the recorded deeds only.*

## For Buyers and Sellers

- **Buyers** have time and choice at almost every price. Inventory runs a year and a half or more at the recent pace, and inland pricing above $15 million has no closed sale behind it.
- **Sellers** inland do best priced to the $8 million to $12 million record. On the ocean, Beach Lane has now cleared $59 million, and only three oceanfront sales have closed in this window.

## How These Figures Were Measured

- **Area.** Closed sales of $5 million and above in Wainscott south of Montauk Highway, from January 2023 through June 18, 2026, the latest south closing in the October 11 search. Packages count as one sale. Sayres Path stays in Wainscott when that is the MLS city.
- **What is included.** Homes and three vacant land sales. Commercial property is excluded. Oceanfront here is 115, 111, and 95 Beach Lane. Georgica Pond is 4 Georgica Association Road, counted on its own, not inland.
- **Sources.** MLS listing data, checked against a full MLS sold search on October 11, 2026, plus the recorded deeds at 57 Wainscott Hollow Road and 70 Westwood Road. Where an MLS price and a deed price differ, the MLS price is used.
- **Listings and contracts.** MLS listing data on October 10, 2026, for listings, and through October 9, 2026, for contracts.
- **Limits.** These figures do not include trades that never appear in public MLS or deed records. Recorded deeds are complete through late July 2026. The search shows no south closing after June 18, 2026. There is no north-of-highway comparison row in this snapshot.

## FAQ

### What is the median price of a luxury home in Wainscott?

Across 22 sales at $5 million and above south of the highway from January 2023 through June 18, 2026, the median was $9.05 million. Inland only, it was $8.45 million across 18 sales.

### What is the most expensive home sold in Wainscott recently?

115 Beach Lane closed at $59 million in March 2026, the top Wainscott sale in this window.

### How many luxury homes are for sale in Wainscott this fall?

As of October 10, 2026, there were 14 listings at $5 million and above south of the highway, asking a combined $208.4 million, at a median ask of $7.95 million. No contract at this level was signed between September 1 and October 9.

### Is Wainscott a buyer's or seller's market?

At $5 million and above it is a buyer's market, with a year and a half or more of supply in every band that has a listing, at the recent pace.

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
