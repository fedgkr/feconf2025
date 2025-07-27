"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

export default function OrbitalAnimation() {
  const containerRef = useRef<HTMLDivElement>(null)

  // 행성과 궤도 정의 - 3개로 줄임
  const planets = [
    { size: 8, orbitRadius: 25, speed: 12, color: "#FFFFFF", delay: 0, glow: 4, opacity: 0.9 },
    { size: 4, orbitRadius: 18, speed: 8, color: "#E3F2FD", delay: 1, glow: 2, opacity: 0.8 },
    { size: 3, orbitRadius: 35, speed: 15, color: "#BBDEFB", delay: 0.5, glow: 2, opacity: 0.7 },
  ]

  // 추가 궤도 효과 - 크기 축소
  const orbitalEffects = [
    { radius: 50, rotationSpeed: 0.5, opacity: 0.08, dashArray: "2,8" },
    { radius: 58, rotationSpeed: -0.3, opacity: 0.06, dashArray: "3,12" },
    { radius: 65, rotationSpeed: 0.2, opacity: 0.04, dashArray: "1,6" },
  ]

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center"
      style={{
        width: "80px",
        height: "80px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1,
        isolation: "isolate", // CSS isolation으로 완전히 격리
      }}
    >
      {/* 궤도 경로 - 원래 크기로 복원 */}
      {planets.map((planet, index) => (
        <div
          key={`orbit-${index}`}
          className="absolute rounded-full border-dashed"
          style={{
            width: `${planet.orbitRadius * 2}px`,
            height: `${planet.orbitRadius * 2}px`,
            top: `${40 - planet.orbitRadius}px`,
            left: `${40 - planet.orbitRadius}px`,
            borderWidth: "0.5px",
            borderColor: `rgba(255, 255, 255, ${0.08 + index * 0.02})`,
          }}
        />
      ))}

      {/* 추가 궤도 효과 - 크기 축소 */}
      {orbitalEffects.map((effect, index) => (
        <motion.div
          key={`orbital-effect-${index}`}
          className="absolute rounded-full border-dashed"
          style={{
            width: `${effect.radius * 2}px`,
            height: `${effect.radius * 2}px`,
            top: `${40 - effect.radius}px`,
            left: `${40 - effect.radius}px`,
            borderWidth: "0.5px",
            borderColor: `rgba(255, 255, 255, ${effect.opacity})`,
            borderStyle: "dashed",
            borderDasharray: effect.dashArray,
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: Math.abs(20 / effect.rotationSpeed),
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
      ))}

      {/* 중앙 행성/태양 - 원래 크기로 복원 */}
      <motion.div
        className="absolute rounded-full bg-white z-10"
        style={{
          width: "8px",
          height: "8px",
          top: "36px",
          left: "36px",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)",
          boxShadow: "0 0 12px rgba(255, 255, 255, 0.8), 0 0 24px rgba(255, 255, 255, 0.4)",
          filter: "blur(0.5px)",
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

      {/* 중앙 행성 주변 발광 효과 - 크기 축소 */}
      <motion.div
        className="absolute rounded-full z-5"
        style={{
          width: "16px",
          height: "16px",
          top: "32px",
          left: "32px",
          background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(255,255,255,0) 70%)",
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* 궤도를 도는 행성들 - 3개로 줄임 */}
      {planets.map((planet, index) => (
        <motion.div
          key={`planet-${index}`}
          className="absolute rounded-full"
          style={{
            width: `${planet.size}px`,
            height: `${planet.size}px`,
            background: `radial-gradient(circle, ${planet.color} 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)`,
            boxShadow: `0 0 ${planet.glow}px rgba(255, 255, 255, 0.6), 0 0 ${planet.glow * 2}px rgba(255, 255, 255, 0.3)`,
            opacity: planet.opacity,
            top: `${40 - planet.size / 2}px`,
            left: `${40 - planet.size / 2}px`,
            filter: "blur(0.5px)",
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

      {/* 추가 발광 효과 - 크기 축소 */}
      <motion.div
        className="absolute rounded-full bg-transparent border border-white/30"
        style={{
          width: "50px",
          height: "50px",
          top: "15px",
          left: "15px",
        }}
        animate={{
          rotate: 360,
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* 추가 빛 효과 - 크기 축소 */}
      <motion.div
        className="absolute"
        style={{
          width: "80px",
          height: "80px",
          background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 70%)",
        }}
        animate={{
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* 빛 입자 효과 - 범위 축소 */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: `${Math.random() * 1.5 + 0.5}px`,
            height: `${Math.random() * 1.5 + 0.5}px`,
            background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0) 100%)",
            boxShadow: "0 0 3px rgba(255, 255, 255, 0.6)",
            filter: "blur(0.5px)",
          }}
          initial={{
            x: Math.random() * 80 - 40,
            y: Math.random() * 80 - 40,
            opacity: 0,
          }}
          animate={{
            x: Math.random() * 80 - 40,
            y: Math.random() * 80 - 40,
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: Math.random() * 2 + 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>
  )
}
