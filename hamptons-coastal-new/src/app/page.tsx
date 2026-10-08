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

  return (
    <>
      <section className="px-6 py-10 md:px-8">
        <div className="mx-auto max-w-7xl">
          {heroArticle && <ArticleCardLarge article={heroArticle} />}
        </div>
      </section>

      <section className="border-y border-line py-5">
        <div className="mx-auto flex max-w-7xl items-center gap-8 overflow-x-auto px-6 md:px-8">
          <span className="flex-shrink-0 text-[10px] uppercase tracking-[0.3em] text-ink-faint">Markets</span>
          {MARKETS.map((market) => (
            <Link
              key={market.id}
              href={`/markets/${market.slug}`}
              className="flex-shrink-0 text-sm tracking-wide text-ink-muted transition-colors hover:text-ocean"
            >
              {market.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-paper px-6 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex items-end justify-between gap-8">
            <div>
              <p className="mb-4 text-[11px] uppercase tracking-[0.28em] text-ocean">Latest</p>
              <h2 className="font-serif text-4xl text-ink md:text-5xl">Intelligence</h2>
            </div>
            <Link href="/articles" className="hidden border-b border-ocean pb-1 text-sm text-ocean md:block">
              View all <span aria-hidden="true">↗</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {gridArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-paper-soft px-6 py-20 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-ocean">Market</p>
                <h3 className="font-serif text-3xl text-ink">The Hamptons</h3>
              </div>
              <Link href="/markets/hamptons" className="border-b border-ocean pb-1 text-sm text-ocean">
                More
              </Link>
            </div>
            <div className="divide-y divide-line">
              {hamptons.map((article) => (
                <ArticleCardCompact key={article.id} article={article} />
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 flex items-end justify-between">
              <div>
                <p className="mb-2 text-[11px] uppercase tracking-[0.28em] text-ocean">Market</p>
                <h3 className="font-serif text-3xl text-ink">Palm Beach</h3>
              </div>
              <Link href="/markets/palm-beach" className="border-b border-ocean pb-1 text-sm text-ocean">
                More
              </Link>
            </div>
            <div className="divide-y divide-line">
              {palmBeach.map((article) => (
                <ArticleCardCompact key={article.id} article={article} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ocean px-6 py-24 text-paper md:px-8 md:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] uppercase tracking-[0.28em] text-paper/65">The App</p>
          <h2 className="mt-4 font-serif text-3xl leading-tight md:text-5xl">
            Market intelligence, anywhere.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-paper/70">
            AI-powered property valuations, interactive parcel maps, and real-time market data.
            All four markets in your pocket.
          </p>
          <a
            href="https://apps.apple.com/us/app/hamptons-coastal/id6759401604"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-block border border-paper/55 bg-paper/10 px-8 py-3.5 text-[11px] uppercase tracking-[0.24em] text-paper transition-colors hover:border-paper hover:bg-paper hover:text-ocean"
          >
            Download Now
          </a>
        </div>
      </section>
    </>
  )
}
