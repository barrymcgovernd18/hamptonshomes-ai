import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Hamptons Coastal, the luxury real estate intelligence platform.',
}

export default function AboutPage() {
  return (
    <div className="px-6 py-16 md:px-8">
      <div className="mx-auto max-w-3xl">
        <p className="text-[11px] uppercase tracking-[0.28em] text-ocean">About</p>
        <h1 className="mt-4 mb-8 font-serif text-4xl text-ink md:text-6xl">
          Hamptons Coastal
        </h1>

        <div className="space-y-6 text-lg leading-relaxed text-ink-muted">
          <p>
            Hamptons Coastal is a luxury real estate intelligence platform covering four of
            America&apos;s most exclusive markets: the Hamptons, Palm Beach, Miami, and Aspen.
          </p>

          <p>
            We publish original editorial content multiple times per week, covering notable
            transactions, market analysis, development news, and the lifestyle that defines
            luxury real estate in each market. Every article is researched and written by our
            editorial team using verified data from public records, brokerage reports, and
            industry sources.
          </p>

          <p>
            Our platform also offers tools built for buyers, sellers, agents, and investors:
            AI-powered comparable sales analysis, interactive parcel maps with owner data and
            environmental overlays, and data-driven market reports with historical trends.
          </p>

          <div className="my-10 border-l-2 border-ocean/40 pl-6">
            <p className="font-serif text-2xl italic text-ink">
              &ldquo;The intelligence you need, in the markets that matter.&rdquo;
            </p>
          </div>

          <h2 className="mb-4 mt-12 font-serif text-2xl text-ink">Our Markets</h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              { name: 'The Hamptons', desc: 'The epicenter of East Coast luxury. From oceanfront estates in Sagaponack to historic villages in Sag Harbor, we cover the full spectrum of Hamptons real estate.' },
              { name: 'Palm Beach', desc: 'Where old money meets new development. From Palm Beach Island estates to West Palm Beach\'s booming waterfront condo market.' },
              { name: 'Miami', desc: 'South Florida\'s dynamic luxury market. Waterfront condos, single-family estates, and the development pipeline reshaping the skyline.' },
              { name: 'Aspen', desc: 'The mountain market with coastal-level pricing. Ski-in properties, ranch estates, and the transactions that define Rocky Mountain luxury.' },
            ].map((market) => (
              <div key={market.name} className="border border-line bg-paper-soft p-6">
                <h3 className="mb-2 font-serif text-lg text-ocean">{market.name}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{market.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="mb-4 mt-12 font-serif text-2xl text-ink">Leadership</h2>
          <p>
            Oceanfront and waterfront coverage is led by{' '}
            <Link href="/about/barry-mcgovern" className="text-ocean underline decoration-ocean/30 underline-offset-4 transition-colors hover:text-ocean-deep">
              Barry McGovern
            </Link>
            , licensed real estate salesperson with Hedgerow Exclusive Properties (Sag Harbor /
            Bridgehampton).
          </p>

          <h2 className="mb-4 mt-12 font-serif text-2xl text-ink">Contact</h2>
          <p>
            For editorial inquiries, corrections, or partnerships, contact us at{' '}
            <a href="mailto:info@hamptonscoastal.com" className="text-ocean underline decoration-ocean/30 underline-offset-4 transition-colors hover:text-ocean-deep">
              info@hamptonscoastal.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}
