"use client"

import { useState, useRef, useMemo, useEffect, memo, useCallback } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, Sphere } from "@react-three/drei"
import * as THREE from "three"
import { useLanguage } from "./language-provider"
import type { Section } from "@/lib/content"
import { motion, useAnimation } from "framer-motion"

const getSectionNumber = (index: number) => {
  return `${(index + 1).toString().padStart(2, "0")}`
}

interface OrbitConfig {
  radius: number
  tiltX: number
  tiltY: number
  tiltZ: number
  speed: number
  startAngle: number
  color: string
}

interface SectionMarkerProps {
  section: Section
  onClick: () => void
  isActive: boolean
  anyActive: boolean
  orbitConfig?: OrbitConfig
  index?: number
  isVisible?: boolean
  updatePosition?: (position: THREE.Vector3) => void
  scrollProgress?: number
}

const DEFAULT_ORBIT_CONFIG: OrbitConfig = {
  radius: 5,
  tiltX: 0,
  tiltY: 0,
  tiltZ: 0,
  speed: 0.02,
  startAngle: 0,
  color: "#4FC3F7",
}

const SectionMarker = memo(
  ({
    section,
    onClick,
    isActive,
    anyActive,
    orbitConfig = DEFAULT_ORBIT_CONFIG,
    index = 0,
    isVisible = true,
    updatePosition,
    scrollProgress = 0,
  }: SectionMarkerProps) => {
    const [hovered, setHovered] = useState(false)
    const { t, language } = useLanguage()
    const markerRef = useRef<THREE.Mesh>(null)
    const pulseRef = useRef<THREE.Mesh>(null)
    const ringRef = useRef<THREE.Group>(null)
    const glowRef = useRef<THREE.PointLight>(null)
    const orbitRef = useRef<THREE.Group>(null)
    const labelGroupRef = useRef<THREE.Group>(null)
    const controls = useAnimation()

    const [labelVisible, setLabelVisible] = useState(false)

    // Calculate opacity based on scroll progress
    const calculateOpacity = useCallback((progress: number) => {
      if (progress < 0.2) return 1
      if (progress > 0.4) return 0
      // Linear interpolation between 0.2 and 0.4
      return 1 - (progress - 0.2) / (0.4 - 0.2)
    }, [])

    const markerOpacity = calculateOpacity(scrollProgress)

    useEffect(() => {
      if (isVisible) {
        controls.start({
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.3 }, // 애니메이션 시간 단축
        })
      } else {
        controls.start({
          opacity: 0,
          scale: 0.8,
          y: -10,
          transition: { duration: 0.2 }, // 애니메이션 시간 단축
        })
      }
    }, [isVisible, controls])

    // 궤도 경로 최적화 - 세그먼트 수 감소
    const orbitPoints = useMemo(() => {
      const points = []
      const segments = 64 // 128 -> 64로 감소

      for (let i = 0; i <= segments; i++) {
        const angle = (i / segments) * Math.PI * 2
        const x = Math.cos(angle) * orbitConfig.radius
        const z = Math.sin(angle) * orbitConfig.radius
        points.push(new THREE.Vector3(x, 0, z))
      }

      return points
    }, [orbitConfig.radius])

    const orbitLine = useMemo(() => {
      const geometry = new THREE.BufferGeometry().setFromPoints(orbitPoints)
      return geometry
    }, [orbitPoints])

    const markerColor = isActive ? "#FFFFFF" : hovered ? "#FFFFFF" : orbitConfig.color
    const glowIntensity = isActive ? 2 : hovered ? 1.5 : 1 // 강도 감소

    // 프레임 카운터로 성능 최적화
    const frameCount = useRef(0)
    useFrame(({ clock }) => {
      frameCount.current++
      const shouldUpdate = frameCount.current % 2 === 0 // 매 2프레임마다 업데이트

      if (orbitRef.current) {
        orbitRef.current.rotation.x = orbitConfig.tiltX
        orbitRef.current.rotation.y = orbitConfig.tiltY
        orbitRef.current.rotation.z = orbitConfig.tiltZ
      }

      if (markerRef.current && shouldUpdate) {
        const time = clock.getElapsedTime() * orbitConfig.speed + orbitConfig.startAngle
        const x = Math.cos(time) * orbitConfig.radius
        const z = Math.sin(time) * orbitConfig.radius
        markerRef.current.position.x = x
        markerRef.current.position.z = z

        markerRef.current.lookAt(0, 0, 0)
        markerRef.current.renderOrder = 1

        if (updatePosition) {
          updatePosition(markerRef.current.position)
        }
      }

      if (pulseRef.current && markerRef.current && shouldUpdate) {
        pulseRef.current.position.copy(markerRef.current.position)

        const scale =
          hovered || isActive
            ? 1 + Math.sin(clock.getElapsedTime() * 3) * 0.15 // 펄스 강도 감소
            : 1 + Math.sin(clock.getElapsedTime() * 1.5) * 0.08 // 펄스 강도 감소

        pulseRef.current.scale.setScalar(scale)
        pulseRef.current.renderOrder = 1
      }

      if (ringRef.current && markerRef.current && shouldUpdate) {
        ringRef.current.position.copy(markerRef.current.position)
        ringRef.current.rotation.z += 0.005 // 회전 속도 감소
        ringRef.current.rotation.x += 0.003 // 회전 속도 감소
        ringRef.current.renderOrder = 1
      }

      if (glowRef.current && markerRef.current && shouldUpdate) {
        glowRef.current.position.copy(markerRef.current.position)
        const baseIntensity = isActive ? 2 : hovered ? 1.5 : 1 // 강도 감소
        glowRef.current.intensity = baseIntensity + Math.sin(clock.getElapsedTime() * 2) * 0.3 // 펄스 강도 감소
      }

      if (labelGroupRef.current && markerRef.current) {
        labelGroupRef.current.position.copy(markerRef.current.position)
        labelGroupRef.current.lookAt(0, 0, 0)
      }
    })

    const handlePointerOver = useCallback(() => {
      setHovered(true)
      document.body.style.cursor = "pointer"
    }, [])

    const handlePointerOut = useCallback(() => {
      setHovered(false)
      document.body.style.cursor = "default"
    }, [])

    return (
      <group ref={orbitRef} visible={markerOpacity > 0} renderOrder={1}>
        <line geometry={orbitLine} renderOrder={0}>
          <lineDashedMaterial
            color="#4FC3F7"
            dashSize={0.5}
            gapSize={0.3}
            opacity={0.2 * markerOpacity} // Apply scroll-based opacity
            transparent
            linewidth={1} // 라인 두께 감소
            depthWrite={false}
          />
        </line>
        <Sphere
          ref={markerRef}
          args={[0.2, 32, 32]} // 세그먼트 수 감소 (16,16 -> 8,8)
          onClick={onClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          renderOrder={1}
        >
          <meshBasicMaterial
            color={markerColor}
            transparent
            opacity={0.15 * markerOpacity} // Apply scroll-based opacity
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
        <Sphere args={[0.15, 16, 16]} renderOrder={1}>
          <meshBasicMaterial
            color={markerColor}
            transparent
            opacity={0.6 * markerOpacity} // Apply scroll-based opacity
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
        <Sphere ref={pulseRef} args={[0.25, 16, 16]} renderOrder={1}>
          {" "}
          {/* 세그먼트 수 감소 */}
          <meshBasicMaterial
            color={markerColor}
            transparent
            opacity={0.2 * markerOpacity} // Apply scroll-based opacity
            blending={THREE.AdditiveBlending}
          />
        </Sphere>
        <group ref={ringRef} renderOrder={1}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.3, 0.32, 16]} /> {/* 세그먼트 수 감소 (32 -> 16) */}
            <meshBasicMaterial
              color="#FFFFFF"
              transparent
              opacity={0.5 * markerOpacity} // Apply scroll-based opacity
              side={THREE.DoubleSide}
            />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <ringGeometry args={[0.25, 0.27, 16]} /> {/* 세그먼트 수 감소 */}
            <meshBasicMaterial
              color="#FFFFFF"
              transparent
              opacity={0.3 * markerOpacity} // Apply scroll-based opacity
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
        <pointLight
          ref={glowRef}
          color={markerColor}
          intensity={glowIntensity * markerOpacity} // Apply scroll-based opacity
          distance={2.5}
        />{" "}
        {/* 거리 감소 */}
        {hovered && markerOpacity > 0 && (
          <group ref={labelGroupRef}>
            <Html position={[0, 0.8, 0]} center>
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: markerOpacity, y: 0, scale: 1 }} // Apply scroll-based opacity
                exit={{ opacity: 0, y: -10, scale: 0.8 }}
                transition={{ duration: 0.15 }} // 애니메이션 시간 단축
                className={`px-4 py-2 rounded-full backdrop-blur-md cursor-pointer
                ${
                  isActive
                    ? "bg-primary/40 shadow-[0_0_15px_rgba(255,255,255,0.5)]"
                    : "bg-black/40 border border-white/30"
                }
                transform-gpu
                sm:text-base text-xs
              `}
                onClick={onClick}
                style={{
                  boxShadow: isActive ? "0 0 15px rgba(255,255,255,0.5), inset 0 0 5px rgba(255,255,255,0.3)" : "none",
                  color: "#FFFFFF",
                  touchAction: "auto",
                }}
              >
                <span
                  className={`whitespace-nowrap drop-shadow-md ${language === "kr" ? "font-normal" : "font-light"}`}
                >
                  <span className="mr-2 font-sans font-thin tracking-wider">{getSectionNumber(index)}</span>
                  {t(section.title.kr, section.title.en)}
                </span>
              </motion.div>
            </Html>
          </group>
        )}
      </group>
    )
  },
)

SectionMarker.displayName = "SectionMarker"
export default SectionMarker
