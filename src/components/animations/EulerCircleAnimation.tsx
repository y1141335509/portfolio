'use client'

import { useEffect, useRef } from 'react'

export default function EulerCircleAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let rafId: number
    let theta = 0
    let lastTime = 0
    const OMEGA = 0.35 // rad/s — one full revolution every ~18s

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    const tick = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now
      theta += OMEGA * dt

      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      const R = Math.min(w, h) * 0.17
      const cx = w * 0.42
      const cy = h * 0.52
      const A = 0.11  // global alpha multiplier

      const px = cx + R * Math.cos(theta)
      const py = cy - R * Math.sin(theta)   // canvas y is inverted

      ctx.save()

      // ── Unit circle ──────────────────────────────────────────────────
      ctx.globalAlpha = A * 0.7
      ctx.beginPath()
      ctx.arc(cx, cy, R, 0, Math.PI * 2)
      ctx.strokeStyle = '#8892b0'
      ctx.lineWidth = 0.8
      ctx.stroke()

      // ── Axes ─────────────────────────────────────────────────────────
      ctx.globalAlpha = A * 0.6
      ctx.strokeStyle = '#ccd6f6'
      ctx.lineWidth = 0.7
      ;[
        [cx - R * 1.5, cy, cx + R * 1.5, cy],
        [cx, cy - R * 1.5, cx, cy + R * 1.5],
      ].forEach(([x1, y1, x2, y2]) => {
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke()
      })

      // ── Radius line ───────────────────────────────────────────────────
      ctx.globalAlpha = A * 0.9
      ctx.beginPath()
      ctx.moveTo(cx, cy)
      ctx.lineTo(px, py)
      ctx.strokeStyle = '#64ffda'
      ctx.lineWidth = 1.2
      ctx.stroke()

      // ── Projection dashed lines ───────────────────────────────────────
      ctx.globalAlpha = A * 0.6
      ctx.setLineDash([3, 4])
      ctx.strokeStyle = '#64ffda'
      ctx.lineWidth = 0.7
      // vertical: point → x-axis
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, cy); ctx.stroke()
      // horizontal: point → y-axis
      ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(cx, py); ctx.stroke()
      ctx.setLineDash([])

      // ── Dot on circle ─────────────────────────────────────────────────
      ctx.globalAlpha = A * 1.2
      ctx.beginPath()
      ctx.arc(px, py, 3.5, 0, Math.PI * 2)
      ctx.fillStyle = '#64ffda'
      ctx.fill()

      // ── θ arc ─────────────────────────────────────────────────────────
      ctx.globalAlpha = A * 0.6
      ctx.beginPath()
      ctx.arc(cx, cy, R * 0.28, 0, -theta, true)
      ctx.strokeStyle = '#a8b2d8'
      ctx.lineWidth = 0.6
      ctx.stroke()

      // ── Labels ────────────────────────────────────────────────────────
      const fs = Math.floor(R * 0.21)
      ctx.globalAlpha = A * 0.8
      ctx.fillStyle = '#a8b2d8'
      ctx.font = `${fs}px monospace`
      ctx.textBaseline = 'middle'

      ctx.textAlign = 'left'
      ctx.fillText('Re', cx + R * 1.42, cy - 10)
      ctx.textAlign = 'center'
      ctx.fillText('Im', cx + 12, cy - R * 1.42)

      // θ label
      const tLabelAngle = theta / 2
      ctx.fillText('θ', cx + R * 0.43 * Math.cos(-tLabelAngle), cy + R * 0.43 * Math.sin(-tLabelAngle))

      // cos θ on x-axis
      ctx.globalAlpha = A * 0.75
      ctx.fillStyle = '#64ffda'
      ctx.font = `${Math.floor(R * 0.17)}px monospace`
      ctx.textAlign = 'center'
      ctx.fillText('cos θ', px, cy + 15)
      ctx.textAlign = 'right'
      ctx.fillText('sin θ', cx - 8, py + 4)

      // ── Formula ───────────────────────────────────────────────────────
      ctx.globalAlpha = A * 0.55
      ctx.fillStyle = '#ccd6f6'
      ctx.font = `${Math.floor(R * 0.27)}px monospace`
      ctx.textAlign = 'center'
      ctx.fillText('e^(iθ) = cos θ + i·sin θ', cx, cy + R * 1.88)

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
