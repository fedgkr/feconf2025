"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import gsap from "gsap"

interface AnimatedLogoProps {
  onComplete?: () => void
  width?: number | string
  height?: number | string
  className?: string
}

const AnimatedLogo: React.FC<AnimatedLogoProps> = ({
  onComplete,
  width = 390, // Default SVG width
  height = 84, // Default SVG height
  className = "",
}) => {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!svgRef.current) return

    const paths = svgRef.current.querySelectorAll("path")
    if (paths.length === 0) return

    // Hide all paths initially
    gsap.set(paths, { opacity: 0, y: 20 })

    const tl = gsap.timeline({
      onComplete: () => {
        if (onComplete) {
          onComplete()
        }
      },
    })

    // Animate paths sequentially
    paths.forEach((path, index) => {
      tl.to(
        path,
        {
          opacity: 1,
          y: 0,
          duration: 0.4, // Duration for each path to appear
          ease: "power2.out",
        },
        index * 0.1, // Stagger start time for each path
      )
    })

    // Add a small delay at the end before calling onComplete
    tl.to({}, { duration: 0.5 }) // Empty tween for delay

    return () => {
      tl.kill() // Cleanup GSAP animation on unmount
    }
  }, [onComplete])

  // Inlined SVG content for direct manipulation
  // Added unique IDs to paths in the SVG file for easier selection if needed,
  // but querySelectorAll('path') is simpler here.
  return (
    <svg
      ref={svgRef}
      width={width}
      height={height}
      viewBox="0 0 390 84"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M335.233 3.20215V80.0824H330.62L281.957 15.1944V80.0824H276V3.21335H280.412L329.265 68.3477V3.20215H335.233Z"
        fill="white"
      />
      <path d="M5.9128 9.04986V39.0717L39 38.9808V45.0306L5.9128 45.1216V81H0V3H39V9.04986H5.9128Z" fill="white" />
      <path d="M60.9128 9.03578V38.9878H94V45.0236H60.9128V74.9756H94V81H55V3H94V9.03578H60.9128Z" fill="white" />
      <path
        d="M218 0C207.413 0 197.295 3.95521 189.518 11.1421C188.71 11.9018 187.89 12.7218 187.022 13.6503C185.9 14.8803 184.887 16.1464 183.971 17.4005C183.259 18.3773 182.584 19.4022 181.969 20.4513C178.062 26.9388 176 34.391 176 42C176 49.609 178.062 57.0612 181.969 63.5487C182.584 64.5857 183.259 65.6227 183.971 66.5995C184.887 67.8656 185.912 69.1197 186.997 70.3376C187.926 71.3144 188.722 72.1103 189.506 72.8338C197.295 80.0448 207.413 84 218 84C241.165 84 260 65.1645 260 42C260 18.8355 241.165 0 218 0ZM218 77.5728C208.739 77.5728 199.972 74.0155 193.304 67.5642C192.376 66.6959 191.483 65.7313 190.651 64.7183C189.481 63.3196 188.408 61.7881 187.468 60.2084C186.648 58.8579 185.936 57.4953 185.321 56.0362C183.392 51.6107 182.427 46.8837 182.427 42C182.427 37.1163 183.392 32.3893 185.309 27.9759C185.912 26.5771 186.636 25.1662 187.456 23.7916C188.384 22.2239 189.457 20.7046 190.651 19.2937C191.471 18.2808 192.363 17.3282 193.292 16.4358C199.972 9.9845 208.751 6.42722 218 6.42722C237.619 6.42722 253.573 22.3807 253.573 42C253.573 61.6193 237.619 77.5728 218 77.5728Z"
        fill="white"
      />
      <path
        d="M178.506 70.4462C179.354 71.5676 180.177 72.5805 181 73.5211C173.302 80.2859 163.449 84 153.16 84C129.907 84 111 65.1645 111 42C111 18.8355 129.907 0 153.16 0C163.449 0 173.289 3.70198 181 10.4668C180.165 11.4074 179.342 12.4203 178.506 13.5418C177.974 14.2532 177.502 14.9285 177.054 15.5917C170.481 9.67097 162.044 6.42722 153.16 6.42722C133.466 6.42722 117.452 22.3807 117.452 42C117.452 61.6193 133.466 77.5728 153.16 77.5728C162.044 77.5728 170.481 74.329 177.066 68.4083C177.538 69.1197 178.022 69.795 178.506 70.4462Z"
        fill="url(#paint0_linear_2788_1866_animated)"
      />
      <path d="M350 79.8019V3H389.28V8.95693H355.957V38.5177H389.28V44.4746H355.957V79.8019H350Z" fill="white" />
      <defs>
        <linearGradient
          id="paint0_linear_2788_1866_animated"
          x1="154.784"
          y1="5.20653"
          x2="176.983"
          y2="5.20653"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default AnimatedLogo
