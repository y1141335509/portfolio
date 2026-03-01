'use client'

import { motion } from 'framer-motion'

const skills = [
  'Python',
  'PySpark',
  'SQL',
  'Apache Kafka',
  'Airflow',
  'dbt',
  'Databricks',
  'AWS / Azure',
  'TensorFlow',
  'LangChain',
  'Docker / Kubernetes',
  'Spark Structured Streaming',
]

export default function About() {
  return (
    <section id="about" className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Section header */}
        <h2 className="flex items-center text-slate-white text-2xl font-semibold mb-12">
          <span className="font-mono text-accent text-xl mr-3">01.</span>
          About Me
          <span className="flex-1 h-px bg-navy-lighter ml-5" />
        </h2>

        <div className="grid md:grid-cols-5 gap-10 lg:gap-16">
          {/* Text content */}
          <div className="md:col-span-3 space-y-4 text-slate leading-relaxed">
            <p>
              I&apos;m a data engineer with 5+ years of experience building production-grade data
              infrastructure — from batch ETL pipelines to trillion-row real-time streams. I specialize
              in turning messy, high-volume data into reliable systems that produce measurable business
              outcomes.
            </p>
            <p>
              My background spans multiple industries: agriculture supply chain at{' '}
              <span className="text-slate-lighter">GrubMarket</span>, e-commerce at{' '}
              <span className="text-slate-lighter">Bubbles and Books</span>, and government contracting
              at <span className="text-slate-lighter">Weris Inc.</span> — which has meant adapting to
              very different data environments, constraints, and stakeholder expectations. I hold an M.S.
              in Computer Science from Georgia Tech and an M.S. in Engineering from Penn State.
            </p>
            <p>
              Outside of work: I&apos;ve spent years analyzing resource optimization and decision-making
              under pressure through Red Alert 2 strategy — it turns out closed systems with clear rules
              are a good place to think clearly. I follow historical causality with a particular interest
              in why things went the non-obvious way. And I run a personal quantitative trading system,
              mostly to stay honest about how automated systems actually behave at the edges.
            </p>

            {/* Skills grid */}
            <div className="pt-3">
              <p className="text-slate-lighter text-sm mb-4">Technologies I work with:</p>
              <ul className="grid grid-cols-2 gap-y-2 gap-x-4">
                {skills.map((skill) => (
                  <li key={skill} className="flex items-center gap-2 text-sm">
                    <span className="text-accent text-xs flex-shrink-0">▹</span>
                    <span className="text-slate">{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Decorative side element */}
          <div className="hidden md:flex md:col-span-2 items-start justify-center mt-2">
            <div className="relative w-56 h-56 lg:w-64 lg:h-64">
              {/* Offset border */}
              <div className="absolute inset-0 border-2 border-accent rounded translate-x-4 translate-y-4 opacity-40" />
              {/* Card */}
              <div className="relative w-full h-full bg-navy-light rounded border border-navy-lighter flex flex-col items-center justify-center gap-3">
                <span className="font-mono text-accent text-5xl font-bold opacity-20 select-none">YY</span>
                <div className="flex flex-col items-center gap-1 text-center px-4">
                  <span className="font-mono text-accent text-xs opacity-60">data engineer</span>
                  <span className="font-mono text-slate text-xs opacity-40">san mateo, ca</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
