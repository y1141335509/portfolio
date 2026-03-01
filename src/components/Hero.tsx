'use client'

import { motion } from 'framer-motion'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
})

export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center pt-20 pb-16">
      <motion.p
        {...fadeUp(0.3)}
        className="font-mono text-accent text-base mb-5"
      >
        Hi, my name is
      </motion.p>

      <motion.h1
        {...fadeUp(0.4)}
        className="text-5xl sm:text-6xl md:text-7xl font-bold text-slate-white mb-4 leading-tight tracking-tight"
      >
        Yinghai Yu.
      </motion.h1>

      <motion.h2
        {...fadeUp(0.5)}
        className="text-4xl sm:text-5xl md:text-6xl font-bold text-slate mb-8 leading-tight tracking-tight"
      >
        I build data systems at scale.
      </motion.h2>

      <motion.p
        {...fadeUp(0.6)}
        className="max-w-lg text-slate text-lg mb-12 leading-relaxed"
      >
        I&apos;m a data engineer specializing in scalable pipelines, real-time streaming, and
        ML-powered data systems. Currently building data infrastructure at{' '}
        <a
          href="#experience"
          className="text-accent hover:underline underline-offset-4 transition-colors"
        >
          Bubbles and Books
        </a>{' '}
        in San Mateo, CA.
      </motion.p>

      <motion.div {...fadeUp(0.7)} className="flex items-center gap-4 flex-wrap">
        <a
          href="#contact"
          className="inline-flex items-center border border-accent text-accent font-mono text-sm px-7 py-4 rounded hover:bg-accent/10 transition-colors duration-200"
        >
          Get In Touch
        </a>
        <a
          href="#projects"
          className="inline-flex items-center text-slate-lighter font-mono text-sm px-4 py-4 hover:text-accent transition-colors duration-200"
        >
          See My Work
          <svg className="ml-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </motion.div>
    </section>
  )
}
