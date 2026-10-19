"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState, type ComponentType } from "react";
import { RETIRED_KEYS, popupShownThisSession, popupSubscribed } from "@/lib/lead-keys";

const NEVER_ON = ["/contact"];
const DELAY_MS = 10_000;
const SCROLL_RATIO = 0.5;

function desktopWidth() {
  return window.matchMedia("(min-width: 768px)").matches;
}

/**
 * Opens the market-report popup on whichever page the visitor lands, except /contact.
 * It appears after about 10 seconds or at 50% page scroll, whichever comes first.
 * On desktop, the mouse leaving the top of the viewport opens it as well.
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
    let opened = false;
    let timer = 0;

    function disarm() {
      window.clearTimeout(timer);
      window.removeEventListener("scroll", onScroll);
      document.documentElement.removeEventListener("mouseout", onLeave);
    }

    async function open() {
      if (cancelled || opened) return;
      if (popupSubscribed() || popupShownThisSession() || NEVER_ON.includes(window.location.pathname)) {
        disarm();
        return;
      }
      if (document.querySelector("[role=dialog], #hh-slide-title")) return;
      if (document.activeElement && document.activeElement.closest("form")) return;
      opened = true;
      disarm();
      const mod = await import("@/components/EmailPopup");
      if (cancelled || popupSubscribed() || popupShownThisSession() || NEVER_ON.includes(window.location.pathname)) return;
      setDesktop(desktopWidth());
      setPopup(() => mod.default);
      setView(pathname);
    }

    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0 && window.scrollY / max >= SCROLL_RATIO) void open();
    }

    function onLeave(e: MouseEvent) {
      if (!desktopWidth()) return;
      if (!e.relatedTarget && e.clientY <= 0) void open();
    }

    timer = window.setTimeout(() => {
      void open();
    }, DELAY_MS);
    window.addEventListener("scroll", onScroll, { passive: true });
    document.documentElement.addEventListener("mouseout", onLeave);
    onScroll();

    return () => {
      cancelled = true;
      disarm();
    };
  }, [pathname]);

  if (!Popup || view !== pathname) return null;
  return <Popup key={view} desktop={desktop} onClose={close} />;
}
