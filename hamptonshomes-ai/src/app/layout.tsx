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

export const metadata: Metadata = {
  metadataBase: new URL("https://hamptonshomes.ai"),
  title: {
    default: "Barry McGovern | Oceanfront & Waterfront Specialist | Hamptons Luxury Real Estate",
    template: "%s | Barry McGovern - Hamptons Real Estate",
  },
  description:
    "Barry McGovern is a Licensed Real Estate Salesperson and oceanfront & waterfront specialist at Hedgerow Exclusive Properties in the Hamptons. From Southampton to Montauk, Sag Harbor to Shelter Island, specializing in oceanfront estates, waterfront properties, and off-market opportunities.",
  keywords: [
    "Hamptons real estate",
    "Hamptons real estate agent",
    "luxury homes Hamptons",
    "Hamptons oceanfront homes",
    "Hamptons waterfront properties",
    "oceanfront real estate Hamptons",
    "waterfront homes Sag Harbor",
    "Sag Harbor real estate",
    "Southampton real estate agent",
    "Southampton oceanfront",
    "Bridgehampton real estate",
    "East Hampton luxury homes",
    "East Hampton oceanfront",
    "Shelter Island real estate",
    "Shelter Island waterfront",
    "Montauk real estate",
    "Montauk oceanfront homes",
    "Amagansett real estate",
    "Sagaponack real estate",
    "Hamptons Licensed Real Estate Salesperson",
    "Barry McGovern",
    "Barry McGovern Hamptons",
    "Hedgerow Exclusive Properties",
    "off-market Hamptons",
    "luxury real estate agent Hamptons",
    "Hamptons luxury salesperson",
    "best Hamptons real estate agent",
    "Hamptons private market",
    "Hamptons estate sales",
    "Lily Pond Lane real estate",
    "Further Lane real estate",
    "Meadow Lane real estate",
  ],
  authors: [{ name: "Barry McGovern" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hamptonshomes.ai",
    siteName: "Barry McGovern | Hamptons Real Estate",
    title: "Barry McGovern | Oceanfront & Waterfront Specialist | Hamptons Luxury Real Estate",
    description:
      "Oceanfront and waterfront specialist at Hedgerow Exclusive Properties, a leading Hamptons firm with nearly $2B in firm transactions. Luxury homes from Southampton to Montauk.",
    images: [
      {
        url: "/images/barry-mcgovern.jpg",
        width: 1200,
        height: 630,
        alt: "Barry McGovern - Hamptons Luxury Real Estate Agent",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barry McGovern | Oceanfront & Waterfront Specialist | Hamptons",
    description:
      "Oceanfront and waterfront specialist at Hedgerow Exclusive Properties. Luxury homes from Southampton to Montauk.",
    images: ["/images/barry-mcgovern.jpg"],
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
    canonical: "https://hamptonshomes.ai",
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
