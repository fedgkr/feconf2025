"use client"

import type React from "react"
import { useRef, useState, useEffect, useMemo, forwardRef, useImperativeHandle, useCallback } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Sphere } from "@react-three/drei"
import * as THREE from "three"
import { sections } from "@/lib/content"
import SectionMarker from "./section-marker"
import PulsingGlow from "./pulsing-glow"
import PlanetCountdown from "./planet-countdown"
import gsap from "gsap"

interface PlanetProps {
  onSectionClick: (sectionId: string) => void
  activeSection: string | null
  onLoaded: () => void
  isIntroActive: boolean
  planetColor?: string
  glowColor?: string
  orbitColor?: string
  isMobile?: boolean
  showAsteroids?: boolean
  scrollProgress?: number
}

const Planet = forwardRef<{ planetGroupRef: React.RefObject<THREE.Group> }, PlanetProps>(
  (
    {
      onSectionClick,
      activeSection,
      onLoaded,
      isIntroActive,
      planetColor = "#92CBDA",
      glowColor = "#4FC3F7",
      orbitColor = "#4FC3F7",
      isMobile = false,
      showAsteroids = false,
      scrollProgress = 0,
    }: PlanetProps,
    ref,
  ) => {
    const planetGroupRef = useRef<THREE.Group>(null!)
    const glowRef = useRef<THREE.Mesh>(undefined)
    const innerGlowRef = useRef<THREE.PointLight>(null)
    const secondaryGlowRef = useRef<THREE.PointLight>(null)
    const { scene, camera } = useThree()

    useImperativeHandle(ref, () => ({ planetGroupRef }))

    useEffect(() => {
      if (planetGroupRef.current && onLoaded) {
        onLoaded()
      }
    }, [onLoaded])

    const [closestMarkers, setClosestMarkers] = useState<number[]>([0, 1])
    const [visibleMarkers, setVisibleMarkers] = useState<number[]>([])
    const [cameraHasMoved, setCameraHasMoved] = useState(false)
    const lastCameraPositionRef = useRef<THREE.Vector3>(new THREE.Vector3())
    const [isMobileState, setIsMobileState] = useState(false)
    const [shouldRestoreMarkers, setShouldRestoreMarkers] = useState(false)

    // 성능 최적화를 위한 참조 객체들을 useMemo로 메모이제이션
    const frustumRef = useRef(new THREE.Frustum())
    const projScreenMatrixRef = useRef(new THREE.Matrix4())
    const raycasterRef = useRef(new THREE.Raycaster())
    const planetRadius = 6.3

    // 향상된 나선형 회전 패턴 계산 함수 - 전체 스크롤 범위에 대응
    const calculateSpiralRotation = useCallback((progress: number) => {
      // 나선형 회전 패턴 설정 - 더 역동적으로 조정
      const spiralIntensity = 1.2 // 강도 증가
      const spiralAngle = progress * Math.PI * 4 * spiralIntensity // 회전 수 증가 (2 -> 4)

      // 스크롤 진행도에 따른 줌 인 효과 (1.0에서 2.5까지)
      const zoomScale = 1.0 + progress * 1.5

      return {
        // 위치는 원점 고정
        x: 0,
        y: 0,
        z: 0,
        // 스케일 변화 - 스크롤에 따른 줌 인 + 기존 나선형 효과
        scale: zoomScale + Math.sin(progress * Math.PI * 2) * 0.1 * spiralIntensity,
        // 나선형 회전 패턴 - 더 복잡하고 아름답게
        rotation: {
          x: Math.sin(spiralAngle * 0.7) * 0.4 * progress + Math.cos(progress * Math.PI * 3) * 0.1, // X축 회전 강화
          y: spiralAngle * 0.8 + Math.sin(progress * Math.PI * 5) * 0.2, // Y축 주 회전 + 추가 변화
          z: Math.cos(spiralAngle * 0.9) * 0.3 * progress + Math.sin(progress * Math.PI * 4) * 0.15, // Z축 회전 강화
        },
      }
    }, [])

    useEffect(() => {
      if (!planetGroupRef.current) return

      gsap.killTweensOf(planetGroupRef.current.scale)

      if (isIntroActive) {
        // 인트로 중에는 스케일 처리 최소화
      } else {
        if (planetGroupRef.current.scale.x < 0.9) {
          gsap.to(planetGroupRef.current.scale, {
            x: 1,
            y: 1,
            z: 1,
            duration: 0.3,
            ease: "power2.out",
            overwrite: true,
          })
        }
      }
    }, [isIntroActive])

    useEffect(() => {
      lastCameraPositionRef.current.copy(camera.position)
      const checkMobile = () => setIsMobileState(window.innerWidth < 768)
      checkMobile()
      window.addEventListener("resize", checkMobile)

      // 대기 효과 최적화
      const atmosphereVertexShader = `varying vec3 vNormal; void main() { vNormal = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`
      const atmosphereFragmentShader = `uniform vec3 glowColor; varying vec3 vNormal; void main() { float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0); gl_FragColor = vec4(glowColor, 1.0) * intensity; }`
      const atmosphereGeometry = new THREE.SphereGeometry(6.5, 64, 64)
      const atmosphereMaterial = new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        uniforms: { glowColor: { value: new THREE.Color(planetColor) } },
      })
      const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
      glowRef.current = atmosphereMesh
      scene.add(atmosphereMesh)

      return () => {
        scene.remove(atmosphereMesh)
        window.removeEventListener("resize", checkMobile)
        if (planetGroupRef.current) {
          gsap.killTweensOf(planetGroupRef.current.scale)
          gsap.killTweensOf(planetGroupRef.current.position)
          gsap.killTweensOf(planetGroupRef.current.rotation)
        }
      }
    }, [scene, camera, planetColor])

    useEffect(() => {
      if (glowRef.current && glowRef.current.material instanceof THREE.ShaderMaterial) {
        glowRef.current.material.uniforms.glowColor.value.set(planetColor)
      }
    }, [planetColor])

    // 궤도 설정 최적화 - 계산 최소화
    const orbitalConfigs = useMemo(() => {
      const sectionCount = sections.length
      const angleStep = (Math.PI * 2) / sectionCount
      const baseOrbitRadius = 10.0

      return sections.map((_, index) => ({
        radius: baseOrbitRadius + (index % 3) * 0.5,
        tiltX: (index % 5) * 0.1,
        tiltY: (index % 7) * 0.1,
        tiltZ: (index % 11) * 0.1,
        speed: 0.02 + (index % 3) * 0.005,
        startAngle: index * angleStep,
        color: orbitColor,
      }))
    }, [orbitColor])

    const markerPositionsRef = useRef<THREE.Vector3[]>(Array(sections.length).fill(new THREE.Vector3()))

    // 향상된 나선형 회전 패턴 - 전체 스크롤 범위에 적용
    useEffect(() => {
      if (!planetGroupRef.current || isIntroActive) return

      const movement = calculateSpiralRotation(scrollProgress)

      // 위치는 원점으로 고정 (변경하지 않음)
      gsap.to(planetGroupRef.current.position, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1.0, // 더 부드러운 애니메이션
        ease: "power2.out",
        overwrite: true,
      })

      // 향상된 스케일 애니메이션 - 스크롤에 따른 줌 인 효과 포함
      gsap.to(planetGroupRef.current.scale, {
        x: movement.scale,
        y: movement.scale,
        z: movement.scale,
        duration: 1.0,
        ease: "power2.out",
        overwrite: true,
      })

      // 향상된 나선형 회전 애니메이션
      gsap.to(planetGroupRef.current.rotation, {
        x: movement.rotation.x,
        y: movement.rotation.y,
        z: movement.rotation.z,
        duration: 1.0,
        ease: "power2.out",
        overwrite: true,
      })

      // 글로우 효과도 원점 고정하고 향상된 회전 적용
      if (glowRef.current) {
        gsap.to(glowRef.current.position, {
          x: 0,
          y: 0,
          z: 0,
          duration: 1.0,
          ease: "power2.out",
          overwrite: true,
        })

        gsap.to(glowRef.current.scale, {
          x: movement.scale,
          y: movement.scale,
          z: movement.scale,
          duration: 1.0,
          ease: "power2.out",
          overwrite: true,
        })

        gsap.to(glowRef.current.rotation, {
          x: movement.rotation.x,
          y: movement.rotation.y,
          z: movement.rotation.z,
          duration: 1.0,
          ease: "power2.out",
          overwrite: true,
        })
      }
    }, [scrollProgress, isIntroActive, calculateSpiralRotation])

    // useFrame 최적화 - 추가 회전 효과 강화
    const frameCount = useRef(0)
    useFrame(({ clock }) => {
      if (!planetGroupRef.current || !planetGroupRef.current.visible) return

      frameCount.current++
      const shouldUpdate = frameCount.current % 2 === 0

      if (!isIntroActive && planetGroupRef.current.scale.x < 0.1) {
        gsap.to(planetGroupRef.current.scale, { x: 1, y: 1, z: 1, duration: 0.1 })
      }

      const time = clock.getElapsedTime()
      if (glowRef.current && !activeSection && shouldUpdate) {
        // 기본 회전에 나선형 효과 추가 (위치는 변경하지 않음)
        glowRef.current.rotation.y += isIntroActive ? 0.0001 : 0.0005 // 속도 증가

        if (!isIntroActive && scrollProgress > 0) {
          // 향상된 나선형 패턴에 맞는 추가 회전 효과
          const spiralRotation = scrollProgress * Math.PI * 4 * 1.2
          const additionalRotationX = Math.sin(time * 0.15 + spiralRotation) * 0.08 * scrollProgress
          const additionalRotationZ = Math.cos(time * 0.12 + spiralRotation) * 0.06 * scrollProgress

          // 기존 회전에 추가 회전 효과만 더함 - 강도 증가
          glowRef.current.rotation.x += additionalRotationX * 0.02
          glowRef.current.rotation.z += additionalRotationZ * 0.02
        }
      }

      if (glowRef.current && glowRef.current.material instanceof THREE.ShaderMaterial) {
        glowRef.current.material.uniforms.glowColor.value.set(planetColor)
      }

      if (!cameraHasMoved && shouldUpdate && camera.position.distanceTo(lastCameraPositionRef.current) > 1) {
        setCameraHasMoved(true)
      }

      if (shouldUpdate) {
        projScreenMatrixRef.current.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
        frustumRef.current.setFromProjectionMatrix(projScreenMatrixRef.current)

        const newVisibleMarkers: number[] = []
        markerPositionsRef.current.forEach((position, index) => {
          const sphere = new THREE.Sphere(position, 1)
          if (frustumRef.current.intersectsSphere(sphere)) {
            newVisibleMarkers.push(index)
          }
        })

        if (JSON.stringify(newVisibleMarkers) !== JSON.stringify(visibleMarkers)) {
          setVisibleMarkers(newVisibleMarkers)
        }
      }

      if (!activeSection && (cameraHasMoved || isMobileState) && shouldRestoreMarkers && shouldUpdate) {
        const distances = markerPositionsRef.current.map((pos, idx) => ({
          idx,
          dist: camera.position.distanceToSquared(pos),
        }))
        distances.sort((a, b) => a.dist - b.dist)
        const newClosest = distances.slice(0, isMobileState ? 2 : 2).map((item) => item.idx)

        if (newClosest.length !== closestMarkers.length || newClosest.some((m, i) => m !== closestMarkers[i])) {
          setClosestMarkers(newClosest)
        }
      }

      if (shouldUpdate) {
        lastCameraPositionRef.current.copy(camera.position)
      }
    })

    const updateMarkerPosition = useCallback((index: number, position: THREE.Vector3) => {
      markerPositionsRef.current[index] = position.clone()
    }, [])

    useEffect(() => setIsMobileState(isMobile), [isMobile])

    useEffect(() => {
      if (activeSection === null && !isIntroActive) {
        setShouldRestoreMarkers(false)
        const timer = setTimeout(() => {
          setShouldRestoreMarkers(true)
          setCameraHasMoved(true)
        }, 500)
        return () => clearTimeout(timer)
      } else {
        setShouldRestoreMarkers(false)
      }
    }, [activeSection, isIntroActive])

    const shouldShowMarker = useCallback(
      (index: number) => {
        if (isIntroActive || !showAsteroids) return false
        // Hide markers when the active section is "panel" (FE Talk)
        if (activeSection === "panel") return false
        if (activeSection !== null && activeSection !== "panel") return false
        if (!shouldRestoreMarkers) return false
        return isMobileState ? visibleMarkers.includes(index) : closestMarkers.includes(index)
      },
      [
        isIntroActive,
        showAsteroids,
        activeSection,
        shouldRestoreMarkers,
        isMobileState,
        visibleMarkers,
        closestMarkers,
      ],
    )

    return (
      <group ref={planetGroupRef} visible={!isIntroActive}>
        <PulsingGlow
          active={isIntroActive}
          color={planetColor}
          intensity={3}
          distance={20}
          pulseSpeed={0.8}
          pulseIntensity={1.5}
        />
        <pointLight ref={innerGlowRef} intensity={3} color={planetColor} distance={15} />
        <pointLight ref={secondaryGlowRef} intensity={2} color={glowColor} distance={25} />
        <Sphere args={[planetRadius, 64, 64]} renderOrder={1}>
          <meshBasicMaterial
            color={planetColor}
            transparent
            opacity={0.05}
            depthWrite={true}
            />
        </Sphere>
        {sections.map((section, index) => {
          const config = orbitalConfigs[index]
          if (!config) return null

          return (
            <SectionMarker
              key={section.id}
              section={section}
              onClick={() => onSectionClick(section.id)}
              isActive={activeSection === section.id}
              anyActive={activeSection !== null}
              orbitConfig={config}
              index={index}
              isVisible={shouldShowMarker(index)}
              updatePosition={(position) => updateMarkerPosition(index, position)}
              scrollProgress={scrollProgress}
            />
          )
        })}
        {!isIntroActive && !activeSection && (
          <PlanetCountdown
            position={[0, 0, 0]}
            color={planetColor}
            planetRadius={planetRadius}
            scale={1.5}
            onSectionClick={() => onSectionClick("hero")}
          />
        )}
      </group>
    )
  },
)
Planet.displayName = "Planet"
export default Planet
