"use client"

import { motion } from "framer-motion"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "../language-provider"
import type { Theme } from "@/lib/themes"

interface SpeakerCardProps {
  theme: Theme
}

export default function SpeakerCard({ theme }: SpeakerCardProps) {
  const { t, language } = useLanguage()

  const features = [
    {
      title: t("발표 기회", "Speaking Opportunity"),
      description: t("1200명 앞에서 발표", "Present to 1200 attendees"),
    },
    {
      title: t("강연료 지급", "Honorarium"),
      description: t("행사 후 강연료 지급", "Payment after event"),
    },
    {
      title: t("네트워킹", "Networking"),
      description: t("개발자들과 교류", "Connect with developers"),
    },
  ]

  const buttonStyle = {
    background: `#FFFFFF`,
    color: "#0A2463",
    fontWeight: "700",
    boxShadow: `0 0 15px rgba(255,255,255,0.5)`,
  }

  return (
    <motion.div
      className="max-w-6xl mx-auto px-10 py-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      whileHover={{
        scale: 1.02,
      }}
    >
      <div className="p-8 md:p-12 md:px-0 md:py-0">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("스피커 모집", "Speaker Recruitment")}</h3>
          <p className="text-gray-400">
            {t("FEConf 2025의 주인공이 되어주세요", "Become the protagonist of FEConf 2025")}
          </p>
        </div>

        {/* 마감일 정보 - 컬러톤 통일 */}
        <div className="text-center mb-8 p-4 rounded-xl bg-gray-900/30 backdrop-blur-md border border-gray-800">
          <div className="flex items-center justify-center gap-2 text-white mb-2">
            <Calendar size={16} />
            <span className="font-bold">{t("마감임박", "Deadline Approaching")}</span>
          </div>
          <div className="text-gray-400 text-sm">
            {t("제안서 마감: 2025년 5월 16일 23:59:59", "Deadline: May 16, 2025, 23:59:59")}
          </div>
        </div>

        {/* 특징 - 컬러톤 통일 */}
        <div className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 rounded-xl bg-gray-900/30 backdrop-blur-md border border-gray-800"
            >
              <div>
                <div className="font-semibold text-white mb-1">{feature.title}</div>
                <div className="text-sm text-gray-400">{feature.description}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 주제 예시 - 컬러톤 통일 */}
        <div className="mb-8">
          <div className="text-white font-semibold mb-3">{t("인기 주제", "Popular Topics")}</div>
          <div className="flex flex-wrap gap-2">
            {["AI & Frontend", "React 19", "Next.js", "Testing", "CSS"].map((topic, index) => (
              <span
                key={index}
                className="px-3 py-1 text-xs rounded-xl bg-gray-900/30 backdrop-blur-md border border-gray-800 text-white"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>

        {/* 버튼 - radius 통일 */}
        <div className="text-center">
          <Button
            className="px-8 py-3 rounded-xl transition-all duration-300"
            style={buttonStyle}
            onClick={() => {
              window.open(
                "https://docs.google.com/forms/d/1ntWMAIkHI3wIyQO8J5NwfegR2PY3uRhzG4aRH_4BtFY/edit",
                "_blank",
                "noopener,noreferrer",
              )
            }}
          >
            {t("스피커 신청하기", "Apply as Speaker")}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
