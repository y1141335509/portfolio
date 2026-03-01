'use client'

import { useEffect, useRef } from 'react'

// ζ(1/2 + it) via Dirichlet eta: η(s) = Σ (-1)^(n-1)/n^s, ζ = η/(1-2^(1-s))
function zetaCriticalLine(t: number, N = 120): { re: number; im: number } {
  let etaRe = 0, etaIm = 0
  for (let n = 1; n <= N; n++) {
    const sign = n % 2 === 1 ? 1 : -1
    const amp = Math.pow(n, -0.5)
    const phase = t * Math.log(n)
    etaRe += sign * amp * Math.cos(phase)
    etaIm -= sign * amp * Math.sin(phase)
  }
  // 1 - 2^(1-s) = (1 - √2·cos(t·ln2)) + i(√2·sin(t·ln2))
  const ln2 = Math.LN2
  const dRe = 1 - Math.SQRT2 * Math.cos(t * ln2)
  const dIm = Math.SQRT2 * Math.sin(t * ln2)
  const dSq = dRe * dRe + dIm * dIm
  if (dSq < 1e-10) return { re: 0, im: 0 }
  return {
    re: (etaRe * dRe + etaIm * dIm) / dSq,
    im: (etaIm * dRe - etaRe * dIm) / dSq,
  }
}

// Approximate first 6 non-trivial zeros (t values)
const ZEROS = [14.134, 21.022, 25.010, 30.424, 32.935, 37.586]

export default function RiemannZetaAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number

    // Pre-compute path — done once
    const T_MAX = 50
    const STEPS = 700
    const pts: { re: number; im: number; t: number }[] = []
    let minRe = Infinity, maxRe = -Infinity, minIm = Infinity, maxIm = -Infinity
    for (let i = 0; i <= STEPS; i++) {
      const t = (i / STEPS) * T_MAX
      const z = zetaCriticalLine(t)
      pts.push({ re: z.re, im: z.im, t })
      minRe = Math.min(minRe, z.re); maxRe = Math.max(maxRe, z.re)
      minIm = Math.min(minIm, z.im); maxIm = Math.max(maxIm, z.im)
    }
    const span = Math.max(maxRe - minRe, maxIm - minIm) * 0.55
    const cRe = (minRe + maxRe) / 2
    const cIm = (minIm + maxIm) / 2

    let progress = 0        // 0→1
    let phase: 'drawing' | 'holding' | 'fading' = 'drawing'
    let phaseTimer = 0
    let fadeAlpha = 1
    let lastTime = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const toCanvas = (re: number, im: number, w: number, h: number) => {
      const scale = Math.min(w, h) * 0.32 / span
      return {
        x: w * 0.5 + (re - cRe) * scale,
        y: h * 0.5 - (im - cIm) * scale,
      }
    }

    const tick = (now: number) => {
      const dt = now - lastTime
      lastTime = now
      const w = canvas.width, h = canvas.height
      ctx.clearRect(0, 0, w, h)

      if (phase === 'drawing') {
        progress += dt / 14000   // ~14 s full draw
        if (progress >= 1) { progress = 1; phase = 'holding'; phaseTimer = 0 }
      } else if (phase === 'holding') {
        phaseTimer += dt
        if (phaseTimer > 3500) { phase = 'fading'; phaseTimer = 0 }
      } else {
        phaseTimer += dt
        fadeAlpha = Math.max(0, 1 - phaseTimer / 2500)
        if (fadeAlpha === 0) { progress = 0; phase = 'drawing'; phaseTimer = 0; fadeAlpha = 1 }
      }

      const n = Math.floor(progress * STEPS)
      ctx.save()
      ctx.globalAlpha = fadeAlpha

      // ── Axes ──────────────────────────────────────────────────────────
      const origin = toCanvas(0, 0, w, h)
      const scale = Math.min(w, h) * 0.32 / span
      const axLen = scale * span * 1.1
      ctx.globalAlpha = fadeAlpha * 0.08
      ctx.strokeStyle = '#8892b0'
      ctx.lineWidth = 0.7
      ctx.beginPath()
      ctx.moveTo(origin.x - axLen, origin.y); ctx.lineTo(origin.x + axLen, origin.y); ctx.stroke()
      ctx.beginPath()
      ctx.moveTo(origin.x, origin.y - axLen); ctx.lineTo(origin.x, origin.y + axLen); ctx.stroke()

      // ── Axis labels ───────────────────────────────────────────────────
      const fs = Math.max(11, Math.floor(Math.min(w, h) * 0.016))
      ctx.globalAlpha = fadeAlpha * 0.09
      ctx.fillStyle = '#a8b2d8'
      ctx.font = `${fs}px monospace`
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'left'
      ctx.fillText('Re( ζ(½+it) )', origin.x + axLen * 0.6, origin.y - 14)
      ctx.save()
      ctx.translate(origin.x + 16, origin.y - axLen * 0.6)
      ctx.rotate(-Math.PI / 2)
      ctx.textAlign = 'center'
      ctx.fillText('Im( ζ(½+it) )', 0, 0)
      ctx.restore()

      // ── Zeta path ─────────────────────────────────────────────────────
      ctx.globalAlpha = fadeAlpha * 0.45
      ctx.strokeStyle = '#64ffda'
      ctx.lineWidth = 1
      ctx.beginPath()
      for (let i = 0; i <= n; i++) {
        const p = toCanvas(pts[i].re, pts[i].im, w, h)
        i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y)
      }
      ctx.stroke()

      // ── Leading dot ───────────────────────────────────────────────────
      if (n < STEPS) {
        const p = toCanvas(pts[n].re, pts[n].im, w, h)
        ctx.globalAlpha = fadeAlpha * 0.9
        ctx.beginPath()
        ctx.arc(p.x, p.y, 2.8, 0, Math.PI * 2)
        ctx.fillStyle = '#64ffda'
        ctx.fill()
      }

      // ── Zero markers ──────────────────────────────────────────────────
      const currentT = pts[n]?.t ?? 0
      ctx.globalAlpha = fadeAlpha * 0.55
      ctx.strokeStyle = '#a8b2d8'
      ctx.lineWidth = 0.7
      for (const zt of ZEROS) {
        if (zt > currentT) break
        const idx = Math.round((zt / T_MAX) * STEPS)
        const p = toCanvas(pts[idx].re, pts[idx].im, w, h)
        ctx.beginPath()
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2)
        ctx.stroke()
      }

      // ── Formula ───────────────────────────────────────────────────────
      ctx.globalAlpha = fadeAlpha * 0.07
      ctx.fillStyle = '#ccd6f6'
      ctx.font = `${Math.floor(fs * 1.3)}px monospace`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'bottom'
      ctx.fillText('ζ(s) = Σ n⁻ˢ', w * 0.5, h - 28)

      ctx.restore()
      rafId = requestAnimationFrame(tick)
    }

    resize()
    rafId = requestAnimationFrame(tick)
    window.addEventListener('resize', resize)
    return () => { cancelAnimationFrame(rafId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true" />
  )
}
