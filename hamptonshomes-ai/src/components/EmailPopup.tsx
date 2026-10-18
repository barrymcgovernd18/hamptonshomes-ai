"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import LeadForm from "@/components/LeadForm";
import { pageVillage } from "@/lib/intent";

const TITLE_ID = "hh-popup-title";

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className="flex h-12 w-12 items-center justify-center text-ink hover:text-ocean focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ocean-deep"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  );
}

/** Centered monthly-brief modal. The card is always opaque; only the page behind the backdrop is dimmed. */
export default function EmailPopup({ desktop, onClose }: { desktop: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const [village] = useState(() => pageVillage());
  const title = village ? `The monthly ${village} brief` : "The monthly East End brief";

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
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
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, [desktop, onClose]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-5 py-6 sm:px-8 sm:py-10">
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0" style={{ backgroundColor: "rgba(12, 24, 29, 0.62)" }} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        className="relative z-10 flex max-h-full w-full max-w-[440px] flex-col overflow-hidden border border-line shadow-[0_28px_80px_rgba(12,24,29,0.38)] sm:max-w-[460px]"
        style={{ backgroundColor: "#f4f0e8", opacity: 1 }}
      >
        <div className="flex shrink-0 justify-end pr-1.5 pt-1.5 sm:pr-2 sm:pt-2">
          <CloseButton onClick={onClose} />
        </div>
        <div className="overflow-y-auto overscroll-contain px-6 pb-8 sm:px-10 sm:pb-10">
          <p className="eyebrow text-ocean">Barry McGovern · Research</p>
          <h2 id={TITLE_ID} className="mt-3 font-serif text-[1.85rem] font-light leading-[1.08] text-ink sm:mt-4 sm:text-[2.1rem]">
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
    </div>,
    document.body
  );
}
