import { formatPrice, listingPages, type ListingPage } from "@/lib/listing-pages";
import { PLACE_SLUGS } from "@/lib/schema";

/**
 * Search and filters for the /listings index. Everything is driven by URL query params so every result set is a
 * shareable, server-rendered URL. Unknown or malformed values are ignored rather than erroring.
 */

export type Setting = "oceanfront" | "waterfront" | "land";
export type SortKey = "price-desc" | "price-asc" | "newest";

/**
 * Date each listing was first published on hedgerowexclusive.com (the page's datePublished), used for "Newest".
 * Setting tags follow Hedgerow's own descriptions: oceanfront means ocean frontage; waterfront means direct frontage on
 * a bay, creek or harbor (oceanfront parcels count as waterfront too). Water views or deeded access alone do not count.
 */
const META: Record<string, { listedOn: string; settings: Setting[] }> = {
  "70-71-cobb-lane-water-mill": { listedOn: "2024-03-27", settings: ["waterfront"] },
  "70-cobb-lane-water-mill": { listedOn: "2023-04-07", settings: ["waterfront"] },
  "71-cobb-lane-water-mill": { listedOn: "2023-01-01", settings: ["waterfront"] },
  "1880-meadow-lane-southampton": { listedOn: "2022-12-18", settings: ["oceanfront", "waterfront", "land"] },
  "14-st-marys-lane-amagansett": { listedOn: "2025-09-16", settings: [] },
  "351-jobs-lane-bridgehampton": { listedOn: "2026-05-06", settings: ["land"] },
  "60-two-holes-of-water-road-east-hampton": { listedOn: "2025-11-28", settings: [] },
  "58-cove-hollow-road-east-hampton": { listedOn: "2026-09-03", settings: [] },
  "8-margarets-drive-shelter-island": { listedOn: "2026-09-10", settings: ["waterfront"] },
  "20-prospect-avenue-shelter-island": { listedOn: "2023-07-03", settings: ["waterfront"] },
  "73-oyster-shores-road-east-hampton": { listedOn: "2026-05-21", settings: [] },
  "15-edgemere-street-montauk": { listedOn: "2026-04-15", settings: [] },
  "113-sebonac-road-southampton": { listedOn: "2025-04-25", settings: [] },
  "568-old-sag-harbor-road-bridgehampton": { listedOn: "2026-06-09", settings: [] },
  "51-little-noyack-path-water-mill": { listedOn: "2026-06-30", settings: [] },
  "106-laurel-drive-montauk": { listedOn: "2026-09-14", settings: ["land"] },
};

export interface SearchListing extends ListingPage {
  listedOn: string;
  settings: Setting[];
  bedsNum: number;
  bathsNum: number;
  acresNum: number;
  villageSlug: string;
}

const firstNumber = (s?: string) => {
  const m = s?.match(/\d+(\.\d+)?/);
  return m ? Number(m[0]) : 0;
};

/** Full baths only, so "5 full, 1 half" counts as 5 for a "5+ baths" filter. */
const fullBaths = (s?: string) => firstNumber(s);

export const searchListings: SearchListing[] = listingPages.map((l) => ({
  ...l,
  listedOn: META[l.slug]?.listedOn ?? "2000-01-01",
  settings: l.type === "Land" ? Array.from(new Set([...(META[l.slug]?.settings ?? []), "land" as Setting])) : META[l.slug]?.settings ?? [],
  bedsNum: firstNumber(l.beds),
  bathsNum: fullBaths(l.baths),
  acresNum: firstNumber(l.acres),
  villageSlug: PLACE_SLUGS[l.area as keyof typeof PLACE_SLUGS] ?? l.area.toLowerCase().replace(/\s+/g, "-"),
}));

/** Villages that currently have listings, in east-west order of the site's village list. */
export const VILLAGE_OPTIONS = Object.entries(PLACE_SLUGS)
  .map(([name, slug]) => ({ name, slug, count: searchListings.filter((l) => l.villageSlug === slug).length }))
  .filter((v) => v.count > 0);

export const PRICE_STEPS = [1_000_000, 2_000_000, 3_000_000, 5_000_000, 10_000_000, 20_000_000, 50_000_000];
export const BED_STEPS = [2, 3, 4, 5, 6];
export const BATH_STEPS = [2, 3, 4, 5, 6];
export const ACRE_STEPS = [0.5, 1, 2, 3, 5, 10];
export const SETTING_OPTIONS: { value: Setting; label: string }[] = [
  { value: "oceanfront", label: "Oceanfront" },
  { value: "waterfront", label: "Waterfront" },
  { value: "land", label: "Land" },
];
export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "price-desc", label: "Highest price" },
  { value: "price-asc", label: "Lowest price" },
  { value: "newest", label: "Newest" },
];

