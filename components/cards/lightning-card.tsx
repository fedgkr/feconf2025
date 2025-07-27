"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../language-provider"
import { Button } from "@/components/ui/button"
import type { Theme } from "@/lib/themes"
import { Calendar } from "lucide-react"

interface LightningCardProps {
  theme: Theme
}

export default function LightningCard({ theme }: LightningCardProps) {
  const { t, language } = useLanguage()

  const features = [
    {
      title: t("10분 발표", "10-min Talk"),
      description: t("짧지만 강렬한 경험", "Short but powerful"),
    },
    {
      title: t("사전 워크숍", "Pre-workshop"),
      description: t("발표 준�� 지���", "Presentation support"),
    },
    {
      title: t("다양한 주제", "Various Topics"),
      description: t("자유로운 주제 선택", "Choose freely"),
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
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("라이트닝 토크", "Lightning Talk")}</h3>
          <p className="text-gray-400">{t("10분, 짧지만 강렬하게", "10 minutes, short but intense")}</p>
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
          <div className="text-white font-semibold mb-3">{t("주제 예시", "Topic Examples")}</div>
          <div className="flex flex-wrap gap-2">
            {[
              t("실패 자랑기", "Failure Stories"),
              t("취업 경험담", "Job Experience"),
              t("주니어 리딩", "Junior Leading"),
              t("AI 협업", "AI Collaboration"),
            ].map((topic, index) => (
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
          <Button className="px-8 py-3 rounded-xl transition-all duration-300" style={buttonStyle}>
            {t("라이트닝 토크 신청", "Apply for Lightning Talk")}
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
