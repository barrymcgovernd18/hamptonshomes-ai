"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import IntentForm from "@/components/IntentForm";
import { leadThisSession } from "@/lib/lead-keys";
import { INTENTS, INTENT_EVENT, pageVillage, type Intent } from "@/lib/intent";

const SLIDE_DELAY_MS = 75_000;
const SLIDE_SCROLL = 0.65;
const NEVER_ON = ["/contact"];

function CloseX({ onClick, label = "Close" }: { onClick: () => void; label?: string }) {
  return (
    <button type="button" onClick={onClick} aria-label={label} className="absolute right-1.5 top-1.5 flex h-11 w-11 items-center justify-center text-ink-muted hover:text-ink">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M5 5l14 14M19 5L5 19" />
      </svg>
    </button>
  );
}

/** Modal with the short intent form. Desktop: centered. Mobile: bottom sheet. */
function IntentDialog({ intent, village, source, onClose }: { intent?: Intent; village?: string; source: string; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    panel.current?.querySelector<HTMLElement>(intent ? "input[name=name]" : "[role=radio]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const items = Array.from(panel.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),input:not([tabindex='-1']),select,textarea"));
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [intent, onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center md:items-center md:p-6">
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-[rgba(12,24,29,0.45)]" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="hh-intent-title"
        className="relative max-h-[92svh] w-full overflow-y-auto border-t border-line bg-paper px-6 pb-[calc(env(safe-area-inset-bottom)+24px)] pt-9 shadow-[0_30px_80px_rgba(12,24,29,0.28)] md:max-w-[480px] md:border md:px-10 md:pb-9 md:pt-11"
      >
        <CloseX onClick={onClose} />
        <p className="eyebrow text-ocean">Barry McGovern · Hedgerow</p>
        <h2 id="hh-intent-title" className="mt-3 pr-8 font-serif text-[1.9rem] font-light leading-[1.08] text-ink md:text-[2.1rem]">
          {intent === "valuation" && village ? `A valuation in ${village}` : "How can Barry help?"}
        </h2>
        <p className="mt-2 text-[13.5px] leading-[1.7] text-ink-muted">Buying, selling, renting or a confidential valuation.</p>
        <div className="mt-6">
          <IntentForm initialIntent={intent} village={village} source={source} compact />
        </div>
      </div>
    </div>
  );
}

/** Corner card on articles and reports: after 75 seconds and 65% scroll, once per session. */
function SlideIn({ village, onChoose, onClose }: { village?: string; onChoose: (i: Intent) => void; onClose: () => void }) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const raf = requestAnimationFrame(() => setShown(true));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);
  return (
    <aside
      role="complementary"
      aria-labelledby="hh-slide-title"
      className={`fixed inset-x-3 bottom-[calc(env(safe-area-inset-bottom)+60px)] z-[55] border border-line bg-paper px-6 pb-6 pt-7 shadow-[0_20px_50px_rgba(12,24,29,0.22)] transition-[opacity,transform] duration-500 md:inset-x-auto md:bottom-6 md:right-6 md:w-[360px] ${shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
    >
      <CloseX onClick={onClose} label="Dismiss" />
      <p className="eyebrow text-ocean">Barry McGovern</p>
      <h2 id="hh-slide-title" className="mt-3 pr-8 font-serif text-[1.55rem] font-light leading-[1.12] text-ink">
        {village ? `Thinking of selling in ${village}?` : "Buying or selling in the Hamptons?"}
      </h2>
      <p className="mt-2 text-[13px] leading-[1.65] text-ink-muted">
        {village ? `A confidential view of where your home sits against these ${village} sales.` : "A confidential conversation, informed by every recent $5M+ sale."}
      </p>
      <div className="mt-5 grid grid-cols-4 border border-line">
        {INTENTS.map((o, i) => (
          <button
            key={o.value}
            type="button"
            onClick={() => onChoose(o.value)}
            className={`eyebrow min-h-11 px-1 py-3 text-[10px] tracking-[0.12em] text-ink transition-colors hover:bg-ocean-deep hover:text-paper focus-visible:outline focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ocean-deep ${i ? "border-l border-line" : ""}`}
          >
            {o.label}
          </button>
        ))}
      </div>
    </aside>
  );
}

/** Header button event target, mobile sticky bar, reader slide-in and the intent dialog. */
export default function IntentLayer() {
  const pathname = usePathname();
  const [dialog, setDialog] = useState<{ intent?: Intent; village?: string; source: string } | null>(null);
  const [slidePath, setSlidePath] = useState<string | null>(null);
  const slide = slidePath === pathname;
  const setSlide = useCallback((on: boolean) => setSlidePath(on ? window.location.pathname : null), []);

  const open = useCallback((d: { intent?: Intent; village?: string; source: string }) => {
    setSlide(false);
    setDialog(d);
  }, [setSlide]);

  useEffect(() => {
    const on = (e: Event) => {
      const d = (e as CustomEvent<{ intent?: Intent; village?: string; source?: string }>).detail ?? {};
      open({ intent: d.intent, village: d.village ?? pageVillage(), source: d.source ?? "Site" });
    };
    window.addEventListener(INTENT_EVENT, on);
    return () => window.removeEventListener(INTENT_EVENT, on);
  }, [open]);

  useEffect(() => {
    if (!pathname.startsWith("/blog/")) return;
    if (leadThisSession()) return;
    let timeUp = false;
    let scrolled = false;
    let done = false;
    const params = new URLSearchParams(window.location.search);
    const delay = params.has("hh-preview-slidein") ? 1500 : SLIDE_DELAY_MS;
    const tryShow = () => {
      if (done || !timeUp || !scrolled) return;
      if (leadThisSession()) return;
      if (document.querySelector("[role=dialog]")) return; // popup still open: wait for its dismissal and the next scroll
      if (document.activeElement && document.activeElement.closest("form")) return;
      done = true;
      setSlide(true);
    };
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SLIDE_SCROLL) {
        scrolled = true;
        tryShow();
      }
    };
    const timer = window.setTimeout(() => {
      timeUp = true;
      tryShow();
    }, delay);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, setSlide]);

  const hideBar = NEVER_ON.includes(pathname) || Boolean(dialog);

  return (
    <>
      {!NEVER_ON.includes(pathname) ? (
        <>
          <div aria-hidden="true" className="h-[52px] lg:hidden" />
          <nav
            aria-label="Work with Barry"
            className={`fixed inset-x-0 bottom-0 z-[50] border-t border-paper/15 bg-ocean-deep pb-[env(safe-area-inset-bottom)] text-paper transition-transform duration-300 lg:hidden ${hideBar ? "translate-y-full" : "translate-y-0"}`}
          >
            <ul className="grid h-[52px] grid-cols-4">
              {INTENTS.map((o, i) => (
                <li key={o.value} className={i ? "border-l border-paper/15" : ""}>
                  <button
                    type="button"
                    onClick={() => open({ intent: o.value, village: pageVillage(), source: "Mobile bar" })}
                    className="eyebrow flex h-full w-full items-center justify-center text-[10px] tracking-[0.14em] text-paper/90 active:bg-paper/10"
                  >
                    {o.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </>
      ) : null}
      {slide && !dialog ? (
        <SlideIn
          village={pageVillage()}
          onChoose={(intent) => open({ intent, village: pageVillage(), source: "Reader slide-in" })}
          onClose={() => setSlide(false)}
        />
      ) : null}
      {dialog ? <IntentDialog {...dialog} onClose={() => setDialog(null)} /> : null}
    </>
  );
}
