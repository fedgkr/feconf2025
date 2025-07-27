"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import AnimatedLogo from "./animated-logo"

interface IntroAnimationProps {
  onComplete: () => void
}

const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoWrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log("IntroAnimation (SVG based): useEffect running.")
    if (!containerRef.current || !logoWrapperRef.current) {
      console.warn("IntroAnimation (SVG based): Refs not ready.", {
        container: !!containerRef.current,
        logoWrapper: !!logoWrapperRef.current,
      })
      return
    }

    console.log("IntroAnimation (SVG based): All refs ready, starting GSAP timeline.")

    const tl = gsap.timeline({
      onComplete: () => {
        console.log("IntroAnimation (SVG based): GSAP timeline onComplete triggered.")
        if (onComplete) {
          onComplete()
        }
      },
    })

    // 1. Fade in the main container (black background)
    tl.to(containerRef.current, { opacity: 1, duration: 0.5 })

    // 2. Fade in the logo wrapper (AnimatedLogo will play its own animation) with reduced opacity
    tl.to(logoWrapperRef.current, { opacity: 0.7, duration: 0.3 }, ">-0.2") // Overlap slightly with 0.7 opacity

    // 3. Wait for AnimatedLogo's internal animation to complete.
    tl.addLabel("logoAnimationDone", "+=2.0") // Adjust this based on AnimatedLogo's actual duration

    // 4. Fade out the main container (and logo within it)
    tl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.8,
      },
      "logoAnimationDone", // Start fade out after logo animation is considered done
    )

    return () => {
      console.log("IntroAnimation (SVG based): Cleanup. Killing GSAP timeline.")
      tl.kill()
    }
  }, [onComplete])

  const handleLogoAnimationComplete = () => {
    console.log("AnimatedLogo reported completion to IntroAnimation.")
  }

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 flex items-center justify-center bg-black opacity-0"
      style={{ zIndex: 10000 }}
    >
      <div ref={logoWrapperRef} className="opacity-0 flex items-center justify-center">
        {/* Pass the onComplete handler to AnimatedLogo with 20% smaller size */}
        <AnimatedLogo
          onComplete={handleLogoAnimationComplete}
          className="w-auto h-auto max-w-[24vw] max-h-[9vh] sm:max-w-[16vw] sm:max-h-[6vh]" // 모바일(기본)에서 24vw/9vh로 50% 증가, 데스크톱(sm 이상)에서는 기존 크기 유지
        />
      </div>
    </div>
  )
}

export default IntroAnimation
