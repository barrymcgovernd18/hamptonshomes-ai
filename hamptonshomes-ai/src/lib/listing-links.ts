import { clientViewToken } from "./client-view-tokens";
import { SALE_ROWS } from "./sale-listings";

/**
 * EastEndLI Client View links, the branded page a shared listing opens on.
 * `p` and `mc` are the base64 form of Barry McGovern's member id, 528948.
 * `mc` is Client View and lists Barry only. `mp` is the public view and lists the Hedgerow Exclusive Team first.
 * A share from EastEndLI also adds a one-time `listshare` token (`?tchreq=&mc`).
 * That token is what still opens a sold listing after the public page says it is no longer active.
 * EastEndLI issues it from Members, ViewOne, Share, Client View.
 * A stored token re-links a sold listing whose public page says it is no longer active.
 * The token is used only when the MLS id and the normalized street both match.
 * Addresses without a token are linked only when the Client View page still resolves.
 * Future posts can call `linkListing` directly, or mention a full street address.
 * `linkifySaleMentions` links an address when this index has a resolving MLS id for it.
 * Deed-only sales with no MLS id stay plain text.
 */

/** Base64 of Barry McGovern's EastEndLI member id, 528948. */
const BARRY_CLIENT_VIEW = "NTI4OTQ4";

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

/**
 * Report streets that do not match the MLS street line.
 * 125 Mid Ocean Drive is omitted: MLS 933998 is an undisclosed Bridgehampton address.
 */
const ADDRESS_ALIASES: { street: string; mlsId: string; price: number }[] = [
  { street: "700 meadow lane", mlsId: "874794", price: 112_500_000 },
  { street: "400 first neck lane", mlsId: "923287", price: 29_500_000 },
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

export function elyListingUrl(mlsId: string, street?: string) {
  const token = street ? clientViewToken(mlsId, normalizeStreet(street)) : undefined;
  if (token) return `https://hedgerow.eastendli.com/?tchreq=${token}&mc`;
  return `https://hedgerow.eastendli.com/property/${mlsId}/?p=${BARRY_CLIENT_VIEW}&mc=${BARRY_CLIENT_VIEW}`;
}

/** Markdown link for a sale or listing. Pass the MLS id from EastEndLI. */
export function linkListing(label: string, mlsId: string) {
  return `[${label}](${elyListingUrl(mlsId, label)})`;
}

/**
 * MLS ids whose Client View page still opens, checked October 11, 2026.
 * Every other indexed id returns "This listing is no longer active."
 */
const RESOLVING_LISTINGS = new Set<string>([
  "923124", "903505", "881727", "923524", "924151", "923032", "903709", "910199",
  "926554", "925843", "917092", "920546", "912754", "925549", "927193", "923287",
  "923559", "897350", "914846", "915157", "918576", "898435", "924488", "899418",
  "923909", "922886", "922973", "898434", "906613", "913603", "923591", "926009",
  "922602", "915357", "917533", "928122", "920871", "894218", "923030", "911009",
  "924823", "927214", "922102", "916166", "923773", "923774", "921941", "915860",
  "916429", "925903", "920988", "926471", "879316", "927817", "892214", "925576",
  "914424", "907711", "903608", "907712", "923127", "925026", "924595", "927258",
  "923003", "916993", "922738", "920567", "915177", "927400", "926870", "916048",
  "878974", "902366", "893694", "893888", "902857", "923036", "923037", "922290",
  "922341", "926023", "925607", "925611", "918523", "904806", "912026", "912473",
  "441154", "922316", "927089", "926946", "904000", "930613", "913250", "913260",
  "923906", "912861", "921791", "922825", "934396", "906649", "911311", "927793",
  "920205", "912488", "915179", "918423", "925817", "925613", "924429", "925016",
  "920240", "901193", "920581", "910536", "899290", "888739", "935228", "925935",
  "934260", "932217", "935517", "908849", "934942", "932626", "914822",
]);

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
  if (!RESOLVING_LISTINGS.has(mlsId) && !clientViewToken(mlsId, street)) continue;
  addRecord(street, {
    mlsId,
    price: price > 0 ? price : null,
    exclusive: (flags & 1) === 1,
    hedgerow: (flags & 2) === 2,
  });
}

for (const alias of ADDRESS_ALIASES) {
  if (!RESOLVING_LISTINGS.has(alias.mlsId) && !clientViewToken(alias.mlsId, alias.street)) continue;
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

function sentenceStart(text: string) {
  for (let index = text.length - 1; index >= 0; index -= 1) {
    if (text[index] !== ".") continue;
    const prev = text[index - 1];
    const next = text[index + 1];
    if (prev && /\d/.test(prev) && next && /\d/.test(next)) continue;
    return index + 1;
  }
  return 0;
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

function streetHasOtherPrice(street: string, records: SaleRecord[]) {
  return SALE_ROWS.some(([mlsId, price, , rowStreet]) => {
    if (rowStreet !== street || price <= 0) return false;
    return records.some(
      (record) => record.mlsId !== mlsId && record.price != null && !priceClose(record.price, price)
    );
  });
}

function mlsIdFor(street: string, nearby: number | null) {
  const records = salesByStreet.get(street);
  if (!records?.length) return null;
  const priced = records.filter((record) => record.price != null);
  if (nearby != null) {
    const hits = priced.filter((record) => priceClose(record.price as number, nearby));
    if (hits.length) return pick(hits);
    // A nearby price that matches none of the indexed sales is a different trade
    // at the same street. Do not attach a share token to that sentence.
    // Unpublished MLS prices (0) still link, because the report price is the only one.
    const tokenOnly = records.every((record) => !RESOLVING_LISTINGS.has(record.mlsId));
    if (tokenOnly && priced.length > 0) return null;
  }
  const distinct = new Set(priced.map((record) => record.price));
  if (distinct.size === 1) {
    const tokenOnly = records.every((record) => !RESOLVING_LISTINGS.has(record.mlsId));
    if (tokenOnly && streetHasOtherPrice(street, records)) return null;
    return pick(priced);
  }
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
    const sentence = beforeScope.slice(sentenceStart(beforeScope));
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
