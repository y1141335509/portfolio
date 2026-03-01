'use client'

import { useEffect, useRef } from 'react'

interface Branch {
  x1: number; y1: number
  x2: number; y2: number
  depth: number
}

function grow(
  x: number, y: number, angle: number, length: number, depth: number,
  out: Branch[], budget: number
): void {
  if (depth > 8 || length < 4 || out.length >= budget) return
  const x2 = x + Math.cos(angle) * length
  const y2 = y + Math.sin(angle) * length
  out.push({ x1: x, y1: y, x2, y2, depth })
  // 2 branches most of the time, occasionally 3 or 1
  const n = Math.random() < 0.12 ? 1 : Math.random() < 0.75 ? 2 : 3
  for (let i = 0; i < n; i++) {
    const spread = Math.PI / 5 + Math.random() * (Math.PI / 5) // 36–72°
    const dir = Math.random() < 0.5 ? 1 : -1
    const offset = dir * spread * (0.4 + Math.random() * 0.6)
    grow(x2, y2, angle + offset, length * (0.57 + Math.random() * 0.2), depth + 1, out, budget)
  }
}

export default function LichtenbergAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    let branches: Branch[] = []
    let drawIdx = 0
    let phase: 'drawing' | 'holding' | 'fading' = 'drawing'
    let phaseTimer = 0
    let fadeAlpha = 1
    let lastTime = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      restart()
    }

    const restart = () => {
      branches = []
      const cx = canvas.width / 2
      const cy = canvas.height / 2
      const initLen = Math.min(canvas.width, canvas.height) * 0.24
      const arms = 5 + Math.floor(Math.random() * 4)
      for (let i = 0; i < arms; i++) {
        const angle = (i / arms) * Math.PI * 2 + (Math.random() - 0.5) * 0.5
        grow(cx, cy, angle, initLen, 0, branches, 300)
      }
      // Sort depth-first so drawing flows root → tips
      branches.sort((a, b) => a.depth - b.depth)
      drawIdx = 0
      phase = 'drawing'
      phaseTimer = 0
      fadeAlpha = 1
    }

    const tick = (now: number) => {
      const dt = now - lastTime
      lastTime = now
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (phase === 'drawing') {
        drawIdx = Math.min(drawIdx + 6, branches.length)
        if (drawIdx >= branches.length) { phase = 'holding'; phaseTimer = 0 }
      } else if (phase === 'holding') {
        phaseTimer += dt
        if (phaseTimer > 2800) { phase = 'fading'; phaseTimer = 0 }
      } else {
        phaseTimer += dt
        fadeAlpha = Math.max(0, 1 - phaseTimer / 2000)
        if (fadeAlpha === 0) { restart(); rafId = requestAnimationFrame(tick); return }
      }

      ctx.save()
      ctx.globalAlpha = fadeAlpha

      for (let i = 0; i < drawIdx; i++) {
        const b = branches[i]
        const opacity = Math.max(0.025, 0.11 - b.depth * 0.011)
        const width = Math.max(0.3, 1.6 - b.depth * 0.16)

        ctx.shadowBlur = 3
        ctx.shadowColor = `rgba(100,255,218,${opacity * 2.5})`
        ctx.beginPath()
        ctx.moveTo(b.x1, b.y1)
        ctx.lineTo(b.x2, b.y2)
        ctx.strokeStyle = `rgba(100,255,218,${opacity})`
        ctx.lineWidth = width
        ctx.stroke()
        ctx.shadowBlur = 0
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
