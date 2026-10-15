import { NextResponse } from "next/server";
import { listingBySlug } from "@/lib/listing-pages";
import {
  EMAIL_RE,
  clean,
  emailConfigured,
  logLead,
  notifyBarry,
  saveSubscriber,
  sitePageUrl,
  type Lead,
} from "@/lib/leads";

/**
 * One route handler for the listing inquiry, home valuation, monthly brief and email popup forms.
 * Each submission emails Barry, is appended to the leads sheet, and (for signups) is stored as a Resend contact.
 * Visitors never receive an automatic email.
 */

const KINDS = {
  listing: "Listing inquiry",
  valuation: "Home valuation",
  signup: "Market brief",
  popup: "Email popup",
  search: "Listing search",
  intent: "Inquiry",
} as const;
const INTENT_LABELS: Record<string, string> = { buy: "Buy", sell: "Sell", rent: "Rent", valuation: "Valuation" };
const TIMING_LABELS: Record<string, string> = { "0-3": "0 to 3 months", "3-12": "3 to 12 months", exploring: "Exploring" };
const INTERESTS = ["Buying", "Selling", "Renting", "Just the brief"];
type Kind = keyof typeof KINDS;

const ALLOWED_ORIGINS = /^https:\/\/(hamptonshomes\.ai|[a-z0-9-]+\.vercel\.app)$|^http:\/\/localhost(:\d+)?$/;

function bad(error: string, status = 400) {
  return NextResponse.json({ error }, { status });
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && !ALLOWED_ORIGINS.test(origin)) return bad("Invalid request", 403);

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return bad("Invalid request");
  }
  if (!body || typeof body !== "object") return bad("Invalid request");

  const kind = clean(body.kind, 20) as Kind;
  if (!(kind in KINDS)) return bad("Invalid request");

  // Honeypot: hidden from people, filled by bots. Answer as if it worked.
  if (clean(body.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(body.name, 120);
  const email = clean(body.email, 200);
  const phone = clean(body.phone, 40).replace(/[^\d+().\s-]/g, "");
  const message = clean(body.message, 4000);
  const pageUrl = sitePageUrl(body.pageUrl);

  if (!EMAIL_RE.test(email)) return bad("Please enter a valid email address.");
  if ((kind === "listing" || kind === "valuation" || kind === "search" || kind === "intent") && !name) return bad("Please enter your name.");

  const details: [string, string][] = [];
  if (kind === "listing") {
    const listing = listingBySlug(clean(body.listing, 120));
    if (!listing) return bad("Invalid request");
    details.push(["Listing", `${listing.address}, ${listing.area}`]);
  }
  if (kind === "valuation") {
    const property = clean(body.property, 200);
    if (!property) return bad("Please enter the property address.");
    details.push(["Property", property]);
  }

  let form: string = KINDS[kind];
  if (kind === "intent") {
    const intent = INTENT_LABELS[clean(body.intent, 20)];
    if (!intent) return bad("Please choose Buy, Sell, Rent or Valuation.");
    const village = clean(body.village, 60);
    const property = clean(body.property, 200);
    if ((intent === "Sell" || intent === "Valuation") && !property) return bad("Please enter the property address.");
    form = `${intent} inquiry${village ? ` · ${village}` : ""}`;
    details.push(["Intent", intent]);
    if (property) details.push(["Property", property]);
    if (village) details.push(["Village", village]);
    const timing = TIMING_LABELS[clean(body.timing, 20)];
    if (timing) details.push(["Timing", timing]);
    const source = clean(body.source, 40);
    if (source) details.push(["Opened from", source]);
  }
  if (kind === "popup" || kind === "signup") {
    const interest = clean(body.interest, 40);
    if (INTERESTS.includes(interest)) {
      details.push(["Interested in", interest]);
      if (interest !== "Just the brief") form = `${KINDS[kind]} · ${interest}`;
    }
  }

  if (!emailConfigured()) return bad("Email service not configured", 503);

  const lead: Lead = { form, name, email, phone, message, pageUrl, details };
  const testToken = process.env.LEADS_TEST_TOKEN;
  const test = Boolean(testToken) && request.headers.get("x-lead-test") === testToken;

  const [sent, , saved] = await Promise.all([
    notifyBarry(lead, { test }),
    test ? Promise.resolve({ ok: false }) : logLead(lead),
    (kind === "signup" || kind === "popup") && !test ? saveSubscriber(email, name) : Promise.resolve({ ok: false }),
  ]);

  if (!sent.ok && !saved.ok) return bad("Something went wrong. Please call or email Barry directly.", 502);
  return NextResponse.json({ ok: true });
}
