/**
 * Hedgerow Exclusive Properties' sold track record for /hedgerow-sales.
 * Built from the site's existing Hedgerow sales data (cross-checked against Hedgerow's Prominent Deals page and
 * published sold listings). Firm roles only; this page never marks individual agents' involvement.
 */
import { hedgerowFirmHistory, hedgerowSold2021, type HedgerowSoldDeal } from "@/lib/portfolio";

export type SaleSetting = "oceanfront" | "waterfront" | "land" | "estate";

export interface FirmSale {
  id: string;
  address: string;
  village: string;
  villageSlug: string;
  price: string;
  priceNum: number;
  /** ISO date or YYYY-MM or YYYY; empty when Hedgerow publishes no date. */
  date: string;
  dateText: string;
  year?: number;
  role: string;
  settings: SaleSetting[];
  settingLabel: string;
  image?: string;
  alt: string;
}

/** Deals Hedgerow files under Vacant Land on its Prominent Deals page, keyed by address and price. */
const LAND = new Set([
  "35 Potato Road & 543 Daniels Lane|46500000",
  "121 Further Lane & 40 Middle Lane|35250000",
  "325 Bluff Road|32000000",
  "9 Morgan Hill Lane|18000000",
  "191 Highland Terrace|12200000",
  "20 Forest Road|10995000",
  "57 Wainscott Hollow Road|9100000",
  "44 Deforest Road|9000000",
  "24 Forest Road|7250000",
  "51 Wainscott Hollow Road|7100000",
  "10 Meadowbrook Way|6500000",
  "22 Shore Road|6425000",
  "479 Pauls Lane|4825000",
  "28 Hedges Lane|4250000",
  "7 Casey Lane|3760000",
  "2 Baiting Hollow Road|3600000",
  "724 Butter Lane|3100000",
  "44 Robeson Boulevard|2800000",
  "5 Gardiners Bay Drive|1751000",
  "828 Old Sag Harbor Road|1550000",
]);

/**
 * Setting corrections from Hedgerow's own property categories (waterfront, bayfront, pondfront, oceanfront) and, for
 * 33 Dinah Rock Road, Hedgerow's listing (186 feet of beachfront), where the shared data files them as estate and village.
 */
const SETTING_OVERRIDE: Partial<Record<string, "Oceanfront" | "Waterfront">> = {
  "33 Dinah Rock Road|6995000": "Waterfront",
  "10 Meadowbrook Way|6500000": "Waterfront",
  "120 Bay Lane|12625000": "Waterfront",
  "26 Duke Drive|6350000": "Waterfront",
  "10 Helens Lane|1671000": "Waterfront",
  "26 S Elroy Drive|9150000": "Waterfront",
  "8 John Street|15518174": "Waterfront",
  "20 Forest Road|10995000": "Waterfront",
  "48 Forest Road|14000000": "Waterfront",
  "675 Flying Point Road|17500000": "Waterfront",
  "5 Agnew Avenue|10500000": "Oceanfront",
};

/**
 * Left off this page: 40 Meadow Lane (Hedgerow publishes $45,000,000; the recorded sale is $42,920,000),
 * 40 Deforest Road (no published price) and 432 Park Avenue PH 82 (Manhattan, outside the East End).
 */
const EXCLUDE = new Set(["40 Meadow Lane", "40 Deforest Road", "432 Park Avenue, PH 82"]);

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function toSale(d: HedgerowSoldDeal): FirmSale {
  const key = `${d.address.replace(/\s+/g, " ")}|${d.priceNum}`;
  const land = LAND.has(key);
  const group = SETTING_OVERRIDE[key] ?? d.group;
  const settings: SaleSetting[] = [];
  if (group === "Oceanfront") settings.push("oceanfront");
  if (group === "Waterfront") settings.push("waterfront");
  if (land) settings.push("land");
  if (!settings.length) settings.push("estate");
  const base = group === "Estate and village" ? "" : group;
  const settingLabel = land ? (base ? `${base} land` : "Land") : base || "Estate and village";
  const year = /^\d{4}/.test(d.date) ? Number(d.date.slice(0, 4)) : undefined;
  return {
    id: `${slugify(d.address)}-${d.date || "undated"}-${d.priceNum}`,
    address: d.address,
    village: d.area,
    villageSlug: slugify(d.area),
    price: d.price,
    priceNum: d.priceNum,
    date: d.date,
    dateText: d.dateText || (year ? String(year) : ""),
    year,
    role: d.roleLabel || "A Hedgerow transaction",
    settings,
    settingLabel,
    image: d.image,
    alt: d.alt || `${d.address}, ${d.area}`,
  };
}

