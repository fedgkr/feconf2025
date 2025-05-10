"use client"

import { useState, useCallback, useEffect } from "react"
import { themes, generateRandomTheme, type Theme } from "@/lib/themes"
import { adjustColor } from "@/lib/utils"
import Image from "next/image"

interface ThemeSelectorProps {
  onSelectTheme: (theme: Theme) => void
  selectedThemeId: string
}

export default function ThemeSelector({ onSelectTheme, selectedThemeId }: ThemeSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // 항상 false로 설정하여 패널이 열리지 않도록 함
  useEffect(() => {
    setIsExpanded(false)
  }, [])

  // Handle random theme selection
  const handleRandomTheme = useCallback(() => {
    const randomTheme = generateRandomTheme()
    onSelectTheme(randomTheme)
  }, [onSelectTheme])

  // 빈 함수로 대체
  const toggleExpanded = useCallback(() => {
    // 아무 동작도 하지 않음
  }, [])

  // 테마 버튼 스타일 설정
  const getThemeButtonStyle = (theme: Theme) => {
    // 특정 테마에 대한 테두리 투명도 설정
    let borderOpacity = "0.2" // 기본 20% 투명도

    // sunset, golden, emerald 테마는 50% 투명도로 설정
    if (theme.id === "sunset" || theme.id === "golden" || theme.id === "emerald") {
      borderOpacity = "0.5"
    }

    // aqua 테마는 15% 투명도로 설정
    if (theme.id === "aqua") {
      borderOpacity = "0.15"
    }

    // 커스텀 그라디언트가 있는 경우
    if (theme.gradientCenter && theme.gradientOuter) {
      return {
        background: `radial-gradient(circle, ${theme.gradientCenter} 0%, ${theme.gradientOuter} 100%)`,
        boxShadow: `0 0 8px ${theme.displayColor}50`,
        border: selectedThemeId === theme.id ? "2px solid white" : `1px solid rgba(255, 255, 255, ${borderOpacity})`,
      }
    }
    // 기본 그라디언트
    else {
      return {
        background: `radial-gradient(circle, ${theme.displayColor} 0%, ${adjustColor(theme.displayColor, -20)} 100%)`,
        boxShadow: `0 0 8px ${theme.displayColor}50`,
        border: selectedThemeId === theme.id ? "2px solid white" : `1px solid rgba(255, 255, 255, ${borderOpacity})`,
      }
    }
  }

  return (
    <div
      className="fixed bottom-0 right-6 z-30 flex flex-col items-end opacity-0"
      style={{ animation: "fadeIn 0.5s ease-out 1s forwards", pointerEvents: "none" }}
    >
      {/* Theme presets container - 완전히 왼쪽에 배치 */}
      <div
        className="absolute transition-all duration-300"
        style={{
          bottom: 0,
          right: "calc(100% + 16px)",
          opacity: isExpanded ? 1 : 0,
          pointerEvents: isExpanded ? "auto" : "none",
        }}
      >
        {isExpanded && (
          <div className="bg-black/70 backdrop-blur-md rounded-2xl p-3 border border-white/10 shadow-lg">
            <div className="flex flex-col gap-2 items-center">
              {themes.map((theme) => (
                <button
                  key={theme.id}
                  className="w-8 h-8 rounded-xl flex items-center justify-center relative group transition-transform duration-200 hover:scale-110 active:scale-90"
                  style={getThemeButtonStyle(theme)}
                  onClick={() => onSelectTheme(theme)}
                >
                  {/* Theme name tooltip - 왼쪽에 표시 */}
                  <div className="absolute left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                    <div className="bg-black/80 backdrop-blur-md px-2 py-1 rounded-md text-white text-xs whitespace-nowrap">
                      {theme.name}
                    </div>
                  </div>

                  {selectedThemeId === theme.id && (
                    <div className="w-2.5 h-2.5 rounded-full bg-white scale-0 animate-scale-in"></div>
                  )}
                </button>
              ))}

              {/* Random theme button with the provided image */}
              <button
                className="w-8 h-8 rounded-xl flex items-center justify-center relative group overflow-hidden transition-transform duration-200 hover:scale-110 active:scale-90"
                style={{
                  border: "1px solid rgba(255, 255, 255, 0.5)", // 50% 투명도로 변경
                }}
                onClick={handleRandomTheme}
              >
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ic_random-K4S5qrKxO23pWIZZWAOY59Yk1DiZl5.png"
                  alt="Random theme"
                  width={32}
                  height={32}
                  className="w-full h-full object-cover"
                />

                {/* Tooltip - 왼쪽에 표시 */}
                <div className="absolute left-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-black/80 backdrop-blur-md px-2 py-1 rounded-md text-white text-xs whitespace-nowrap">
                    Random Theme
                  </div>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add CSS animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes scale-in {
          from { transform: scale(0); }
          to { transform: scale(1); }
        }
      `}</style>
    </div>
  )
}
