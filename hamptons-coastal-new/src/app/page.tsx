import { getArticles, MARKETS } from '@/lib/supabase'
import { ArticleCardLarge, ArticleCard, ArticleCardCompact } from '@/components/ArticleCard'
import Link from 'next/link'

export const revalidate = 300

export default async function HomePage() {
  const [featured, latest, hamptons, palmBeach] = await Promise.all([
    getArticles({ featured: true, limit: 1 }),
    getArticles({ limit: 12 }),
    getArticles({ market: 'hamptons', limit: 4 }),
    getArticles({ market: 'palm-beach', limit: 4 }),
  ])

  const heroArticle = featured[0] || latest[0]
  const gridArticles = latest.filter(a => a.id !== heroArticle?.id).slice(0, 6)
  const sideArticles = latest.filter(a => a.id !== heroArticle?.id && !gridArticles.find(g => g.id === a.id)).slice(0, 5)

  return (
    <>
      {/* Hero */}
      <section className="px-6 py-8">
        <div className="max-w-7xl mx-auto">
          {heroArticle && <ArticleCardLarge article={heroArticle} />}
        </div>
      </section>

      {/* Market Ticker */}
      <section className="border-y border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 overflow-x-auto">
          <span className="text-cream/30 text-xs tracking-[0.3em] uppercase flex-shrink-0">Markets</span>
          {MARKETS.map((market) => (
            <Link
              key={market.id}
              href={`/markets/${market.slug}`}
              className="text-cream/50 hover:text-gold text-sm tracking-wide transition-colors flex-shrink-0"
            >
              {market.name}
            </Link>
          ))}
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section className="px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-serif text-2xl text-cream">Latest</h2>
            <Link href="/articles" className="text-gold text-sm hover:text-gold-light transition-colors tracking-wide uppercase">
              View All
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {gridArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      {/* Two Column: Market Sections */}
      <section className="px-6 py-16 bg-dark-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Hamptons */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl text-cream">The Hamptons</h3>
              <Link href="/markets/hamptons" className="text-gold text-xs hover:text-gold-light transition-colors tracking-wide uppercase">
                More
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {hamptons.map((article) => (
                <ArticleCardCompact key={article.id} article={article} />
              ))}
            </div>
          </div>

          {/* Palm Beach */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl text-cream">Palm Beach</h3>
              <Link href="/markets/palm-beach" className="text-gold text-xs hover:text-gold-light transition-colors tracking-wide uppercase">
                More
              </Link>
            </div>
            <div className="divide-y divide-white/5">
              {palmBeach.map((article) => (
                <ArticleCardCompact key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA: Download App */}
      <section className="px-6 py-24">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-gold text-xs tracking-[0.3em] uppercase">The App</span>
          <h2 className="font-serif text-3xl md:text-4xl text-cream mt-4 mb-6">
            Market intelligence, anywhere.
          </h2>
          <p className="text-cream/50 text-lg mb-8 leading-relaxed">
            AI-powered property valuations, interactive parcel maps, and real-time market data. 
            All four markets in your pocket.
          </p>
          <a
            href="https://apps.apple.com/us/app/hamptons-coastal/id6759401604"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gold text-dark-900 px-8 py-3 text-sm tracking-[0.2em] uppercase font-medium hover:bg-gold-light transition-colors"
          >
            Download Now
          </a>
        </div>
      </section>
    </>
  )
}
