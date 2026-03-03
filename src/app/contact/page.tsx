import type { Metadata } from 'next'
import Contact from '@/components/Contact'
import EulerIdentityAnimation from '@/components/animations/EulerIdentityAnimation'

export const metadata: Metadata = {
  title: 'Contact | Yinghai Yu',
  description:
    'Get in touch with Yinghai Yu — open to data engineering, analytics engineering, and MLOps opportunities in the Bay Area.',
}

export default function ContactPage() {
  return (
    <>
      <EulerIdentityAnimation />
      <main className="flex items-center justify-center min-h-[calc(100vh-160px)]">
        <Contact />
      </main>
    </>
  )
}
