import type { Metadata } from 'next'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  metadataBase: new URL('https://hamptonscoastal.com'),
  title: {
    default: 'Hamptons Coastal | Luxury Real Estate Intelligence',
    template: '%s | Hamptons Coastal',
  },
  description: 'Luxury real estate news and market intelligence across the Hamptons, Palm Beach, Miami, and Aspen.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://hamptonscoastal.com',
    siteName: 'Hamptons Coastal',
    title: 'Hamptons Coastal | Luxury Real Estate Intelligence',
    description: 'Luxury real estate news and market intelligence across the Hamptons, Palm Beach, Miami, and Aspen.',
    images: [{
      url: 'https://tfzkenrmzoxrkdntkada.supabase.co/storage/v1/object/public/listing-images/articles/og-hamptons-coastal.jpg',
      width: 1200,
      height: 630,
    }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@hamptonscoastal',
    images: ['https://tfzkenrmzoxrkdntkada.supabase.co/storage/v1/object/public/listing-images/articles/og-hamptons-coastal.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
