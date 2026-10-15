/** Shared by the intent CTA, the intent form, the reader slide-in and the in-report valuation line. */
export const INTENTS = [
  { value: "buy", label: "Buy" },
  { value: "sell", label: "Sell" },
  { value: "rent", label: "Rent" },
  { value: "valuation", label: "Valuation" },
] as const;
export type Intent = (typeof INTENTS)[number]["value"];

export const TIMINGS = [
  { value: "0-3", label: "0 to 3 months" },
  { value: "3-12", label: "3 to 12 months" },
  { value: "exploring", label: "Exploring" },
] as const;

export const INTENT_EVENT = "hh:intent";

export function openIntent(detail: { intent?: Intent; village?: string } = {}) {
  window.dispatchEvent(new CustomEvent(INTENT_EVENT, { detail }));
}

/** Village of the current report page, published by the article template as data-report-village. */
export function pageVillage(): string | undefined {
  if (typeof document === "undefined") return undefined;
  return document.querySelector<HTMLElement>("[data-report-village]")?.dataset.reportVillage || undefined;
}
