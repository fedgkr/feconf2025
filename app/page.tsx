"use client"

import React from "react"

import type { ReactElement } from "react"
import { Suspense, useState, useRef, useCallback, useEffect } from "react"
import { LanguageProvider } from "@/components/language-provider"
import PlanetExperience from "@/components/planet-experience"
import TopNavigation from "@/components/top-navigation"
import { sections } from "@/lib/content"
import { useLanguage } from "@/components/language-provider"
import type * as THREE from "three"
import { themes } from "@/lib/themes"
import CardGenerator from "@/components/card-generator"
import IntroAnimation from "@/components/intro-animation"
import ScrollSections from "@/components/scroll-sections"
import { motion } from "framer-motion"
import HeroText from "@/components/hero-text"
// import AnimatedBackground from "@/components/animated-background"

// 메모이제이션된 메인 컨텐츠 컴포넌트
const MainContent = React.memo(() => {
  const [loaded, setLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const { language, setLanguage, t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  const [showIntro, setShowIntro] = useState(true)
  const selectedTheme = themes[0] // Use the first theme as default
  const [planetReady, setPlanetReady] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isAtFooter, setIsAtFooter] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const defaultUIColor = "#055BB8" // 0288D1에서 055BB8로 변경

  const planetExperienceRef = useRef<{
    getPlanetRef: () => React.RefObject<THREE.Group> | null
  } | null>(null)

  // 콜백 메모이제이션
  const handleSectionClick = useCallback((sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(`section-${sectionId}`)
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [])

  const handleLanguageChange = useCallback(
    (lang: "kr" | "en", e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setLanguage(lang)
    },
    [setLanguage],
  )

  // 모바일 감지 최적화
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640)
    checkMobile()

    // 디바운스된 리사이즈 핸들러
    let timeoutId: NodeJS.Timeout
    const debouncedResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkMobile, 100)
    }

    window.addEventListener("resize", debouncedResize)
    return () => {
      window.removeEventListener("resize", debouncedResize)
      clearTimeout(timeoutId)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleLanguageStorageChange = () => {
        const savedLanguage = localStorage.getItem("feconf-language") as "kr" | "en"
        if (savedLanguage && savedLanguage !== language) setLanguage(savedLanguage)
      }
      window.addEventListener("languageChange", handleLanguageStorageChange)
      return () => window.removeEventListener("languageChange", handleLanguageStorageChange)
    }
  }, [language, setLanguage])

  const handleIntroComplete = useCallback(() => {
    setShowIntro(false)
    setLoaded(true)
  }, [])

  const handlePlanetReady = useCallback(() => {
    setPlanetReady(true)
  }, [])

  // 향상된 스크롤 이벤트 - 전체 문서 기준으로 스크롤 진행도 계산
  useEffect(() => {
    if (showIntro || !loaded) return

    let ticking = false
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const windowHeight = window.innerHeight
          const documentHeight = document.documentElement.scrollHeight

          // 전체 스크롤 진행도 계산 (0 ~ 1)
          // 첫 번째 섹션(hero)부터 마지막 섹션(conduct)까지의 전체 범위
          const maxScroll = documentHeight - windowHeight
          const totalProgress = Math.max(0, Math.min(1, scrollY / maxScroll))

          // 스크롤 진행도를 행성에 전달
          setScrollProgress(totalProgress)

          // 푸터 도달 여부 확인 (95% 이상 스크롤했을 때)
          setIsAtFooter(totalProgress >= 0.95)
          setIsScrolled(scrollY > 100)

          ticking = false
        })
        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [showIntro, loaded])

  // Intersection Observer 최적화
  useEffect(() => {
    if (showIntro || !loaded) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id.replace("section-", "")
            setActiveSection(sectionId)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -20% 0px",
        // 성능 최적화를 위한 옵션 추가
      },
    )

    // planet 섹션도 관찰 대상에 추가
    const planetElement = document.getElementById("section-planet")
    if (planetElement) observer.observe(planetElement)

    sections.forEach((section) => {
      const element = document.getElementById(`section-${section.id}`)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [showIntro, loaded])

  const introShouldRender = showIntro

  return (
    <div className="w-full min-h-screen relative">
      {/* 애니메이션 배경 */}
      {/* <AnimatedBackground theme={selectedTheme} scrollProgress={scrollProgress} /> */}

      <div
        className="fixed inset-0 w-full h-screen pointer-events-none"
        style={{
          zIndex: 10,
          visibility: showIntro ? "hidden" : "visible",
        }}
      >
        <Suspense fallback={null}>
          <PlanetExperience
            ref={planetExperienceRef}
            onPlanetReady={handlePlanetReady}
            isIntroActive={showIntro}
            selectedTheme={selectedTheme}
            onSectionClick={handleSectionClick}
            scrollProgress={scrollProgress}
          />
        </Suspense>
      </div>

      <HeroText isVisible={!showIntro && loaded} />

      {introShouldRender && (
        <div
          className="w-full h-screen flex items-center justify-center"
          style={{ zIndex: 10000, position: "fixed", inset: 0 }}
        >
          <IntroAnimation onComplete={handleIntroComplete} />
        </div>
      )}

      <div style={{ zIndex: 40 }}>
        <TopNavigation
          sections={sections}
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
          language={language}
          onLanguageChange={handleLanguageChange}
        />
      </div>

      {planetReady && planetExperienceRef.current?.getPlanetRef()?.current && (
        <div style={{ zIndex: 999 }}>
          <CardGenerator
            planetRef={planetExperienceRef.current.getPlanetRef()!.current!}
            selectedTheme={selectedTheme}
          />
        </div>
      )}

      <div className="relative pointer-events-none w-full" style={{ zIndex: 20 }}>
        <ScrollSections theme={selectedTheme} isMobile={isMobile} />
        <motion.div
          className="relative flex justify-center items-center px-4 md:px-6 py-4 bg-black/70 backdrop-blur-sm w-full"
          style={{
            borderTop: `1px solid ${defaultUIColor}20`,
            boxShadow: `0 -4px 20px ${defaultUIColor}10`,
            zIndex: 10,
          }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center max-w6xl mx-auto px-2">
            <p className="md:hidden text-white/50 text-xs sm:text-xs whitespace-normal break-keep">
              {t("8월 23일 토요일", "Saturday, August 23")},{" "}
              {t("세종대학교 광개토관", "Gwanggaeto Building, Sejong University")}, {t("문의사항", "contact")}:
              feconf@googlegroups.com
            </p>
            <p className="hidden md:block text-white/50 md:text-xs lg:text-sm whitespace-normal break-keep">
              {t("8월 23일 토요일", "Saturday, August 23")},{" "}
              {t(
                "서울특별시 광진구 능동로 209, 세종대학교 광개토관",
                "209 Neungdong-ro, Gwangjin-gu, Seoul, Korea, Gwanggaeto Building, Sejong University",
              )}
              , {t("문의사항", "contact")}: feconf@googlegroups.com
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
})
MainContent.displayName = "MainContent"

export default function Home(): ReactElement {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  )
}
