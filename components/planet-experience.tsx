"use client"

import { useMemo, memo } from "react"
import type React from "react"
import { useRef, useState, useEffect, forwardRef, useImperativeHandle, useCallback } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { Stars, OrbitControls, PerspectiveCamera, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import Planet from "./planet"
import { sections } from "@/lib/content"
import { type Theme, themes } from "@/lib/themes"
import gsap from "gsap"

// 메모이제이션된 씬 설정 컴포넌트
const SceneSetup = memo(({ activeSection, theme }: { activeSection: string | null; theme: Theme }) => {
  const { scene } = useThree()

  useEffect(() => {
    scene.fog = new THREE.FogExp2("#000", 0.015)
    return () => {
      scene.fog = null
    }
  }, [scene])

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 5, 10]} intensity={1.5} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={theme.accentColor} />
      <pointLight position={[0, 0, 0]} intensity={5} color={theme.planetColor} distance={15} />
      <pointLight position={[0, 0, 0]} intensity={3} color={theme.glowColor} distance={10} />
      {activeSection && (
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={0.8}
          intensity={1}
          color={theme.glowColor}
          distance={20}
          castShadow
        />
      )}
      {/* Sparkles 수 대폭 감소 */}
      <Sparkles count={30} scale={20} size={1} speed={0.3} color={theme.orbitColor} opacity={0.5} />
      <Sparkles count={15} scale={30} size={2} speed={0.1} color={theme.starColor} opacity={0.3} />
    </>
  )
})
SceneSetup.displayName = "SceneSetup"

// 메모이제이션된 별 컴포넌트
const MovingStars = memo(({ theme }: { theme: Theme }) => {
  const starsRef = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.005 // 속도 절반으로 감소
    }
  })

  return (
    <>
      {/* Stars 수 대폭 감소 */}
      <Stars
        ref={starsRef}
        radius={100}
        depth={50}
        count={1000} // 5000 -> 1000
        factor={4}
        saturation={0}
        fade
        speed={0.5} // 속도 절반
        color={theme.starColor}
      />
      <Stars
        radius={150}
        depth={100}
        count={500} // 3000 -> 500
        factor={6}
        saturation={0}
        fade
        speed={0.25} // 속도 절반
        color={theme.starColor}
      />
    </>
  )
})
MovingStars.displayName = "MovingStars"

// 메모이제이션된 카메라 컨트롤러
const CameraController = memo(
  ({
    activeSection,
    sectionPositions,
    isIntroActive,
    scrollProgress,
    onSectionReturn,
  }: {
    activeSection: string | null
    sectionPositions: Record<string, THREE.Vector3>
    isIntroActive: boolean
    scrollProgress: number
    onSectionReturn?: () => void
  }) => {
    const { camera } = useThree()
    const controlsRef = useRef<any>(null)
    const previousActiveSection = useRef<string | null>(null)

    useEffect(() => {
      if (controlsRef.current) {
        controlsRef.current.enabled = !isIntroActive && !activeSection
      }
      if (previousActiveSection.current !== null && activeSection === null && onSectionReturn) {
        onSectionReturn()
      }
      previousActiveSection.current = activeSection
      gsap.killTweensOf(camera.position)

      if (activeSection && sectionPositions[activeSection]) {
        const targetPosition = sectionPositions[activeSection].clone()
        const direction = targetPosition.clone().normalize()
        const finalPosition = direction.multiplyScalar(20) // 25 -> 20으로 변경
        gsap.to(camera.position, {
          x: finalPosition.x,
          y: finalPosition.y,
          z: finalPosition.z,
          duration: 1.5, // 애니메이션 시간 단축
          ease: "power2.inOut",
          onUpdate: () => camera.lookAt(0, 0, 0),
        })
      } else if (!isIntroActive) {
        const baseDistance = 30 // 25 -> 20으로 변경
        const minDistance = 20
        const targetDistance = baseDistance - scrollProgress * (baseDistance - minDistance)

        gsap.to(camera.position, {
          x: 0,
          y: 0,
          z: targetDistance,
          duration: 0.8, // 애니메이션 시간 단축
          ease: "power2.out",
          onUpdate: () => camera.lookAt(0, 0, 0),
        })

        if (controlsRef.current) {
          controlsRef.current.minDistance = targetDistance
          controlsRef.current.maxDistance = targetDistance
        }
      } else if (isIntroActive) {
        camera.position.set(0, 0, 20) // 25 -> 20으로 변경
        camera.lookAt(0, 0, 0)
      }
    }, [activeSection, sectionPositions, isIntroActive, scrollProgress, onSectionReturn, camera])

    useEffect(() => {
      return () => {
        gsap.killTweensOf(camera.position)
      }
    }, [camera])

    return (
      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        minDistance={20} // 25 -> 20으로 변경
        maxDistance={20} // 25 -> 20으로 변경
        autoRotate={!isIntroActive && !activeSection}
        autoRotateSpeed={0.15} // 속도 절반으로 감소
        rotateSpeed={0.3} // 속도 감소
        dampingFactor={0.05} // 댐핑 감소
        enableDamping
      />
    )
  },
)
CameraController.displayName = "CameraController"

