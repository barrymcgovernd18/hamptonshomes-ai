import { Resend } from "resend";
import { NextResponse } from "next/server";
import { logLead } from "@/lib/leads";

async function sendSmsAlert(body: string) {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_FROM_NUMBER;
  const to = process.env.CONTACT_SMS_TO || process.env.TWILIO_TO_NUMBER;
  if (!sid || !token || !from || !to) return { skipped: true as const };

  const auth = Buffer.from(`${sid}:${token}`).toString("base64");
  const params = new URLSearchParams({ To: to, From: from, Body: body });
  const res = await fetch(`https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Twilio SMS failed: ${res.status} ${text}`);
  }
  return { skipped: false as const };
}

const LIMITS = { name: 120, email: 200, phone: 40, interest: 80, message: 5000 } as const;
const EMAIL_RE = /^[^\s@<>"]+@[^\s@<>"]+\.[^\s@<>"]+$/;

function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  try {
    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request" }, { status: 400 });
    }

    // Honeypot: real visitors never see or fill this field.
    if (clean(body.website, 200)) {
      return NextResponse.json({ success: true });
    }

    const rawName = clean(body.name, LIMITS.name);
    const rawEmail = clean(body.email, LIMITS.email);
    const rawPhone = clean(body.phone, LIMITS.phone).replace(/[^\d+().\s-]/g, "");
    const rawInterest = clean(body.interest, LIMITS.interest);
    const rawMessage = clean(body.message, LIMITS.message);

    if (!rawName || !rawEmail) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }
    if (!EMAIL_RE.test(rawEmail)) {
      return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
    }

    const name = escapeHtml(rawName);
    const email = escapeHtml(rawEmail);
    const phone = escapeHtml(rawPhone);
    const interest = escapeHtml(rawInterest);
    const message = escapeHtml(rawMessage).replace(/\n/g, "<br />");

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
    }

    const from =
      process.env.CONTACT_FROM_EMAIL ||
      "Hampton Homes <onboarding@resend.dev>";
    const to = process.env.CONTACT_TO_EMAIL || "barry@hedgerowexclusive.com";

    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from,
      to: [to],
      replyTo: rawEmail,
      subject: `New Inquiry from ${rawName.replace(/[\r\n]+/g, " ")}: ${rawInterest.replace(/[\r\n]+/g, " ") || "General"}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="color: #1a1a1a; font-size: 24px; border-bottom: 2px solid #1f3a44; padding-bottom: 12px;">
            New Website Inquiry
          </h2>
          <table style="width: 100%; margin: 24px 0; font-size: 15px; color: #333;">
            <tr>
              <td style="padding: 8px 0; color: #999; width: 100px;">Name</td>
              <td style="padding: 8px 0; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1f3a44;">${email}</a></td>
            </tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #999;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone.replace(/[^\d+]/g, "")}" style="color: #1f3a44;">${phone}</a></td></tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #999;">Interest</td>
              <td style="padding: 8px 0;">${interest || "Not specified"}</td>
            </tr>
          </table>
          ${message ? `<div style="background: #f4f0e8; padding: 20px; margin-top: 16px; border-left: 3px solid #1f3a44;"><p style="margin: 0; color: #333; font-size: 15px; line-height: 1.7;">${message}</p></div>` : ""}
          <p style="color: #999; font-size: 12px; margin-top: 32px;">Sent from hamptonshomes.ai</p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
    }

    await logLead({
      form: "Contact",
      name: rawName,
      email: rawEmail,
      phone: rawPhone,
      message: [rawInterest && `Interest: ${rawInterest}`, rawMessage].filter(Boolean).join(" | "),
      pageUrl: "https://hamptonshomes.ai/contact",
    });

    const smsBody = `Homes inquiry: ${rawName}${rawInterest ? ` (${rawInterest})` : ""}${rawPhone ? ` · ${rawPhone}` : ""} · ${rawEmail}`;
    try {
      await sendSmsAlert(smsBody.slice(0, 320));
    } catch (smsErr) {
      console.error("SMS alert error:", smsErr);
      // Email already sent; don't fail the lead
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
