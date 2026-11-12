import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import RevealObserver from "@/components/RevealObserver";
import IntentLayer from "@/components/IntentLayer";
import PopupLoader from "@/components/PopupLoader";
import { siteGraphJsonLd } from "@/lib/schema";
import { Analytics as VercelAnalytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Analytics from "@/components/Analytics";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

const HOME_TITLE = "Barry McGovern | Hamptons Oceanfront and Waterfront Homes";
const HOME_DESCRIPTION =
  "Barry McGovern, Licensed Real Estate Salesperson, Hedgerow Exclusive Properties. Hamptons oceanfront, waterfront and estate homes, Southampton to Montauk.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hamptonshomes.ai"),
  verification: { google: "pf35TItfwnpq-tXzRIQ6rgxRi8G1GCzIIEDJAIZnorc" },
  title: {
    default: HOME_TITLE,
    template: "%s | Barry McGovern",
  },
  description: HOME_DESCRIPTION,
  authors: [{ name: "Barry McGovern" }],
  formatDetection: {
    address: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hamptonshomes.ai/",
    siteName: "Barry McGovern | Hamptons Real Estate",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: "/og/home.jpg",
        width: 1200,
        height: 630,
        alt: "Barry McGovern, Hamptons real estate, Hedgerow Exclusive Properties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/og/home.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://hamptonshomes.ai/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(w,d,s,u){if(w.oaiq)return;var q=function(){q.q.push(arguments)};q.q=[];w.oaiq=q;var j=d.createElement(s);j.async=1;j.src=u;var f=d.getElementsByTagName(s)[0];f.parentNode.insertBefore(j,f)}(window,document,"script","https://bzrcdn.openai.com/sdk/oaiq.min.js");oaiq("init",{pixelId:"HX5sm92uBs2FTtLpAmjwNy",debug:false});`,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){if(window.__oaiqLeadClick)return;window.__oaiqLeadClick=1;document.addEventListener("click",function(e){var el=e.target;if(el&&el.nodeType===3)el=el.parentElement;if(!el||typeof el.closest!=="function")return;var a=el.closest("a[href^='tel:'], a[href^='mailto:']");if(!a)return;if(typeof window.oaiq==="function")window.oaiq("measure","lead_created",{type:"customer_action"});});})();`,
          }}
        />
        <JsonLd data={siteGraphJsonLd()} />
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-sans antialiased bg-paper text-ink">
        <a href="#main" className="skip-link">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <RevealObserver />
        <PopupLoader />
        <IntentLayer />
        <Analytics />
        <VercelAnalytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
