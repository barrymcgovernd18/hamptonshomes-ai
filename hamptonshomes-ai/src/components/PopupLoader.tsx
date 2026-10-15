"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ComponentType } from "react";
import { RETIRED_KEYS, leadThisSession } from "@/lib/lead-keys";

const DELAY_MS = 15_000;
const NEVER_ON = ["/contact"];

/**
 * Every page view: waits for the browser to go idle, then arms a 15 second timer (and, on desktop, exit intent).
 * Dismissed popups stay closed for that page view only. Skipped for the rest of the session once any form is sent.
 */
export default function PopupLoader() {
  const pathname = usePathname();
  const [Popup, setPopup] = useState<ComponentType<{ desktop: boolean; onClose: () => void }> | null>(null);
  const [view, setView] = useState<string | null>(null);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    try {
      RETIRED_KEYS.forEach((k) => localStorage.removeItem(k));
    } catch {}
  }, []);

  useEffect(() => {
    if (NEVER_ON.includes(pathname)) return;
    let timer: number | undefined;
    let idle: number | undefined;
    let fired = false;
    const isDesktop = window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;

    const open = async () => {
      if (fired || leadThisSession() || NEVER_ON.includes(window.location.pathname)) return;
      if (document.querySelector("[role=dialog], #hh-slide-title")) return; // one overlay per page view
      if (document.activeElement && document.activeElement.closest("form")) return; // never interrupt someone typing
      fired = true;
      cleanup();
      const mod = await import("@/components/EmailPopup");
      setDesktop(isDesktop);
      setPopup(() => mod.default);
      setView(pathname);
    };
    const onLeave = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) void open();
    };
    const arm = () => {
      if (leadThisSession()) return;
      timer = window.setTimeout(open, DELAY_MS);
      if (isDesktop) document.documentElement.addEventListener("mouseout", onLeave);
    };
    function cleanup() {
      if (timer) window.clearTimeout(timer);
      if (idle && typeof window.cancelIdleCallback === "function") window.cancelIdleCallback(idle);
      document.documentElement.removeEventListener("mouseout", onLeave);
    }
    if (typeof window.requestIdleCallback === "function") idle = window.requestIdleCallback(arm, { timeout: 4000 });
    else timer = setTimeout(arm, 2500) as unknown as number;
    return cleanup;
  }, [pathname]);

  if (!Popup || view !== pathname) return null;
  return <Popup key={view} desktop={desktop} onClose={() => setView(null)} />;
}
