/**
 * Headline figures from "Hamptons Oceanfront, 2021 to 2026" (/blog/hamptons-oceanfront-market-2021-2026).
 * Every number here appears in that study's tables; update both together.
 */
export const OCEANFRONT_STUDY_PATH = "/blog/hamptons-oceanfront-market-2021-2026";
export const OCEANFRONT_STUDY_TITLE = "Hamptons Oceanfront, 2021 to 2026";

export const OCEANFRONT_TOTALS = {
  sales: 87,
  volume: "$2.61B",
  median: "$24.5M",
  median2026: "$43.5M",
  sales2026: 7,
} as const;

/** Median sale price by year (millions) and number of sales. */
export const OCEANFRONT_BY_YEAR = [
  { label: "2021", median: 22.5, sales: 21 },
  { label: "2022", median: 18.2, sales: 14 },
  { label: "2023", median: 28.0, sales: 7 },
  { label: "2024", median: 19.88, sales: 14 },
  { label: "2025", median: 26.25, sales: 24 },
  { label: "2026 YTD", median: 43.5, sales: 7 },
] as const;

/** Village medians, January 2021 to early October 2026. Slugs match the village pages. */
export const OCEANFRONT_BY_VILLAGE = [
  { label: "East Hampton", slug: "east-hampton", median: 48.5, sales: 14, range: "$15.0M to $84.5M", notable: "43 East Dune Lane, $72.0M (2026)" },
  { label: "Southampton", slug: "southampton", median: 33.75, sales: 15, range: "$16.4M to $112.5M", notable: "700 Meadow Lane, $112.5M (2023)" },
  { label: "Wainscott", slug: "wainscott", median: 28.75, sales: 6, range: "$22.5M to $59.0M", notable: "115 Beach Lane, $59.0M (2026)" },
  { label: "Bridgehampton", slug: "bridgehampton", median: 28.5, sales: 9, range: "$17.5M to $58.0M", notable: "165 Surfside Drive, $58.0M (2025)" },
  { label: "Water Mill", slug: "water-mill", median: 20.0, sales: 3, range: "$14.5M to $105.0M", notable: "90 Jule Pond Drive, $105.0M (2021)" },
  { label: "Sagaponack", slug: "sagaponack", median: 14.38, sales: 4, range: "$7.25M to $46.5M", notable: "35 Potato Road & 543 Daniels Lane, $46.5M (2022)" },
  { label: "Montauk", slug: "montauk", median: 10.83, sales: 22, range: "$5.8M to $25.0M", notable: "42 Old Montauk Highway, $25.0M (2022)" },
  { label: "Amagansett", slug: "amagansett", median: 9.5, sales: 14, range: "$5.85M to $115.0M", notable: "408 Further Lane, $115.0M (2025)" },
] as const;

export function formatMillions(value: number) {
  return `$${value.toFixed(2).replace(/0$/, "")}M`;
}
