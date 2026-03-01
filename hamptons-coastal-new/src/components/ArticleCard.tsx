import Link from 'next/link'
import Image from 'next/image'
import { Article, slugify } from '@/lib/supabase'

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export function ArticleCardLarge({ article }: { article: Article }) {
  const slug = slugify(article.title)
  
  return (
    <Link href={`/articles/${slug}?id=${article.id}`} className="group block">
      <div className="relative aspect-[16/9] overflow-hidden bg-dark-700">
        {article.image_url && (
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 70vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-gold text-xs tracking-[0.2em] uppercase">
              {article.category_name}
            </span>
            <span className="text-cream/30">|</span>
            <span className="text-cream/40 text-xs tracking-wide uppercase">
              {article.location}
            </span>
          </div>
          <h2 className="font-serif text-2xl md:text-3xl text-cream leading-tight group-hover:text-gold transition-colors duration-200">
            {article.title}
          </h2>
          <p className="text-cream/50 text-sm mt-3 line-clamp-2 max-w-2xl">
            {article.excerpt}
          </p>
          <div className="flex items-center gap-3 mt-4 text-cream/30 text-xs">
            <span>{formatDate(article.published_at)}</span>
            <span>·</span>
            <span>{article.reading_time} min read</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export function ArticleCard({ article }: { article: Article }) {
  const slug = slugify(article.title)

  return (
    <Link href={`/articles/${slug}?id=${article.id}`} className="group block">
      <div className="relative aspect-[3/2] overflow-hidden bg-dark-700 mb-4">
        {article.image_url && (
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/60 to-transparent" />
      </div>
      <div className="flex items-center gap-3 mb-2">
        <span className="text-gold text-xs tracking-[0.15em] uppercase">
          {article.category_name}
        </span>
        <span className="text-cream/20">|</span>
        <span className="text-cream/30 text-xs tracking-wide uppercase">
          {article.location}
        </span>
      </div>
      <h3 className="font-serif text-lg text-cream leading-snug group-hover:text-gold transition-colors duration-200">
        {article.title}
      </h3>
      <p className="text-cream/40 text-sm mt-2 line-clamp-2">
        {article.excerpt}
      </p>
      <div className="flex items-center gap-3 mt-3 text-cream/25 text-xs">
        <span>{formatDate(article.published_at)}</span>
        <span>·</span>
        <span>{article.reading_time} min read</span>
      </div>
    </Link>
  )
}

export function ArticleCardCompact({ article }: { article: Article }) {
  const slug = slugify(article.title)

  return (
    <Link href={`/articles/${slug}?id=${article.id}`} className="group flex gap-4 py-4 border-b border-white/5">
      <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden bg-dark-700">
        {article.image_url && (
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover"
            sizes="96px"
          />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <span className="text-gold text-[10px] tracking-[0.15em] uppercase">
          {article.category_name}
        </span>
        <h4 className="font-serif text-sm text-cream leading-snug mt-1 group-hover:text-gold transition-colors line-clamp-2">
          {article.title}
        </h4>
        <div className="flex items-center gap-2 mt-2 text-cream/25 text-[10px]">
          <span>{article.location}</span>
          <span>·</span>
          <span>{article.reading_time} min</span>
        </div>
      </div>
    </Link>
  )
}
