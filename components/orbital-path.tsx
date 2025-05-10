"use client"

import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface OrbitalPathProps {
  radius: number
  tilt: number
  rotation: number
  color: string
  thickness?: number
  segments?: number
  opacity?: number
  dashSize?: number
  gapSize?: number
  animate?: boolean
  animationSpeed?: number
}

export default function OrbitalPath({
  radius,
  tilt = 0,
  rotation = 0,
  color = "#4fc3f7",
  thickness = 0.03,
  segments = 128,
  opacity = 0.5,
  dashSize = 0.5,
  gapSize = 0.2,
  animate = true,
  animationSpeed = 0.1,
}: OrbitalPathProps) {
  const pathRef = useRef<THREE.Line>(null)
  const materialRef = useRef<THREE.LineDashedMaterial>(null)

  // Create a circular path
  const curve = useMemo(() => {
    return new THREE.EllipseCurve(
      0,
      0, // center
      radius,
      radius, // xRadius, yRadius
      0,
      2 * Math.PI, // startAngle, endAngle
      false, // clockwise
      0, // rotation
    )
  }, [radius])

  // Convert the curve to points
  const points = useMemo(() => {
    const points = curve.getPoints(segments)
    return new THREE.BufferGeometry().setFromPoints(points)
  }, [curve, segments])

  useFrame(({ clock }) => {
    if (pathRef.current && animate) {
      // Rotate the path slowly
      pathRef.current.rotation.z += animationSpeed * 0.002

      // Animate the dash offset for a flowing effect
      if (materialRef.current) {
        materialRef.current.dashOffset -= animationSpeed * 0.01
      }
    }
  })

  return (
    <group rotation={[tilt, 0, rotation]}>
      <line ref={pathRef} geometry={points}>
        <lineDashedMaterial
          ref={materialRef}
          color={color}
          linewidth={thickness}
          scale={1}
          dashSize={dashSize}
          gapSize={gapSize}
          transparent
          opacity={opacity}
        />
      </line>
    </group>
  )
}
