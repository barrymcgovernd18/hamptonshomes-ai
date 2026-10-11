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

function counts(title: string, caption: string, rows: BlogChartRow[]) {
  return { title, caption, rows };
}

function count(label: string, n: number, detail: string, highlight = false): BlogChartRow {
  return { label, value: n, display: String(n), detail, highlight, prefix: "" };
}

export const harborReportPosts: BlogPost[] = [
  {
    slug: "sag-harbor-village-luxury-market-overview-2026-10",
    title: "Sag Harbor Village Luxury Real Estate Market Overview 2026",
    excerpt:
      "Forty-eight sales at $5 million and above in Sag Harbor Village since January 2023, a median of $6.3 million, with 15 already in 2026 and the village record at 53 Glover Street.",
    date: "2026-10-11",
    dateModified: "2026-10-11",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/hedgerow/sold-8-john-street-sag-harbor-2024.webp",
    authorBox: true,
    hideCta: true,
    about: ["Sag Harbor"],
    keywords:
      "Sag Harbor Village real estate, Sag Harbor luxury homes, Sag Harbor market 2026, Glover Street, Sag Harbor waterfront",
    metaDescription:
      "Sag Harbor Village: 48 sales at $5 million and above since 2023, a $6.3 million median, and a $21 million waterfront record at 53 Glover Street.",
    charts: {
      "median-by-year": years("Sag Harbor Village, sales at $5 million and above. 2026 runs through September.", [
        { label: "2023", value: 5.5, display: "$5.50M", detail: "8 sales" },
        { label: "2024", value: 7.4, display: "$7.40M", detail: "9 sales" },
        { label: "2025", value: 7.78, display: "$7.78M", detail: "16 sales" },
        { label: "2026", value: 6.0, display: "$6.00M", detail: "15 sales", highlight: true },
      ]),
      "sales-by-band": counts(
        "Sales by price band",
        "Sag Harbor Village, January 2023 through September 2026. The highlighted band is where most of the sales landed.",
        [
          count("$5M to $10M", 39, "39 sales", true),
          count("$10M to $20M", 8, "8 sales"),
          count("$20M and above", 1, "1 sale"),
        ]
      ),
    },
    content: `
## Key Takeaways

- Since January 2023, Sag Harbor Village has recorded **48 sales at $5 million and above**, totaling **$373.8 million**, at a **median of $6.3 million**.
- **2026 is on pace for a record count.** Fifteen sales closed through September, against 16 in all of 2025, though at a lower median ($6.0 million versus $7.8 million).
- **2025 set the high-water mark for value**, $151.1 million across 16 sales, with six closings above $11 million.
- **The water sets the ceiling.** Thirteen waterfront sales on the cove, the harbor, and Bluff Point carry a $6.8 million median and include the village record, 53 Glover Street at $21 million.

## Sag Harbor Village at a Glance

| Sag Harbor Village, $5M and above | |
|---|---|
| Sales, Jan 2023 to Oct 11, 2026 | 48 |
| Median sale price | $6.3 million |
| Top sale | $21 million, 53 Glover Street (Feb 2025) |
| Sales in 2026 so far | 15, at a $6.0 million median |

This report is the incorporated village only. North Haven is a separate report. Sag Harbor waterfront, village and town together, is a separate report as well. Thirteen of these 48 sales are also in that waterfront count.

## The Price Trend

{{chart:median-by-year}}

| Year | Sales | Median | Total |
|---|---|---|---|
| 2023 | 8 | $5.50M | $53.7M |
| 2024 | 9 | $7.40M | $75.3M |
| 2025 | 16 | $7.78M | $151.1M |
| 2026 (to Sep) | 15 | $6.00M | $93.7M |

The median jumped from $5.5 million in 2023 to the $7.4 million to $7.8 million range in 2024 and 2025, when Main Street, Glover Street, Union Street, and Bay Street produced the village's biggest trades. 2026 has been about breadth rather than height: 15 sales, all between $5 million and $8.8 million, led by 232 Main Street at $8.8 million and 5 Green Street at $7.5 million.

## In the Village and on the Water

| Setting | Sales $5M+ | Median | Top sale | Total |
|---|---|---|---|---|
| In-village | 35 | $6.05M | $16.25M | $249.3M |
| Waterfront (cove, harbor, Bluff Point, Redwood) | 13 | $6.80M | $21.0M | $124.5M |
| **Sag Harbor Village** | **48** | **$6.27M** | **$21.0M** | **$373.8M** |

**In the village**, the top sales are 186 Main Street at $16.25 million (October 2025), 100 Glover Street at $13 million (September 2025), 20 Union Street at $11.8 million (September 2025), and 100 Bay Street at $11.25 million (December 2025).

**On the water**, 53 Glover Street closed at $21 million (February 2025), 8 John Street at $15.52 million (May 2024), where Hedgerow represented the seller, and 2 Bluff Point Lane at $13.5 million (March 2023). 8 John Street is pictured above. The village waterfront also appears in the separate Sag Harbor waterfront report.

## Price Bands

{{chart:sales-by-band}}

| Price band | Sales since Jan 2023 |
|---|---|
| $5M to $10M | 39 |
| $10M to $20M | 8 |
| $20M and above | 1 |

About eight in ten village sales at this level close under $10 million. Only 53 Glover Street has cleared $20 million.

## Top Sag Harbor Village Sales Since 2023

| Address | Price | Closed | Setting |
|---|---|---|---|
| 53 Glover Street | $21,000,000 | Feb 2025 | Waterfront |
| 186 Main Street | $16,250,000 | Oct 2025 | In-village |
| 8 John Street | $15,518,174 | May 2024 | Waterfront |
| 2 Bluff Point Lane | $13,500,000 | Mar 2023 | Waterfront |
| 100 Glover Street | $13,000,000 | Sep 2025 | In-village |
| 20 Union Street | $11,800,000 | Sep 2025 | In-village |
| 63 Glover Street | $11,500,000 | Jun 2025 | Waterfront |
| 100 Bay Street | $11,250,000 | Dec 2025 | In-village |
| 37 Glover Street | $10,900,000 | Apr 2024 | Waterfront |
| 62 West Water Street | $9,300,000 | Oct 2025 | Waterfront |

*MLS listing data and recorded deeds, October 11, 2026.* Hedgerow represented the seller at 8 John Street.

## For Buyers and Sellers

- **Buyers** will find the deepest part of the market between $5 million and $7.5 million for a renovated village house. Thirty-four of the 48 sales closed in that range. Every sale above $10 million has been on the water or on Main, Glover, Union, or Bay Street.
- **Sellers** are looking at a broad 2026 market, with a sale at $5 million or more about every two and a half weeks. Pricing above $10 million needs water or a top Main Street, Glover Street, or Union Street setting.

## How These Figures Were Measured

- **Area.** Sales of $5 million and above inside the Incorporated Village of Sag Harbor, including Sag Harbor Hills, Azurest, and Ninevah, by U.S. Census village boundary. North Haven is reported separately. Bluff Point, Redwood, Shaw Road, Ninevah Place, and Gull Rock Road are inside the village in this count.
- **Period.** Closed sales from January 1, 2023 through October 11, 2026. The latest village closing in the search is September 24.
- **What is included.** Homes, condominiums, and vacant land at $5 million and above. Commercial, business, and multi-family income properties are excluded. Packages and duplicate MLS entries count as one sale. 232 Main Street sold twice, in August 2024 and February 2026, and both closings are counted. 154 Redwood Road has two land sales, in 2023 and 2024.
- **Sources.** MLS listing data and recorded deeds from the October 11, 2026 search.
- **Limits.** Trades that never appear in the public MLS or deed record are outside this count.

## FAQ

### What is the median price of a luxury home in Sag Harbor Village?

Across 48 sales at $5 million and above from January 2023 through October 11, 2026, the median was about $6.3 million.

### What is the most expensive home sold in Sag Harbor Village recently?

53 Glover Street, on the water, closed at $21 million in February 2025. The top in-village sale is 186 Main Street at $16.25 million in October 2025.

### How busy is the Sag Harbor Village luxury market in 2026?

Fifteen sales at $5 million and above closed from January through September 2026, nearly matching the 16 in all of 2025.

### Who is Barry McGovern?

Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020. More at [hamptonshomes.ai/about](https://hamptonshomes.ai/about).

## Thinking About Sag Harbor?

Whether you are weighing a sale or looking for a house that may never reach the open market, I am glad to walk through what the record says about your street.

## Related

- [Sag Harbor town page](/sag-harbor)
- [Sag Harbor Waterfront Luxury Market 2026](/blog/sag-harbor-waterfront-luxury-market-2026-10)
- [North Haven Luxury Market 2026](/blog/north-haven-luxury-market-2026-10)
- [Shelter Island Luxury Market 2026](/blog/shelter-island-luxury-market-2026-10)
- [Recent Hedgerow Exclusive Sales](/hedgerow-sales)

*Images courtesy of Hedgerow Exclusive Properties.*
`,
  },
  {
    slug: "sag-harbor-waterfront-luxury-market-2026-10",
    title: "Sag Harbor Waterfront Luxury Real Estate Market 2026",
    excerpt:
      "Twenty-one Sag Harbor waterfront sales at $5 million and above since January 2023, a median of $6.7 million, led by 53 Glover Street at $21 million. North Haven is not in this count.",
    date: "2026-10-11",
    dateModified: "2026-10-11",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/hedgerow/sold-8-john-street-sag-harbor-2024.webp",
    authorBox: true,
    hideCta: true,
    about: ["Sag Harbor"],
    keywords:
      "Sag Harbor waterfront, Sag Harbor Cove, Bluff Point, Sag Harbor bayfront, Sag Harbor luxury homes 2026",
    metaDescription:
      "Sag Harbor waterfront: 21 sales at $5 million and above since 2023, a $6.7 million median, led by 53 Glover Street at $21 million.",
    charts: {
      "median-by-year": years("Sag Harbor waterfront, excluding North Haven, sales at $5 million and above.", [
        { label: "2023", value: 6.04, display: "$6.04M", detail: "4 sales" },
        { label: "2024", value: 6.28, display: "$6.28M", detail: "6 sales" },
        { label: "2025", value: 7.81, display: "$7.81M", detail: "6 sales" },
        { label: "2026", value: 6.89, display: "$6.89M", detail: "5 sales", highlight: true },
      ]),
    },
    content: `
## Key Takeaways

- Since January 2023, **21 Sag Harbor waterfront sales at $5 million and above** have closed, totaling **$180.3 million**, at a **median of $6.7 million**.
- **The village holds the top of the market.** Thirteen village waterfront sales total $124.5 million, led by 53 Glover Street at $21 million. Outside the village, the record is 25 Rawson Road at $12.25 million (May 2026).
- **2025 was the strongest year** at a $7.8 million median. 2026 has added five sales through September, all between $6.6 million and $12.25 million.
- **Bluff Point is the new activity cluster**, with two 2026 sales, at 10 Bluff Point Lane ($6.8 million) and 55 Bluff Point Road ($6.63 million).

## Sag Harbor Waterfront at a Glance

| Sag Harbor Waterfront, $5M and above | |
|---|---|
| Sales, Jan 2023 to Oct 11, 2026 | 21 |
| Median sale price | $6.7 million |
| Top sale | $21 million, 53 Glover Street (Feb 2025) |
| Sales in 2026 so far | 5, at a $6.9 million median |

This is Sag Harbor on the water, inside the village and on the Sag Harbor side of the towns. North Haven's waterfront sales are in the North Haven report, not here. Thirteen of these 21 sales are also the waterfront rows in the Sag Harbor Village report. The other eight are outside the village. No sale is counted twice inside this report.

## Sales by Year

{{chart:median-by-year}}

| Year | Sales | Median | Total |
|---|---|---|---|
| 2023 | 4 | $6.04M | $30.7M |
| 2024 | 6 | $6.28M | $50.1M |
| 2025 | 6 | $7.81M | $59.8M |
| 2026 (to Sep) | 5 | $6.89M | $39.7M |

## Village and Beyond

| Location | Sales $5M+ | Median | Top sale | Total |
|---|---|---|---|---|
| Village (cove, harbor, Bluff Point, Redwood) | 13 | $6.80M | $21.0M | $124.5M |
| Outside the village (Noyac Bay, Sag Harbor Bay shore) | 8 | $6.63M | $12.25M | $55.8M |
| **Sag Harbor Waterfront** | **21** | **$6.70M** | **$21.0M** | **$180.3M** |

In the village, Glover Street on Sag Harbor Cove has produced three of the top waterfront sales: 53 Glover Street at $21 million, 63 Glover Street at $11.5 million, and 37 Glover Street at $10.9 million. 8 John Street, where Hedgerow represented the seller, closed at $15.52 million in May 2024. It is pictured above. Outside the village, 25 Rawson Road at $12.25 million and 61 Harbor Drive at $7.1 million led 2026.

## Price Bands

| Price band | Sales since Jan 2023 |
|---|---|
| $5M to $10M | 15 |
| $10M to $20M | 5 |
| $20M and above | 1 |

## Top Sag Harbor Waterfront Sales Since 2023

| Address | Price | Closed | Location |
|---|---|---|---|
| 53 Glover Street | $21,000,000 | Feb 2025 | Village |
| 8 John Street | $15,518,174 | May 2024 | Village |
| 2 Bluff Point Lane | $13,500,000 | Mar 2023 | Village |
| 25 Rawson Road | $12,250,000 | May 2026 | Outside the village |
| 63 Glover Street | $11,500,000 | Jun 2025 | Village |
| 37 Glover Street | $10,900,000 | Apr 2024 | Village |
| 62 West Water Street | $9,300,000 | Oct 2025 | Village |
| 61 Harbor Drive | $7,100,000 | May 2026 | Outside the village |
| 22 Round Pond Lane | $6,895,000 | Sep 2026 | Outside the village |
| 10 Bluff Point Lane | $6,800,000 | Aug 2026 | Village |
| 65 Cliff Drive | $6,700,000 | May 2023 | Outside the village |
| 55 Bluff Point Road | $6,625,000 | Jul 2026 | Village |

*MLS listing data and recorded deeds, October 11, 2026.* Hedgerow represented the seller at 8 John Street.

## For Buyers and Sellers

- **Buyers** will see about half of these waterfront trades fall between $5.5 million and $7.5 million. Above $10 million, the choices are essentially the village cove and a handful of larger bay parcels.
- **Sellers** are in a market of about five or six waterfront sales a year at this level. Frontage, dock rights, and village walkability drive the spread between $6 million and $20 million-plus.

## How These Figures Were Measured

- **Area.** Waterfront sales of $5 million and above in Sag Harbor, inside and outside the incorporated village. North Haven is reported separately. Waterfront follows the MLS waterfront designation.
- **Period.** Closed sales from January 1, 2023 through October 11, 2026. The latest closing in this set is September 30.
- **What is included.** Homes and vacant land at $5 million and above. Commercial, business, and multi-family income properties are excluded. Packages and duplicate MLS entries count as one sale.
- **Sources.** MLS listing data and recorded deeds from the October 11, 2026 waterfront search. North Haven waterfront is reported with North Haven.
- **Limits.** Trades that never appear in the public MLS or deed record are outside this count. The waterfront designation can include more than direct frontage.

## FAQ

### What is the median price of a waterfront luxury home in Sag Harbor?

Across 21 waterfront sales at $5 million and above since January 2023, the median was $6.7 million. North Haven is not in that figure.

### What is the most expensive waterfront home sold in Sag Harbor recently?

53 Glover Street closed at $21 million in February 2025. Outside the village, 25 Rawson Road closed at $12.25 million in May 2026.

### Who is Barry McGovern?

Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020. More at [hamptonshomes.ai/about](https://hamptonshomes.ai/about).

## Thinking About the Water in Sag Harbor?

Whether you are weighing a sale or looking for a house that may never reach the open market, I am glad to walk through what the record says about your shoreline.

## Related

- [Sag Harbor town page](/sag-harbor)
- [Sag Harbor Village Luxury Market Overview 2026](/blog/sag-harbor-village-luxury-market-overview-2026-10)
- [North Haven Luxury Market 2026](/blog/north-haven-luxury-market-2026-10)
- [Shelter Island Waterfront Luxury Market 2026](/blog/shelter-island-waterfront-luxury-market-2026-10)
- [Recent Hedgerow Exclusive Sales](/hedgerow-sales)

*Images courtesy of Hedgerow Exclusive Properties.*
`,
  },
  {
    slug: "north-haven-luxury-market-2026-10",
    title: "North Haven Luxury Real Estate Market 2026",
    excerpt:
      "Twenty-five sales at $5 million and above in North Haven since January 2023, a median of $8.25 million, led by 6 Bay View Court at $34.5 million.",
    date: "2026-10-11",
    dateModified: "2026-10-11",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/hedgerow/sold-48-forest-road-sag-harbor-2023.webp",
    authorBox: true,
    hideCta: true,
    about: ["North Haven"],
    keywords:
      "North Haven real estate, North Haven luxury homes, North Haven market 2026, On The Bluff, Forest Road, North Haven waterfront",
    metaDescription:
      "North Haven: 25 sales at $5 million and above since 2023, an $8.25 million median, led by 6 Bay View Court at $34.5 million.",
    charts: {
      "median-by-year": years("North Haven, sales at $5 million and above.", [
        { label: "2023", value: 10.4, display: "$10.40M", detail: "5 sales" },
        { label: "2024", value: 9.96, display: "$9.96M", detail: "9 sales" },
        { label: "2025", value: 6.33, display: "$6.33M", detail: "4 sales" },
        { label: "2026", value: 8.25, display: "$8.25M", detail: "7 sales", highlight: true },
      ]),
      "setting": {
        title: "Median by setting",
        caption: "North Haven, January 2023 through September 2026. Waterfront is the higher bar.",
        rows: [
          { label: "Waterfront", value: 10.4, display: "$10.40M", detail: "13 sales", highlight: true },
          { label: "Interior", value: 6.31, display: "$6.31M", detail: "12 sales" },
        ],
      },
    },
    content: `
## Key Takeaways

- Since January 2023, North Haven has recorded **25 sales at $5 million and above**, totaling **$264.9 million**, at a **median of $8.25 million**.
- **6 Bay View Court is the record** at $34.5 million (May 2024).
- **On The Bluff is the address of the moment.** Three trades since December 2024 total $52.9 million: 26 On The Bluff at $12.5 million, 24 On The Bluff at $14.91 million, and 8 and 10 On The Bluff, a land assemblage, at $25.5 million.
- **2026 is already the second-biggest year**, with seven sales and $80.9 million through September.
- Hedgerow had a role in four of the 25 sales, $37.9 million in volume.

## North Haven at a Glance

| North Haven, $5M and above | |
|---|---|
| Sales, Jan 2023 to Oct 11, 2026 | 25 |
| Median sale price | $8.25 million |
| Top sale | $34.5 million, 6 Bay View Court (May 2024) |
| Sales in 2026 so far | 7, at an $8.25 million median |

North Haven is the incorporated village between Sag Harbor and Shelter Island. Sag Harbor Village and Sag Harbor waterfront are separate reports. This count does not include them.

## Sales by Year

{{chart:median-by-year}}

| Year | Sales | Median | Total |
|---|---|---|---|
| 2023 | 5 | $10.40M | $50.4M |
| 2024 | 9 | $9.96M | $105.5M |
| 2025 | 4 | $6.33M | $28.1M |
| 2026 (to Sep) | 7 | $8.25M | $80.9M |

2024 was the volume peak at $105.5 million, carried by 6 Bay View Court. 2025 was quieter at the top, with four sales and none above $10.13 million. 2026 has rebounded with three sales above $13.5 million: 8 and 10 On The Bluff at $25.5 million, 24 On The Bluff at $14.91 million, and 29 Barclay Drive at $13.8 million in September.

## The Bayfront and the Interior

{{chart:setting}}

| Setting | Sales $5M+ | Median | Top sale | Total |
|---|---|---|---|---|
| Waterfront | 13 | $10.40M | $34.5M | $168.7M |
| Interior | 12 | $6.31M | $15.0M | $96.1M |
| **North Haven** | **25** | **$8.25M** | **$34.5M** | **$264.9M** |

North Haven is a peninsula village, and frontage on the bays and Shelter Island Sound drives its top prices. Waterfront sales carry a $10.4 million median, about 65 percent above the interior.

Forest Road shows it clearly. 48 Forest Road, a bayfront house with its own beach and dock, closed at $14 million in October 2023, where Hedgerow represented the seller. It is pictured above. 20 Forest Road, recorded as a land sale, followed at $10.995 million in March 2024, where Hedgerow represented the seller, and 56 Forest Road at $9.96 million in August 2024.

{{figure:/images/hedgerow/sold-20-forest-road-sag-harbor-2024.webp|20 Forest Road, North Haven, sold for $10.995 million in March 2024. Hedgerow represented the seller. The sale is recorded as land.}}

Interior sales have reached $15 million at 35 Ezekills Hollow in 2023 and $13.8 million at 29 Barclay Drive in 2026, but most close between $5.2 million and $8.25 million. 11 South Harbor Drive closed at $6.45 million in February 2026, where Hedgerow represented the seller.

{{figure:/images/hedgerow/sold-11-south-harbor-drive-sag-harbor-2026.webp|11 South Harbor Drive, North Haven, sold for $6.45 million in February 2026. Hedgerow represented the seller.}}

## Price Bands

| Price band | Sales since Jan 2023 |
|---|---|
| $5M to $10M | 14 |
| $10M to $20M | 9 |
| $20M and above | 2 |

## Top North Haven Sales Since 2023

| Address | Price | Closed | Setting |
|---|---|---|---|
| 6 Bay View Court | $34,500,000 | May 2024 | Waterfront |
| 8 and 10 On The Bluff (land) | $25,500,000 | Jun 2026 | Waterfront |
| 35 Ezekills Hollow | $15,000,000 | Nov 2023 | Interior |
| 24 On The Bluff | $14,910,000 | May 2026 | Waterfront |
| 48 Forest Road | $14,000,000 | Oct 2023 | Waterfront |
| 29 Barclay Drive | $13,800,000 | Sep 2026 | Interior |
| 26 On The Bluff | $12,500,000 | Dec 2024 | Interior |
| 18 North Drive | $11,500,000 | Nov 2024 | Waterfront |
| 20 Forest Road (land) | $10,995,000 | Mar 2024 | Waterfront |
| 59 and 61 Ferry Road | $10,400,000 | Dec 2023 | Waterfront |
| 5 Widow Coopers Path | $10,125,000 | Oct 2025 | Waterfront |
| 56 Forest Road | $9,960,000 | Aug 2024 | Waterfront |

*MLS listing data and recorded deeds, October 11, 2026.* Hedgerow represented the seller at 48 Forest Road, 20 Forest Road, and 11 South Harbor Drive, and represented the buyer at 10 Meadowbrook Way ($6.5 million, land, October 2025). 8 and 10 On The Bluff is one sale. The two lot entries from the same day are not counted separately.

## For Buyers and Sellers

- **Buyers** will see waterfront trade from about $6.5 million to $34.5 million, and interior homes start near $5.2 million. Land is part of the luxury market here, with three land sales at $5 million and above.
- **Sellers** on On The Bluff and Forest Road are pricing against a reset for frontage. A well-positioned waterfront listing is competing with a median above $10 million.

## How These Figures Were Measured

- **Area.** Sales of $5 million and above inside the Incorporated Village of North Haven, by U.S. Census village boundary, cross-checked against the North Haven sold search.
- **Period.** Closed sales from January 1, 2023 through October 11, 2026. The latest closing in this set is September 14.
- **What is included.** Homes and vacant land at $5 million and above. Commercial property is excluded. Packages and duplicate MLS entries count as one sale. 8 and 10 On The Bluff is counted once, at $25.5 million.
- **Sources.** MLS listing data and recorded deeds from the October 11, 2026 search.
- **Limits.** Trades that never appear in the public MLS or deed record are outside this count.

## FAQ

### What is the median price of a luxury home in North Haven?

Across 25 sales at $5 million and above from January 2023 through October 11, 2026, the median was $8.25 million.

### What is the most expensive home sold in North Haven recently?

6 Bay View Court closed at $34.5 million in May 2024. In 2026, 8 and 10 On The Bluff sold as a land assemblage for $25.5 million.

### Is North Haven waterfront more expensive than the interior?

Yes. Waterfront sales posted a $10.4 million median against $6.31 million for interior homes.

### Who is Barry McGovern?

Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020. More at [hamptonshomes.ai/about](https://hamptonshomes.ai/about).

## Thinking About North Haven?

Whether you are weighing a sale or looking for a house that may never reach the open market, I am glad to walk through what the record says about your shoreline.

## Related

- [North Haven village page](/north-haven)
- [Sag Harbor Village Luxury Market Overview 2026](/blog/sag-harbor-village-luxury-market-overview-2026-10)
- [Sag Harbor Waterfront Luxury Market 2026](/blog/sag-harbor-waterfront-luxury-market-2026-10)
- [Shelter Island Luxury Market 2026](/blog/shelter-island-luxury-market-2026-10)
- [Recent Hedgerow Exclusive Sales](/hedgerow-sales)

*Images courtesy of Hedgerow Exclusive Properties.*
`,
  },
  {
    slug: "shelter-island-luxury-market-2026-10",
    title: "Shelter Island Luxury Real Estate Market 2026",
    excerpt:
      "Fourteen sales at $5 million and above on Shelter Island since January 2023, a median of $7.9 million, and a record six sales in 2026, led by 4 Dawn Lane at $15.995 million.",
    date: "2026-10-11",
    dateModified: "2026-10-11",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/hedgerow/sold-33-dinah-rock-road-shelter-island-2026.webp",
    authorBox: true,
    hideCta: true,
    about: ["Shelter Island"],
    keywords:
      "Shelter Island real estate, Shelter Island luxury homes, Shelter Island market 2026, Shelter Island waterfront, Dering Harbor",
    metaDescription:
      "Shelter Island: 14 sales at $5 million and above since 2023, a $7.9 million median, and a record six sales already in 2026.",
    charts: {
      "sales-by-year": counts(
        "Sales by year",
        "Shelter Island, sales at $5 million and above. 2026 is the record count. The detail is that year's median.",
        [
          count("2023", 3, "$8.75M median"),
          count("2024", 2, "$9.50M median"),
          count("2025", 3, "$6.70M median"),
          count("2026", 6, "$6.50M median", true),
        ]
      ),
      "setting": {
        title: "Median by setting",
        caption: "Nine of the 14 sales are waterfront. Those nine are also the Shelter Island waterfront report.",
        rows: [
          { label: "Waterfront", value: 9, display: "$9.00M", detail: "9 sales", highlight: true },
          { label: "Inland", value: 6.55, display: "$6.55M", detail: "5 sales" },
        ],
      },
    },
    content: `
## Key Takeaways

- Since January 2023, Shelter Island has recorded **14 sales at $5 million and above**, totaling **$120.7 million**, at a **median of $7.9 million**.
- **2026 is a record year for count.** Six sales through September, $48.8 million, against two or three in each prior year.
- **4 Dawn Lane set a new island high** at $15.995 million in April 2026.
- **Waterfront drives value.** Nine of the 14 sales are on the water, at a $9.0 million median, versus $6.55 million inland.
- Hedgerow represented the seller on two of the 14: 1 Pandion Road and 33 Dinah Rock Road.

## Shelter Island at a Glance

| Shelter Island, $5M and above | |
|---|---|
| Sales, Jan 2023 to Oct 11, 2026 | 14 |
| Median sale price | $7.9 million |
| Top sale | $15.995 million, 4 Dawn Lane (Apr 2026) |
| Sales in 2026 so far | 6, at a $6.5 million median |

This is the whole island at $5 million and above, including Shelter Island Heights and the Village of Dering Harbor. The nine waterfront sales are also published on their own, in the Shelter Island waterfront report. 33 Dinah Rock Road, pictured above, is inland.

## Sales by Year

{{chart:sales-by-year}}

| Year | Sales | Median | Total |
|---|---|---|---|
| 2023 | 3 | $8.75M | $28.3M |
| 2024 | 2 | $9.50M | $19.0M |
| 2025 | 3 | $6.70M | $24.7M |
| 2026 (to Sep) | 6 | $6.50M | $48.8M |

The island's luxury market has widened in 2026. Six sales have closed, from 4 Dawn Lane at the top to 29 East Brander Parkway at $5.15 million. The median has eased because more of the activity is in the $5 million to $7 million range.

## On the Water and Inland

{{chart:setting}}

| Setting | Sales $5M+ | Median | Top sale | Total |
|---|---|---|---|---|
| Waterfront | 9 | $9.00M | $15.995M | $89.4M |
| Inland | 5 | $6.55M | $7.0M | $31.3M |
| **Shelter Island** | **14** | **$7.87M** | **$15.995M** | **$120.7M** |

Every sale above $7 million since 2023 has been on the water: 4 Dawn Lane, 2 Charlie's Lane, 1 Pandion Road, 10 Thompson Road, 8 Little Ram Island Drive, 21 Harbor Lane, and 29 Winthrop Road. Inland, the top sale is 33 Dinah Rock Road at $6.995 million, where Hedgerow represented the seller.

{{figure:/images/hedgerow/sold-1-pandion-road-shelter-island-2025.webp|1 Pandion Road, Shelter Island, sold for $12.85 million in September 2025. Hedgerow represented the seller.}}

## Price Bands

| Price band | Sales since Jan 2023 |
|---|---|
| $5M to $10M | 10 |
| $10M to $20M | 4 |
| $20M and above | 0 |

## Every Shelter Island Sale at $5 Million and Above Since 2023

| Address | Price | Closed | Setting |
|---|---|---|---|
| 4 Dawn Lane | $15,995,000 | Apr 2026 | Waterfront |
| 2 Charlie's Lane | $12,950,000 | Aug 2023 | Waterfront |
| 1 Pandion Road | $12,850,000 | Sep 2025 | Waterfront |
| 10 Thompson Road | $10,250,000 | Jul 2024 | Waterfront |
| 8 Little Ram Island Drive | $9,000,000 | Jul 2026 | Waterfront |
| 21 Harbor Lane | $8,750,000 | Sep 2024 | Waterfront |
| 29 Winthrop Road | $8,750,000 | May 2023 | Waterfront |
| 33 Dinah Rock Road | $6,995,000 | Sep 2026 | Inland |
| 24 Harbor Lane | $6,700,000 | Jun 2025 | Inland |
| 41 Manhanset Road | $6,550,000 | Oct 2023 | Inland |
| 28 South Menantic Road | $6,000,000 | Aug 2026 | Inland |
| 21 Thompson Road | $5,700,000 | Apr 2026 | Waterfront |
| 29 East Brander Parkway | $5,150,000 | Jul 2026 | Waterfront |
| 79 North Midway Road | $5,100,000 | Dec 2025 | Inland |

*MLS listing data and recorded deeds, October 11, 2026.* Hedgerow represented the seller at 1 Pandion Road and 33 Dinah Rock Road. 41 Manhanset Road is in the Village of Dering Harbor and is included. 2 Charlie's Lane and 1 Pandion Road are counted as two closings.

## For Buyers and Sellers

- **Buyers** will find inland sales at this level between $5 million and $7 million. Waterfront starts near $5 million and runs to $16 million.
- **Sellers** are looking at a 2026 pace with more buyers at this level than at any point since 2023, and 4 Dawn Lane has lifted the ceiling for frontage.

## How These Figures Were Measured

- **Area.** Sales of $5 million and above on Shelter Island, including Shelter Island Heights and the Village of Dering Harbor.
- **Period.** Closed sales from January 1, 2023 through October 11, 2026. The latest closing in this set is September 25.
- **What is included.** Homes at $5 million and above. The search has no vacant land sale and no commercial sale at this level in the period. Duplicate MLS entries count as one sale.
- **Sources.** MLS listing data and recorded deeds from the October 11, 2026 search.
- **Limits.** Trades that never appear in the public MLS or deed record are outside this count.

## FAQ

### What is the median price of a luxury home on Shelter Island?

Across 14 sales at $5 million and above from January 2023 through October 11, 2026, the median was about $7.9 million.

### What is the most expensive home sold on Shelter Island recently?

4 Dawn Lane closed at $15.995 million in April 2026.

### How many luxury homes have sold on Shelter Island in 2026?

Six sales at $5 million and above closed from January through September 2026, the most of any year since 2023.

### Who is Barry McGovern?

Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020. More at [hamptonshomes.ai/about](https://hamptonshomes.ai/about).

## Thinking About Shelter Island?

Whether you are weighing a sale or looking for a house that may never reach the open market, I am glad to walk through what the record says about your part of the island.

## Related

- [Shelter Island town page](/shelter-island)
- [Shelter Island Waterfront Luxury Market 2026](/blog/shelter-island-waterfront-luxury-market-2026-10)
- [North Haven Luxury Market 2026](/blog/north-haven-luxury-market-2026-10)
- [Sag Harbor Waterfront Luxury Market 2026](/blog/sag-harbor-waterfront-luxury-market-2026-10)
- [Recent Hedgerow Exclusive Sales](/hedgerow-sales)

*Images courtesy of Hedgerow Exclusive Properties.*
`,
  },
  {
    slug: "shelter-island-waterfront-luxury-market-2026-10",
    title: "Shelter Island Waterfront Luxury Real Estate Market 2026",
    excerpt:
      "Nine Shelter Island waterfront sales at $5 million and above since January 2023, a median of $9 million, four of them in 2026, led by 4 Dawn Lane at $15.995 million.",
    date: "2026-10-11",
    dateModified: "2026-10-11",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/hedgerow/sold-1-pandion-road-shelter-island-2025.webp",
    authorBox: true,
    hideCta: true,
    about: ["Shelter Island"],
    keywords:
      "Shelter Island waterfront, Shelter Island bayfront, Shelter Island luxury homes 2026, Dawn Lane, Pandion Road",
    metaDescription:
      "Shelter Island waterfront: nine sales at $5 million and above since 2023, a $9 million median, led by 4 Dawn Lane at $15.995 million.",
    charts: {
      "sales-by-year": counts(
        "Waterfront sales by year",
        "Shelter Island waterfront, sales at $5 million and above. The latest waterfront closing is July 31, 2026.",
        [
          count("2023", 2, "$10.85M median"),
          count("2024", 2, "$9.50M median"),
          count("2025", 1, "$12.85M median"),
          count("2026", 4, "$7.35M median", true),
        ]
      ),
    },
    content: `
## Key Takeaways

- Since January 2023, **nine Shelter Island waterfront sales at $5 million and above** have closed, totaling **$89.4 million**, at a **median of $9.0 million**.
- **4 Dawn Lane is the record** at $15.995 million (April 2026), about $3 million above the previous high.
- **2026 already has four waterfront sales**, as many as 2023 and 2024 combined, totaling $35.8 million.
- **Frontage carries a premium.** The waterfront median is about 37 percent above the island's inland sales at this level.

## Shelter Island Waterfront at a Glance

| Shelter Island Waterfront, $5M and above | |
|---|---|
| Sales, Jan 2023 to Oct 11, 2026 | 9 |
| Median sale price | $9.0 million |
| Top sale | $15.995 million, 4 Dawn Lane (Apr 2026) |
| Sales in 2026 so far | 4, at a $7.35 million median |

These nine sales are the waterfront rows of the Shelter Island report, published here on their own. 33 Dinah Rock Road is not in this count. It is inland. 1 Pandion Road, pictured above, is the Hedgerow waterfront sale in the set.

## Sales by Year

{{chart:sales-by-year}}

| Year | Sales | Median | Total |
|---|---|---|---|
| 2023 | 2 | $10.85M | $21.7M |
| 2024 | 2 | $9.50M | $19.0M |
| 2025 | 1 | $12.85M | $12.9M |
| 2026 (to Jul) | 4 | $7.35M | $35.8M |

Before 2026, Shelter Island saw one or two waterfront sales a year at this level, between $8.75 million and $12.95 million. 2026 added four: 4 Dawn Lane at $15.995 million, 8 Little Ram Island Drive at $9 million, 21 Thompson Road at $5.7 million on 9.4 acres, and 29 East Brander Parkway at $5.15 million. The latest waterfront closing in the search is July 31, 2026.

## Price Bands

| Price band | Sales since Jan 2023 |
|---|---|
| $5M to $10M | 5 |
| $10M to $20M | 4 |
| $20M and above | 0 |

## Every Shelter Island Waterfront Sale at $5 Million and Above Since 2023

| Address | Price | Closed |
|---|---|---|
| 4 Dawn Lane | $15,995,000 | Apr 2026 |
| 2 Charlie's Lane | $12,950,000 | Aug 2023 |
| 1 Pandion Road | $12,850,000 | Sep 2025 |
| 10 Thompson Road | $10,250,000 | Jul 2024 |
| 8 Little Ram Island Drive | $9,000,000 | Jul 2026 |
| 21 Harbor Lane | $8,750,000 | Sep 2024 |
| 29 Winthrop Road | $8,750,000 | May 2023 |
| 21 Thompson Road | $5,700,000 | Apr 2026 |
| 29 East Brander Parkway | $5,150,000 | Jul 2026 |

*MLS listing data and recorded deeds, October 11, 2026.* Hedgerow represented the seller at 1 Pandion Road. 2 Charlie's Lane and 1 Pandion Road are counted as two closings.

## For Buyers and Sellers

- **Buyers** will see waterfront at this level run from about $5 million to $16 million, with fewer than three sales in most years.
- **Sellers** can look to 4 Dawn Lane and the 2026 pace for the strongest comparables the island has seen. Well-sited waterfront has supported $9 million to $13 million since 2023.

## How These Figures Were Measured

- **Area.** Waterfront sales of $5 million and above on Shelter Island, including Shelter Island Heights and the Village of Dering Harbor. Waterfront follows the MLS waterfront designation. This report is separate from the island-wide count.
- **Period.** Closed sales from January 1, 2023 through October 11, 2026. The latest waterfront closing is July 31.
- **What is included.** Homes at $5 million and above. Duplicate MLS entries count as one sale.
- **Sources.** MLS listing data and recorded deeds from the October 11, 2026 waterfront search.
- **Limits.** Trades that never appear in the public MLS or deed record are outside this count. Bay, sound, harbor, and creek frontage are read together.

## FAQ

### What is the median price of a waterfront luxury home on Shelter Island?

Across nine waterfront sales at $5 million and above since January 2023, the median was $9.0 million.

### What is the most expensive waterfront home sold on Shelter Island recently?

4 Dawn Lane closed at $15.995 million in April 2026.

### Who is Barry McGovern?

Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020. More at [hamptonshomes.ai/about](https://hamptonshomes.ai/about).

## Thinking About the Water on Shelter Island?

Whether you are weighing a sale or looking for a house that may never reach the open market, I am glad to walk through what the record says about your shoreline.

## Related

- [Shelter Island town page](/shelter-island)
- [Shelter Island Luxury Market 2026](/blog/shelter-island-luxury-market-2026-10)
- [North Haven Luxury Market 2026](/blog/north-haven-luxury-market-2026-10)
- [Sag Harbor Waterfront Luxury Market 2026](/blog/sag-harbor-waterfront-luxury-market-2026-10)
- [Recent Hedgerow Exclusive Sales](/hedgerow-sales)

*Images courtesy of Hedgerow Exclusive Properties.*
`,
  },
];
