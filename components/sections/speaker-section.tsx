"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLanguage } from "../language-provider"
import type { Theme } from "@/lib/themes"

interface SpeakerSectionProps {
  theme: Theme
}

export default function SpeakerSection({ theme }: SpeakerSectionProps) {
  const { t, language } = useLanguage()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

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

  const accordionItems = [
    {
      id: "how",
      title: {
        kr: "발표는 어떻게 신청하나요?",
        en: "How to apply for a presentation?",
      },
      content: {
        kr: `프론트엔드와 관련 있는 주제라면 무엇이든 환영합니다.

- 신청방법: 아래 양식 작성
- 신청기간: 2025.05.16 23:59:59 까지

소중한 경험을 공유해 주신 분에게는 행사 후 강연료를 지급합니다.`,
        en: `Any topic related to frontend development is welcome.

- How to apply: Fill out the form below
- Application period: Until May 16, 2025, 23:59:59

Speakers who share their valuable experiences will receive an honorarium after the event.`,
      },
    },
    {
      id: "purpose",
      title: {
        kr: "FEConf의 목적은 무엇인가요?",
        en: "What is the purpose of FEConf?",
      },
      content: {
        kr: `FEConf는 "프론트엔드 개발자에 의한, 프론트엔드 개발자를 위한" 컨퍼런스입니다.
단순한 기술 개요가 아닌, 실제 현장의 경험이 묻어있는 진정성 있는 이야기를 공유합니다.

프론트엔드를 개발하며 마주했던 고민과 해결 방법, 특별한 기술이나 노하우, 팁 등을 FEConf를 통해 여러분께 공유해 주세요.

(FEConf는 특정 법인이 아닌 프론트엔드 개발자들의 자발적인 참여로 이뤄진 비영리 단체에서 운영하고 있습니다.)`,
        en: `FEConf is a conference "by frontend developers, for frontend developers."
We share authentic stories with real-world experience, not just technical overviews.

Please share your concerns, solutions, special techniques, know-how, and tips that you've encountered while developing frontend through FEConf.

(FEConf is operated by a non-profit organization formed by the voluntary participation of frontend developers, not by a specific corporation.)`,
      },
    },
    {
      id: "topics",
      title: {
        kr: "주제는 무엇이 있나요?",
        en: "What topics are available?",
      },
      content: {
        kr: `FEConf 채널들을 통해 'FEConf 2025에서 듣고 싶은 주제'를 조사했고, 그중 많이 언급된 주제들을 소개합니다.
주제와 연관이 있을수록 선정될 확률이 높아요. 물론 이 외의 주제도 신청 가능합니다.

- AI와 Frontend
- RSC (React 19)
- Next.js
- Testing
- CSS
- Dev tools (Profiling, Debugging 등)
- React Native
- Design System
- For 주니어
- Web3
- Design Engineering
- WebAssembly
- Accessibility
- Editor
- Svelte
- Local First (Sync Engine)`,
        en: `We surveyed 'Topics you want to hear at FEConf 2025' through FEConf channels, and here are the most mentioned topics.
The more relevant your topic is, the higher the chance of being selected. Of course, you can also apply with other topics.

- AI and Frontend
- RSC (React 19)
- Next.js
- Testing
- CSS
- Dev tools (Profiling, Debugging, etc.)
- React Native
- Design System
- For Juniors
- Web3
- Design Engineering
- WebAssembly
- Accessibility
- Editor
- Svelte
- Local First (Sync Engine)`,
      },
    },
    {
      id: "schedule",
      title: {
        kr: "행사 일정이 어떻게 되나요?",
        en: "What is the event schedule?",
      },
      content: {
        kr: `- 날짜: 2025년 8월 23일 (토)
- 장소: 세종대학교 광개토관
- 규모: 약 1200명 예상 (변동 가능성 있음)`,
        en: `- Date: August 23, 2025 (Saturday)
- Venue: Gwanggaeto Building, Sejong University
- Scale: Approximately 1,200 attendees expected (subject to change)`,
      },
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto py-5" style={{ fontFamily: "var(--font-42dot)" }}>
      {/* 헤더 */}
      <div className="text-center mb-16">
        <div className="text-gray-400 mb-2 uppercase tracking-wider text-sm">Speaker</div>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {language === "kr" ? "FEConf 2025를 빛낼" : "Meet the Speakers"}
        </h2>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-8">
          {language === "kr" ? "최고의 스피커들을 만나보세요" : "Who Will Share Their Expertise"}
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
                2025 FEConf의
                <br />
                주인공이 되어주세요.
              </>
            ) : (
              <>
                Become the protagonist
                <br />
                of 2025 FEConf.
              </>
            )}
          </h2>

          <div className="text-white/70 text-sm mb-8">
            {language === "kr" ? (
              <>
                제안서 마감: 2025년 5월 16일 23:59:59
                <br />
                선정 결과: 6월 중 개별 통보
              </>
            ) : (
              <>
                Deadline: May 16, 2025, 23:59:59
                <br />
                Results will be announced individually in June
              </>
            )}
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
            onClick={() => {
              window.open(
                "https://docs.google.com/forms/d/1ntWMAIkHI3wIyQO8J5NwfegR2PY3uRhzG4aRH_4BtFY/edit",
                "_blank",
                "noopener,noreferrer",
              )
            }}
          >
            <span className="relative z-10 whitespace-normal text-center px-1">
              {language === "kr" ? "신청하기" : "Apply"}
            </span>
          </Button>
        </motion.div>

        {/* 우측 - 아코디언 */}
        <motion.div
          className="flex flex-col space-y-4"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {accordionItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="mb-2"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <button
                className="w-full py-3 flex justify-between items-center text-left border-b border-white/10"
                onClick={() => toggleSection(item.id)}
              >
                <span className="text-white font-medium w-full">
                  {language === "kr" ? item.title.kr : item.title.en}
                </span>
                <span className="text-white flex-shrink-0">{expandedSection === item.id ? "−" : "+"}</span>
              </button>

              {expandedSection === item.id && (
                <div className="py-4">
                  <div className="text-white/80 text-sm whitespace-pre-line">
                    {language === "kr" ? item.content.kr : item.content.en}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
