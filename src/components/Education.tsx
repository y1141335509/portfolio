'use client'

import { motion } from 'framer-motion'

const education = [
  {
    degree: 'Master of Science',
    field: 'Computer Science',
    school: 'Georgia Institute of Technology',
    location: 'Atlanta, GA',
    period: '2021 – 2025',
    gpa: '3.8 / 4.0',
  },
  {
    degree: 'Master of Science',
    field: 'Civil and Environmental Engineering',
    school: 'Pennsylvania State University',
    location: 'University Park, PA',
    period: '2017 – 2019',
    gpa: '3.63 / 4.0',
  },
  {
    degree: 'Bachelor of Science',
    field: 'Civil and Environmental Engineering',
    school: 'Shandong University of Technology',
    location: 'Zibo, China',
    period: '2013 – 2017',
    gpa: '3.53 / 4.0',
  },
]

const profiles = [
  {
    label: 'Google Scholar',
    href: 'https://scholar.google.com/citations?hl=en&user=k8x7nqwAAAAJ',
  },
  {
    label: 'LeetCode',
    href: 'https://leetcode.com/u/quabouquet/',
  },
]

export default function Education() {
  return (
    <section id="education" className="pb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {/* Section header */}
        <h2 className="flex items-center text-slate-white text-xl font-semibold mb-8">
          <span className="font-mono text-accent text-base mr-3">—</span>
          Education
          <span className="flex-1 h-px bg-navy-lighter ml-5" />
        </h2>

        {/* Degree cards — vertical timeline */}
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[5.5rem] top-3 bottom-3 w-px bg-navy-lighter/40 hidden sm:block" />

          <div className="space-y-3">
            {education.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                className="flex gap-0 sm:gap-6 items-start"
              >
                {/* Year label */}
                <div className="hidden sm:block flex-shrink-0 w-20 text-right pt-4">
                  <span className="font-mono text-xs text-slate/50 leading-none">
                    {edu.period.split('–')[0].trim()}
                  </span>
                </div>

                {/* Timeline dot */}
                <div className="hidden sm:flex flex-shrink-0 items-start pt-4 -ml-1.5">
                  <div className="w-3 h-3 rounded-full border-2 border-accent bg-navy" />
                </div>

                {/* Content card */}
                <div
                  className="flex-1 min-w-0 p-4 sm:p-5
                    bg-navy-light/40 border border-navy-lighter/40 rounded
                    hover:border-accent/20 hover:bg-navy-light/55
                    transition-all duration-200"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                    <h3 className="text-slate-white font-semibold text-sm leading-snug">
                      {edu.school}
                    </h3>
                    <span className="font-mono text-xs text-slate/50 sm:hidden">
                      {edu.period}
                    </span>
                    <span className="hidden sm:block font-mono text-xs text-slate/50 flex-shrink-0 ml-4">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-slate text-sm mt-1">
                    {edu.degree} &middot; {edu.field}
                  </p>
                  {edu.gpa && (
                    <p className="font-mono text-xs text-slate/50 mt-1">GPA {edu.gpa}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Publication + Thesis */}
        <div className="mt-8 mb-6 space-y-3">
          <p className="font-mono text-xs text-accent/70 uppercase tracking-wider mb-3">
            Publication &amp; Thesis
          </p>
          <a
            href="https://etda.libraries.psu.edu/catalog/16771yzy67"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 p-4 rounded border border-navy-lighter/30
              hover:border-accent/25 hover:bg-navy-light/40 transition-all duration-200"
          >
            <span className="text-accent mt-1 flex-shrink-0 text-xs">▹</span>
            <div>
              <p className="text-slate-lighter text-sm group-hover:text-accent transition-colors duration-200 leading-snug">
                Using Real-Time Speed Data to Quantify Impacts of Weather on Travel Speeds
              </p>
              <p className="font-mono text-xs text-slate/50 mt-1">
                M.S. Thesis · Penn State · June 2019 · Linear Regression &amp; Random Forest
              </p>
            </div>
          </a>
          <a
            href="https://www.sciencedirect.com/science/article/abs/pii/S0197397517301790"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-start gap-3 p-4 rounded border border-navy-lighter/30
              hover:border-accent/25 hover:bg-navy-light/40 transition-all duration-200"
          >
            <span className="text-accent mt-1 flex-shrink-0 text-xs">▹</span>
            <div>
              <p className="text-slate-lighter text-sm group-hover:text-accent transition-colors duration-200 leading-snug">
                Economic impact assessment of highway accessibility gain — Spatial Autoregression Model
              </p>
              <p className="font-mono text-xs text-slate/50 mt-1">
                Transport Policy · 2018 · Shandong University of Technology
              </p>
            </div>
          </a>
        </div>

        {/* Profile links */}
        <div className="flex flex-wrap gap-3">
          {profiles.map((p) => (
            <a
              key={p.href}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs text-slate border border-navy-lighter/50 rounded-full px-3 py-1.5
                hover:text-accent hover:border-accent/40 transition-all duration-200"
            >
              {p.label} ↗
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
