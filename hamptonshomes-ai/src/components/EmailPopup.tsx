"use client";

import { useEffect, useRef, useState } from "react";
import LeadForm from "@/components/LeadForm";
import { pageVillage } from "@/lib/intent";

const TITLE_ID = "hh-popup-title";

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className="absolute right-1 top-1 z-10 flex h-12 w-12 items-center justify-center text-ink hover:text-ocean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-deep sm:right-2 sm:top-2"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  );
}

/** Centered monthly-brief modal on phone and desktop, with a dimmed backdrop. Hamlet copy stays when the page names a village. */
export default function EmailPopup({ desktop, onClose }: { desktop: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  const [village] = useState(() => pageVillage());
  const title = village ? `The monthly ${village} brief` : "The monthly East End brief";

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const raf = requestAnimationFrame(() => setShown(true));
    const focusTarget = desktop
      ? panel.current?.querySelector<HTMLElement>("input[type=email]")
      : panel.current?.querySelector<HTMLElement>("button[aria-label='Close']");
    focusTarget?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab" && panel.current) {
        const items = Array.from(
          panel.current.querySelectorAll<HTMLElement>("a[href],button:not([disabled]),input:not([tabindex='-1']),select,textarea")
        );
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
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [desktop, onClose]);

  return (
    <div className={`fixed inset-0 z-[60] flex items-center justify-center p-4 transition-opacity duration-300 sm:p-6 ${shown ? "opacity-100" : "opacity-0"}`}>
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0 bg-[rgba(12,24,29,0.45)]" />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        className="relative flex max-h-[min(92svh,760px)] w-full max-w-[460px] flex-col border border-line bg-paper shadow-[0_30px_80px_rgba(12,24,29,0.28)]"
      >
        <CloseButton onClick={onClose} />
        <div className="overflow-y-auto overscroll-contain px-6 pb-[max(2rem,env(safe-area-inset-bottom))] pt-14 sm:px-10 sm:pb-9">
          <p className="eyebrow pr-8 text-ocean">Barry McGovern · Research</p>
          <h2 id={TITLE_ID} className="mt-3 pr-2 font-serif text-[1.85rem] font-light leading-[1.08] text-ink sm:mt-4 sm:text-[2.1rem]">
            {title}
          </h2>
          <p className="mt-3 text-[14px] leading-[1.7] text-ink-muted">
            {village
              ? desktop
                ? `Stay ahead of the ${village} market. A short note each month on its $5M+ sales, new listings, and what is worth watching, alongside the wider East End.`
                : `Stay ahead of the ${village} market: what sold, what is available, what is worth watching.`
              : desktop
                ? "A short note each month on luxury real estate from Southampton to Montauk. Closings, inventory, and the villages that are moving."
                : "What sold, what is available, and what is worth watching."}
          </p>
          <div className="mt-6 sm:mt-7">
            <LeadForm kind="popup" compact />
          </div>
        </div>
      </div>
    </div>
  );
}
