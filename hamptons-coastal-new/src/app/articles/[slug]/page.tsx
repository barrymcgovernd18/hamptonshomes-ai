import { getArticleById, getArticles, locationToSlug } from '@/lib/supabase'
import { ArticleCard } from '@/components/ArticleCard'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 300

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatContent(content: string) {
  const paragraphs = content.split(/\n\n+/).filter(p => p.trim())
  return paragraphs.map((p) => {
    const trimmed = p.trim()
    if (trimmed.startsWith('Photo:') || trimmed.startsWith('Photo by')) {
      return `<p class="text-ink-faint text-sm mt-8 italic">${trimmed}</p>`
    }
    return `<p>${trimmed}</p>`
  }).join('')
}

export async function generateMetadata({
  searchParams,
}: {
  params: { slug: string }
  searchParams: { id?: string }
}): Promise<Metadata> {
  if (!searchParams.id) return { title: 'Article' }
  const article = await getArticleById(searchParams.id)
  if (!article) return { title: 'Article Not Found' }

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: 'article',
      publishedTime: article.published_at,
      authors: [article.author],
      images: article.image_url ? [{
        url: article.image_url,
        width: 1200,
        height: 630,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: article.image_url ? [article.image_url] : [],
    },
  }
}

export default async function ArticlePage({
  searchParams,
}: {
  params: { slug: string }
  searchParams: { id?: string }
}) {
  if (!searchParams.id) notFound()

  const article = await getArticleById(searchParams.id)
  if (!article) notFound()

  const related = await getArticles({
    market: locationToSlug(article.location),
    limit: 4,
  })
  const relatedFiltered = related.filter(a => a.id !== article.id).slice(0, 3)

  return (
    <>
      {article.image_url && (
        <div className="relative max-h-[500px] w-full overflow-hidden aspect-[21/9]">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-paper via-transparent to-transparent" />
        </div>
      )}

      <article className="px-6 py-12 md:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center gap-3">
            <Link
              href={`/markets/${locationToSlug(article.location)}`}
              className="text-[10px] uppercase tracking-[0.28em] text-ocean transition-colors hover:text-ocean-deep"
            >
              {article.location}
            </Link>
            <span className="text-line">·</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-ink-faint">
              {article.category_name}
            </span>
          </div>

          <h1 className="mb-6 font-serif text-3xl leading-tight text-ink md:text-5xl">
            {article.title}
          </h1>

          <p className="mb-8 border-l-2 border-ocean/40 pl-6 text-lg leading-relaxed text-ink-muted">
            {article.excerpt}
          </p>

          <div className="mb-12 flex items-center gap-4 border-b border-line pb-8">
            <div>
              <p className="text-sm text-ink">{article.author}</p>
              <p className="mt-1 text-xs text-ink-faint">
                {formatDate(article.published_at)} · {article.reading_time} min read
              </p>
            </div>
          </div>

          <div
            className="article-content text-lg leading-relaxed text-ink-muted"
            dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
          />
        </div>
      </article>

      {relatedFiltered.length > 0 && (
        <section className="border-t border-line bg-paper-soft px-6 py-16 md:px-8">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-10 font-serif text-3xl text-ink">
              More from {article.location}
            </h2>
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-3">
              {relatedFiltered.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
