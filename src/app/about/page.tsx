import type { Metadata } from 'next'
import About from '@/components/About'
import LichtenbergAnimation from '@/components/animations/LichtenbergAnimation'

export const metadata: Metadata = { title: 'About | Yinghai Yu' }

export default function AboutPage() {
  return (
    <>
      <LichtenbergAnimation />
      <main className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 min-h-[calc(100vh-160px)]">
        <About />
      </main>
    </>
  )
}
