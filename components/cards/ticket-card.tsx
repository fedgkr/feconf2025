"use client"
import { Button } from "@/components/ui/button"
import { useLanguage } from "../language-provider"
import type { Theme } from "@/lib/themes"
import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"

interface TicketCardProps {
  theme: Theme
}

export default function TicketCard({ theme }: TicketCardProps) {
  const { t } = useLanguage()

  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6])

  const benefits = [
    {
      kr: "공식 세션 참여",
      en: "Official session participation",
    },
    {
      kr: "라이트닝 톡 참여",
      en: "Lightning talk participation",
    },
    {
      kr: "네트워킹 참여",
      en: "Networking participation",
    },
    {
      kr: "토스 개발자와의 Private 네트워킹 신청권",
      en: "Toss developer private networking application",
    },
    {
      kr: "패널 토크 참가",
      en: "Panel talk participation",
    },
    {
      kr: "패널과의 네트워킹",
      en: "Networking with panelists",
    },
    {
      kr: "우선 입장 (별도 레인)",
      en: "Priority entrance (separate lane)",
    },
  ]

  const ticketData = [
    {
      name: { kr: "Standard Ticket", en: "Standard Ticket" },
      price: { kr: "50,000원", en: "$38" },
      benefits: [true, true, true, true, false, false, false],
    },
    {
      name: { kr: "Gold Ticket", en: "Gold Ticket" },
      price: { kr: "150,000원", en: "$115" },
      benefits: [true, true, true, true, true, true, true],
    },
  ]

  return (
    <motion.div
      ref={containerRef}
      className="w-full max-w-6xl mx-auto text-white"
      style={{
        scale,
        opacity,
      }}
    >
      <div className="text-center pb-8">
        <h2
          className="text-3xl md:text-4xl font-semibold text-white mb-4"
          style={{
            fontFamily: "Jost, sans-serif",
            fontWeight: 600,
          }}
        >
          Tickets
        </h2>
        <p className="text-white/70">
          {t(
            "FEconf 2025에 참여하여 최신 프론트엔드 기술과 트렌드를 경험해보세요.",
            "Join FEconf 2025 to experience the latest frontend technologies and trends.",
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* Standard Ticket */}
        <motion.div
          className="p-6 md:px-8 md:pt-8 md:pb-11 rounded-xl bg-gray-900/30 backdrop-blur-md border border-gray-800 relative cursor-pointer"
          whileHover={{
            y: -8,
            boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1), 0 0 30px rgba(255, 255, 255, 0.05)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* 가격 */}
          <div className="text-left mb-6">
            <h3 className="text-xl text-white mb-2 font-semibold" style={{ fontFamily: "Jost, sans-serif" }}>
              Standard Ticket
            </h3>
            <div className="text-3xl font-medium text-white mb-2">
              {t("50,000", "₩50,000")}
              <span className="text-lg ml-1">{t("원", "")}</span>
            </div>
            <p className="text-xs text-white/60">
              {t(
                "첫 교류와 성장을 원하는 주니어 개발자분들께 추천해요.",
                "Recommended for junior developers seeking first connections and growth.",
              )}
            </p>
          </div>

          {/* 구매 버튼 */}
          <div className="mb-8">
            <Button
              className="w-full bg-gray-800/40 hover:bg-gray-700/50 text-white border border-gray-600/50 hover:border-gray-500/70 transition-all duration-300"
              onClick={() => {
                window.open("https://www.ticketa.co/events/10", "_blank", "noopener,noreferrer")
              }}
            >
              {t("구매하기", "Buy Tickets")}
            </Button>
          </div>

          {/* 혜택 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src="/images/icons/ic-check.png" alt="check" className="w-5 h-5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{t("공식 세션 참여", "Official session participation")}</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/icons/ic-check.png" alt="check" className="w-5 h-5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{t("라이트닝 톡 참여", "Lightning talk participation")}</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/icons/ic-check.png" alt="check" className="w-5 h-5 flex-shrink-0" />
              <button
                className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1"
                onClick={() => {
                  const networkingSection = document.getElementById("section-networking")
                  if (networkingSection) {
                    networkingSection.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }}
              >
                {t("네트워킹 참여", "Networking participation")}
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/icons/ic-check.png" alt="check" className="w-5 h-5 flex-shrink-0" />
              <button
                className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1"
                onClick={() => {
                  const networkingSection = document.getElementById("section-networking")
                  if (networkingSection) {
                    networkingSection.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }}
              >
                {t("토스 개발자와의 Private 네트워킹 신청권", "Toss developer private networking application")}
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Gold Ticket */}
        <motion.div
          className="p-6 md:px-8 md:pt-8 md:pb-11 rounded-xl bg-gray-900/40 backdrop-blur-md border border-gray-800 relative cursor-pointer"
          whileHover={{
            y: -8,
            boxShadow: "0 20px 40px rgba(255, 255, 255, 0.1), 0 0 30px rgba(255, 255, 255, 0.05)",
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* 가격 */}
          <div className="text-left mb-6">
            <h3 className="text-xl text-white mb-2 font-semibold" style={{ fontFamily: "Jost, sans-serif" }}>
              Gold Ticket
            </h3>
            <div className="text-3xl font-medium text-white mb-2">
              {t("150,000", "₩150,000")}
              <span className="text-lg ml-1">{t("원", "")}</span>
            </div>
            <p className="text-xs text-white/60">
              {t(
                "깊이 있는 인사이트를 나누고 싶은 현업 개발자분들께 추천해요.",
                "Recommended for collaborative developers who want to share deep insights.",
              )}
            </p>
          </div>

          {/* 구매 버튼 */}
          <div className="mb-8">
            <Button
              className="w-full bg-white text-black hover:bg-white/90 font-bold hover:shadow-lg transition-all duration-300"
              onClick={() => {
                window.open("https://www.ticketa.co/events/10", "_blank", "noopener,noreferrer")
              }}
            >
              {t("구매하기", "Buy Tickets")}
            </Button>
          </div>

          {/* 혜택 */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <img src="/images/icons/ic-check.png" alt="check" className="w-5 h-5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{t("공식 세션 참여", "Official session participation")}</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/icons/ic-check.png" alt="check" className="w-5 h-5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{t("라이트닝 톡 참여", "Lightning talk participation")}</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/icons/ic-check.png" alt="check" className="w-5 h-5 flex-shrink-0" />
              <button
                className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1"
                onClick={() => {
                  const networkingSection = document.getElementById("section-networking")
                  if (networkingSection) {
                    networkingSection.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }}
              >
                {t("네트워킹 참여", "Networking participation")}
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/icons/ic-check.png" alt="check" className="w-5 h-5 flex-shrink-0" />
              <button
                className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1"
                onClick={() => {
                  const networkingSection = document.getElementById("section-networking")
                  if (networkingSection) {
                    networkingSection.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }}
              >
                {t("토스 개발자와의 Private 네트워킹 신청권", "Toss developer private networking application")}
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/icons/ic-plus.png" alt="plus" className="w-5 h-5 flex-shrink-0" />
              <button
                className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer text-left flex items-center gap-1"
                onClick={() => {
                  const panelSection = document.getElementById("section-panel")
                  if (panelSection) {
                    panelSection.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                }}
              >
                {t("패널 토크 참가", "Panel talk participation")}
                <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/icons/ic-plus.png" alt="plus" className="w-5 h-5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">{t("패널과의 네트워킹", "Networking with panelists")}</span>
            </div>
            <div className="flex items-center gap-3">
              <img src="/images/icons/ic-plus.png" alt="plus" className="w-5 h-5 flex-shrink-0" />
              <span className="text-gray-300 text-sm">
                {t("우선 입장 (별도 레인)", "Priority entrance (separate lane)")}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Important Notes */}
      <motion.div className="mt-8 p-6 md:p-6 rounded-xl bg-gray-900/30 backdrop-blur-md border border-gray-800 max-w-4xl mx-auto">
        <h4 className="font-semibold mb-3 text-white/90">{t("주의사항", "Important Notes")}</h4>
        <ul className="text-sm text-gray-300 space-y-2">
          <li>• {t("티켓 환불은 행사일 기준 10일 전까지 가능합니다.", "Ticket refunds are available up to 10 days before the event date.")}</li>
          <li>• {t("골드 티켓은 한정 수량으로 판매됩니다.", "Gold tickets are sold in limited quantities.")}</li>
          <li>
            •{" "}
            {t(
              "현장 등록은 불가능하니 사전 구매해주세요.",
              "On-site registration is not available. Please purchase in advance.",
            )}
          </li>
        </ul>
      </motion.div>
    </motion.div>
  )
}
