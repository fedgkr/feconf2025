"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

type Language = "kr" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (kr: string, en: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// 언어 설정을 localStorage에 저장하는 로직 강화
export function LanguageProvider({ children }: { children: ReactNode }) {
  // localStorage에서 언어 설정을 가져오거나 기본값 "en" 사용
  const [language, setLanguageState] = useState<Language>(() => {
    // 클라이언트 사이드에서만 localStorage 접근
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("feconf-language") as Language
      return savedLanguage === "kr" || savedLanguage === "en" ? savedLanguage : "en" // 유효한 값만 사용
    }
    return "en"
  })

  // 언어 변경 함수 - localStorage에 저장
  const setLanguage = useCallback(
    (lang: Language) => {
      if (lang !== language) {
        // 언어가 실제로 변경될 때만 처리
        setLanguageState(lang)
        if (typeof window !== "undefined") {
          localStorage.setItem("feconf-language", lang)
          // 언어 변경 이벤트 발생 - 전체 앱에 알림
          window.dispatchEvent(new Event("languageChange"))
        }
      }
    },
    [language],
  )

  const t = useCallback(
    (kr: string, en: string) => {
      return language === "kr" ? kr : en
    },
    [language],
  )

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
