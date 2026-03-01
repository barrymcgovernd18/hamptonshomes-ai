import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About',
  description: 'About Hamptons Coastal, the luxury real estate intelligence platform.',
}

export default function AboutPage() {
  return (
    <div className="px-6 py-16">
      <div className="max-w-3xl mx-auto">
        <span className="text-gold text-xs tracking-[0.3em] uppercase">About</span>
        <h1 className="font-serif text-3xl md:text-4xl text-cream mt-4 mb-8">
          Hamptons Coastal
        </h1>

        <div className="space-y-6 text-cream/70 text-lg leading-relaxed">
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

          <div className="border-l-2 border-gold/30 pl-6 my-10">
            <p className="font-serif text-2xl text-cream italic">
              &ldquo;The intelligence you need, in the markets that matter.&rdquo;
            </p>
          </div>

          <h2 className="font-serif text-2xl text-cream mt-12 mb-4">Our Markets</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { name: 'The Hamptons', desc: 'The epicenter of East Coast luxury. From oceanfront estates in Sagaponack to historic villages in Sag Harbor, we cover the full spectrum of Hamptons real estate.' },
              { name: 'Palm Beach', desc: 'Where old money meets new development. From Palm Beach Island estates to West Palm Beach\'s booming waterfront condo market.' },
              { name: 'Miami', desc: 'South Florida\'s dynamic luxury market. Waterfront condos, single-family estates, and the development pipeline reshaping the skyline.' },
              { name: 'Aspen', desc: 'The mountain market with coastal-level pricing. Ski-in properties, ranch estates, and the transactions that define Rocky Mountain luxury.' },
            ].map((market) => (
              <div key={market.name} className="bg-dark-700/50 p-6 border border-white/5">
                <h3 className="font-serif text-lg text-gold mb-2">{market.name}</h3>
                <p className="text-cream/50 text-sm leading-relaxed">{market.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="font-serif text-2xl text-cream mt-12 mb-4">Contact</h2>
          <p>
            For editorial inquiries, corrections, or partnerships, contact us at{' '}
            <a href="mailto:info@hamptonscoastal.com" className="text-gold hover:text-gold-light transition-colors">
              info@hamptonscoastal.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  )
}
