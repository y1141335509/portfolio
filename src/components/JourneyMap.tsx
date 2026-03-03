'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { ComposableMap, Geographies, Geography, Marker, Line } from 'react-simple-maps'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Config ──────────────────────────────────────────────────────────────────

const GEO_URL = '/countries-110m.json'
const AUTOPLAY_INTERVAL = 3200 // ms per event

// ─── Types ────────────────────────────────────────────────────────────────────

type EventType = 'education' | 'work' | 'research' | 'certification'

interface JourneyEvent {
  year: string
  month?: string
  type: EventType
  title: string
  org: string
  location: string
  coords: [number, number] // [longitude, latitude]
  description: string
  link?: { label: string; href: string }
}

// ─── Type styling ─────────────────────────────────────────────────────────────

const TYPE_CONFIG: Record<EventType, { label: string; color: string; badgeClass: string }> = {
  education:     { label: 'Education',     color: '#64ffda', badgeClass: 'border-accent/40 text-accent' },
  work:          { label: 'Work',          color: '#a8b2d8', badgeClass: 'border-slate-light/40 text-slate-light' },
  research:      { label: 'Research',      color: '#fbbf24', badgeClass: 'border-yellow-400/40 text-yellow-300' },
  certification: { label: 'Certification', color: '#fb923c', badgeClass: 'border-orange-400/40 text-orange-300' },
}

const TYPE_ICONS: Record<EventType, React.ReactNode> = {
  education: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
    </svg>
  ),
  work: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
      <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    </svg>
  ),
  research: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" />
    </svg>
  ),
  certification: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="13" height="13">
      <circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
    </svg>
  ),
}

// ─── Events (chronological) ───────────────────────────────────────────────────

