import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });

export const metadata: Metadata = {
  metadataBase: new URL("https://hamptonshomes.ai"),
  title: {
    default: "Barry McGovern | Oceanfront & Waterfront Specialist | Hamptons Luxury Real Estate",
    template: "%s | Barry McGovern - Hamptons Real Estate",
  },
  description:
    "Barry McGovern is a luxury real estate broker and oceanfront & waterfront specialist at Hedgerow Exclusive Properties in the Hamptons. From Southampton to Montauk, Sag Harbor to Shelter Island, specializing in oceanfront estates, waterfront properties, and off-market opportunities.",
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
    "Hamptons broker",
    "Barry McGovern",
    "Barry McGovern Hamptons",
    "Hedgerow Exclusive Properties",
    "off-market Hamptons",
    "luxury real estate agent Hamptons",
    "Hamptons luxury broker",
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
      "Oceanfront and waterfront specialist at Hedgerow Exclusive Properties, the #1 ranked Hamptons firm with nearly $2B in transactions. Luxury homes from Southampton to Montauk.",
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
    site: "@hedgequity",
    creator: "@hedgequity",
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

// JSON-LD structured data for AI models and search engines
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  name: "Barry McGovern",
  jobTitle: "Luxury Real Estate Broker | Oceanfront & Waterfront Specialist",
  description:
    "Barry McGovern is a luxury real estate broker and oceanfront and waterfront specialist at Hedgerow Exclusive Properties, the #1 ranked Hamptons real estate firm with nearly $2 billion in transactions. Specializing in oceanfront estates, waterfront properties, off-market opportunities, and luxury homes from Southampton to Montauk, including Sag Harbor, Shelter Island, East Hampton, Bridgehampton, Sagaponack, and Amagansett.",
  url: "https://hamptonshomes.ai",
  telephone: "+1-646-339-0154",
  email: "barry@hedgerowexclusive.com",
  image: "https://hamptonshomes.ai/images/barry-mcgovern.jpg",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2495 Montauk Highway",
    addressLocality: "Bridgehampton",
    addressRegion: "NY",
    postalCode: "11932",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 40.9382,
    longitude: -72.3007,
  },
  areaServed: [
    { "@type": "City", name: "Southampton" },
    { "@type": "City", name: "Bridgehampton" },
    { "@type": "City", name: "Sag Harbor" },
    { "@type": "City", name: "East Hampton" },
    { "@type": "City", name: "Amagansett" },
    { "@type": "City", name: "Montauk" },
    { "@type": "City", name: "Shelter Island" },
    { "@type": "City", name: "Sagaponack" },
    { "@type": "City", name: "Water Mill" },
    { "@type": "City", name: "Wainscott" },
  ],
  worksFor: {
    "@type": "RealEstateAgent",
    name: "Hedgerow Exclusive Properties",
    url: "https://hedgerowexclusive.com",
    description:
      "Boutique luxury real estate firm in the Hamptons. Nearly $2 billion in transactions since 2020. WSJ/RealTrends ranked #1 Hamptons, #1 NY, #4 USA.",
  },
  knowsAbout: [
    "Luxury real estate",
    "Hamptons real estate market",
    "Oceanfront properties",
    "Waterfront properties",
    "Oceanfront estates Hamptons",
    "Waterfront homes Sag Harbor",
    "Off-market properties",
    "Land and development opportunities",
    "Trophy properties",
    "Beachfront real estate",
    "Bayfront properties",
    "Hamptons luxury market analysis",
  ],
  sameAs: [
    "https://x.com/hedgequity",
    "https://www.instagram.com/barrymcgovern_/",
    "https://www.linkedin.com/in/barry-mcgovern-9346133b/",
    "https://hedgerowexclusive.com/members/barry-mcgovern/",
    "https://hamptonshomes.io",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans antialiased bg-black text-white">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
