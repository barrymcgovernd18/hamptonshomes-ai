"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-black/95 backdrop-blur-md py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-8 flex items-center justify-between">
        <Link href="/" className="group">
          <span className="text-white font-serif text-[22px] tracking-wide group-hover:text-gold transition-colors duration-500">
            BM
          </span>
          <span className="hidden sm:inline text-white/30 font-serif text-[22px] ml-2 tracking-wide">
            |
          </span>
          <span className="hidden sm:inline text-white/50 text-[11px] tracking-[0.35em] uppercase ml-3">
            Hamptons
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-10">
          {[
            { href: "/about", label: "About" },
            { href: "/sales", label: "Portfolio" },
            { href: "/market", label: "Market" },
            { href: "/press", label: "Press" },
            { href: "/blog", label: "Insights" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white/50 hover:text-white transition-colors duration-500 text-[11px] tracking-[0.25em] uppercase"
            >
              {item.label}
            </Link>
          ))}
          <div className="w-px h-4 bg-white/10 mx-1" />
          <Link
            href="/contact"
            className="text-gold text-[11px] tracking-[0.25em] uppercase hover:text-gold-light transition-colors duration-500"
          >
            Inquire
          </Link>
        </nav>

        <button
          className="md:hidden text-white/60"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden bg-black/98 backdrop-blur-md px-8 py-10 flex flex-col gap-6 border-t border-white/5">
          {[
            { href: "/about", label: "About" },
            { href: "/sales", label: "Portfolio" },
            { href: "/market", label: "Market" },
            { href: "/press", label: "Press" },
            { href: "/blog", label: "Insights" },
            { href: "/contact", label: "Inquire" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="text-white/50 hover:text-gold text-[12px] tracking-[0.25em] uppercase transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
