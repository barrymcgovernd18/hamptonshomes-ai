'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MARKETS } from '@/lib/supabase'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 z-50 w-full border-b border-line/80 bg-paper/95 text-ink backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="flex items-center justify-between py-5">
          <Link href="/" className="group flex items-baseline gap-3" aria-label="Hamptons Coastal home">
            <span className="font-serif text-2xl leading-none text-ink">Hamptons</span>
            <span className="text-[10px] uppercase tracking-[0.28em] text-ocean">
              Coastal
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {MARKETS.map((market) => (
              <Link
                key={market.id}
                href={`/markets/${market.slug}`}
                className="text-[11px] uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ocean"
              >
                {market.name}
              </Link>
            ))}
            <Link
              href="/articles"
              className="text-[11px] uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ocean"
            >
              Articles
            </Link>
            <Link
              href="/download"
              className="border border-ocean px-4 py-2 text-[11px] uppercase tracking-[0.2em] text-ocean transition-colors hover:bg-ocean hover:text-paper"
            >
              Get the App
            </Link>
          </nav>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-ink md:hidden"
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18 18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <nav className="space-y-5 border-t border-line py-7 md:hidden">
            {MARKETS.map((market) => (
              <Link
                key={market.id}
                href={`/markets/${market.slug}`}
                onClick={() => setMobileOpen(false)}
                className="block text-xs uppercase tracking-[0.22em] text-ink-muted hover:text-ocean"
              >
                {market.name}
              </Link>
            ))}
            <Link
              href="/articles"
              onClick={() => setMobileOpen(false)}
              className="block text-xs uppercase tracking-[0.22em] text-ink-muted hover:text-ocean"
            >
              Articles
            </Link>
            <Link
              href="/download"
              onClick={() => setMobileOpen(false)}
              className="block text-xs uppercase tracking-[0.22em] text-ocean"
            >
              Get the App
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