export interface Filters {
  village?: string;
  min?: number;
  max?: number;
  beds?: number;
  baths?: number;
  acres?: number;
  setting?: Setting;
  sort: SortKey;
}

type Params = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim() ?? "";
const pick = <T extends number>(v: string, allowed: readonly T[]) => {
  const n = Number(v);
  return v && allowed.includes(n as T) ? (n as T) : undefined;
};

/** Parse query params against the allowlists above. */
export function parseFilters(sp: Params): Filters {
  const village = one(sp.village);
  const setting = one(sp.setting) as Setting;
  const sort = one(sp.sort) as SortKey;
  let min = pick(one(sp.min), PRICE_STEPS);
  let max = pick(one(sp.max), PRICE_STEPS);
  if (min && max && min > max) [min, max] = [max, min];
  return {
    village: VILLAGE_OPTIONS.some((v) => v.slug === village) ? village : undefined,
    min,
    max,
    beds: pick(one(sp.beds), BED_STEPS),
    baths: pick(one(sp.baths), BATH_STEPS),
    acres: pick(one(sp.acres), ACRE_STEPS),
    setting: SETTING_OPTIONS.some((s) => s.value === setting) ? setting : undefined,
    sort: SORT_OPTIONS.some((s) => s.value === sort) ? sort : "price-desc",
  };
}

/** True when any filter (or a non-default sort) narrows or reorders the page: those URLs are noindex. */
export function isFiltered(f: Filters) {
  return Boolean(f.village || f.min || f.max || f.beds || f.baths || f.acres || f.setting || f.sort !== "price-desc");
}

export function applyFilters(f: Filters): SearchListing[] {
  const out = searchListings.filter(
    (l) =>
      (!f.village || l.villageSlug === f.village) &&
      (!f.min || l.price >= f.min) &&
      (!f.max || l.price <= f.max) &&
      (!f.beds || l.bedsNum >= f.beds) &&
      (!f.baths || l.bathsNum >= f.baths) &&
      (!f.acres || l.acresNum >= f.acres) &&
      (!f.setting || l.settings.includes(f.setting)),
  );
  const sorters: Record<SortKey, (a: SearchListing, b: SearchListing) => number> = {
    "price-desc": (a, b) => b.price - a.price,
    "price-asc": (a, b) => a.price - b.price,
    newest: (a, b) => b.listedOn.localeCompare(a.listedOn) || b.price - a.price,
  };
  return out.sort(sorters[f.sort]);
}

/** Short price for option labels and chips: $1M, $2.5M, $50M. */
export const shortPrice = (n: number) => `$${n >= 1_000_000 ? `${+(n / 1_000_000).toFixed(1)}M` : `${Math.round(n / 1000)}K`}`;

/** Query string for a filter set, omitting defaults; `drop` removes one key (for "remove filter" chips). */
export function toQuery(f: Filters, drop?: keyof Filters) {
  const q = new URLSearchParams();
  const entries: [keyof Filters, string | undefined][] = [
    ["village", f.village],
    ["min", f.min?.toString()],
    ["max", f.max?.toString()],
    ["beds", f.beds?.toString()],
    ["baths", f.baths?.toString()],
    ["acres", f.acres?.toString()],
    ["setting", f.setting],
    ["sort", f.sort !== "price-desc" ? f.sort : undefined],
  ];
  for (const [k, v] of entries) if (v && k !== drop) q.set(k, v);
  const s = q.toString();
  return s ? `?${s}` : "";
}

/** Human-readable active filters, each with the URL that removes it. */
export function activeFilters(f: Filters): { key: keyof Filters; label: string; href: string }[] {
  const village = VILLAGE_OPTIONS.find((v) => v.slug === f.village)?.name;
  const items: [keyof Filters, string | undefined][] = [
    ["village", village],
    ["min", f.min ? `From ${shortPrice(f.min)}` : undefined],
    ["max", f.max ? `Up to ${shortPrice(f.max)}` : undefined],
    ["beds", f.beds ? `${f.beds}+ bedrooms` : undefined],
    ["baths", f.baths ? `${f.baths}+ baths` : undefined],
    ["acres", f.acres ? `${f.acres}+ acres` : undefined],
    ["setting", SETTING_OPTIONS.find((s) => s.value === f.setting)?.label],
  ];
  return items.filter(([, label]) => label).map(([key, label]) => ({ key, label: label!, href: `/listings${toQuery(f, key)}` }));
}

/** A plain-English summary of the search, used to prefill the "Tell Barry" message. */
export function describeSearch(f: Filters) {
  const parts = activeFilters(f).map((a) => a.label.replace(/^From /, "from ").replace(/^Up to /, "up to "));
  return parts.length ? `I am looking for a property: ${parts.join(", ")}.` : "I am looking for a property in the Hamptons.";
}

export { formatPrice };
