'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type RepoNode = {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  radius: number
  repo?: string
}

const repoNames = [
  'linux',
  'react',
  'kubernetes',
  'vscode',
  'tensorflow',
  'next.js',
  'docker',
  'git'
]

const InteractiveRepoBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const ctx = canvas.getContext('2d')
    if (!ctx) {
      return
    }

    let width = 0
    let height = 0
    let frame = 0
    let rafId = 0
    let lastTime = 0

    const pointer = { x: 0, y: 0 }

    const createNodes = () => {
      const count = width < 640 ? 18 : width < 1024 ? 28 : 40
      const nodes: RepoNode[] = []

      for (let i = 0; i < count; i += 1) {
        const z = Math.random()
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z,
          vx: (Math.random() - 0.5) * (0.12 + z * 0.2),
          vy: (Math.random() - 0.5) * (0.12 + z * 0.2),
          radius: 1 + z * 2,
          repo: i < repoNames.length ? repoNames[i] : undefined
        })
      }

      return nodes
    }

    let nodes = createNodes()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      nodes = createNodes()
    }

    const update = () => {
      const pullX = (pointer.x - width / 2) * 0.000015
      const pullY = (pointer.y - height / 2) * 0.000015

      for (const node of nodes) {
        node.x += node.vx + pullX * (1 + node.z)
        node.y += node.vy + pullY * (1 + node.z)

        if (node.x < -30) node.x = width + 30
        if (node.x > width + 30) node.x = -30
        if (node.y < -30) node.y = height + 30
        if (node.y > height + 30) node.y = -30
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      const bg = ctx.createLinearGradient(0, 0, width, height)
      bg.addColorStop(0, 'rgba(13, 18, 35, 0.92)')
      bg.addColorStop(1, 'rgba(19, 26, 50, 0.88)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, width, height)

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const distance = Math.hypot(dx, dy)
          const maxDistance = 150 - (a.z + b.z) * 35

          if (distance < maxDistance) {
            const alpha = (1 - distance / maxDistance) * (0.2 + (a.z + b.z) * 0.2)
            ctx.strokeStyle = `rgba(94, 234, 212, ${alpha})`
            ctx.lineWidth = 0.4 + Math.min(a.z, b.z) * 0.8
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const node of nodes) {
        const glow = 8 + node.z * 14
        const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glow)
        gradient.addColorStop(0, `rgba(165, 180, 252, ${0.32 + node.z * 0.25})`)
        gradient.addColorStop(1, 'rgba(59, 130, 246, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(node.x, node.y, glow, 0, Math.PI * 2)
        ctx.fill()

        ctx.fillStyle = `rgba(224, 231, 255, ${0.6 + node.z * 0.3})`
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduceMotion && width >= 960) {
        ctx.font = '500 12px Poppins, sans-serif'
        ctx.fillStyle = 'rgba(186, 230, 253, 0.45)'

        for (let i = 0; i < repoNames.length && i < nodes.length; i += 1) {
          const node = nodes[i]
          const swayX = Math.sin(frame * 0.004 + i) * 6
          const swayY = Math.cos(frame * 0.004 + i) * 5
          ctx.fillText(repoNames[i], node.x + 10 + swayX, node.y - 10 + swayY)
        }
      }
    }

    const loop = (time: number) => {
      if (time - lastTime >= 33) {
        frame += 1
        update()
        draw()
        lastTime = time
      }
      rafId = window.requestAnimationFrame(loop)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = event.clientX
      pointer.y = event.clientY
    }

    resize()
    draw()

    if (!reduceMotion) {
      rafId = window.requestAnimationFrame(loop)
      window.addEventListener('pointermove', onPointerMove, { passive: true })
    }

    window.addEventListener('resize', resize)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
    }
  }, [reduceMotion])

  return (
    <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}

export default InteractiveRepoBackground
