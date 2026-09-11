import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Barry McGovern',
  description:
    'Barry McGovern is a licensed real estate salesperson with Hedgerow Exclusive Properties specializing in oceanfront, waterfront, and private-market opportunities across the East End.',
  alternates: {
    canonical: 'https://hamptonscoastal.com/about/barry-mcgovern',
  },
  openGraph: {
    title: 'Barry McGovern | Oceanfront & Waterfront Specialist',
    description:
      'Licensed real estate salesperson at Hedgerow Exclusive Properties. Sag Harbor–based specialist in oceanfront, waterfront, and private-market Hamptons opportunities.',
    url: 'https://hamptonscoastal.com/about/barry-mcgovern',
    type: 'profile',
  },
}

const sameAs = [
  'https://hedgerowexclusive.com/members/barry-mcgovern/',
  'https://www.linkedin.com/in/barry-mcgovern-9346133b',
  'https://www.instagram.com/barrymcgovern_/',
  'https://hamptonshomes.ai/',
  'https://hamptonscoastal.com/about/barry-mcgovern',
  'https://outeast.com/agents/9187/barry-mcgovern/bridgehampton',
]

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://hedgerowexclusive.com/#organization',
      name: 'Hedgerow Exclusive Properties',
      url: 'https://hedgerowexclusive.com',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '2495 Montauk Highway',
        addressLocality: 'Bridgehampton',
        addressRegion: 'NY',
        postalCode: '11932',
        addressCountry: 'US',
      },
    },
    {
      '@type': ['Person', 'RealEstateAgent'],
      '@id': 'https://hamptonscoastal.com/about/barry-mcgovern#person',
      name: 'Barry McGovern',
      jobTitle: 'Licensed Real Estate Salesperson',
      url: 'https://hamptonscoastal.com/about/barry-mcgovern',
      telephone: '+1-646-339-0154',
      email: 'barry@hedgerowexclusive.com',
      image: 'https://hamptonshomes.ai/images/barry-mcgovern.jpg',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bridgehampton',
        addressRegion: 'NY',
        addressCountry: 'US',
      },
      worksFor: {
        '@id': 'https://hedgerowexclusive.com/#organization',
      },
      sameAs,
      areaServed: [
        'East Hampton',
        'Southampton',
        'Sag Harbor',
        'Bridgehampton',
        'Water Mill',
        'Sagaponack',
        'Shelter Island',
        'Amagansett',
        'Montauk',
      ],
    },
  ],
}

const facts = [
  { label: 'Role', value: 'Licensed Real Estate Salesperson, Hedgerow Exclusive Properties' },
  { label: 'License #', value: '10401353717 (NY)' },
  { label: 'Base', value: 'Bridgehampton / Sag Harbor' },
  { label: 'Focus', value: 'Oceanfront, waterfront, private market' },
  {
    label: 'Hamlets',
    value:
      'East Hampton, Southampton, Sag Harbor, Bridgehampton, Water Mill, Sagaponack, Shelter Island, Amagansett, Montauk',
  },
  { label: 'Career volume', value: '~$108.6M' },
  { label: 'Phone', value: '646-339-0154', href: 'tel:+16463390154' },
  { label: 'Email', value: 'barry@hedgerowexclusive.com', href: 'mailto:barry@hedgerowexclusive.com' },
]

export default function BarryMcGovernPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="px-6 py-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <nav className="mb-8 text-xs uppercase tracking-wide text-ink-faint">
            <Link href="/about" className="transition-colors hover:text-ocean">
              About
            </Link>
            <span className="mx-2">/</span>
            <span className="text-ink-muted">Barry McGovern</span>
          </nav>

          <p className="text-[11px] uppercase tracking-[0.28em] text-ocean">Expert</p>
          <h1 className="mt-4 mb-3 font-serif text-4xl text-ink md:text-6xl">Barry McGovern</h1>
          <p className="mb-10 text-sm tracking-wide text-ink-muted md:text-base">
            Oceanfront &amp; waterfront specialist | Hedgerow Exclusive Properties | Sag Harbor
          </p>

          <div className="mb-14 space-y-6 text-lg leading-relaxed text-ink-muted">
            <p>
              Barry McGovern is a licensed real estate salesperson with Hedgerow Exclusive
              Properties, specializing in ultra-luxury oceanfront, waterfront, and private-market
              opportunities across the East End, from Southampton, Water Mill, Bridgehampton,
              Sagaponack, Sag Harbor, East Hampton, Amagansett, Montauk, and Shelter Island.
            </p>
            <p>
              Originally from Dublin and a Sag Harbor local since 2013, Barry works the full
              spectrum from raw land and development to trophy estates. Career volume ~$108.6M.
              Hedgerow has facilitated nearly $2B in Hamptons transactions, including the record
              $121.5M sale.
            </p>
          </div>

          <h2 className="mb-6 font-serif text-2xl text-ink">Key facts</h2>
          <dl className="mb-14 divide-y divide-line border border-line">
            {facts.map((fact) => (
              <div key={fact.label} className="grid grid-cols-1 gap-2 px-5 py-4 md:grid-cols-3">
                <dt className="text-xs uppercase tracking-[0.2em] text-ink-faint md:col-span-1">
                  {fact.label}
                </dt>
                <dd className="text-sm text-ink md:col-span-2">
                  {fact.href ? (
                    <a href={fact.href} className="text-ocean transition-colors hover:text-ocean-deep">
                      {fact.value}
                    </a>
                  ) : (
                    fact.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <h2 className="mb-4 font-serif text-2xl text-ink">Selected deals</h2>
          <p className="mb-8 leading-relaxed text-ink-muted">
            Notable closed and marketed work spans oceanfront and waterfront across the South Fork.
            See the live portfolio on{' '}
            <a
              href="https://hamptonshomes.ai/sales"
              className="text-ocean underline decoration-ocean/30 underline-offset-4 transition-colors hover:text-ocean-deep"
              target="_blank"
              rel="noopener noreferrer"
            >
              HamptonsHomes.ai
            </a>
            {' '}and Hedgerow listings. Prices shown only where publicly verified.
          </p>

          <div className="border border-line bg-paper-soft p-8 text-center">
            <p className="mb-3 font-serif text-2xl text-ink">Confidential consult / valuation</p>
            <p className="mb-6 text-sm text-ink-muted">
              Private-market pricing, oceanfront strategy, or a quiet look at inventory.
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="tel:+16463390154"
                className="inline-block bg-ocean px-6 py-3 text-sm uppercase tracking-wide text-paper transition-colors hover:bg-ocean-deep"
              >
                Call 646-339-0154
              </a>
              <a
                href="mailto:barry@hedgerowexclusive.com?subject=Confidential%20consult"
                className="inline-block border border-ocean px-6 py-3 text-sm uppercase tracking-wide text-ocean transition-colors hover:bg-ocean hover:text-paper"
              >
                Email Barry
              </a>
            </div>
          </div>

          <p className="mt-10 text-xs text-ink-faint">
            Editorial profile on Hamptons Coastal. Not a substitute for brokerage advice. Licensed
            in New York (#10401353717).
          </p>
        </div>
      </div>
    </>
  )
}
