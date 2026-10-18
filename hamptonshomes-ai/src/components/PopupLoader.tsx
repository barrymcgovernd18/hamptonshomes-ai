"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, type ComponentType } from "react";
import { RETIRED_KEYS, leadThisSession } from "@/lib/lead-keys";

const NEVER_ON = ["/contact"];

/**
 * Every page view: opens the monthly brief as soon as the page is ready.
 * Dismissed popups stay closed for that page view only. Skipped for the rest of the session once any form is sent.
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
    let cancelled = false;
    const isDesktop = window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;

    const open = async () => {
      if (cancelled || leadThisSession() || NEVER_ON.includes(window.location.pathname)) return;
      if (document.querySelector("[role=dialog], #hh-slide-title")) return; // one overlay per page view
      if (document.activeElement && document.activeElement.closest("form")) return; // never interrupt someone typing
      const mod = await import("@/components/EmailPopup");
      if (cancelled || leadThisSession() || NEVER_ON.includes(window.location.pathname)) return;
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
