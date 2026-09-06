"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const links = [
  { href: "/about", label: "About" },
  { href: "/sales", label: "Portfolio" },
  { href: "/market", label: "Market" },
  { href: "/press", label: "Press" },
  { href: "/blog", label: "Insights" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const photoHeader = pathname === "/" && !scrolled && !mobileOpen;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${photoHeader ? "border-white/15 bg-ocean/20 text-white" : "border-line/80 bg-paper/95 text-ink backdrop-blur-md"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-8">
        <Link href="/" className="group flex items-baseline gap-3" aria-label="Barry McGovern home">
          <span className={`font-serif text-2xl leading-none transition-colors ${photoHeader ? "text-white" : "text-ink"}`}>BM</span>
          <span className={`hidden text-[10px] uppercase tracking-[0.28em] sm:inline ${photoHeader ? "text-white/65" : "text-ink-muted"}`}>Hamptons</span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((item) => (
            <Link key={item.href} href={item.href} className={`text-[11px] uppercase tracking-[0.2em] transition-colors ${photoHeader ? "text-white/75 hover:text-white" : "text-ink-muted hover:text-ocean"}`}>
              {item.label}
            </Link>
          ))}
          <Link href="/contact" className={`border px-4 py-2 text-[11px] uppercase tracking-[0.2em] transition-colors ${photoHeader ? "border-white/50 text-white hover:bg-white hover:text-ink" : "border-ocean text-ocean hover:bg-ocean hover:text-paper"}`}>
            Inquire
          </Link>
        </nav>

        <button className={`md:hidden ${photoHeader ? "text-white" : "text-ink"}`} onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu" aria-expanded={mobileOpen}>
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            {mobileOpen ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18 18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="border-t border-line bg-paper px-6 py-7 text-ink md:hidden">
          <div className="flex flex-col gap-5">
            {[...links, { href: "/contact", label: "Inquire" }].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="text-xs uppercase tracking-[0.22em] text-ink-muted hover:text-ocean">{item.label}</Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
