'use client'

import { useEffect, useRef, useState } from 'react'

interface Planet {
  x: number
  y: number
  radius: number
  color: string
  speed: number
  angle: number
  orbitRadius: number
}

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const planetsRef = useRef<Planet[]>([])
  const starsRef = useRef<{ x: number; y: number; size: number }[]>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Set canvas size
    const updateCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Initialize stars
    if (starsRef.current.length === 0) {
      for (let i = 0; i < 200; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: Math.random() * 2,
        })
      }
    }

    // Initialize planets
    if (planetsRef.current.length === 0) {
      planetsRef.current = [
        {
          x: canvas.width * 0.2,
          y: canvas.height * 0.3,
          radius: 60,
          color: '#ff6b6b',
          speed: 0.001,
          angle: 0,
          orbitRadius: 50,
        },
        {
          x: canvas.width * 0.7,
          y: canvas.height * 0.4,
          radius: 80,
          color: '#4ecdc4',
          speed: 0.0015,
          angle: Math.PI,
          orbitRadius: 40,
        },
        {
          x: canvas.width * 0.5,
          y: canvas.height * 0.7,
          radius: 50,
          color: '#95e1d3',
          speed: 0.002,
          angle: Math.PI / 2,
          orbitRadius: 60,
        },
        {
          x: canvas.width * 0.8,
          y: canvas.height * 0.8,
          radius: 40,
          color: '#f38181',
          speed: 0.0012,
          angle: Math.PI * 1.5,
          orbitRadius: 30,
        },
        {
          x: canvas.width * 0.3,
          y: canvas.height * 0.6,
          radius: 35,
          color: '#aa96da',
          speed: 0.0018,
          angle: Math.PI / 4,
          orbitRadius: 45,
        },
      ]
    }

    // Animation loop
    let animationFrameId: number

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 1)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw stars
      starsRef.current.forEach((star) => {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'
        ctx.beginPath()
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        ctx.fill()
      })

      // Update and draw planets
      planetsRef.current.forEach((planet, index) => {
        // Update orbit angle
        planet.angle += planet.speed

        // Calculate new position based on orbit
        const centerX = canvas.width * (0.2 + index * 0.15)
        const centerY = canvas.height * (0.3 + index * 0.1)
        
        planet.x = centerX + Math.cos(planet.angle) * planet.orbitRadius
        planet.y = centerY + Math.sin(planet.angle) * planet.orbitRadius

        // Mouse interaction - planets move away from mouse
        const dx = planet.x - mousePos.x
        const dy = planet.y - mousePos.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          planet.x += (dx / distance) * force * 20
          planet.y += (dy / distance) * force * 20
        }

        // Draw planet glow
        const gradient = ctx.createRadialGradient(
          planet.x,
          planet.y,
          planet.radius * 0.5,
          planet.x,
          planet.y,
          planet.radius * 1.5
        )
        gradient.addColorStop(0, planet.color)
        gradient.addColorStop(0.5, planet.color + '88')
        gradient.addColorStop(1, planet.color + '00')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(planet.x, planet.y, planet.radius * 1.5, 0, Math.PI * 2)
        ctx.fill()

        // Draw planet
        ctx.fillStyle = planet.color
        ctx.beginPath()
        ctx.arc(planet.x, planet.y, planet.radius, 0, Math.PI * 2)
        ctx.fill()

        // Add planet details (craters/shadows)
        ctx.fillStyle = 'rgba(0, 0, 0, 0.2)'
        ctx.beginPath()
        ctx.arc(planet.x + planet.radius * 0.3, planet.y + planet.radius * 0.3, planet.radius * 0.7, 0, Math.PI * 2)
        ctx.fill()
      })

      // Draw connections between planets
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1
      for (let i = 0; i < planetsRef.current.length; i++) {
        for (let j = i + 1; j < planetsRef.current.length; j++) {
          const p1 = planetsRef.current[i]
          const p2 = planetsRef.current[j]
          const dist = Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
          
          if (dist < 400) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [mousePos])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY })
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      className="fixed top-0 left-0 w-full h-full -z-10"
      style={{ background: '#000000' }}
    />
  )
}
