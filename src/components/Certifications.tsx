'use client'

import { motion } from 'framer-motion'

// ─── Platform logo SVGs ──────────────────────────────────────────────────────

const HackerRankLogo = () => (
  <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true">
    <rect width="36" height="36" rx="7" fill="#1ba94c" />
    <text
      x="18" y="25"
      fontFamily="'Courier New', monospace"
      fontSize="18"
      fontWeight="800"
      textAnchor="middle"
      fill="white"
    >
      H
    </text>
  </svg>
)

const AWSLogo = () => (
  <svg viewBox="0 0 52 36" width="52" height="36" aria-hidden="true">
    <text
      x="0" y="24"
      fontFamily="'Arial Black', 'Arial', sans-serif"
      fontSize="20"
      fontWeight="900"
      fill="#FF9900"
    >
      aws
    </text>
    <path
      d="M2 28 Q26 34 50 28"
      stroke="#FF9900"
      strokeWidth="2.2"
      fill="none"
      strokeLinecap="round"
    />
  </svg>
)

const UdemyLogo = () => (
  <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true">
    <rect width="36" height="36" rx="7" fill="#A435F0" />
    <text
      x="18" y="25"
      fontFamily="'Arial Black', 'Arial', sans-serif"
      fontSize="20"
      fontWeight="900"
      textAnchor="middle"
      fill="white"
    >
      U
    </text>
  </svg>
)

const CourseraLogo = () => (
  <svg viewBox="0 0 36 36" width="32" height="32" aria-hidden="true">
    <rect width="36" height="36" rx="18" fill="#0056D2" />
    <text
      x="18" y="24"
      fontFamily="'Arial Black', 'Arial', sans-serif"
      fontSize="17"
      fontWeight="900"
      textAnchor="middle"
      fill="white"
    >
      C
    </text>
  </svg>
)

// ─── Cert data ────────────────────────────────────────────────────────────────

const certifications = [
  {
    logo: AWSLogo,
    platform: 'Amazon Web Services',
    name: 'Certified Solutions Architect',
    subtitle: 'Associate',
    href: 'https://www.credly.com/badges/64be2820-0f09-4b58-a29a-1540540948cc/linked_in_profile',
    pdfHref: '/certs/aws-solutions-architect-associate.pdf',
    accentColor: '#FF9900',
  },
  {
    logo: HackerRankLogo,
    platform: 'HackerRank',
    name: 'SQL (Advanced)',
    subtitle: null,
    href: 'https://www.hackerrank.com/certificates/8738c2b13dd8',
    pdfHref: null,
    accentColor: '#1ba94c',
  },
  {
    logo: HackerRankLogo,
    platform: 'HackerRank',
    name: 'SQL (Intermediate)',
    subtitle: null,
    href: 'https://www.hackerrank.com/certificates/879a6dd93626',
    pdfHref: null,
    accentColor: '#1ba94c',
  },
  {
    logo: HackerRankLogo,
    platform: 'HackerRank',
    name: 'SQL (Basic)',
    subtitle: null,
    href: 'https://www.hackerrank.com/certificates/ff56bdd3d486',
    pdfHref: null,
    accentColor: '#1ba94c',
  },
  {
    logo: UdemyLogo,
    platform: 'Udemy',
    name: 'Master of Apache Spark',
    subtitle: null,
    href: 'https://www.udemy.com/certificate/UC-1dad8ed3-c378-43c8-bf59-d2a65e685e8f/',
    pdfHref: null,
    accentColor: '#A435F0',
  },
  {
    logo: CourseraLogo,
    platform: 'Coursera',
    name: 'Practical Time Series Analysis',
    subtitle: 'May 2019',
    href: 'https://www.coursera.org/account/accomplishments/verify/WAN4VECSVLQJ',
    pdfHref: null,
    accentColor: '#0056D2',
  },
  {
    logo: CourseraLogo,
    platform: 'Coursera',
    name: 'Neural Networks and Deep Learning',
    subtitle: 'May 2019',
    href: 'https://www.coursera.org/account/accomplishments/verify/JJ88J7C9HGTE',
    pdfHref: null,
    accentColor: '#0056D2',
  },
  {
    logo: CourseraLogo,
    platform: 'Coursera',
    name: 'Convolutional Neural Networks in TensorFlow',
    subtitle: 'May 2019',
    href: 'https://www.coursera.org/account/accomplishments/verify/E8ZHP8XYH5E5',
    pdfHref: null,
    accentColor: '#0056D2',
  },
]

const ExternalIcon = () => (
  <svg
    width="13" height="13"
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

const DownloadIcon = () => (
  <svg
    width="13" height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
)

const motionProps = (i: number) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-30px' },
  transition: { duration: 0.45, delay: i * 0.06, ease: 'easeOut' },
})

const cardClass =
  'group flex items-center gap-4 p-4 bg-navy-light/40 border border-navy-lighter/40 rounded hover:border-accent/20 hover:bg-navy-light/60 transition-all duration-200'

export default function Certifications() {
  return (
    <section id="certifications" className="pb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <h2 className="flex items-center text-slate-white text-xl font-semibold mb-8">
          <span className="font-mono text-accent text-base mr-3">—</span>
          Certifications
          <span className="flex-1 h-px bg-navy-lighter ml-5" />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {certifications.map((cert, i) => {
            const Logo = cert.logo

            const logoBox = (
              <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-lg bg-navy/70 border border-navy-lighter/30">
                <Logo />
              </div>
            )

            const certInfo = (
              <div className="flex-1 min-w-0">
                <p className="text-slate-lighter font-semibold text-sm leading-snug group-hover:text-accent transition-colors duration-200 truncate">
                  {cert.name}
                </p>
                {cert.subtitle && (
                  <p className="font-mono text-xs text-accent/60 mt-0.5">{cert.subtitle}</p>
                )}
                <p className="font-mono text-xs text-slate/50 mt-1">{cert.platform}</p>
              </div>
            )

            // AWS card: two icon actions (Credly badge + PDF download)
            if (cert.pdfHref) {
              return (
                <motion.div key={cert.href} {...motionProps(i)} className={cardClass}>
                  {logoBox}
                  {certInfo}
                  <div className="flex-shrink-0 flex flex-col items-center gap-2">
                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View Credly badge"
                      className="text-slate/30 hover:text-accent/60 transition-colors"
                    >
                      <ExternalIcon />
                    </a>
                    <a
                      href={cert.pdfHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      title="View certificate PDF"
                      className="text-slate/30 hover:text-accent/60 transition-colors"
                    >
                      <DownloadIcon />
                    </a>
                  </div>
                </motion.div>
              )
            }

            // All other certs: whole card is a link
            return (
              <motion.a
                key={cert.href}
                href={cert.href}
                target="_blank"
                rel="noopener noreferrer"
                {...motionProps(i)}
                className={cardClass}
              >
                {logoBox}
                {certInfo}
                <span className="flex-shrink-0 text-slate/30 group-hover:text-accent/60 transition-colors">
                  <ExternalIcon />
                </span>
              </motion.a>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
