import type { Metadata } from 'next'
import JourneyMap from '@/components/JourneyMap'
import EulerCircleAnimation from '@/components/animations/EulerCircleAnimation'

export const metadata: Metadata = {
  title: 'Journey | Yinghai Yu',
  description:
    'A visual timeline of Yinghai Yu\'s career journey — from Shandong to Penn State, Tencent, Virginia, San Francisco, and beyond. 10+ years of education, research, and engineering across three countries.',
}

export default function TimelinePage() {
  return (
    <>
      <EulerCircleAnimation />
      <main className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 min-h-[calc(100vh-160px)]">
        <JourneyMap />
      </main>
    </>
  )
}
