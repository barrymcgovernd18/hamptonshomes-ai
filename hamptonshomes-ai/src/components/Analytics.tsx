"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useRef } from "react";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;

type Fn = (...args: unknown[]) => void;

/** Sends a PageView / page_view on client-side route changes (the first load is sent by the init snippets). */
function RouteTracker() {
  const pathname = usePathname();
  const search = useSearchParams();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const w = window as unknown as { fbq?: Fn; gtag?: Fn };
    const qs = search?.toString();
    const path = qs ? `${pathname}?${qs}` : pathname;
    try { w.fbq?.("track", "PageView"); } catch {}
    try {
      if (GA4_ID) w.gtag?.("event", "page_view", { page_path: path, page_location: window.location.href, page_title: document.title });
    } catch {}
  }, [pathname, search]);
  return null;
}

/** Meta Pixel and GA4, each loaded only when its env var is set. Renders nothing otherwise. */
export default function Analytics() {
  if (!PIXEL_ID && !GA4_ID) return null;
  return (
    <>
      {PIXEL_ID && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init',${JSON.stringify(PIXEL_ID)});fbq('track','PageView');`}
        </Script>
      )}
      {GA4_ID && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`} strategy="afterInteractive" />
          <Script id="ga4" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config',${JSON.stringify(GA4_ID)});`}
          </Script>
        </>
      )}
      <Suspense fallback={null}>
        <RouteTracker />
      </Suspense>
    </>
  );
}