interface PlanetExperienceProps {
  onPlanetReady: () => void
  isIntroActive: boolean
  selectedTheme?: Theme
  onSectionClick?: (sectionId: string) => void
  scrollProgress?: number
}

const PlanetExperience = memo(
  forwardRef<{ getPlanetRef: () => React.RefObject<THREE.Group> | null }, PlanetExperienceProps>(
    ({ onPlanetReady, isIntroActive, selectedTheme, onSectionClick, scrollProgress = 0 }, ref) => {
      const [activeSection, setActiveSection] = useState<string | null>(null)
      const cameraRef = useRef<THREE.PerspectiveCamera>(null)
      const planetRef = useRef<{ planetGroupRef: React.RefObject<THREE.Group> }>(null!)
      const [isMobile, setIsMobile] = useState(false)
      const [showAsteroids, setShowAsteroids] = useState(false)

      useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768)
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
      }, [])

      useEffect(() => {
        if (!isIntroActive && !showAsteroids) {
          const timer = setTimeout(() => {
            setShowAsteroids(true)
          }, 300) // 지연 시간 단축
          return () => clearTimeout(timer)
        }
        if (isIntroActive) {
          setShowAsteroids(false)
        }
      }, [isIntroActive, showAsteroids])

      const theme = selectedTheme || themes[0]

      // 섹션 위치 계산 최적화 - 메모이제이션
      const sectionPositions = useMemo(
        () =>
          sections.reduce(
            (acc, section, index) => {
              const orbitRadius = 7 + (index % 3) * 0.5 // 랜덤 대신 인덱스 기반
              const orbitTiltX = (index % 5) * 0.2 - 0.4 // 랜덤 대신 인덱스 기반
              const orbitTiltY = (index % 7) * 0.2 - 0.6 // 랜덤 대신 인덱스 기반
              const startAngle = (index / sections.length) * Math.PI * 2 // 균등 분배
              const x = Math.cos(startAngle) * orbitRadius
              const y = Math.sin(orbitTiltX) * orbitRadius * 0.2
              const z = Math.sin(startAngle) * orbitRadius
              const rotatedX = x * Math.cos(orbitTiltY) - z * Math.sin(orbitTiltY)
              const rotatedZ = x * Math.sin(orbitTiltY) + z * Math.cos(orbitTiltY)
              acc[section.id] = new THREE.Vector3(rotatedX, y, rotatedZ)
              return acc
            },
            {} as Record<string, THREE.Vector3>,
          ),
        [], // 의존성 제거로 한 번만 계산
      )

      const handleSectionClick = useCallback(
        (sectionId: string) => {
          setActiveSection(sectionId)
          if (onSectionClick) onSectionClick(sectionId)
        },
        [onSectionClick],
      )

      const handleSectionReturn = useCallback(() => {
        setShowAsteroids(true)
      }, [])

      useImperativeHandle(ref, () => ({ getPlanetRef: () => planetRef.current?.planetGroupRef || null }), [])

      const handlePlanetComponentLoaded = useCallback(() => {
        if (onPlanetReady) {
          onPlanetReady()
        }
      }, [onPlanetReady])

      return (
        <Canvas
          className="flex-shrink-0 bg-white/10 backdrop-blur-md rounded-lg px-0 border border-white/20 h-full flex items-center justify-center w-full text-left"
          dpr={[1, 1.5]} // DPR 제한으로 성능 향상
          gl={{
            antialias: false, // 안티앨리어싱 비활성화로 성능 향상
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.5,
            powerPreference: "high-performance", // 고성능 GPU 사용
            stencil: false, // 스텐실 버퍼 비활성화
            depth: true,
            alpha: false, // 알파 채널 비활성화
          }}
          style={{ pointerEvents: "auto" }}
        >
          <color attach="background" args={["#000"]} />
          <fog attach="fog" args={["#000", 0, 40]} />
          <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 20]} fov={50} near={0.1} far={1000} />
          <SceneSetup activeSection={activeSection} theme={theme} />
          <MovingStars theme={theme} />
          <Planet
            ref={planetRef}
            onSectionClick={handleSectionClick}
            activeSection={activeSection}
            onLoaded={handlePlanetComponentLoaded}
            isIntroActive={isIntroActive}
            planetColor={theme.planetColor}
            glowColor={theme.glowColor}
            orbitColor={theme.orbitColor}
            isMobile={isMobile}
            showAsteroids={showAsteroids}
            scrollProgress={scrollProgress}
          />
          <CameraController
            activeSection={activeSection}
            sectionPositions={sectionPositions}
            isIntroActive={isIntroActive}
            scrollProgress={scrollProgress}
            onSectionReturn={handleSectionReturn}
          />
        </Canvas>
      )
    },
  ),
)
PlanetExperience.displayName = "PlanetExperience"
export default PlanetExperience
