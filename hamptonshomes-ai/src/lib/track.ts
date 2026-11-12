import { pageVillage } from "@/lib/intent";

type Fbq = (...args: unknown[]) => void;
type Gtag = (...args: unknown[]) => void;

declare global {
  interface Window {
    oaiq?: (...args: unknown[]) => void;
  }
}

/** OpenAI Ads lead conversion. No-ops until the base snippet has set window.oaiq. */
export function measureOpenAiLead() {
  if (typeof window === "undefined") return;
  if (typeof window.oaiq !== "function") return;
  try {
    window.oaiq("measure", "lead_created", { type: "customer_action" });
  } catch {}
}

/** Fire the Meta Lead and GA4 generate_lead events after a successful form submit. Safe when neither tag is loaded. */
export function trackLead(formType: string, extra: { hamlet?: string; intent?: string; source?: string } = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { fbq?: Fbq; gtag?: Gtag };
  const hamlet = extra.hamlet || pageVillage();
  const params: Record<string, string> = { form_type: formType, page_path: window.location.pathname };
  if (hamlet) params.hamlet = hamlet;
  if (extra.intent) params.intent = extra.intent;
  if (extra.source) params.form_source = extra.source;
  try {
    w.fbq?.("track", "Lead", { content_name: formType, content_category: hamlet ?? "East End", ...params });
  } catch {}
  try {
    w.gtag?.("event", "generate_lead", params);
  } catch {}
}
