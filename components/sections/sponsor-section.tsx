"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "../language-provider"
import type { Theme } from "@/lib/themes"

interface SponsorSectionProps {
  theme: Theme
}

export default function SponsorSection({ theme }: SponsorSectionProps) {
  const { t, language } = useLanguage()
  const [sponsorLogos] = useState([
    { src: "/images/sponsors/oliveyoung.png", alt: "Olive Young" },
    { src: "/images/sponsors/sponsor1.png", alt: "Sponsor 1" },
    { src: "/images/sponsors/sponsor2.png", alt: "Sponsor 2" },
    { src: "/images/sponsors/sponsor3.png", alt: "Sponsor 3" },
    { src: "/images/sponsors/hyundai.png", alt: "Hyundai" },
    { src: "/images/sponsors/googlecloud.png", alt: "Google Cloud" },
    { src: "/images/sponsors/yojeumit-gray.png", alt: "요즘IT" },
  ])

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
    <div className="max-w-6xl mx-auto px-4 py-5" style={{ fontFamily: "var(--font-42dot)" }}>
      {/* 헤더 */}
      <div className="text-center mb-16">
        <div className="text-gray-400 mb-2 uppercase tracking-wider text-sm">Sponsor</div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {language === "kr" ? "FEConf를 함께하는" : "Partners Supporting"}
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
          {language === "kr" ? "후원사를 소개합니다" : "Our Amazing Sponsors"}
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* 좌측 - 메인 콘텐츠 */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2
            className="text-2xl md:text-3xl font-extrabold text-white mb-6"
            style={{
              lineHeight: "1.4",
              fontWeight: "700",
            }}
          >
            {language === "kr" ? (
              <>
                FECONF25를
                <br />
                함께 만들어갈 후원사를
                <br />
                모집합니다
              </>
            ) : (
              <>
                We are looking for
                <br />
                sponsors to join
                <br />
                FECONF25
              </>
            )}
          </h2>

          <div className="text-base font-bold text-white mb-8" style={{ fontWeight: "700" }}>
            {language === "kr" ? "후원 문의: sponsor@feconf.org" : "Sponsorship inquiry: sponsor@feconf.org"}
          </div>

          <Button
            className="group relative overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-center rounded-[200px] w-fit"
            style={buttonStyle}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, buttonHoverStyle)
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, buttonStyle)
            }}
          >
            <span className="relative z-10 whitespace-normal text-center px-1">
              {language === "kr" ? "후원사 신청하기" : "Sign up as a sponsor"}
            </span>
          </Button>
        </motion.div>

        {/* 우측 - 설명 */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="space-y-4 text-white/90 text-sm">
            <p>
              {language === "kr"
                ? "FEConf는 국내외 프론트엔드 개발자들이 한자리에 모여 경험을 나누고, 기술의 흐름을 함께 만들어가는 자리입니다."
                : "FEConf is a place where frontend developers from Korea and abroad gather to share experiences and create technological trends together."}
            </p>

            <p>
              {language === "kr"
                ? "이번 행사를 위해  많은 개발자들과 소통하고, 더욱 풍성한 경험을 제공할 수 있는 후원사를 찾고 있습니다."
                : "For this event, we are looking for sponsors to communicate with more developers and provide a richer experience."}
            </p>
          </div>
        </motion.div>
      </div>

      {/* 후원사 로고 섹션 */}
      <motion.div
        className="mt-12"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <div className="text-sm font-bold mb-6 text-white" style={{ fontWeight: "700" }}>
          {language === "kr" ? "역대 후원사 리스트" : "Previous Sponsors"}
        </div>
        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex items-center"
            animate={{
              x: [0, -1500],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "linear",
              },
            }}
          >
            {sponsorLogos.map((logo, index) => (
              <div
                key={`logo-${index}`}
                className="mx-6 flex-shrink-0 flex items-center justify-center"
                style={{ width: "180px", height: "100px" }}
              >
                <img
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                  style={{ maxHeight: "70px" }}
                />
              </div>
            ))}

            {/* 두 번째 세트의 로고들 (무한 루프를 위해 복제) */}
            {sponsorLogos.map((logo, index) => (
              <div
                key={`logo-dup-${index}`}
                className="mx-6 flex-shrink-0 flex items-center justify-center"
                style={{ width: "180px", height: "100px" }}
              >
                <img
                  src={logo.src || "/placeholder.svg"}
                  alt={logo.alt}
                  className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                  style={{ maxHeight: "70px" }}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Media Partner 섹션 */}
      <motion.div
        className="mt-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="text-center">
          <div className="text-gray-400 mb-4 uppercase tracking-wider text-sm font-medium">Media Partner</div>
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center" style={{ width: "200px", height: "80px" }}>
              <img
                src="/images/sponsors/yojeumit-gray.png"
                alt="요즘IT"
                className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-90 hover:opacity-100 transition-opacity"
                style={{ maxHeight: "60px" }}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
