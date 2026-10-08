import { PLACE_NAMES, PLACE_SLUGS } from "./schema";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  content: string;
  metaDescription: string;
  image?: string;
  /** Last substantive revision (ISO date). Defaults to `date` in schema. */
  dateModified?: string;
  /** Show the author box (headshot, title, firm) under the headline. */
  authorBox?: boolean;
  /** Suppress the generic end-of-post CTA panel (research notes close with a single contact line instead). */
  hideCta?: boolean;
  /** Places this post is about; emitted as Article.about in JSON-LD. */
  about?: (typeof PLACE_NAMES)[number][];
  /** Comma-separated keywords for Article JSON-LD. */
  keywords?: string;
}

/** Search titles (under ~62 characters, brand included). The on-page H1 keeps the full title. */
export const SEO_TITLES: Record<string, string> = {
  "hamptons-fall-2026-contracts-inventory": "Hamptons Fall 2026 Contracts and Inventory | Barry McGovern",
  "hamptons-oceanfront-market-2021-2026": "Hamptons Oceanfront Market, 2021 to 2026 | Barry McGovern",
  "bridgehampton-non-water-market-overview-2026-09": "Bridgehampton Non-Water Market, 2026 | Barry McGovern",
  "sag-harbor-village-market-overview-2026-09": "Sag Harbor Village Market, 2026 | Barry McGovern",
  "ai-ipo-wealth-san-francisco-hamptons-market-2026": "AI IPO Wealth and the Hamptons Market | Barry McGovern",
  "hamptons-30-million-compound-sale-february-2026": "The $30M East Hampton Compound Sale | Barry McGovern",
  "hamptons-62-billion-sales-surge-march-2026": "The Hamptons $6.2B Year and Spring 2026 | Barry McGovern",
  "wall-street-bonus-season-hamptons-2026": "Wall Street Bonuses and the Hamptons | Barry McGovern",
  "hamptons-market-update-q4-2025": "Hamptons Market Update, Q4 2025 | Barry McGovern",
  "why-hamptons-oceanfront-different": "Why Hamptons Oceanfront Is Different | Barry McGovern",
  "off-market-hamptons-explained": "Off-Market Hamptons Real Estate, Explained | Barry McGovern",
  "oceanfront-scarcity-southampton-montauk-2025": "Oceanfront Scarcity, Southampton to Montauk | Barry McGovern",
  "sag-harbor-waterfront-village-demand-2025": "Sag Harbor Waterfront and Village Demand | Barry McGovern",
  "off-market-vs-public-listing-hamptons-2025": "Off-Market or Public Listing in the Hamptons | Barry McGovern",
  "east-hampton-lily-pond-further-lane-2026": "Lily Pond Lane and Further Lane, East Hampton | Barry McGovern",
};

const RELATED_STOPWORDS = new Set([
  "about",
  "after",
  "barry",
  "from",
  "hamptons",
  "have",
  "into",
  "mcgovern",
  "that",
  "this",
  "what",
  "when",
  "with",
  "will",
]);

function tokenize(text: string) {
  return new Set(
    text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, " ")
      .split(/[\s-]+/)
      .filter((word) => word.length > 3 && !RELATED_STOPWORDS.has(word))
  );
}

function stripMarkdown(text: string) {
  return text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/^[-*]\s+/gm, "")
    .replace(/\s+/g, " ")
    .trim();
}

