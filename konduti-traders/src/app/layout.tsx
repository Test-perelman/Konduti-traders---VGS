import type { Metadata } from 'next'
import { Cormorant_Garamond, DM_Sans } from 'next/font/google'
import '../styles/globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Konduti Traders — B2B Fresh Produce Procurement India',
    template: '%s | Konduti Traders',
  },
  description:
    'Konduti Traders is India\'s trusted B2B fresh fruits and vegetables sourcing partner. Direct farm procurement, quality grading, cold chain logistics, and pan-India supply.',
  keywords: [
    'fresh produce supplier india',
    'b2b fruits vegetables',
    'farm to business india',
    'wholesale fresh produce',
    'horeca produce supplier',
    'supermarket fresh supply chain',
    'cold chain logistics india',
    'konduti traders',
  ],
  authors: [{ name: 'Konduti Traders' }],
  creator: 'Konduti Traders',
  publisher: 'Konduti Traders',
  metadataBase: new URL('https://kondutitraders.in'),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://kondutitraders.in',
    siteName: 'Konduti Traders',
    title: 'Konduti Traders — B2B Fresh Produce Procurement India',
    description:
      'India\'s trusted B2B partner for fresh fruits & vegetables. Direct sourcing, quality grading, pan-India delivery.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Konduti Traders — Farm to Business Fresh Produce',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Konduti Traders — B2B Fresh Produce India',
    description: 'Direct farm sourcing. Quality control. Reliable delivery.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${dmSans.variable}`}>
      <head>
        <link rel="preload" href="/scroll_animation_frames/ezgif-frame-001.jpg" as="image" />
        <link rel="dns-prefetch" href="//images.unsplash.com" />
      </head>
      <body className="bg-mint font-body antialiased">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
