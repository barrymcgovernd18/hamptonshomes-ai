import { Resend } from "resend";

/**
 * Server-only helpers for every lead form on the site: listing inquiries, valuations, the oceanfront study signup,
 * the email popup and the contact page. Notifications go to Barry only; visitors never receive an automatic email.
 */

export type LeadForm = "Listing inquiry" | "Home valuation" | "Oceanfront study signup" | "Email popup" | "Listing search" | "Contact";

export interface Lead {
  form: LeadForm;
  name: string;
  email: string;
  phone: string;
  message: string;
  pageUrl: string;
  /** Extra labelled rows for the notification email only (e.g. listing address, property address). */
  details?: [string, string][];
}

export const LEAD_TO = process.env.CONTACT_TO_EMAIL || "barry@hedgerowexclusive.com";
export const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

export function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Only accept page URLs on this site, so the log and notification never carry arbitrary links. */
export function sitePageUrl(value: unknown) {
  const raw = clean(value, 300);
  try {
    const url = new URL(raw);
    if (url.hostname === "hamptonshomes.ai" || url.hostname.endsWith(".vercel.app") || url.hostname === "localhost") {
      return `${url.origin}${url.pathname}`;
    }
  } catch {}
  return "";
}

export function etTimestamp(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(date)
    .replace(",", "");
}

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY);
}

const FROM = () => process.env.CONTACT_FROM_EMAIL || "Hampton Homes <onboarding@resend.dev>";

function row(label: string, value: string) {
  return `<tr><td style="padding:8px 0;color:#8a8a8a;width:130px;vertical-align:top">${escapeHtml(label)}</td><td style="padding:8px 0;color:#222">${value}</td></tr>`;
}

/** Notification email to Barry. Reply-To is the visitor, so Barry can answer directly. */
export async function notifyBarry(lead: Lead, opts: { test?: boolean } = {}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false as const, reason: "not-configured" as const };
  const resend = new Resend(apiKey);
  const subjectTail = lead.details?.find(([k]) => k === "Listing" || k === "Property")?.[1];
  const subject = `${opts.test ? "[TEST] " : ""}${lead.form}: ${oneLine(lead.name) || oneLine(lead.email)}${subjectTail ? `, ${oneLine(subjectTail)}` : ""}`;
  const rows = [
    row("Name", escapeHtml(lead.name) || "Not given"),
    row("Email", `<a href="mailto:${escapeHtml(lead.email)}" style="color:#1f3a44">${escapeHtml(lead.email)}</a>`),
    lead.phone ? row("Phone", `<a href="tel:${escapeHtml(lead.phone.replace(/[^\d+]/g, ""))}" style="color:#1f3a44">${escapeHtml(lead.phone)}</a>`) : "",
    ...(lead.details ?? []).map(([k, v]) => row(k, escapeHtml(v))),
    lead.pageUrl ? row("Page", `<a href="${escapeHtml(lead.pageUrl)}" style="color:#1f3a44">${escapeHtml(lead.pageUrl)}</a>`) : "",
    row("Received", `${escapeHtml(etTimestamp())} ET`),
  ].join("");
  const message = lead.message
    ? `<div style="background:#f4f0e8;padding:20px;margin-top:16px;border-left:3px solid #1f3a44"><p style="margin:0;color:#333;font-size:15px;line-height:1.7">${escapeHtml(lead.message).replace(/\n/g, "<br />")}</p></div>`
    : "";
  const { data, error } = await resend.emails.send({
    from: FROM(),
    to: [LEAD_TO],
    replyTo: lead.email,
    subject: subject.slice(0, 180),
    html: `<div style="font-family:Georgia,serif;max-width:600px;margin:0 auto;padding:32px 20px"><h2 style="color:#111;font-size:22px;font-weight:normal;border-bottom:1px solid #1f3a44;padding-bottom:12px;margin:0">${escapeHtml(lead.form)}</h2><table style="width:100%;margin:20px 0;font-size:15px">${rows}</table>${message}<p style="color:#999;font-size:12px;margin-top:28px">hamptonshomes.ai</p></div>`,
  });
  if (error) {
    console.error("Lead email error:", error);
    return { ok: false as const, reason: "send-failed" as const };
  }
  return { ok: true as const, id: data?.id };
}

/** Stores a signup as a Resend contact (and in RESEND_SEGMENT_ID when set). Never sends anything to the subscriber. */
export async function saveSubscriber(email: string, name: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false as const };
  try {
    const resend = new Resend(apiKey);
    const [firstName, ...rest] = name.split(/\s+/).filter(Boolean);
    const segment = process.env.RESEND_SEGMENT_ID;
    const { error } = await resend.contacts.create({
      email,
      unsubscribed: false,
      ...(firstName ? { firstName } : {}),
      ...(rest.length ? { lastName: rest.join(" ") } : {}),
      ...(segment ? { segments: [{ id: segment }] } : {}),
    });
    if (error && !/already exists/i.test(error.message ?? "")) console.error("Resend contact error:", error);
    return { ok: !error };
  } catch (err) {
    console.error("Resend contact error:", err);
    return { ok: false as const };
  }
}

/**
 * Appends one row to the leads Google Sheet through its Apps Script web app (scripts/leads-sheet.gs).
 * Columns: Date (ET), Name, Email, Phone, Form, Page URL, Message. Skipped when LEADS_SHEET_URL is not set.
 */
export async function logLead(lead: Lead) {
  const url = process.env.LEADS_SHEET_URL;
  const secret = process.env.LEADS_SHEET_SECRET;
  if (!url || !secret) return { ok: false as const, reason: "not-configured" as const };
  const extra = (lead.details ?? []).map(([k, v]) => `${k}: ${v}`).join(" | ");
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify({
        secret,
        row: [etTimestamp(), lead.name, lead.email, lead.phone, lead.form, lead.pageUrl, [extra, lead.message].filter(Boolean).join(" | ")],
      }),
      redirect: "follow",
      signal: AbortSignal.timeout(8000),
    });
    return { ok: res.ok };
  } catch (err) {
    console.error("Lead sheet error:", err);
    return { ok: false as const, reason: "failed" as const };
  }
}
