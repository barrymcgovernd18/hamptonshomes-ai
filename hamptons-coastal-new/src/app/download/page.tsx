import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Download the App',
  description: 'Download the Hamptons Coastal app for iOS. Market intelligence, anywhere.',
}

export default function DownloadPage() {
  return (
    <div className="px-6 py-24 md:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-[11px] uppercase tracking-[0.28em] text-ocean">The App</p>
        <h1 className="mt-4 mb-6 font-serif text-4xl text-ink md:text-6xl">
          Luxury real estate intelligence, anywhere.
        </h1>
        <p className="mx-auto mb-12 max-w-2xl text-lg leading-relaxed text-ink-muted">
          AI-powered property valuations, interactive parcel maps, market reports, and breaking
          news across the Hamptons, Palm Beach, Miami, and Aspen. All in one app.
        </p>

        <div className="mb-20">
          <a
            href="https://apps.apple.com/us/app/hamptons-coastal/id6759401604"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-ocean px-8 py-3.5 text-[11px] uppercase tracking-[0.24em] text-paper transition-colors hover:bg-ocean-deep"
          >
            Download on the App Store
          </a>
        </div>

        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 text-left md:grid-cols-2">
          {[
            {
              title: 'Breaking News',
              desc: 'Daily editorial coverage of notable transactions, market shifts, and development news across all four markets.',
            },
            {
              title: 'Market Reports',
              desc: 'Data-driven insights with charts, pricing trends, and year-over-year analysis. Know where the market is heading.',
            },
            {
              title: 'AI Property Intelligence',
              desc: 'Enter any property and get AI-powered comparable sales analysis and estimated valuations based on real transaction data.',
            },
            {
              title: 'Parcel Maps',
              desc: 'Interactive maps with owner information, parcel boundaries, flood zones, and wetlands. The data professionals need.',
            },
            {
              title: 'Featured Listings',
              desc: 'Curated luxury listings submitted by verified agents across all four markets.',
            },
            {
              title: 'Agent Tools',
              desc: 'Pro and Elite tiers give agents featured listing placements, article credits, and priority support.',
            },
          ].map((feature) => (
            <div key={feature.title} className="border border-line bg-paper-soft p-6">
              <h3 className="mb-2 font-serif text-lg text-ink">{feature.title}</h3>
              <p className="text-sm leading-relaxed text-ink-muted">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-24">
          <h2 className="mb-4 font-serif text-3xl text-ink">Simple pricing</h2>
          <p className="mb-12 text-ink-muted">Free to browse. Subscribe for the full experience.</p>

          <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            <div className="border border-line bg-paper-soft p-8 text-left">
              <h3 className="mb-2 text-sm uppercase tracking-[0.2em] text-ink-faint">Free</h3>
              <p className="mb-4 font-serif text-3xl text-ink">$0</p>
              <ul className="space-y-3 text-sm text-ink-muted">
                <li>Browse listings</li>
                <li>Read headlines</li>
                <li>Basic market overview</li>
              </ul>
            </div>

            <div className="relative border border-ocean bg-paper-soft p-8 text-left">
              <div className="absolute -top-3 left-8 bg-ocean px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-paper">
                Popular
              </div>
              <h3 className="mb-2 text-sm uppercase tracking-[0.2em] text-ocean">Premium</h3>
              <p className="mb-1 font-serif text-3xl text-ink">$19.99</p>
              <p className="mb-4 text-xs text-ink-faint">per month</p>
              <ul className="space-y-3 text-sm text-ink-muted">
                <li>Full article access</li>
                <li>Market reports</li>
                <li>AI property valuations</li>
                <li>Parcel maps</li>
                <li>7-day free trial</li>
              </ul>
            </div>

            <div className="border border-line bg-paper-soft p-8 text-left">
              <h3 className="mb-2 text-sm uppercase tracking-[0.2em] text-ink-faint">Agent Tiers</h3>
              <p className="mb-1 font-serif text-3xl text-ink">$19.99+</p>
              <p className="mb-4 text-xs text-ink-faint">per month</p>
              <ul className="space-y-3 text-sm text-ink-muted">
                <li>Everything in Premium</li>
                <li>Featured listings</li>
                <li>Article credits</li>
                <li>Priority support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
