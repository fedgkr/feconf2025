"use client"

import { motion } from "framer-motion"
import { useLanguage } from "../language-provider"
import type { Theme } from "@/lib/themes"
import { Button } from "@/components/ui/button"

interface NetworkingCardProps {
  theme: Theme
}

export default function NetworkingCard({ theme }: NetworkingCardProps) {
  const { t } = useLanguage()

  return (
    <div className="mx-auto">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.56 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight" style={{ fontFamily: "Jost, sans-serif" }}>
            {t("Networking Session", "Networking Session")}
          </h2>
          <p className="text-gray-300 text-sm leading-relaxed text-center">
            {t(
              "연사자와 참여자들이 현장에서 다양한 주제로 편하고 깊이 있게 대화할 수 있도록, FEConf와 파트너들이 함께합니다.",
              "FEConf and partners come together to enable speakers and participants to have comfortable and in-depth conversations on various topics at the venue.",
            )}
          </p>
        </div>

        {/* Two networking events */}
        <div className="space-y-5 md:space-y-7">
          {/* Open Networking - 당근 (청녹색) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.42, delay: 0.21 }}
            className="px-6 md:px-8 py-10 rounded-xl bg-gray-900/30 backdrop-blur-md border border-gray-800 w-full cursor-pointer"
          >
            {/* Title with Logo */}
            <div className="flex items-center gap-3 mb-6">
              <img src="/images/karrot-logo.png" alt="Karrot Logo" className="h-8 w-auto" />
              <h4
                className="text-xl font-bold text-white text-left break-keep"
                style={{ fontFamily: "Jost, sans-serif" }}
              >
                {t("Open Networking", "Open Networking")}
              </h4>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-8">
              {/* Content Section */}
              <div className="flex-1 md:pr-8">
                <div>
                  <p
                    className="text-gray-300 text-base md:text-lg font-normal leading-relaxed text-left break-keep"
                    dangerouslySetInnerHTML={{
                      __html: t(
                        "누구나 참여할 수 있는 네트워킹 세션을 통해<br />연사자와 참가자들이 주제별로 대화를 나누는 시간을 준비했어요.",
                        "We've prepared a networking session where anyone can participate, allowing speakers and attendees to have topic-based conversations.",
                      ),
                    }}
                  />
                </div>
              </div>

              {/* Button Section - Desktop only */}
              <div className="hidden md:flex flex-shrink-0 items-start w-auto">
                <Button
                  className="w-full bg-white text-black hover:bg-white/90 font-bold hover:shadow-lg transition-all duration-300"
                  onClick={() =>
                    window.open(
                      "https://www.notion.so/FEConf-2025-22b0f52e032c804cab24ef4e0f344543",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  {t("참여 가이드", "Participation Guide")}
                </Button>
              </div>
            </div>

            {/* Steps - Full Width - 당근 청녹색 테마 */}
            <div className="space-y-4 bg-gray-900/60 p-4 rounded-lg border border-gray-800 w-full mt-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-green-300 text-xs font-bold">
                  1
                </div>
                <p className="text-gray-300 text-sm leading-relaxed text-left break-keep">
                  {t(
                    "당근 모임에 입장해 관심 주제를 기반으로 네트워킹에 참여해요.",
                    "Join the Karrot gathering and participate in networking based on topics of interest.",
                  )}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-green-300 text-xs font-bold">
                  2
                </div>
                <p className="text-gray-300 text-sm leading-relaxed text-left break-keep">
                  {t(
                    "세션 연사자들과 함께, 주제별 테이블에서 진솔한 이야기를 나눌 수 있어요.",
                    "You can have sincere conversations with session speakers at topic-based tables.",
                  )}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center text-green-300 text-xs font-bold">
                  3
                </div>
                <p className="text-gray-300 text-sm leading-relaxed text-left break-keep">
                  {t(
                    "자유로운 분위기에서 서로의 관심사를 소개하고, 인연을 이어가보세요.",
                    "In a relaxed atmosphere, introduce each other's interests and continue building connections.",
                  )}
                </p>
              </div>
            </div>

            {/* Button Section - Mobile only */}
            <div className="md:hidden mt-6">
              <Button
                className="w-full bg-white text-black hover:bg-white/90 font-bold hover:shadow-lg transition-all duration-300"
                onClick={() =>
                  window.open(
                    "https://www.notion.so/FEConf-2025-22b0f52e032c804cab24ef4e0f344543",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                {t("참여 가이드", "Participation Guide")}
              </Button>
            </div>
          </motion.div>

          {/* Private After Party - 토스 (파란색) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.42, delay: 0.21 }}
            className="px-6 md:px-8 py-10 rounded-xl bg-gray-900/30 backdrop-blur-md border border-gray-800 w-full cursor-pointer"
          >
            {/* Title with Logo */}
            <div className="flex items-center gap-3 mb-6">
              <img src="/images/sponsors/sponsor1.png" alt="Toss Logo" className="h-8 w-auto" />
              <h4
                className="text-xl font-bold text-white text-left break-keep"
                style={{ fontFamily: "Jost, sans-serif" }}
              >
                {t("Private After Party", "Private After Party")}
              </h4>
            </div>

            <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-8">
              {/* Content Section */}
              <div className="flex-1 md:pr-8">
                <div>
                  <p
                    className="text-gray-300 text-base md:text-lg font-normal leading-relaxed text-left break-keep"
                    dangerouslySetInnerHTML={{
                      __html: t(
                        "연사자, 토스 개발자, 참가자들이 함께 어우러지는<br />프라이빗 네트워킹 파티가 준비되어 있어요.",
                        "A private networking party where speakers, Toss developers, and participants come together is prepared.",
                      ),
                    }}
                  />
                </div>
              </div>

              {/* Button Section - Desktop only */}
              <div className="hidden md:flex flex-shrink-0 items-start w-auto">
                <Button
                  className="w-full bg-white text-black hover:bg-white/90 font-bold hover:shadow-lg transition-all duration-300"
                  onClick={() =>
                    window.open(
                      "https://www.notion.so/FAQ-2331c201f98b80e5bc4cfea508b2cc8c",
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                >
                  {t("참여 가이드", "Participation Guide")}
                </Button>
              </div>
            </div>

            {/* Steps - Full Width - 토스 파란색 테마 */}
            <div className="space-y-4 bg-gray-900/60 p-4 rounded-lg border border-gray-800 w-full mt-5">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-300 text-xs font-bold">
                  1
                </div>
                <p className="text-gray-300 text-sm leading-relaxed text-left break-keep">
                  {t(
                    "FEConf 종료 후, 토스에서 주최하는 프라이빗 파티가 열려요.",
                    "After FEConf ends, a private party will be held at Toss headquarters. (Scheduled for September 18, 6 PM)",
                  )}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-300 text-xs font-bold">
                  2
                </div>
                <p className="text-gray-300 text-sm leading-relaxed text-left break-keep">
                  {t(
                    "토스 프론트엔드 개발자와 연사자, 선정된 참가자들만 참여하는 특별한 자리예요.",
                    "It's a special occasion where only Toss frontend developers, speakers, and selected participants can join.",
                  )}
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-300 text-xs font-bold">
                  3
                </div>
                <p className="text-gray-300 text-sm leading-relaxed text-left break-keep">
                  {t(
                    "일반/골드 티켓 구매자는 신청 가능하며, 토스에서 선별해 개별 초대드려요.",
                    "Standard/Gold ticket holders can apply, and Toss will select and individually invite participants.",
                  )}
                </p>
              </div>
            </div>

            {/* Button Section - Mobile only */}
            <div className="md:hidden mt-6">
              <Button
                className="w-full bg-white text-black hover:bg-white/90 font-bold hover:shadow-lg transition-all duration-300"
                onClick={() =>
                  window.open(
                    "https://www.notion.so/FAQ-2331c201f98b80e5bc4cfea508b2cc8c",
                    "_blank",
                    "noopener,noreferrer",
                  )
                }
              >
                {t("참여 가이드", "Participation Guide")}
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
