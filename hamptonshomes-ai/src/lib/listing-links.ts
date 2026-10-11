import { SALE_ROWS } from "./sale-listings";

/**
 * Public EastEndLI listing URLs, the same pattern as sold comps in src/lib/sales.ts.
 * Future posts can call `linkListing` directly, or mention a full street address.
 * `linkifySaleMentions` links an address when this index has an MLS id for it.
 * Deed-only sales with no MLS id stay plain text.
 */

const SUFFIX_ABBREV: Record<string, string> = {
  ln: "lane",
  rd: "road",
  st: "street",
  dr: "drive",
  ave: "avenue",
  av: "avenue",
  ct: "court",
  pl: "place",
  blvd: "boulevard",
  ter: "terrace",
  terr: "terrace",
  hwy: "highway",
  cir: "circle",
  trl: "trail",
  pt: "point",
  pkwy: "parkway",
};

const DIRECTION: Record<string, string> = { n: "north", s: "south", e: "east", w: "west" };

const STREET_SUFFIX =
  "Lane|Road|Street|Drive|Avenue|Court|Place|Path|Way|Boulevard|Terrace|Highway|Circle|Trail|Close|Walk|Point|Cove|Hollow|Run|Gate|Row|Bluff|Turnpike|Parkway|Neck|Alley|Mews|Crescent|Ridge";

const ADDRESS = new RegExp(
  String.raw`\b\d+[A-Za-z]?(?:\s+(?:and|&)\s+\d+[A-Za-z]?)?\s+(?:[A-Z][A-Za-z'’.]*\s+){0,6}(?:${STREET_SUFFIX})\b`,
  "g"
);

const PRICE = /\$(\d{1,3}(?:,\d{3})+|\d+(?:\.\d+)?)\s*(million)?/gi;

type SaleRecord = {
  mlsId: string;
  price: number | null;
  hedgerow: boolean;
  exclusive: boolean;
};

/** MLS sales whose street line does not spell the address used in the reports. */
const ADDRESS_ALIASES: { street: string; mlsId: string; price: number }[] = [
  { street: "700 meadow lane", mlsId: "874794", price: 112_500_000 },
  { street: "400 first neck lane", mlsId: "923287", price: 29_500_000 },
  { street: "125 mid ocean drive", mlsId: "933998", price: 57_000_000 },
  { street: "42 hither lane", mlsId: "922347", price: 30_000_000 },
  { street: "55 middle lane", mlsId: "922347", price: 30_000_000 },
];

export function normalizeStreet(value: string) {
  const cleaned = value
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/['’.]/g, "")
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^a-z0-9\s]/g, " ");
  const words = cleaned.split(/\s+/).filter(Boolean);
  return words
    .map((word, index) => {
      const last = index === words.length - 1;
      if (last && SUFFIX_ABBREV[word]) return SUFFIX_ABBREV[word];
      if (!last && DIRECTION[word]) return DIRECTION[word];
      return word;
    })
    .join(" ");
}

export function elyListingUrl(mlsId: string) {
  return `https://hedgerow.eastendli.com/property/${mlsId}/`;
}

/** Markdown link for a sale or listing. Pass the MLS id from EastEndLI. */
export function linkListing(label: string, mlsId: string) {
  return `[${label}](${elyListingUrl(mlsId)})`;
}

const salesByStreet = new Map<string, SaleRecord[]>();

function addRecord(street: string, record: SaleRecord) {
  const list = salesByStreet.get(street);
  if (!list) {
    salesByStreet.set(street, [record]);
    return;
  }
  if (list.some((item) => item.mlsId === record.mlsId && item.price === record.price)) return;
  list.push(record);
}

for (const [mlsId, price, flags, street] of SALE_ROWS) {
  addRecord(street, {
    mlsId,
    price: price > 0 ? price : null,
    exclusive: (flags & 1) === 1,
    hedgerow: (flags & 2) === 2,
  });
}

for (const alias of ADDRESS_ALIASES) {
  addRecord(alias.street, { mlsId: alias.mlsId, price: alias.price, exclusive: true, hedgerow: false });
}

function pick(records: SaleRecord[]) {
  const ranked = records.slice().sort((a, b) => {
    if (a.hedgerow !== b.hedgerow) return a.hedgerow ? -1 : 1;
    if (a.exclusive !== b.exclusive) return a.exclusive ? -1 : 1;
    return Number(a.mlsId) - Number(b.mlsId);
  });
  return ranked[0]?.mlsId;
}

function pricesIn(text: string) {
  const found: number[] = [];
  PRICE.lastIndex = 0;
  for (const match of text.matchAll(PRICE)) {
    const amount = Number(match[1].replace(/,/g, ""));
    if (!Number.isFinite(amount)) continue;
    found.push(match[2] ? Math.round(amount * 1_000_000) : amount);
  }
  return found;
}

function priceClose(left: number, right: number) {
  const gap = Math.abs(left - right);
  return gap <= 1000 || gap / Math.max(left, right) <= 0.005;
}

function mlsIdFor(street: string, nearby: number | null) {
  const records = salesByStreet.get(street);
  if (!records?.length) return null;
  const priced = records.filter((record) => record.price != null);
  if (nearby != null) {
    const hits = priced.filter((record) => priceClose(record.price as number, nearby));
    if (hits.length) return pick(hits);
  }
  const distinct = new Set(priced.map((record) => record.price));
  if (distinct.size === 1) return pick(priced);
  if (priced.length === 0) return pick(records);
  return null;
}

function linkifyLine(line: string) {
  const masks: string[] = [];
  const masked = line.replace(/\[[^\]]+\]\([^)]+\)/g, (match) => {
    const token = `\u0000${masks.length}\u0000`;
    masks.push(match);
    return token;
  });

  ADDRESS.lastIndex = 0;
  const matches = [...masked.matchAll(ADDRESS)];
  if (!matches.length) return restore(masked, masks);

  let cursor = 0;
  let next = "";
  matches.forEach((match, index) => {
    const start = match.index ?? 0;
    const end = start + match[0].length;
    const following = matches[index + 1];
    const after = masked.slice(end, following?.index ?? masked.length);
    const before = masked.slice(cursor, start);
    const afterPrices = pricesIn(after);
    const beforeScope = before.slice(-60);
    const sentence = beforeScope.slice(beforeScope.lastIndexOf(".") + 1);
    const beforePrices = pricesIn(sentence);
    const nearby = afterPrices[0] ?? beforePrices.at(-1) ?? null;
    const mlsId = mlsIdFor(normalizeStreet(match[0]), nearby);
    next += masked.slice(cursor, start);
    next += mlsId ? linkListing(match[0], mlsId) : match[0];
    cursor = end;
  });
  next += masked.slice(cursor);
  return restore(next, masks);
}

function restore(value: string, masks: string[]) {
  return value.replace(/\u0000(\d+)\u0000/g, (_match, index) => masks[Number(index)] ?? "");
}

/** Link full street addresses to EastEndLI when an MLS id is known. Safe to run more than once. */
export function linkifySaleMentions(content: string) {
  return content
    .split("\n")
    .map((line) => linkifyLine(line))
    .join("\n");
}