const EVENTS: JourneyEvent[] = [
  {
    year: '2013', type: 'education',
    title: 'Enrolled in B.S. Program',
    org: 'Shandong University of Technology',
    location: 'Zibo, China', coords: [118.05, 36.8],
    description: 'Started Bachelor of Science in Civil & Environmental Engineering in Zibo, China. First step in an academic journey that would span three countries.',
  },
  {
    year: '2017', month: 'Jan', type: 'research',
    title: 'Research Assistant',
    org: 'Shandong University of Technology',
    location: 'Zibo, China', coords: [118.05, 36.8],
    description: 'Led spatial autoregression research on the economic impact of highway accessibility improvements. Analyzed provincial data across Jiangsu.',
  },
  {
    year: '2017', month: 'Jul', type: 'research',
    title: 'Published: Transport Policy',
    org: 'Elsevier',
    location: 'Zibo, China', coords: [118.05, 36.8],
    description: 'Peer-reviewed paper on highway accessibility and regional GDP growth published in Transport Policy. Estimated $0.15B–$0.22B USD in economic uplift.',
    link: { label: 'View Publication', href: 'https://www.sciencedirect.com/science/article/abs/pii/S0197397517301790' },
  },
  {
    year: '2017', month: 'Sep', type: 'education',
    title: 'B.S. Graduated · M.S. Enrolled',
    org: 'Pennsylvania State University',
    location: 'State College, PA', coords: [-77.86, 40.8],
    description: 'Graduated B.S. with GPA 3.53. Crossed the Pacific to start M.S. in Civil & Environmental Engineering at Penn State.',
  },
  {
    year: '2018', month: 'Aug', type: 'work',
    title: 'Quantitative Strategist',
    org: 'Global AI',
    location: 'State College, PA', coords: [-77.86, 40.8],
    description: 'Built a Python web crawler pipeline for greenhouse gas data ingestion. Implemented a Markov regime-switching GDP nowcasting model, reducing short-term forecast error by ~3%.',
    link: { label: 'GitHub', href: 'https://github.com/iyutpo/Greenhouse' },
  },
  {
    year: '2019', month: 'May', type: 'research',
    title: 'M.S. Thesis Defense',
    org: 'Pennsylvania State University',
    location: 'State College, PA', coords: [-77.86, 40.8],
    description: 'Defended M.S. thesis: "Using Real-Time Speed Data to Quantify Impacts of Weather on Travel Speeds." Applied Linear Regression and Random Forest with Partial Dependence Plots to model how precipitation, visibility, and temperature affect highway travel speeds.',
    link: { label: 'View Thesis', href: 'https://etda.libraries.psu.edu/catalog/16771yzy67' },
  },
  {
    year: '2019', month: 'May', type: 'education',
    title: 'Graduated M.S. from Penn State',
    org: 'Pennsylvania State University',
    location: 'State College, PA', coords: [-77.86, 40.8],
    description: 'Completed Master of Science in Civil & Environmental Engineering with GPA 3.63.',
  },
  {
    year: '2019', month: 'Jun', type: 'work',
    title: 'Data Science Intern',
    org: 'Tencent',
    location: 'Shenzhen, China', coords: [114.06, 22.54],
    description: 'Back to China: analyzed mobile app store market share and DAU at Tencent. Built Power BI dashboards; delivered market intelligence to product managers.',
  },
  {
    year: '2019', month: 'Nov', type: 'work',
    title: 'Data Engineer',
    org: 'Weris Inc.',
    location: 'Sterling, VA', coords: [-77.42, 38.99],
    description: 'First full-time Data Engineer role. Built Azure Data Lake Gen2 pipelines, TensorFlow COVID-19 prediction model, and cut AWS cloud costs by 70%+.',
  },
  {
    year: '2020', type: 'certification',
    title: 'AWS Certified Solutions Architect',
    org: 'Amazon Web Services',
    location: 'Sterling, VA', coords: [-77.42, 38.99],
    description: 'Earned AWS Certified Solutions Architect – Associate certification, validating cloud architecture expertise from hands-on AWS optimization work at Weris.',
    link: { label: 'View Badge', href: 'https://www.credly.com/badges/64be2820-0f09-4b58-a29a-1540540948cc/linked_in_profile' },
  },
  {
    year: '2021', month: 'Jan', type: 'education',
    title: 'Enrolled M.S. Computer Science',
    org: 'Georgia Institute of Technology',
    location: 'Atlanta, GA (Remote)', coords: [-84.39, 33.75],
    description: 'Started Georgia Tech\'s part-time OMSCS program while working full-time at Weris Inc. Four-year journey through algorithms, ML theory, and systems.',
  },
  {
    year: '2022', month: 'Jun', type: 'work',
    title: 'Data Engineer',
    org: 'GrubMarket Inc.',
    location: 'San Francisco, CA', coords: [-122.42, 37.77],
    description: 'Scaled Hive pipelines across 90+ subsidiaries. Built PySpark Structured Streaming at trillion-row scale. Anomaly detection models identified $2M+ in financial exposure. Delivered $7M+ in total business impact.',
  },
  {
    year: '2023', month: 'Oct', type: 'work',
    title: 'Data Engineer',
    org: 'Bubbles and Books',
    location: 'San Mateo, CA', coords: [-122.33, 37.56],
    description: 'Led ETL migration from Shopify (zero data loss), built a LangChain + GPT-4 RAG chatbot (–40% support workload), and architected Kubernetes microservices. Current role.',
  },
  {
    year: '2025', type: 'education',
    title: 'Graduated M.S. Computer Science',
    org: 'Georgia Institute of Technology',
    location: 'Atlanta, GA', coords: [-84.39, 33.75],
    description: 'Completed M.S. Computer Science with GPA 3.8 — four years of part-time graduate study alongside full-time data engineering. Three degrees, two coasts, one decade.',
  },
]

// ─── Map marker component ──────────────────────────────────────────────────────

