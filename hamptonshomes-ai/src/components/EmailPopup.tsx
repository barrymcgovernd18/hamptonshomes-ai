"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import LeadForm from "@/components/LeadForm";
import { markPopupShown } from "@/lib/lead-keys";
import { pageVillage } from "@/lib/intent";

const TITLE_ID = "hh-popup-title";
const PHOTO = "/images/heroes/950-meadow-lane-southampton.jpg";

function CloseButton({ onClick, large = false }: { onClick: () => void; large?: boolean }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Close"
      className="absolute right-1 top-1 z-10 flex h-11 w-11 items-center justify-center bg-transparent text-ink/80 outline-none hover:text-ink focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ink"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className={large ? "h-5 w-5" : "h-3.5 w-3.5"} fill="none" stroke="currentColor" strokeWidth={large ? 1.4 : 1.15}>
        <path d="M6 6l12 12M18 6L6 18" />
      </svg>
    </button>
  );
}

/** Desktop: the centered editorial card. Mobile: a small bottom banner that leaves the page scrollable. */
export default function EmailPopup({ desktop, onClose }: { desktop: boolean; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const [village] = useState(() => pageVillage());
  const title = village ? `${village} Luxury Market, Monthly` : "Hamptons Luxury Market, Monthly";

  useEffect(() => {
    markPopupShown();
    const previous = document.activeElement as HTMLElement | null;
    if (desktop) panel.current?.querySelector<HTMLElement>("input[type=email]")?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!desktop || e.key !== "Tab" || !panel.current) return;
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
    };
    document.addEventListener("keydown", onKey);
    const overflow = document.body.style.overflow;
    if (desktop) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      if (desktop) document.body.style.overflow = overflow;
      if (desktop) previous?.focus?.();
    };
  }, [desktop, onClose]);

  if (typeof document === "undefined") return null;

  if (!desktop) {
    return createPortal(
      <div
        ref={panel}
        role="dialog"
        aria-modal="false"
        aria-labelledby={TITLE_ID}
        className="hh-popup-banner fixed inset-x-0 bottom-0 z-[80] max-h-[50svh] overflow-y-auto border-t border-ink/15 bg-[#f4f0e8] px-5 pb-[calc(env(safe-area-inset-bottom)+16px)] pt-3.5 shadow-[0_-16px_40px_rgba(12,24,29,0.18)]"
        style={{ backgroundColor: "#f4f0e8", animation: "hh-popup-banner-in 180ms cubic-bezier(0.22, 0.61, 0.21, 1)" }}
      >
        <style>{`@keyframes hh-popup-banner-in{from{transform:translateY(100%)}to{transform:none}}@media (prefers-reduced-motion:reduce){.hh-popup-banner{animation:none!important}}`}</style>
        <CloseButton onClick={onClose} large />
        <h2 id={TITLE_ID} className="pr-12 font-serif text-[1.35rem] font-light leading-[1.15] text-ink">
          {title}
        </h2>
        <LeadForm kind="popup" banner />
      </div>,
      document.body
    );
  }

  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center px-5 py-6 sm:px-8 sm:py-10">
      <style>{`@keyframes hh-popup-rise{from{transform:translateY(8px)}to{transform:none}}@media (prefers-reduced-motion:reduce){.hh-popup-card{animation:none!important}}`}</style>
      <div aria-hidden="true" onClick={onClose} className="absolute inset-0" style={{ backgroundColor: "rgba(12, 24, 29, 0.62)" }} />
      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby={TITLE_ID}
        tabIndex={-1}
        className="hh-popup-card relative z-10 grid grid-cols-2 overflow-hidden border border-ink/15 bg-[#f4f0e8] shadow-[0_28px_80px_rgba(12,24,29,0.38)] outline-none focus:outline-none focus-visible:outline-none"
        style={{
          opacity: 1,
          backgroundColor: "#f4f0e8",
          outline: "none",
          animation: "hh-popup-rise 180ms cubic-bezier(0.22, 0.61, 0.21, 1)",
          width: "min(680px, calc(100vw - 4rem), calc(100svh - 4.5rem))",
          height: "min(680px, calc(100vw - 4rem), calc(100svh - 4.5rem))",
        }}
      >
        <CloseButton onClick={onClose} />
        <div className="relative h-full min-h-0 border-r border-ink/10">
          <Image
            src={PHOTO}
            alt="Aerial view of oceanfront estates on Meadow Lane, Southampton"
            fill
            sizes="340px"
            className="object-cover object-[50%_45%]"
          />
        </div>
        <div className="relative flex h-full min-h-0 flex-col justify-center overflow-y-auto px-10 py-12">
          <h2 id={TITLE_ID} className="pr-6 font-serif text-[2.35rem] font-light leading-[1.05] text-ink">
            {title}
          </h2>
          <span aria-hidden="true" className="mt-5 block h-px w-8 bg-ink/70" />
          <p className="mt-4 font-serif text-[1.05rem] font-light italic leading-[1.35] text-ink-muted">
            Southampton to Montauk,
            <br />
            Sag Harbor &amp; Shelter Island
          </p>
          <LeadForm kind="popup" editorial />
        </div>
      </div>
    </div>,
    document.body
  );
}
