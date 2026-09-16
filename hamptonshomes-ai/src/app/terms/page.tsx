import type { Metadata } from "next";
import Link from "next/link";
import { routeMetadata } from "@/lib/schema";

export const metadata: Metadata = routeMetadata({
  title: "Terms of Use",
  description:
    "Terms of use for hamptonshomes.ai, the personal site of Barry McGovern, Licensed Real Estate Salesperson with Hedgerow Exclusive Properties.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="bg-paper text-ink">
      <section className="mx-auto max-w-3xl px-6 pb-28 pt-36 md:px-8 md:pt-44">
        <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-ocean">Legal</p>
        <h1 className="font-serif text-5xl leading-tight md:text-6xl">Terms of Use</h1>
        <p className="mt-4 text-[13px] text-ink-faint">Last updated: September 16, 2026</p>

        <div className="mt-14 space-y-10 text-[15px] leading-[1.9] text-ink-muted">
          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">Agreement</h2>
            <p>
              By using hamptonshomes.ai you agree to these terms. If you do not agree, do not use
              the site. This is a personal professional website for Barry McGovern, a New York
              Licensed Real Estate Salesperson (license #10401353717) with Hedgerow Exclusive
              Properties. Barry is a salesperson, not a broker.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">What this site is</h2>
            <p>
              The site describes Barry&apos;s practice, selected portfolio records, town notes, and a
              way to inquire. It is not an offer to sell a specific property unless a current listing
              says so. Portfolio pages are historical records of selected transactions, not a live
              MLS feed. Private sales are described only in outline.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">Inquiries</h2>
            <p>
              Submitting the contact form asks Barry to respond. It does not create a listing
              agreement, buyer agreement, or confidential-brokerage relationship until those are
              formed in the ordinary way with Hedgerow Exclusive Properties. Do not send wire
              instructions or identity documents through the public form.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">Accuracy</h2>
            <p>
              Property details, prices, and status can change. Independent verification is required
              before any decision. Nothing here is an appraisal, tax, or legal opinion. Market
              commentary is informational.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">Intellectual property</h2>
            <p>
              Site text, photographs, and layout are owned by Barry McGovern or used with
              permission. You may share links. You may not copy the site for a competing commercial
              use without written permission.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">Limitation</h2>
            <p>
              The site is provided as is. To the fullest extent New York law allows, Barry McGovern
              and Hedgerow Exclusive Properties are not liable for indirect or consequential damages
              from use of this website. Some inquiries are handled by email and ordinary web
              hosting; availability is not guaranteed.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">Governing law</h2>
            <p>
              These terms are governed by the laws of the State of New York, without regard to
              conflict-of-law rules. Venue for disputes relating to this website is in New York.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">Changes</h2>
            <p>
              We may update these terms. The date at the top will change when we do. Continued use
              after an update means the current terms apply.
            </p>
          </section>

          <section>
            <h2 className="mb-3 font-serif text-2xl text-ink">Contact</h2>
            <p>
              Questions:{" "}
              <a href="mailto:barry@hedgerowexclusive.com" className="text-ocean hover:text-ocean-deep">
                barry@hedgerowexclusive.com
              </a>
              . Related:{" "}
              <Link href="/privacy" className="text-ocean hover:text-ocean-deep">
                Privacy Policy
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
