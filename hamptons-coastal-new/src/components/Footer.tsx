import Link from 'next/link'
import { MARKETS } from '@/lib/supabase'

export default function Footer() {
  return (
    <footer className="bg-dark-800 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex flex-col mb-4">
              <span className="text-cream font-serif text-lg tracking-[0.3em] uppercase">
                Hamptons
              </span>
              <span className="text-gold text-[9px] tracking-[0.5em] uppercase -mt-1">
                Coastal
              </span>
            </div>
            <p className="text-cream/40 text-sm leading-relaxed">
              Luxury real estate intelligence across America&apos;s most exclusive markets.
            </p>
          </div>

          {/* Markets */}
          <div>
            <h4 className="text-cream/60 text-xs tracking-[0.3em] uppercase mb-4">Markets</h4>
            <div className="space-y-3">
              {MARKETS.map((market) => (
                <Link
                  key={market.id}
                  href={`/markets/${market.slug}`}
                  className="block text-sm text-cream/40 hover-gold"
                >
                  {market.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-cream/60 text-xs tracking-[0.3em] uppercase mb-4">Company</h4>
            <div className="space-y-3">
              <Link href="/about" className="block text-sm text-cream/40 hover-gold">About</Link>
              <Link href="/support" className="block text-sm text-cream/40 hover-gold">Support</Link>
              <Link href="/download" className="block text-sm text-cream/40 hover-gold">Get the App</Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-cream/60 text-xs tracking-[0.3em] uppercase mb-4">Legal</h4>
            <div className="space-y-3">
              <Link href="/privacy" className="block text-sm text-cream/40 hover-gold">Privacy Policy</Link>
              <Link href="/terms" className="block text-sm text-cream/40 hover-gold">Terms of Use</Link>
            </div>
            <div className="mt-6">
              <a href="mailto:info@hamptonscoastal.com" className="text-sm text-gold hover:text-gold-light transition-colors">
                info@hamptonscoastal.com
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-cream/30 text-xs">
            &copy; {new Date().getFullYear()} Hamptons Coastal LLC. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="https://instagram.com/hamptons.coastal" target="_blank" rel="noopener noreferrer" className="text-cream/30 hover:text-gold transition-colors text-xs">
              Instagram
            </a>
            <a href="https://twitter.com/hamptonscoastal" target="_blank" rel="noopener noreferrer" className="text-cream/30 hover:text-gold transition-colors text-xs">
              X
            </a>
            <a href="https://linkedin.com/in/hamptons-coastal-52179a3b1" target="_blank" rel="noopener noreferrer" className="text-cream/30 hover:text-gold transition-colors text-xs">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
