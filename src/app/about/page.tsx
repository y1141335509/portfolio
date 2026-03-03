import type { Metadata } from 'next'
import About from '@/components/About'
import Education from '@/components/Education'
import Certifications from '@/components/Certifications'
import LichtenbergAnimation from '@/components/animations/LichtenbergAnimation'

export const metadata: Metadata = {
  title: 'About | Yinghai Yu',
  description:
    'Data engineer with 6+ years of experience, 3 degrees (Georgia Tech M.S. CS, Penn State M.S. CEE, Shandong B.S.), and a cross-disciplinary background spanning supply chain, e-commerce, and government contracting.',
}

export default function AboutPage() {
  return (
    <>
      <LichtenbergAnimation originX={0.28} originY={0.50} />
      <main className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 min-h-[calc(100vh-160px)]">
        <About />
        <Education />
        <Certifications />
      </main>
    </>
  )
}
