'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { name: 'About', href: '/about' },
  { name: 'Experience', href: '/experience' },
  { name: 'Projects', href: '/projects' },
  { name: 'Journey', href: '/timeline' },
  { name: 'Contact', href: '/contact' },
]

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
)

const EmailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
)

const GoogleScholarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
    {/* Graduation cap silhouette */}
    <path d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3zm0 12.08L4.5 10.9 12 6.75l7.5 4.15L12 15.08zM12 17c-2.76 0-5.19.88-7 2.34V21h14v-1.66C17.19 17.88 14.76 17 12 17z" />
  </svg>
)

const LeetCodeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16.102 17.93l-2.697 2.607c-.466.467-1.111.662-1.823.662s-1.357-.195-1.823-.662l-4.38-4.639c-.467-.467-.7-1.15-.7-1.863s.233-1.357.7-1.824l4.38-4.639c.466-.467 1.111-.7 1.823-.7s1.357.233 1.823.7l2.697 2.606c.514.515 1.366.515 1.88 0 .513-.515.513-1.366 0-1.88l-2.698-2.606c-.976-.976-2.264-1.485-3.702-1.485s-2.726.51-3.702 1.485l-4.38 4.639c-.976 1.012-1.485 2.3-1.485 3.702s.509 2.69 1.485 3.663l4.38 4.639c.976.976 2.264 1.485 3.702 1.485s2.726-.51 3.702-1.485l2.697-2.606c.514-.515.514-1.366 0-1.88-.513-.515-1.365-.515-1.88 0z" />
    <path d="M20.823 13.5h-8.87c-.734 0-1.323.597-1.323 1.323s.59 1.323 1.323 1.323h8.87c.734 0 1.323-.597 1.323-1.323s-.59-1.323-1.323-1.323z" />
  </svg>
)

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  const isActive = (href: string) => pathname === href

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-navy/90 backdrop-blur-md shadow-lg shadow-black/20' : ''
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
        {/* Logo — always links home */}
        <Link
          href="/"
          className="font-mono text-accent text-lg font-semibold hover:opacity-75 transition-opacity duration-200 select-none"
          aria-label="Home"
        >
          <span className="opacity-70">&lt;</span>YY<span className="opacity-70">/&gt;</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <ol className="flex items-center gap-1 list-none">
            {navLinks.map((link, i) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`group flex items-center gap-1 px-4 py-2 transition-colors duration-200 ${
                    isActive(link.href) ? 'text-accent' : 'text-slate hover:text-slate-white'
                  }`}
                >
                  <span className="font-mono text-accent text-xs">{`0${i + 1}.`}</span>
                  <span className="text-sm">{link.name}</span>
                </Link>
              </li>
            ))}
          </ol>

          <div className="flex items-center gap-4 border-l border-navy-lighter pl-6">
            <a href="https://github.com/y1141335509" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-accent transition-colors duration-200" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href="https://www.linkedin.com/in/yinghai-yu/" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-accent transition-colors duration-200" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href="https://scholar.google.com/citations?hl=en&user=k8x7nqwAAAAJ" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-accent transition-colors duration-200" aria-label="Google Scholar">
              <GoogleScholarIcon />
            </a>
            <a href="https://leetcode.com/u/quabouquet/" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-accent transition-colors duration-200" aria-label="LeetCode">
              <LeetCodeIcon />
            </a>
            <a href="mailto:yinghaiyu67@gmail.com" className="text-slate hover:text-accent transition-colors duration-200" aria-label="Email">
              <EmailIcon />
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-accent p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden overflow-hidden bg-navy-light/95 backdrop-blur-md border-t border-navy-lighter"
          >
            <div className="px-8 py-8 flex flex-col gap-6">
              <ol className="flex flex-col gap-4 list-none">
                {navLinks.map((link, i) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`flex items-center gap-3 transition-colors duration-200 ${
                        isActive(link.href) ? 'text-accent' : 'text-slate-lighter hover:text-accent'
                      }`}
                    >
                      <span className="font-mono text-accent text-xs">{`0${i + 1}.`}</span>
                      <span className="text-base">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ol>
              <div className="flex items-center gap-5 pt-4 border-t border-navy-lighter">
                <a href="https://github.com/y1141335509" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-accent transition-colors" aria-label="GitHub"><GitHubIcon /></a>
                <a href="https://www.linkedin.com/in/yinghai-yu/" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-accent transition-colors" aria-label="LinkedIn"><LinkedInIcon /></a>
                <a href="https://scholar.google.com/citations?hl=en&user=k8x7nqwAAAAJ" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-accent transition-colors" aria-label="Google Scholar"><GoogleScholarIcon /></a>
                <a href="https://leetcode.com/u/quabouquet/" target="_blank" rel="noopener noreferrer" className="text-slate hover:text-accent transition-colors" aria-label="LeetCode"><LeetCodeIcon /></a>
                <a href="mailto:yinghaiyu67@gmail.com" className="text-slate hover:text-accent transition-colors" aria-label="Email"><EmailIcon /></a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
