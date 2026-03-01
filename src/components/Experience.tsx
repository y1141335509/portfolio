'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const experiences = [
  {
    company: 'Bubbles and Books',
    role: 'Data Engineer',
    period: 'Oct 2023 – Present',
    location: 'San Mateo, CA',
    bullets: [
      'Designed and executed an end-to-end ETL pipeline migrating all data from Shopify to a custom-built e-commerce platform — zero data loss across the full migration.',
      'Built a Spring Boot + React integration with Oracle NetSuite ERP, improving operational efficiency by 30%.',
      'Developed a LangChain + GPT-4 RAG customer service chatbot that reduced support workload by 40%.',
      'Fine-tuned Llama 2 and deployed it as an AWS SageMaker inference endpoint to auto-generate product descriptions at scale.',
      'Architected a Kubernetes + Docker microservices infrastructure, improving overall system stability by 25%.',
    ],
  },
  {
    company: 'GrubMarket Inc.',
    role: 'Data Engineer',
    period: 'Jun 2022 – Oct 2023',
    location: 'San Francisco, CA',
    bullets: [
      'Maintained and scaled Hive data pipelines covering 90+ subsidiaries, using advanced SQL and Python to handle complex multi-entity data at scale.',
      'Built PySpark Structured Streaming pipelines processing trillions of rows of real-time transaction data with exactly-once semantics via checkpointing.',
      'Integrated Kafka, S3, Databricks, and Airflow into a unified data platform supporting both analytical and ML workloads.',
      'Developed anomaly detection models using dbt-engineered features and Databricks ML (Isolation Forest), identifying $2M+ in previously undetected financial exposure.',
      'Delivered data solutions that improved ERP gross margin by $4M+ and generated $3M+ in additional revenue.',
      'Built Tableau dashboards for IPO audit reporting, supporting compliance and investor-readiness across business units.',
    ],
  },
  {
    company: 'Weris Inc.',
    role: 'Data Engineer',
    period: 'Nov 2019 – Jun 2022',
    location: 'Sterling, VA',
    bullets: [
      'Built and maintained Azure Data Lake Gen2 pipelines integrated with Azure DevOps MLOps workflows.',
      'Developed a TensorFlow COVID-19 prediction model with automated CI/CD deployment through Azure DevOps.',
      'Optimized AWS architecture across multiple services, reducing cloud infrastructure costs by over 70%.',
      'Designed S3-to-Databricks data pipelines with Parquet format optimization for downstream analytics workloads.',
    ],
  },
]

export default function Experience() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="experience" className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Section header */}
        <h2 className="flex items-center text-slate-white text-2xl font-semibold mb-12">
          <span className="font-mono text-accent text-xl mr-3">02.</span>
          Where I&apos;ve Worked
          <span className="flex-1 h-px bg-navy-lighter ml-5" />
        </h2>

        <div className="flex flex-col md:flex-row gap-8 md:gap-0">
          {/* Tab buttons */}
          <div
            className="flex md:flex-col overflow-x-auto md:overflow-visible
              md:min-w-[200px] md:max-w-[200px]
              -mx-6 px-6 md:mx-0 md:px-0 md:mr-8"
          >
            {experiences.map((exp, i) => (
              <button
                key={exp.company}
                onClick={() => setActiveTab(i)}
                className={`flex-shrink-0 text-left px-5 py-3 font-mono text-sm whitespace-nowrap
                  transition-all duration-200 border-b-2 md:border-b-0 md:border-l-2
                  ${
                    activeTab === i
                      ? 'text-accent border-accent bg-navy-light/40'
                      : 'text-slate border-navy-lighter/30 hover:text-accent hover:bg-navy-light/20 hover:border-navy-lighter/60'
                  }`}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Content panel */}
          <div className="flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -12 }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                <div className="mb-5">
                  <h3 className="text-slate-white text-xl font-semibold mb-1">
                    {experiences[activeTab].role}{' '}
                    <span className="text-accent">@ {experiences[activeTab].company}</span>
                  </h3>
                  <p className="font-mono text-sm text-slate">
                    {experiences[activeTab].period} &nbsp;·&nbsp; {experiences[activeTab].location}
                  </p>
                </div>

                <ul className="space-y-4">
                  {experiences[activeTab].bullets.map((bullet, i) => (
                    <li key={i} className="flex gap-4 text-slate leading-relaxed">
                      <span className="text-accent mt-1.5 flex-shrink-0 text-xs">▹</span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
