'use client'

import { useRef, useEffect, useState, useMemo, useCallback, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei'
import { useScrollStore, getCarState, lerpCarState } from './carStore'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

function CarModel() {
  const groupRef = useRef<THREE.Group>(null)
  const { currentSection, prevSection, sectionProgress } = useScrollStore()
  const [hovered, setHovered] = useState(false)
  const meshRefs = useRef<THREE.Mesh[]>([])

  // Compute interpolated state
  const carState = useMemo(() => {
    const fromState = getCarState(prevSection)
    const toState = getCarState(currentSection)
    if (prevSection === currentSection) return toState
    // Smooth easing
    const t = Math.min(1, sectionProgress * 1.5)
    const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
    return lerpCarState(fromState, toState, eased)
  }, [currentSection, sectionProgress, prevSection])

  // Subtle CTA drive-forward animation
  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Base rotation from car state
    groupRef.current.rotation.x = carState.rotation[0]
    groupRef.current.rotation.z = carState.rotation[2]

    // Auto-rotate around Y axis
    if (carState.autoRotate) {
      groupRef.current.rotation.y += carState.autoRotateSpeed * delta
    } else {
      groupRef.current.rotation.y = carState.rotation[1]
    }

    // Position interpolation
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      carState.position[0],
      0.05
    )
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      carState.position[1],
      0.05
    )
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      carState.position[2],
      0.05
    )

    // Scale interpolation
    const targetScale = hovered ? carState.scale * 1.02 : carState.scale
    groupRef.current.scale.setScalar(THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.05))

    // Subtle floating for gap section
    if (currentSection === 'gap') {
      groupRef.current.position.y += Math.sin(state.clock.elapsedTime * 0.8) * 0.003
    }

    // CTA drive forward animation
    if (currentSection === 'cta') {
      const driveOffset = Math.sin(state.clock.elapsedTime * 0.3) * 0.02
      groupRef.current.position.z = carState.position[2] + driveOffset
    }

    // Update all meshes
    meshRefs.current.forEach((mesh) => {
      const mat = mesh.material as THREE.MeshStandardMaterial
      if (!mat) return

      mat.wireframe = carState.wireframe > 0.3
      mat.opacity = THREE.MathUtils.lerp(mat.opacity, carState.opacity, 0.05)
      mat.transparent = carState.opacity < 0.99

      mat.metalness = THREE.MathUtils.lerp(mat.metalness, carState.metalness, 0.05)
      mat.roughness = THREE.MathUtils.lerp(mat.roughness, carState.roughness, 0.05)

      if (mat.emissive) {
        mat.emissiveIntensity = THREE.MathUtils.lerp(
          mat.emissiveIntensity,
          carState.emissiveIntensity,
          0.05
        )
      }

      // Color tint
      if (mat.color) {
        mat.color.lerp(
          new THREE.Color(carState.colorTint[0], carState.colorTint[1], carState.colorTint[2]),
          0.05
        )
      }
    })
  })

  const setupScene = useCallback((scene: THREE.Group) => {
    // Center and scale the model
    const box = new THREE.Box3().setFromObject(scene)
    const center = box.getCenter(new THREE.Vector3())
    const size = box.getSize(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z)
    const scale = 2.5 / maxDim

    scene.position.sub(center.multiplyScalar(1))
    scene.scale.setScalar(scale)
    scene.position.y -= 0.3

    // Set up materials on all meshes
    meshRefs.current = []
    scene.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh
        meshRefs.current.push(mesh)

        const mat = mesh.material as THREE.MeshStandardMaterial
        if (mat && mat.isMeshStandardMaterial) {
          mat.envMapIntensity = 1.0
          if (mat.emissive) {
            mat.emissive = new THREE.Color('#00D4FF')
            mat.emissiveIntensity = 0
          }
        }
      }
    })
  }, [meshRefs])

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <CarMeshLoader onLoaded={setupScene} />
    </group>
  )
}

function CarMeshLoader({ onLoaded }: { onLoaded: (scene: THREE.Group) => void }) {
  const [gltf, setGltf] = useState<THREE.Group | null>(null)
  const onLoadedRef = useRef(onLoaded)
  onLoadedRef.current = onLoaded

  useEffect(() => {
    let cancelled = false

    const loadModel = async () => {
      try {
        const dracoLoader = new DRACOLoader()
        dracoLoader.setDecoderPath('/draco/')
        const loader = new GLTFLoader()
        loader.setDRACOLoader(dracoLoader)
        loader.load(
          '/models/CarConcept.glb',
          (loaded) => {
            if (cancelled) return
            onLoadedRef.current(loaded.scene)
            setGltf(loaded.scene)
          },
          undefined,
          (error) => {
            console.error('Error loading GLB:', error)
          }
        )
      } catch (e) {
        console.error('Failed to load GLB:', e)
      }
    }
    loadModel()

    return () => {
      cancelled = true
    }
  }, [])

  if (!gltf) {
    // Loading placeholder
    return (
      <mesh>
        <boxGeometry args={[2, 0.8, 4]} />
        <meshStandardMaterial color="#222" wireframe opacity={0.3} transparent />
      </mesh>
    )
  }

  return <primitive object={gltf} />
}

function SceneSetup() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#ffffff"
        castShadow={false}
      />
      <directionalLight
        position={[-5, 3, -5]}
        intensity={0.4}
        color="#00D4FF"
      />
      <pointLight position={[0, 2, 3]} intensity={0.5} color="#FFD000" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.8}
        color="#ffffff"
      />

      {/* Environment for reflections */}
      <Environment preset="city" />

      {/* Contact shadow */}
      <ContactShadows
        position={[0, -1.1, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
        color="#000000"
      />

      {/* Grid floor */}
      <gridHelper args={[20, 40, '#1a1a1a', '#1a1a1a']} position={[0, -1.1, 0]} />

      {/* Car */}
      <CarModel />

      {/* Controls */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={10}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.2}
        autoRotate={false}
        dampingFactor={0.05}
        enableDamping
      />
    </>
  )
}

export default function CarCanvas() {
  return (
    <div className="car-canvas-container w-full h-full absolute inset-0">
      <Canvas
        camera={{ position: [4, 2.5, 5], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.0,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <SceneSetup />
        </Suspense>
      </Canvas>
    </div>
  )
}
