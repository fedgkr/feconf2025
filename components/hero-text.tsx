"use client"

import { motion } from "framer-motion"
import { useState } from "react"

interface HeroTextProps {
  isVisible: boolean
}

import { useScroll, useMotionValueEvent } from "framer-motion"

interface HeroTextProps {
  isVisible: boolean
}

export default function HeroText({ isVisible }: HeroTextProps) {
  // --- scrollY from Framer Motion (no manual event listener necessary) ---

  const { scrollY } = useScroll() // motion value with the current Y offset
  const [currentY, setCurrentY] = useState(0)

  // Update state only when scrollY changes
  useMotionValueEvent(scrollY, "change", (latest) => {
    setCurrentY(latest)
  })

  /* -----------  derive visibility instead of re-setting state ----------- */
  const show = isVisible && currentY < 100

  return (
    <>
      {/* Google-fonts import */}
      <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Jost:wght@100&display=swap');
    `}</style>

      <motion.div
        className="fixed bottom-6 left-0 right-0 z-30 pointer-events-none"
        initial={{ opacity: 0, x: -50 }}
        animate={{
          opacity: show ? 1 : 0,
          x: show ? 0 : -50,
        }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl break-keep"
            style={{
              fontFamily: "Jost, sans-serif",
              fontWeight: 100,
              lineHeight: "1.17",
              letterSpacing: "0.02em",
              background: "linear-gradient(20deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.7))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            {"TO THE"}
          </motion.div>
          <motion.div
            className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl break-keep"
            style={{
              fontFamily: "Jost, sans-serif",
              fontWeight: 100,
              lineHeight: "1.17",
              letterSpacing: "0.02em",
              background: "linear-gradient(20deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.7))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {"FRONTIER"}
          </motion.div>
          <motion.div
            className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl break-keep"
            style={{
              fontFamily: "Jost, sans-serif",
              fontWeight: 100,
              lineHeight: "1.17",
              letterSpacing: "0.02em",
              background: "linear-gradient(20deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.7))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
          >
            {"BEYOND"}
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