/** Parse visible FAQ Q&A from a trailing `## FAQ` section. Does not invent answers. */
export function extractFaqsFromContent(content: string): { question: string; answer: string }[] {
  const normalized = content.replace(/\r\n/g, "\n");
  const heading = /^## (FAQ|Frequently Asked Questions)\s*$/im.exec(normalized);
  if (!heading || heading.index === undefined) return [];

  const after = normalized.slice(heading.index + heading[0].length);
  const nextH2 = after.search(/\n## [^#]/);
  const section = (nextH2 === -1 ? after : after.slice(0, nextH2)).trim();
  if (!section) return [];

  const chunks = section.split(/^### /m).map((chunk) => chunk.trim()).filter(Boolean);
  const faqs: { question: string; answer: string }[] = [];

  for (const chunk of chunks) {
    const newline = chunk.indexOf("\n");
    const question = (newline === -1 ? chunk : chunk.slice(0, newline)).trim();
    const answer = stripMarkdown(newline === -1 ? "" : chunk.slice(newline + 1));
    if (question && answer) faqs.push({ question, answer });
  }

  return faqs;
}

export function inferTownFromPost(post: BlogPost): { name: (typeof PLACE_NAMES)[number]; slug: string } | null {
  const haystack = `${post.slug.replace(/-/g, " ")} ${post.title}`.toLowerCase();
  const hits = PLACE_NAMES.filter((name) => haystack.includes(name.toLowerCase()));
  if (hits.length !== 1) return null;
  return { name: hits[0], slug: PLACE_SLUGS[hits[0]] };
}

export function relatedBlogPosts(post: BlogPost, limit = 2): BlogPost[] {
  const postTokens = tokenize(`${post.title} ${post.slug} ${post.category}`);
  const town = inferTownFromPost(post);

  return blogPosts
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const candidateTokens = tokenize(`${candidate.title} ${candidate.slug} ${candidate.category}`);
      let overlap = 0;
      for (const token of postTokens) {
        if (candidateTokens.has(token)) overlap += 1;
      }
      const categoryBoost = candidate.category === post.category ? 2 : 0;
      const relatedTown = inferTownFromPost(candidate);
      const townBoost = town && relatedTown && town.slug === relatedTown.slug ? 8 : 0;
      return { candidate, score: categoryBoost + townBoost + overlap * 3 };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score || b.candidate.date.localeCompare(a.candidate.date))
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export const blogPosts: BlogPost[] = [
  {
    slug: "hamptons-fall-2026-contracts-inventory",
    title: "The Hamptons Fall 2026 Pipeline: Where Contracts Are Clearing, and Where Inventory Waits",
    excerpt:
      "Twenty-six contracts since September 1 against 210 active listings, Southampton to East Hampton: where the fall market is clearing by price band and village, and why the $50 million shelf is waiting.",
    date: "2026-10-08",
    dateModified: "2026-10-08",
    author: "Barry McGovern",
    category: "Market Research",
    image: "/images/hero-waterfront.jpg",
    authorBox: true,
    hideCta: true,
    about: ["Southampton", "Water Mill", "Bridgehampton", "Sagaponack", "Wainscott", "East Hampton"],
    keywords:
      "Hamptons real estate fall 2026, Hamptons contracts, Hamptons inventory, Southampton real estate, East Hampton real estate, Bridgehampton, Water Mill, Sagaponack, luxury market by price",
    metaDescription:
      "Hamptons fall 2026: 26 contracts since September 1 against 210 active listings, Southampton to East Hampton, by price band and village, plus the $50M+ shelf.",
    content: `
## Key Takeaways

- On October 6, 2026, I reviewed **210 active listings** and **61 listings in contract** in MLS listing data across Southampton, Water Mill, Bridgehampton, Sagaponack, Wainscott, and East Hampton. The active set carries **$3.31 billion** in asking prices, with a **median ask of $7.93 million**.
- **Twenty-six listings went into contract between September 1 and October 5**, 21 of them in September, with an aggregate last asking price of **$267.7 million** and a **median of $9.33 million**.
- **No contract signed since September 1 carried an ask of $25 million or more.** The three largest, 672 Halsey Lane, 134 Wyandanch Lane, and 8 Squabble Lane, were each asking just under $25 million.
- The **$10 million to $20 million band is the tightest in the market**: nine new contracts against 45 active listings, or about **six months of supply** at the fall pace, against roughly nine months for the market as a whole.
- The top of the shelf is waiting. **Nine listings at $50 million and above** account for **$876 million, or 26 percent of all asking dollars**, while representing 4 percent of listings. None of the contracts in this set signed since June 1 was asking $50 million or more.
- In every price band with recent contracts, the homes that went to contract carried a **higher median asking price per square foot** than the homes still for sale. Buyers are paying for setting and finish, not for size.

## The Season After the Season

September on the South Fork has its own light. The traffic on Montauk Highway thins, the farm stands stack pumpkins where the corn stood, and the privet along Halsey Lane and Further Lane holds its color well into October. It is also when serious buyers do their work. The summer renter has gone home, the houses are quiet enough to see properly, and the sellers who listed in spring have had a full season to reconsider their numbers.

This report looks at what the fall market is actually doing: which homes are going to contract, at what asking prices, and how that compares with the inventory still on offer. The answer is a market moving with real conviction in the middle and upper middle, and a top shelf that remains largely a matter of patience.

## The Data

The report draws on MLS listing data captured on October 6, 2026: 210 active residential listings with a published asking price and 61 listings in contract, across the six markets from Southampton east to East Hampton. Listings that appeared more than once, whether through co-listings or a parcel offered both alone and as part of a larger package, are counted once. Contract prices are not public until a sale closes, so every contract figure here is the last asking price. Contract activity runs from September 1 through October 5, the latest contract date in the data.

## The Fall Pipeline by Price

| Price band | Active listings | Share of asking dollars | Contracts, Sep 1 to Oct 5 | Listings per new contract | Months of supply at fall pace |
| --- | ---: | ---: | ---: | ---: | ---: |
| Under $5M | 68 | 6.5% | 9 | 7.6 | 8.7 |
| $5M to $10M | 48 | 10.3% | 4 | 12.0 | 13.8 |
| $10M to $20M | 45 | 19.4% | 9 | 5.0 | 5.8 |
| $20M to $50M | 40 | 37.4% | 4 | 10.0 | 11.5 |
| $50M and above | 9 | 26.4% | 0 | n/a | n/a |
| **All bands** | **210** | **100%** | **26** | **8.1** | **9.3** |

Three observations. First, the $10 million to $20 million band is where the fall market is clearing. Nine contracts in five weeks against 45 listings is the tightest ratio of any band, and if the pace holds the current list would be absorbed in roughly six months. Second, the $5 million to $10 million band is the softest by this measure, with twelve listings for every new contract, a sign that buyers in that range are finding choice and taking their time. Third, demand fades sharply above $25 million. Thirteen of the 26 fall contracts were asking between $10 million and $25 million, half of all activity, from a range that holds 56 listings, about a quarter of the inventory.

## Contracts Signed Since September 1

| Contract date | Property | Village | Last ask | Acres |
| --- | --- | --- | ---: | ---: |
| Sep 30 | 672 Halsey Lane | Bridgehampton | $24,995,000 | 6.00 |
| Sep 17 | 134 Wyandanch Lane | Southampton | $24,995,000 | 3.32 |
| Sep 17 | 8 Squabble Lane | Southampton | $24,950,000 | 2.50 |
| Sep 14 | 501 Parsonage Lane | Sagaponack | $22,000,000 | 1.50 |
| Sep 25 | 5 Spaeth Lane | East Hampton | $19,900,000 | 2.60 |
| Oct 5 | 179 Davids Lane | Water Mill | $15,995,000 | 1.50 |
| Oct 1 | 522 Wickapogue Road | Southampton | $14,695,000 | 1.05 |
| Sep 24 | 63 Newlight Lane | Bridgehampton | $11,995,000 | 1.50 |
| Sep 30 | 37 Cross Highway | East Hampton | $11,995,000 | 1.86 |
| Sep 25 | 381 Further Lane | East Hampton | $11,250,000 | 1.94 |
| Sep 22 | 399 Further Lane | East Hampton | $10,900,000 | 2.04 |
| Sep 21 | 357 Town Line Road | Sagaponack | $10,400,000 | 2.20 |

*Also in contract: an undisclosed Bridgehampton address on 8.23 acres, asking $11.5 million.*

The list reads like a map of the estate sections. Two contracts in Southampton's estate area, on Wyandanch Lane and Squabble Lane, were signed on the same day. Two more are on Further Lane in East Hampton, signed three days apart. Halsey Lane, Parsonage Lane, Wickapogue Road, and Town Line Road fill out the list. Most are established addresses on one to six acres, priced within reach of the buyers who are active, rather than trophy offerings priced for the exceptional buyer.

## The Top of the Shelf

| Property | Village | Asking price | Acres |
| --- | --- | ---: | ---: |
| 75 & 69 West End Road | East Hampton | $165.0M | 8.22 |
| 39 Fairfield Pond Lane | Sagaponack | $152.5M | 4.00 |
| 95 Down East Lane | Southampton | $124.0M | 4.77 |
| 100 & 90 Briar Patch Road | East Hampton | $85.0M | 11.20 |
| 635 Daniels Lane | Sagaponack | $79.5M | 5.18 |
| 21 Fairfield Pond Lane | Sagaponack | $75.0M | 2.11 |
| 125 Dune Road | Bridgehampton | $69.0M | 1.20 |
| 140 Hayground Cove Road | Water Mill | $68.0M | 2.80 |
| 795 Ocean Road | Bridgehampton | $58.0M | 4.50 |

Nine listings at $50 million and above total $876 million in asking prices. Across all 38 listings at $25 million and above, the total is $1.85 billion, or 56 percent of every asking dollar in the market. Against that, the pipeline holds four contracts at $25 million or more, and all four were signed before September: 137 Murray Lane at $44.5 million (July 24), 167 Dune Road at $42.5 million (January 28), 160 Wyandanch Lane at $38.0 million (June 12), and 107 Georgica Road at $29.995 million (August 10).

This is not a sign of weakness at the top so much as a reminder of how that segment trades. Nine-figure and high eight-figure houses rarely sell in a single season, and they rarely sell at their first ask. They tend to trade privately, often after a price adjustment, and often to a buyer who has watched the house for a year or more.

## Village by Village

| Village | Active listings | Median ask, active | Contracts, Sep 1 to Oct 5 | Median ask, new contracts | Listings per new contract | Total in contract |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Southampton | 95 | $5.00M | 12 | $3.20M | 7.9 | 26 |
| East Hampton | 37 | $7.90M | 6 | $11.08M | 6.2 | 10 |
| Water Mill | 29 | $13.00M | 2 | $12.12M | 14.5 | 4 |
| Bridgehampton | 23 | $15.00M | 3 | $12.00M | 7.7 | 10 |
| Wainscott | 16 | $7.45M | 1 | $3.90M | 16.0 | 5 |
| Sagaponack | 10 | $23.50M | 2 | $16.20M | 5.0 | 6 |

**Southampton.** The deepest market by count, with 95 active listings and twelve fall contracts. Activity runs on two tracks: homes asking between $999,000 and $4.3 million, which made up eight of the twelve, and the estate area, where houses on Wyandanch Lane, Squabble Lane, and Wickapogue Road all went to contract.

**East Hampton.** The strongest fall showing relative to supply among the larger markets: six contracts against 37 listings, with a median contract ask of $11.08 million, above the village's median active ask of $7.90 million. Buyers here are reaching up for the right house, including the two Further Lane contracts.

**Water Mill.** Twenty-nine listings at a $13.00 million median ask, and two fall contracts, at 179 Davids Lane and 25 Swans Neck Lane. Among the four larger markets it has the most listings per new contract, at 14.5, reflecting a deep offering of estates on Cobb Isle Road, Jule Pond Drive, and Hayground Cove Road. Its largest offerings also include 70 and 71 Cobb Lane, exclusively listed with Hedgerow, at $42.5 million and $39.95 million.

**Bridgehampton.** A $15.00 million median ask and ten listings in contract in total, tied with East Hampton for the second-largest pipeline after Southampton. 672 Halsey Lane, on six acres, shares the top fall contract ask in the data at $24,995,000. 351 Jobs Lane, a Hedgerow listing, went to contract on July 31 at a last ask of $9.65 million.

**Wainscott and Sagaponack.** Small samples at opposite ends. Wainscott has sixteen listings and one fall contract. Sagaponack, with ten listings at a $23.50 million median ask, recorded two contracts, at 501 Parsonage Lane and 357 Town Line Road, and holds three of the nine listings at $50 million and above.

## What Buyers Are Paying For

| Price band | Active: median ask per sq ft | In contract since June 1: median ask per sq ft |
| --- | ---: | ---: |
| Under $5M | $1,114 | $1,272 |
| $5M to $10M | $1,374 | $1,794 |
| $10M to $20M | $1,768 | $1,874 |
| $20M to $50M | $3,367 | $3,638 |

*Reflects listings reporting at least 1,000 square feet of interior area: 165 active listings and 40 contracts.*

In every band, the homes that went to contract were asking more per square foot than the homes that remain. The gap is widest between $5 million and $10 million, at $1,794 against $1,374. The houses that are selling are not the largest for the money. They are the better located, better finished, and more efficiently planned, and buyers are willing to pay a premium per foot to get them.

## What Drives the Fall Market

- **Price discipline below $25 million.** Every fall contract was asking under $25 million, and three were asking within $50,000 of it. Sellers who priced to the active buyer pool found it.
- **Established addresses.** Further Lane, Wyandanch Lane, Halsey Lane, and Parsonage Lane account for five of the thirteen fall contracts asking $10 million or more.
- **Quality over size.** Contract homes carried higher asking prices per square foot than active listings in every band.
- **A quieter season to buy.** With summer traffic gone, buyers can see a house, its land, and its neighbors clearly, and fall contract activity reflects that.

## Risk Factors

- **Asking is not price.** Contract figures here are last asking prices. Final sale prices are recorded only at closing and may differ.
- **Short window.** Five weeks of contracts is a small sample; within a single band, two or three deals can change the picture.
- **Thin top.** With no contracts at $50 million and above in the current pipeline, pricing at the very top rests on asking prices rather than trades.
- **Seasonal withdrawals.** Unsold listings are often taken off the market after the season and relisted in spring, which can make winter inventory appear leaner than underlying supply.

## Outlook

I expect the $10 million to $25 million range to keep leading through year-end, supported by well-priced houses on established streets and a buyer pool that has shown it will act in the fall. The $5 million to $10 million band has room to absorb, and sellers there will compete on condition and price. At the top, the $876 million shelf at $50 million and above will clear the way it usually does: slowly, privately, and at the margin through price.

## Considerations

**For buyers:** the strongest negotiating position is in the $5 million to $10 million band and above $25 million, where listings outnumber recent contracts by ten to one or more. Between $10 million and $20 million, well-priced houses are moving, and hesitation has a cost.

**For sellers:** the fall data reward pricing to the buyer who is active today. Homes that went to contract were priced within reach of that buyer and asked more per foot for better houses, not more in total for larger ones.

## Frequently Asked Questions

### How many Hamptons homes went into contract in fall 2026?

Across Southampton, Water Mill, Bridgehampton, Sagaponack, Wainscott, and East Hampton, 26 listings went into contract between September 1 and October 5, 2026, 21 of them in September. Their aggregate last asking price was $267.7 million, with a median of $9.33 million.

### Which Hamptons price range is selling fastest in fall 2026?

The $10 million to $20 million range. It recorded nine contracts against 45 active listings, about five listings per new contract, or roughly six months of supply at the fall pace, compared with about nine months for the market overall.

### Are $50 million Hamptons homes selling?

Nine listings at $50 million and above were active on October 6, 2026, totaling $876 million, or 26 percent of all asking dollars. None of the contracts in this data signed since June 1 was asking $50 million or more, and the largest fall contract was asking $24,995,000.

### How much Hamptons inventory is on the market in fall 2026?

On October 6, 2026, 210 active listings from Southampton to East Hampton carried $3.31 billion in asking prices, with a median ask of $7.93 million. At the fall contract pace, that represents about nine months of supply.

### Which Hamptons village has the most inventory relative to demand?

Wainscott, with 16 listings and one fall contract, and Water Mill, with 29 listings and two. Sagaponack and East Hampton were the tightest, at five and about six listings per new contract.

### Why are contract prices shown as asking prices?

In New York, the agreed price on a contract is not public until the sale closes and the deed is recorded. Each contract in this report is shown at its last asking price.

---

*Source: MLS listing data, active and in-contract listings, Southampton to East Hampton, captured October 6, 2026.*
    `,
  },
  {
    slug: "hamptons-oceanfront-market-2021-2026",
    title: "Hamptons Oceanfront, 2021 to 2026: Scarcity, Price, and the Shape of the Market",
    excerpt:
      "Eighty-seven oceanfront sales from Southampton to Montauk since 2021: year-by-year medians, village detail, repeat sales, price per foot of frontage, scarcity, and the risks that shape value.",
    date: "2026-10-07",
    dateModified: "2026-10-07",
    author: "Barry McGovern",
    category: "Market Research",
    image: "/images/67-surfside.jpg",
    authorBox: true,
    hideCta: true,
    about: ["Southampton", "Water Mill", "Bridgehampton", "Sagaponack", "Wainscott", "East Hampton", "Amagansett", "Montauk"],
    keywords:
      "Hamptons oceanfront, oceanfront real estate, Southampton oceanfront, East Hampton oceanfront, Montauk oceanfront, price per foot of frontage",
    metaDescription:
      "Hamptons oceanfront, Southampton to Montauk, 2021 to 2026: 87 sales, a $24.5M median, village data, price per foot of frontage, and key risks.",
    content: `
## Key Takeaways

- From January 2021 through early October 2026, I identified **87 oceanfront sales** between Southampton and Montauk, totaling approximately **$2.61 billion**, with a **median price of $24.5 million**.
- The annual median moved from **$22.5 million in 2021** to **$26.25 million in 2025**. The **seven sales recorded so far in 2026** carry a median of **$43.5 million**, led by four trades at $43.5 million or more.
- Nine-figure trades remain rare. There were three in the period: 90 Jule Pond Drive at $105 million (2021), 700 Meadow Lane at $112.5 million (2023), and 408 Further Lane at $115 million (2025).
- Location within the shoreline matters more than the shoreline itself. East Hampton carries the highest village median at **$48.5 million** across 14 sales. Amagansett and Montauk carry the lowest, at **$9.5 million** across 14 and **$10.8 million** across 22.
- Turnover is thin. Of roughly **330 mapped oceanfront parcels** between Southampton Village and the Further Lane stretch, **15 changed hands in 2025**, about 4.5 percent.
- Where frontage is documented, recent trades priced between roughly **$171,000 and $320,000 per foot of beach**.
- Hedgerow Exclusive Properties, the boutique firm I work with, was involved in **18 of these transactions**, about **$687 million**, or roughly a quarter of the period's dollar volume.

## The Shoreline

The Atlantic edge of the South Fork is one continuous line of sand, from the inlet at Shinnecock to the bluffs below Montauk Point, yet it does not behave as one market. On Meadow Lane the barrier beach narrows to a ribbon between ocean and bay, and the houses sit low behind the primary dune. In Water Mill and Bridgehampton the land opens onto Mecox and Sagaponack ponds, and the late light settles across water on two sides. East of Georgica, the shingled houses of the estate section stand behind privet and old dune grass, set back as if by convention. Beyond Napeague the coast rises, the architecture grows quieter, and the views turn severe.

For an owner, the appeal is elemental: surf audible at night, a private path through the dune, a horizon no neighbor can interrupt. For an investor, the same qualities become something more measurable. True oceanfront is a fixed-supply asset, regulated at every turn, with a buyer pool that is narrow, global, and patient. This study approaches it with the discipline one would bring to any scarce asset.

## The Data

The study covers single-family oceanfront sales, including multi-parcel assemblages, from Southampton Village to Montauk, January 2021 through early October 2026. It draws on MLS comparable sales, recorded deed transfers, Hedgerow's records of oceanfront trades, and a parcel-level map of lots that reach the beach or dune. Condominiums, cottage units, and municipal purchases are excluded, and 2026 runs through early October.

## Year-by-Year Trend

| Year | Sales | Median price | Highest sale | Median $/sq ft* |
| --- | ---: | ---: | --- | ---: |
| 2021 | 21 | $22.50M | 90 Jule Pond Drive, Water Mill, $105.0M | $4,920 |
| 2022 | 14 | $18.20M | 153 Lily Pond Lane, East Hampton, $84.5M | $6,945 |
| 2023 | 7 | $28.00M | 700 Meadow Lane, Southampton, $112.5M | $4,667 |
| 2024 | 14 | $19.88M | 90 & 100 Lily Pond Lane, East Hampton, $52.0M | $3,933 |
| 2025 | 24 | $26.25M | 408 Further Lane, Amagansett, $115.0M | $4,766 |
| 2026 YTD | 7 | $43.50M | 43 East Dune Lane, East Hampton, $72.0M | $5,094 |
| **2021 to 2026** | **87** | **$24.50M** | 408 Further Lane, $115.0M | **$4,795** |

*Price per square foot reflects the 60 sales with reported interior area.*

{{chart:oceanfront-by-year}}

Three observations. First, for five years the median held in a band of roughly $18 million to $28 million; the market has been durable rather than explosive. Second, the 2026 median rests on seven sales, four of them at $43.5 million or more: 43 East Dune Lane ($72.0 million), 115 Beach Lane ($59.0 million), 9 West Dune Lane ($45.0 million), and 55 Dunes Lane ($43.5 million). That is a meaningful signal of depth at the top, but not yet a trend. Third, the share of sales at $40 million or above was 29 percent in 2021, 14 percent in 2024, and 29 percent in 2025.

## Village by Village

| Village | Sales 2021 to 2026 | Median | Range | Median $/sq ft | Notable sale |
| --- | ---: | ---: | --- | ---: | --- |
| Southampton | 15 | $33.75M | $16.4M to $112.5M | $4,544 | 700 Meadow Lane, $112.5M (2023) |
| Water Mill | 3 | $20.00M | $14.5M to $105.0M | n/a (thin) | 90 Jule Pond Drive, $105.0M (2021) |
| Bridgehampton | 9 | $28.50M | $17.5M to $58.0M | $5,794 | 165 Surfside Drive, $58.0M (2025) |
| Sagaponack | 4 | $14.38M | $7.25M to $46.5M | $6,674 | 35 Potato Road & 543 Daniels Lane, $46.5M (2022) |
| Wainscott | 6 | $28.75M | $22.5M to $59.0M | $4,340 | 115 Beach Lane, $59.0M (2026) |
| East Hampton | 14 | $48.50M | $15.0M to $84.5M | $5,921 | 43 East Dune Lane, $72.0M (2026) |
| Amagansett | 14 | $9.50M | $5.85M to $115.0M | $4,042 | 408 Further Lane, $115.0M (2025) |
| Montauk | 22 | $10.83M | $5.8M to $25.0M | $3,062 | 42 Old Montauk Highway, $25.0M (2022) |

{{chart:oceanfront-by-village}}

**Sales by year**

| Village | 2021 | 2022 | 2023 | 2024 | 2025 | 2026 YTD |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| Southampton | 3 | 3 | 2 | 2 | 3 | 2 |
| Water Mill | 1 | 1 | 0 | 1 | 0 | 0 |
| Bridgehampton | 1 | 1 | 0 | 2 | 5 | 0 |
| Sagaponack | 1 | 1 | 0 | 1 | 1 | 0 |
| Wainscott | 3 | 0 | 0 | 1 | 1 | 1 |
| East Hampton | 2 | 1 | 2 | 2 | 5 | 2 |
| Amagansett | 2 | 3 | 0 | 2 | 6 | 1 |
| Montauk | 8 | 4 | 3 | 3 | 3 | 1 |

**[Southampton](/southampton).** The deepest run of comparable trades on the coast, concentrated on Meadow Lane and Gin Lane. Hedgerow and I were involved in the off-market sale of 40 Meadow Lane in 2021 and the paired sale of 1080 and 1100 Meadow Lane in 2022. In 2025 and 2026 to date, five sales carried a median of $32.0 million.

**[Water Mill](/water-mill) and [Sagaponack](/sagaponack).** Too few trades for a stable median. Each village is defined by a handful of large, pond-and-ocean parcels; individual sales should be valued on their own facts.

**[Bridgehampton](/bridgehampton).** Five sales in 2025, the most active year in the village, led by two modern estates on Surfside Drive and Mid Ocean Drive at $58.0 million and $57.0 million. Three of the five, at 67, 79, and 165 Surfside Drive, were Hedgerow transactions.

**[Wainscott](/wainscott).** Beach Lane sets the market, and it has moved: 115 Beach Lane traded at $45.0 million in 2021 and $59.0 million in 2026.

**[East Hampton](/east-hampton).** The estate section commands the highest median on the coast. Lily Pond Lane, Further Lane, and the Dune Lanes account for most of the top of the range.

**[Amagansett](/amagansett).** A divided market. Further Lane and Napeague estates trade at the very top, while most other trades, on Napeague and Marine Boulevard, fell between roughly $6 million and $16 million, with 55 Marine Boulevard at $24.5 million in 2025 the exception. 55 Dunes Lane, which sold in 2026 for $43.5 million, was a Hedgerow transaction.

**[Montauk](/montauk).** The most active and most accessible oceanfront market, with 22 sales and a $10.8 million median. Bluff elevation, beach access, and lot size drive wide dispersion.

## Repeat Sales

Repeat sales of the same property offer the cleanest view of appreciation, because location is held constant.

| Property | First sale | Second sale | Change | Annualized |
| --- | --- | --- | ---: | ---: |
| 115 Beach Lane, Wainscott | $45.0M (Nov 2021) | $59.0M (Mar 2026) | +31.1% | 6.5% |
| 2 Town Line Road, Sagaponack | $7.25M (Feb 2021) | $10.0M (Dec 2025) | +37.9% | 6.9% |
| 67 Surfside Drive, Bridgehampton | $28.5M (May 2021) | $32.0M (Apr 2025) | +12.3% | 3.0% |
| 165 Surfside Drive, Bridgehampton | $24.5M (Dec 2022) | $58.0M (Nov 2025) | +136.7% | Not meaningful (rebuilt) |

For houses that were not rebuilt, annualized gains fell between 3.0 and 6.9 percent. 165 Surfside Drive shows what new construction can add on the same land. Both sales of 67 Surfside Drive, along with the 2025 sales of 165 Surfside Drive and 2 Town Line Road, are trades Hedgerow and I have been involved in.

## Price per Foot of Frontage

Frontage is the most direct measure of what an oceanfront buyer is acquiring, though it is rarely published. Four recent trades have documented frontage:

| Property | Closed | Price | Frontage | Price per foot |
| --- | --- | ---: | ---: | ---: |
| 43 East Dune Lane, East Hampton | Mar 2026 | $72.0M | approx. 225 ft* | approx. $320,000 |
| 55 Dunes Lane, Amagansett | Feb 2026 | $43.5M | approx. 200 ft | approx. $217,500 |
| 33 Lily Pond Lane, East Hampton | Sep 2025 | $31.5M | 171 ft | approx. $184,200 |
| 67 Surfside Drive, Bridgehampton | Apr 2025 | $32.0M | 187 ft | approx. $171,100 |

*Frontage per listing materials.*

33 Lily Pond Lane, 55 Dunes Lane, and 43 East Dune Lane were each Hedgerow transactions.

## Supply and Scarcity

By my parcel count, roughly 330 tax parcels between Southampton Village and the Further Lane stretch reach the ocean beach or dune. That supply cannot grow, and it shrinks at the margin. Several of the period's largest trades were assemblages, including 370 & 372 Further Lane, and 105 & 111 Lily Pond Lane, which consolidate frontage into fewer hands. Public acquisition removes parcels outright: the Town of Southampton acquired 1950 Meadow Lane for $25.8 million in a sale that closed June 30, 2026.

## What Drives Value

- **Frontage and beach width.** More linear feet, and a beach that has held its width, command a premium.
- **Dune and elevation.** A healthy primary dune and higher natural grade protect the house and simplify flood compliance.
- **The house.** New or recently rebuilt, flood-compliant construction trades at a clear premium to older stock, which is often priced as land.
- **Setting.** Estate-section addresses in East Hampton and Southampton price above barrier-beach and bluff locations.
- **Privacy and depth.** Lot depth, mature screening, and the ability to assemble adjoining parcels add value.
- **A second waterfront.** Pond or bay frontage on a second side, as at Jule Pond, is a rare and distinct premium.

## Risk Factors

- **Coastal erosion.** New York's Coastal Erosion Hazard Area rules and local dune setbacks limit what can be built, expanded, or armored near the beach.
- **Flood regulation.** Oceanfront parcels typically fall within FEMA VE or AE flood zones. Height is often measured from base flood elevation, which shapes design, insurance, and lending. Request the flood map panel and elevation certificate early.
- **Permitting.** Village and town codes differ, with gross floor area formulas, sky-plane limits, and Trustee jurisdiction, and approvals can be lengthy.
- **Liquidity.** Seven recorded sales in 2026 to date is a thin market. Ask-to-close gaps can be wide: 90 Jule Pond Drive closed at $105 million after a last ask of $145 million, and 55 Dunes Lane closed at $43.5 million after listing at $49.5 million.
- **Statistical concentration.** With few trades, a single sale can move an annual median materially.

## Outlook

The structural case is unchanged: fixed supply, tightening regulation, and a buyer base whose depth at the top was confirmed again in 2025 and early 2026. I expect pricing leadership to remain with new or recently rebuilt houses on wide lots in the estate sections. Older houses on narrow or exposed lots will continue to be underwritten as land, net of coastal risk. Volume will stay uneven, and medians will move with the mix of what trades.

## Hedgerow Oceanfront Transactions

Oceanfront trades Hedgerow and I have been involved in since 2021. Listings and the full sales record are in the [Hedgerow portfolio](/sales).

| Closed | Property | Village | Price | Hedgerow's role |
| --- | --- | --- | ---: | --- |
| Spring 2021 | 40 Meadow Lane | Southampton | $42.92M | Both sides |
| May 2021 | 67 Surfside Drive | Bridgehampton | $28.5M | Buyer side |
| Aug 2021 | 90 Jule Pond Drive | Water Mill | $105.0M | Advised seller side |
| Dec 2021 | 442 Further Lane | East Hampton | $55.0M | Listing |
| May 2022 | 35 Potato Road & 543 Daniels Lane | Sagaponack | $46.5M | Buyer side |
| May 2022 | 55 Marine Boulevard | Amagansett | $9.0M | Both sides |
| Jul 2022 | 1080 & 1100 Meadow Lane | Southampton | $66.25M | Both sides |
| Oct 2022 | 42 Old Montauk Highway | Montauk | $25.0M | Both sides |
| Dec 2023 | 42 Old Montauk Highway | Montauk | $18.5M | Both sides |
| Jan 2024 | 22 Shore Road | Amagansett | $6.43M | Listing |
| Dec 2024 | 44 Deforest Road | Montauk | $9.0M | Both sides |
| Apr 2025 | 67 Surfside Drive | Bridgehampton | $32.0M | Both sides |
| Sep 2025 | 33 Lily Pond Lane | East Hampton | $31.5M | Listing |
| Nov 2025 | 79 Surfside Drive | Bridgehampton | $28.0M | Both sides |
| Nov 2025 | 165 Surfside Drive | Bridgehampton | $58.0M | Advised buyer side |
| Dec 2025 | 2 Town Line Road | Sagaponack | $10.0M | Listing |
| Feb 2026 | 55 Dunes Lane | Amagansett | $43.5M | Listing |
| Mar 2026 | 43 East Dune Lane | East Hampton | $72.0M | Co-listing |

Together these 18 transactions total about $687 million, roughly a quarter of the dollar volume in this dataset.

## Considerations

**For buyers:** underwrite the parcel before the house. Confirm surveyed frontage, dune condition, flood zone, and permit history, and benchmark against true oceanfront trades rather than ocean-view comparables.

**For sellers:** price to documented frontage and condition. The data show that buyers pay for completeness, and that unsupported asks tend to close well below the list.

## Frequently Asked Questions

### What does oceanfront cost in the Hamptons in 2026?

Seven oceanfront sales recorded through early October 2026 carry a median of $43.5 million, ranging from $10.75 million in Montauk to $72.0 million in East Hampton. Across 2021 to 2026, the median is $24.5 million on 87 sales.

### Which Hamptons village has the most expensive oceanfront?

East Hampton, with a median of $48.5 million across 14 sales since 2021. The highest single sale of the period was 408 Further Lane in Amagansett at $115 million in 2025.

### Where is oceanfront most accessible?

Montauk and the Napeague stretch of Amagansett. Montauk recorded 22 sales since 2021 at a median of $10.8 million; Amagansett recorded 14 at a median of $9.5 million, although Further Lane sales there reach far higher.

### What does oceanfront cost per foot of frontage?

In four recent trades with documented frontage, roughly $171,000 to $320,000 per linear foot.

### Have Hamptons oceanfront prices risen since 2021?

The annual median rose from $22.5 million in 2021 to $26.25 million in 2025. Repeat sales of houses that were not rebuilt show annualized gains of 3.0 to 6.9 percent.

### Which Hamptons oceanfront trades has Hedgerow Exclusive been involved in?

Hedgerow Exclusive, the boutique firm I work with, has been involved in 18 oceanfront trades since 2021 totaling about $687 million, including 90 Jule Pond Drive ($105 million, 2021), 43 East Dune Lane ($72 million, 2026), 165 Surfside Drive ($58 million, 2025), and 55 Dunes Lane ($43.5 million, 2026).

### What are the main risks of buying oceanfront?

Coastal erosion rules, FEMA flood regulation, multi-agency permitting, and thin liquidity.

---

*Sources: MLS comparable sales, recorded deed transfers, and parcel-level oceanfront mapping, January 2021 to early October 2026. Village reports are on the [Market](/market) page.*
    `,
  },
  {
    slug: "bridgehampton-non-water-market-overview-2026-09",
    title: "Bridgehampton Non-Water Luxury Real Estate Market Overview 2026",
    excerpt:
      "Bridgehampton non-water solds over roughly three years run about $9.25M-$30M. South of Montauk Highway still owns the top, while finished new construction north of the highway has cleared the mid-teens and higher.",
    date: "2026-09-20",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/press/bridgehampton-50m.jpg",
    metaDescription:
      "Bridgehampton non-water comps: south of the highway still leads, while north-of-highway new construction prints $10M to $20.5M. By Barry McGovern.",
    content: `
## Bridgehampton Non-Water Luxury: South Still Leads, North New Construction Prints High

Bridgehampton remains one of the East End's deepest ultra-luxury non-water markets. Over roughly the past three years, closed sales in this set run from about **$9.25 million to $30 million**. Pricing still moves hard with location relative to Montauk Highway, acreage, condition, and how finished the house actually is.

Barry McGovern, a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020, tracks these Bridgehampton comps for buyers and sellers who need a clear North-of-highway versus South-of-highway read, not brochure language.

Buyers often focus on the **$10 million to $15 million** band. That slice is real and active. The fuller set below shows why context still matters: South of the highway continues to own the absolute top of the market, while finished new construction **north of Montauk Highway** has cleared very strong numbers more than once when size, land, and quality line up.

## What Is the Bridgehampton Non-Water Market Doing?

The market is active and selective. South of Montauk Highway still sets the ceiling: estate-section scale, ocean-road adjacency, and trophy finished product continue to print the highest closes in this non-water set. North of the highway is no longer a soft alternative by default. Recent new construction with real square footage and acreage has cleared the mid-teens and higher, which is the clearest signal in the current tape for buyers shopping that geography.

Condition and completeness still separate outcomes inside the same street network. Larger lots, newer builds, and houses that feel fully done trade differently from thinner renovations or land-weighted packages at similar asking levels.

## North of Montauk Highway: New Construction Is Getting Paid

The useful story for many $10M-$15M buyers is north of the highway. Quality and scale are getting paid for. Named examples from this sold set:

- **1953 Scuttle Hole Road** at **$20,500,000** (November 2024): large new construction on meaningful acreage.
- **14 Two Trees Lane** at **$15,000,000** (May 2026).
- **261 Millstone Road** at **$14,650,000** (January 2026) and **263 Millstone Road** at **$14,250,000** (May 2025): paired Millstone new-construction outcomes in the mid-teens.
- **361 Mitchell Lane** at **$11,100,000** (April 2026) and **279 Mitchell Lane** at **$11,000,000** (May 2024).
- **825 Old Sag Harbor Road** at **$10,400,000** (February 2026).
- **1164 Scuttle Hole Road** at **$10,250,000** (February 2024).
- Also in the north set: **85 Pheasant Drive** ($9,999,500) and **418 Butter Lane** ($9,450,000).

Read together, these closes show that north of Montauk Highway is not capped at a soft mid-market band when the house is new, large, and finished. That is the point buyers underwriting Scuttle Hole, Millstone, Mitchell, Old Sag Harbor Road, and nearby streets should not miss.

## South of Montauk Highway: Still Owns the Top

South of the highway still owns the top of this non-water set. Recent examples include **1240 Ocean Road** at **$30,000,000**, **72 Highland Terrace** at **$24,300,000**, **104 Quimby Lane** at **$22,150,000**, plus a run of Jobs Lane, Surfside, Matthews, Sagaponack Road, and Mecox-area closes from the mid-teens through the high teens. Absolute top-of-market pricing remains a South-of-highway conversation first.

## Non-Water Sales Snapshot, Three Years

Recent Bridgehampton non-water sales, each tagged **North of highway** or **South of highway** (Montauk Highway).

| Address | Sold | Date | Bd | Ba | SF | Acres | North / South of Highway |
| --- | ---: | --- | ---: | ---: | ---: | ---: | --- |
| 1240 Ocean Road | $30,000,000 | 1/1/23 | 8 | 9.5 | 9,990 | 1.40 | South of highway |
| 72 Highland Terrace | $24,300,000 | 7/31/23 | 10 | 10F/4H | 14,000 | 2.02 | South of highway |
| 104 Quimby Lane | $22,150,000 | 4/28/26 | 8 | 10F/2H | 12,500 | 3.07 | South of highway |
| 1953 Scuttle Hole Road | $20,500,000 | 11/1/24 | 9 | 11F/2H | 15,206 | 4.14 | North of highway |
| 201 Jobs Lane | $18,100,000 | 10/23/23 | 7 | 9F/2H | 7,687 | 1.50 | South of highway |
| 70 Matthews Lane | $17,250,000 | 9/24/25 | 7 | 9.5 | 11,590 | 1.08 | South of highway |
| 201 Sagaponack Road | $17,000,000 | 12/14/23 | 8 | 10F/3H | 11,100 | 1.40 | South of highway |
| 228 Surfside Drive | $16,650,000 | 1/27/25 | 9 | 11.5 | 11,176 | 1.20 | South of highway |
| 134 Kellis Pond Lane | $15,700,000 | 9/29/25 | 9 | 9.5 | 10,850 | 1.00 | South of highway |
| 99 Pointe Mecox Lane | $15,600,000 | 6/5/26 | 6 | 7.5 | 7,800 | 0.92 | South of highway |
| 284 Ocean Road | $15,100,000 | 11/18/25 | 4 | 4.5 | 3,802 | 3.70 | South of highway |
| 14 Two Trees Lane | $15,000,000 | 5/28/26 | 8 | 8.5 | 7,065 | 1.84 | North of highway |
| 385 Jobs Lane | $14,750,000 | 6/3/24 | 7 | 7.5 | 6,500 | 1.02 | South of highway |
| 261 Millstone Road | $14,650,000 | 1/30/26 | 9 | 10F/2H | 12,125 | 2.50 | North of highway |
| 41 Harvest Lane | $14,467,500 | 3/3/26 | 8 | 8F/2H | 9,300 | 1.80 | South of highway |
| 263 Millstone Road | $14,250,000 | 5/9/25 | 9 | 11F/2H | 12,400 | 2.50 | North of highway |
| 53 Matthew's Lane | $13,490,000 | 10/3/24 | 5 | 6.5 | 4,928 | 1.50 | South of highway |
| 93 Jobs Lane | $13,200,000 | 10/16/24 | 6 | 6.5 | 6,119 | 2.30 | South of highway |
| 637 Halsey Lane | $12,850,000 | 5/23/25 | 8 | 8F/2H | 9,500 | 0.93 | South of highway |
| 33 Jobs Lane | $11,500,000 | 10/30/24 | 7 | 10F/2H | 8,543 | 0.92 | South of highway |
| 9 Cody Way | $11,450,000 | 5/19/25 | 9 | 10.5 | 10,000 | 1.30 | South of highway |
| 361 Mitchell Lane | $11,100,000 | 4/17/26 | 7 | 9F/3H | 11,100 | 1.00 | North of highway |
| 279 Mitchell Lane | $11,000,000 | 5/17/24 | 7 | 9F/3H | 9,600 | 1.00 | North of highway |
| 914 Ocean Road | $10,800,000 | 10/30/24 | 7 | 5.5 | 7,000 | 2.15 | South of highway |
| 38 West Pond Drive | $10,600,000 | 10/19/23 | 8 | 8.5 | 8,500 | 1.11 | South of highway |
| 6 Dannielles Way | $10,400,000 | 5/9/24 | 8 | 9F/4H | 7,600 | 1.65 | South of highway |
| 825 Old Sag Harbor Road | $10,400,000 | 2/9/26 | 9 | 10F/2H | 12,391 | 2.10 | North of highway |
| 253 Sagaponack Road | $10,400,000 | 5/28/26 | 3 | 2 | 3,876 | 3.09 | South of highway |
| 946 Ocean Road | $10,300,000 | 4/24/26 | 5 | 3.5 | 2,300 | 3.00 | South of highway |
| 1076 Ocean Road | $10,300,000 | 9/15/26 | 6 | 6.5 | 5,000 | 1.02 | South of highway |
| 1164 Scuttle Hole Road | $10,250,000 | 2/29/24 | 8 | 10.5 | 13,571 | 2.51 | North of highway |
| 558 Ocean Road | $10,100,000 | 9/27/24 | 7 | 7.5 | - | 1.11 | South of highway |
| 6 Cody Way | $10,018,000 | 2/12/26 | 8 | 8F/2H | 9,700 | 1.05 | South of highway |
| 85 Pheasant Drive | $9,999,500 | 8/5/25 | 7 | 8F/2H | 7,693 | 0.92 | North of highway |
| 53 Pauls Lane | $9,850,000 | 1/14/26 | 7 | 7.5 | 10,000 | 1.00 | South of highway |
| 418 Butter Lane | $9,450,000 | 8/26/25 | 7 | 8.5 | 9,772 | 1.00 | North of highway |
| 367 Jobs Lane | $9,250,000 | 5/22/24 | 6 | 6.5 | 5,000 | 1.10 | South of highway |

Read left to right, the table supports the thesis: a deep $9.25M-$30M non-water tape, South of highway dominance at the absolute top, and a real north-of-highway new-construction story from roughly $10M through $20.5M when size and finish are right.

## Takeaways for Buyers and Sellers

- **Fuller set, not only the shopping band.** The practical buyer interest band here is often **$10M-$15M**, but the sold tape runs about **$9.25M-$30M**. Underwrite with the wider set.
- **South of Montauk Highway** still sets the absolute top for Bridgehampton non-water.
- **North of Montauk Highway**, finished new construction with real scale and land has cleared the mid-teens and higher more than once (Scuttle Hole, Millstone, Mitchell, Old Sag Harbor Road).
- **Pricing drivers** remain location relative to the highway, acreage, condition, and how complete the finished house is.

For discreet counsel on Bridgehampton non-water pricing, positioning, or a specific address, Hedgerow Exclusive Properties works the ultra-luxury Hamptons market with that level of granularity.

## FAQ

### What is the price range for recent Bridgehampton non-water luxury sales?

In this roughly three-year sold set, closes run from about $9.25 million to $30 million. Many buyers focus on $10 million to $15 million, but the fuller tape is wider.

### Is South of Montauk Highway still more expensive than North?

At the absolute top, yes. The highest non-water closes in this set are South of the highway. North of the highway can still print very strong numbers, especially for finished new construction with size and land.

### Have north-of-highway Bridgehampton homes sold above $14 million recently?

Yes. Examples include 1953 Scuttle Hole Road at $20.5 million, 14 Two Trees Lane at $15 million, 261 Millstone Road at $14.65 million, and 263 Millstone Road at $14.25 million.

### How should buyers use the $10M-$15M band?

Treat it as a shopping band, not the whole market. Compare north-versus-south highway location, acreage, year/condition, and finished quality against both the band and the wider $9.25M-$30M set.

### Who is Barry McGovern?

Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage that has facilitated over $2 billion in transactions since 2020. More at [hamptonshomes.ai/about](https://hamptonshomes.ai/about) and the editorial profile on [Hamptons Coastal](https://hamptonscoastal.com/about/barry-mcgovern).

## Related

- [Bridgehampton town page](/bridgehampton)
- [The Hedgerow portfolio](/sales)
- [Sag Harbor Village market overview](/blog/sag-harbor-village-market-overview-2026-09)
- [Contact](/contact)
    `,
  },
  {
    slug: "sag-harbor-village-market-overview-2026-09",
    title: "Sag Harbor Village Luxury Real Estate Market Overview 2026",
    excerpt:
      "Sag Harbor Village ultra-luxury shows real depth and a wide price spread. Finished non-waterfront product often clears roughly $5.5M-$8.5M, while waterfront and trophy sales trade on their own terms.",
    date: "2026-09-15",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/press/capote-sagharbor.jpg",
    metaDescription:
      "Sag Harbor Village luxury comps: off-water ~$5.5M-$8.5M, $10M+ trophies, waterfront as a separate market. Barry McGovern, Hedgerow Exclusive Properties.",
    content: `
## Sag Harbor Village Luxury Real Estate: Depth, Spread, and What $10M+ Really Means

Sag Harbor Village remains one of the Hamptons' most layered ultra-luxury markets. It is deep enough to support consistent high-end activity, yet wide enough that two homes a few blocks apart can trade in entirely different price bands. Location within the Village, condition, lot size, water influence, and finish quality still do most of the pricing work.

Barry McGovern of Hedgerow Exclusive Properties, a boutique firm focused on ultra-luxury Hamptons real estate, tracks these Village comps for buyers and sellers who need clarity rather than brochure language. The picture from recent non-waterfront and waterfront sales is straightforward: strong demand for polished product, a clear core luxury range for finished off-water homes, and a thin but real tier of exceptional sales that clear $10 million without waterfront.

## What Is the Sag Harbor Village Luxury Market Doing?

The Village market is active and selective. Buyers continue to pay for new construction, meaningful acreage by Village standards, architectural pedigree, water views, and carefully executed historic renovations. Properties that miss on condition or lot utility tend to sit further from the top of the band, even when the address is desirable.

That selectivity shows up as a wide price spread rather than a single "Village number." Core luxury non-waterfront product generally clusters in a recognizable band, while trophy historic homes, pre-construction, and especially waterfront trade on different logic.

## What Is the Off-Water Price Band?

For good finished product away from the water, the practical core luxury range in Sag Harbor Village is roughly **$5.5 million to $8.5 million**. That is the zone where renovated historic homes, newer luxury builds, and well-finished Village residences most often clear when the package is complete (pool, scale, and location included).

Exceptions go higher. Several non-waterfront sales have now exceeded **$10 million**. Those are trophy or exceptional outcomes (pedigree Main Street addresses, designer-level historic stock, premium Village scale, newer construction with beach proximity, or pre-construction/new development), not as the baseline for ordinary finished Village inventory.

### Non-Waterfront Sales Snapshot

| Address | Sold | Date | Bd | Ba | SF | Acres | Type |
| --- | ---: | --- | ---: | --- | ---: | ---: | --- |
| 186 Main Street | $16,250,000 | 10/15/25 | 7 | 4F/2H | 6,500 | .60 | Trophy Historic / Designer |
| 100 Glover Street | $13,000,000 | 9/24/25 | 5 | 6F/2H | 4,960 | .62 | Pre-Construction / New Development |
| 20 Union Street | $11,800,000 | 9/5/25 | 6 | 4.5 | 5,900 | .34 | Premium Village |
| 100 Bay Street | $11,250,000 | 12/15/25 | 6 | 6F/2H | 5,000 | .50 | Newer Construction · Beach Proximity |
| 232 Main Street | $8,600,000 | 8/15/24 | 5 | 6F/2H | 4,800 | .35 | Newer Luxury · Pool/Pool House |
| 46 Palmer Terrace | $8,250,000 | 5/1/25 | 5 | 4F/2H | - | .89 | Renovated Historic · Large Lot |
| 5 Green Street | $7,500,000 | 2/11/26 | 3 | 3.5 | 2,810 | .14 | Renovated · Harbor Views/Access |
| 6 Union Street | $7,400,000 | 1/24/24 | 5 | 5F/2H | 6,000 | .20 | Historic Village |
| 8 Dartmouth Road | $7,305,000 | 9/3/25 | 6 | 5.5 | 5,985 | .59 | Water Views · Pool |
| 27 Meadowlark Lane | $6,700,000 | 10/14/24 | 4 | 4F/2H | 3,852 | .20 | New Construction / Contemporary |
| 32 Oakland Avenue | $6,320,000 | 8/13/25 | 4 | 3.5 | 2,900 | .79 | Large Village Lot · Pool |
| 3 Taft Place | $6,295,000 | 5/17/24 | 5 | 5F/2H | - | .51 | Bay Views |
| 180 Main Street | $6,250,000 | 7/1/26 | 5 | 4.5 | 3,862 | .35 | Renovated Historic · Pool |
| 7 Somers Place | $6,100,000 | 4/2/26 | 6 | 5 | 5,879 | .57 | Finished Village Estate |
| 26 Suffolk Street | $6,050,000 | 6/13/25 | 4 | 5.5 | 3,858 | .35 | Finished Luxury · Pool |
| 12 Sage Street | $6,000,000 | 5/1/26 | 3 | 4.5 | 3,563 | - | Watchcase Townhouse |
| 52 Glover Street | $5,900,000 | 1/26/23 | 3 | 3.5 | 3,000 | .19 | Village Residence |
| 30 Hampton Street | $5,900,000 | 5/8/25 | 5 | 5 | 4,310 | .28 | Renovated Historic · Pool |
| 22 Latham Street | $5,775,000 | 11/28/25 | 5 | 4.5 | 4,000 | .37 | Renovated Historic · Pool |
| 47 Howard Street | $5,750,000 | 5/5/25 | 4 | 4.5 | 2,825 | .13 | Renovated · Prime Village Location |
| 98 Bay Street | $5,650,000 | 8/29/26 | 4 | 4.5 | 4,500 | .63 | Historic · Pool · Large Lot |
| 27 Grand Street | $5,500,000 | 5/2/23 | 6 | 6.5 | 5,012 | .51 | New Construction |
| 156 Main Street | $5,500,000 | 7/14/23 | 5 | 6.5 | 4,500 | .18 | Fully Renovated Historic |

Read left to right, the table underscores the thesis: depth from the mid-$5Ms through the high-$8Ms for finished Village product, then a distinct step-up for homes that combine address, scale, newness, or design pedigree.

## What Separates $10M+ Non-Waterfront Sales?

Four recent non-waterfront closes illustrate why $10 million-plus is still exceptional rather than expected:

- **186 Main Street** at **$16,250,000**: trophy historic / designer product on a meaningful Village lot.
- **100 Glover Street** at **$13,000,000**: pre-construction / new development, priced for what will be delivered.
- **20 Union Street** at **$11,800,000**: premium Village scale and finish.
- **100 Bay Street** at **$11,250,000**: newer construction with beach proximity.

Shared themes: architectural or address pedigree, stronger lots by Village standards, new or near-new construction quality, and finish that clears the "good" bar into "exceptional." Water views or harbor access can pull a smaller footprint higher (as with renovated stock on Green Street), but waterfront proper remains its own conversation.

## How Does Waterfront Compare?

Sag Harbor Village waterfront is effectively a **separate market**. It is less useful as a comps set for typical off-water Village homes and more useful for land values, dock-capable parcels, and the upper end of Village pricing.

### Waterfront Sales Snapshot

| Address | Sold | Date | Bd | Ba | SF | Acres | Type |
| --- | ---: | --- | ---: | --- | ---: | ---: | --- |
| 53 Glover Street | $21,000,000 | 2/11/25 | 5 | 5.5 | 5,300 | .87 | Trophy Waterfront |
| 8 John Street | $15,518,174 | 5/22/24 | 5 | 6.5 | 4,211 | .41 | New Construction · Waterfront |
| 2 Bluff Point Lane | $13,500,000 | 3/30/23 | 3 | 2.5 | 1,220 | 1.27 | Waterfront |
| 63 Glover Street | $11,500,000 | 6/11/25 | 5 | 4.5 | 4,068 | .60 | Waterfront · Dock · Cottage |
| 37 Glover Street | $10,900,000 | 4/18/24 | 5 | 5F/2H | 5,200 | .85 | Land / Pre-Construction |
| 62 West Water Street | $9,300,000 | 10/14/25 | 5 | 6 | 5,000 | .54 | Finished Waterfront |
| 55 Bluff Point Road | $6,625,000 | 7/22/26 | 4 | 4 | 2,768 | .34 | Waterfront · Dock · Pool |
| 154 Redwood Road | $6,000,000 | 7/18/24 | - | - | - | .72 | Vacant Waterfront Land |

## Takeaways for Buyers and Sellers

- **Core off-water luxury** for finished Sag Harbor Village product still centers on roughly **$5.5M-$8.5M**, with quality, lot, and finish driving where a home sits inside that band.
- **Premium drivers** (new construction, acreage, architectural pedigree, water views, and strong historic renovations) explain most of the upside above that core range.
- **$10M+ non-waterfront** sales are real but exceptional; they are not the Village baseline.
- **Waterfront** should be underwritten on its own comps for land value and the Village's upper end.

For discreet counsel on Sag Harbor Village pricing, positioning, or a specific address, Hedgerow Exclusive Properties works the ultra-luxury Hamptons market with that level of granularity.

## FAQ

### What is the typical luxury price range for non-waterfront homes in Sag Harbor Village?

For good finished product, the core non-waterfront luxury range is roughly $5.5 million to $8.5 million. Homes with new construction, larger lots, architectural pedigree, water views, or exceptional renovations can trade above that band.

### Have non-waterfront Sag Harbor Village homes sold for more than $10 million?

Yes. Recent examples include 186 Main Street ($16,250,000), 100 Glover Street ($13,000,000), 20 Union Street ($11,800,000), and 100 Bay Street ($11,250,000). These are trophy or exceptional outcomes, not the baseline for finished Village inventory.

### How should buyers compare waterfront and off-water Sag Harbor Village sales?

Treat waterfront as a separate market. Waterfront comps are most useful for land values, dock-capable parcels, and upper-end pricing; they should not be used as direct anchors for typical non-waterfront Village homes.

### What factors push Sag Harbor Village prices to the top of the market?

New construction, meaningful acreage by Village standards, architectural pedigree, water views or harbor influence, and high-quality historic renovations are the primary premium drivers.

### Who authored this Sag Harbor Village market overview?

Barry McGovern, a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties, a boutique firm specializing in ultra-luxury Hamptons real estate.

*Sources: MLS and Hedgerow records.*
    `,
  },
  {
    slug: "ai-ipo-wealth-san-francisco-hamptons-market-2026",
    title: "AI IPOs Are Minting a New Wealth Class. San Francisco's High End Is the Tell. The Hamptons Will Feel It.",
    excerpt:
      "OpenAI and Anthropic are lining up public debuts at a scale that dwarfs ordinary IPO history. San Francisco's ultra-luxury end is the tell: about $3,000 a square foot now, with $5,000 in sight. On the East End, oceanfront supply is fixed and the buyer pool only gets richer.",
    date: "2026-09-06",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/hero-waterfront.jpg",
    metaDescription:
      "How AI IPO wealth shows up first in San Francisco ultra-luxury pricing, and why Hamptons oceanfront scarcity is next. Analysis by Barry McGovern.",
    content: `
## The IPO Cycle That Breaks the Scale

Something is happening in public markets that most real estate conversations still treat as background noise.

SpaceX already priced the largest IPO in history in June 2026, raising about $75 billion. That alone is roughly three times Saudi Aramco's old record. OpenAI and Anthropic are next in the queue, with confidential filings in the books and valuation talk in the trillion-dollar range. Analyst estimates put the three-deal cluster near $200 billion in combined proceeds. That is more capital raised than all traditional U.S. IPOs from 2022 through early 2026 combined.

A point circulating from market podcasts this week lands the same idea in plainer English: these AI listings are not ordinary tech debuts. They are wealth events measured against the entire historical IPO stack. Whether you frame one of them as a record in its own right, or so large that everything else looks like a fraction of it, the direction is the same. They mint liquidity at a scale the trophy housing market has never had to absorb from a single industry cohort.

That liquidity does not stay in brokerage accounts forever. It finds irreplaceable real estate.

## San Francisco's High End Is the Tell

Look west if you want the early tape for trophy real estate.

San Francisco's best neighborhoods are already repricing on AI cash, equity, and the anticipation of OpenAI and Anthropic liquidity. At the top of that market, the conversation is price per square foot on true high-end product: currently around $3,000 a foot in the circles that matter, with a credible path toward $5,000 as more AI wealth clears into housing.

That is the signal. Bids over ask. All-cash at the top. Competition for the few houses that clear the taste and location bar. Finite prime inventory meeting a buyer pool with absurd firepower.

Important nuance: a lot of this heat is already here from cash compensation and secondary share sales, before either company has rung the opening bell. The IPOs are not the start of the wealth wave. They are the amplification of a squeeze that is already visible at the ultra-luxury end.

When irreplaceable high-end stock cannot expand as fast as newly liquid AI wealth, price per foot does the adjusting.

## Wealth Is Mobile. Coastline Is Not.

Here is the part that matters for the East End.

San Francisco is where a huge share of this wealth is being created. It is not where all of it will be spent. Newly liquid founders, investors, and senior AI talent already own or want second homes, third homes, and lifestyle hedges outside the Bay. The Hamptons have always been a preferred destination for that exact buyer: finance, tech, media, and anyone who wants ocean, privacy, and proximity to where capital actually lives.

The difference between San Francisco and the Hamptons is structural.

San Francisco can, over long cycles, still invent some high-end product. The Hamptons oceanfront cannot. There are roughly 27 miles of ocean coastline from Southampton to Montauk. That is the inventory. You cannot IPO a new barrier beach. You cannot raise a Series H and manufacture another oceanfront parcel in Sagaponack. Every serious sale removes a scarce asset from circulation, often for a generation.

Limited supply plus a buyer pool that keeps getting richer is not a complicated thesis. It is the entire East End story, only now the buyer pool is about to get a new tranche of capital that makes prior bonus seasons look polite.

## What the Hamptons Already Showed Us

We do not need to invent the pattern. Wall Street already ran a smaller version of this experiment at the top of the market.

In 2025, Hamptons sales volume hit about $6.2 billion, up roughly 26% year over year. Financiers made up over half of buyers. Trades above $20 million surged. Bonus season compressed the calendar. Off-market share stayed high because the best inventory never needs a public bidding war to clear.

That was finance wealth recycling into a fixed geography. AI wealth is finance wealth's louder cousin: larger paper fortunes, younger balance sheets, and a cultural preference for trophy lifestyle assets once liquidity hits. San Francisco is proving the demand side in real time at three thousand dollars a foot and climbing. The Hamptons prove the supply side every season: fewer true oceanfront and compound offerings, more capital chasing them, and price discovery that keeps resetting higher whenever a rare listing appears.

If you believe OpenAI and Anthropic list at anything close to the valuations being discussed, you should also believe a non-trivial share of that new net worth shows up in limited-supply trophy markets. Not all of it. Enough of it.

## Why This Is Different From "Tech Buyers Are Coming"

Every cycle has a narrative about the next buyer. Sometimes it is crypto. Sometimes it is private equity. Sometimes it is international capital. Those waves matter. This one is different in size and in timing.

Size: we are talking about company-level liquidity events that can exceed years of the entire U.S. IPO market. The purchasing power landing in private hands is out of scale with the thin stock of true trophy homes.

Timing: the wealth is arriving into a Hamptons market that is already inventory-constrained at the top. We are not starting from a soft book of vacant oceanfront. We are starting from a market where the best properties trade quietly, rentals book early, and every acre of true waterfront feels more finite than it did five years ago.

Put those together and you get the same physics San Francisco's ultra-luxury market is living through, applied to a coastline that cannot sprawl.

## What I Am Watching

**Liquidity dates.** Confidential filings are not closings. Roadshows slip. Valuations get negotiated down. But the direction of travel is clear enough that waiting for the exact ticker day is a luxury buyers in scarce markets often regret.

**Secondary markets first.** Before the IPO bells, secondary share sales and high cash comp already move housing. After the bells, lockups and staged selling stretch the wealth into the market over quarters, not a single weekend. That is a multi-season demand story for trophy inventory, not a one-week headline.

**Oceanfront and compound inventory.** The first dollars usually chase the irreplaceable: oceanfront, bayfront with depth, gated acreage, village-adjacent privacy. That is exactly the slice of the East End that is shortest.

**Cross-coast capital.** Some of this money stays in the Bay. Some of it diversifies. The Hamptons compete with Miami, Aspen, and the rest of the trophy circuit. Our edge is not "cheaper." It is specific: Atlantic oceanfront, New York adjacency, and a social calendar that still concentrates decision-makers in one place for a season.

## The Bottom Line

AI IPOs are going to create a class of liquid wealth that makes ordinary IPO seasons look small. San Francisco's ultra-luxury market is already pricing that future in, with high-end talk moving from roughly $3,000 a square foot toward $5,000. The Hamptons cannot print more ocean. Demand from newly rich households keeps expanding. True inventory does not.

That is not a tip to panic-buy anything with a shingle. It is a clear-eyed read on the setup: when historically large liquidity events meet a market defined by scarcity at the top, price is the release valve. We have seen the finance version of this. We are watching the AI version start in San Francisco's high end. The East End will feel it wherever true limited supply still sits on the water.
    `,
  },
  {
    slug: "hamptons-30-million-compound-sale-february-2026",
    title: "What the $30M East Hampton Compound Sale Signals for Spring 2026",
    excerpt:
      "A 7.3-acre East Hampton compound just closed for $30M, marking one of 2026's biggest trades. Combined with $6.2B in annual sales volume and Wall Street bonuses flooding the market, this spring season is setting up to be historic.",
    date: "2026-02-26",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/67-surfside.jpg",
    metaDescription:
      "A 7.3-acre East Hampton Village compound closed at $30 million. What it signals for Hamptons luxury demand in spring 2026, by Barry McGovern.",
    content: `
## The Sale

A 7.3-acre compound spanning 42 Hither Lane and 55 Middle Lane in East Hampton Village just closed for $30 million. In any other market, that's a headline. In the Hamptons right now, it's a signal.

This wasn't just another luxury trade. This sale sits at the meeting point of three forces: historically tight inventory, record Wall Street bonuses, and a buyer pool with exceptional purchasing power. And we're not even in spring season yet.

## The Numbers Paint a Clear Picture

Let's talk about what just happened in 2025. Total Hamptons sales volume hit $6.2 billion. That's a 25.6% jump from the previous year. Financiers made up over 50% of all buyers. The median home price surged 33.6%.

But here's what's really remarkable: sales above $20 million jumped 59% to 27 deals. This isn't just the middle market heating up. It's the ultra-luxury segment operating at a level we've rarely seen.

Wall Street's record bonus season isn't finished yet. Over $60 billion was paid out in 2025, with average securities bonuses climbing to $244,000 and total annual pay averaging over $505,000. That's nearly five times the city norm.

## Why This Spring Is Different

Bonus season usually follows a pattern. Typically, bonuses hit in February and March, and serious shopping starts in May. This year broke that pattern completely.

November and December saw heavy activity as bonus numbers got telegraphed early. January was one of the busiest off-season months in years. February is tracking ahead of last February by a significant margin. And we haven't even hit the traditional season kickoff.

The rental market confirms it. Summer 2026 properties are booking months ahead of normal timeline. The most desirable oceanfront homes (pools, modern kitchens, prime locations) were spoken for before Valentine's Day. Rental prices are approaching $1 million for the season and still generating multiple inquiries.

## Where the Money Is Going

**East Hampton Village** remains the gravitational center. The $30M Hither Lane/Middle Lane compound that just closed sits in the heart of the village, walking distance to Main Beach, with the kind of acreage and privacy that's increasingly impossible to find. Properties like this don't trade often, and when they do, they set benchmarks for everything around them.

**Bridgehampton's Surfside Drive** produced multiple $30M+ trades in 2025, and the momentum hasn't slowed. The combination of dramatic ocean bluffs, equestrian culture, and proximity to village amenities makes it increasingly attractive to buyers who might have focused exclusively on East Hampton in previous years.

**Sagaponack** keeps doing what Sagaponack does: setting records. The combination of vast oceanfront parcels, protected agricultural views, and total privacy keeps 11962 among the most expensive zip codes in the country. Properties here aren't just homes, they're compounds.

**Sag Harbor** is seeing strong demand for village properties with harbor views and dock access. A recently restored home on Bay Street just listed at $5.95 million, which tells you where village pricing has moved for premium locations.

## The Off-Market Reality

Here's something the $30M compound sale highlights: the best properties often trade before the public knows they're available. At Hedgerow, over 30% of the firm's volume happens off-market, including some of the most significant trades on the East End.

This isn't about secrecy for secrecy's sake. It's about efficiency. A seller gets complete privacy, control over the timeline, and access to pre-qualified buyers. A buyer gets first access to inventory that would generate bidding wars if it hit the public market.

For serious buyers in this environment, working with a firm that operates at this level isn't optional. The best properties, especially oceanfront and large acreage compounds, often trade before they reach public portals.

## What Wall Street Money Looks Like on the Ground

These buyers aren't stretching to afford a Hamptons property. They're making opportunistic decisions with capital they've specifically allocated for real estate. When a well-positioned waterfront compound hits the market at $30 million, they're not calculating mortgage payments. They're evaluating the asset: location, scarcity, and long-term appreciation potential.

The $30M compound sale is a perfect example. East Hampton Village, 7.3 acres, walking distance to Main Beach, complete privacy. That combination doesn't exist anywhere else in the Hamptons, and it may not come to market again for decades.

## The Scarcity Factor Gets More Intense

There are roughly 27 miles of ocean coastline from Southampton to Montauk. That's the entire inventory. Every significant property that trades often stays off the market for years or decades. The $30M compound sale removes one of the largest remaining parcels in East Hampton Village from circulation, possibly permanently.

This fundamental scarcity is what separates the Hamptons from other luxury markets. In Miami, developers build new waterfront towers constantly. In California, the coastline stretches for hundreds of miles. In the Hamptons, every major sale reduces available inventory in ways that can't be replaced.

## Spring Season Outlook

Based on current activity levels, this spring is setting up to be the strongest market in years. Inventory is historically tight, buyer demand is deeper than we've seen, and the financial capacity of the buyer pool has never been higher.

Properties that are well-positioned, well-priced, and well-presented are moving quickly, often with multiple offers. The rental market is fully booked months ahead of schedule. And off-market activity is at levels that suggest significant pent-up demand.

## What This Means Right Now

**For buyers:** The window is open, but it won't stay open indefinitely. The best properties, especially oceanfront and large compounds, are moving fast. Having pre-approval, clear criteria, and representation with access to off-market opportunities isn't just recommended, it's essential in this market.

**For sellers:** This is an exceptional moment. The $30M compound sale establishes a new benchmark for East Hampton Village. Pricing is at historic highs, demand significantly outpaces supply, and the buyer pool has never been more capitalized. If you've been considering a sale, the conversation should happen now.

The $30 million compound sale wasn't just a transaction. It was a statement about where this market is heading. With Wall Street bonuses still clearing, spring season approaching, and inventory at historic lows, the next few months could define the Hamptons luxury market for years to come.
    `,
  },
  {
    slug: "hamptons-62-billion-sales-surge-march-2026",
    title: "$6.2 Billion: What Wall Street's Record Bonuses Mean for Spring 2026",
    excerpt:
      "With $6.2 billion in sales volume (up 25.6% YoY) and financiers comprising over 50% of buyers, the Hamptons spring market is setting up to be the strongest in years. Here's what's driving demand.",
    date: "2026-02-23",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/36-chase-court.jpg",
    metaDescription:
      "Hamptons sales reached $6.2 billion in 2025 as Wall Street bonuses drove demand. What it means for spring 2026, by Barry McGovern.",
    content: `
## The 2025 Numbers

$6.2 billion in total sales volume for 2025. Up 25.6% from the previous year. Financiers making up over 50% of all buyers. The median home price surging 33.6% year-over-year.

These aren't projections. They're the final numbers, and they paint a picture of a Hamptons market that's operating at a level we haven't seen before.

Wall Street's record bonus season isn't just a nice-to-have for the East End. It adds fuel to a market that was already running hot. With over $60 billion in bonuses paid out across the Street in 2025 (per New York State Comptroller Thomas DiNapoli), a significant portion of that capital is flowing directly into Hamptons luxury real estate.

## Why This Year Is Different

The correlation between bonus season and buying activity has rarely looked this direct. In past cycles, there was usually a lag. Bonuses would hit in February and March, and the serious shopping wouldn't start until May.

Not anymore. November and December saw sharp spikes in activity as bonus numbers got telegraphed early. January was one of the busiest months we've had in the off-season in years. And February is tracking ahead of last February, which was itself a record month.

The buyers aren't just looking. They're transacting. Properties above $20 million saw a 59% increase in closed deals in 2025, with 27 transactions compared to 17 the previous year.

## Where the Action Is Right Now

**East Hampton** remains the gravitational center for ultra-luxury. Its oceanfront lanes still hold the Hamptons record: $147 million for three contiguous Further Lane parcels in 2014. Properties on Further Lane and Lily Pond Lane aren't just selling quickly, they're selling above ask in multiple offer situations.

**Bridgehampton** is having a moment. Surfside Drive's dramatic oceanfront bluffs have attracted serious money, with multiple $30+ million trades in the past six months. The combination of ocean views, proximity to village amenities, and slightly more reasonable entry points (relatively speaking) is drawing buyers priced out of East Hampton's top streets.

**Sagaponack** keeps doing what Sagaponack does: setting records. The combination of protected agricultural reserves, vast oceanfront parcels, and total privacy keeps 11962 among the most expensive zip codes in the country.

**Sag Harbor** is seeing strong demand for waterfront properties with dock access. A restored harbor-view home on Bay Street just listed at $5.95 million, which tells you where village pricing has moved. These properties are becoming increasingly scarce.

## The Spring Setup

Here's what's making this spring different: inventory is historically tight, buyer demand is deeper than it's been in years, and the financial capacity of the buyer pool has never been higher.

Summer rentals are already booking at record pace. Properties that would normally get leased in April were spoken for in February. The most desirable oceanfront homes (pools, modern kitchens, prime locations) are approaching $1 million for the season and still generating multiple inquiries.

This rental activity is a leading indicator for sales. A significant percentage of today's renters become tomorrow's buyers. The fact that summer 2026 properties are booking months ahead of schedule suggests the sales pipeline is robust.

## What Wall Street Money Looks Like

The average securities bonus in 2025 hit $244,000, with total annual compensation averaging over $505,000. That's nearly five times the city norm. For senior professionals in private equity and hedge funds, those numbers are significantly higher.

These buyers aren't stretching to afford a Hamptons property. They're making opportunistic decisions with excess capital. When a well-positioned waterfront home hits the market at $8 million, they're not calculating mortgage payments. They're evaluating the asset on its own merits: scarcity, location, and long-term appreciation potential.

## The Scarcity Factor

There are roughly 27 miles of ocean coastline from Southampton to Montauk. That's the entire inventory. No one is creating more oceanfront, and every property that trades often stays off the market for years or decades.

This fundamental scarcity is what separates the Hamptons from other luxury markets. In Miami, developers build new waterfront towers constantly. In Malibu, the coastline stretches for miles. In the Hamptons, every oceanfront sale reduces available inventory, sometimes permanently.

For buyers who understand this dynamic, waiting for the market to "cool off" isn't a strategy. It's an opportunity cost.

## The Off-Market Reality

Here's something the public data doesn't capture: an increasing share of significant transactions are happening privately. At Hedgerow, over 30% of the firm's volume is facilitated off-market, including some of the most notable trades on the East End.

A recent example: a Bridgehampton oceanfront property sold for $50 million in an entirely private transaction that was never publicly listed. The seller got complete discretion, and the buyer got access to a property they would never have found through conventional search.

For serious buyers in this market, working with a firm that operates at this level isn't optional. The best properties often trade before they reach public portals.

## Looking Ahead

The spring market is setting up to be the strongest in years. Bonus checks are clearing, buyer inquiries are spiking, and inventory remains constrained. Properties that are well-positioned, well-priced, and well-presented are trading quickly, often with multiple offers.

For buyers: the window is now. The best properties, especially oceanfront and waterfront, are moving fast. Having pre-approval, clear criteria, and representation with access to off-market opportunities isn't just recommended; it's essential.

For sellers: this is an exceptional moment. Pricing is at historic highs, demand significantly outpaces supply, and the buyer pool has never been more capitalized. If you've been considering a sale, the conversation should happen now.

The $6.2 billion surge wasn't just a number. It was a signal. The Hamptons luxury market is operating at a level that reflects both the scarcity of premier properties and the depth of the buyer pool pursuing them.
    `,
  },
  {
    slug: "wall-street-bonus-season-hamptons-2026",
    title: "Wall Street's Bonus Season Is Already Reshaping the Hamptons Market",
    excerpt:
      "Record bonuses are translating into record activity. West of the Canal prices jumped 25% in 2025, summer rentals are booking months early, and the spring market hasn't even started yet.",
    date: "2026-02-19",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/109-duck-pond.jpg",
    metaDescription:
      "How Wall Street's 2025 bonus season is shaping Hamptons real estate in 2026: record prices, early rental bookings, and oceanfront demand.",
    content: `
## Bonus Checks Are Hitting. So Are the Offers.

Every February, there's a predictable rhythm to the Hamptons real estate market. Wall Street pays out, and within weeks the phones start ringing. This year is no different, except the numbers are bigger across the board.

2025 was a banner year on the Street. Goldman Sachs posted its best results since 2021, Morgan Stanley's wealth management division crushed expectations, and the hedge fund world had one of its strongest performance years in a decade. Those bonuses are now clearing, and a significant chunk of that capital is flowing straight to the East End.

We're seeing it in real time. Buyer inquiries for properties above $5 million are up noticeably compared to this time last year. And the activity isn't just concentrated in the usual spots.

## West of the Canal: The Breakout Story

The most interesting trend from 2025 carried into this year. Areas west of the Shinnecock Canal, from Hampton Bays through Quogue and Remsenburg, saw prices jump 25% last year according to Brown Harris Stevens data. That's not a typo. Twenty-five percent in a single year, compared to roughly 5% growth in established eastern towns like Southampton and Montauk.

Why? Simple economics. A buyer who wants oceanfront or waterfront but can't justify $30 million for Meadow Lane is discovering that Hampton Bays and Quogue offer legitimate beach access, beautiful homes, and significantly more value. A waterfront property in Quogue that sold for $4 million three years ago might trade for $5.5 million today. That's still a fraction of what comparable footage costs in Bridgehampton or East Hampton.

It is a corridor worth watching.

## The Rental Market Tells the Same Story

If you want a leading indicator for where the sales market is headed, look at rentals. And right now, the rental market is unusually strong.

Summer 2026 properties are booking months ahead of the normal timeline. The most desirable homes (pools, modern kitchens, prime locations) were spoken for before Valentine's Day. That's unusual even by Hamptons standards.

The pricing reflects it:
- **Entry-level seasonal rentals:** Starting around $50,000
- **Mid-range homes:** $150,000 and up
- **Oceanfront estates:** Approaching $1 million for the season

Here's what's changed. July has overtaken August as the peak demand month. Renters are planning further out than ever. And the overlap between renters and future buyers keeps growing. A family that rents in Sag Harbor for two summers often becomes a buyer in year three. That pipeline is robust right now.

## Record Prices Aren't Scaring Anyone Off

The Hamptons closed 2025 with a median sale price around $2.3 million and average luxury sales approaching $3.8 million. Properties above $5 million are selling faster than they did a year ago, with days on market down roughly 15% in that segment.

Inventory remains historically tight. There simply aren't enough quality listings to meet demand, particularly for oceanfront and waterfront. When a well-priced property hits the market in East Hampton, Bridgehampton, or Sagaponack, it's not uncommon to see multiple offers within the first week.

And it's not just the trophy segment. The $2 million to $5 million range, which represents the core of the market, is equally competitive. Buyers in this bracket are often the bonus-season crowd: finance professionals who've been renting and are ready to make the leap to ownership.

## Where the Action Is Right Now

**East Hampton** remains the gravitational center. Lily Pond Lane, Further Lane, and the lanes off Main Beach continue to set records. The Hamptons record still belongs to Further Lane: $147 million for three contiguous parcels in 2014.

**Sag Harbor** is seeing intense demand for village properties with waterfront or harbor views. A restored 4-bedroom on Bay Street just listed at $5.95 million, which tells you where pricing has moved for premium village locations. Dock access adds a significant premium, and those properties are nearly impossible to find.

**Bridgehampton** keeps gaining ground. The Surfside Drive corridor produced multiple $20 million-plus trades in 2025, and the combination of ocean bluffs, equestrian culture, and proximity to restaurants and shops makes it increasingly attractive.

**Amagansett** is having a moment too. A recently renovated compound at 74 Cranberry Hole Road just listed for $10.9 million. Properties like this, with modern renovation and serious acreage, are exactly what today's buyers want.

## What This Means If You're Looking to Buy

Don't wait for spring to start looking. The best properties are trading now, and many of the most significant opportunities never reach the public market. At Hedgerow, roughly a third of the firm's volume happens off-market, through private networks and relationships built over years.

If you're a bonus-season buyer thinking about the Hamptons, here's my advice: get pre-qualified, identify your target area, and have a salesperson who can show you inventory that isn't on Zillow. The competition is real, but the opportunity is equally real. Hamptons real estate, particularly oceanfront and waterfront, has proven to be one of the most resilient luxury asset classes in the country.

For sellers, this is as strong a market as we've seen. Pricing is at historic highs, demand is deep, and the window is wide open. If you've been considering a sale, a confidential conversation about positioning and timing could make a meaningful difference in your outcome.
    `,
  },
  {
    slug: "hamptons-market-update-q4-2025",
    title: "Hamptons Market Update, Q4 2025: Record Prices and a Comeback",
    excerpt:
      "The Hamptons luxury market closed 2025 with record-breaking numbers. Median prices hit $2.34M, average sale price reached $3.76M, and multiple oceanfront trades pushed past $30M.",
    date: "2026-02-17",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/55-halsey-lane.jpg",
    metaDescription:
      "Hamptons market update, Q4 2025: a record $2.34M median, a $3.76M average, and oceanfront trades above $30M. By Barry McGovern, Hedgerow.",
    content: `
## The Numbers

The Hamptons luxury real estate market closed 2025 with a statement. After a period of recalibration in 2023-2024, the market came roaring back with record-level pricing and a surge in high-end oceanfront activity.

**Key Q4 2025 Statistics:**
- **Median Sale Price:** $2.34 million, an all-time high
- **Average Sale Price:** $3.76 million
- **Total Market Volume:** Up 23% year-over-year
- **Days on Market:** Down 15% for properties above $5M
- **Inventory:** Remains historically tight, especially oceanfront

## Oceanfront Leads the Charge

The headline story of 2025 was oceanfront. Multiple trades north of $30 million closed during 2025, with Bridgehampton's Surfside Drive and East Hampton's Lily Pond Lane corridor seeing the most significant activity.

At Hedgerow Exclusive Properties, the firm's 2025 work spanned on-market, off-market, and in-contract opportunities across the full East End.

Notable 2025 Hedgerow closings included:
- **67 Surfside Drive, Bridgehampton**. $32,000,000, closed April 2025 (oceanfront, 6,714 SF on 2.2 acres)
- **33 Lily Pond Lane, East Hampton**. $31,500,000, closed September 2025 (oceanfront, 7,000 SF on 1.81 acres)

Both properties were the kind of once-in-a-generation oceanfront opportunities that define the Hamptons at its highest level.

## What's Driving Demand?

Several factors converged to push the market to new highs:

1. **Limited oceanfront inventory.** There are only so many feet of ocean frontage on the South Fork. Every sale removes a property that may not come back to market for decades.

2. **Wealth migration continues.** The post-pandemic shift to the Hamptons as a primary or co-primary residence (not just a summer escape) has become permanent for many buyers.

3. **Off-market activity.** An increasing share of ultra-luxury transactions are happening privately. At Hedgerow, over 30% of the firm's volume is facilitated off-market, giving clients access to inventory that never appears on public portals.

4. **Rate environment.** While mortgage rates remain elevated, the majority of transactions above $5M are cash, insulating the luxury segment from rate sensitivity.

## Area Highlights

### East Hampton
The perennial leader. Lily Pond Lane, Further Lane, and West End Road continue to command the highest per-square-foot premiums in the Hamptons. Further Lane also holds the Hamptons record: $147 million for three contiguous parcels in 2014.

### Bridgehampton
Surfside Drive emerged as a hot corridor in 2025, with multiple $20M+ trades. The area's combination of dramatic ocean bluffs, equestrian culture, and proximity to village amenities makes it increasingly attractive to buyers priced out of East Hampton's top streets.

### Sag Harbor
The village continues to punch above its weight. Waterfront properties with dock access and harbor views remain in extremely short supply, and competition for well-positioned homes is fierce.

### Sagaponack
Sagaponack delivered again. The combination of vast oceanfront parcels, protected farmland views, and ultra-privacy keeps Sagaponack at the top of the market on a per-acre basis.

## Looking Ahead to 2026

The spring market is shaping up to be competitive. Inventory remains tight, buyer demand is strong, and the trophy segment ($10M+) shows no signs of cooling. If anything, the scarcity of oceanfront inventory will continue to push pricing higher.

For buyers: move early and be prepared to transact quickly. The best properties, especially oceanfront, are trading before they hit the open market.

For sellers: this is an exceptional window. Pricing is at historic highs, and demand for well-positioned luxury homes significantly outpaces supply.
    `,
  },
  {
    slug: "why-hamptons-oceanfront-different",
    title: "Why Hamptons Oceanfront Is Different From Anywhere Else",
    excerpt:
      "Oceanfront in the Hamptons isn't just waterfront with a view. It's a finite, irreplaceable asset class that has outperformed virtually every other segment of US luxury real estate over the past decade.",
    date: "2026-02-17",
    author: "Barry McGovern",
    category: "Perspective",
    image: "/images/40-hedges-banks.jpg",
    metaDescription:
      "Why Hamptons oceanfront is its own asset class: fixed supply, record prices, and proximity to New York capital. By Barry McGovern.",
    content: `
## A Finite Asset Class

There are approximately 27 miles of ocean coastline on the South Fork of Long Island, from Southampton to Montauk. That's it. No one is making more oceanfront in the Hamptons.

This fundamental scarcity is what separates Hamptons oceanfront from virtually any other luxury real estate market in the United States. In Miami, developers build new waterfront towers every year. In Malibu, the coastline stretches for miles. In the Hamptons, every oceanfront parcel that trades is one fewer available, often for decades or generations.

## The Numbers Tell the Story

Consider the top of the Hamptons market over the past decade:

- **2014:** $147 million for three contiguous Further Lane parcels in East Hampton, still the Hamptons record
- **2016:** $110 million for three Lily Pond Lane parcels in East Hampton
- **2021:** $105 million for 90 Jule Pond Drive in Water Mill, then the highest price paid for a single Hamptons property, and $118.5 million for the four-parcel Cobb Road compound in Water Mill, a Hedgerow transaction
- **2025:** $115 million for 408 Further Lane in Amagansett

Nine-figure trades remain rare. The [oceanfront study](/blog/hamptons-oceanfront-market-2021-2026) counts three oceanfront sales above $100 million from 2021 through 2026.

## Proximity to Capital

What makes the Hamptons truly unique among US oceanfront markets is proximity. This is the only world-class beach community within a two-hour drive of Manhattan, the financial capital of the world. For hedge fund managers, private equity executives, and tech founders based in New York, the Hamptons isn't a vacation; it's a 90-minute commute.

That proximity creates a buyer pool with virtually unlimited purchasing power. When a $50M oceanfront estate hits the market, the potential buyers aren't retirees stretching their budget. They're active wealth creators for whom $50M represents a fraction of their net worth.

## The Off-Market Factor

The ultra-luxury oceanfront segment operates largely in private. Many of the most significant oceanfront properties never appear on Zillow, Realtor.com, or even the MLS. They trade through private networks, relationship-based introductions, and firms with access to off-market inventory.

At Hedgerow Exclusive Properties, a meaningful share of the firm's transactions has been facilitated off-market. For buyers seeking oceanfront, working with a firm that operates at this level isn't optional; it's the only way to access inventory that never reaches the public market.

## The Key Corridors

Not all Hamptons oceanfront is created equal. The premium streets where the record-breaking trades happen include:

- **Lily Pond Lane, East Hampton**: The most prestigious address in the Hamptons. Trades consistently above $30M.
- **Further Lane, East Hampton**: Expansive oceanfront estates on large acreage. Further Lane holds the Hamptons record: $147 million in 2014.
- **Meadow Lane, Southampton**: The original billionaire's row. Grand estates with ocean and bay access.
- **Surfside Drive, Bridgehampton**: Dramatic bluff-top estates with some of the most spectacular ocean views on the East End.
- **Sagaponack oceanfront**: Regularly ranked among the most expensive zip codes in the country. Vast parcels, agricultural reserve views, and total privacy.

## What This Means For Buyers and Sellers

**For buyers:** Hamptons oceanfront is not a market that rewards patience. Every year you wait, the entry point moves higher and the inventory gets thinner. If you're considering an oceanfront purchase, the time to begin the conversation is now, especially for off-market opportunities that require established relationships.

**For sellers:** You own one of the most valuable asset classes in American real estate. The question isn't whether to sell, it's ensuring you have representation that understands the true value of your property and can access the global buyer pool that trades at this level.
    `,
  },
  {
    slug: "off-market-hamptons-explained",
    title: "Off-Market in the Hamptons: What It Means and Why It Matters",
    excerpt:
      "A meaningful share of Hedgerow's transactions happen off-market. Here's how the Hamptons private market works and why it matters for buyers and sellers.",
    date: "2026-02-17",
    author: "Barry McGovern",
    category: "Perspective",
    image: "/images/press/bridgehampton-50m.jpg",
    metaDescription:
      "How off-market real estate works in the Hamptons: why sellers choose discretion and how buyers reach private inventory. By Barry McGovern.",
    content: `
## The Private Market Is the Real Market

In the Hamptons luxury segment, some of the most significant properties never appear on Zillow, Realtor.com, or even the local MLS. They trade privately, through trusted firm networks, relationship-based introductions, and word of mouth.

This isn't new, but the scale has grown dramatically. At Hedgerow Exclusive Properties, over $700 million in sales volume since 2020 has been facilitated off-market. That represents nearly a third of the firm's total transactions, including some of the most notable trades on the East End.

## Why Sellers Go Off-Market

**Privacy.** Many Hamptons homeowners are public figures: finance executives, entertainers, tech founders. They don't want their home, its interior, or its price point visible to the general public.

**Control.** An off-market sale allows the seller to control the timeline, the audience, and the narrative. There's no "days on market" clock ticking, no public price reductions, and no open houses.

**Testing the market.** Some sellers want to gauge interest at a certain price point before committing to a public listing. Off-market exposure provides that signal without the downside of a stale listing.

**Exclusivity as strategy.** In luxury, scarcity creates demand. A property whispered about in the right circles can generate more urgency than one sitting on a portal.

## Why Buyers Need Off-Market Access

If you're searching for Hamptons luxury real estate exclusively through public listings, you are likely missing part of the ultra-luxury segment ($10M+).

At Hedgerow, nearly a third of transaction volume has been off-market, through private networks accessible only to firms with the relationships, reputation, and deal flow to participate.

This is where firm selection matters. A firm like Hedgerow, with over $2 billion in total transactions and deep relationships across the East End, has visibility into opportunities that simply don't exist for the general market.

## How It Works in Practice

A typical off-market transaction:

1. **Seller engages a trusted firm** and signals willingness to sell at a target price
2. **The firm discreetly introduces the property** to a curated group of qualified buyers
3. **Showings happen privately**, often with NDAs
4. **Negotiations and closing proceed confidentially**, sometimes before the property was ever publicly known to be available

The entire process can take weeks rather than months, and the property may never appear in any public database.

## The Bridgehampton Example

One recent example: an oceanfront Bridgehampton home with a storied past sold for $50 million in an entirely off-market transaction facilitated by Hedgerow. The property was never listed publicly, never appeared on any website, and the sale was only reported after closing.

For the seller, this meant complete privacy. For the buyer, it meant access to a generational oceanfront property that they would never have found through conventional search.

## Accessing the Private Market

Working with a firm that operates at the top of the Hamptons market isn't a luxury, it's a necessity for serious buyers and sellers. The private market rewards relationships, reputation, and trust.

If you're considering buying or selling in the Hamptons and want access to the full market, not just what's publicly listed, a confidential conversation is the first step.
    `,
  },

  {
    slug: "oceanfront-scarcity-southampton-montauk-2025",
    title: "Barry McGovern on Oceanfront Scarcity from Southampton to Montauk",
    excerpt: "Why irreplaceable coastline, frontage, and access, not a simple town average, shape oceanfront decisions from Southampton to Montauk.",
    date: "2025-06-18",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/67-surfside.jpg",
    metaDescription: "Barry McGovern explains how oceanfront scarcity, frontage, access, and micro-location shape Hamptons decisions from Southampton through Montauk.",
    content: `
## The coastline is the constraint

From Southampton to Montauk, the Hamptons oceanfront market is defined by a fact that cannot be solved with new construction: there is only so much coast. A buyer can renovate a house, improve a landscape, or rework a floor plan. No buyer can create a second row of ocean frontage, move a favored beach closer to Manhattan, or reproduce the exact relationship between dune, bluff, beach, and horizon. That is why a useful oceanfront conversation begins with scarcity and only then moves to finishes, square footage, and amenities.

The same principle applies across very different settings. Southampton can offer a legacy estate corridor, a village-adjacent home, or a quieter ocean-facing property. Bridgehampton brings bluff-top drama and its own relationship to the village and reserve. East Hampton and Amagansett offer famous lanes, deep privacy, and distinct beach conditions. Montauk adds a more elemental coastline, surf culture, harbor access, and a year-round identity. Calling all of those homes simply oceanfront hides the decisions that matter.

## Frontage is more than a number

When I review an oceanfront property with a buyer, I want to understand the usable experience of the frontage. How does the house meet the land? Is there a direct beach path, a protected dune system, a bluff, or a view that depends on a neighboring parcel? How do prevailing winds, erosion exposure, access rules, and coastal regulations affect the way the property can be enjoyed? A listing can state a frontage measurement, but the daily experience requires a closer reading of the site.

The portfolio gives useful reference points without pretending that any one sale is a universal comp. 67 Surfside Drive in Bridgehampton, documented at $32,000,000, offered 187 feet of ocean frontage on 2.20 acres. 33 Lily Pond Lane in East Hampton, documented at $31,500,000, offered 171 feet of private ocean frontage on 1.81 acres. Both are Hedgerow transactions, not a promise that every property with a similar number of feet belongs in the same pricing conversation. Orientation, elevation, improvements, privacy, and timing still matter.

Southampton adds another layer. 109 Duck Pond Lane is a waterfront estate with pond and Atlantic views, a Hedgerow transaction at $20,000,000. Its value story is not interchangeable with a pure oceanfront bluff: the water relationship, the house, the approach, and the combination of pond and ocean outlook create a particular kind of setting. Buyers who understand that distinction can compare properties more intelligently and avoid paying for a label rather than a lived experience.

## A practical comparison process

First, define the water relationship. “Oceanfront” can mean direct beach frontage, a bluff, a dune-side position, or a home with an ocean view but no private path. “Waterfront” can mean pond, bay, harbor, or cove. Those categories behave differently in insurance, maintenance, access, and resale conversations.

Second, map the daily route. A buyer should test the drive to the village, the beach access, the nearest market, and the practical commute. Southampton and Montauk can both deliver extraordinary coastline while producing entirely different patterns of use. If a home is meant to be a weekend base, a summer compound, or a year-round retreat, the correct micro-market may change.

Third, ask what is durable. Architecture and interiors can age well when they respond to light, weather, and the site. A pool, guest house, studio, or dock can be valuable, but only when the permitting, maintenance, and setting support the improvement. The best oceanfront decisions are not built around a single feature; they are built around a durable relationship with the land.

Fourth, plan for diligence early. Coastal properties require attention to surveys, flood exposure, insurance availability, shoreline conditions, easements, septic systems, and local approvals. A confident buyer is not the buyer who skips those questions. It is the buyer who asks them before becoming emotionally committed and understands which findings are manageable and which alter the value proposition.

## The buyer and seller lens

For buyers, scarcity argues for preparation rather than panic. Establish the preferred coastline, the minimum water relationship, and the compromises that are acceptable before a property appears. Keep financial and legal advisors ready, and make sure the search includes quiet conversations where appropriate. The most useful first step is often a confidential market map, not a public portal saved-search list.

For sellers, scarcity is not a substitute for positioning. A rare address still needs accurate photography, a precise story, and a launch plan that respects privacy. Buyers at this level want to understand why a setting is difficult to replace. That can mean explaining a beach path, an orientation, a protected view, or the history of a lane, not simply repeating “oceanfront” in larger type.

The Hamptons coastline rewards specificity. Southampton through Montauk is not one market and oceanfront is not one product. Barry McGovern’s role as a Licensed Real Estate Salesperson is to help clients compare the physical setting, the public record, and the private context with discipline. For a confidential conversation about an oceanfront search or valuation, [get in touch](/contact).
    `,
  },
  {
    slug: "sag-harbor-waterfront-village-demand-2025",
    title: "Barry McGovern’s Guide to Sag Harbor Waterfront and Village Demand",
    excerpt: "Sag Harbor’s value is the combination of walkability, working waterfront, and quiet coves. Barry McGovern breaks down how buyers can read the village and its surrounding micro-markets.",
    date: "2025-09-16",
    author: "Barry McGovern",
    category: "Perspective",
    image: "/images/117-main-st.jpg",
    metaDescription: "Barry McGovern shares a practical guide to Sag Harbor waterfront demand, village walkability, docks, coves, and buyer diligence.",
    content: `
## A waterfront market with a village center

Sag Harbor is compelling because it is not only a summer address. The village has a working history, a compact center, restaurants, galleries, a theater, a marina, and a year-round community. Waterfront demand grows from that combination. Buyers are not choosing only a view; they are choosing a pattern of life that can include a walk for coffee, a boat in the harbor, a meal downtown, or a quieter home in Noyac or North Haven.

That broad appeal also makes simple comparisons unreliable. A harborfront residence, a bayfront home, a cove-side property, and a village house a few blocks from Main Street may all be described as Sag Harbor. Their experiences, constraints, and buyer pools can be entirely different. A useful analysis starts by asking what “waterfront” is meant to deliver: a dock, a sunset, a short walk, a protected anchorage, a beach, or simply a sense of connection to the water.

## Walkability is a form of value

In Sag Harbor Village, the walk to the center can be as important as the water view. A historic home with a thoughtful renovation may appeal to a buyer who wants to leave the car behind for dinner or the theater. A home farther from the village may offer more land, privacy, or a better dock, but it may trade that convenience for a different rhythm. There is no universal answer. The right property is the one that matches how the household expects to use the East End.

117 Main Street is a useful reference because it combines a historic investment property in the heart of the business district with a residence, retail space, period details, and a pool. It traded off-market at $5,950,000. The lesson is not that every Main Street opportunity should be priced alike. The lesson is that use, history, and location can create a value story that is different from a conventional waterfront house.

Market records show a broad spectrum as well. Recent town-page records include 100 Bay Street at $11.25M, 40 Redwood Road at $7.5M, and 6 Harding Terrace at $5.5M. These are market records, not Hedgerow transactions. They demonstrate why a buyer should ask what each property actually offers rather than applying a single village-wide price expectation.

## The water has to work in real life

A dock is not a decorative line in a brochure. Buyers should ask about water depth, access, tidal conditions, permits, maintenance, and the type of boat the property can realistically support. Harbor and cove settings may be protected, but that protection can affect water access. A sunset view can be extraordinary while a particular shoreline may be less convenient for launching, swimming, or storing equipment.

The same diligence applies to flood exposure and insurance. Waterfront ownership means understanding elevation, storm history, drainage, bulkheads, septic systems, and the likely cost of ongoing care. A buyer should bring the right surveyor, engineer, insurance professional, and attorney into the process early. These questions do not diminish the romance of Sag Harbor. They protect it by making the ownership plan realistic.

## How to search the micro-markets

I recommend that buyers divide a Sag Harbor search into four lanes. Start with village walkability. Then consider harbor and bay frontage, where the water relationship may be the primary driver. Add North Haven and Noyac for larger parcels, coves, and a more private setting. Finally, review village-fringe properties for the possibility of access, views, or proximity without the same level of waterfront premium.

For each lane, track the elements that cannot easily be changed: street, orientation, water access, privacy, lot geometry, and distance to the village. Treat finishes as important but replaceable. A house that needs a kitchen update may still be stronger than a polished home with a compromised setting. Conversely, a beautiful interior cannot solve a water relationship that does not match the buyer’s intended use.

Sellers should tell the most specific version of the story. If the home is genuinely walkable, show the route and the neighborhood context. If a dock or cove is the differentiator, document the practical details. If the property is historic, explain the restoration with care. Sag Harbor buyers respond to authenticity, and an accurate narrative helps the right buyer understand why a property belongs in their shortlist.

## A measured outlook

Demand for Sag Harbor is likely to remain resilient because the village offers several reasons to own, not just one. A buyer can value the arts, the harbor, year-round community, or a quieter setting while still participating in the broader East End. That diversity can support the market, but it does not mean every property will perform equally. Micro-location, condition, access, and clarity of use remain decisive.

Barry McGovern works with buyers and sellers as a Licensed Real Estate Salesperson, using public market records and private context without confusing either with a guarantee. If you are considering a Sag Harbor waterfront purchase, a village home, or a discreet valuation, [get in touch](/contact) for a confidential conversation.
    `,
  },
  {
    slug: "off-market-vs-public-listing-hamptons-2025",
    title: "Barry McGovern: Off-Market or Public Listing? A Practical HNW Strategy",
    excerpt: "For high-net-worth buyers and sellers, the choice between a public launch and a private introduction is a strategy decision. Here is how to evaluate the tradeoffs.",
    date: "2025-11-20",
    author: "Barry McGovern",
    category: "Perspective",
    image: "/images/press/bridgehampton-50m.jpg",
    metaDescription: "Barry McGovern explains when a Hamptons luxury property may suit a public launch or an off-market strategy, with practical guidance for HNW clients.",
    content: `
## Privacy is not the only question

In the Hamptons, high-net-worth buyers and sellers often ask whether a property should be marketed publicly or introduced privately. Privacy matters, but it is only one part of the decision. The right strategy depends on the property, the owner’s timing, the likely buyer pool, the evidence needed to support value, and the seller’s tolerance for exposure. A private process can be highly effective, but it is not automatically better. A public launch can create transparency and competition, but it is not automatically necessary.

The first step is to define the desired outcome. Is the seller testing a price, protecting a family’s privacy, coordinating a move, or seeking the broadest possible audience? Is the buyer looking for a specific oceanfront corridor, a village property, or an opportunity that may never be advertised? Clarity about the objective makes the marketing choice more precise.

## What a public listing can do

A public listing creates a searchable record. It can provide a clear launch date, broad distribution, professional photography, and a straightforward way for qualified agents and buyers to understand the offering. For a property that benefits from scale, competition, or a wide set of possible buyers, that reach may be valuable. The public market can also help establish a record of positioning and response, provided the pricing and presentation are disciplined.

Public does not mean indiscriminate. A seller can still set showing protocols, require financial qualification, manage photography, and protect sensitive information. The best public campaigns are curated. They explain the property’s setting, identify the correct comparison set, and create a clear path for serious buyers to engage.

## What an off-market process can do

An off-market process can be appropriate when discretion is essential, when the seller wants to test demand without a public days-on-market clock, or when the property is so specific that a short list of likely buyers is more useful than broad exposure. It can also help a buyer learn about an opportunity before it reaches a portal. In the luxury segment, relationships and trust often determine whether a buyer hears about a property early.

117 Main Street is an example of an off-market transaction. The property’s historic character, business-district location, residence, retail component, and pool created a story that called for context. The record is shown at $5,950,000, but the broader lesson is strategic: private marketing can pair a specific property with a specific audience without presenting it as a generic listing.

Other private sales include 18 South Harbor Drive in Sag Harbor, recorded at $3,600,000, and 55 Marine Boulevard in Amagansett, a Hedgerow transaction recorded at $9,000,000. They illustrate the range of situations in which a private transaction may be used.

## The buyer’s decision framework

For a buyer, off-market access is useful only when the search brief is well formed. Start with the non-negotiables: town, water relationship, minimum privacy, timing, and intended use. Then define what can flex. A vague request produces vague introductions; a thoughtful brief helps a salesperson advocate for access and understand whether a quiet opportunity is genuinely suitable.

Ask how the property was sourced, what is known about the seller’s motivation, what diligence is available, and whether the property may later be marketed publicly. Confirm representation, confidentiality expectations, and the process for making an offer. A private introduction should not mean skipping surveys, inspections, title review, zoning analysis, or financial underwriting.

## The seller’s decision framework

For a seller, compare strategies on audience, control, evidence, and timing. A quiet test may be the right first step, but establish a review date and a clear decision rule. If qualified interest is limited, the next step might be a revised narrative, adjusted expectations, or a public launch. The goal is not to protect a price in the abstract; it is to create the strongest credible path to a successful transaction.

Presentation still matters off-market. A private buyer expects accurate information, strong photography, a clean data room, and an explanation of the property’s strengths and constraints. Discretion should feel organized, not vague. The seller should know who has received the material, what feedback is being gathered, and how confidentiality is being handled.

## The answer is often a sequence

Public and private are not always opposing choices. A seller might begin with a discreet introduction to a small group, learn which questions arise, and then decide whether a broader campaign adds value. Another seller may know from the outset that the audience must be wide. The most effective strategy is the one that matches the asset and the owner’s priorities, not the one that sounds most exclusive.

Barry McGovern is a Licensed Real Estate Salesperson at Hedgerow Exclusive Properties. He helps clients evaluate public and private paths with a clear distinction between Hedgerow transaction records, current market records, and confidential opportunities. For a thoughtful conversation about buying or selling discreetly, [get in touch](/contact).
    `,
  },
  {
    slug: "east-hampton-lily-pond-further-lane-2026",
    title: "Barry McGovern on the East Hampton, Lily Pond, and Further Lane Prestige Corridor",
    excerpt: "The East Hampton prestige corridor is a collection of micro-markets, not one address. Barry McGovern explains how to compare Lily Pond, Further Lane, village access, and privacy.",
    date: "2026-01-15",
    author: "Barry McGovern",
    category: "Market Report",
    image: "/images/33-lily-pond.jpg",
    metaDescription: "Barry McGovern analyzes East Hampton’s Lily Pond Lane and Further Lane prestige corridor, including privacy, frontage, village access, and buyer strategy.",
    content: `
## Prestige is built from several coordinates

East Hampton’s most recognizable luxury addresses are often discussed as if they were one continuous market. Lily Pond Lane, Further Lane, the village estate section, Georgica, and the lanes near Main Beach each carry prestige, but the reasons are not identical. A buyer choosing among them is comparing privacy, beach access, frontage, village convenience, acreage, architecture, and the feeling of arrival. The correct question is not simply which street is most famous. It is which combination of coordinates is most important to the way the home will be used.

The corridor also has a powerful supply dynamic. Large, well-positioned properties tend to be held for long periods. When one trades, it can reset expectations for the immediate setting without creating a new supply of comparable land. That is why a careful reading of each property matters more than a headline number.

## Lily Pond Lane and the ocean relationship

Lily Pond Lane is associated with direct oceanfront living, large lots, and a sense of arrival that is difficult to reproduce. 33 Lily Pond Lane, a Hedgerow transaction, sold for $31,500,000, with 171 feet of private ocean frontage on 1.81 acres. The record is useful because it shows how frontage, acreage, improvements, and a famous address can reinforce one another. It is not a universal comp for every home near the lane.

For a buyer, the diligence questions should go beyond the view. How is the beach accessed? How does the house sit relative to wind, dunes, and storm exposure? Which improvements are permitted and maintainable? How private is the approach, and what is likely to remain protected? A property may be emotionally compelling while still requiring a disciplined understanding of coastal ownership.

## Further Lane and the value of space

Further Lane can offer a different expression of prestige. The corridor is known for privacy, generous parcels, and a relationship to the ocean that varies by location. Some buyers prioritize direct water access; others value a quiet lane, a protected setting, or the ability to create a compound with room for guests and outdoor life. The best choice depends on the hierarchy of needs.

The portfolio includes 40 Hedges Banks Drive, an East Hampton waterfront property documented at $5,550,000, which illustrates why “East Hampton waterfront” is not a single price category. A bay or pond setting, a village-fringe location, and an oceanfront estate may all sit within the same broad town conversation while offering different daily experiences. Treating them as interchangeable can obscure the real reasons one property feels stronger than another.

## Village access changes the equation

A prestige property is not only an asset; it is a base for living. Some households want an easy drive to Main Street, schools, restaurants, and Main Beach. Others want a private arrival and are comfortable trading convenience for acreage and quiet. A buyer should test those routes at the times they will actually be used, not rely on a map estimate during a quiet weekday.

The village estate section can be especially interesting for buyers who want architectural character and access without the full exposure of a front-row oceanfront setting. Georgica and nearby lanes may offer pond views, privacy, and a strong sense of place. These are not substitutes for Lily Pond or Further Lane, but they can satisfy a different brief with a different balance of land and convenience.

## How to compare the corridor

I suggest a four-part scorecard. First, record the physical setting: frontage, elevation, orientation, lot shape, and water access. Second, record the practical setting: beach route, village route, driveway, service access, and year-round usability. Third, record the improvement story: architecture, renovation quality, pool, guest space, utilities, and permits. Fourth, record the privacy story: neighboring parcels, protected views, screening, and the visibility of the arrival.

Then separate what can be changed from what cannot. Paint, landscaping, and some interiors can evolve. Street, frontage, access, and the fundamental relationship to the horizon cannot. This does not mean a buyer should dismiss a home that needs work. It means the renovation budget should be evaluated against the setting rather than used to excuse a setting that does not fit.

Sellers should present that hierarchy with precision. A Lily Pond property should not be marketed only with a list of rooms. A Further Lane property should explain its privacy and land. A village property should make access and character tangible. Accurate context helps the right buyer see the asset clearly and reduces the temptation to compare unlike homes.

## A disciplined prestige search

East Hampton’s prestige corridor will continue to attract buyers who value scarcity, privacy, and proximity to the village and ocean. The market is strongest when the story is specific and the diligence is complete. Barry McGovern is a Licensed Real Estate Salesperson who helps clients read that specificity, separating Hedgerow transaction records and market records from current availability and confidential opportunities. For a confidential East Hampton search or valuation, [get in touch](/contact).
    `,
  },
];

/** Posts newest first (by publish date). Use for every index and listing. */
export const postsByDate: BlogPost[] = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
