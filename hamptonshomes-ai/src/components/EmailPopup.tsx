"use client";

import { useEffect, useRef, useState } from "react";
import LeadForm from "@/components/LeadForm";

const TITLE_ID = "hh-popup-title";

function CloseButton({ onClick, light }: { onClick: () => void; light?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className={`absolute right-2 top-2 flex h-11 w-11 items-center justify-center ${light ? "text-ink-muted hover:text-ink" : "text-ink-muted hover:text-ink"}`}
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.4">
        <path d="M5 5l14 14M19 5L5 19" />
      </svg>
    </button>
  );
}

/** Desktop: a small centered modal. Mobile: a compact bottom banner (never a full-screen interstitial). */
export default function EmailPopup({ desktop, onClose }: { desktop: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const raf = requestAnimationFrame(() => setShown(true));
    if (desktop) panel.current?.querySelector<HTMLInputElement>("input[type=email]")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (desktop && e.key === "Tab" && panel.current) {
        const items = Array.from(panel.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),input:not([tabindex='-1']),textarea"));
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
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      if (desktop) previous?.focus?.();
    };
  }, [desktop, onClose]);

  if (!desktop) {
    return (
      <div
        ref={panel}
        role="dialog"
        aria-modal="false"
        aria-labelledby={TITLE_ID}
        className={`fixed inset-x-0 bottom-0 z-[60] border-t border-line bg-paper px-5 pb-[calc(env(safe-area-inset-bottom)+14px)] pt-4 shadow-[0_-12px_30px_rgba(12,24,29,0.12)] transition-transform duration-500 ${shown ? "translate-y-0" : "translate-y-full"}`}
      >
        <CloseButton onClick={onClose} />
        <p id={TITLE_ID} className="pr-10 font-serif text-[1.3rem] font-light leading-tight text-ink">Get the oceanfront study</p>
        <p className="mt-1 pr-10 text-[12.5px] leading-snug text-ink-muted">And new listings before they reach the market.</p>
        <div className="mt-2">
          <LeadForm kind="popup" inline />
        </div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center p-6 transition-opacity duration-500 ${shown ? "opacity-100" : "opacity-0"}`}>
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-[rgba(12,24,29,0.45)]" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        className="relative w-full max-w-[460px] border border-line bg-paper px-10 pb-9 pt-11 shadow-[0_30px_80px_rgba(12,24,29,0.28)]"
      >
        <CloseButton onClick={onClose} />
        <p className="eyebrow text-ocean">Barry McGovern · Research</p>
        <h2 id={TITLE_ID} className="mt-4 font-serif text-[2.1rem] font-light leading-[1.08] text-ink">
          Get the oceanfront study
        </h2>
        <p className="mt-3 text-[14px] leading-[1.75] text-ink-muted">
          Eighty-seven Hamptons oceanfront sales since 2021, and new listings before they reach the market.
        </p>
        <div className="mt-7">
          <LeadForm kind="popup" compact />
        </div>
      </div>
    </div>
  );
}
