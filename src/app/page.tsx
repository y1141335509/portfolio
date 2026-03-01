import Hero from '@/components/Hero'
import LichtenbergAnimation from '@/components/animations/LichtenbergAnimation'

export default function Home() {
  return (
    <>
      <LichtenbergAnimation originX={0.72} originY={0.45} />
      <main className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24">
        <Hero />
      </main>
    </>
  )
}
