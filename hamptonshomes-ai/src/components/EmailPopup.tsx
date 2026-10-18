"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import { markPopupShown } from "@/lib/lead-keys";
import { pageVillage } from "@/lib/intent";

const TITLE_ID = "hh-popup-title";
const PHOTO = "/images/heroes/950-meadow-lane-southampton.jpg";

function CloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className="absolute right-1 top-1 z-10 flex h-11 w-11 items-center justify-center bg-transparent text-ink/80 hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.15">
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  );
}

/** Editorial market-report modal. The card is opaque immediately; only a short rise animates. */
export default function EmailPopup({ desktop, onClose }: { desktop: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const [village] = useState(() => pageVillage());
  const title = village ? `Monthly ${village} Market Report` : "Monthly Hamptons Market Report";
  const line = village ? `${village}, alongside the East End.` : "From Southampton to Montauk.";

  useEffect(() => {
    markPopupShown();
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
      <style>{`@keyframes hh-popup-rise{from{transform:translateY(8px)}to{transform:none}}@media (prefers-reduced-motion:reduce){.hh-popup-card{animation:none!important}}`}</style>
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0" style={{ backgroundColor: "rgba(12, 24, 29, 0.62)" }} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        className={`hh-popup-card relative z-10 overflow-hidden border border-ink/15 bg-[#f4f0e8] shadow-[0_28px_80px_rgba(12,24,29,0.38)] ${desktop ? "grid grid-cols-2" : "flex w-full max-w-[400px] flex-col"}`}
        style={{
          opacity: 1,
          backgroundColor: "#f4f0e8",
          animation: "hh-popup-rise 180ms cubic-bezier(0.22, 0.61, 0.21, 1)",
          ...(desktop
            ? {
                width: "min(680px, calc(100vw - 4rem), calc(100svh - 4.5rem))",
                height: "min(680px, calc(100vw - 4rem), calc(100svh - 4.5rem))",
              }
            : undefined),
        }}
      >
        <CloseButton onClick={onClose} />
        {desktop ? (
          <div className="relative h-full min-h-0 border-r border-ink/10">
            <Image
              src={PHOTO}
              alt="Aerial view of oceanfront estates on Meadow Lane, Southampton"
              fill
              sizes="340px"
              className="object-cover object-[50%_45%]"
            />
          </div>
        ) : null}
        <div className={`relative min-h-0 ${desktop ? "flex h-full flex-col justify-center overflow-y-auto px-10 py-12" : "overflow-y-auto px-6 pb-7 pt-14"}`}>
          <h2 id={TITLE_ID} className={`font-serif font-light leading-[1.05] text-ink ${desktop ? "pr-6 text-[2.35rem]" : "pr-6 text-[1.85rem]"}`}>
            {title}
          </h2>
          <span aria-hidden="true" className="mt-5 block h-px w-8 bg-ink/70" />
          <p className="mt-4 font-serif text-[1.05rem] font-light italic leading-snug text-ink-muted">{line}</p>
          <LeadForm kind="popup" editorial />
        </div>
      </div>
    </div>,
    document.body
  );
}
