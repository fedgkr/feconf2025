"use client"

import { useState, useEffect, type ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, ChevronRight, AlertCircle, CheckCircle, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

interface FuturisticPopupProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  type?: "info" | "success" | "warning" | "error"
  actionLabel?: string
  onAction?: () => void
  width?: string
  height?: string
}

export default function FuturisticPopup({
  isOpen,
  onClose,
  title = "System Notification",
  children,
  type = "info",
  actionLabel,
  onAction,
  width = "500px",
  height = "auto",
}: FuturisticPopupProps) {
  const [showContent, setShowContent] = useState(false)

  // Auto-show content after popup appears
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setShowContent(true)
      }, 300)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [isOpen])

  // Define colors based on type
  const getTypeColors = () => {
    switch (type) {
      case "success":
        return {
          primary: "#FFFFFF",
          secondary: "#FFFFFF",
          icon: <CheckCircle size={24} />,
        }
      case "warning":
        return {
          primary: "#FFD700",
          secondary: "#FFFFFF",
          icon: <AlertCircle size={24} />,
        }
      case "error":
        return {
          primary: "#FF4D4D",
          secondary: "#FFFFFF",
          icon: <AlertCircle size={24} />,
        }
      case "info":
      default:
        return {
          primary: "#FFFFFF",
          secondary: "#FFFFFF",
          icon: <Info size={24} />,
        }
    }
  }

  const { primary, secondary, icon } = getTypeColors()

  // Gradient styles
  const gradientStyle = {
    background: `linear-gradient(to right, ${primary}, ${secondary})`,
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    backgroundClip: "text",
    color: "transparent",
  }

  // Border gradient
  const borderGradient = {
    borderColor: `${primary}50`, // 30% opacity
  }

  // Header gradient
  const headerGradient = {
    background: `linear-gradient(90deg, ${primary}20, ${primary}05)`,
    borderBottom: `1px solid ${primary}30`,
  }

  // Glossy reflection
  const glossyReflection = {
    background: `linear-gradient(135deg, ${primary}10 0%, transparent 50%, ${primary}05 100%)`,
  }

  if (!isOpen) return null

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop with blur */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-md pointer-events-auto"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <AnimatePresence>
        <motion.div
          className="relative pointer-events-auto"
          style={{ width, height }}
          initial={{ scale: 0.9, y: 20, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
        >
          {/* Main popup container - 배경 투명도 증가 */}
          <div
            className="bg-black/60 backdrop-blur-xl rounded-2xl overflow-hidden relative outline outline-1 outline-white/20"
            style={borderGradient}
          >
            {/* Animated glowing border effect - more subtle */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              {/* Top border glow */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${primary}70, transparent)`,
                  boxShadow: `0 0 5px ${primary}30, 0 0 10px ${primary}20`,
                }}
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />

              {/* Right border glow */}
              <motion.div
                className="absolute top-0 right-0 bottom-0 w-[1px]"
                style={{
                  background: `linear-gradient(180deg, transparent, ${primary}70, transparent)`,
                  boxShadow: `0 0 5px ${primary}30, 0 0 10px ${primary}20`,
                }}
                initial={{ y: "-100%" }}
                animate={{ y: "100%" }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: 1,
                }}
              />

              {/* Bottom border glow */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px]"
                style={{
                  background: `linear-gradient(270deg, transparent, ${primary}70, transparent)`,
                  boxShadow: `0 0 5px ${primary}30, 0 0 10px ${primary}20`,
                }}
                initial={{ x: "100%" }}
                animate={{ x: "-100%" }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: 2,
                }}
              />

              {/* Left border glow */}
              <motion.div
                className="absolute top-0 left-0 bottom-0 w-[1px]"
                style={{
                  background: `linear-gradient(0deg, transparent, ${primary}70, transparent)`,
                  boxShadow: `0 0 5px ${primary}30, 0 0 10px ${primary}20`,
                }}
                initial={{ y: "100%" }}
                animate={{ y: "-100%" }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                  delay: 3,
                }}
              />
            </div>

            {/* Glossy reflection overlay */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl" style={glossyReflection} />

            {/* Animated scanning line */}
            <motion.div
              className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
              initial={{ backgroundPosition: "0% 0%" }}
              animate={{ backgroundPosition: "0% 100%" }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              style={{
                backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 5px, ${primary} 5px, ${primary} 6px)`,
                backgroundSize: "100% 10px",
              }}
            />

            {/* Animated border glow - more subtle */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none">
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{ boxShadow: `0 0 8px ${primary}30` }}
                animate={{ boxShadow: [`0 0 5px ${primary}20`, `0 0 10px ${primary}40`, `0 0 5px ${primary}20`] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              />
            </div>

            {/* Header */}
            <div className="px-4 py-3 flex items-center justify-end relative rounded-t-2xl" style={headerGradient}>
              {/* Close button */}
              <button
                onClick={onClose}
                className="transition-colors rounded-full p-1.5 bg-black/20 hover:bg-black/40"
                style={{ color: primary }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Title */}
              <div className="mb-4">
                <h2 className="text-lg font-bold mb-2" style={gradientStyle}>
                  {title}
                </h2>
                <motion.div
                  className="h-px"
                  style={{
                    background: `linear-gradient(to right, ${primary}, ${primary})`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                />
              </div>
              <div className="text-white/90 text-sm">{children}</div>

              {/* Action button */}
              {actionLabel && (
                <div className="mt-[50px] flex justify-end">
                  <Button
                    onClick={onAction}
                    className="group relative overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-center gap-2 rounded-[200px]"
                    style={{
                      backgroundColor: "white",
                      color: "#000",
                      fontWeight: "bold",
                      boxShadow: `0 0 15px rgba(255,255,255,0.5)`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `rgba(255,255,255,0.9)`
                      e.currentTarget.style.boxShadow = `0 0 20px rgba(255,255,255,0.7)`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "white"
                      e.currentTarget.style.boxShadow = `0 0 15px rgba(255,255,255,0.5)`
                    }}
                  >
                    <span className="relative z-10">{actionLabel}</span>
                    <ChevronRight
                      size={16}
                      className="ml-1 relative z-10 group-hover:translate-x-1 transition-transform"
                    />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
