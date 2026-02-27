import { Resend } from "resend";
import { NextResponse } from "next/server";

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

    const resend = new Resend(apiKey);
    await resend.emails.send({
      from: "Hampton Homes <onboarding@resend.dev>",
      to: "barry@hedgerowexclusive.com",
      replyTo: email,
      subject: `New Inquiry from ${name} - ${interest || "General"}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px;">
          <h2 style="color: #1a1a1a; font-size: 24px; border-bottom: 2px solid #c4a265; padding-bottom: 12px;">
            New Website Inquiry
          </h2>
          <table style="width: 100%; margin: 24px 0; font-size: 15px; color: #333;">
            <tr>
              <td style="padding: 8px 0; color: #999; width: 100px;">Name</td>
              <td style="padding: 8px 0; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #999;">Email</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #c4a265;">${email}</a></td>
            </tr>
            ${phone ? `<tr><td style="padding: 8px 0; color: #999;">Phone</td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #c4a265;">${phone}</a></td></tr>` : ""}
            <tr>
              <td style="padding: 8px 0; color: #999;">Interest</td>
              <td style="padding: 8px 0;">${interest || "Not specified"}</td>
            </tr>
          </table>
          ${message ? `<div style="background: #f8f7f4; padding: 20px; margin-top: 16px; border-left: 3px solid #c4a265;"><p style="margin: 0; color: #333; font-size: 15px; line-height: 1.7;">${message}</p></div>` : ""}
          <p style="color: #999; font-size: 12px; margin-top: 32px;">Sent from hamptonshomes.ai</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
