import React, { useRef, useMemo, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshDistortMaterial, Sphere, TorusKnot, Stars, Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

// ─── Orbiting Rings ───────────────────────────────────────────────────────────
function OrbitRing({ radius, rotSpeed, color, tilt = 0 }) {
  const ref = useRef()
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * rotSpeed
    if (ref.current) ref.current.rotation.x += delta * rotSpeed * 0.3
  })
  return (
    <mesh ref={ref} rotation={[tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.008, 16, 120]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
        transparent
        opacity={0.6}
      />
    </mesh>
  )
}

// ─── Particle Sphere ──────────────────────────────────────────────────────────
function ParticleOrb({ count = 800 }) {
  const ref = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 1.6 + Math.random() * 0.4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3]     = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" array={positions} count={count} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color="#f97316"
        sizeAttenuation
        transparent
        opacity={0.5}
      />
    </points>
  )
}

// ─── Core Orb ─────────────────────────────────────────────────────────────────
function CoreOrb() {
  const orbRef = useRef()
  const innerRef = useRef()

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (orbRef.current) {
      orbRef.current.rotation.x = t * 0.12
      orbRef.current.rotation.y = t * 0.18
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.09
      innerRef.current.rotation.y = -t * 0.14
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <group>
        {/* Inner glowing core */}
        <mesh ref={innerRef}>
          <icosahedronGeometry args={[0.65, 4]} />
          <MeshDistortMaterial
            color="#f97316"
            emissive="#ea580c"
            emissiveIntensity={0.4}
            distort={0.3}
            speed={2}
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>

        {/* Outer wireframe shell */}
        <mesh ref={orbRef}>
          <icosahedronGeometry args={[0.85, 1]} />
          <meshStandardMaterial
            color="#f97316"
            emissive="#f97316"
            emissiveIntensity={0.15}
            wireframe
            transparent
            opacity={0.25}
          />
        </mesh>

        {/* Glow halo */}
        <mesh>
          <sphereGeometry args={[1.05, 32, 32]} />
          <meshStandardMaterial
            color="#f97316"
            emissive="#f97316"
            emissiveIntensity={0.05}
            transparent
            opacity={0.04}
            side={THREE.BackSide}
          />
        </mesh>
      </group>
    </Float>
  )
}

// ─── Floating Micro-Cubes ─────────────────────────────────────────────────────
function FloatingDebris({ count = 12 }) {
  const meshes = useMemo(() => (
    Array.from({ length: count }, (_, i) => ({
      id: i,
      position: [
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 4,
        (Math.random() - 0.5) * 4 - 2,
      ],
      rotation: [Math.random() * Math.PI, Math.random() * Math.PI, 0],
      scale: 0.04 + Math.random() * 0.08,
      speed: 0.2 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
    }))
  ), [count])

  return (
    <>
      {meshes.map(({ id, position, rotation, scale, speed, phase }) => (
        <DebrisMesh
          key={id}
          position={position}
          rotation={rotation}
          scale={scale}
          speed={speed}
          phase={phase}
        />
      ))}
    </>
  )
}

function DebrisMesh({ position, rotation, scale, speed, phase }) {
  const ref = useRef()
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x += 0.005 * speed
      ref.current.rotation.y += 0.008 * speed
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed + phase) * 0.3
    }
  })
  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color="#f97316"
        emissive="#f97316"
        emissiveIntensity={1}
        wireframe
        transparent
        opacity={0.4}
      />
    </mesh>
  )
}

// ─── Main 3D Scene ────────────────────────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 60 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <Suspense fallback={null}>
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.5} color="#fff" />
        <pointLight position={[2, 2, 2]} intensity={3} color="#f97316" />
        <pointLight position={[-3, -2, -2]} intensity={1.5} color="#ea580c" />
        <pointLight position={[0, 0, 3]} intensity={2} color="#fb923c" />

        {/* Stars background */}
        <Stars radius={80} depth={40} count={3000} factor={3} saturation={0} fade speed={0.5} />

        {/* Orbiting rings */}
        <OrbitRing radius={1.6} rotSpeed={0.25} color="#f97316" tilt={0.4} />
        <OrbitRing radius={2.1} rotSpeed={-0.18} color="#ea580c" tilt={1.1} />
        <OrbitRing radius={2.5} rotSpeed={0.12} color="#fb923c" tilt={0.8} />

        {/* Particle cloud */}
        <ParticleOrb count={700} />

        {/* Core object */}
        <CoreOrb />

        {/* Floating debris */}
        <FloatingDebris count={14} />
      </Suspense>
    </Canvas>
  )
}
