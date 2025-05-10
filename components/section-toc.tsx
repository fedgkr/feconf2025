"use client"

import { motion } from "framer-motion"
import { useLanguage } from "./language-provider"
import type { Section } from "@/lib/content"

interface SectionTocProps {
  sections: Section[]
  activeSection: string | null
  onSectionClick: (sectionId: string) => void
}

export default function SectionToc({ sections, activeSection, onSectionClick }: SectionTocProps) {
  const { t, language } = useLanguage()

  // 기본 UI 색상 상수 추가 (Cosmic Blue 테마의 색상)
  const defaultUIColor = "#92CBDA"

  // 특정 색상 코드 정의 - 테마와 관계없이 고정 색상 사용
  const contentsColor = defaultUIColor

  return (
    <motion.div
      className="fixed left-12 bottom-12 z-40"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1 }}
    >
      <div className="text-white">
        <div className="text-xs font-light tracking-wider mb-2 pl-2" style={{ color: contentsColor }}>
          CONTENTS
        </div>

        <div className="w-44 h-px mb-2" style={{ backgroundColor: contentsColor }}></div>

        <div className="flex flex-col">
          {sections.map((section, index) => (
            <div key={section.id}>
              <button
                className={`text-left py-2 w-full transition-colors duration-200 text-xs pl-2 font-light ${
                  activeSection === section.id ? `hover:text-[${contentsColor}]` : "text-white/90 hover:text-[#92CBDA]"
                }`}
                style={{
                  color: activeSection === section.id ? contentsColor : undefined,
                }}
                onClick={() => onSectionClick(section.id)}
              >
                {t(section.title.kr, section.title.en)}
              </button>
              {/* 마지막 항목(후원사 모집) 아래에는 라인 없음 */}
              {index < sections.length - 1 && <div className="h-px bg-white/20 w-44"></div>}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
