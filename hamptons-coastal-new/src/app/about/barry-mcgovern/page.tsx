import type { Metadata } from 'next'
import Link from 'next/link'
import JsonLd from '@/components/JsonLd'
import { BARRY_BLURB, PLACE_NAMES, barryGraphJsonLd } from '@/lib/schema'

export const metadata: Metadata = {
  title: 'Barry McGovern',
  description:
    'Barry McGovern is a Licensed Real Estate Salesperson with Hedgerow Exclusive Properties specializing in oceanfront, waterfront, estate-section, and private-market opportunities across the East End.',
  alternates: {
    canonical: 'https://hamptonscoastal.com/about/barry-mcgovern',
  },
  openGraph: {
    title: 'Barry McGovern | Oceanfront & Waterfront Specialist',
    description:
      'Licensed Real Estate Salesperson at Hedgerow Exclusive Properties. Sag Harbor local specializing in oceanfront, waterfront, and private-market Hamptons opportunities.',
    url: 'https://hamptonscoastal.com/about/barry-mcgovern',
    type: 'profile',
  },
}

const facts = [
  { label: 'Role', value: 'Licensed Real Estate Salesperson, Hedgerow Exclusive Properties' },
  { label: 'License #', value: '10401353717 (NY)' },
  { label: 'Base', value: 'Bridgehampton / Sag Harbor' },
  { label: 'Focus', value: 'Oceanfront, waterfront, estate-section, private-market' },
  {
    label: 'Hamlets',
    value: PLACE_NAMES.join(', '),
  },
  { label: 'Phone', value: '646-339-0154', href: 'tel:+16463390154' },
  { label: 'Email', value: 'barry@hedgerowexclusive.com', href: 'mailto:barry@hedgerowexclusive.com' },
]

export default function BarryMcGovernPage() {
  return (
    <>
      <JsonLd data={barryGraphJsonLd()} />

      <div className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <nav className="text-cream/40 text-xs tracking-wide uppercase mb-8">
            <Link href="/about" className="hover:text-gold transition-colors">
              About
            </Link>
            <span className="mx-2">/</span>
            <span className="text-cream/60">Barry McGovern</span>
          </nav>

          <span className="text-gold text-xs tracking-[0.3em] uppercase">Expert</span>
          <h1 className="font-serif text-4xl md:text-5xl text-cream mt-4 mb-3">Barry McGovern</h1>
          <p className="text-cream/50 text-sm md:text-base tracking-wide mb-10">
            Oceanfront &amp; waterfront specialist | Hedgerow Exclusive Properties | Sag Harbor
          </p>

          <div className="space-y-6 text-cream/70 text-lg leading-relaxed mb-14">
            <p>{BARRY_BLURB}</p>
          </div>

          <h2 className="font-serif text-2xl text-cream mb-6">Key facts</h2>
          <dl className="border border-white/5 divide-y divide-white/5 mb-14">
            {facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-1 md:grid-cols-3 gap-2 px-5 py-4">
                <dt className="text-cream/40 text-xs tracking-[0.2em] uppercase md:col-span-1">
                  {fact.label}
                </dt>
                <dd className="text-cream/80 text-sm md:col-span-2">
                  {fact.href ? (
                    <a href={fact.href} className="text-gold hover:text-gold-light transition-colors">
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <h2 className="font-serif text-2xl text-cream mb-4">Selected deals</h2>
          <p className="text-cream/60 leading-relaxed mb-8">
            Notable closed and marketed work spans oceanfront and waterfront across the South Fork.
            See the live portfolio on{' '}
            <a
              href="https://hamptonshomes.ai/sales"
              className="text-gold hover:text-gold-light transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              HamptonsHomes.ai
            </a>
            {' '}and Hedgerow listings. Prices shown only where publicly verified.
          </p>

          <div className="bg-dark-700/50 border border-gold/20 p-8 text-center">
            <p className="font-serif text-2xl text-cream mb-3">Confidential consult / valuation</p>
            <p className="text-cream/50 text-sm mb-6">
              Private-market pricing, oceanfront strategy, or a quiet look at inventory.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+16463390154"
                className="inline-block bg-gold/10 text-gold px-6 py-3 border border-gold/30 hover:bg-gold/20 transition-colors text-sm tracking-wide uppercase"
              >
                Call 646-339-0154
              </a>
              <a
                href="mailto:barry@hedgerowexclusive.com?subject=Confidential%20consult"
                className="inline-block text-cream/70 px-6 py-3 border border-white/10 hover:border-gold/30 hover:text-gold transition-colors text-sm tracking-wide uppercase"
              >
                Email Barry
              </a>
            </div>
          </div>

          <p className="text-cream/30 text-xs mt-10">
            Editorial profile on Hamptons Coastal. Not a substitute for brokerage advice. Licensed
            in New York (#10401353717).
          </p>
        </div>
      </div>
    </>
  )
}
