"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, type ComponentType } from "react";
import { RETIRED_KEYS, popupShownThisSession, popupSubscribed } from "@/lib/lead-keys";

const NEVER_ON = ["/contact"];

/**
 * Opens the market-report popup on whichever page the visitor lands, except /contact.
 * Once it has been shown, sessionStorage keeps it off other pages in that session.
 * A successful popup submit sets a localStorage flag so it stays hidden on later visits.
 * The hamlet seller slide-in is separate: it still uses the lead-session key and waits for this dialog to close.
 */
export default function PopupLoader() {
  const pathname = usePathname();
  const [Popup, setPopup] = useState<ComponentType<{ desktop: boolean; onClose: () => void }> | null>(null);
  const [view, setView] = useState<string | null>(null);
  const [desktop, setDesktop] = useState(false);
  const close = useCallback(() => setView(null), []);

  useEffect(() => {
    try {
      RETIRED_KEYS.forEach((k) => localStorage.removeItem(k));
    } catch {}
  }, []);

  useEffect(() => {
    if (NEVER_ON.includes(pathname)) return;
    if (popupSubscribed() || popupShownThisSession()) return;
    let cancelled = false;
    const isDesktop = window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;

    const open = async () => {
      if (cancelled || popupSubscribed() || popupShownThisSession() || NEVER_ON.includes(window.location.pathname)) return;
      if (document.querySelector("[role=dialog], #hh-slide-title")) return; // one overlay per page view
      if (document.activeElement && document.activeElement.closest("form")) return; // never interrupt someone typing
      const mod = await import("@/components/EmailPopup");
      if (cancelled || popupSubscribed() || popupShownThisSession() || NEVER_ON.includes(window.location.pathname)) return;
      setDesktop(isDesktop);
      setPopup(() => mod.default);
      setView(pathname);
    };

    void open();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  if (!Popup || view !== pathname) return null;
  return <Popup key={view} desktop={desktop} onClose={close} />;
}
