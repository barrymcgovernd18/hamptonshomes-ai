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
    <div className="px-6 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="text-[11px] uppercase tracking-[0.28em] text-ocean">Market</p>
          <h1 className="mt-3 font-serif text-4xl text-ink md:text-6xl">{market.name}</h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink-muted">
            Luxury real estate news and market intelligence.
          </p>
        </div>

        {hero && (
          <div className="mb-16">
            <ArticleCardLarge article={hero} />
          </div>
        )}

        {rest.length > 0 && (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}

        {articles.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-lg text-ink-faint">No articles yet for {market.name}.</p>
          </div>
        )}
      </div>
    </div>
  )
}