export const firmSales: FirmSale[] = [...hedgerowSold2021, ...hedgerowFirmHistory]
  .filter((d) => d.price && d.priceNum > 0 && !EXCLUDE.has(d.address))
  .map(toSale);

export const PRICE_BANDS = [
  { key: "under-5m", label: "Under $5M", min: 0, max: 5_000_000 },
  { key: "5m-10m", label: "$5M to $10M", min: 5_000_000, max: 10_000_000 },
  { key: "10m-20m", label: "$10M to $20M", min: 10_000_000, max: 20_000_000 },
  { key: "20m-50m", label: "$20M to $50M", min: 20_000_000, max: 50_000_000 },
  { key: "50m-plus", label: "$50M and above", min: 50_000_000, max: Infinity },
] as const;

export const SETTINGS: { key: SaleSetting; label: string }[] = [
  { key: "oceanfront", label: "Oceanfront" },
  { key: "waterfront", label: "Waterfront" },
  { key: "land", label: "Land" },
  { key: "estate", label: "Estate and village" },
];

export const SORTS = [
  { key: "price", label: "Price, highest first" },
  { key: "newest", label: "Newest first" },
] as const;

export const VILLAGES = [...new Map(firmSales.map((s) => [s.villageSlug, s.village])).entries()]
  .map(([key, label]) => ({ key, label }))
  .sort((a, b) => a.label.localeCompare(b.label));

export const YEARS = [...new Set(firmSales.flatMap((s) => (s.year ? [s.year] : [])))].sort((a, b) => b - a);

export interface SalesFilters {
  village?: string;
  price?: string;
  year?: string;
  type?: string;
  sort: "price" | "newest";
}

const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v)?.trim() || undefined;

/** Reads URL params, dropping any value that is not a known option. */
export function parseFilters(params: Record<string, string | string[] | undefined>): SalesFilters {
  const village = one(params.village);
  const price = one(params.price);
  const year = one(params.year);
  const type = one(params.type);
  const sort = one(params.sort);
  return {
    village: VILLAGES.some((v) => v.key === village) ? village : undefined,
    price: PRICE_BANDS.some((b) => b.key === price) ? price : undefined,
    year: YEARS.some((y) => String(y) === year) ? year : undefined,
    type: SETTINGS.some((s) => s.key === type) ? type : undefined,
    sort: sort === "newest" ? "newest" : "price",
  };
}

export function applyFilters(f: SalesFilters) {
  const band = PRICE_BANDS.find((b) => b.key === f.price);
  const matches = firmSales.filter(
    (s) =>
      (!f.village || s.villageSlug === f.village) &&
      (!band || (s.priceNum >= band.min && s.priceNum < band.max)) &&
      (!f.year || String(s.year) === f.year) &&
      (!f.type || s.settings.includes(f.type as SaleSetting)),
  );
  const byPrice = (a: FirmSale, b: FirmSale) => b.priceNum - a.priceNum;
  // By price: one continuous list, highest first. Newest first: dated sales by date, then undated ones by price.
  const byDate = f.sort === "newest";
  const dated = byDate
    ? matches.filter((s) => s.date).sort((a, b) => b.date.localeCompare(a.date) || byPrice(a, b))
    : [...matches].sort(byPrice);
  const undated = byDate ? matches.filter((s) => !s.date).sort(byPrice) : [];
  const total = matches.reduce((sum, s) => sum + s.priceNum, 0);
  return { dated, undated, count: matches.length, total };
}

export function formatVolume(n: number) {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2).replace(/\.?0+$/, "")} billion`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")} million`;
  return `$${n.toLocaleString("en-US")}`;
}

export function filterQuery(f: Partial<SalesFilters>) {
  const q = new URLSearchParams();
  if (f.village) q.set("village", f.village);
  if (f.price) q.set("price", f.price);
  if (f.year) q.set("year", f.year);
  if (f.type) q.set("type", f.type);
  if (f.sort && f.sort !== "price") q.set("sort", f.sort);
  const s = q.toString();
  return s ? `?${s}` : "";
}
