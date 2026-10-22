'use client'

import { useEffect, useRef } from 'react'

type VantaEffect = {
  destroy: () => void
}

declare global {
  interface Window {
    VANTA?: {
      NET?: (options: Record<string, unknown>) => VantaEffect
    }
  }
}

const VantaNetBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const effectRef = useRef<VantaEffect | null>(null)

  useEffect(() => {
    const container = containerRef.current
    const net = window.VANTA?.NET

    if (!container || !net) {
      return
    }

    effectRef.current = net({
      el: container,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      color: 0x73d4c2,
      backgroundColor: 0x101a1e,
      points: 9,
      maxDistance: 22,
      spacing: 18,
      showDots: true,
    })

    return () => {
      effectRef.current?.destroy()
      effectRef.current = null
    }
  }, [])

  return <div ref={containerRef} aria-hidden className="absolute inset-0 -z-10" />
}

export default VantaNetBackground