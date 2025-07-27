"use client"

import { useRef, type ReactNode } from "react"
import { motion } from "framer-motion"

interface Card3DProps {
  children: ReactNode
  className?: string
  glareColor?: string
  borderColor?: string
  intensity?: number
  image?: string
}

export default function Card3D({
  children,
  className = "",
  glareColor = "rgba(255, 255, 255, 0.1)",
  borderColor = "rgba(255, 255, 255, 0.1)",
  intensity = 10,
  image,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null)

  return (
    <motion.div
      initial={{ x: 100, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.6,
        ease: "easeOut",
        delay: 0.1,
      }}
    >
      {/* Glare effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 50%, ${glareColor} 0%, transparent 70%)`,
          opacity: 0.1,
        }}
      />

      {/* Card content */}
      <div className="relative z-10 flex flex-col h-full items-center text-center">
        {image && (
          <img
            src={image || "/placeholder.svg"}
            alt="Card image"
            className="w-full h-32 object-cover rounded-t-lg mb-4"
          />
        )}
        {children}
      </div>
    </motion.div>
  )
}
