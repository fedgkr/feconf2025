"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { UserRound, Youtube, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "../language-provider"
import type { Theme } from "@/lib/themes"

interface TicketSectionProps {
  theme: Theme
}

export default function TicketSection({ theme }: TicketSectionProps) {
  const { t, language } = useLanguage()
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  const [animatedStats, setAnimatedStats] = useState<{
    participants: number
    subscribers: number
    views: number
  }>({
    participants: 0,
    subscribers: 0,
    views: 0,
  })

  // FEConf 날짜 설정 (2025년 8월 23일)
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

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      const targetParticipants = 3200
      const targetSubscribers = 11000
      const targetViews = 100000

      const duration = 2000
      const steps = 30
      const stepTime = duration / steps

      let currentStep = 0

      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps
        const easeProgress = 1 - (1 - progress) * (1 - progress)

        setAnimatedStats({
          participants: Math.round(targetParticipants * easeProgress),
          subscribers: Math.round(targetSubscribers * easeProgress),
          views: Math.round(targetViews * easeProgress),
        })

        if (currentStep >= steps) {
          clearInterval(interval)
        }
      }, stepTime)

      return () => clearInterval(interval)
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  const stats = [
    {
      icon: <UserRound size={22} />,
      label: t("누적 참가자", "Total Participants"),
      value: animatedStats.participants.toLocaleString(),
      suffix: t("명", ""),
      prefix: t("약 ", "about "),
    },
    {
      icon: <Youtube size={22} />,
      label: t("YouTube 구독자", "YouTube Subscribers"),
      value: animatedStats.subscribers.toLocaleString(),
      suffix: t("명", ""),
    },
    {
      icon: <Eye size={22} />,
      label: t("YouTube 연간 조회 수", "YouTube Annual Views"),
      value: animatedStats.views.toLocaleString(),
      suffix: t("view", ""),
    },
  ]

  const buttonStyle = {
    background: `#FFFFFF`,
    color: "#0A2463",
    fontWeight: "700",
    fontSize: "1.1rem",
    boxShadow: `0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.1)`,
    minWidth: "200px",
    height: "46.2px",
    padding: "0 1.5rem",
  }

  const buttonHoverStyle = {
    background: `#FFFFFF`,
    boxShadow: `0 0 20px rgba(255,255,255,0.7), 0 0 40px rgba(255,255,255,0.4), 0 0 60px rgba(255,255,255,0.2)`,
  }

  return (
    <div className="w-full px-6 py-5" style={{ fontFamily: "var(--font-42dot)" }}>
      {/* 헤더 */}
      <div className="text-center mb-16">
        <div className="text-gray-400 mb-2 uppercase tracking-wider text-sm">Ticket</div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {language === "kr" ? "FEConf 2025에" : "Join FEConf2025"}
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
          {language === "kr" ? "지금 참가하세요" : "Get Your Ticket Now"}
        </h3>
      </div>

      {/* 카운트다운 타이머 */}
      <motion.div
        className="flex flex-col items-center justify-center gap-6 text-white/60 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-xl md:text-2xl font-bold mb-4 text-center" style={{ fontWeight: "700" }}>
          {t("FEConf 2025까지 남은 시간", "Time remaining until FEConf2025")}
        </div>
        <div className="flex items-center gap-6 md:gap-8">
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-6xl font-bold text-white" style={{ fontWeight: "700" }}>
              {timeLeft.days}
            </div>
            <div className="text-sm md:text-base">{t("일", "Days")}</div>
          </div>
          <div className="text-3xl md:text-5xl font-bold" style={{ fontWeight: "700" }}>
            :
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-6xl font-bold text-white" style={{ fontWeight: "700" }}>
              {timeLeft.hours.toString().padStart(2, "0")}
            </div>
            <div className="text-sm md:text-base">{t("시간", "Hours")}</div>
          </div>
          <div className="text-3xl md:text-5xl font-bold" style={{ fontWeight: "700" }}>
            :
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-6xl font-bold text-white" style={{ fontWeight: "700" }}>
              {timeLeft.minutes.toString().padStart(2, "0")}
            </div>
            <div className="text-sm md:text-base">{t("분", "Minutes")}</div>
          </div>
          <div className="text-3xl md:text-5xl font-bold" style={{ fontWeight: "700" }}>
            :
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-6xl font-bold text-white" style={{ fontWeight: "700" }}>
              {timeLeft.seconds.toString().padStart(2, "0")}
            </div>
            <div className="text-sm md:text-base">{t("초", "Seconds")}</div>
          </div>
        </div>
      </motion.div>

      {/* 통계 정보 */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {stats.map((stat, index) => (
          <div key={index} className="flex flex-col items-center justify-center p-6 text-center">
            <div className="text-sm font-bold text-white/60 mb-2" style={{ fontWeight: "700" }}>
              {stat.label}
            </div>
            <div className="flex items-baseline justify-center">
              {stat.prefix && <span className="text-white/80 text-lg mr-1">{stat.prefix}</span>}
              <div className="text-3xl md:text-4xl font-extrabold text-white">{stat.value}</div>
              <span className="text-white/80 text-lg ml-1">{stat.suffix}</span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* 버튼 */}
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Button
          className="group relative overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-center rounded-[200px]"
          style={buttonStyle}
          onMouseEnter={(e) => {
            Object.assign(e.currentTarget.style, buttonHoverStyle)
          }}
          onMouseLeave={(e) => {
            Object.assign(e.currentTarget.style, buttonStyle)
          }}
          onClick={() => {
            window.open("https://www.youtube.com/@feconfkorea", "_blank", "noopener,noreferrer")
          }}
        >
          <span className="relative z-10 whitespace-normal text-center px-1">
            {t("이전 영상 보러가기", "Watch Previous Videos")}
          </span>
        </Button>
      </motion.div>
    </div>
  )
}
