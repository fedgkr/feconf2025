"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Download, Share2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import html2canvas from "html2canvas"
import { useLanguage } from "./language-provider"
import type * as THREE from "three"
import type { Theme } from "@/lib/themes"

// Template interface
interface CardTemplate {
  id: string
  name: string
  overlayStyle: React.CSSProperties
  cardStyle: React.CSSProperties
  contentStyle?: React.CSSProperties
  headerStyle?: React.CSSProperties
  footerStyle?: React.CSSProperties
  titleStyle?: React.CSSProperties
  codeStyle?: React.CSSProperties
}

interface CardGeneratorProps {
  planetRef: THREE.Group | null
  selectedTheme: Theme
}

export default function CardGenerator(props: CardGeneratorProps) {
  // Destructure props safely
  const planetRef = props.planetRef
  const selectedTheme = props.selectedTheme

  const [isOpen, setIsOpen] = useState(false)
  const [capturedImage, setCapturedImage] = useState<string | null>(null)
  const [userName, setUserName] = useState<string>("")
  const [developerCode, setDeveloperCode] = useState<string>("")
  const [isCapturing, setIsCapturing] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()

  // Preload logo
  useEffect(() => {
    const logoImg = new Image()
    logoImg.crossOrigin = "anonymous"
    logoImg.onload = () => {
      // Logo loaded
    }
    logoImg.src = "/images/logo_web.png"
  }, [])

  // Get user info from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const devCode = localStorage.getItem("feconf-developer-code") || ""
      setDeveloperCode(devCode)
      const nameFromCode = devCode.split("-")[0] || ""
      setUserName(nameFromCode || "FECONF")
    }
  }, [])

  // Create card template based on theme
  function getCardTemplate() {
    const randomAngle = Math.floor(Math.random() * 360)
    const secondAngle = (randomAngle + 90) % 360
    const themeColor = selectedTheme.displayColor

    return {
      id: "modern",
      name: "Modern",
      overlayStyle: {
        background: `linear-gradient(${randomAngle}deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0) 100%), 
             linear-gradient(${secondAngle}deg, ${themeColor}90 0%, ${themeColor}60 60%, ${themeColor}20 100%)`,
        borderRadius: "16px",
      },
      cardStyle: {
        boxShadow: `0 0 30px ${themeColor}40`,
        border: `1px solid ${themeColor}60`,
        overflow: "hidden",
        borderRadius: "16px",
        position: "relative",
      },
      titleStyle: {
        color: "white",
        fontWeight: "bold",
        textTransform: "uppercase",
        letterSpacing: "0.05em",
      },
      codeStyle: {
        color: "rgba(255,255,255,0.8)",
        fontWeight: "500",
        letterSpacing: "0.03em",
      },
      contentStyle: {
        padding: "24px",
      },
      headerStyle: {
        marginBottom: "auto",
      },
      footerStyle: {
        marginTop: "auto",
      },
    }
  }

  // Capture screen function
  async function captureScreen() {
    // 함수 내용을 비워서 아무 동작도 하지 않게 합니다
    return
  }

  // Download card function
  async function downloadCard() {
    if (!cardRef.current) return

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        onclone: (clonedDoc) => {
          try {
            if (!clonedDoc) return

            const images = clonedDoc.getElementsByTagName("img")
            if (images) {
              for (let i = 0; i < images.length; i++) {
                const img = images[i]
                if (img) {
                  img.crossOrigin = "anonymous"
                }
              }
            }
          } catch (err) {
            console.error("Error in onclone:", err)
          }
        },
      })

      const dataUrl = canvas.toDataURL("image/png")
      const link = document.createElement("a")
      link.download = `feconf-card-${userName.toLowerCase()}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Error downloading card:", error)
    }
  }

  // Share card function
  async function shareCard() {
    if (!cardRef.current) return

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: false,
        onclone: (clonedDoc) => {
          try {
            if (!clonedDoc) return

            const images = clonedDoc.getElementsByTagName("img")
            if (images) {
              for (let i = 0; i < images.length; i++) {
                const img = images[i]
                if (img) {
                  img.crossOrigin = "anonymous"
                }
              }
            }
          } catch (err) {
            console.error("Error in onclone:", err)
          }
        },
      })

      canvas.toBlob((blob) => {
        if (!blob) {
          downloadCard()
          return
        }

        try {
          if (navigator.share) {
            const file = new File([blob], `feconf-card-${userName.toLowerCase()}.png`, { type: "image/png" })
            navigator
              .share({
                title: "My FEConf2025 Card",
                files: [file],
              })
              .catch((error) => {
                console.error("Error sharing:", error)
                downloadCard()
              })
          } else {
            downloadCard()
          }
        } catch (error) {
          console.error("Error in blob handling:", error)
          downloadCard()
        }
      }, "image/png")
    } catch (error) {
      console.error("Error sharing card:", error)
      downloadCard()
    }
  }

  // Handle button click
  function handleCaptureClick() {
    captureScreen()
  }

  // Handle close modal
  function handleCloseModal() {
    setIsOpen(false)
  }

  // Handle download button click
  function handleDownloadClick() {
    downloadCard()
  }

  // Handle share button click
  function handleShareClick() {
    shareCard()
  }

  const template = getCardTemplate()

  return (
    <>
      {/* Card generation modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Transparent overlay */}
            <div className="absolute inset-0 pointer-events-auto" onClick={handleCloseModal} />
            <motion.div
              className="relative bg-black/60 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 p-6 max-w-md w-full mx-4 pointer-events-auto"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Close button */}
              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <X size={16} />
              </button>

              <h2 className="text-xl font-bold text-white mb-6 text-center">
                {t("FEConf2025 카드", "FEConf2025 Card")}
              </h2>

              {/* Card preview */}
              <div className="mb-6 flex justify-center">
                <div
                  ref={cardRef}
                  className="relative w-full max-w-sm aspect-[3/2] overflow-hidden"
                  style={template.cardStyle}
                >
                  {/* Captured image background */}
                  {capturedImage && (
                    <div className="absolute inset-0">
                      <img
                        src={capturedImage || "/placeholder.svg"}
                        alt="Captured scene"
                        className="w-full h-full object-cover"
                        crossOrigin="anonymous"
                      />
                    </div>
                  )}

                  {/* Semi-transparent overlay */}
                  <div className="absolute inset-0" style={template.overlayStyle} />

                  {/* FEConf logo */}
                  <div className="absolute top-6 left-6">
                    <img
                      src="/images/logo_web.png"
                      alt="FEConf Logo"
                      className="h-auto w-[72px] brightness-200"
                      crossOrigin="anonymous"
                    />
                  </div>

                  {/* Card content */}
                  <div className="absolute inset-0 flex flex-col justify-between" style={template.contentStyle}>
                    {/* Header */}
                    <div style={template.headerStyle}></div>

                    {/* Title */}
                    <div className="mt-auto">
                      <h2
                        className="text-white text-3xl font-bold uppercase tracking-wide mb-1"
                        style={template.titleStyle}
                      >
                        {userName}
                      </h2>
                      <div className="text-white/90 text-xl uppercase tracking-wide" style={template.titleStyle}>
                        Developer
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="mt-auto" style={template.footerStyle}>
                      <div className="font-mono text-sm" style={template.codeStyle}>
                        {developerCode}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-center gap-4">
                <Button
                  onClick={handleDownloadClick}
                  className="bg-white text-black hover:bg-white/90 flex items-center gap-2 px-4 py-2 rounded-full"
                >
                  <Download size={16} />
                  {t("다운로드", "Download")}
                </Button>
                <Button
                  onClick={handleShareClick}
                  className="bg-white/20 text-white hover:bg-white/30 flex items-center gap-2 px-4 py-2 rounded-full"
                >
                  <Share2 size={16} />
                  {t("공유하기", "Share")}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
