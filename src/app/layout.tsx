import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import { Analytics } from '@vercel/analytics/react'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yinghai Yu | Data Engineer',
  description:
    'Data engineer with 5+ years building scalable data infrastructure, real-time streaming pipelines, and ML-powered data systems. Previously at GrubMarket and Weris Inc.',
  keywords: ['data engineer', 'data pipeline', 'machine learning', 'PySpark', 'Databricks', 'Kafka', 'Airflow', 'dbt'],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Yinghai Yu | Data Engineer',
    description:
      'Data engineer with 5+ years building scalable data infrastructure, real-time streaming pipelines, and ML-powered data systems.',
    url: 'https://yinghai-yu.vercel.app',
    siteName: 'Yinghai Yu',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Yinghai Yu | Data Engineer',
    description:
      'Data engineer with 5+ years building scalable data infrastructure, real-time streaming pipelines, and ML-powered data systems.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-navy bg-grid text-slate antialiased`}>
        <Navigation />
        <div className="relative" style={{ zIndex: 1 }}>
          {children}
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
