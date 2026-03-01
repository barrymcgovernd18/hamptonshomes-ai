'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MARKETS } from '@/lib/supabase'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full z-50 bg-dark-900/95 backdrop-blur-sm border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex flex-col">
              <span className="text-cream font-serif text-xl tracking-[0.3em] uppercase">
                Hamptons
              </span>
              <span className="text-gold text-[10px] tracking-[0.5em] uppercase -mt-1">
                Coastal
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {MARKETS.map((market) => (
              <Link
                key={market.id}
                href={`/markets/${market.slug}`}
                className="text-sm text-cream/60 hover-gold tracking-wide uppercase"
              >
                {market.name}
              </Link>
            ))}
            <Link
              href="/articles"
              className="text-sm text-cream/60 hover-gold tracking-wide uppercase"
            >
              All Articles
            </Link>
            <Link
              href="/download"
              className="text-sm bg-gold/10 text-gold px-4 py-2 border border-gold/30 hover:bg-gold/20 transition-colors tracking-wide uppercase"
            >
              Get the App
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-cream/60 hover:text-cream"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden py-6 border-t border-white/5 space-y-4">
            {MARKETS.map((market) => (
              <Link
                key={market.id}
                href={`/markets/${market.slug}`}
                onClick={() => setMobileOpen(false)}
                className="block text-sm text-cream/60 hover-gold tracking-wide uppercase"
              >
                {market.name}
              </Link>
            ))}
            <Link
              href="/articles"
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-cream/60 hover-gold tracking-wide uppercase"
            >
              All Articles
            </Link>
            <Link
              href="/download"
              onClick={() => setMobileOpen(false)}
              className="block text-sm text-gold tracking-wide uppercase"
            >
              Get the App
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
