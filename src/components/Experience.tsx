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
  {
    company: 'Tencent',
    role: 'Data Science Intern',
    period: 'Jun 2019 – Aug 2019',
    location: 'Shenzhen, China',
    bullets: [
      'Analyzed competitive positioning of mobile app stores (including Tencent App Store) across market share and DAU metrics, identifying key gaps versus major competitors.',
      'Authored SQL queries against production databases to aggregate app store rankings by downloads, DAU, and MAU, supporting data-driven product decisions.',
      'Built Power BI dashboards to communicate market intelligence findings; delivered research reports to product managers for roadmap planning.',
    ],
  },
  {
    company: 'Global AI',
    role: 'Quantitative Strategist',
    period: 'Aug 2018 – Dec 2018',
    location: 'Remote',
    bullets: [
      'Engineered a Python web crawler framework to ingest greenhouse gas emission and large time-series datasets from heterogeneous public sources.',
      'Designed an end-to-end data ingestion pipeline to receive, normalize, and persist scraped records to a local database for downstream analysis.',
      'Conducted exploratory data analysis in R with ggplot2, extracting actionable insights from structured query outputs to inform business strategy.',
      'Built and validated a Markov regime-switching model for GDP nowcasting, achieving a ~3% reduction in short-term forecast error.',
      "Presented findings to senior leadership; results were approved for production-quality visualization in Plotly as part of the company's Sustainable Development Goals initiative.",
    ],
    github: 'https://github.com/iyutpo/Greenhouse',
  },
  {
    company: 'Shandong Univ. of Tech.',
    role: 'Research Assistant',
    period: 'Jan 2017 – Jul 2017',
    location: 'Zibo, China',
    bullets: [
      'Extracted and cleaned China highway mileage data from ArcGIS geodatabases using SQL, resolving missing values across provincial-level geographic records.',
      "Defined a weighted average travel time metric and validated its spatial autocorrelation via Moran's Index as a precondition for spatial regression modeling.",
      'Implemented a Spatial Autoregression Model to quantify the economic impact of highway accessibility improvements across Jiangsu Province.',
      'Conducted sensitivity analysis to assess model robustness, establishing a statistically significant link between travel time reduction and regional GDP growth.',
      'Estimated that accessibility gains yielded $0.15B–$0.22B USD in economic uplift; findings were peer-reviewed and published in Transport Policy (2018).',
    ],
    publication: 'https://www.sciencedirect.com/science/article/abs/pii/S0197397517301790',
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

                {/* Optional links for research/early roles */}
                {(experiences[activeTab].github || experiences[activeTab].publication) && (
                  <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-navy-lighter/30">
                    {experiences[activeTab].github && (
                      <a
                        href={experiences[activeTab].github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-slate border border-navy-lighter/50 rounded-full px-3 py-1.5 hover:text-accent hover:border-accent/40 transition-all duration-200"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {experiences[activeTab].publication && (
                      <a
                        href={experiences[activeTab].publication}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono text-xs text-slate border border-navy-lighter/50 rounded-full px-3 py-1.5 hover:text-accent hover:border-accent/40 transition-all duration-200"
                      >
                        Publication ↗
                      </a>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
