'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type ThreeLike = {
  Scene: new () => {
    add: (...objects: unknown[]) => void
  }
  PerspectiveCamera: new (fov: number, aspect: number, near: number, far: number) => {
    position: { z: number; y: number }
    updateProjectionMatrix: () => void
  }
  WebGLRenderer: new (options: { antialias: boolean; alpha: boolean }) => {
    domElement: HTMLCanvasElement
    setPixelRatio: (ratio: number) => void
    setSize: (width: number, height: number) => void
    setClearColor: (color: number, alpha?: number) => void
    render: (scene: unknown, camera: unknown) => void
    dispose: () => void
  }
  Group: new () => {
    add: (...objects: unknown[]) => void
    children: Array<{
      position: { x: number; y: number; z: number }
      rotation: { x: number; y: number; z: number }
      scale: { setScalar: (value: number) => void }
    }>
    rotation: { x: number; y: number; z: number }
  }
  AmbientLight: new (color: number, intensity?: number) => unknown
  DirectionalLight: new (color: number, intensity?: number) => {
    position: { set: (x: number, y: number, z: number) => void }
  }
  Color: new (value: string | number) => unknown
  Mesh: new (geometry: unknown, material: unknown) => {
    position: { x: number; y: number; z: number }
    rotation: { x: number; y: number; z: number }
    scale: { setScalar: (value: number) => void }
  }
  MeshPhysicalMaterial: new (params: Record<string, unknown>) => unknown
  MeshStandardMaterial: new (params: Record<string, unknown>) => unknown
  MeshBasicMaterial: new (params: Record<string, unknown>) => unknown
  IcosahedronGeometry: new (radius: number, detail?: number) => unknown
  TorusKnotGeometry: new (radius: number, tube: number, tubularSegments?: number, radialSegments?: number) => unknown
  TorusGeometry: new (radius: number, tube: number, radialSegments?: number, tubularSegments?: number) => unknown
  OctahedronGeometry: new (radius: number, detail?: number) => unknown
  BoxGeometry: new (width: number, height: number, depth: number) => unknown
  PlaneGeometry: new (width: number, height: number, widthSegments?: number, heightSegments?: number) => {
    attributes: {
      position: {
        count: number
        getX: (index: number) => number
        getY: (index: number) => number
        setZ: (index: number, value: number) => void
        needsUpdate: boolean
      }
    }
  }
}

declare global {
  interface Window {
    THREE?: ThreeLike
  }
}

type Variant = 'hero' | 'projects' | 'about' | 'videos' | 'sponsor' | 'contact'

type Props = {
  variant: Variant
}

type DeformablePlane = {
  geometry: {
    attributes: {
      position: {
        count: number
        getX: (index: number) => number
        getY: (index: number) => number
        setZ: (index: number, value: number) => void
        needsUpdate: boolean
      }
    }
  }
}

const paletteMap: Record<Variant, { a: string; b: string; c: string }> = {
  hero: { a: '#34d399', b: '#38bdf8', c: '#67e8f9' },
  projects: { a: '#818cf8', b: '#22d3ee', c: '#93c5fd' },
  about: { a: '#22d3ee', b: '#a5b4fc', c: '#67e8f9' },
  videos: { a: '#f59e0b', b: '#22d3ee', c: '#38bdf8' },
  sponsor: { a: '#f472b6', b: '#f9a8d4', c: '#93c5fd' },
  contact: { a: '#22d3ee', b: '#60a5fa', c: '#a78bfa' },
}

