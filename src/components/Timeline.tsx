'use client'

import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

// ─── Event types ─────────────────────────────────────────────────────────────

type EventType = 'education' | 'work' | 'research' | 'certification' | 'project'

interface TimelineEvent {
  year: string
  month?: string
  type: EventType
  title: string
  org?: string
  description: string
  link?: { label: string; href: string }
}

// ─── Color + label per type ───────────────────────────────────────────────────

const typeConfig: Record<EventType, { label: string; dot: string; badge: string }> = {
  education:     { label: 'Education',     dot: '#64ffda', badge: 'bg-accent/10 text-accent border-accent/30' },
  work:          { label: 'Work',          dot: '#ccd6f6', badge: 'bg-slate-lighter/10 text-slate-lighter border-slate-lighter/25' },
  research:      { label: 'Research',      dot: '#fbbf24', badge: 'bg-yellow-400/10 text-yellow-300 border-yellow-400/30' },
  certification: { label: 'Certification', dot: '#fb923c', badge: 'bg-orange-400/10 text-orange-300 border-orange-400/30' },
  project:       { label: 'Project',       dot: '#a78bfa', badge: 'bg-violet-400/10 text-violet-300 border-violet-400/30' },
}

// ─── Type icons ───────────────────────────────────────────────────────────────

const icons: Record<EventType, JSX.Element> = {
  education: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
      <path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  work: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  research: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <line x1="10" y1="9" x2="8" y2="9" />
    </svg>
  ),
  certification: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <circle cx="12" cy="8" r="6" />
      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
  project: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </svg>
  ),
}

// ─── Timeline data ────────────────────────────────────────────────────────────

const events: TimelineEvent[] = [
  {
    year: '2013',
    type: 'education',
    title: 'Enrolled in B.S. Program',
    org: 'Shandong University of Technology',
    description: 'Started Bachelor of Science in Civil and Environmental Engineering in Zibo, China.',
  },
  {
    year: '2017',
    month: 'Jan',
    type: 'research',
    title: 'Research Assistant',
    org: 'Shandong University of Technology',
    description: 'Conducted spatial autoregression research on economic impact of highway accessibility — led to a peer-reviewed publication.',
  },
  {
    year: '2017',
    month: 'Jul',
    type: 'research',
    title: 'Published in Transport Policy',
    org: 'Elsevier',
    description: 'Paper on highway accessibility and GDP growth published in Transport Policy. Estimated $0.15B–$0.22B USD in economic uplift from Jiangsu Province road improvements.',
    link: {
      label: 'View Publication',
      href: 'https://www.sciencedirect.com/science/article/abs/pii/S0197397517301790',
    },
  },
  {
    year: '2017',
    month: 'Sep',
    type: 'education',
    title: 'Graduated B.S. · Enrolled in M.S.',
    org: 'Penn State University',
    description: 'Graduated with B.S. (GPA 3.53) and moved to University Park, PA to begin M.S. in Civil and Environmental Engineering.',
  },
  {
    year: '2018',
    month: 'Aug',
    type: 'work',
    title: 'Quantitative Strategist',
    org: 'Global AI',
    description: 'Built a Python web crawler pipeline for greenhouse gas emission data; implemented a Markov regime-switching GDP nowcasting model, reducing short-term forecast error by ~3%.',
    link: { label: 'GitHub', href: 'https://github.com/iyutpo/Greenhouse' },
  },
  {
    year: '2019',
    month: 'May',
    type: 'education',
    title: 'Graduated M.S. from Penn State',
    org: 'Pennsylvania State University',
    description: 'Completed Master of Science in Civil and Environmental Engineering with GPA 3.63.',
  },
  {
    year: '2019',
    month: 'Jun',
    type: 'work',
    title: 'Data Science Intern',
    org: 'Tencent',
    description: 'Analyzed app store market share and DAU metrics using SQL and Power BI; delivered market intelligence reports to product managers in Shenzhen.',
  },
  {
    year: '2019',
    month: 'Nov',
    type: 'work',
    title: 'Data Engineer',
    org: 'Weris Inc.',
    description: 'Built Azure Data Lake Gen2 pipelines, TensorFlow COVID-19 prediction models with CI/CD, and reduced AWS cloud costs by 70%+. Based in Sterling, VA.',
  },
  {
    year: '2021',
    month: 'Jan',
    type: 'education',
    title: 'Enrolled in M.S. Computer Science',
    org: 'Georgia Institute of Technology',
    description: 'Started part-time OMSCS (Online Master of Science in Computer Science) while working full-time at Weris Inc.',
  },
  {
    year: '2022',
    month: 'Jun',
    type: 'work',
    title: 'Data Engineer',
    org: 'GrubMarket Inc.',
    description: 'Scaled Hive pipelines across 90+ subsidiaries, built real-time PySpark Structured Streaming for trillion-row data, and built anomaly detection models — identifying $2M+ in financial exposure.',
  },
  {
    year: '2023',
    month: 'Oct',
    type: 'work',
    title: 'Data Engineer',
    org: 'Bubbles and Books',
    description: 'Led end-to-end ETL migration from Shopify to a custom platform, built a RAG chatbot with LangChain + GPT-4, and architected Kubernetes microservices infrastructure.',
  },
  {
    year: '2024',
    type: 'certification',
    title: 'AWS Certified Solutions Architect',
    org: 'Amazon Web Services',
    description: 'Earned the AWS Certified Solutions Architect – Associate certification.',
    link: {
      label: 'View Badge',
      href: 'https://www.credly.com/badges/64be2820-0f09-4b58-a29a-1540540948cc/linked_in_profile',
    },
  },
  {
    year: '2025',
    type: 'education',
    title: 'Graduated M.S. Computer Science',
    org: 'Georgia Institute of Technology',
    description: 'Completed Master of Science in Computer Science with GPA 3.8. Four years of part-time graduate study alongside full-time data engineering work.',
  },
]

