"use client"

import type React from "react"

import { Suspense, useState, useRef, useCallback, useEffect } from "react"
import { LanguageProvider } from "@/components/language-provider"
import PlanetExperience from "@/components/planet-experience"
import LoadingScreen from "@/components/loading-screen"
import CursorTrail from "@/components/cursor-trail" // 커서 트레일 다시 활성화
import ToggleSidebar from "@/components/toggle-sidebar"
import { sections } from "@/lib/content"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import type * as THREE from "three"
import ThemeSelector from "@/components/theme-selector"
import { themes, type Theme } from "@/lib/themes"
import CardGenerator from "@/components/card-generator"

// 메인 컴포넌트를 분리하여 LanguageProvider 내부에서 렌더링
function MainContent() {
  const [loaded, setLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0])
  const [developerCode, setDeveloperCode] = useState<string>("")

  // 기본 UI 색상 상수 추가 (Cosmic Blue 테마의 색상)
  const defaultUIColor = "#29B6F6"

  // Handle theme selection
  const handleThemeChange = (theme: Theme) => {
    setSelectedTheme(theme)
  }

  // Reference to the PlanetExperience component
  const planetExperienceRef = useRef<{
    handleSectionClick: (sectionId: string) => void
    getPlanetRef: () => React.RefObject<THREE.Group> | null
  } | null>(null)

  // Handle section click from sidebar
  const handleSidebarSectionClick = useCallback((sectionId: string) => {
    setActiveSection(sectionId)

    // Call the handleSectionClick method in PlanetExperience
    if (planetExperienceRef.current) {
      planetExperienceRef.current.handleSectionClick(sectionId)
    }
  }, [])

  // 언어 변경 핸들러 - 이벤트 버블링 방지
  const handleLanguageChange = useCallback(
    (lang: "kr" | "en", e: React.MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setLanguage(lang)
    },
    [setLanguage],
  )

  // Sidebar width for calculations
  const sidebarWidth = 240
  const collapsedSidebarWidth = 70

  // 모바일 화면 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }

    // 초기 체크
    checkMobile()

    // 리사이즈 이벤트 리스너
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Load developer code from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCode = localStorage.getItem("feconf-developer-code")
      if (savedCode) {
        setDeveloperCode(savedCode)
      }

      // 언어 변경 이벤트 리스너 추가
      const handleLanguageChange = () => {
        // localStorage에서 언어 설정 다시 불러오기
        const savedLanguage = localStorage.getItem("feconf-language") as "kr" | "en"
        if (savedLanguage && savedLanguage !== language) {
          setLanguage(savedLanguage)
        }
      }

      // 이벤트 리스너 등록
      window.addEventListener("languageChange", handleLanguageChange)

      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        window.removeEventListener("languageChange", handleLanguageChange)
      }
    }
  }, [language, setLanguage])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* 사이드바 컴포넌트 */}
      <ToggleSidebar
        sections={sections}
        activeSection={activeSection}
        onSectionClick={handleSidebarSectionClick}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* Add ThemeSelector component */}
      <ThemeSelector onSelectTheme={handleThemeChange} selectedThemeId={selectedTheme.id} />

      {/* Add CardGenerator component */}
      <CardGenerator
        planetRef={planetExperienceRef.current?.getPlanetRef()?.current || null}
        selectedTheme={selectedTheme}
      />

      {/* 메인 콘텐츠 영역 - 사이드바와 분리 */}
      <div
        className="absolute top-0 right-0 bottom-0 flex flex-col transition-all duration-300 ease-in-out"
        style={{
          left: isMobile || showIntro ? 0 : sidebarOpen ? `${sidebarWidth}px` : `${collapsedSidebarWidth}px`,
          width:
            isMobile || showIntro
              ? "100%"
              : sidebarOpen
                ? `calc(100% - ${sidebarWidth}px)`
                : `calc(100% - ${collapsedSidebarWidth}px)`,
        }}
      >
        {/* 상단 헤더 영역 - 로고와 텍스트를 포함 */}
        <div
          className="absolute top-0 left-0 right-0 z-10 flex sm:justify-between justify-center items-center px-6 sm:pl-6 sm:pr-3 py-4 sm:py-6 h-[70px] opacity-0 transform -translate-y-5"
          style={{
            borderBottom: `1px solid ${defaultUIColor}20`,
            animation: "fadeInDown 0.8s ease-out 0.5s forwards",
          }}
        >
          {/* 로고 이미지 - 모바일에서는 중앙, 데스크톱에서는 좌측 */}
          <div className="absolute sm:relative sm:left-auto left-1/2 transform sm:transform-none -translate-x-1/2 sm:translate-x-0">
            <Image
              src="/images/logo_web.png"
              alt="FEconf 2025 Logo"
              width={100}
              height={22}
              className="h-auto sm:w-[120px] w-[100px]"
              priority
            />
          </div>

          {/* Mobile developer code - 모바일에서도 표시 */}
          {developerCode && (
            <div
              className="absolute right-20 sm:hidden text-white/80 font-mono text-xs bg-black/30 px-2 py-0.5 rounded-full border border-white/10 opacity-0"
              style={{
                animation: "fadeIn 0.5s ease-out 0.8s forwards",
              }}
            >
              <span className="text-white/50 mr-1">code:</span>
              {developerCode}
            </div>
          )}

          {/* 우측 영역 - Language Toggle */}
          <div className="hidden sm:flex items-center">
            {/* Developer Code - 언어 전환 버튼 좌측에 배치 */}
            {developerCode && (
              <div
                className="text-white/80 font-mono text-sm bg-black/30 px-3 py-1 rounded-full border border-white/10 mr-4 opacity-0"
                style={{
                  animation: "fadeIn 0.5s ease-out 0.8s forwards",
                }}
              >
                <span className="text-white/50 mr-1">code:</span>
                {developerCode}
              </div>
            )}

            {/* Language toggle buttons */}
            <div
              className="flex items-center bg-black/50 rounded-full p-0.5 sm:p-1 border border-white/20"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: `0 0 10px ${defaultUIColor}30`,
              }}
            >
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm transition-all ${
                  language === "kr"
                    ? "bg-white text-black font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                onClick={(e) => handleLanguageChange("kr", e)}
              >
                KOR
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm transition-all ${
                  language === "en"
                    ? "bg-white text-black font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                onClick={(e) => handleLanguageChange("en", e)}
              >
                ENG
              </Button>
            </div>
          </div>
        </div>
        {isMobile && (
          <div className="fixed top-4 right-4 z-50 flex items-center">
            <div
              className="flex items-center bg-black/50 rounded-full p-0.5 border border-white/20"
              onClick={(e) => e.stopPropagation()}
              style={{
                boxShadow: `0 0 10px ${defaultUIColor}30`,
              }}
            >
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full px-2 py-0.5 text-xs transition-all ${
                  language === "kr"
                    ? "bg-white text-black font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                onClick={(e) => handleLanguageChange("kr", e)}
              >
                KOR
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`rounded-full px-2 py-0.5 text-xs transition-all ${
                  language === "en"
                    ? "bg-white text-black font-medium"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                onClick={(e) => handleLanguageChange("en", e)}
              >
                ENG
              </Button>
            </div>
          </div>
        )}

        {/* Main content - 전체 공간 차지 */}
        <div className="w-full h-full">
          <Suspense fallback={<LoadingScreen />}>
            <PlanetExperience
              onLoaded={() => setLoaded(true)}
              ref={planetExperienceRef}
              sidebarOpen={sidebarOpen}
              sidebarWidth={isMobile ? 0 : sidebarOpen ? sidebarWidth : collapsedSidebarWidth}
              isIntroActive={false}
              selectedTheme={selectedTheme}
            />
          </Suspense>
          {!loaded && <LoadingScreen />}
        </div>

        {/* 푸터 영역 - 한 줄로 통합 */}
        <div
          className="absolute bottom-0 left-0 right-0 z-10 flex justify-center items-center px-6 py-4 bg-black/70 backdrop-blur-sm opacity-0 transform translate-y-5"
          style={{
            borderTop: `1px solid ${defaultUIColor}20`,
            boxShadow: `0 -4px 20px ${defaultUIColor}10`,
            animation: "fadeInUp 0.8s ease-out 1s forwards",
          }}
        >
          <div className="text-center max-w-full px-2">
            {/* 모바일용 텍스트 (한 줄) - 장소는 세종대학교 광개토관만 표시 */}
            <p className="md:hidden text-white/50 text-xs sm:text-xs whitespace-normal break-words">
              {t("8월 23일 토요일", "Saturday, August 23")},{" "}
              {t("세종대학교 광개토관", "Gwanggaeto Building, Sejong University")}, {t("문의사항", "contact")}:
              feconf@googlegroups.com
            </p>

            {/* 태블릿 이상 텍스트 (한 줄) - 전체 주소 표시 */}
            <p className="hidden md:block text-white/50 md:text-xs lg:text-sm whitespace-normal break-words">
              {t("8월 23일 토요일", "Saturday, August 23")},{" "}
              {t(
                "서울특별시 광진구 능동로 209, 세종대학교 광개토관",
                "209 Neungdong-ro, Gwangjin-gu, Seoul, Korea, Gwanggaeto Building, Sejong University",
              )}
              , {t("문의사항", "contact")}: feconf@googlegroups.com
            </p>
          </div>
        </div>
      </div>

      {/* 커서 트레일 활성화 */}
      <CursorTrail />

      {/* Add CSS animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeInDown {
          from { 
            opacity: 0;
            transform: translateY(-20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}

// 루트 컴포넌트는 LanguageProvider만 렌더링
export default function Home() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  )
}
