'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

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

        {/* Mobile-only avatar */}
        <div className="flex justify-center mb-10 md:hidden">
          <div className="w-32 h-32 overflow-hidden rounded border border-navy-lighter/40 hover:border-accent/20 transition-colors duration-300">
            <Image
              src="/avatars/handsome-guy.jpeg"
              alt="Yinghai Yu"
              width={128}
              height={128}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        </div>

        <div className="grid md:grid-cols-5 gap-10 lg:gap-16">
          {/* Text content */}
          <div className="md:col-span-3 space-y-4 text-slate leading-relaxed">
            <p>
              I&apos;m a data engineer with 6+ years of experience building production-grade data
              infrastructure — from batch ETL pipelines to trillion-row real-time streams. I specialize
              in turning messy, high-volume data into reliable systems that produce measurable business
              outcomes.
            </p>
            <p>
              My background spans multiple industries: agriculture supply chain at{' '}
              <span className="text-slate-lighter">GrubMarket</span>, e-commerce at{' '}
              <span className="text-slate-lighter">Bubbles and Books</span>, and government contracting
              at <span className="text-slate-lighter">Weris Inc.</span> — which has meant adapting to
              very different data environments, constraints, and stakeholder expectations. I hold three
              degrees: an M.S. in Computer Science from{' '}
              <span className="text-slate-lighter">Georgia Tech</span>, an M.S. in Civil Engineering
              from <span className="text-slate-lighter">Penn State</span>, and a B.S. in Engineering
              from <span className="text-slate-lighter">Shandong University of Technology</span> — a
              cross-disciplinary foundation that shapes how I reason about systems at scale.
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

          {/* Avatar + Stats */}
          <div className="hidden md:block md:col-span-2 mt-1 space-y-4">
            {/* Avatar */}
            <div className="overflow-hidden rounded border border-navy-lighter/40 hover:border-accent/20 transition-colors duration-300">
              <Image
                src="/avatars/handsome-guy.jpeg"
                alt="Yinghai Yu"
                width={400}
                height={400}
                className="w-full object-cover"
                priority
              />
            </div>
            {/* Stats card grid */}
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '6+', label: 'Years Experience' },
                { value: '6', label: 'Roles' },
                { value: '$9M+', label: 'Business Impact' },
                { value: '3', label: 'Degrees' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-navy-light/50 border border-navy-lighter/40 rounded p-4
                    hover:border-accent/20 transition-colors duration-200"
                >
                  <p className="font-mono text-accent text-2xl font-bold leading-none">{stat.value}</p>
                  <p className="text-slate text-xs mt-2 leading-snug">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
