"use client"

import { useEffect, useState, useRef, type RefObject } from "react"

// Hook to track scroll position
export function useScrollPosition() {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down" | null>(null)
  const prevScrollY = useRef(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrollY(currentScrollY)

      if (currentScrollY > prevScrollY.current) {
        setScrollDirection("down")
      } else if (currentScrollY < prevScrollY.current) {
        setScrollDirection("up")
      }

      prevScrollY.current = currentScrollY
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return { scrollY, scrollDirection }
}

// Hook to track element visibility in viewport
export function useElementOnScreen(ref: RefObject<HTMLElement>, threshold = 0.1) {
  const [isIntersecting, setIntersecting] = useState(false)
  const [intersectionRatio, setIntersectionRatio] = useState(0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIntersecting(entry.isIntersecting)
        setIntersectionRatio(entry.intersectionRatio)
      },
      {
        rootMargin: "0px",
        threshold: Array.from({ length: 11 }, (_, i) => i / 10), // [0, 0.1, 0.2, ..., 1.0]
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [ref, threshold])

  return { isIntersecting, intersectionRatio }
}

// Hook to track scroll progress within an element
export function useScrollProgress(ref: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleScroll = () => {
      const rect = element.getBoundingClientRect()
      const windowHeight = window.innerHeight

      // Calculate how much of the element is visible
      const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top)
      const elementHeight = rect.height

      // Calculate progress (0 to 1)
      let calculatedProgress = 0

      if (rect.top <= 0) {
        if (rect.bottom <= windowHeight) {
          // Element has been scrolled past
          calculatedProgress = 1
        } else {
          // Element is partially visible (top is above viewport)
          calculatedProgress = Math.abs(rect.top) / (elementHeight - windowHeight)
        }
      } else if (rect.top < windowHeight) {
        // Element is entering viewport from bottom
        calculatedProgress = (windowHeight - rect.top) / Math.min(windowHeight, elementHeight)
      }

      // Clamp progress between 0 and 1
      calculatedProgress = Math.max(0, Math.min(1, calculatedProgress))
      setProgress(calculatedProgress)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll() // Initial calculation

    return () => window.removeEventListener("scroll", handleScroll)
  }, [ref])

  return progress
}

// Calculate parallax values based on scroll position
export function calculateParallax(scrollY: number, speed = 0.5, offset = 0) {
  return offset + scrollY * speed
}
