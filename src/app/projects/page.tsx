import type { Metadata } from 'next'
import Projects from '@/components/Projects'
import EulerCircleAnimation from '@/components/animations/EulerCircleAnimation'

export const metadata: Metadata = {
  title: 'Projects | Yinghai Yu',
  description:
    'Production data engineering projects including a $2M+ financial anomaly detection system, trillion-row PySpark streaming pipeline, RAG customer service chatbot, and LLM-powered product description generator.',
}

export default function ProjectsPage() {
  return (
    <>
      <EulerCircleAnimation />
      <main className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 min-h-[calc(100vh-160px)]">
        <Projects />
      </main>
    </>
  )
}
