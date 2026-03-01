import Hero from '@/components/Hero'
import BackgroundAnimation from '@/components/BackgroundAnimation'

export default function Home() {
  return (
    <>
      <BackgroundAnimation />
      <main className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24">
        <Hero />
      </main>
    </>
  )
}
