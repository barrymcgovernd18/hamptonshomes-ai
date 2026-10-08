"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, type ComponentType } from "react";
import { LEAD_DONE_KEY, POPUP_QUIET_MS, POPUP_SEEN_KEY } from "@/lib/lead-keys";

const DELAY_MS = 30_000;
const NEVER_ON = ["/contact"];

function recently(key: string) {
  try {
    const t = Number(localStorage.getItem(key));
    return Number.isFinite(t) && t > 0 && Date.now() - t < POPUP_QUIET_MS;
  } catch {
    return true;
  }
}

/**
 * Waits for the browser to go idle, then arms a 30 second timer (and, on desktop, exit intent).
 * Only when one fires is the popup code itself downloaded. Shown once per visitor, quiet for 30 days after.
 */
export default function PopupLoader() {
  const pathname = usePathname();
  const [Popup, setPopup] = useState<ComponentType<{ desktop: boolean; onClose: () => void }> | null>(null);
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    if (Popup || NEVER_ON.includes(pathname)) return;
    let timer: number | undefined;
    let idle: number | undefined;
    let fired = false;
    const isDesktop = window.matchMedia("(min-width: 768px) and (pointer: fine)").matches;

    const open = async () => {
      if (fired || recently(POPUP_SEEN_KEY) || recently(LEAD_DONE_KEY) || NEVER_ON.includes(window.location.pathname)) return;
      if (document.activeElement && document.activeElement.closest("form")) return; // never interrupt someone typing
      fired = true;
      cleanup();
      try {
        localStorage.setItem(POPUP_SEEN_KEY, String(Date.now()));
      } catch {}
      const mod = await import("@/components/EmailPopup");
      setDesktop(isDesktop);
      setPopup(() => mod.default);
    };
    const onLeave = (e: MouseEvent) => {
      if (!e.relatedTarget && e.clientY <= 0) void open();
    };
    const arm = () => {
      if (recently(POPUP_SEEN_KEY) || recently(LEAD_DONE_KEY)) return;
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
  }, [pathname, Popup]);

  if (!Popup) return null;
  return <Popup desktop={desktop} onClose={() => setPopup(null)} />;
}
