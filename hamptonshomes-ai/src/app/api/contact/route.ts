import { Resend } from "resend";
import { NextResponse } from "next/server";

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, interest, message } = body;

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 });
    }

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
      replyTo: email,
      subject: `New Inquiry from ${name} - ${interest || "General"}`,
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
            ${phone ? `<tr><td style="padding: 8px 0; color: #999;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #1f3a44;">${phone}</a></td></tr>` : ""}
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
      return NextResponse.json({ error: "Failed to send message", detail: error }, { status: 502 });
    }

    const smsBody = `Homes inquiry: ${name}${interest ? ` (${interest})` : ""}${phone ? ` · ${phone}` : ""} · ${email}`;
    try {
      await sendSmsAlert(smsBody.slice(0, 320));
    } catch (smsErr) {
      console.error("SMS alert error:", smsErr);
      // Email already sent — don't fail the lead
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
