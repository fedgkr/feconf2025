"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useLanguage } from "../language-provider"
import type { Theme } from "@/lib/themes"
import { useRef } from "react"

interface SponsorCardProps {
  theme: Theme
}

export default function SponsorCard({ theme }: SponsorCardProps) {
  const { t, language } = useLanguage()

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  return (
    <motion.div
      ref={containerRef}
      className="max-w-4xl mx-auto"
      style={{
        fontFamily: "var(--font-42dot)",
        scale,
        opacity,
      }}
    >
      {/* Header */}
      <div className="text-center mb-16">
        <h2
          className="text-3xl md:text-4xl font-bold text-white mb-6"
          style={{ fontFamily: "Jost, sans-serif", fontWeight: 700 }}
        >
          {language === "kr" ? "Sponsor" : "Sponsor"}
        </h2>
      </div>

      {/* Sponsor logos */}
      <motion.div
        className="mb-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex flex-wrap items-center justify-center gap-8 max-w-5xl mx-auto">
          {/* Ohouse */}
          <div className="flex items-center justify-center p-4 w-[180px] h-24">
            <img
              src="/images/sponsors/ohouse.png"
              alt="Ohouse"
              className="max-h-full w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* AWS */}
          <div className="flex items-center justify-center p-4 w-[180px] h-24">
            <img
              src="/images/sponsors/aws.png"
              alt="AWS"
              className="max-h-full w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* Moyo - 20% 크기 증가 */}
          <div className="flex items-center justify-center p-4 w-[180px] h-24">
            <img
              src="/images/sponsors/moyo.png"
              alt="Moyo"
              className="max-h-full w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              style={{ transform: "scale(1.2)" }}
            />
          </div>

          {/* 강남언니 */}
          <div className="flex items-center justify-center p-4 w-[180px] h-24">
            <img
              src="/images/sponsors/gangnam-unni.png"
              alt="강남언니"
              className="max-h-full w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>

          {/* LottieFiles - 20% 크기 증가 */}
          <div className="flex items-center justify-center p-4 w-[180px] h-24">
            <img
              src="/images/sponsors/lottiefiles.svg"
              alt="LottieFiles"
              className="max-h-full w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
              style={{ transform: "scale(1.2)" }}
            />
          </div>
        </div>
      </motion.div>

      {/* Sponsorship inquiry */}
      <motion.div
        className="text-center p-6 md:p-6 rounded-xl bg-gray-900/30 backdrop-blur-md border border-gray-800 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <h4 className="text-xl font-bold text-white mb-4">
          {language === "kr" ? "후원사가 되어주세요" : "Become Our Sponsor"}
        </h4>
        <p className="text-white/70 mb-4">
          {language === "kr"
            ? "FEConf와 함께 프론트엔드 개발 생태계를 만들어 나가요"
            : "Join us in contributing to the growth of Korea's frontend community"}
        </p>
        <div className="text-base font-light text-white">
          {language === "kr" ? "후원 문의: sponsor@feconf.org" : "Sponsorship inquiry: sponsor@feconf.org"}
        </div>
      </motion.div>
    </motion.div>
  )
}
