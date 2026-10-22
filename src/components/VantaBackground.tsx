'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type VantaEffect = { destroy: () => void }
type VantaFactory = (options: Record<string, unknown>) => VantaEffect

type VisualRuntime = Window & {
  THREE?: unknown
  VANTA?: Record<string, VantaFactory>
  p5?: unknown
}

type VantaKind = 'CELLS' | 'GLOBE' | 'DOTS' | 'TRUNK' | 'TOPOLOGY' | 'NET'

type Props = {
  effect: VantaKind
  color?: number
  className?: string
}

const scriptPromises = new Map<string, Promise<void>>()
const threeUrl = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js'
const p5Url = 'https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.1.9/p5.min.js'

function loadScript(src: string) {
  const existing = scriptPromises.get(src)
  if (existing) return existing

  const promise = new Promise<void>((resolve, reject) => {
    const loaded = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
    if (loaded?.dataset.loaded === 'true') {
      resolve()
      return
    }

    const script = loaded ?? document.createElement('script')
    const onLoad = () => {
      script.dataset.loaded = 'true'
      resolve()
    }
    const onError = () => {
      script.remove()
      scriptPromises.delete(src)
      reject(new Error(`Could not load visual background dependency: ${src}`))
    }

    script.addEventListener('load', onLoad, { once: true })
    script.addEventListener('error', onError, { once: true })
    if (!loaded) {
      script.src = src
      script.async = true
      document.head.appendChild(script)
    }
  })

  scriptPromises.set(src, promise)
  return promise
}

const VantaBackground = ({ effect, color = 0x48b5d0, className = '' }: Props) => {
  const hostRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    const host = hostRef.current
    if (!host || reduceMotion) return

    let cancelled = false
    let instance: VantaEffect | undefined

    const initialize = async () => {
      try {
        const runtime = window as VisualRuntime
        if (effect === 'TRUNK' || effect === 'TOPOLOGY') {
          if (!runtime.p5) await loadScript(p5Url)
        } else if (!runtime.THREE) {
          await loadScript(threeUrl)
        }

        const file = effect.toLowerCase()
        if (!runtime.VANTA?.[effect]) {
          await loadScript(`https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.${file}.min.js`)
        }
        const factory = runtime.VANTA?.[effect]
        if (cancelled || !factory) return

        instance = factory({
          el: host,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200,
          minWidth: 200,
          scale: 1,
          scaleMobile: 0.65,
          color,
          backgroundColor: 0x050608,
          points: effect === 'NET' ? 9 : undefined,
          maxDistance: effect === 'NET' ? 22 : undefined,
          spacing: effect === 'DOTS' ? 22 : undefined,
          size: effect === 'CELLS' ? 1.2 : undefined,
          showDots: effect === 'TOPOLOGY' ? false : undefined,
        })
      } catch {
        // Leave the section's CSS background in place when a CDN is unavailable.
      }
    }

    void initialize()
    return () => {
      cancelled = true
      instance?.destroy()
    }
  }, [color, effect, reduceMotion])

  return <div ref={hostRef} aria-hidden="true" className={`vanta-background ${className}`} />
}

export default VantaBackground
