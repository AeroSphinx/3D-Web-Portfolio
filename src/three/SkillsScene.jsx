import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Text, Float } from '@react-three/drei'
import * as THREE from 'three'

const SKILLS = [
  'React', 'Node.js', 'TypeScript', 'Three.js',
  'Python', 'GraphQL', 'MongoDB', 'PostgreSQL',
  'Docker', 'AWS', 'Next.js', 'Tailwind',
]

function SkillsGlobe() {
  const groupRef = useRef()

  const positions = useMemo(() => {
    return SKILLS.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / SKILLS.length)
      const theta = Math.sqrt(SKILLS.length * Math.PI) * phi
      const r = 2.2
      return new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.cos(phi),
        r * Math.sin(phi) * Math.sin(theta),
      )
    })
  }, [])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Wireframe sphere guide */}
      <mesh>
        <sphereGeometry args={[2.2, 20, 20]} />
        <meshStandardMaterial
          color="#f97316"
          wireframe
          transparent
          opacity={0.04}
        />
      </mesh>

      {/* Skill labels */}
      {SKILLS.map((skill, i) => (
        <Float key={skill} speed={1} floatIntensity={0.2}>
          <Text
            position={positions[i]}
            fontSize={0.18}
            color="#f97316"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/dmMono/v14/aFTR7PB1QTsUX8KYth-orYataIf4.woff"
          >
            {skill}
          </Text>
        </Float>
      ))}

      {/* Center glow sphere */}
      <mesh>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </group>
  )
}

export default function SkillsScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 3, 3]} intensity={2} color="#f97316" />
      <pointLight position={[-3, -3, -3]} intensity={1} color="#ea580c" />
      <SkillsGlobe />
    </Canvas>
  )
}
