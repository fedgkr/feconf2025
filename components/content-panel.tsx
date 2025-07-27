"use client"

import type React from "react"
import { TicketContent, SponsorContent, SpeakerContent, LightningContent, DefaultContent } from "./content-sections"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Users } from "lucide-react"

interface ContentPanelProps {
  activeTab: string
}

const ContentPanel: React.FC<ContentPanelProps> = ({ activeTab }) => {
  let content

  switch (activeTab) {
    case "tickets":
      content = <TicketContent />
      break
    case "sponsors":
      content = <SponsorContent />
      break
    case "speakers":
      content = <SpeakerContent />
      break
    case "lightning":
      content = <LightningContent />
      break
    case "networking":
      content = <NetworkingContent gradientStart="#0A2463" gradientEnd="#377DFF" />
      break
    default:
      content = <DefaultContent />
  }

  return <div className="content-panel">{content}</div>
}

export default ContentPanel

// NetworkingContent 컴포넌트 - 당근마켓 콜라보 내용으로 완전히 교체
function NetworkingContent({ gradientStart, gradientEnd }: { gradientStart: string; gradientEnd: string }) {
  const { t, language } = useLanguage()

  // 42dot Sans 폰트 스타일
  const fontStyle = { fontFamily: "var(--font-42dot)" }

  // 그라디언트 배경 스타일
  const gradientBgStyle = {
    backgroundColor: `${gradientStart}10`,
    border: `1px solid ${gradientStart}30`,
  }

  // 버튼 스타일
  const buttonStyle = {
    background: `#FFFFFF`,
    color: "#0A2463",
    fontWeight: "700",
    fontSize: "1.1rem",
    boxShadow: `0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.1)`,
    minWidth: "36.8%",
    height: "46.2px",
    padding: "0 1.5rem",
  }

  // 버튼 호버 스타일
  const buttonHoverStyle = {
    background: `#FFFFFF`,
    boxShadow: `0 0 20px rgba(255,255,255,0.7), 0 0 40px rgba(255,255,255,0.4), 0 0 60px rgba(255,255,255,0.2)`,
  }

  return (
    <div
      className="w-full flex flex-col justify-center py-2"
      style={{ maxWidth: "83%", margin: "0 auto", ...fontStyle }}
    >
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          {/* 좌측 - 메인 콘텐츠 */}
          <div className="flex flex-col justify-center md:col-span-3">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-2xl md:text-3xl font-bold text-white" style={{ fontWeight: "700" }}>
                FEConf
              </span>
              <span className="text-xl md:text-2xl font-bold text-white/80">x</span>
              <img src="/images/karrot-logo.png" alt="Karrot Logo" className="h-8 md:h-10" />
            </div>

            <h2
              className="text-2xl md:text-3xl font-extrabold text-white mb-6"
              style={{ lineHeight: "1.4", fontWeight: "700" }}
            >
              {t("네트워킹에서 새로운 인연을 만나세요", "Meet new connections at Networking")}
            </h2>

            <p className="text-white/80 text-base mb-8">
              {t(
                "이번에 당근과 함께하는 네트워킹 활동은 FEConf 세션 연사자 및 참여자들과 여러 주제로 대화를 나누어 볼 수 있는 활동이에요. 컨퍼런스에 참여한 누구나 네트워킹 모임에 참여할 수 있어요!",
                "This networking event, in collaboration with Karrot, is an opportunity to talk about various topics with FEConf speakers and attendees. Anyone at the conference can join the networking session!",
              )}
            </p>

            <Button
              className="group relative overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-center rounded-[200px] w-fit"
              style={buttonStyle}
              onMouseEnter={(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)}
              onMouseLeave={(e) => Object.assign(e.currentTarget.style, buttonStyle)}
            >
              <span className="relative z-10 whitespace-normal text-center px-1">
                {t("네트워킹 참여하기", "Join Networking")}
              </span>
            </Button>
          </div>

          {/* 우측 - 장식용 패널 */}
          <div className="hidden md:flex flex-col items-center justify-center md:col-span-2 h-full">
            <div
              className="w-full h-full rounded-xl p-6 flex items-center justify-center"
              style={{ ...gradientBgStyle, minHeight: "250px" }}
            >
              <div className="relative w-40 h-40">
                <motion.div
                  className="absolute inset-0 rounded-full border-2"
                  style={{ borderColor: `${gradientStart}40` }}
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-4 rounded-full border-2"
                  style={{ borderColor: `${gradientStart}60` }}
                  animate={{ scale: [1.1, 1, 1.1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users size={48} className="text-white/80" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
