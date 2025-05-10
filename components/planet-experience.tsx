"use client"

import type React from "react"

import { useRef, useState, useEffect, forwardRef, useImperativeHandle, useCallback } from "react"
import { Canvas, useThree, useFrame } from "@react-three/fiber"
import { Stars, OrbitControls, PerspectiveCamera, Sparkles } from "@react-three/drei"
import * as THREE from "three"
import Planet from "./planet"
import ContentPanel from "./content-panel"
import { useLanguage } from "./language-provider"
import { sections, type Section } from "@/lib/content"
import { PlanetAnimationController } from "./intro-animation"
// Import Theme type
import { type Theme, themes } from "@/lib/themes"
import type gsap from "gsap"

// Scene setup component - kept within the same file
function SceneSetup({ activeSection, theme }: { activeSection: string | null; theme: Theme }) {
  const { scene } = useThree()

  // Add fog to the scene
  useEffect(() => {
    scene.fog = new THREE.FogExp2("#000", 0.015)

    return () => {
      scene.fog = null
    }
  }, [scene])

  // Directional light to simulate sun
  const directionalLightRef = useRef<THREE.DirectionalLight>(null)

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight ref={directionalLightRef} position={[10, 5, 10]} intensity={1.5} castShadow />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color={theme.accentColor} />

      {/* 행성을 밝게 빛나게 하는 중앙 광원 - 강도 증가 */}
      <pointLight position={[0, 0, 0]} intensity={5} color={theme.planetColor} distance={15} />

      {/* 추가 광원으로 더 강한 발광 효과 */}
      <pointLight position={[0, 0, 0]} intensity={3} color={theme.glowColor} distance={10} />

      {/* Volumetric light beam */}
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

      {/* Particle effects */}
      <Sparkles count={100} scale={20} size={1} speed={0.3} color={theme.orbitColor} opacity={0.5} />
      <Sparkles count={50} scale={30} size={2} speed={0.1} color={theme.starColor} opacity={0.3} />
    </>
  )
}

// Background stars that move slowly - kept within the same file
function MovingStars({ theme }: { theme: Theme }) {
  const starsRef = useRef<THREE.Points>(null)

  useFrame(({ clock }) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = clock.getElapsedTime() * 0.01
    }
  })

  return (
    <>
      <Stars
        ref={starsRef}
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
        color={theme.starColor}
      />
      {/* 추가 별 레이어 */}
      <Stars radius={150} depth={100} count={3000} factor={6} saturation={0} fade speed={0.5} color={theme.starColor} />
    </>
  )
}

// Camera controller for smooth transitions - kept within the same file
function CameraController({
  activeSection,
  sectionPositions,
  isIntroActive,
}: {
  activeSection: string | null
  sectionPositions: Record<string, THREE.Vector3>
  isIntroActive: boolean
}) {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)
  const animationRef = useRef<gsap.core.Tween | null>(null)

  // Set initial camera position for intro
  useEffect(() => {
    if (isIntroActive) {
      // Position camera for intro - closer to the planet
      camera.position.set(0, 0, 15)
      camera.lookAt(0, 0, 0)
    }
  }, [camera, isIntroActive])

  useEffect(() => {
    if (!controlsRef.current) return

    // Disable controls during intro
    controlsRef.current.enabled = !isIntroActive && !activeSection

    if (activeSection && sectionPositions[activeSection]) {
      const targetPosition = sectionPositions[activeSection].clone()
      const distance = 8 // Closer zoom distance when focusing on a section

      // Calculate direction
      const direction = targetPosition.clone().normalize()
      const finalPosition = direction.multiplyScalar(distance)

      // Animate camera position
      camera.position.copy(finalPosition)
      camera.lookAt(0, 0, 0)
    } else if (!isIntroActive) {
      // Reset camera position when no section is active and not in intro
      camera.position.set(0, 0, 25)
    }
  }, [activeSection, camera, sectionPositions, isIntroActive])

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={false}
      minDistance={8}
      maxDistance={35}
      autoRotate={!isIntroActive && !activeSection}
      autoRotateSpeed={0.3}
      rotateSpeed={0.5}
      zoomSpeed={0.8}
      dampingFactor={0.1}
      enableDamping
    />
  )
}

// Update the PlanetExperienceProps interface
interface PlanetExperienceProps {
  onLoaded: () => void
  sidebarOpen?: boolean
  sidebarWidth?: number
  isIntroActive?: boolean
  selectedTheme?: Theme
}

