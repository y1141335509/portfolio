import type { Metadata } from 'next'
import Experience from '@/components/Experience'
import EulerCircleAnimation from '@/components/animations/EulerCircleAnimation'

export const metadata: Metadata = { title: 'Experience | Yinghai Yu' }

export default function ExperiencePage() {
  return (
    <>
      <EulerCircleAnimation />
      <main className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 min-h-[calc(100vh-160px)]">
        <Experience />
      </main>
    </>
  )
}
