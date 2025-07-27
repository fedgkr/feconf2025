"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import type { Theme } from "@/lib/themes"

interface AnimatedBackgroundProps {
  theme: Theme
  scrollProgress?: number
}

export default function AnimatedBackground({ theme, scrollProgress = 0 }: AnimatedBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // 캔버스 크기 설정
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // 파티클 시스템
    const particles: Array<{
      x: number
      y: number
      vx: number
      vy: number
      size: number
      opacity: number
      color: string
    }> = []

    // 파티클 생성
    const createParticles = () => {
      const colors = [theme.planetColor, theme.glowColor, theme.orbitColor]

      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 0.5,
          opacity: Math.random() * 0.3 + 0.1,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }

    createParticles()

    // 애니메이션 루프
    let animationFrameId: number
    let time = 0

    const animate = () => {
      time += 0.01

      // 캔버스 클리어
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // 파티클 업데이트 및 그리기
      particles.forEach((particle, index) => {
        // 파티클 이동
        particle.x += particle.vx
        particle.y += particle.vy

        // 경계 처리
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // 파티클 그리기
        ctx.save()
        ctx.globalAlpha = particle.opacity * (1 - scrollProgress * 0.5)
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()

        // 연결선 그리기 (가까운 파티클들 간)
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.save()
            ctx.globalAlpha = (1 - distance / 100) * 0.1 * (1 - scrollProgress * 0.3)
            ctx.strokeStyle = theme.orbitColor
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
            ctx.restore()
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme, scrollProgress])

  // 그라디언트 색상 계산
  const gradientCenter = theme.gradientCenter || theme.planetColor
  const gradientOuter = theme.gradientOuter || theme.glowColor

  return (
    <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 1 }}>
      {/* 메인 그라디언트 배경 */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, ${gradientCenter}15 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, ${gradientOuter}15 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, ${theme.orbitColor}08 0%, transparent 70%),
            linear-gradient(135deg, #000000 0%, #0a0a0a 100%)
          `,
        }}
        animate={{
          background: [
            `radial-gradient(circle at 20% 80%, ${gradientCenter}15 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, ${gradientOuter}15 0%, transparent 50%),
             radial-gradient(circle at 40% 40%, ${theme.orbitColor}08 0%, transparent 70%),
             linear-gradient(135deg, #000000 0%, #0a0a0a 100%)`,
            `radial-gradient(circle at 80% 20%, ${gradientCenter}12 0%, transparent 50%),
             radial-gradient(circle at 20% 80%, ${gradientOuter}12 0%, transparent 50%),
             radial-gradient(circle at 60% 60%, ${theme.orbitColor}06 0%, transparent 70%),
             linear-gradient(135deg, #000000 0%, #0a0a0a 100%)`,
            `radial-gradient(circle at 20% 80%, ${gradientCenter}15 0%, transparent 50%),
             radial-gradient(circle at 80% 20%, ${gradientOuter}15 0%, transparent 50%),
             radial-gradient(circle at 40% 40%, ${theme.orbitColor}08 0%, transparent 70%),
             linear-gradient(135deg, #000000 0%, #0a0a0a 100%)`,
          ],
        }}
        transition={{
          duration: 20,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* 움직이는 오로라 효과 */}
      <motion.div
        className="absolute inset-0 w-full h-full opacity-30"
        style={{
          background: `
            linear-gradient(45deg, transparent 30%, ${theme.planetColor}05 50%, transparent 70%),
            linear-gradient(-45deg, transparent 30%, ${theme.glowColor}05 50%, transparent 70%)
          `,
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 30,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
      />

      {/* 파티클 캔버스 */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ mixBlendMode: "screen" }} />

      {/* 중앙 발광 효과 */}
      <motion.div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        style={{
          width: "800px",
          height: "800px",
          background: `radial-gradient(circle, ${gradientCenter}08 0%, ${gradientOuter}04 30%, transparent 70%)`,
          filter: "blur(40px)",
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* 스크롤에 따른 오버레이 */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, rgba(0,0,0,${scrollProgress * 0.3}) 100%)`,
        }}
      />
    </div>
  )
}
