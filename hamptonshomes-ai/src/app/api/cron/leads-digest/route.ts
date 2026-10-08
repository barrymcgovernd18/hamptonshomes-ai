import { NextResponse } from "next/server";
import { Resend } from "resend";
import { LEAD_TO, escapeHtml } from "@/lib/leads";

/**
 * Daily lead digest for Barry, run by Vercel Cron (vercel.json, 11:05 UTC = 7:05 AM EDT / 6:05 AM EST).
 * Reads the last 24 hours of rows from the leads sheet (Apps Script web app, scripts/leads-sheet.gs) and emails
 * Barry one table. Sends nothing when there were no leads. Never emails a lead.
 * Disabled unless LEADS_DIGEST_ENABLED=true; Vercel Cron authenticates with CRON_SECRET.
 */

export const dynamic = "force-dynamic";

type Row = [string, string, string, string, string, string, string];

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (process.env.LEADS_DIGEST_ENABLED !== "true") {
    return NextResponse.json({ skipped: "disabled" });
  }
  const sheetUrl = process.env.LEADS_SHEET_URL;
  const sheetSecret = process.env.LEADS_SHEET_SECRET;
  const apiKey = process.env.RESEND_API_KEY;
  if (!sheetUrl || !sheetSecret || !apiKey) {
    return NextResponse.json({ skipped: "not-configured" });
  }

  const res = await fetch(`${sheetUrl}?secret=${encodeURIComponent(sheetSecret)}&hours=24`, { cache: "no-store", redirect: "follow" });
  if (!res.ok) return NextResponse.json({ error: "Sheet unavailable" }, { status: 502 });
  const { rows = [] } = (await res.json()) as { rows?: Row[] };
  if (!rows.length) return NextResponse.json({ sent: false, leads: 0 });

  const head = ["Date (ET)", "Name", "Email", "Phone", "Form", "Page URL", "Message"];
  const th = head.map((h) => `<th style="text-align:left;padding:8px 10px;border-bottom:1px solid #1f3a44;font-weight:normal;color:#5e625f;font-size:12px">${h}</th>`).join("");
  const body = rows
    .map(
      (r) =>
        `<tr>${r
          .map((cell, i) => {
            const v = escapeHtml(String(cell ?? ""));
            const html = i === 2 && v ? `<a href="mailto:${v}" style="color:#1f3a44">${v}</a>` : i === 5 && v ? `<a href="${v}" style="color:#1f3a44">${v.replace(/^https?:\/\/(www\.)?/, "")}</a>` : v;
            return `<td style="padding:8px 10px;border-bottom:1px solid #e3ddd2;vertical-align:top;font-size:13px;color:#222">${html}</td>`;
          })
          .join("")}</tr>`,
    )
    .join("");

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Hampton Homes <onboarding@resend.dev>",
    to: [LEAD_TO],
    subject: `HamptonsHomes.ai leads, last 24 hours: ${rows.length}`,
    html: `<div style="font-family:Georgia,serif;max-width:900px;margin:0 auto;padding:24px 12px"><h2 style="font-weight:normal;color:#111;font-size:20px;margin:0 0 16px">${rows.length} new ${rows.length === 1 ? "lead" : "leads"} in the last 24 hours</h2><table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif">${`<thead><tr>${th}</tr></thead>`}<tbody>${body}</tbody></table></div>`,
  });
  if (error) return NextResponse.json({ error: "Send failed" }, { status: 502 });
  return NextResponse.json({ sent: true, leads: rows.length });
}