// ─── Subcomponent: Event card ─────────────────────────────────────────────────

function EventCard({
  event,
  index,
  side,
}: {
  event: TimelineEvent
  index: number
  side: 'left' | 'right'
}) {
  const cfg = typeConfig[event.type]
  const icon = icons[event.type]

  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -24 : 24, y: 8 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.04, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`group relative flex ${side === 'left' ? 'md:justify-end md:pr-10' : 'md:pl-10 md:justify-start'} justify-start pl-10 md:pl-0`}
    >
      <div
        className="w-full md:w-[calc(50%-2rem)] bg-navy-light/50 border border-navy-lighter/40 rounded p-5
          hover:border-accent/20 hover:bg-navy-light/65 transition-all duration-200"
      >
        {/* Top row: type badge + year */}
        <div className="flex items-center justify-between gap-3 mb-3">
          <span className={`inline-flex items-center gap-1.5 text-xs font-mono border rounded-full px-2.5 py-0.5 ${cfg.badge}`}>
            <span className="opacity-80">{icon}</span>
            {cfg.label}
          </span>
          <span className="font-mono text-xs text-slate/50 flex-shrink-0">
            {event.month ? `${event.month} ${event.year}` : event.year}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-slate-white font-semibold text-sm leading-snug mb-1">
          {event.title}
        </h3>

        {/* Org */}
        {event.org && (
          <p className="font-mono text-xs text-accent/70 mb-2">{event.org}</p>
        )}

        {/* Description */}
        <p className="text-slate text-sm leading-relaxed">{event.description}</p>

        {/* Optional link */}
        {event.link && (
          <a
            href={event.link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 mt-3 font-mono text-xs text-slate/60 hover:text-accent transition-colors duration-200"
          >
            {event.link.label}
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  })

  // Spring-smooth scroll progress → line height scale
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 })
  const lineOpacity = useTransform(scrollYProgress, [0, 0.05], [0.2, 1])

  return (
    <section id="timeline" className="py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      >
        {/* Section header */}
        <h2 className="flex items-center text-slate-white text-2xl font-semibold mb-4">
          <span className="font-mono text-accent text-xl mr-3">05.</span>
          My Journey
          <span className="flex-1 h-px bg-navy-lighter ml-5" />
        </h2>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-16">
          {(Object.entries(typeConfig) as [EventType, typeof typeConfig[EventType]][]).map(([type, cfg]) => (
            <span key={type} className={`inline-flex items-center gap-1.5 text-xs font-mono border rounded-full px-2.5 py-1 ${cfg.badge}`}>
              <span className="opacity-80">{icons[type]}</span>
              {cfg.label}
            </span>
          ))}
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">

          {/* Vertical center line — desktop only */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-px bg-navy-lighter/30" />

          {/* Animated fill line */}
          <motion.div
            className="hidden md:block absolute left-1/2 top-0 -translate-x-1/2 w-px bg-accent/50 origin-top"
            style={{ scaleY, opacity: lineOpacity, bottom: 0 }}
          />

          {/* Mobile line */}
          <div className="md:hidden absolute left-4 top-0 bottom-0 w-px bg-navy-lighter/40" />

          <div className="space-y-8">
            {events.map((event, i) => {
              const side = i % 2 === 0 ? 'left' : 'right'
              const cfg = typeConfig[event.type]

              return (
                <div key={`${event.year}-${event.title}`} className="relative">
                  {/* Center dot — desktop */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.35, delay: i * 0.04, ease: 'backOut' }}
                    className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 -translate-y-1/2 z-10
                      w-3.5 h-3.5 rounded-full border-2 border-navy items-center justify-center"
                    style={{ backgroundColor: cfg.dot }}
                  />

                  {/* Mobile dot */}
                  <div
                    className="md:hidden absolute left-4 top-6 -translate-x-1/2 -translate-y-1/2
                      w-3 h-3 rounded-full border-2 border-navy"
                    style={{ backgroundColor: cfg.dot }}
                  />

                  {/* Card */}
                  <EventCard event={event} index={i} side={side} />
                </div>
              )
            })}
          </div>

          {/* End cap dot */}
          <div className="hidden md:flex absolute left-1/2 -bottom-4 -translate-x-1/2 z-10
            w-2 h-2 rounded-full bg-accent/40 items-center justify-center" />
        </div>
      </motion.div>
    </section>
  )
}
