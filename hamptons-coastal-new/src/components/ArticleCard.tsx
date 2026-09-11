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
    <Link href={`/articles/${slug}?id=${article.id}`} className="group block overflow-hidden border border-line bg-paper-soft">
      <div className="relative aspect-[16/9] overflow-hidden bg-paper-deep">
        {article.image_url && (
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 70vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ocean-deep/80 via-ocean-deep/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="mb-3 flex items-center gap-3">
            <span className="text-[10px] uppercase tracking-[0.28em] text-ocean-soft">
              {article.category_name}
            </span>
            <span className="text-paper/35">·</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-paper/70">
              {article.location}
            </span>
          </div>
          <h2 className="max-w-3xl font-serif text-2xl leading-tight text-paper transition-colors duration-500 group-hover:text-ocean-soft md:text-4xl">
            {article.title}
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-paper/70 line-clamp-2">
            {article.excerpt}
          </p>
          <div className="mt-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-paper/50">
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
      <div className="relative mb-5 aspect-[3/2] overflow-hidden bg-paper-deep">
        {article.image_url && (
          <Image
            src={article.image_url}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}
      </div>
      <div className="mb-2 flex items-center gap-3">
        <span className="text-[10px] uppercase tracking-[0.28em] text-ocean">
          {article.category_name}
        </span>
        <span className="text-line">·</span>
        <span className="text-[10px] uppercase tracking-[0.16em] text-ink-faint">
          {article.location}
        </span>
      </div>
      <h3 className="font-serif text-xl leading-snug text-ink transition-colors duration-500 group-hover:text-ocean">
        {article.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-2">
        {article.excerpt}
      </p>
      <div className="mt-3 flex items-center gap-3 text-[11px] text-ink-faint">
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
    <Link href={`/articles/${slug}?id=${article.id}`} className="group flex gap-4 py-5">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden bg-paper-deep">
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
      <div className="min-w-0 flex-1">
        <span className="text-[10px] uppercase tracking-[0.22em] text-ocean">
          {article.category_name}
        </span>
        <h4 className="mt-1 font-serif text-base leading-snug text-ink transition-colors group-hover:text-ocean line-clamp-2">
          {article.title}
        </h4>
        <div className="mt-2 flex items-center gap-2 text-[11px] text-ink-faint">
          <span>{article.location}</span>
          <span>·</span>
          <span>{article.reading_time} min</span>
        </div>
      </div>
    </Link>
  )
}
