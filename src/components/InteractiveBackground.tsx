'use client'

import { useEffect, useRef, useState } from 'react'

interface Particle {
  x: number
  y: number
  z: number
  vx: number
  vy: number
  vz: number
  size: number
  color: string
  alpha: number
  cachedColor: string // Pre-computed color with alpha
}

interface Star {
  x: number
  y: number
  z: number
  size: number
}

interface CodeChar {
  x: number
  y: number
  char: string
  speed: number
  opacity: number
}

const InteractiveBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const starsRef = useRef<Star[]>([])
  const codeCharsRef = useRef<CodeChar[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const animationFrameRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Initialize particles for nebula effect
    const initParticles = () => {
      const particles: Particle[] = []
      const colors = ['#00f5d4', '#00bbf9', '#f15bb5', '#fee440', '#9b5de5', '#06ffa5']
      
      for (let i = 0; i < 150; i++) {
        const alpha = Math.random() * 0.5 + 0.3
        const color = colors[Math.floor(Math.random() * colors.length)]
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          vz: Math.random() * 2,
          size: Math.random() * 3 + 1,
          color: color,
          alpha: alpha,
          cachedColor: `${color}${Math.floor(alpha * 255).toString(16).padStart(2, '0')}`,
        })
      }
      particlesRef.current = particles
    }

    // Initialize stars for space background
    const initStars = () => {
      const stars: Star[] = []
      for (let i = 0; i < 500; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          size: Math.random() * 2,
        })
      }
      starsRef.current = stars
    }

    // Initialize matrix code rain
    const initCodeRain = () => {
      const chars: CodeChar[] = []
      const codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|~`'
      const columns = Math.floor(canvas.width / 20)
      
      for (let i = 0; i < columns; i++) {
        chars.push({
          x: i * 20,
          y: Math.random() * canvas.height,
          char: codeChars[Math.floor(Math.random() * codeChars.length)],
          speed: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
      codeCharsRef.current = chars
    }

    initParticles()
    initStars()
    initCodeRain()

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Main animation loop
    let frameCount = 0
    const animate = () => {
      // Clear canvas every frame for better performance
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      frameCount++

      // Draw stars
      starsRef.current.forEach((star) => {
        const scale = 1000 / (1000 + star.z)
        const x = (star.x - canvas.width / 2) * scale + canvas.width / 2
        const y = (star.y - canvas.height / 2) * scale + canvas.height / 2
        const size = star.size * scale

        if (x >= 0 && x <= canvas.width && y >= 0 && y <= canvas.height) {
          ctx.fillStyle = `rgba(255, 255, 255, ${0.8 * scale})`
          ctx.beginPath()
          ctx.arc(x, y, size, 0, Math.PI * 2)
          ctx.fill()
        }

        star.z -= 2
        if (star.z <= 0) {
          star.z = 1000
          star.x = Math.random() * canvas.width
          star.y = Math.random() * canvas.height
        }
      })

      // Draw and update particles with mouse interaction
      particlesRef.current.forEach((particle) => {
        const scale = 1000 / (1000 + particle.z)
        const x = (particle.x - canvas.width / 2) * scale + canvas.width / 2
        const y = (particle.y - canvas.height / 2) * scale + canvas.height / 2
        const size = particle.size * scale

        // Mouse interaction
        const dx = mouseRef.current.x - x
        const dy = mouseRef.current.y - y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 200) {
          particle.vx += dx * 0.00005
          particle.vy += dy * 0.00005
        }

        // Create glow effect with pre-computed color
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 4)
        gradient.addColorStop(0, particle.cachedColor)
        gradient.addColorStop(0.5, `${particle.color}${Math.floor(particle.alpha * 128).toString(16).padStart(2, '0')}`)
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, size * 4, 0, Math.PI * 2)
        ctx.fill()

        // Update position
        particle.x += particle.vx
        particle.y += particle.vy
        particle.z += particle.vz

        // Wrap around
        if (particle.x < 0) particle.x = canvas.width
        if (particle.x > canvas.width) particle.x = 0
        if (particle.y < 0) particle.y = canvas.height
        if (particle.y > canvas.height) particle.y = 0
        if (particle.z > 1000) particle.z = 0
        if (particle.z < 0) particle.z = 1000

        // Damping
        particle.vx *= 0.99
        particle.vy *= 0.99
      })

      // Draw connections between close particles
      particlesRef.current.forEach((p1, i) => {
        particlesRef.current.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const dz = p1.z - p2.z
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

          if (distance < 200) {
            const scale1 = 1000 / (1000 + p1.z)
            const scale2 = 1000 / (1000 + p2.z)
            const x1 = (p1.x - canvas.width / 2) * scale1 + canvas.width / 2
            const y1 = (p1.y - canvas.height / 2) * scale1 + canvas.height / 2
            const x2 = (p2.x - canvas.width / 2) * scale2 + canvas.width / 2
            const y2 = (p2.y - canvas.height / 2) * scale2 + canvas.height / 2

            ctx.strokeStyle = `rgba(0, 245, 212, ${0.2 * (1 - distance / 200)})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(x1, y1)
            ctx.lineTo(x2, y2)
            ctx.stroke()
          }
        })
      })

      // Draw matrix code rain (render every 2nd frame for performance)
      if (frameCount % 2 === 0) {
        codeCharsRef.current.forEach((char) => {
          ctx.font = '14px monospace'
          ctx.fillStyle = `rgba(0, 245, 212, ${char.opacity})`
          ctx.fillText(char.char, char.x, char.y)

          // Update position
          char.y += char.speed
          if (char.y > canvas.height) {
            char.y = 0
            const codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|~`'
            char.char = codeChars[Math.floor(Math.random() * codeChars.length)]
          }

          // Random character change
          if (Math.random() < 0.05) {
            const codeChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*(){}[]<>/\\|~`'
            char.char = codeChars[Math.floor(Math.random() * codeChars.length)]
          }
        })
      }

      // Draw orbital rings
      const time = Date.now() * 0.0005
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2

      for (let i = 0; i < 3; i++) {
        const radius = 150 + i * 100
        const rotation = time + i * Math.PI / 3

        ctx.strokeStyle = `rgba(0, 245, 212, ${0.1 - i * 0.02})`
        ctx.lineWidth = 2
        ctx.beginPath()
        for (let angle = 0; angle <= Math.PI * 2; angle += 0.1) {
          const x = centerX + Math.cos(angle + rotation) * radius * Math.cos(rotation)
          const y = centerY + Math.sin(angle + rotation) * radius
          if (angle === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        ctx.closePath()
        ctx.stroke()

        // Draw orbiting particles
        const orbitAngle = time * (2 + i * 0.5)
        const orbitX = centerX + Math.cos(orbitAngle) * radius * Math.cos(rotation)
        const orbitY = centerY + Math.sin(orbitAngle) * radius

        const gradient = ctx.createRadialGradient(orbitX, orbitY, 0, orbitX, orbitY, 10)
        gradient.addColorStop(0, 'rgba(0, 245, 212, 0.8)')
        gradient.addColorStop(1, 'rgba(0, 245, 212, 0)')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(orbitX, orbitY, 10, 0, Math.PI * 2)
        ctx.fill()
      }

      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', handleMouseMove)
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ background: 'radial-gradient(ellipse at center, #0a0a1a 0%, #000000 100%)' }}
    />
  )
}

export default InteractiveBackground
