import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tfzkenrmzoxrkdntkada.supabase.co'
const supabaseKey = 'sb_publishable_8m4eaHzfDiL3fKCHdm2pyg_TVgLg0RF'

export const supabase = createClient(supabaseUrl, supabaseKey)

export interface Article {
  id: string
  title: string
  subtitle: string | null
  excerpt: string
  content: string
  image_url: string
  author: string
  published_at: string
  category_id: string
  category_name: string
  category_slug: string
  location: string
  reading_time: number
  is_featured: boolean
  pull_quote: string | null
  approval_status: string
}

// Map market slugs to location values in the database
const MARKET_TO_LOCATION: Record<string, string> = {
  'hamptons': 'Hamptons',
  'palm-beach': 'Palm Beach',
  'miami': 'Miami',
  'aspen': 'Aspen',
}

export function locationToSlug(location: string): string {
  const entry = Object.entries(MARKET_TO_LOCATION).find(([, v]) => v === location)
  return entry ? entry[0] : location.toLowerCase().replace(/\s+/g, '-')
}

export async function getArticles(options?: {
  market?: string
  category?: string
  limit?: number
  offset?: number
  featured?: boolean
}) {
  let query = supabase
    .from('generated_articles')
    .select('*')
    .eq('approval_status', 'approved')
    .order('published_at', { ascending: false })

  if (options?.market) {
    const location = MARKET_TO_LOCATION[options.market] || options.market
    query = query.eq('location', location)
  }
  if (options?.category) query = query.eq('category_slug', options.category)
  if (options?.featured) query = query.eq('is_featured', true)
  if (options?.limit) query = query.limit(options.limit)
  if (options?.offset) query = query.range(options.offset, options.offset + (options?.limit || 10) - 1)

  const { data, error } = await query
  if (error) throw error
  return data as Article[]
}

export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from('generated_articles')
    .select('*')
    .eq('approval_status', 'approved')
    .ilike('title', slug.replace(/-/g, '%'))
    .limit(1)
    .single()

  if (error) return null
  return data as Article
}

export async function getArticleById(id: string) {
  const { data, error } = await supabase
    .from('generated_articles')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data as Article
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export const MARKETS = [
  { id: 'hamptons', name: 'The Hamptons', slug: 'hamptons' },
  { id: 'palm-beach', name: 'Palm Beach', slug: 'palm-beach' },
  { id: 'miami', name: 'Miami', slug: 'miami' },
  { id: 'aspen', name: 'Aspen', slug: 'aspen' },
]

export const CATEGORIES = [
  { id: 'market-analysis', name: 'Market Analysis', slug: 'market-analysis' },
  { id: 'luxury-sales', name: 'Luxury Sales', slug: 'luxury-sales' },
  { id: 'development', name: 'Development', slug: 'development' },
  { id: 'lifestyle', name: 'Lifestyle', slug: 'lifestyle' },
]
