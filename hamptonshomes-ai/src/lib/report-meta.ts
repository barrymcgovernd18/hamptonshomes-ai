/**
 * Sourcing lines and neighbour links for the October 2026 market reports.
 * Sales figures themselves stay in the report files. Nothing here adds a closing.
 */

export type ReportNeighbor = { href: string; label: string };

const eastHampton: ReportNeighbor = {
  href: "/blog/east-hampton-luxury-market-overview-2026-10",
  label: "East Hampton",
};
const wainscott: ReportNeighbor = {
  href: "/blog/wainscott-luxury-market-snapshot-2026-10",
  label: "Wainscott",
};
const sagaponack: ReportNeighbor = {
  href: "/blog/sagaponack-luxury-market-overview-2026-10",
  label: "Sagaponack",
};
const bridgehampton: ReportNeighbor = {
  href: "/blog/bridgehampton-luxury-market-overview-2026-10",
  label: "Bridgehampton",
};
const waterMill: ReportNeighbor = {
  href: "/blog/water-mill-luxury-market-overview-2026-10",
  label: "Water Mill",
};
const southampton: ReportNeighbor = {
  href: "/blog/southampton-luxury-market-overview-2026-10",
  label: "Southampton",
};
const sagHarbor: ReportNeighbor = {
  href: "/blog/sag-harbor-village-luxury-market-overview-2026-10",
  label: "Sag Harbor Village",
};
const sagHarborWater: ReportNeighbor = {
  href: "/blog/sag-harbor-waterfront-luxury-market-2026-10",
  label: "Sag Harbor waterfront",
};
const northHaven: ReportNeighbor = {
  href: "/blog/north-haven-luxury-market-2026-10",
  label: "North Haven",
};
const shelterIsland: ReportNeighbor = {
  href: "/blog/shelter-island-luxury-market-2026-10",
  label: "Shelter Island",
};
const shelterWater: ReportNeighbor = {
  href: "/blog/shelter-island-waterfront-luxury-market-2026-10",
  label: "Shelter Island waterfront",
};
const oceanfront: ReportNeighbor = {
  href: "/blog/hamptons-oceanfront-market-2021-2026",
  label: "Oceanfront, 2021 to 2026",
};

/** EastEndLI is the Hamptons listing service these reports are built from. */
const WITH_OFF_MARKET =
  "Sales in this report come from EastEndLI, together with recorded deeds and the off-market trades named below.";


const WITH_DEEDS = "Sales in this report come from EastEndLI, together with recorded deeds.";

const SHELTER =
  "Sales in this report come from EastEndLI. Shelter Island sits outside the South Fork deed feed, so this count is the listing service alone.";

export const REPORT_SOURCE_LINE: Record<string, string> = {
  "east-end-luxury-market-overview-2026-10": WITH_OFF_MARKET,
  "hamptons-luxury-market-report-2026-ytd": WITH_OFF_MARKET,
  "hamptons-market-report-2026-ytd": WITH_OFF_MARKET,
  "hamptons-luxury-market-report-2021-2026": WITH_OFF_MARKET,
  "hamptons-market-report-2021-2026": WITH_OFF_MARKET,
  "east-hampton-luxury-market-overview-2026-10": WITH_OFF_MARKET,
  "southampton-luxury-market-overview-2026-10": WITH_OFF_MARKET,
  "bridgehampton-luxury-market-overview-2026-10": WITH_OFF_MARKET,
  "water-mill-luxury-market-overview-2026-10": WITH_DEEDS,
  "wainscott-luxury-market-snapshot-2026-10": WITH_DEEDS,
  "sagaponack-luxury-market-overview-2026-10": WITH_OFF_MARKET,
  "sag-harbor-village-luxury-market-overview-2026-10": WITH_OFF_MARKET,
  "sag-harbor-waterfront-luxury-market-2026-10": WITH_DEEDS,
  "north-haven-luxury-market-2026-10": WITH_OFF_MARKET,
  "shelter-island-luxury-market-2026-10": SHELTER,
  "shelter-island-waterfront-luxury-market-2026-10": SHELTER,
  "hamptons-oceanfront-market-2021-2026":
    "Sales in this study come from EastEndLI comparable sales, recorded deeds, and Hedgerow's oceanfront records, read against lots that reach the beach.",
};

/** Immediate neighbours, including East Hampton, Wainscott, and Sagaponack in both directions. */
export const REPORT_NEIGHBORS: Record<string, ReportNeighbor[]> = {
  "east-end-luxury-market-overview-2026-10": [
    southampton,
    waterMill,
    bridgehampton,
    sagaponack,
    wainscott,
    eastHampton,
    sagHarbor,
    sagHarborWater,
    northHaven,
    shelterIsland,
    shelterWater,
    oceanfront,
  ],
  "southampton-luxury-market-overview-2026-10": [waterMill],
  "water-mill-luxury-market-overview-2026-10": [southampton, bridgehampton],
  "bridgehampton-luxury-market-overview-2026-10": [waterMill, sagaponack],
  "sagaponack-luxury-market-overview-2026-10": [bridgehampton, wainscott, eastHampton],
  "wainscott-luxury-market-snapshot-2026-10": [sagaponack, eastHampton],
  "east-hampton-luxury-market-overview-2026-10": [wainscott, sagaponack],
  "sag-harbor-village-luxury-market-overview-2026-10": [northHaven, sagHarborWater],
  "sag-harbor-waterfront-luxury-market-2026-10": [sagHarbor, northHaven],
  "north-haven-luxury-market-2026-10": [sagHarbor, sagHarborWater, shelterIsland],
  "shelter-island-luxury-market-2026-10": [shelterWater, northHaven],
  "shelter-island-waterfront-luxury-market-2026-10": [shelterIsland, northHaven],
};
