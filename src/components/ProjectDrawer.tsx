'use client'

import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Node, Edge } from '@xyflow/react'
import PipelineGraph from './PipelineGraph'

export interface ProjectArchitecture {
  overview: string
  graph: {
    nodes: Node[]
    edges: Edge[]
    height?: number
  }
  metrics: { label: string; value: string }[]
  note?: string
}

export interface ProjectWithArch {
  title: string
  description: string
  tech: string[]
  github: string | null
  external: string | null
  architecture: ProjectArchitecture | null
}

interface ProjectDrawerProps {
  project: ProjectWithArch | null
  onClose: () => void
}

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
    <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
  </svg>
)

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

export default function ProjectDrawer({ project, onClose }: ProjectDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop — catches clicks outside modal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-navy/85 backdrop-blur-sm z-[55]"
            onClick={onClose}
          />

          {/* Centering wrapper — pointer-events-none so backdrop click works */}
          <div className="fixed inset-0 flex items-center justify-center p-4 md:p-8 z-[60] pointer-events-none">
            <motion.div
              ref={drawerRef}
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full max-w-5xl max-h-[88vh] bg-navy-light border border-navy-lighter/50 rounded-xl flex flex-col pointer-events-auto shadow-2xl"
            >
            {/* Header */}
            <div className="flex-shrink-0 border-b border-navy-lighter/40 px-6 py-4 flex items-center justify-between rounded-t-xl bg-navy-light">
              <span className="font-mono text-accent text-xs tracking-wider uppercase">
                Architecture Overview
              </span>
              <button
                onClick={onClose}
                className="text-slate hover:text-slate-white transition-colors p-1 -mr-1 rounded"
                aria-label="Close modal"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Scrollable content */}
            <div className="flex-1 overflow-y-auto rounded-b-xl">
              <div className="p-6 md:p-8 space-y-8">

                {/* Project title + overview */}
                <div>
                  <h2 className="text-slate-white text-lg font-semibold leading-snug mb-3">
                    {project.title}
                  </h2>
                  <p className="text-slate text-sm leading-relaxed">
                    {project.architecture?.overview ?? project.description}
                  </p>
                </div>

                {/* Pipeline graph */}
                {project.architecture?.graph && (
                  <div>
                    <h3 className="font-mono text-slate-lighter text-xs uppercase tracking-wider mb-4">
                      System Architecture
                    </h3>
                    <PipelineGraph
                      nodes={project.architecture.graph.nodes}
                      edges={project.architecture.graph.edges}
                      height={project.architecture.graph.height ?? 520}
                    />
                  </div>
                )}

                {/* Impact metrics */}
                {project.architecture?.metrics && (
                  <div>
                    <h3 className="font-mono text-slate-lighter text-xs uppercase tracking-wider mb-4">
                      Impact
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {project.architecture.metrics.map((m) => (
                        <div
                          key={m.label}
                          className="bg-navy/60 border border-navy-lighter/40 rounded p-4 hover:border-accent/20 transition-colors duration-200"
                        >
                          <p className="font-mono text-accent text-2xl font-bold leading-none">
                            {m.value}
                          </p>
                          <p className="text-slate text-xs mt-2 leading-snug">{m.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Tech stack */}
                <div>
                  <h3 className="font-mono text-slate-lighter text-xs uppercase tracking-wider mb-3">
                    Tech Stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-xs text-slate/75 border border-navy-lighter/60 bg-navy/40 rounded-full px-3 py-1"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* External links */}
                {(project.github || project.external) && (
                  <div className="flex gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate hover:text-accent text-sm transition-colors duration-200"
                      >
                        <GitHubIcon />
                        View Code
                      </a>
                    )}
                    {project.external && (
                      <a
                        href={project.external}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate hover:text-accent text-sm transition-colors duration-200"
                      >
                        <ExternalLinkIcon />
                        Live Demo
                      </a>
                    )}
                  </div>
                )}

                {/* Confidentiality note */}
                {project.architecture?.note && (
                  <p className="font-mono text-xs text-slate/40 border-t border-navy-lighter/30 pt-4">
                    {project.architecture.note}
                  </p>
                )}
              </div>
            </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
