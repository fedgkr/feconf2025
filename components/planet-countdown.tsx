"use client"

import { useLanguage } from "./language-provider"

interface PlanetCountdownProps {
  position?: [number, number, number]
  scale?: number
  color?: string
  planetRadius?: number
  onSectionClick?: () => void
}

export default function PlanetCountdown({
  position = [0, 0, 0],
  scale = 1,
  color = "#FFFFFF",
  planetRadius = 6.3,
  onSectionClick,
}: PlanetCountdownProps) {
  const { t, language } = useLanguage()

  // 카운트다운 제거 - 빈 컴포넌트 반환
  return null
}
