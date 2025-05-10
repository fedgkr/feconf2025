"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import type * as THREE from "three"

interface PulsingGlowProps {
  active: boolean
  color?: string
  intensity?: number
  distance?: number
  pulseSpeed?: number
  pulseIntensity?: number
}

export default function PulsingGlow({
  active = true,
  color = "#92CBDA",
  intensity = 3,
  distance = 20,
  pulseSpeed = 1.5,
  pulseIntensity = 1,
}: PulsingGlowProps) {
  const lightRef = useRef<THREE.PointLight>(null)
  const timeRef = useRef(0)

  useFrame(({ clock }) => {
    if (lightRef.current && active) {
      timeRef.current = clock.getElapsedTime()

      // Calculate pulse effect
      const pulse = Math.sin(timeRef.current * pulseSpeed) * pulseIntensity

      // Apply to light intensity
      lightRef.current.intensity = intensity + pulse
    }
  })

  return <pointLight ref={lightRef} position={[0, 0, 0]} color={color} intensity={intensity} distance={distance} />
}
