"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Menu, X } from "lucide-react"
import { useLanguage } from "./language-provider"
import type { Section } from "@/lib/content"

interface TopNavigationProps {
  sections: Section[]
  activeSection: string | null
  onSectionClick: (sectionId: string) => void
  language: "kr" | "en"
  onLanguageChange: (lang: "kr" | "en", e: React.MouseEvent) => void
}

export default function TopNavigation({
  sections,
  activeSection,
  onSectionClick,
  language,
  onLanguageChange,
}: TopNavigationProps) {
  const { t } = useLanguage()
  const [isMobile, setIsMobile] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const defaultUIColor = "#FFFFFF"
  const contentsColor = defaultUIColor

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024 // lg 브레이크포인트로 변경
      setIsMobile(mobile)
      if (!mobile) {
        setMobileMenuOpen(false)
      }
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(`section-${sectionId}`)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleMobileSectionClick = (sectionId: string) => {
    setMobileMenuOpen(false)
    onSectionClick(sectionId)
    setTimeout(() => scrollToSection(sectionId), 50)
  }

  const menuVariants = {
    open: {
      height: "auto",
      opacity: 1,
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    closed: {
      height: 0,
      opacity: 0,
      transition: { duration: 0, ease: "easeInOut" },
    },
  }

  // 섹션 타이틀 매핑 함수
  const getSectionTitle = (sectionId: string, isMobile = false) => {
    switch (sectionId) {
      case "feconf":
        return "FECONF"
      case "program":
        return isMobile ? "Program" : "Program"
      case "panel":
        return isMobile ? "FE Talk" : "FE Talk"
      case "networking":
        return isMobile ? "Network" : "Network"
      case "sponsor":
        return "Sponsor"
      case "conduct":
        return isMobile ? "Guide" : "Guide"
      case "ticket":
        return "Tickets"
      case "after-party":
      case "afterparty":
        return isMobile ? "After Party" : "Party"
      default:
        return "FECONF"
    }
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-md"
        style={{ pointerEvents: "auto" }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <svg
                className="text-white w-20 h-4 sm:w-20 sm:h-4 md:w-24 md:h-5 lg:w-28 lg:h-6 xl:w-32 xl:h-7"
                viewBox="0 0 388 83"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 80.492H4.54256V43.782H39.2505V39.2495H4.54256V6.88797H39.2505V2.34863H0V80.492Z"
                  fill="currentColor"
                />
                <path
                  d="M53.5322 80.5874H92.7827V76.0549H58.0748V43.6934H92.7827V39.154H58.0748V6.79253H92.7827V2.26001H53.5322V80.5874Z"
                  fill="currentColor"
                />
                <path
                  d="M329.807 71.6991L277.694 2.36863H274.34V80.5869H278.89V11.5155L330.805 80.5869H334.357V2.36182H329.807V71.6991Z"
                  fill="currentColor"
                />
                <path
                  d="M387.893 6.94241V2.40308H348.642V80.5464H353.185V43.8364H387.893V39.2971H353.185V6.94241H387.893Z"
                  fill="currentColor"
                />
                <path
                  d="M177.892 63.1147C171.219 72.1048 160.508 77.9255 148.451 77.9255C128.211 77.9255 111.742 61.4857 111.742 41.2973C111.742 21.1088 128.218 4.65547 148.451 4.65547C160.494 4.65547 171.205 10.4762 177.899 19.4458L180.488 15.1927C172.892 5.93003 161.355 0.00708008 148.451 0.00708008C125.629 0.00708008 107.069 18.5257 107.069 41.2973C107.069 64.0689 125.629 82.5875 148.451 82.5875C161.355 82.5875 172.906 76.6578 180.488 67.3814C180.071 66.7816 179.675 66.175 179.3 65.5616C178.808 64.7846 178.33 63.9599 177.885 63.1079L177.892 63.1147Z"
                  fill="url(#paint0_linear_2788_1868)"
                />
                <path
                  d="M218.89 0C205.085 0 192.857 6.76811 185.33 17.1554C184.756 17.9597 184.189 18.7844 183.677 19.6296V19.6432C182.707 21.1972 181.832 22.8262 181.074 24.5097C180.569 25.6479 180.118 26.8066 179.708 27.9857C178.28 32.157 177.501 36.6418 177.501 41.2902C177.501 45.9386 178.28 50.4234 179.708 54.5947C180.118 55.7806 180.569 56.9257 181.074 58.0639C181.825 59.7474 182.693 61.3764 183.663 62.9304C184.175 63.7824 184.729 64.6071 185.316 65.4046C192.83 75.8055 205.085 82.5804 218.89 82.5804C241.705 82.5804 260.272 64.0482 260.272 41.2902C260.272 18.5322 241.698 0 218.89 0ZM218.89 77.9252C205.877 77.9252 194.422 71.1367 187.905 60.9266C187.317 59.9928 186.764 59.0386 186.252 58.0571C185.617 56.8371 185.056 55.583 184.571 54.3016C184.223 53.4019 183.923 52.509 183.663 51.5889C182.693 48.3241 182.181 44.8685 182.181 41.297C182.181 37.7255 182.672 34.4608 183.581 31.2778C183.834 30.3576 184.134 29.458 184.469 28.5651C184.981 27.1815 185.582 25.8251 186.252 24.5233C186.764 23.5418 187.317 22.5876 187.905 21.6538C194.422 11.4438 205.877 4.6552 218.89 4.6552C239.13 4.6552 255.599 21.095 255.599 41.297C255.599 61.4991 239.123 77.9252 218.89 77.9252Z"
                  fill="currentColor"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2788_1868"
                    x1="158.968"
                    y1="41.2973"
                    x2="178.5"
                    y2="41.2973"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="currentColor" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </button>

            {/* Center Navigation - Desktop */}
            <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2 max-w-4xl">
              <div className="flex items-center overflow-x-auto scrollbar-hide">
                <div className="flex items-center space-x-1 px-2 py-1 min-w-max">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      className={`px-2 xl:px-3 py-2 text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap rounded-lg ${
                        activeSection === section.id
                          ? "bg-white/30 text-white"
                          : "text-white/70 hover:text-white hover:bg-white/10"
                      }`}
                      onClick={() => {
                        onSectionClick(section.id)
                        scrollToSection(section.id)
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Pretendard-Regular, sans-serif",
                          fontSize: "inherit",
                        }}
                      >
                        {getSectionTitle(section.id)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Language Selector - Desktop */}
            <div className="hidden lg:flex items-center space-x-6">
              <button
                className={`text-xs xl:text-sm transition-all ${
                  language === "kr" ? "text-white font-medium" : "text-white/70 hover:text-white"
                }`}
                onClick={(e) => onLanguageChange("kr", e)}
              >
                KO
              </button>
              <button
                className={`text-xs xl:text-sm transition-all ${
                  language === "en" ? "text-white font-medium" : "text-white/70 hover:text-white"
                }`}
                onClick={(e) => onLanguageChange("en", e)}
              >
                EN
              </button>

              {/* 티켓 구매하기 버튼 추가 */}
              <button
                className="ml-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 backdrop-blur-sm transition-all duration-300 font-medium rounded-lg text-xs xl:text-sm"
                onClick={() => {
                  window.open("https://www.ticketa.co/events/10", "_blank", "noopener,noreferrer")
                }}
              >
                {t("티켓 구매하기", "Buy Tickets")}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                className="p-2 rounded-md text-white hover:bg-white/10 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobile && (
          <motion.div
            className="lg:hidden bg-black/30 backdrop-blur-md border-t border-white/10 relative z-50 overflow-hidden max-h-[calc(100vh-4rem)]"
            style={{ pointerEvents: "auto" }}
            initial="closed"
            animate={mobileMenuOpen ? "open" : "closed"}
            variants={menuVariants}
          >
            {mobileMenuOpen && (
              <div className="px-4 py-4 pb-8 space-y-1 max-h-full overflow-y-auto" style={{ pointerEvents: "auto" }}>
                {sections.map((section) => (
                  <button
                    key={section.id}
                    className={`flex items-center space-x-3 w-full px-3 py-3 rounded-md text-sm font-medium transition-all duration-200 justify-center ${
                      activeSection === section.id
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                    style={{
                      color: activeSection === section.id ? contentsColor : undefined,
                      pointerEvents: "auto",
                      position: "relative",
                      zIndex: 51,
                    }}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      handleMobileSectionClick(section.id)
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Pretendard-Regular, sans-serif",
                        display: "inline-block",
                        minWidth: "80px",
                        textAlign: "center",
                      }}
                    >
                      {getSectionTitle(section.id, true)}
                    </span>
                  </button>
                ))}
                <div className="flex items-center justify-center space-x-4 mt-6 pt-6 pb-4 border-t border-white/20">
                  <button
                    className={`px-3 py-1 text-sm transition-all ${
                      language === "kr" ? "text-white font-medium" : "text-white/70 hover:text-white"
                    }`}
                    onClick={(e) => {
                      onLanguageChange("kr", e)
                      setMobileMenuOpen(false)
                    }}
                  >
                    한국
                  </button>
                  <button
                    className={`px-3 py-1 text-sm transition-all ${
                      language === "en" ? "text-white font-medium" : "text-white/70 hover:text-white"
                    }`}
                    onClick={(e) => {
                      onLanguageChange("en", e)
                      setMobileMenuOpen(false)
                    }}
                  >
                    EN
                  </button>

                  {/* 모바일용 티켓 구매하기 버튼 추가 */}
                  <button
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 backdrop-blur-sm transition-all duration-300 font-medium rounded-lg text-sm"
                    onClick={() => {
                      window.open("https://www.ticketa.co/events/10", "_blank", "noopener,noreferrer")
                      setMobileMenuOpen(false)
                    }}
                  >
                    {t("티켓 구매하기", "Buy Tickets")}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </motion.nav>
      <div className="h-16" />
    </>
  )
}
