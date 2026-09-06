import Link from "next/link";
import { areas } from "@/lib/areas";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-paper text-ink-muted">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-8 md:py-24">
        <div className="grid gap-14 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-5">
            <p className="font-serif text-4xl text-ink">Barry McGovern</p>
            <p className="mt-3 text-[10px] uppercase tracking-[0.32em] text-ocean">Hedgerow Exclusive Properties</p>
            <p className="mt-3 text-[11px] text-ink-faint">Licensed Real Estate Salesperson · NY License #10401353717</p>
            <p className="mt-8 max-w-sm text-[13px] leading-relaxed">Oceanfront and waterfront representation across the East End, from Southampton to Montauk.</p>
          </div>
          <div className="md:col-span-3 md:col-start-7">
            <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-ink-faint">Areas</p>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-[13px]">
              {areas.map((area) => <Link key={area.slug} href={`/${area.slug}`} className="transition-colors hover:text-ocean">{area.name}</Link>)}
            </div>
          </div>
          <div className="md:col-span-2">
            <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-ink-faint">Connect</p>
            <div className="space-y-3 text-[13px]">
              <a href="tel:+16463390154" className="block transition-colors hover:text-ocean">646-339-0154</a>
              <a href="mailto:barry@hedgerowexclusive.com" className="block transition-colors hover:text-ocean">Email Barry</a>
              <div className="flex gap-5 pt-2 text-[10px] uppercase tracking-[0.2em]"><a href="https://www.instagram.com/barrymcgovern_/" target="_blank" rel="noopener" className="hover:text-ocean">IG</a><a href="https://www.linkedin.com/in/barry-mcgovern-9346133b/" target="_blank" rel="noopener" className="hover:text-ocean">LI</a></div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-line"><div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-[10px] tracking-[0.08em] text-ink-faint md:flex-row md:items-center md:justify-between md:px-8"><p>&copy; {new Date().getFullYear()} Barry McGovern · 2495 Montauk Highway, Bridgehampton, NY</p><div className="flex flex-wrap gap-6 uppercase tracking-[0.16em]">{[{href:"/about",label:"About"},{href:"/sales",label:"Portfolio"},{href:"/market",label:"Market"},{href:"/contact",label:"Contact"}].map((item) => <Link key={item.href} href={item.href} className="hover:text-ocean">{item.label}</Link>)}</div></div></div>
    </footer>
  );
}
