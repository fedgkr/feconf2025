"use client"

import { motion } from "framer-motion"
import { useState, useCallback } from "react"

export interface ColorPreset {
  name: string
  color: string
  glowColor: string
}

interface ColorPresetsProps {
  onSelectColor: (preset: ColorPreset) => void
  selectedColor: string
}

export const colorPresets: ColorPreset[] = [
  { name: "blue", color: "#29B6F6", glowColor: "#4FC3F7" },
  { name: "cyan", color: "#00BCD4", glowColor: "#4DD0E1" },
  { name: "teal", color: "#009688", glowColor: "#4DB6AC" },
  { name: "green", color: "#4CAF50", glowColor: "#81C784" },
  { name: "yellow", color: "#FFEB3B", glowColor: "#FFF176" },
  { name: "orange", color: "#FF9800", glowColor: "#FFB74D" },
  { name: "red", color: "#F44336", glowColor: "#E57373" },
  { name: "purple", color: "#9C27B0", glowColor: "#BA68C8" },
  { name: "pink", color: "#E91E63", glowColor: "#F06292" },
  { name: "white", color: "#FFFFFF", glowColor: "#EEEEEE" },
]

export default function ColorPresets({ onSelectColor, selectedColor }: ColorPresetsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Function to generate a random color
  const generateRandomColor = useCallback(() => {
    const randomColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`
    const randomGlowColor = `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`
    return { name: "random", color: randomColor, glowColor: randomGlowColor }
  }, [])

  // Handle random color selection
  const handleRandomColor = useCallback(() => {
    const randomPreset = generateRandomColor()
    onSelectColor(randomPreset)
  }, [onSelectColor, generateRandomColor])

  return (
    <motion.div
      className="fixed bottom-20 right-6 z-30 flex flex-col items-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1 }}
    >
      {/* Toggle button */}
      <motion.button
        className="flex items-center justify-center w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/20 mb-2"
        onClick={() => setIsExpanded(!isExpanded)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="sr-only">Toggle color presets</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-white"
        >
          <circle cx="13.5" cy="6.5" r="2.5" />
          <circle cx="19" cy="13" r="2.5" />
          <circle cx="6" cy="12" r="2.5" />
          <circle cx="10" cy="20" r="2.5" />
          <path d="m2 2 20 20" />
        </svg>
      </motion.button>

      {/* Color presets */}
      <motion.div
        className="flex flex-col gap-2"
        initial={{ height: 0, opacity: 0 }}
        animate={{
          height: isExpanded ? "auto" : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {isExpanded && (
          <>
            {colorPresets.map((preset) => (
              <motion.button
                key={preset.name}
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center"
                style={{
                  backgroundColor: preset.color,
                  borderColor: selectedColor === preset.color ? "white" : "transparent",
                  boxShadow: `0 0 10px ${preset.color}80`,
                }}
                onClick={() => onSelectColor(preset)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                {selectedColor === preset.color && (
                  <motion.div
                    className="w-2 h-2 rounded-full bg-white"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </motion.button>
            ))}

            {/* Random color button */}
            <motion.button
              className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center bg-black/40 backdrop-blur-md"
              onClick={handleRandomColor}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <path d="M3.29 7 12 12l8.71-5" />
                <path d="M12 22V12" />
                <path d="m21 7-9 5-9-5" />
              </svg>
            </motion.button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
