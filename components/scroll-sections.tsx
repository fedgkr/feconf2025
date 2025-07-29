"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useLanguage } from "./language-provider"
import { sections } from "@/lib/content"
import type { Theme } from "@/lib/themes"
import FeconfCard from "./cards/feconf-card"
import SponsorCard from "./cards/sponsor-card"
import PanelTalkCard from "./cards/panel-talk-card"
import CountdownBox from "./countdown-box"
import { ScrollAnimation, StickyScrollSection } from "./scroll-animations"
import { useScrollPosition } from "@/lib/scroll-interactions"
import NetworkingCard from "./cards/networking-card"
import CodeOfConductCard from "./cards/code-of-conduct-card"
import ProgramSection from "./sections/program-section"
import TicketCard from "./cards/ticket-card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ScrollSectionsProps {
  theme: Theme
  isMobile: boolean
}

export default function ScrollSections({ theme, isMobile }: ScrollSectionsProps) {
  const { t } = useLanguage()
  const { scrollY } = useScrollPosition()
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())

  // 스크롤 위치에 따른 블러 효과 강도 계산
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ["start end", "end start"],
  })

  // 블러 효과 강도를 스크롤 위치에 따라 변환 (0px에서 12px까지)
  const blurIntensity = useTransform(scrollYProgress, [0, 0.1, 0.25, 0.5, 0.75, 0.9, 1], [0, 2, 6, 8, 6, 2, 0])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const sectionId = entry.target.id.replace("section-", "")
          setVisibleSections((prev) => {
            const newSet = new Set(prev)
            if (entry.isIntersecting) {
              newSet.add(sectionId)
            } else {
              newSet.delete(sectionId)
            }
            return newSet
          })
        })
      },
      { threshold: 0.3, rootMargin: "-20% 0px -20% 0px" },
    )

    sections.forEach((section) => {
      const element = document.getElementById(`section-${section.id}`)
      if (element) observer.observe(element)
    })

    // planet 섹션도 관찰 대상에 추가
    const planetElement = document.getElementById("section-planet")
    if (planetElement) observer.observe(planetElement)

    return () => observer.disconnect()
  }, [])

  // 네트워킹 버튼과 동일한 스타일
  const buttonStyle = {
    background: `#FFFFFF`,
    color: "#0A2463",
    fontWeight: "700",
    boxShadow: `0 0 15px rgba(255,255,255,0.5)`,
    padding: "12px 32px",
    borderRadius: "12px",
    fontSize: "1rem",
    minWidth: "200px",
    height: "46px",
  }

  const buttonHoverStyle = {
    background: `#FFFFFF`,
    boxShadow: `0 0 20px rgba(255,255,255,0.7)`,
  }

  const containerStyle = {
    width: "100%",
    paddingTop: "0",
    height: "auto",
    overflow: "visible",
    position: "relative",
    zIndex: 5,
  } as const

  const renderCard = (sectionId: string) => {
    switch (sectionId) {
      case "hero":
        return (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: visibleSections.has(sectionId) ? 1 : 0.7,
              y: visibleSections.has(sectionId) ? 0 : 20,
              scale: visibleSections.has(sectionId) ? 1 : 0.95,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="space-y-12 w-full pointer-events-auto">
              <ScrollAnimation type="fade" delay={0.2}>
                <CountdownBox />
              </ScrollAnimation>
              <ScrollAnimation type="slide" direction="up" delay={0.4}>
                <FeconfCard theme={theme} />
              </ScrollAnimation>
            </div>
          </motion.div>
        )
      case "program":
        return (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: visibleSections.has(sectionId) ? 1 : 0.7,
              y: visibleSections.has(sectionId) ? 0 : 20,
              scale: visibleSections.has(sectionId) ? 1 : 0.95,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="pointer-events-auto w-full">
              <ScrollAnimation type="fade" delay={0.3}>
                <ProgramSection theme={theme} />
              </ScrollAnimation>
            </div>
          </motion.div>
        )
      case "sponsor":
        return (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: visibleSections.has(sectionId) ? 1 : 0.7,
              y: visibleSections.has(sectionId) ? 0 : 20,
              scale: visibleSections.has(sectionId) ? 1 : 0.95,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="pointer-events-auto">
              <ScrollAnimation type="scale" delay={0.3}>
                <SponsorCard theme={theme} />
              </ScrollAnimation>
            </div>
          </motion.div>
        )
      case "panel":
        return (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: visibleSections.has(sectionId) ? 1 : 0.7,
              y: visibleSections.has(sectionId) ? 0 : 20,
              scale: visibleSections.has(sectionId) ? 1 : 0.95,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="pointer-events-auto">
              <ScrollAnimation type="scale" delay={0.3}>
                <PanelTalkCard theme={theme} />
              </ScrollAnimation>
            </div>
          </motion.div>
        )
      case "networking":
        return (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: visibleSections.has(sectionId) ? 1 : 0.7,
              y: visibleSections.has(sectionId) ? 0 : 20,
              scale: visibleSections.has(sectionId) ? 1 : 0.95,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="pointer-events-auto">
              <ScrollAnimation type="scale" delay={0.3}>
                <NetworkingCard theme={theme} />
              </ScrollAnimation>
            </div>
          </motion.div>
        )
      case "ticket":
        return (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: visibleSections.has(sectionId) ? 1 : 0.7,
              y: visibleSections.has(sectionId) ? 0 : 20,
              scale: visibleSections.has(sectionId) ? 1 : 0.95,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full"
          >
            <div className="pointer-events-auto">
              <ScrollAnimation type="scale" delay={0.3}>
                <TicketCard theme={theme} />
              </ScrollAnimation>
            </div>
          </motion.div>
        )
      case "conduct":
        return (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{
              opacity: visibleSections.has(sectionId) ? 1 : 0.7,
              y: visibleSections.has(sectionId) ? 0 : 20,
              scale: visibleSections.has(sectionId) ? 1 : 0.95,
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="pointer-events-auto">
              <ScrollAnimation type="scale" delay={0.3}>
                <CodeOfConductCard theme={theme} />
              </ScrollAnimation>
            </div>
          </motion.div>
        )
      default:
        return null
    }
  }

  return (
    <div style={containerStyle} className="relative pointer-events-none w-full" ref={containerRef}>
      {/* 스크롤 트리거 */}
      <div className="h-screen w-full pointer-events-none absolute inset-0" />

      <div className="pointer-events-none w-full" ref={contentRef}>
        {/* Planet 섹션 - 빈 섹션 */}
        <motion.section
          id="section-planet"
          className="h-screen w-full mb-[60vh] pointer-events-none"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          className="relative w-full"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          style={{
            background: `linear-gradient(to bottom, 
transparent 0%, 
rgba(0,0,0,0.1) 1%, 
rgba(0,0,0,0.4) 5%, 
rgba(0,0,0,0.6) 10%, 
rgba(0,0,0,0.6) 90%, 
rgba(0,0,0,0.4) 95%, 
rgba(0,0,0,0.1) 99%, 
transparent 100%)`,
            backdropFilter: `blur(${blurIntensity}px)`,
            WebkitBackdropFilter: `blur(${blurIntensity}px)`,
          }}
        >
          {sections.map((section, index) => (
            <motion.section
              key={section.id}
              id={`section-${section.id}`}
              className="min-h-screen flex md:px-5 lg:px-[120px] relative pointer-events-auto py-16 items-stretch justify-evenly w-auto px-5"
              style={{ backgroundColor: "transparent" }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              {renderCard(section.id)}
            </motion.section>
          ))}

          <StickyScrollSection className="flex items-center justify-center z-20">
            <div className="w-full px-5 py-5 md:px-10 md:py-10 mx-auto text-center pointer-events-auto bg-transparent">
              <ScrollAnimation type="fade" delay={0.1}>
                <div className="flex flex-row items-center justify-center gap-2 sm:gap-4 mb-6 text-white/80 flex-wrap">
                  <div className="flex items-center gap-2">
                    <Image src="/images/icons/time.svg" alt="Time" width={24} height={24} className="w-6 h-6" />
                    <span className="text-sm sm:text-base font-medium">2025.8.23 11:00</span>
                  </div>
                  <span className="text-white/50 text-sm sm:text-base">|</span>
                  <div className="flex items-center gap-2">
                    <Image src="/images/icons/location.svg" alt="Location" width={24} height={24} className="w-6 h-6" />
                    <span className="text-sm sm:text-base font-medium">
                      {t("세종대학교 광개토회관", "Gwanggaeto Building, Sejong University")}
                    </span>
                  </div>
                </div>
              </ScrollAnimation>
              <ScrollAnimation type="fade" delay={0.2}>
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-8 whitespace-nowrap md:py-2.5">
                  {t("함께 만들어가는 FEConf", "Building FEConf Together")}
                </h2>
              </ScrollAnimation>
              <ScrollAnimation type="slide" direction="up" delay={0.4}>
                <p className="text-lg md:text-xl text-white/70 mb-12 max-w-2xl mx-auto">
                  {t(
                    "프론트엔드 개발 컨퍼런스, FEConf에서 다양한 기술과 트렌드를 경험하세요.",
                    "Experience various technologies and trends at Korea's largest frontend development conference, FEConf.",
                  )}
                </p>
              </ScrollAnimation>
              <ScrollAnimation type="scale" delay={0.6}>
                <Button
                  className="transition-all duration-300"
                  style={buttonStyle}
                  onClick={() => window.open("https://www.ticketa.co/events/10", "_blank", "noopener,noreferrer")}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, buttonHoverStyle)
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.currentTarget.style, buttonStyle)
                  }}
                >
                  {t("티켓 구매하기", "Buy Tickets")}
                </Button>
              </ScrollAnimation>
            </div>
          </StickyScrollSection>
        </motion.div>
      </div>
    </div>
  )
}
