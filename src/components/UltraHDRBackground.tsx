'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { UltraHDRLoader } from 'three/addons/loaders/UltraHDRLoader.js'

const HDR_TEXTURE_URL =
  'https://threejs.org/examples/textures/equirectangular/spruit_sunrise_2k.hdr.jpg'

const UltraHDRBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current

    if (!container) {
      return
    }

    let disposed = false
    let environmentTexture: THREE.Texture | null = null
    let renderer: THREE.WebGLRenderer

    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false })
    } catch {
      return
    }

    const scene = new THREE.Scene()
    scene.background = new THREE.Color('#050607')
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 10)
    camera.position.set(0, 1.3, 6.2)
    camera.lookAt(0, 0.2, 0)

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 0.8
    renderer.outputColorSpace = THREE.SRGBColorSpace
    container.appendChild(renderer.domElement)

    const sceneContent = new THREE.Group()
    scene.add(sceneContent)

    const keyLight = new THREE.DirectionalLight(0xd8eee8, 4.2)
    keyLight.position.set(-3, 5, 4)
    scene.add(keyLight)
    const rimLight = new THREE.PointLight(0x7cbdb5, 34, 12)
    rimLight.position.set(3, 1.8, -2)
    scene.add(rimLight)
    scene.add(new THREE.AmbientLight(0x69706e, 1.1))

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(200, 200),
      new THREE.MeshStandardMaterial({ color: 0x111414, roughness: 0.34, metalness: 0.62 })
    )
    floor.rotation.x = -Math.PI / 2
    floor.position.y = -1.18
    sceneContent.add(floor)

    const floorGrid = new THREE.GridHelper(70, 70, 0x3c5b56, 0x202c2a)
    floorGrid.position.y = -1.16
    const gridMaterial = floorGrid.material as THREE.Material
    gridMaterial.transparent = true
    gridMaterial.opacity = 0.25
    sceneContent.add(floorGrid)

    const object = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.9, 0.24, 180, 24, 2, 3),
      new THREE.MeshPhysicalMaterial({
        color: 0xadc7bd,
        metalness: 0.88,
        roughness: 0.2,
        clearcoat: 0.9,
        clearcoatRoughness: 0.14,
        envMapIntensity: 1.3,
      })
    )
    object.position.set(2.2, 0.2, -0.35)
    object.rotation.set(0.38, -0.5, 0.18)
    object.scale.set(1.15, 1.15, 1.15)
    sceneContent.add(object)

    const halo = new THREE.Mesh(
      new THREE.TorusGeometry(1.65, 0.012, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0x92c7b8, transparent: true, opacity: 0.44 })
    )
    halo.position.copy(object.position)
    halo.rotation.set(1.1, 0.2, -0.35)
    sceneContent.add(halo)

    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    const onPointerMove = (event: PointerEvent) => {
      const bounds = container.getBoundingClientRect()
      target.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2
      target.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2
    }
    container.addEventListener('pointermove', onPointerMove, { passive: true })
    let frame = 0

    const resize = () => {
      const { clientWidth, clientHeight } = container
      if (clientWidth === 0 || clientHeight === 0) return
      camera.aspect = clientWidth / clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(clientWidth, clientHeight, false)
      renderer.render(scene, camera)
    }

    const loader = new UltraHDRLoader()
    loader.setDataType(THREE.HalfFloatType)
    loader.load(
      HDR_TEXTURE_URL,
      (texture) => {
        if (disposed) {
          texture.dispose()
          return
        }

        environmentTexture = texture
        texture.mapping = THREE.EquirectangularReflectionMapping
        scene.environment = texture
        renderer.render(scene, camera)
      },
      undefined,
      () => {
        // Keep the CSS image fallback visible when the remote HDR asset cannot load.
      }
    )

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(container)
    resize()

    const animate = () => {
      frame = window.requestAnimationFrame(animate)
      pointer.x += (target.x - pointer.x) * 0.035
      pointer.y += (target.y - pointer.y) * 0.035
      object.rotation.y += 0.0018
      object.rotation.x = 0.38 + pointer.y * 0.12
      object.rotation.y += pointer.x * 0.001
      halo.rotation.y -= 0.001
      sceneContent.position.x = pointer.x * -0.12
      renderer.render(scene, camera)
    }
    animate()

    return () => {
      disposed = true
      window.cancelAnimationFrame(frame)
      container.removeEventListener('pointermove', onPointerMove)
      resizeObserver.disconnect()
      environmentTexture?.dispose()
      floor.geometry.dispose()
      ;(floor.material as THREE.Material).dispose()
      floorGrid.geometry.dispose()
      ;(floorGrid.material as THREE.Material).dispose()
      object.geometry.dispose()
      ;(object.material as THREE.Material).dispose()
      halo.geometry.dispose()
      ;(halo.material as THREE.Material).dispose()
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: `url("${HDR_TEXTURE_URL}")`,
      }}
    />
  )
}

export default UltraHDRBackground
