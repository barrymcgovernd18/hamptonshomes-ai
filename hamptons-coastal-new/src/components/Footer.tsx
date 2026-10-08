import Link from 'next/link'
import { MARKETS } from '@/lib/supabase'

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper text-ink-muted">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-24">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="font-serif text-4xl text-ink">Hamptons Coastal</p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.32em] text-ocean">
              Luxury Real Estate Intelligence
            </p>
            <p className="mt-8 max-w-sm text-[13px] leading-relaxed">
              Original editorial coverage across America&apos;s most exclusive markets: the Hamptons,
              Palm Beach, Miami, and Aspen.
            </p>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-ink-faint">Markets</p>
            <div className="space-y-3 text-[13px]">
              {MARKETS.map((market) => (
                <Link
                  key={market.id}
                  href={`/markets/${market.slug}`}
                  className="block transition-colors hover:text-ocean"
                >
                  {market.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-ink-faint">Company</p>
            <div className="space-y-3 text-[13px]">
              <Link href="/about" className="block transition-colors hover:text-ocean">About</Link>
              <Link href="/about/barry-mcgovern" className="block transition-colors hover:text-ocean">Barry McGovern</Link>
              <Link href="/support" className="block transition-colors hover:text-ocean">Support</Link>
              <Link href="/download" className="block transition-colors hover:text-ocean">Get the App</Link>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-ink-faint">Connect</p>
            <div className="space-y-3 text-[13px]">
              <a href="mailto:info@hamptonscoastal.com" className="block transition-colors hover:text-ocean">
                info@hamptonscoastal.com
              </a>
              <div className="flex gap-5 pt-2 text-[10px] uppercase tracking-[0.2em]">
                <a href="https://instagram.com/hamptons.coastal" target="_blank" rel="noopener noreferrer" className="hover:text-ocean">IG</a>
                <a href="https://twitter.com/hamptonscoastal" target="_blank" rel="noopener noreferrer" className="hover:text-ocean">X</a>
                <a href="https://linkedin.com/in/hamptons-coastal-52179a3b1" target="_blank" rel="noopener noreferrer" className="hover:text-ocean">LI</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-[10px] tracking-[0.08em] text-ink-faint md:flex-row md:items-center md:justify-between md:px-8">
          <p>&copy; {new Date().getFullYear()} Hamptons Coastal LLC. Editorial intelligence, not a brokerage.</p>
          <div className="flex flex-wrap gap-6 uppercase tracking-[0.16em]">
            <Link href="/privacy" className="hover:text-ocean">Privacy</Link>
            <Link href="/terms" className="hover:text-ocean">Terms</Link>
            <Link href="/support" className="hover:text-ocean">Support</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