function MapMarker({
  event,
  isActive,
  isPast,
  index,
  onHover,
}: {
  event: JourneyEvent
  isActive: boolean
  isPast: boolean
  index: number
  onHover: (i: number | null) => void
}) {
  const cfg = TYPE_CONFIG[event.type]
  const dotR = isActive ? 7 : 4

  return (
    <Marker coordinates={event.coords}>
      <g
        onMouseEnter={() => onHover(index)}
        onMouseLeave={() => onHover(null)}
        style={{ cursor: 'pointer' }}
      >
        {/* Ripple rings — active only */}
        {isActive && (
          <>
            <circle r={16} fill="none" stroke={cfg.color} strokeWidth={1} opacity={0.15}>
              <animate attributeName="r" from={8} to={28} dur="1.8s" repeatCount="indefinite" />
              <animate attributeName="opacity" from={0.4} to={0} dur="1.8s" repeatCount="indefinite" />
            </circle>
            <circle r={12} fill="none" stroke={cfg.color} strokeWidth={1} opacity={0.2}>
              <animate attributeName="r" from={8} to={18} dur="1.8s" begin="0.6s" repeatCount="indefinite" />
              <animate attributeName="opacity" from={0.3} to={0} dur="1.8s" begin="0.6s" repeatCount="indefinite" />
            </circle>
          </>
        )}

        {/* Main dot */}
        <circle
          r={dotR}
          fill={cfg.color}
          opacity={isActive ? 1 : isPast ? 0.45 : 0.15}
          style={{ transition: 'all 0.4s ease' }}
        />

        {/* Active: floating label above dot */}
        {isActive && (
          <>
            {/* Connector line */}
            <line x1={0} y1={-dotR - 2} x2={0} y2={-dotR - 16} stroke={cfg.color} strokeWidth={1} opacity={0.6} />
            {/* Label pill */}
            <rect
              x={-52} y={-dotR - 46}
              width={104} height={26}
              rx={4}
              fill="rgba(10, 25, 47, 0.92)"
              stroke={cfg.color}
              strokeWidth={0.5}
            />
            <text
              y={-dotR - 34}
              textAnchor="middle"
              fill={cfg.color}
              fontSize={8.5}
              fontFamily="'Courier New', monospace"
              fontWeight="600"
            >
              {event.year}{event.month ? ` · ${event.month}` : ''}
            </text>
            <text
              y={-dotR - 24}
              textAnchor="middle"
              fill="#ccd6f6"
              fontSize={7.5}
              fontFamily="'Courier New', monospace"
            >
              {event.location}
            </text>
          </>
        )}
      </g>
    </Marker>
  )
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function JourneyMap() {
  const [current, setCurrent] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null)
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const railRef = useRef<HTMLDivElement>(null)

  const advance = useCallback(() => {
    setCurrent(prev => (prev + 1) % EVENTS.length)
  }, [])

  // Auto-advance
  useEffect(() => {
    if (!playing) return
    intervalRef.current = setTimeout(advance, AUTOPLAY_INTERVAL)
    return () => { if (intervalRef.current) clearTimeout(intervalRef.current) }
  }, [current, playing, advance])

  // Scroll the rail so the active dot is visible
  useEffect(() => {
    const rail = railRef.current
    if (!rail) return
    const dot = rail.querySelector<HTMLElement>(`[data-index="${current}"]`)
    if (dot) dot.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' })
  }, [current])

  const goTo = (i: number) => {
    setCurrent(i)
    setPlaying(false)
  }

  const event = EVENTS[current]
  const cfg = TYPE_CONFIG[event.type]

  return (
    <section id="journey" className="py-24">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="flex items-center text-slate-white text-2xl font-semibold mb-4">
          <span className="font-mono text-accent text-xl mr-3">04.</span>
          My Journey
          <span className="flex-1 h-px bg-navy-lighter ml-5" />
        </h2>
        <p className="text-slate text-sm mb-8 font-mono">
          Zibo → State College → Shenzhen → Sterling → San Francisco → San Mateo
        </p>
      </motion.div>

      {/* ── MAP ── */}
      <div className="relative rounded-lg overflow-hidden border border-navy-lighter/50 mb-6"
        style={{ background: '#060e1a' }}>

        {/* Progress bar overlay at top of map */}
        <div className="absolute top-0 left-0 right-0 z-10 h-0.5 bg-navy-lighter/30">
          <motion.div
            className="h-full bg-accent/70"
            animate={{ width: `${((current + 1) / EVENTS.length) * 100}%` }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          />
        </div>

        {/* Event counter top-right */}
        <div className="absolute top-3 right-3 z-10 font-mono text-xs text-slate/60 bg-navy/70 px-2 py-1 rounded">
          {current + 1} / {EVENTS.length}
        </div>

        <ComposableMap
          projectionConfig={{ scale: 147, center: [10, 10] }}
          style={{ width: '100%', height: 'auto' }}
          width={800}
          height={400}
        >
          {/* Ocean background */}
          <rect width={800} height={400} fill="#060e1a" />

          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#0d1f38"
                  stroke="#1a3055"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: 'none' },
                    hover:   { outline: 'none', fill: '#0d1f38' },
                    pressed: { outline: 'none' },
                  }}
                />
              ))
            }
          </Geographies>

          {/* Path lines connecting visited dots */}
          {Array.from({ length: current }, (_, i) => {
            const from = EVENTS[i].coords
            const to = EVENTS[i + 1].coords
            if (from[0] === to[0] && from[1] === to[1]) return null
            return (
              <Line
                key={`path-${i}`}
                from={from}
                to={to}
                stroke="#64ffda"
                strokeWidth={0.6}
                strokeOpacity={0.18}
                strokeLinecap="round"
              />
            )
          })}

          {/* Markers */}
          {EVENTS.map((ev, i) => {
            const isActive = i === current
            const isPast = i < current
            const isHovered = hoveredMarker === i
            if (!isActive && !isPast && !isHovered) return null
            return (
              <MapMarker
                key={i}
                event={ev}
                isActive={isActive || isHovered}
                isPast={isPast}
                index={i}
                onHover={setHoveredMarker}
              />
            )
          })}
        </ComposableMap>
      </div>

      {/* ── CONTROLS + EVENT CARD ── */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        {/* Play/Pause + step controls */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={() => { setCurrent(prev => (prev - 1 + EVENTS.length) % EVENTS.length); setPlaying(false) }}
            className="w-8 h-8 flex items-center justify-center rounded border border-navy-lighter/50 text-slate hover:text-accent hover:border-accent/40 transition-all"
            aria-label="Previous"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
          </button>

          <button
            onClick={() => setPlaying(p => !p)}
            className="w-8 h-8 flex items-center justify-center rounded border border-navy-lighter/50 text-accent hover:bg-accent/10 hover:border-accent/40 transition-all"
            aria-label={playing ? 'Pause' : 'Play'}
          >
            {playing ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            )}
          </button>

          <button
            onClick={() => { setCurrent(prev => (prev + 1) % EVENTS.length); setPlaying(false) }}
            className="w-8 h-8 flex items-center justify-center rounded border border-navy-lighter/50 text-slate hover:text-accent hover:border-accent/40 transition-all"
            aria-label="Next"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
          </button>
        </div>

        {/* Current event card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="flex-1 bg-navy-light/50 border border-navy-lighter/40 rounded p-4
              flex flex-col sm:flex-row sm:items-start gap-3"
          >
            {/* Type badge */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <span className={`inline-flex items-center gap-1.5 font-mono text-xs border rounded-full px-2.5 py-1 ${cfg.badgeClass}`}>
                {TYPE_ICONS[event.type]}
                {cfg.label}
              </span>
              <span className="font-mono text-xs text-slate/50">
                {event.month ? `${event.month} ${event.year}` : event.year}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-slate-white font-semibold text-sm leading-snug">{event.title}</p>
              <p className="font-mono text-xs mt-0.5" style={{ color: cfg.color }}>{event.org}</p>
              <p className="text-slate text-xs mt-1.5 leading-relaxed line-clamp-2">{event.description}</p>
              {event.link && (
                <a
                  href={event.link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 mt-2 font-mono text-xs text-slate/50 hover:text-accent transition-colors"
                >
                  {event.link.label} ↗
                </a>
              )}
            </div>

            {/* Location tag */}
            <div className="flex-shrink-0 hidden sm:flex items-center gap-1 font-mono text-xs text-slate/45">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {event.location}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── TIMELINE RAIL ── */}
      <div
        ref={railRef}
        className="relative overflow-x-auto pb-2"
        style={{ scrollbarWidth: 'none' }}
      >
        <div className="flex items-center gap-0 min-w-max px-2">
          {EVENTS.map((ev, i) => {
            const isActive = i === current
            const isPast = i < current
            const evCfg = TYPE_CONFIG[ev.type]
            return (
              <button
                key={i}
                data-index={i}
                onClick={() => goTo(i)}
                className="group relative flex flex-col items-center"
                aria-label={`${ev.year} — ${ev.title}`}
              >
                {/* Connector line */}
                {i < EVENTS.length - 1 && (
                  <div className={`absolute top-3 left-1/2 w-8 h-px translate-y-0 z-0
                    ${isPast || isActive ? 'opacity-50' : 'opacity-15'}`}
                    style={{ background: isActive ? evCfg.color : isPast ? '#233554' : '#1a2a40', width: '2.2rem', marginLeft: '0.375rem' }}
                  />
                )}

                {/* Dot */}
                <div
                  className={`relative z-10 w-2.5 h-2.5 rounded-full mx-4 flex-shrink-0 transition-all duration-300
                    ${isActive ? 'scale-125 ring-2 ring-offset-1 ring-offset-navy' : 'scale-100'}
                    ${isPast ? 'opacity-50' : isActive ? 'opacity-100' : 'opacity-25'}`}
                  style={{
                    backgroundColor: evCfg.color,
                    ...(isActive ? { boxShadow: `0 0 8px ${evCfg.color}60` } : {}),
                  }}
                />

                {/* Year label below dot */}
                <span className={`mt-1.5 font-mono text-xs transition-colors duration-200 whitespace-nowrap
                  ${isActive ? 'text-accent' : isPast ? 'text-slate/40' : 'text-slate/20'}
                  group-hover:text-slate/70`}
                >
                  {ev.year}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