const SectionThreeBackground = ({ variant }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    let rafId = 0
    let cleanup: (() => void) | null = null
    const container = containerRef.current

    if (!container) {
      return
    }

    const boot = () => {
      const THREE = window.THREE

      if (!THREE) {
        rafId = window.requestAnimationFrame(boot)
        return
      }

      const scene = new THREE.Scene()
      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      const camera = new THREE.PerspectiveCamera(52, 1, 0.1, 120)
      const group = new THREE.Group()
      const accent = paletteMap[variant]

      camera.position.z = 8
      camera.position.y = 0.2

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6))
      renderer.setClearColor(0x000000, 0)
      container.appendChild(renderer.domElement)

      const ambient = new THREE.AmbientLight(0xffffff, 0.62)
      const key = new THREE.DirectionalLight(0xffffff, 1.2)
      key.position.set(5, 6, 8)
      const fill = new THREE.DirectionalLight(0x7dd3fc, 0.48)
      fill.position.set(-7, -2, 6)

      scene.add(ambient)
      scene.add(key)
      scene.add(fill)
      scene.add(group)

      const objects: Array<{
        position: { x: number; y: number; z: number }
        rotation: { x: number; y: number; z: number }
        scale?: { setScalar: (value: number) => void }
      }> = []

      if (variant === 'hero') {
        const core = new THREE.Mesh(
          new THREE.IcosahedronGeometry(1.45, 8),
          new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(accent.a),
            roughness: 0.18,
            metalness: 0.82,
            transmission: 0.08,
            clearcoat: 0.7,
            emissive: new THREE.Color(accent.b),
            emissiveIntensity: 0.15,
            wireframe: true,
            transparent: true,
            opacity: 0.65,
          })
        )
        group.add(core)
        objects.push(core)
      }

      if (variant === 'about') {
        const knot = new THREE.Mesh(
          new THREE.TorusKnotGeometry(1.3, 0.38, 170, 22),
          new THREE.MeshStandardMaterial({
            color: new THREE.Color(accent.b),
            wireframe: true,
            transparent: true,
            opacity: 0.5,
            metalness: 0.7,
            roughness: 0.3,
          })
        )
        group.add(knot)
        objects.push(knot)
      }

      if (variant === 'projects') {
        for (let i = 0; i < 28; i += 1) {
          const box = new THREE.Mesh(
            new THREE.BoxGeometry(0.38, 0.38, 0.38),
            new THREE.MeshStandardMaterial({
              color: new THREE.Color(i % 2 === 0 ? accent.a : accent.b),
              transparent: true,
              opacity: 0.32,
              metalness: 0.82,
              roughness: 0.24,
            })
          )
          box.position.x = (Math.random() - 0.5) * 7.5
          box.position.y = (Math.random() - 0.5) * 4.8
          box.position.z = (Math.random() - 0.5) * 4.5
          group.add(box)
          objects.push(box)
        }
      }

      if (variant === 'videos') {
        for (let i = 0; i < 4; i += 1) {
          const ring = new THREE.Mesh(
            new THREE.TorusGeometry(1.25 + i * 0.42, 0.06 + i * 0.015, 18, 200),
            new THREE.MeshStandardMaterial({
              color: new THREE.Color(i % 2 === 0 ? accent.a : accent.c),
              emissive: new THREE.Color(accent.b),
              emissiveIntensity: 0.12,
              transparent: true,
              opacity: 0.4 - i * 0.07,
              metalness: 0.62,
              roughness: 0.28,
            })
          )
          ring.rotation.x = Math.PI * (0.2 + i * 0.12)
          ring.rotation.y = i * 0.45
          group.add(ring)
          objects.push(ring)
        }
      }

      if (variant === 'sponsor') {
        for (let i = 0; i < 18; i += 1) {
          const gem = new THREE.Mesh(
            new THREE.OctahedronGeometry(0.24 + Math.random() * 0.28, 0),
            new THREE.MeshPhysicalMaterial({
              color: new THREE.Color(i % 3 === 0 ? accent.a : i % 3 === 1 ? accent.b : accent.c),
              transparent: true,
              opacity: 0.45,
              transmission: 0.18,
              roughness: 0.2,
              metalness: 0.56,
            })
          )
          gem.position.x = (Math.random() - 0.5) * 7.2
          gem.position.y = (Math.random() - 0.5) * 4.8
          gem.position.z = (Math.random() - 0.5) * 3.2
          group.add(gem)
          objects.push(gem)
        }
      }

      let plane: DeformablePlane | null = null

      if (variant === 'contact') {
        const contactPlane = new THREE.Mesh(
          new THREE.PlaneGeometry(11.5, 7.2, 48, 30),
          new THREE.MeshBasicMaterial({
            color: new THREE.Color(accent.b),
            wireframe: true,
            transparent: true,
            opacity: 0.22,
          })
        )
        contactPlane.rotation.x = -0.45
        contactPlane.position.z = -0.8
        group.add(contactPlane)
        plane = contactPlane as unknown as DeformablePlane
      }

      const resize = () => {
        const width = Math.max(container.clientWidth, 10)
        const height = Math.max(container.clientHeight, 10)
        renderer.setSize(width, height)
        camera.position.z = width < 640 ? 9.6 : 8
        camera.updateProjectionMatrix()
        camera.position.y = height < 520 ? 0.35 : 0.2
        ;(camera as unknown as { aspect: number }).aspect = width / height
      }

      resize()

      let frame = 0
      const runFrame = () => {
        frame += 1

        group.rotation.y += 0.0018
        group.rotation.x = Math.sin(frame * 0.003) * 0.08

        if (variant === 'projects' || variant === 'sponsor') {
          objects.forEach((obj, index) => {
            obj.rotation.x += 0.003 + index * 0.00006
            obj.rotation.y += 0.002 + index * 0.00005
          })
        } else {
          objects.forEach((obj, index) => {
            obj.rotation.y += 0.0025 + index * 0.00006
          })
        }

        if (variant === 'videos') {
          objects.forEach((obj, index) => {
            obj.rotation.z += 0.0008 + index * 0.0004
          })
        }

        if (variant === 'sponsor') {
          objects.forEach((obj, index) => {
            if (obj.scale) {
              obj.scale.setScalar(0.85 + Math.sin(frame * 0.02 + index) * 0.22)
            }
          })
        }

        if (variant === 'contact' && plane) {
          const position = plane.geometry.attributes.position
          for (let i = 0; i < position.count; i += 1) {
            const x = position.getX(i)
            const y = position.getY(i)
            position.setZ(i, Math.sin(x * 1.25 + frame * 0.03) * 0.16 + Math.cos(y * 1.3 + frame * 0.025) * 0.12)
          }
          position.needsUpdate = true
        }

        renderer.render(scene, camera)

        if (!reduceMotion) {
          rafId = window.requestAnimationFrame(runFrame)
        }
      }

      if (reduceMotion) {
        runFrame()
      } else {
        rafId = window.requestAnimationFrame(runFrame)
      }

      const onResize = () => resize()
      window.addEventListener('resize', onResize)

      cleanup = () => {
        window.removeEventListener('resize', onResize)
        if (rafId) {
          window.cancelAnimationFrame(rafId)
        }
        renderer.dispose()
        renderer.domElement.remove()
      }
    }

    boot()

    return () => {
      if (rafId) {
        window.cancelAnimationFrame(rafId)
      }
      if (cleanup) {
        cleanup()
      }
    }
  }, [reduceMotion, variant])

  return <div ref={containerRef} aria-hidden className="absolute inset-0 z-0 pointer-events-none" />
}

export default SectionThreeBackground
