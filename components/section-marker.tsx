"use client"

import { useState, useRef, useMemo, useEffect } from "react"
import { useFrame } from "@react-three/fiber"
import { Html, Sphere } from "@react-three/drei"
import * as THREE from "three"
import { useLanguage } from "./language-provider"
import type { Section } from "@/lib/content"
import { motion, useAnimation } from "framer-motion"

// 섹션 인덱스에 따른 숫자 반환 (01, 02, 03, 04)
const getSectionNumber = (index: number) => {
  return `${(index + 1).toString().padStart(2, "0")}`
}

// 컴포넌트 인터페이스에 index 속성 추가
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
  orbitConfig: OrbitConfig
  index?: number // 섹션 인덱스 추가
  isVisible?: boolean // 레이블 표시 여부
  updatePosition?: (position: THREE.Vector3) => void // 위치 업데이트 콜백
}

// SectionMarker 함수 매개변수에 index 추가
export default function SectionMarker({
  section,
  onClick,
  isActive,
  anyActive,
  orbitConfig,
  index = 0,
  isVisible = true, // 기본값은 표시
  updatePosition,
}: SectionMarkerProps) {
  const [hovered, setHovered] = useState(false)
  const { t, language } = useLanguage()
  const markerRef = useRef<THREE.Mesh>(null)
  const pulseRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Group>(null)
  const glowRef = useRef<THREE.PointLight>(null)
  const orbitRef = useRef<THREE.Group>(null)
  const labelGroupRef = useRef<THREE.Group>(null)
  const controls = useAnimation()

  // 레이블 투명도 애니메이션을 위한 상태
  const [labelVisible, setLabelVisible] = useState(false)

  // isVisible이 변경될 때 애니메이션 적용
  useEffect(() => {
    if (isVisible) {
      controls.start({
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { duration: 0.5 },
      })
    } else {
      controls.start({
        opacity: 0,
        scale: 0.8,
        y: -10,
        transition: { duration: 0.3 },
      })
    }
  }, [isVisible, controls])

  // 궤도 경로를 위한 점들 생성
  const orbitPoints = useMemo(() => {
    const points = []
    const segments = 128

    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2
      const x = Math.cos(angle) * orbitConfig.radius
      const z = Math.sin(angle) * orbitConfig.radius
      points.push(new THREE.Vector3(x, 0, z))
    }

    return points
  }, [orbitConfig.radius])

  // 궤도 라인 생성
  const orbitLine = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(orbitPoints)
    return geometry
  }, [orbitPoints])

  // 마커 색상 계산
  const markerColor = isActive ? "#FFFFFF" : hovered ? "#FFFFFF" : orbitConfig.color
  const glowIntensity = isActive ? 2.5 : hovered ? 2 : 1.5

  // 마커 위치 및 애니메이션 업데이트
  useFrame(({ clock }) => {
    if (orbitRef.current) {
      // 궤도 기울기 적용
      orbitRef.current.rotation.x = orbitConfig.tiltX
      orbitRef.current.rotation.y = orbitConfig.tiltY
      orbitRef.current.rotation.z = orbitConfig.tiltZ
    }

    if (markerRef.current) {
      // 궤도를 따라 마커 이동
      const time = clock.getElapsedTime() * orbitConfig.speed + orbitConfig.startAngle
      const x = Math.cos(time) * orbitConfig.radius
      const z = Math.sin(time) * orbitConfig.radius
      markerRef.current.position.x = x
      markerRef.current.position.z = z

      // 마커가 항상 중앙을 바라보도록 설정
      markerRef.current.lookAt(0, 0, 0)

      // renderOrder 설정으로 마커가 궤도 위에 보이도록 함
      markerRef.current.renderOrder = 1

      // 마커 위치 업데이트 콜백 호출
      if (updatePosition) {
        updatePosition(markerRef.current.position)
      }
    }

    if (pulseRef.current && markerRef.current) {
      // 펄스 효과 위치 동기화
      pulseRef.current.position.copy(markerRef.current.position)

      // 펄스 효과 크기 애니메이션
      const scale =
        hovered || isActive
          ? 1 + Math.sin(clock.getElapsedTime() * 4) * 0.2
          : 1 + Math.sin(clock.getElapsedTime() * 2) * 0.1

      pulseRef.current.scale.setScalar(scale)

      // renderOrder 설정
      pulseRef.current.renderOrder = 1
    }

    if (ringRef.current && markerRef.current) {
      // 링 위치 동기화
      ringRef.current.position.copy(markerRef.current.position)

      // 링 회전 애니메이션
      ringRef.current.rotation.z += 0.01
      ringRef.current.rotation.x += 0.005

      // renderOrder 설정
      ringRef.current.renderOrder = 1
    }

    // 발광 효과 애니메이션
    if (glowRef.current && markerRef.current) {
      // 발광 위치 동기화
      glowRef.current.position.copy(markerRef.current.position)

      // 발광 강도 애니메이션
      const baseIntensity = isActive ? 2.5 : hovered ? 2 : 1.5
      glowRef.current.intensity = baseIntensity + Math.sin(clock.getElapsedTime() * 3) * 0.5
    }

    // 라벨 그룹 위치 동기화
    if (labelGroupRef.current && markerRef.current) {
      labelGroupRef.current.position.copy(markerRef.current.position)
      // 라벨이 항상 카메라를 향하도록 설정
      labelGroupRef.current.lookAt(0, 0, 0)
    }
  })

  return (
    <group ref={orbitRef}>
      {/* 궤도 경로 시각화 - 굵기 증가 */}
      <line geometry={orbitLine} renderOrder={0}>
        <lineDashedMaterial
          color="#4FC3F7"
          dashSize={0.5}
          gapSize={0.3}
          opacity={0.3}
          transparent
          linewidth={2} // 1에서 2로 증가
          depthWrite={false}
        />
      </line>

      {/* 마커 본체 */}
      <Sphere
        ref={markerRef}
        args={[0.25, 16, 16]}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        renderOrder={1}
      >
        <meshBasicMaterial color={markerColor} transparent opacity={0.9} />
      </Sphere>

      {/* 펄스 효과 */}
      <Sphere ref={pulseRef} args={[0.32, 16, 16]} renderOrder={1}>
        <meshBasicMaterial color={markerColor} transparent opacity={0.3} blending={THREE.AdditiveBlending} />
      </Sphere>

      {/* 회전하는 링 - 색상을 항상 화이트로 설정 */}
      <group ref={ringRef} renderOrder={1}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.35, 0.38, 32]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.6} side={THREE.DoubleSide} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <ringGeometry args={[0.3, 0.33, 32]} />
          <meshBasicMaterial color="#FFFFFF" transparent opacity={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* 발광 효과 - 색상은 마커 색상 유지 */}
      <pointLight ref={glowRef} color={markerColor} intensity={glowIntensity} distance={3.0} />

      {/* Label group that follows the marker */}
      <group ref={labelGroupRef}>
        {/* Always render label with animated opacity */}
        <Html position={[0, 0.8, 0]} center>
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={isActive || hovered ? { opacity: 1, y: 0, scale: 1 } : controls}
            transition={{ duration: 0.2 }}
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
              touchAction: "auto", // 모바일에서 터치 이벤트 개선
            }}
          >
            <span className={`whitespace-nowrap drop-shadow-md ${language === "kr" ? "font-normal" : "font-light"}`}>
              <span className="mr-2 font-sans font-thin tracking-wider">{getSectionNumber(index)}</span>
              {t(section.title.kr, section.title.en)}
            </span>
          </motion.div>
        </Html>
      </group>
    </group>
  )
}
