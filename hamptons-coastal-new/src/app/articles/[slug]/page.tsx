import { getArticleById, getArticles, slugify, locationToSlug } from '@/lib/supabase'
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
  // Split by double newlines for paragraphs
  const paragraphs = content.split(/\n\n+/).filter(p => p.trim())
  return paragraphs.map((p, i) => {
    const trimmed = p.trim()
    // Skip photo credits at the end
    if (trimmed.startsWith('Photo:') || trimmed.startsWith('Photo by')) {
      return `<p class="text-cream/30 text-sm mt-8 italic">${trimmed}</p>`
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
      {/* Hero Image */}
      {article.image_url && (
        <div className="relative w-full aspect-[21/9] max-h-[500px] overflow-hidden">
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/30 to-transparent" />
        </div>
      )}

      <article className="px-6 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Meta */}
          <div className="flex items-center gap-3 mb-6">
            <Link
              href={`/markets/${locationToSlug(article.location)}`}
              className="text-gold text-xs tracking-[0.2em] uppercase hover:text-gold-light transition-colors"
            >
              {article.location}
            </Link>
            <span className="text-cream/20">|</span>
            <span className="text-cream/40 text-xs tracking-wide uppercase">
              {article.category_name}
            </span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-cream leading-tight mb-6">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-cream/60 text-lg leading-relaxed mb-8 border-l-2 border-gold/30 pl-6">
            {article.excerpt}
          </p>

          {/* Author & Date */}
          <div className="flex items-center gap-4 mb-12 pb-8 border-b border-white/5">
            <div>
              <p className="text-cream/70 text-sm">{article.author}</p>
              <p className="text-cream/30 text-xs mt-1">
                {formatDate(article.published_at)} · {article.reading_time} min read
              </p>
            </div>
          </div>

          {/* Content */}
          <div
            className="article-content text-cream/85 text-lg leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatContent(article.content) }}
          />
        </div>
      </article>

      {/* Related Articles */}
      {relatedFiltered.length > 0 && (
        <section className="px-6 py-16 bg-dark-800 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-2xl text-cream mb-10">
              More from {article.location}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
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
