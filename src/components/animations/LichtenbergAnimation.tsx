'use client'

import { useEffect, useRef } from 'react'

interface Branch {
  pts: [number, number][]
  depth: number
}

// Pre-compute a jagged path between two points (stable across frames)
function jaggedPts(
  x1: number, y1: number, x2: number, y2: number, jitter: number
): [number, number][] {
  const dx = x2 - x1, dy = y2 - y1
  const len = Math.sqrt(dx * dx + dy * dy)
  if (len < 2) return [[x2, y2]]
  const nx = -dy / len, ny = dx / len   // unit normal
  const n = Math.max(2, Math.floor(len / 7))
  const pts: [number, number][] = [[x1, y1]]
  for (let i = 1; i < n; i++) {
    const t = i / n
    const j = (Math.random() - 0.5) * jitter
    pts.push([x1 + t * dx + j * nx, y1 + t * dy + j * ny])
  }
  pts.push([x2, y2])
  return pts
}

function grow(
  x: number, y: number, angle: number, length: number, depth: number,
  out: Branch[], budget: number
): void {
  if (depth > 9 || length < 3 || out.length >= budget) return
  const x2 = x + Math.cos(angle) * length
  const y2 = y + Math.sin(angle) * length
  // Jitter proportional to length so thick trunks are bolder, tips are crisp
  const jitter = Math.max(1.5, length * 0.22)
  out.push({ pts: jaggedPts(x, y, x2, y2, jitter), depth })

  // 1 branch (8%), 2 branches (67%), 3 branches (25%)
  const r = Math.random()
  const n = r < 0.08 ? 1 : r < 0.75 ? 2 : 3
  for (let i = 0; i < n; i++) {
    // Spread 30–72°; each sub-branch independent direction
    const spread = Math.PI / 6 + Math.random() * (Math.PI / 3)
    const sign = i === 0 ? 1 : i === 1 ? -1 : Math.random() < 0.5 ? 1 : -1
    const wobble = (Math.random() - 0.5) * (Math.PI / 7)
    const offset = sign * spread * (0.55 + Math.random() * 0.45) + wobble
    // Length varies widely — some branches are very short, adding organic density
    const mul = 0.38 + Math.random() * 0.34
    grow(x2, y2, angle + offset, length * mul, depth + 1, out, budget)
  }
}

interface Props {
  originX?: number  // 0–1 fraction of canvas width  (default 0.5)
  originY?: number  // 0–1 fraction of canvas height (default 0.5)
}

export default function LichtenbergAnimation({ originX = 0.5, originY = 0.5 }: Props) {
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

    const restart = () => {
      branches = []
      const cx = canvas.width * originX
      const cy = canvas.height * originY
      const initLen = Math.min(canvas.width, canvas.height) * 0.19
      const arms = 5 + Math.floor(Math.random() * 5)
      for (let i = 0; i < arms; i++) {
        const angle = (i / arms) * Math.PI * 2 + (Math.random() - 0.5) * 0.55
        grow(cx, cy, angle, initLen, 0, branches, 320)
      }
      branches.sort((a, b) => a.depth - b.depth)
      drawIdx = 0; phase = 'drawing'; phaseTimer = 0; fadeAlpha = 1
    }

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      restart()
    }

    const tick = (now: number) => {
      const dt = now - lastTime
      lastTime = now
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (phase === 'drawing') {
        drawIdx = Math.min(drawIdx + 5, branches.length)
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
        const opacity = Math.max(0.022, 0.105 - b.depth * 0.009)
        const width = Math.max(0.3, 1.45 - b.depth * 0.13)

        ctx.beginPath()
        ctx.moveTo(b.pts[0][0], b.pts[0][1])
        for (let j = 1; j < b.pts.length; j++) ctx.lineTo(b.pts[j][0], b.pts[j][1])

        ctx.shadowBlur = 4
        ctx.shadowColor = `rgba(100,255,218,${opacity * 2.2})`
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
  }, [originX, originY])

  return (
    <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} aria-hidden="true" />
  )
}
