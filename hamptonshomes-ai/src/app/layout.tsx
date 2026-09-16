import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { siteGraphJsonLd } from "@/lib/schema";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-cormorant",
});

const HOME_TITLE = "Barry McGovern | Oceanfront & Waterfront Specialist | Hamptons Luxury Real Estate";
const HOME_DESCRIPTION =
  "Barry McGovern is a Licensed Real Estate Salesperson and oceanfront and waterfront specialist at Hedgerow Exclusive Properties, a boutique ultra-luxury Hamptons brokerage. Public firm materials describe nearly $2 billion in Hamptons transactions.";

export const metadata: Metadata = {
  metadataBase: new URL("https://hamptonshomes.ai"),
  title: {
    default: HOME_TITLE,
    template: "%s | Barry McGovern",
  },
  description: HOME_DESCRIPTION,
  authors: [{ name: "Barry McGovern" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hamptonshomes.ai/",
    siteName: "Barry McGovern | Hamptons Real Estate",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [
      {
        url: "/images/og-share.jpg",
        width: 1200,
        height: 630,
        alt: "Barry McGovern and Hamptons oceanfront, Hedgerow Exclusive Properties",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: ["/images/og-share.jpg"],
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
        <JsonLd data={siteGraphJsonLd()} />
      </head>
      <body className="font-sans antialiased bg-paper text-ink">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
