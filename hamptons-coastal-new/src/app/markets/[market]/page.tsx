import { getArticles, MARKETS } from '@/lib/supabase'
import { ArticleCardLarge, ArticleCard } from '@/components/ArticleCard'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 300

export async function generateStaticParams() {
  return MARKETS.map((market) => ({ market: market.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { market: string }
}): Promise<Metadata> {
  const market = MARKETS.find(m => m.slug === params.market)
  if (!market) return { title: 'Market Not Found' }
  
  return {
    title: `${market.name} Real Estate News`,
    description: `Luxury real estate news, market analysis, and notable transactions in ${market.name}.`,
  }
}

export default async function MarketPage({
  params,
}: {
  params: { market: string }
}) {
  const market = MARKETS.find(m => m.slug === params.market)
  if (!market) notFound()

  const articles = await getArticles({ market: market.slug, limit: 13 })
  const hero = articles[0]
  const rest = articles.slice(1)

  return (
    <div className="px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <span className="text-gold text-xs tracking-[0.3em] uppercase">Market</span>
          <h1 className="font-serif text-3xl md:text-4xl text-cream mt-2">{market.name}</h1>
          <p className="text-cream/40 text-lg mt-3">
            Luxury real estate news and market intelligence.
          </p>
        </div>

        {/* Hero Article */}
        {hero && (
          <div className="mb-16">
            <ArticleCardLarge article={hero} />
          </div>
        )}

        {/* Grid */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {rest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {articles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-cream/30 text-lg">No articles yet for {market.name}.</p>
          </div>
        )}
      </div>
    </div>
  )
}
