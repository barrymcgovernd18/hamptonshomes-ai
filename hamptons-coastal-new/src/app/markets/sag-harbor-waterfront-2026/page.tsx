import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Sag Harbor Waterfront in 2026: What $5M–$15M Actually Buys',
  description:
    'Hamlet market brief: Sag Harbor waterfront and near-water trades from $5M to $15M — recent comps, price bands, bay vs harbor, and what moved in 2025–2026.',
  alternates: {
    canonical: 'https://hamptonscoastal.com/markets/sag-harbor-waterfront-2026',
  },
  openGraph: {
    title: 'Sag Harbor Waterfront in 2026: What $5M–$15M Actually Buys',
    description:
      'Comps-backed look at Sag Harbor’s $5M–$15M band: recent trades, key facts, and Q&A for buyers and agents.',
    url: 'https://hamptonscoastal.com/markets/sag-harbor-waterfront-2026',
    type: 'article',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Sag Harbor Waterfront in 2026: What $5M–$15M Actually Buys',
  description:
    'Hamlet market brief with comparable sales for Sag Harbor waterfront and village trades between $5M and $15M.',
  author: {
    '@type': 'Person',
    name: 'Barry McGovern',
    url: 'https://hamptonscoastal.com/about/barry-mcgovern',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Hamptons Coastal',
    url: 'https://hamptonscoastal.com',
  },
  datePublished: '2026-09-06',
  dateModified: '2026-09-06',
  mainEntityOfPage: 'https://hamptonscoastal.com/markets/sag-harbor-waterfront-2026',
}

const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does $5M–$15M buy in Sag Harbor in 2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In the Coastal comps set, Sag Harbor sales in that band from late 2024 through early 2026 range from renovated village homes and near-water parcels to true harbor-adjacent addresses on Bay Street, West Water, Glover, and Union. Median sold price in a 40-sale Sag Harbor sample ($5M–$15M) was about $6.43M.',
      },
    },
    {
      '@type': 'Question',
      name: 'How active was Sag Harbor in 2025–2026?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The comparable_sales dataset shows roughly 199 Sag Harbor–tagged closed sales with sold dates from 2025-01-01 onward (all price points). Liquidity is real, but true waterfront inventory in the middle band remains thin versus inland village product.',
      },
    },
    {
      '@type': 'Question',
      name: 'Bay vs harbor — does frontage type matter at this price?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Harbor and bay-adjacent addresses (Bay Street, West Water, Glover, Union, Noyac Bay) trade differently from inland Sag Harbor village homes at similar dollar amounts. Buyers should underwrite frontage, dock rights, flood, and ARB/village constraints separately from square footage.',
      },
    },
    {
      '@type': 'Question',
      name: 'What recent trades define the upper half of the band?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Notable closed comps include 100 Bay Street at $11.25M (Dec 2025), 20 Union Street at $11.8M (Sep 2025), 100 Glover Street at $13M (Sep 2025), 63 Glover Street at $11.5M (Jun 2025), and 62 West Water Street at $9.3M (Oct 2025).',
      },
    },
    {
      '@type': 'Question',
      name: 'What about the lower half of the $5M–$15M band?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Recent closes near $5M–$6M include 6 Harding Terrace ($5.5M, Jan 2026), 32 Windermere Drive ($5.1M, Jan 2026), 22 Latham Street ($5.775M, Nov 2025), and 117 Main Street ($5.9M, Sep 2025). These are more often village or near-village product than trophy waterfront.',
      },
    },
    {
      '@type': 'Question',
      name: 'How should agents talk days on market here?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Well-located Sag Harbor waterfront and trophy village homes that are priced to the micro-market still move; mispriced waterfront can sit. Use recent same-street and same-frontage comps rather than hamlet-wide averages.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is this brokerage advice?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. This is editorial market commentary from Hamptons Coastal using public comps data. It is not an appraisal, CMA, or solicitation. Consult a licensed broker for property-specific advice.',
      },
    },
  ],
}

const keyFacts = [
  { label: 'Sample', value: '40 Sag Harbor closes, $5M–$15M (Coastal comps DB)' },
  { label: 'Median sold (sample)', value: '~$6.43M' },
  { label: 'Average sold (sample)', value: '~$7.46M' },
  { label: 'Sag Harbor closes since 2025-01-01', value: '~199 (all prices)' },
  { label: 'Upper-band waterfront/near-water examples', value: '$9.3M–$13M (2025)' },
  { label: 'Data vintage', value: 'comparable_sales export Sep 2026' },
]

const recentTrades = [
  { date: '2025-12-15', address: '100 Bay Street', price: '$11,250,000', note: 'Bay Street / harbor corridor' },
  { date: '2025-10-14', address: '62 West Water Street', price: '$9,300,000', note: 'West Water' },
  { date: '2025-09-24', address: '100 Glover Street', price: '$13,000,000', note: 'Glover Street' },
  { date: '2025-09-05', address: '20 Union Street', price: '$11,800,000', note: 'Union Street' },
  { date: '2025-06-11', address: '63 Glover Street', price: '$11,500,000', note: 'Glover Street' },
  { date: '2026-01-14', address: '40 Redwood Road', price: '$7,500,000', note: '1.7 acres' },
  { date: '2025-09-09', address: '117 Main Street', price: '$5,900,000', note: 'Village / Main Street' },
  { date: '2026-01-16', address: '6 Harding Terrace', price: '$5,500,000', note: 'Lower band' },
]

