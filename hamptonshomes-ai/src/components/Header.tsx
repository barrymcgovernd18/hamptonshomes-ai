"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const primary = [
  { href: "/sales", label: "Portfolio" },
  { href: "/listings", label: "Listings" },
  { href: "/market", label: "Market" },
  { href: "/press", label: "Press" },
  { href: "/about", label: "About" },
];

/** Pages that open on a dark, full-bleed hero: the bar stays transparent over it until scrolled. */
const AREA_SLUGS = ["east-hampton", "sag-harbor", "bridgehampton", "sagaponack", "southampton", "water-mill", "amagansett", "montauk", "shelter-island", "wainscott"];
const BAR_HEIGHT = 76;
const DARK_HERO_PATHS = new Set(["/", "/about", "/sales", "/press", ...AREA_SLUGS.map((slug) => `/${slug}`)]);

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const darkHero = DARK_HERO_PATHS.has(pathname);
  const overHero = darkHero && !scrolled && !menuOpen;

  /*
   * Transparent over a dark hero, solid once the hero has scrolled out from under the bar.
   * An IntersectionObserver on the hero (marked data-hero) flips the state exactly once at that
   * boundary, so iOS rubber-band overscroll, toolbar resizes and tiny scroll deltas cannot toggle it.
   */
  useEffect(() => {
    if (!darkHero) return;
    const hero = document.querySelector("[data-hero]");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      rootMargin: `-${BAR_HEIGHT}px 0px 0px 0px`,
    });
    io.observe(hero);
    return () => io.disconnect();
  }, [darkHero, pathname]);

  /*
   * Desktop only: tuck the bar away while reading down, bring it back on upward scroll.
   * rAF-throttled, ignores overscroll, needs a real delta, and only ever moves via transform.
   * On phones and tablets the bar simply stays put.
   */
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    let lastY = Math.max(0, window.scrollY);
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!desktop.matches) return setHidden(false);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const y = Math.min(Math.max(0, window.scrollY), Math.max(0, max));
      const delta = y - lastY;
      if (y <= 520) setHidden(false);
      else if (delta > 12) setHidden(true);
      else if (delta < -12) setHidden(false);
      else return;
      lastY = y;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const onChange = () => !desktop.matches && setHidden(false);
    window.addEventListener("scroll", onScroll, { passive: true });
    desktop.addEventListener("change", onChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      desktop.removeEventListener("change", onChange);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  const tone = overHero ? "text-paper" : "text-ink";
  const muted = overHero ? "text-paper/85 hover:text-paper" : "text-ink-muted hover:text-ink";

  return (
    <header
      onFocusCapture={() => setHidden(false)}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,color] duration-300 ease-out motion-reduce:transition-none lg:transition-[transform,background-color,border-color,color] lg:duration-700 lg:ease-[cubic-bezier(0.22,0.61,0.21,1)] ${
        hidden && !menuOpen ? "lg:-translate-y-full" : ""
      } ${
        menuOpen
          ? "border-b border-transparent bg-transparent"
          : overHero
            ? "border-b border-paper/15 bg-transparent"
            : "border-b border-line/70 bg-paper lg:bg-paper/92 lg:backdrop-blur-md"
      }`}
    >
      <div className="frame relative grid h-[76px] grid-cols-[1fr_auto_1fr] items-center">
        <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
          {primary.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`eyebrow transition-colors duration-500 ${muted} ${active && !overHero ? "!text-ink" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="lg:hidden" />

        <Link
          href="/"
          onClick={() => setMenuOpen(false)}
          className={`group flex flex-col items-center transition-colors duration-500 ${menuOpen ? "text-paper" : tone}`}
        >
          <span className="font-serif text-[30px] font-light leading-none tracking-[0.06em]">BM</span>{" "}
          <span className="eyebrow mt-1.5 text-[8.5px] tracking-[0.46em] opacity-80 max-sm:sr-only">Barry McGovern</span>
        </Link>

        <div className="flex items-center justify-end gap-7">
          <a href="tel:+16463390154" className={`eyebrow hidden transition-colors duration-500 xl:inline ${muted}`}>
            646.339.0154
          </a>
          <Link
            href="/contact"
            className={`eyebrow hidden border px-5 py-2.5 transition-colors duration-500 lg:inline-block ${
              overHero
                ? "border-paper/55 text-paper hover:bg-paper hover:text-ink"
                : "border-ink/70 text-ink hover:bg-ink hover:text-paper"
            }`}
          >
            Inquire
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            className={`eyebrow flex items-center gap-3 lg:hidden ${menuOpen ? "text-paper" : tone}`}
          >
            <span>{menuOpen ? "Close" : "Menu"}</span>
            <span aria-hidden="true" className="relative block h-[9px] w-6">
              <span className={`absolute left-0 top-0 h-px w-6 bg-current transition-transform duration-500 ${menuOpen ? "translate-y-[4px] rotate-45" : ""}`} />
              <span className={`absolute bottom-0 left-0 h-px w-6 bg-current transition-transform duration-500 ${menuOpen ? "-translate-y-[4px] -rotate-45" : ""}`} />
            </span>
          </button>
        </div>
      </div>

      <div
        id="site-menu"
        hidden={!menuOpen}
        className="fixed inset-0 -z-10 flex min-h-[100svh] flex-col bg-ocean-deep text-paper lg:hidden"
      >
        <nav aria-label="Mobile" className="frame flex flex-1 flex-col justify-center pt-24">
          <ol className="space-y-1">
            {[...primary, { href: "/contact", label: "Contact" }].map((item, i) => (
              <li key={item.href} className="border-b border-paper/12">
                <Link href={item.href} onClick={() => setMenuOpen(false)} className="flex items-baseline gap-5 py-4">
                  <span className="eyebrow w-6 text-paper/60">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-[2.6rem] font-light leading-none">{item.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className="frame pb-10 pt-8 text-paper/75">
          <p className="eyebrow text-paper/60">Barry McGovern</p>
          <p className="mt-2 text-[13px]">Licensed Real Estate Salesperson, Hedgerow Exclusive Properties</p>
          <div className="mt-5 flex flex-col gap-2 text-[15px]">
            <a href="tel:+16463390154" className="text-paper">646.339.0154</a>
            <a href="mailto:barry@hedgerowexclusive.com" className="text-paper">barry@hedgerowexclusive.com</a>
          </div>
        </div>
      </div>
    </header>
  );
}
