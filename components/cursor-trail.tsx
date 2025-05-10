"use client"

import { useEffect, useRef, useState } from "react"

export default function CursorTrail() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // 기본 커서 숨기기
    document.body.style.cursor = "none"

    const cursor = cursorRef.current
    if (!cursor) return

    // 마우스 이벤트 핸들러 - 최적화됨
    const handleMouseMove = (e: MouseEvent) => {
      // 직접 스타일 설정
      if (cursor) {
        cursor.style.left = `${e.clientX}px`
        cursor.style.top = `${e.clientY}px`
      }
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("clickable") ||
        target.closest(".clickable") ||
        // 소행성 레이블 감지를 위한 추가 선택자
        target.closest(".rounded-full") ||
        target.closest("[onClick]") ||
        target.hasAttribute("onClick") ||
        // HTML 요소 내부의 onClick 속성 감지
        target.outerHTML.includes("onClick")
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    // 이벤트 리스너 등록
    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    document.addEventListener("mouseover", handleMouseOver, { passive: true })

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseover", handleMouseOver)
      document.body.style.cursor = "auto"
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: 0,
        top: 0,
        willChange: "left, top",
      }}
    >
      {/* 원형 커서 - 이전 디자인으로 복원 */}
      <div
        className="w-4 h-4 rounded-full transition-all duration-150"
        style={{
          backgroundColor: isHovering ? "rgba(50, 142, 255, 0.7)" : "rgba(50, 142, 255, 0.3)",
          boxShadow: isHovering
            ? "0 0 15px rgba(50, 142, 255, 1), 0 0 30px rgba(50, 142, 255, 0.8)"
            : "0 0 10px rgba(50, 142, 255, 0.8), 0 0 20px rgba(50, 142, 255, 0.4)",
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  )
}
