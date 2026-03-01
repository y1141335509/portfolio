'use client'

import { useEffect, useRef } from 'react'

// Each token: text, x-offset (in units of baseSize), y-offset, font-size scale
const TOKENS = [
  { text: 'e',  dx: 0,    dy: 0,    scale: 1.0 },
  { text: 'iπ', dx: 0.78, dy: -0.5, scale: 0.58 }, // superscript
  { text: '+',  dx: 1.72, dy: 0,    scale: 1.0 },
  { text: '1',  dx: 2.58, dy: 0,    scale: 1.0 },
  { text: '=',  dx: 3.44, dy: 0,    scale: 1.0 },
  { text: '0',  dx: 4.4,  dy: 0,    scale: 1.0 },
]

export default function EulerIdentityAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    let visibleChars = 0
    let phase: 'writing' | 'glowing' | 'fading' = 'writing'
    let phaseTimer = 0
    let globalAlpha = 0
    let lastTime = 0
    let lastCharTime = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const tick = (now: number) => {
      const dt = now - lastTime
      lastTime = now
      phaseTimer += dt

      const w = canvas.width, h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const base = Math.min(w, h) * 0.085
      // total width of the formula ≈ 5.2 * base; center it
      const startX = w * 0.5 - base * 2.6
      const startY = h * 0.76

      if (phase === 'writing') {
        globalAlpha = Math.min(0.18, phaseTimer / 600 * 0.18)
        // Reveal one character every 550ms
        if (visibleChars < TOKENS.length && now - lastCharTime > 550) {
          visibleChars++
          lastCharTime = now
        }
        // Wait a beat after last char before glowing
        if (visibleChars >= TOKENS.length && phaseTimer > 550 * TOKENS.length + 900) {
          phase = 'glowing'; phaseTimer = 0
        }
      } else if (phase === 'glowing') {
        const pulse = 0.5 + 0.5 * Math.sin(phaseTimer / 500)
        globalAlpha = 0.16 + 0.07 * pulse
        if (phaseTimer > 3200) { phase = 'fading'; phaseTimer = 0 }
      } else {
        globalAlpha = Math.max(0, 0.23 * (1 - phaseTimer / 2200))
        if (globalAlpha === 0) {
          visibleChars = 0; phase = 'writing'; phaseTimer = 0; lastCharTime = now
        }
      }

      ctx.save()

      // ── Equation tokens ───────────────────────────────────────────────
      for (let i = 0; i < visibleChars; i++) {
        const t = TOKENS[i]
        const size = base * t.scale
        const x = startX + t.dx * base
        const y = startY + t.dy * base

        ctx.globalAlpha = globalAlpha
        ctx.fillStyle = '#ccd6f6'
        ctx.font = `${Math.floor(size)}px 'Georgia', 'Times New Roman', serif`
        ctx.textAlign = 'left'
        ctx.textBaseline = 'middle'
        ctx.fillText(t.text, x, y)
      }

      // ── Subtitle below formula ─────────────────────────────────────────
      if (visibleChars >= TOKENS.length) {
        ctx.globalAlpha = globalAlpha * 0.45
        ctx.fillStyle = '#8892b0'
        ctx.font = `${Math.floor(base * 0.27)}px monospace`
        ctx.textAlign = 'center'
        ctx.textBaseline = 'middle'
        ctx.fillText("Euler's Identity", w * 0.5, startY + base * 1.18)
      }

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
