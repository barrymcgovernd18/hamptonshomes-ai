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
 * One route handler for the listing inquiry, home valuation, oceanfront study signup and email popup forms.
 * Each submission emails Barry, is appended to the leads sheet, and (for signups) is stored as a Resend contact.
 * Visitors never receive an automatic email.
 */

const KINDS = {
  listing: "Listing inquiry",
  valuation: "Home valuation",
  signup: "Oceanfront study signup",
  popup: "Email popup",
  search: "Listing search",
} as const;
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
  if ((kind === "listing" || kind === "valuation" || kind === "search") && !name) return bad("Please enter your name.");

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

  if (!emailConfigured()) return bad("Email service not configured", 503);

  const lead: Lead = { form: KINDS[kind], name, email, phone, message, pageUrl, details };
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