// Update the PlanetExperience component
const PlanetExperience = forwardRef<{ handleSectionClick: (sectionId: string) => void }, PlanetExperienceProps>(
  ({ onLoaded, sidebarOpen = false, sidebarWidth = 0, isIntroActive = false, selectedTheme }, ref) => {
    const [activeSection, setActiveSection] = useState<string | null>(null)
    const [showModal, setShowModal] = useState<boolean>(false)
    const [currentSection, setCurrentSection] = useState<Section | null>(null)
    const cameraRef = useRef<THREE.PerspectiveCamera>(null)
    const planetRef = useRef<{ planetGroupRef: React.RefObject<THREE.Group> } | null>(null)
    const { t, language } = useLanguage()

    // 모바일 환경 감지 상태 추가
    const [isMobile, setIsMobile] = useState(false)

    // 모바일 환경 감지 useEffect 추가
    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      // 초기 체크
      checkMobile()

      // 리사이즈 이벤트 리스너 추가
      window.addEventListener("resize", checkMobile)

      return () => {
        window.removeEventListener("resize", checkMobile)
      }
    }, [])

    // Use the selected theme or default to the first theme
    const theme = selectedTheme || themes[0]

    // Calculate section positions for camera targeting
    const sectionPositions = sections.reduce(
      (acc, section, index) => {
        // 각 섹션마다 다른 궤도 설정
        const orbitRadius = 7 + Math.random() * 1.5 // 7~8.5 사이의 반지름

        // 각 섹션마다 다른 궤도 기울기와 회전
        const orbitTiltX = (Math.random() - 0.5) * Math.PI * 0.5 // -π/4 ~ π/4 사이의 X축 기울기
        const orbitTiltY = (Math.random() - 0.5) * Math.PI * 0.5 // -π/4 ~ π/4 사이의 Y축 기울기

        // 각 섹션마다 다른 시작 위치
        const startAngle = Math.random() * Math.PI * 2 // 0~2π 사이의 시작 각도

        // 궤도 상의 위치 계산
        const x = Math.cos(startAngle) * orbitRadius
        const y = Math.sin(orbitTiltX) * orbitRadius * 0.2
        const z = Math.sin(startAngle) * orbitRadius

        // 회전 적용
        const rotatedX = x * Math.cos(orbitTiltY) - z * Math.sin(orbitTiltY)
        const rotatedZ = x * Math.sin(orbitTiltY) + z * Math.cos(orbitTiltY)

        acc[section.id] = new THREE.Vector3(rotatedX, y, rotatedZ)

        return acc
      },
      {} as Record<string, THREE.Vector3>,
    )

    // 섹션 클릭 시 모달 표시 딜레이 추가
    const handleSectionClick = useCallback(
      (sectionId: string) => {
        // Find the section data
        const sectionData = sections.find((s) => s.id === sectionId)
        if (!sectionData) return

        // If modal is already showing, just update the section
        if (showModal && activeSection) {
          setActiveSection(sectionId)
          setCurrentSection(sectionData)
          return
        }

        // Otherwise, do the full animation sequence
        setActiveSection(sectionId)
        setCurrentSection(sectionData)
        setShowModal(false)

        // 2초 후에 모달 표시 (원래대로 복원)
        setTimeout(() => {
          setShowModal(true)
        }, 2000)
      },
      [showModal, activeSection],
    )

    // 언어 변경 시 모달 상태를 유지하기 위한 useEffect 추가
    useEffect(() => {
      // 언어가 변경되어도 현재 모달 상태 유지
      // 이 useEffect는 언어 변경 시에만 실행됨

      // 현재 활성화된 섹션이 있고 모달이 표시되고 있다면 상태 유지
      if (activeSection && currentSection) {
        // 모달이 닫혀있다면 다시 열기
        if (!showModal) {
          setShowModal(true)
        }
      }
    }, [language, activeSection, currentSection, showModal])

    // Handle section change from modal
    const handleModalSectionChange = useCallback((sectionId: string) => {
      // Update active section without closing modal
      setActiveSection(sectionId)
      const sectionData = sections.find((s) => s.id === sectionId)
      if (sectionData) {
        setCurrentSection(sectionData)
      }
    }, [])

    // Expose the handleSectionClick method to parent components
    useImperativeHandle(
      ref,
      () => ({
        handleSectionClick,
        getPlanetRef: () => planetRef.current?.planetGroupRef || null,
      }),
      [handleSectionClick],
    )

    const handleClosePanel = useCallback(() => {
      setActiveSection(null)
      setShowModal(false)
      setCurrentSection(null)
    }, [])

    // Update the Planet component to pass the theme props
    return (
      <>
        <Canvas
          className={`w-full h-screen ${activeSection || isIntroActive ? "pointer-events-none" : "pointer-events-auto"}`}
          shadows
          dpr={[1, 2]}
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 1.5, // 톤 매핑 노출 증가
          }}
        >
          <color attach="background" args={["#000"]} />
          <fog attach="fog" args={["#000", 0, 40]} />

          <PerspectiveCamera ref={cameraRef} makeDefault position={[0, 0, 25]} fov={50} near={0.1} far={1000} />

          <SceneSetup activeSection={activeSection} theme={theme} />
          <MovingStars theme={theme} />

          {/* Add planet animation controller during intro */}
          {isIntroActive && planetRef.current?.planetGroupRef && (
            <PlanetAnimationController planetRef={planetRef.current.planetGroupRef} />
          )}

          <Planet
            ref={planetRef}
            onSectionClick={handleSectionClick}
            activeSection={activeSection}
            onLoaded={onLoaded}
            isIntroActive={isIntroActive}
            planetColor={theme.planetColor}
            glowColor={theme.glowColor}
            orbitColor={theme.orbitColor}
            isMobile={isMobile}
          />

          <CameraController
            activeSection={activeSection}
            sectionPositions={sectionPositions}
            isIntroActive={isIntroActive}
          />
        </Canvas>

        {/* 모달은 showModal 상태가 true일 때만 표시 */}
        {activeSection && showModal && currentSection && (
          <ContentPanel
            section={currentSection}
            onClose={handleClosePanel}
            onSectionChange={handleModalSectionChange}
            sidebarOpen={sidebarOpen}
            sidebarWidth={sidebarWidth}
            theme={theme}
            useDefaultUIColor={true} // UI 색상에 기본 색상 사용 플래그 추가
          />
        )}
      </>
    )
  },
)

PlanetExperience.displayName = "PlanetExperience"

export default PlanetExperience
