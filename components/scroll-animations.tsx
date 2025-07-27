"use client"

import type React from "react"

import { useRef, useEffect, useState } from "react"
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion"
import { useScrollPosition, useElementOnScreen, useScrollProgress } from "@/lib/scroll-interactions"

interface ScrollAnimationProps {
  children: React.ReactNode
  type: "fade" | "slide" | "scale" | "rotate" | "parallax" | "sticky" | "reveal"
  direction?: "up" | "down" | "left" | "right"
  delay?: number
  duration?: number
  threshold?: number
  speed?: number
  className?: string
}

export function ScrollAnimation({
  children,
  type,
  direction = "up",
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  speed = 0.5,
  className = "",
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { isIntersecting, intersectionRatio } = useElementOnScreen(ref, threshold)
  const progress = useScrollProgress(ref)
  const { scrollY } = useScrollPosition()

  // Initial animation states based on type and direction
  const getInitialState = () => {
    switch (type) {
      case "fade":
        return { opacity: 0 }
      case "slide":
        return {
          opacity: 0,
          x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
          y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
        }
      case "scale":
        return { opacity: 0, scale: 0.8 }
      case "rotate":
        return { opacity: 0, rotate: direction === "left" ? 10 : -10 }
      case "parallax":
        return {}
      case "sticky":
        return {}
      case "reveal":
        return { clipPath: "inset(0 100% 0 0)" }
      default:
        return {}
    }
  }

  // Animation variants
  const variants = {
    hidden: getInitialState(),
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      rotate: 0,
      clipPath: "inset(0 0 0 0)",
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  }

  // For parallax effect
  const y = useTransform(useMotionValue(scrollY), [0, 1000], [0, -speed * 100])

  // For sticky effect
  const [isSticky, setIsSticky] = useState(false)
  useEffect(() => {
    if (type === "sticky" && ref.current) {
      const element = ref.current
      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsSticky(!entry.isIntersecting && entry.boundingClientRect.top < 0)
        },
        { threshold: [0] },
      )

      observer.observe(element)
      return () => observer.unobserve(element)
    }
  }, [type])

  // Render based on animation type
  if (type === "parallax") {
    return (
      <motion.div ref={ref} className={className} style={{ y }}>
        {children}
      </motion.div>
    )
  }

  if (type === "sticky") {
    return (
      <div ref={ref} className={`${className} ${isSticky ? "sticky top-0" : ""}`}>
        {children}
      </div>
    )
  }

  if (type === "reveal") {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={isIntersecting ? "visible" : "hidden"}
        variants={variants}
        style={{
          willChange: "clip-path",
          overflow: "hidden",
        }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isIntersecting ? "visible" : "hidden"}
      variants={variants}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  )
}

export function ParallaxSection({
  children,
  speed = 0.2,
  className = "",
}: {
  children: React.ReactNode
  speed?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed])

  return (
    <motion.div ref={ref} className={`relative overflow-hidden ${className}`} style={{ y }}>
      {children}
    </motion.div>
  )
}

export function StickyScrollSection({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={`sticky top-0 h-screen overflow-hidden ${className}`}>{children}</div>
}

export function ProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div className="fixed top-0 left-0 right-0 h-1 bg-white z-50 origin-left" style={{ scaleX, opacity: 0.7 }} />
  )
}

export function ScrollIndicator() {
  const { scrollDirection } = useScrollPosition()

  return (
    <motion.div
      className="fixed bottom-8 right-8 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        y: scrollDirection === "down" ? [0, 10, 0] : scrollDirection === "up" ? [0, -10, 0] : 0,
      }}
      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform duration-300 ${scrollDirection === "up" ? "rotate-180" : ""}`}
      >
        <path
          d="M12 5L12 19M12 19L19 12M12 19L5 12"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  )
}

export function TextReveal({
  text,
  className = "",
}: {
  text: string
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const { isIntersecting } = useElementOnScreen(ref, 0.1)

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: 100 }}
        animate={isIntersecting ? { y: 0 } : { y: 100 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {text}
      </motion.div>
    </div>
  )
}

export function HorizontalScrollSection({
  children,
  className = "",
}: {
  children: React.ReactNode
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  return null
}
