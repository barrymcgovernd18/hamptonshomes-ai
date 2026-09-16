import type { Metadata } from "next";
import Link from "next/link";
import { routeMetadata } from "@/lib/schema";

export const metadata: Metadata = routeMetadata({
  title: "Privacy Policy",
  description:
    "Privacy policy for hamptonshomes.ai, the personal site of Barry McGovern, Licensed Real Estate Salesperson with Hedgerow Exclusive Properties.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="bg-paper text-ink">
      <section className="mx-auto max-w-3xl px-6 pb-28 pt-36 md:px-8 md:pt-44">
        <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-ocean">Legal</p>
        <h1 className="font-serif text-5xl leading-tight md:text-6xl">Privacy Policy</h1>
        <p className="mt-4 text-[13px] text-ink-faint">Last updated: September 16, 2026</p>

        <div className="mt-14 space-y-10 text-[15px] leading-[1.9] text-ink-muted">
          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">Who we are</h2>
            <p>
              This website, hamptonshomes.ai, is the personal professional site of Barry McGovern, a
              New York Licensed Real Estate Salesperson (license #10401353717) affiliated with
              Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage with an
              office at 2495 Montauk Highway, Bridgehampton, NY 11932. Barry is a salesperson, not a
              broker. Inquiries submitted here are received so Barry can respond about East End real
              estate.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">Information we collect</h2>
            <p>
              If you use the contact form, we collect the name, email, phone number (if provided),
              stated interest, and message you submit. If you call or email instead, we collect
              whatever you choose to share in that conversation. We do not create accounts, run a
              mailing list from this form, or require payment details on this site.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">How we use it</h2>
            <p>
              We use contact details only to respond to your inquiry, follow up if you ask us to,
              and keep a record of the conversation as needed for professional real estate practice.
              We do not sell personal information. We do not use the form to send unrelated
              marketing.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">Sharing</h2>
            <p>
              Messages may be received and stored through ordinary professional tools (email and
              hosting providers) under their own terms. We may share what you send with Hedgerow
              Exclusive Properties when that is needed to answer you or to comply with brokerage
              record-keeping. We may disclose information if required by law.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">New York and security</h2>
            <p>
              We take reasonable steps to protect inquiry data in line with New York law, including
              the SHIELD Act. No website transmission is perfectly secure. Please do not send Social
              Security numbers, wire instructions, or other highly sensitive documents through the
              public form.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">Cookies and analytics</h2>
            <p>
              This site is hosted on ordinary web infrastructure that may set technical cookies
              needed to deliver the page. We do not run a separate advertising pixel program from
              this privacy notice.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">Your choices</h2>
            <p>
              You may request access to, correction of, or deletion of personal information we hold
              from the contact form by emailing{" "}
              <a href="mailto:barry@hedgerowexclusive.com" className="text-ocean hover:text-ocean-deep">
                barry@hedgerowexclusive.com
              </a>{" "}
              or calling +1-646-339-0154. We may retain what the law or brokerage practice requires.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">Children</h2>
            <p>This site is not directed to children under 13, and we do not knowingly collect their data.</p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">Changes</h2>
            <p>
              We may update this policy. The date at the top will change when we do. Continued use
              of the site after an update means the current policy applies.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">Contact</h2>
            <p>
              Privacy questions:{" "}
              <a href="mailto:barry@hedgerowexclusive.com" className="text-ocean hover:text-ocean-deep">
                barry@hedgerowexclusive.com
              </a>
              . Related:{" "}
              <Link href="/terms" className="text-ocean hover:text-ocean-deep">
                Terms of Use
              </Link>{" "}
              and{" "}
              <Link href="/contact" className="text-ocean hover:text-ocean-deep">
                Contact
              </Link>
              .
            </p>
          </section>
        </div>
      </section>
    </div>
  );
}