export default function SagHarborWaterfront2026Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <article className="px-6 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Link
              href="/markets/hamptons"
              className="text-gold text-xs tracking-[0.2em] uppercase hover:text-gold-light transition-colors"
            >
              The Hamptons
            </Link>
            <span className="text-cream/20">|</span>
            <span className="text-cream/40 text-xs tracking-wide uppercase">Market Analysis</span>
          </div>

          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight mb-6">
            Sag Harbor Waterfront in 2026: What $5M–$15M Actually Buys
          </h1>

          <p className="text-cream/60 text-lg leading-relaxed mb-8 border-l-2 border-gold/30 pl-6">
            A comps-backed hamlet brief for buyers and agents: recent Sag Harbor closes in the
            $5M–$15M band, how bay/harbor product differs from inland village, and what actually
            traded into early 2026.
          </p>

          <div className="flex items-center gap-4 mb-12 pb-8 border-b border-white/5">
            <div>
              <p className="text-cream/70 text-sm">
                Expert:{' '}
                <Link
                  href="/about/barry-mcgovern"
                  className="text-gold hover:text-gold-light transition-colors"
                >
                  Barry McGovern
                </Link>
                , Hedgerow Exclusive Properties
              </p>
              <p className="text-cream/30 text-xs mt-1">Updated Sep 6, 2026 · ~6 min read</p>
            </div>
          </div>

          <div className="article-content text-cream/85 text-lg leading-relaxed space-y-6">
            <p>
              Sag Harbor sits in a different pricing conversation than oceanfront Southampton or
              Further Lane. In the middle luxury band — roughly $5M to $15M — buyers are choosing
              among true harbor/bay adjacency, historic village addresses, and larger inland lots
              that still carry a Sag Harbor tax bill. The Coastal comps database (Supabase{' '}
              <code className="text-gold/80 text-sm">comparable_sales</code>) is the source of
              truth for the numbers below.
            </p>

            <h2 className="font-serif text-2xl text-cream mt-10 mb-4">Key facts</h2>
            <div className="overflow-x-auto border border-white/5">
              <table className="w-full text-sm">
                <tbody>
                  {keyFacts.map((row) => (
                    <tr key={row.label} className="border-b border-white/5">
                      <th className="text-left text-cream/40 font-normal tracking-wide uppercase text-xs px-4 py-3 w-2/5">
                        {row.label}
                      </th>
                      <td className="text-cream/80 px-4 py-3">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="font-serif text-2xl text-cream mt-10 mb-4">Recent trades that set the band</h2>
            <p>
              These closes are drawn from Sag Harbor–tagged comps between $5M and $15M. Waterfront
              and harbor-corridor names dominate the top of the band; the lower half is more often
              village or near-village product.
            </p>
            <div className="overflow-x-auto border border-white/5">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10 text-cream/40 text-xs uppercase tracking-wide">
                    <th className="text-left px-4 py-3">Sold</th>
                    <th className="text-left px-4 py-3">Address</th>
                    <th className="text-left px-4 py-3">Price</th>
                    <th className="text-left px-4 py-3">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTrades.map((t) => (
                    <tr key={`${t.date}-${t.address}`} className="border-b border-white/5">
                      <td className="px-4 py-3 text-cream/50 whitespace-nowrap">{t.date}</td>
                      <td className="px-4 py-3 text-cream/85">{t.address}</td>
                      <td className="px-4 py-3 text-gold whitespace-nowrap">{t.price}</td>
                      <td className="px-4 py-3 text-cream/45">{t.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h2 className="font-serif text-2xl text-cream mt-10 mb-4">Q&amp;A</h2>
            <div className="space-y-6">
              {faqLd.mainEntity.map((item) => (
                <div key={item.name} className="border border-white/5 p-5">
                  <h3 className="font-serif text-xl text-cream mb-2">{item.name}</h3>
                  <p className="text-cream/65 text-base leading-relaxed">
                    {item.acceptedAnswer.text}
                  </p>
                </div>
              ))}
            </div>

            <h2 className="font-serif text-2xl text-cream mt-10 mb-4">Bottom line</h2>
            <p>
              In Sag Harbor’s $5M–$15M lane, dollar amount alone is a weak comparator. Pair price
              with frontage type, street, lot, and condition — then sanity-check against the latest
              same-micro-market closes. For a property-specific read, talk to{' '}
              <Link href="/about/barry-mcgovern" className="text-gold hover:text-gold-light">
                Barry McGovern
              </Link>
              .
            </p>
          </div>

          <p className="text-cream/30 text-xs mt-12 border-t border-white/5 pt-6">
            Disclaimer: Editorial market commentary from Hamptons Coastal. Not brokerage advice, not
            an appraisal, and not a solicitation. Comps from the Hamptons Coastal comparable_sales
            dataset (Sep 2026). Verify with primary records before underwriting.
          </p>
        </div>
      </article>
    </>
  )
}
