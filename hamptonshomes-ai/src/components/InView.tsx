"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Mounts its children only once the box is near the viewport, so below-the-fold photographs
 * do not compete with the hero image on first load. The parent sizes the box (aspect ratio),
 * so there is no layout shift. Without JavaScript the children render from <noscript>.
 */
export default function InView({ children, margin = "600px" }: { children: ReactNode; margin?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      const t = setTimeout(() => setShown(true), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: `${margin} 0px` },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);
  return (
    <>
      <span ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0" />
      {shown ? children : <noscript>{children}</noscript>}
    </>
  );
}
