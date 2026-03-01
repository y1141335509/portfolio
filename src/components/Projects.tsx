'use client'

import { motion } from 'framer-motion'

const projects = [
  {
    title: 'Financial Anomaly Detection System',
    description:
      'Multi-layer anomaly detection across 90+ subsidiaries at GrubMarket. Layer 1 uses rule-based validation checks; Layer 2 applies Isolation Forest on dbt-engineered features. Identified $2M+ in previously undetected financial exposure.',
    tech: ['Python', 'PySpark', 'dbt', 'Databricks ML', 'Isolation Forest', 'Airflow'],
    github: null,
    external: null,
  },
  {
    title: 'Real-time Streaming Data Pipeline',
    description:
      'PySpark Structured Streaming pipeline processing trillion-row-scale transactional data in real time. Integrated Kafka, S3, and Databricks with exactly-once semantics via checkpointing for reliable, high-throughput ingestion.',
    tech: ['PySpark', 'Kafka', 'Apache Spark', 'AWS S3', 'Databricks', 'Airflow'],
    github: null,
    external: null,
  },
  {
    title: 'RAG Customer Service Chatbot',
    description:
      'LangChain + GPT-4 retrieval-augmented generation chatbot for e-commerce customer support. Ingests product catalog and order history as a live knowledge base. Reduced customer service workload by 40%.',
    tech: ['LangChain', 'GPT-4', 'Python', 'AWS', 'Vector DB', 'FastAPI'],
    github: null,
    external: null,
  },
  {
    title: 'LLM Product Description Generator',
    description:
      'Fine-tuned Llama 2 on domain-specific e-commerce product data and deployed as an AWS SageMaker inference endpoint. Generates product descriptions automatically at scale, eliminating manual copy-writing bottlenecks.',
    tech: ['Llama 2', 'AWS SageMaker', 'Python', 'PyTorch', 'Hugging Face'],
    github: null,
    external: null,
  },
  {
    title: 'COVID-19 Prediction Model (MLOps)',
    description:
      'TensorFlow time-series prediction model for COVID-19 trends with automated CI/CD deployment through Azure DevOps. Full MLOps pipeline from data ingestion to model monitoring on Azure ML.',
    tech: ['TensorFlow', 'Azure ML', 'Azure DevOps', 'Python', 'CI/CD'],
    github: null,
    external: null,
  },
  {
    title: 'E-commerce ETL Migration',
    description:
      'End-to-end ETL migration from Shopify to a custom-built platform with zero data loss. Integrated Spring Boot backend with Oracle NetSuite ERP and built React operational interfaces for internal teams.',
    tech: ['Python', 'Spring Boot', 'React', 'Oracle NetSuite', 'Docker', 'ETL'],
    github: null,
    external: null,
  },
]

const FolderIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="38"
    height="38"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-accent"
  >
    <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
)

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

export default function Projects() {
  return (
    <section id="projects" className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Section header */}
        <h2 className="flex items-center text-slate-white text-2xl font-semibold mb-12">
          <span className="font-mono text-accent text-xl mr-3">03.</span>
          Things I&apos;ve Built
          <span className="flex-1 h-px bg-navy-lighter ml-5" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: 'easeOut' }}
              whileHover={{ y: -5 }}
              className="group relative bg-navy-light/55 backdrop-blur-sm rounded p-6 flex flex-col h-full
                border border-navy-lighter/40
                hover:border-accent/25 hover:bg-navy-light/70
                transition-all duration-200 cursor-default"
            >
              {/* Top row */}
              <div className="flex items-start justify-between mb-5">
                <FolderIcon />
                <div className="flex items-center gap-3 text-slate">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                      aria-label="GitHub repository"
                    >
                      <GitHubIcon />
                    </a>
                  )}
                  {project.external && (
                    <a
                      href={project.external}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-accent transition-colors"
                      aria-label="External link"
                    >
                      <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-slate-white font-semibold text-base mb-3 group-hover:text-accent transition-colors duration-200 leading-snug">
                {project.title}
              </h3>

              {/* Description */}
              <p className="text-slate text-sm leading-relaxed flex-1 mb-6">
                {project.description}
              </p>

              {/* Tech stack */}
              <ul className="flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <li
                    key={t}
                    className="font-mono text-xs text-slate/75 border border-navy-lighter/60 bg-navy/40 rounded-full px-2.5 py-0.5"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
