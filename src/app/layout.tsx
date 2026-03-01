import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Yinghai Yu | Data Engineer',
  description:
    'Data engineer specializing in scalable data infrastructure, real-time streaming pipelines, and ML-powered data systems.',
  keywords: ['data engineer', 'data pipeline', 'machine learning', 'PySpark', 'Databricks', 'Kafka'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans bg-navy bg-grid text-slate antialiased`}>
        {children}
      </body>
    </html>
  )
}
