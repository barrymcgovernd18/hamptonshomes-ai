import { getArticles, MARKETS, CATEGORIES } from '@/lib/supabase'
import { ArticleCard } from '@/components/ArticleCard'
import Link from 'next/link'
import type { Metadata } from 'next'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Articles',
  description: 'Luxury real estate news and analysis across the Hamptons, Palm Beach, Miami, and Aspen.',
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { market?: string; category?: string }
}) {
  const articles = await getArticles({
    market: searchParams.market,
    category: searchParams.category,
    limit: 24,
  })

  return (
    <div className="px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="font-serif text-3xl md:text-4xl text-cream mb-4">Articles</h1>
          <p className="text-cream/40 text-lg">
            Luxury real estate news and market intelligence.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-6 mb-12 pb-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <span className="text-cream/30 text-xs tracking-[0.2em] uppercase">Market</span>
            <Link
              href="/articles"
              className={`text-sm ${!searchParams.market ? 'text-gold' : 'text-cream/50 hover:text-cream'} transition-colors`}
            >
              All
            </Link>
            {MARKETS.map((market) => (
              <Link
                key={market.id}
                href={`/articles?market=${market.slug}${searchParams.category ? `&category=${searchParams.category}` : ''}`}
                className={`text-sm ${searchParams.market === market.slug ? 'text-gold' : 'text-cream/50 hover:text-cream'} transition-colors`}
              >
                {market.name}
              </Link>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-cream/30 text-xs tracking-[0.2em] uppercase">Category</span>
            <Link
              href={`/articles${searchParams.market ? `?market=${searchParams.market}` : ''}`}
              className={`text-sm ${!searchParams.category ? 'text-gold' : 'text-cream/50 hover:text-cream'} transition-colors`}
            >
              All
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/articles?${searchParams.market ? `market=${searchParams.market}&` : ''}category=${cat.slug}`}
                className={`text-sm ${searchParams.category === cat.slug ? 'text-gold' : 'text-cream/50 hover:text-cream'} transition-colors`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Articles Grid */}
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-cream/30 text-lg">No articles found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
