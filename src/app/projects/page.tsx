import type { Metadata } from 'next'
import Projects from '@/components/Projects'
import RiemannZetaAnimation from '@/components/animations/RiemannZetaAnimation'

export const metadata: Metadata = { title: 'Projects | Yinghai Yu' }

export default function ProjectsPage() {
  return (
    <>
      <RiemannZetaAnimation />
      <main className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 min-h-[calc(100vh-160px)]">
        <Projects />
      </main>
    </>
  )
}
