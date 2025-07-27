"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "./language-provider"
import { motion } from "framer-motion"

interface CountdownBoxProps {
  className?: string
  onClick?: () => void
}

export default function CountdownBox({ className, onClick }: CountdownBoxProps) {
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

  return (
    <motion.div
      className={`${className}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      style={{ cursor: onClick ? "pointer" : "default" }}
    ></motion.div>
  )
}
