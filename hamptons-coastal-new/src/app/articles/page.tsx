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
    <div className="px-6 py-12 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-ocean">Archive</p>
          <h1 className="font-serif text-4xl text-ink md:text-6xl">Articles</h1>
          <p className="mt-4 text-lg text-ink-muted">
            Luxury real estate news and market intelligence.
          </p>
        </div>

        <div className="mb-12 flex flex-wrap gap-8 border-b border-line pb-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">Market</span>
            <Link
              href="/articles"
              className={`text-sm transition-colors ${!searchParams.market ? 'text-ocean' : 'text-ink-muted hover:text-ink'}`}
            >
              All
            </Link>
            {MARKETS.map((market) => (
              <Link
                key={market.id}
                href={`/articles?market=${market.slug}${searchParams.category ? `&category=${searchParams.category}` : ''}`}
                className={`text-sm transition-colors ${searchParams.market === market.slug ? 'text-ocean' : 'text-ink-muted hover:text-ink'}`}
              >
                {market.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.22em] text-ink-faint">Category</span>
            <Link
              href={`/articles${searchParams.market ? `?market=${searchParams.market}` : ''}`}
              className={`text-sm transition-colors ${!searchParams.category ? 'text-ocean' : 'text-ink-muted hover:text-ink'}`}
            >
              All
            </Link>
            {CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                href={`/articles?${searchParams.market ? `market=${searchParams.market}&` : ''}category=${cat.slug}`}
                className={`text-sm transition-colors ${searchParams.category === cat.slug ? 'text-ocean' : 'text-ink-muted hover:text-ink'}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-lg text-ink-faint">No articles found.</p>
          </div>
        )}
      </div>
    </div>
  )
}
