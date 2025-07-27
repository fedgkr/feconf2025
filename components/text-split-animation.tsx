"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useElementOnScreen } from "@/lib/scroll-interactions"

interface TextSplitAnimationProps {
  text: string
  className?: string
  charClassName?: string
  staggerDuration?: number
  delay?: number
}

export default function TextSplitAnimation({
  text,
  className = "",
  charClassName = "",
  staggerDuration = 0.03,
  delay = 0,
}: TextSplitAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { isIntersecting } = useElementOnScreen(ref, 0.1)
  const [hasAnimated, setHasAnimated] = useState(false)

  // Split text into characters
  const characters = text.split("")

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDuration,
        delayChildren: delay,
      },
    },
  }

  const charVariants = {
    hidden: {
      y: 100,
      opacity: 0,
      rotateX: 90,
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  // Set hasAnimated to true once animation has played
  useEffect(() => {
    if (isIntersecting && !hasAnimated) {
      setHasAnimated(true)
    }
  }, [isIntersecting, hasAnimated])

  return (
    <motion.div
      ref={ref}
      className={`inline-block overflow-hidden ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate={isIntersecting || hasAnimated ? "visible" : "hidden"}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          className={`inline-block ${charClassName}`}
          variants={charVariants}
          style={{
            display: char === " " ? "inline" : "inline-block",
            whiteSpace: "pre",
            willChange: "transform, opacity",
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.div>
  )
}
