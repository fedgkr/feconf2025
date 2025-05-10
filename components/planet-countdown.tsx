"use client"

import { useState, useEffect } from "react"
import { Html, Billboard } from "@react-three/drei"
import { useLanguage } from "./language-provider"

interface PlanetCountdownProps {
  position?: [number, number, number]
  scale?: number
  color?: string
  planetRadius?: number
  onSectionClick?: () => void // 클릭 이벤트 핸들러 추가
}

export default function PlanetCountdown({
  position = [0, 0, 0],
  scale = 1,
  color = "#FFFFFF",
  planetRadius = 6.3,
  onSectionClick,
}: PlanetCountdownProps) {
  const { t, language } = useLanguage()
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  // FEconf 날짜 설정 (2025년 8월 23일)
  useEffect(() => {
    const feconfDate = new Date("2025-08-23T09:00:00+09:00")

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = feconfDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    // 초기 계산
    calculateTimeLeft()

    // 1초마다 업데이트
    const timer = setInterval(calculateTimeLeft, 1000)

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer)
  }, [])

  // 군청색 정의
  const navyBlueColor = "#0A2463"

  // 클릭 핸들러 함수
  const handleClick = () => {
    if (onSectionClick) {
      onSectionClick()
    }
  }

  return (
    <group>
      {/* 구체 중앙에 카운트다운 배치 - 항상 카메라를 향하도록 Billboard 사용 */}
      <Billboard position={[0, 0, 0]} follow={true} lockX={false} lockY={false} lockZ={false}>
        {/* 내부 발광 효과 추가 - 강도 증가 */}
        <pointLight color={color} intensity={3} distance={5} />
        <Html
          center
          transform
          scale={scale * 6} // 크기를 6배로 증가 (기존 4배에서 1.5배 더 증가)
          distanceFactor={1}
          zIndexRange={[100, 0]}
          occlude={false}
          style={{
            width: "auto",
            height: "auto",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* pointer-events-none 클래스 제거하고 onClick 이벤트 추가 */}
          <div
            className="flex flex-col items-center justify-center select-none"
            onClick={handleClick}
            style={{ cursor: "pointer" }}
          >
            <div
              className="text-center"
              style={{
                backgroundColor: "transparent", // 배경 완전 투명
                whiteSpace: "nowrap",
                padding: "10px", // 클릭 영역 확장을 위한 패딩 추가
              }}
            >
              {/* 상단 레이블 - 군청색으로 변경, 투명도 20% 설정, font-weight를 normal로 유지 */}
              <div
                className="text-base"
                style={{
                  color: navyBlueColor,
                  opacity: 0.2,
                  textShadow: `0 0 5px ${color}, 0 0 10px ${color}`,
                  marginBottom: "0.7rem", // 간격 추가 감소 (0.9rem에서 0.7rem으로)
                  fontSize: "0.8rem", // 텍스트 크기 20% 감소
                  fontFamily: "var(--font-orbitron), sans-serif", // Orbitron 폰트 적용
                  fontWeight: "normal", // font-weight를 normal로 유지
                }}
              >
                {language === "kr" ? "FEconf 2025까지" : "Until FEconf 2025"}
              </div>
              <div className="flex items-center justify-center">
                {/* 디지털 시계 스타일의 숫자 표시 - 군청색으로 변경, 불투명도 30% 설정, font-weight를 light로 변경 */}
                <div
                  className="digital-clock"
                  style={{
                    fontFamily: "var(--font-orbitron), sans-serif", // Orbitron 폰트 적용
                    fontSize: "2.8rem", // 텍스트 크기 유지
                    letterSpacing: "0.05em",
                    lineHeight: "1",
                    color: navyBlueColor,
                    textShadow: `0 0 10px ${color}, 0 0 20px ${color}, 0 0 30px ${color}`,
                    fontWeight: "300", // font-weight를 light로 유지
                    opacity: 0.3,
                    transition: "opacity 0.2s ease", // 호버 효과를 위한 트랜지션 추가
                  }}
                >
                  <span>{timeLeft.days.toString().padStart(3, "0")}</span>
                  <span style={{ margin: "0 0.2em" }}>:</span>
                  <span>{timeLeft.hours.toString().padStart(2, "0")}</span>
                  <span style={{ margin: "0 0.2em" }}>:</span>
                  <span>{timeLeft.minutes.toString().padStart(2, "0")}</span>
                  <span style={{ margin: "0 0.2em" }}>:</span>
                  <span>{timeLeft.seconds.toString().padStart(2, "0")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* 디지털 시계 스타일을 위한 CSS */}
          <style jsx>{`
            .digital-clock {
              font-variant-numeric: tabular-nums;
              font-feature-settings: "tnum";
              -webkit-font-smoothing: antialiased;
            }
            
            /* 호버 효과 추가 */
            .flex:hover .digital-clock {
              opacity: 0.6 !important;
            }
          `}</style>
        </Html>
      </Billboard>
    </group>
  )
}
