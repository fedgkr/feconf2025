"use client"

import { useRef, useState, useEffect, useMemo, forwardRef, useImperativeHandle } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Sphere } from "@react-three/drei"
import * as THREE from "three"
import { sections } from "@/lib/content"
import SectionMarker from "./section-marker"
import PulsingGlow from "./pulsing-glow"
import PlanetCountdown from "./planet-countdown"

interface PlanetProps {
  onSectionClick: (sectionId: string) => void
  activeSection: string | null
  onLoaded: () => void
  isIntroActive?: boolean
  planetColor?: string
  glowColor?: string
  orbitColor?: string
  isMobile?: boolean
}

const Planet = forwardRef(
  (
    {
      onSectionClick,
      activeSection,
      onLoaded,
      isIntroActive = false,
      planetColor = "#92CBDA",
      glowColor = "#4FC3F7",
      orbitColor = "#4FC3F7",
      isMobile = false,
    }: PlanetProps,
    ref,
  ) => {
    const planetGroupRef = useRef<THREE.Group>(null)
    const glowRef = useRef<THREE.Mesh>(null)
    const innerGlowRef = useRef<THREE.PointLight>(null)
    const secondaryGlowRef = useRef<THREE.PointLight>(null)
    const planetOccluderRef = useRef<THREE.Mesh>(null)
    const [loaded, setLoaded] = useState(false)
    const { scene, camera } = useThree()

    // Expose the planet group ref to parent components
    useImperativeHandle(ref, () => ({
      planetGroupRef,
    }))

    // 가장 가까운 마커를 추적하기 위한 상태
    const [closestMarkers, setClosestMarkers] = useState<number[]>([0, 1])

    // 카메라 시야에 있는 마커를 추적하기 위한 상태 추가
    const [visibleMarkers, setVisibleMarkers] = useState<number[]>([])

    // 카메라 움직임 감지를 위한 상태
    const [cameraHasMoved, setCameraHasMoved] = useState(false)
    const lastCameraPositionRef = useRef<THREE.Vector3>(new THREE.Vector3())

    // 모바일 환경 감지를 위한 상태 추가
    const [isMobileState, setIsMobile] = useState(false)

    // 카메라 frustum을 계산하기 위한 참조
    const frustumRef = useRef(new THREE.Frustum())
    const projScreenMatrixRef = useRef(new THREE.Matrix4())

    // 레이캐스터 생성
    const raycasterRef = useRef(new THREE.Raycaster())

    // 행성 반지름 (오클루더 크기와 일치)
    const planetRadius = 6.3

    // 행성 클릭 핸들러 추가
    // const handlePlanetClick = () => {
    //   // 행성을 클릭하면 hero 섹션(1번 콘텐츠)으로 이동
    //   if (!activeSection && !isIntroActive) {
    //     onSectionClick("hero")
    //   }
    // }

    // 컴포넌트 마운트 시 로딩 상태 설정
    useEffect(() => {
      setLoaded(true)
      onLoaded()

      // 초기 카메라 위치 저장
      lastCameraPositionRef.current.copy(camera.position)

      // 모바일 환경 감지
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768)
      }

      // 초기 체크
      checkMobile()

      // 리사이즈 이벤트 리스너 추가
      window.addEventListener("resize", checkMobile)

      // 대기 효과를 위한 셰이더 생성
      const atmosphereVertexShader = `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `
      const atmosphereFragmentShader = `
      uniform vec3 glowColor;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.6 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        gl_FragColor = vec4(glowColor, 1.0) * intensity;
      }
    `

      // 대기 효과 메쉬 생성 - 크기 증가
      const atmosphereGeometry = new THREE.SphereGeometry(6.5, 32, 32)
      const atmosphereMaterial = new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide,
        transparent: true,
        uniforms: {
          glowColor: { value: new THREE.Color(planetColor) },
        },
      })

      const atmosphereMesh = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial)
      glowRef.current = atmosphereMesh
      scene.add(atmosphereMesh)

      return () => {
        scene.remove(atmosphereMesh)
        window.removeEventListener("resize", checkMobile)
      }
    }, [onLoaded, scene, camera])

    // Update atmosphere color when planetColor changes
    useEffect(() => {
      if (glowRef.current && glowRef.current.material instanceof THREE.ShaderMaterial) {
        glowRef.current.material.uniforms.glowColor.value.set(planetColor)
      }
    }, [planetColor])

    // 각 섹션 마커의 궤도 설정 - 더 예쁘게 배치
    const orbitalConfigs = useMemo(() => {
      // 균일한 간격으로 배치하기 위한 계산
      const sectionCount = sections.length
      const angleStep = (Math.PI * 2) / sectionCount

      // 모든 궤도의 반경을 동일하게 설정
      const orbitRadius = 10.0

      return sections.map((_, index) => {
        // 균일한 간격으로 시작 각도 배치
        const startAngle = index * angleStep

        // 궤도 기울기를 다양하게 설정하여 겹침 방지
        const orbitTiltX = Math.sin(index * 0.7) * 0.5
        const orbitTiltY = Math.cos(index * 0.9) * 0.4
        const orbitTiltZ = Math.sin(index * 1.2) * 0.3

        // 속도도 패턴을 가지도록 설정
        const orbitSpeed = 0.03 + Math.sin(index * 0.8) * 0.01

        return {
          radius: orbitRadius,
          tiltX: orbitTiltX,
          tiltY: orbitTiltY,
          tiltZ: orbitTiltZ,
          speed: orbitSpeed,
          startAngle: startAngle,
          color: orbitColor, // Use the theme orbit color
        }
      })
    }, [orbitColor])

    // 마커 위치를 저장하기 위한 참조
    const markerPositionsRef = useRef<THREE.Vector3[]>(Array(sections.length).fill(new THREE.Vector3()))

    // 행성 애니메이션 및 효과
    useFrame(({ clock }) => {
      const time = clock.getElapsedTime()

      // 대기 효과 회전
      if (glowRef.current && !activeSection) {
        glowRef.current.rotation.y += 0.0005
      }

      // 맥박 효과를 위한 사인 파동 (0~1 사이)
      const pulse = (Math.sin(time * 0.3) + 1) * 0.5 // 0.5에서 0.3으로 속도 감소

      // Use the provided colors directly
      const currentColor = new THREE.Color(planetColor)
      const pulseColor = new THREE.Color(planetColor).lerp(
        new THREE.Color().setRGB(currentColor.r * 1.2, currentColor.g * 1.2, currentColor.b * 1.2),
        pulse,
      )

      // 내부 발광 효과 애니메이션
      if (innerGlowRef.current) {
        // 색상 업데이트
        innerGlowRef.current.color.copy(pulseColor)
        // 맥박 효과로 강도 변화 - 밝기 낮춤
        innerGlowRef.current.intensity = 3.5 + pulse * 2 // 5 + pulse * 3에서 3.5 + pulse * 2로 감소
      }

      // 보조 발광 효과 애니메이션
      if (secondaryGlowRef.current) {
        secondaryGlowRef.current.color.set(glowColor)
        secondaryGlowRef.current.intensity = 2 + pulse * 0.8 // 3 + pulse에서 2 + pulse * 0.8로 감소
      }

      // 대기 효과 색상 업데이트
      if (glowRef.current && glowRef.current.material instanceof THREE.ShaderMaterial) {
        glowRef.current.material.uniforms.glowColor.value.set(planetColor)
      }

      // 카메라 움직임 감지
      if (!cameraHasMoved) {
        // 카메라가 일정 거리 이상 움직였는지 확인
        const cameraMovementThreshold = 0.5
        const distanceMoved = camera.position.distanceTo(lastCameraPositionRef.current)

        if (distanceMoved > cameraMovementThreshold) {
          setCameraHasMoved(true)
        }
      }

      // 카메라 frustum 업데이트
      projScreenMatrixRef.current.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse)
      frustumRef.current.setFromProjectionMatrix(projScreenMatrixRef.current)

      // 각 마커가 카메라 시야에 있는지 확인
      const newVisibleMarkers: number[] = []

      markerPositionsRef.current.forEach((position, index) => {
        // 마커 위치에 작은 구체를 가정하여 시야 체크
        const sphere = new THREE.Sphere(position, 0.5)

        if (frustumRef.current.intersectsSphere(sphere)) {
          // 카메라에서 마커까지의 방향 벡터 계산
          const direction = position.clone().sub(camera.position).normalize()

          // 레이캐스터 설정
          raycasterRef.current.set(camera.position, direction)

          // 행성 중심까지의 거리 계산
          const distanceToCenter = camera.position.distanceTo(new THREE.Vector3(0, 0, 0))

          // 마커까지의 거리 계산
          const distanceToMarker = camera.position.distanceTo(position)

          // 행성 중심과 카메라 사이의 거리가 행성 반지름보다 크고
          // 마커가 행성 뒤에 있지 않은 경우에만 표시
          if (distanceToCenter > planetRadius || distanceToMarker < distanceToCenter) {
            // 행성 구체와의 교차 확인
            const planetSphere = new THREE.Sphere(new THREE.Vector3(0, 0, 0), planetRadius)
            const ray = new THREE.Ray(camera.position, direction)
            const intersectionPoint = new THREE.Vector3()

            // 레이가 행성과 교차하는지 확인
            const doesIntersect = ray.intersectSphere(planetSphere, intersectionPoint)

            // 교차점까지의 거리 계산
            const distanceToIntersection = doesIntersect
              ? camera.position.distanceTo(intersectionPoint)
              : Number.POSITIVE_INFINITY

            // 교차점이 마커보다 멀리 있거나 교차하지 않으면 마커는 보임
            if (!doesIntersect || distanceToIntersection > distanceToMarker) {
              newVisibleMarkers.push(index)
            }
          }
        }
      })

      // 시야에 있는 마커 업데이트
      if (JSON.stringify(newVisibleMarkers) !== JSON.stringify(visibleMarkers)) {
        setVisibleMarkers(newVisibleMarkers)
      }

      // 활성화된 섹션이 없을 때 가장 가까운 마커 계산 (모바일에서는 카메라 움직임 감지 없이도 작동)
      if (!activeSection && (cameraHasMoved || isMobileState)) {
        // 각 마커까지의 거리 계산
        const distances = markerPositionsRef.current.map((position, index) => {
          // 카메라에서 마커까지의 거리 계산
          const distance = camera.position.distanceTo(position)
          return { index, distance }
        })

        // 거리에 따라 정렬
        distances.sort((a, b) => a.distance - b.distance)

        // 모바일에서는 더 많은 마커 표시 (3개)
        const numMarkersToShow = isMobileState ? 3 : 2

        // 가장 가까운 마커 인덱스 추출
        const newClosestMarkers = distances.slice(0, numMarkersToShow).map((item) => item.index)

        // 이전 상태와 다를 경우에만 업데이트
        if (
          newClosestMarkers.length !== closestMarkers.length ||
          newClosestMarkers.some((marker, idx) => marker !== closestMarkers[idx])
        ) {
          setClosestMarkers(newClosestMarkers)
        }
      }

      // 현재 카메라 위치 저장
      lastCameraPositionRef.current.copy(camera.position)
    })

    // 마커 위치 업데이트 함수
    const updateMarkerPosition = (index: number, position: THREE.Vector3) => {
      markerPositionsRef.current[index] = position.clone()
    }

    // isMobile 상태 업데이트
    useEffect(() => {
      setIsMobile(isMobile)
    }, [isMobile])

    // 마커가 표시되어야 하는지 확인하는 함수
    const shouldShowMarker = (index: number) => {
      // 활성화된 섹션이 있으면 모든 마커 숨김
      if (activeSection !== null) return false

      // 모바일에서는 시야에 있는 마커만 표시
      if (isMobileState) {
        return visibleMarkers.includes(index)
      }

      // 데스크톱에서는 가장 가까운 마커 표시
      return closestMarkers.includes(index)
    }

    return (
      <group ref={planetGroupRef}>
        {/* Enhanced pulsing glow for intro */}
        <PulsingGlow
          active={isIntroActive}
          color={planetColor}
          intensity={5}
          distance={25}
          pulseSpeed={1.2}
          pulseIntensity={2}
        />

        {/* Regular glow effects */}
        <pointLight ref={innerGlowRef} position={[0, 0, 0]} intensity={5} color={planetColor} distance={20} />
        <pointLight ref={secondaryGlowRef} position={[0, 0, 0]} intensity={3} color={glowColor} distance={30} />

        {/* 행성 오클루더 - 매우 투명하게 설정하여 내부 카운트다운이 잘 보이도록 함 */}
        <Sphere ref={planetOccluderRef} args={[planetRadius, 32, 32]}>
          <meshBasicMaterial color={planetColor} transparent opacity={0.05} depthWrite={true} colorWrite={true} />
        </Sphere>

        {/* Section markers with their orbits - only show when not in intro mode */}
        {!isIntroActive &&
          !activeSection &&
          sections.map((section, index) => (
            <SectionMarker
              key={section.id}
              section={section}
              onClick={() => onSectionClick(section.id)}
              isActive={activeSection === section.id}
              anyActive={activeSection !== null}
              orbitConfig={orbitalConfigs[index]}
              index={index}
              isVisible={shouldShowMarker(index)}
              updatePosition={(position) => updateMarkerPosition(index, position)}
            />
          ))}
        {/* 행성 중앙에 카운트다운 타이머 추가 - 항상 보이도록 설정 */}
        {!isIntroActive && !activeSection && (
          <PlanetCountdown
            position={[0, 0, 0]}
            color={planetColor}
            planetRadius={planetRadius}
            scale={1.5} // 크기를 1.5로 증가 (PlanetCountdown 내부에서 4배 더 증가)
            onSectionClick={() => onSectionClick("hero")} // hero 섹션으로 이동하는 함수 전달
          />
        )}
      </group>
    )
  },
)

Planet.displayName = "Planet"

export default Planet
