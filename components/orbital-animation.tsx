"use client"

import { useRef, useEffect } from "react"
import { motion } from "framer-motion"

export default function OrbitalAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  // 행성과 궤도 정의 - 영상 참고하여 개선
  const planets = [
    { size: 20, orbitRadius: 60, speed: 12, color: "#FFFFFF", delay: 0, glow: 10, opacity: 0.9 },
    { size: 8, orbitRadius: 40, speed: 8, color: "#E3F2FD", delay: 1, glow: 5, opacity: 0.8 },
    { size: 5, orbitRadius: 80, speed: 15, color: "#BBDEFB", delay: 0.5, glow: 3, opacity: 0.7 },
    { size: 4, orbitRadius: 100, speed: 18, color: "#90CAF9", delay: 2, glow: 2, opacity: 0.6 },
    { size: 3, orbitRadius: 30, speed: 6, color: "#64B5F6", delay: 1.5, glow: 2, opacity: 0.5 },
  ]

  // 추가 궤도 효과
  const orbitalEffects = [
    { radius: 120, rotationSpeed: 0.5, opacity: 0.1, dashArray: "3,10" },
    { radius: 140, rotationSpeed: -0.3, opacity: 0.08, dashArray: "5,15" },
    { radius: 160, rotationSpeed: 0.2, opacity: 0.05, dashArray: "2,8" },
  ]

  // 회전 효과를 위한 useEffect
  useEffect(() => {
    const orbitalElements = document.querySelectorAll(".orbital-effect")

    orbitalElements.forEach((element, index) => {
      const speed = orbitalEffects[index].rotationSpeed
      let rotation = 0

      const animate = () => {
        rotation += speed
        ;(element as HTMLElement).style.transform = `rotate(${rotation}deg)`
        requestAnimationFrame(animate)
      }

      const animationFrame = requestAnimationFrame(animate)

      return () => {
        cancelAnimationFrame(animationFrame)
      }
    })
  }, [])

  return (
    <div ref={containerRef} className="relative w-[200px] h-[200px] flex items-center justify-center">
      {/* 궤도 경로 - 더 얇고 세련되게 */}
      {planets.map((planet, index) => (
        <div
          key={`orbit-${index}`}
          className="absolute rounded-full border-dashed"
          style={{
            width: `${planet.orbitRadius * 2}px`,
            height: `${planet.orbitRadius * 2}px`,
            top: `${100 - planet.orbitRadius}px`,
            left: `${100 - planet.orbitRadius}px`,
            borderWidth: "0.5px",
            borderColor: `rgba(255, 255, 255, ${0.1 + index * 0.05})`,
          }}
        />
      ))}

      {/* 추가 궤도 효과 - 영상 참고 */}
      {orbitalEffects.map((effect, index) => (
        <div
          key={`orbital-effect-${index}`}
          className="absolute rounded-full border-dashed orbital-effect"
          style={{
            width: `${effect.radius * 2}px`,
            height: `${effect.radius * 2}px`,
            top: `${100 - effect.radius}px`,
            left: `${100 - effect.radius}px`,
            borderWidth: "0.5px",
            borderColor: `rgba(255, 255, 255, ${effect.opacity})`,
            borderStyle: "dashed",
            borderDasharray: effect.dashArray,
          }}
        />
      ))}

      {/* 중앙 행성/태양 - 더 밝고 빛나게 */}
      <motion.div
        className="absolute rounded-full bg-white z-10"
        style={{
          width: "18px",
          height: "18px",
          boxShadow: "0 0 15px rgba(255, 255, 255, 0.9), 0 0 30px rgba(255, 255, 255, 0.5)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* 중앙 행성 주변 발광 효과 */}
      <motion.div
        className="absolute rounded-full z-5"
        style={{
          width: "30px",
          height: "30px",
          background: "radial-gradient(circle, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0) 70%)",
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* 궤도를 도는 행성들 - 다양한 색상과 발광 효과 */}
      {planets.map((planet, index) => (
        <motion.div
          key={`planet-${index}`}
          className="absolute rounded-full"
          style={{
            width: `${planet.size}px`,
            height: `${planet.size}px`,
            backgroundColor: planet.color,
            boxShadow: `0 0 ${planet.glow}px rgba(255, 255, 255, 0.7)`,
            opacity: planet.opacity,
          }}
          initial={{
            x: planet.orbitRadius,
            y: 0,
          }}
          animate={{
            x: [planet.orbitRadius, 0, -planet.orbitRadius, 0, planet.orbitRadius],
            y: [0, planet.orbitRadius, 0, -planet.orbitRadius, 0],
          }}
          transition={{
            duration: planet.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
            delay: planet.delay,
          }}
        />
      ))}

      {/* 추가 발광 효과 - 더 밝고 세련되게 */}
      <motion.div
        className="absolute rounded-full bg-transparent border border-white/40"
        style={{
          width: "120px",
          height: "120px",
        }}
        animate={{
          rotate: 360,
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* 추가 빛 효과 */}
      <motion.div
        className="absolute"
        style={{
          width: "100%",
          height: "100%",
          background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* 빛 입자 효과 */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            boxShadow: "0 0 2px rgba(255, 255, 255, 0.8)",
          }}
          initial={{
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * 200 - 100,
            y: Math.random() * 200 - 100,
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
