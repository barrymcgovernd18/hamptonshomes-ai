import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Download the App',
  description: 'Download the Hamptons Coastal app for iOS. Market intelligence, anywhere.',
}

export default function DownloadPage() {
  return (
    <div className="px-6 py-24">
      <div className="max-w-4xl mx-auto text-center">
        <span className="text-gold text-xs tracking-[0.3em] uppercase">The App</span>
        <h1 className="font-serif text-4xl md:text-5xl text-cream mt-4 mb-6">
          Luxury real estate intelligence, anywhere.
        </h1>
        <p className="text-cream/50 text-lg max-w-2xl mx-auto mb-12 leading-relaxed">
          AI-powered property valuations, interactive parcel maps, market reports, and breaking 
          news across the Hamptons, Palm Beach, Miami, and Aspen. All in one app.
        </p>

        {/* App Store Button */}
        <div className="mb-16">
          <a 
            href="https://apps.apple.com/us/app/hamptons-coastal/id6759401604"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-cream text-dark-900 hover:bg-cream/90 transition-colors duration-200 rounded-xl px-8 py-4 font-medium"
          >
            Download on the App Store
          </a>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-3xl mx-auto">
          {[
            {
              title: 'Breaking News',
              desc: 'Daily editorial coverage of notable transactions, market shifts, and development news across all four markets.',
              icon: '📰',
            },
            {
              title: 'Market Reports',
              desc: 'Data-driven insights with charts, pricing trends, and year-over-year analysis. Know where the market is heading.',
              icon: '📊',
            },
            {
              title: 'AI Property Intelligence',
              desc: 'Enter any property and get AI-powered comparable sales analysis and estimated valuations based on real transaction data.',
              icon: '🤖',
            },
            {
              title: 'Parcel Maps',
              desc: 'Interactive maps with owner information, parcel boundaries, flood zones, and wetlands. The data professionals need.',
              icon: '🗺️',
            },
            {
              title: 'Featured Listings',
              desc: 'Curated luxury listings submitted by verified agents across all four markets.',
              icon: '🏠',
            },
            {
              title: 'Agent Tools',
              desc: 'Pro and Elite tiers give agents featured listing placements, article credits, and priority support.',
              icon: '💼',
            },
          ].map((feature, i) => (
            <div key={i} className="bg-dark-700/50 border border-white/5 p-6">
              <div className="text-2xl mb-3">{feature.icon}</div>
              <h3 className="font-serif text-lg text-cream mb-2">{feature.title}</h3>
              <p className="text-cream/40 text-sm leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Pricing */}
        <div className="mt-24">
          <h2 className="font-serif text-3xl text-cream mb-4">Simple pricing</h2>
          <p className="text-cream/40 mb-12">Free to browse. Subscribe for the full experience.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-dark-700/50 border border-white/5 p-8 text-left">
              <h3 className="text-cream/60 text-sm tracking-[0.2em] uppercase mb-2">Free</h3>
              <p className="text-cream font-serif text-3xl mb-4">$0</p>
              <ul className="space-y-3 text-cream/40 text-sm">
                <li>Browse listings</li>
                <li>Read headlines</li>
                <li>Basic market overview</li>
              </ul>
            </div>

            <div className="bg-dark-700/50 border border-gold/30 p-8 text-left relative">
              <div className="absolute -top-3 left-8 bg-gold text-dark-900 text-[10px] tracking-[0.2em] uppercase px-3 py-1 font-medium">
                Popular
              </div>
              <h3 className="text-gold text-sm tracking-[0.2em] uppercase mb-2">Premium</h3>
              <p className="text-cream font-serif text-3xl mb-1">$19.99</p>
              <p className="text-cream/30 text-xs mb-4">per month</p>
              <ul className="space-y-3 text-cream/50 text-sm">
                <li>Full article access</li>
                <li>Market reports</li>
                <li>AI property valuations</li>
                <li>Parcel maps</li>
                <li>7-day free trial</li>
              </ul>
            </div>

            <div className="bg-dark-700/50 border border-white/5 p-8 text-left">
              <h3 className="text-cream/60 text-sm tracking-[0.2em] uppercase mb-2">Agent Tiers</h3>
              <p className="text-cream font-serif text-3xl mb-1">$19.99+</p>
              <p className="text-cream/30 text-xs mb-4">per month</p>
              <ul className="space-y-3 text-cream/40 text-sm">
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
