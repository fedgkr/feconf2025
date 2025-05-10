"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type * as THREE from "three"
import { useLanguage } from "./language-provider"
import { gsap } from "gsap"
import { ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

interface IntroAnimationProps {
  onComplete: () => void
  planetRef: THREE.Group | null
}

// Developer types list
const developerTypes = ["Frontend Architect", "UI/UX Specialist", "Full-Stack Developer"]

// Developer type abbreviations
const typeAbbreviations: Record<string, string[]> = {
  "Frontend Architect": ["UI", "ARCH", "FE"],
  "UI/UX Specialist": ["UX", "DES", "VIS"],
  "Full-Stack Developer": ["FS", "API", "SYS"],
}

// Galaxy/country codes
const galaxyCodes = ["G", "K", "Z", "A", "V", "M", "E", "S", "T", "R"]

// Developer descriptions by type
const developerDescriptions: Record<string, string[]> = {
  "Frontend Architect": [
    "You are a master of structure who builds digital cathedrals.",
    "You are a code poet who turns complexity into elegant solutions.",
    "You are a digital architect who shapes the future of interfaces.",
  ],
  "UI/UX Specialist": [
    "You are an artist who transforms experiences into digital magic.",
    "You are a visionary who sees beyond pixels to human emotions.",
    "You are a design alchemist who turns ideas into seamless experiences.",
  ],
  "Full-Stack Developer": [
    "You are a technological polymath who masters both worlds.",
    "You are a digital renaissance creator who knows no boundaries.",
    "You are an alchemist who turns data into art across all layers.",
  ],
}

// Generate developer code in the new format that's 95% similar to the user's name
const generateDeveloperCode = (name: string, type: string) => {
  // If name is empty, use a default
  if (!name.trim()) {
    return "USER-G" + Math.floor(1000 + Math.random() * 9000)
  }

  // Use the full name as the base
  let nameBase = name.trim().toUpperCase().replace(/\s+/g, "-")

  // If name is too short, add a type identifier
  if (nameBase.length < 3) {
    // Type abbreviation
    const typeOptions = typeAbbreviations[type] || ["DEV"]
    const typeCode = typeOptions[Math.floor(Math.random() * typeOptions.length)]
    nameBase = `${nameBase}-${typeCode}`
  }

  // Random galaxy/country code - only add if name is still short
  if (nameBase.length < 5) {
    const galaxyCode = galaxyCodes[Math.floor(Math.random() * galaxyCodes.length)]
    nameBase = `${nameBase}-${galaxyCode}`
  }

  // Add a short numeric suffix for uniqueness
  const randomNum = Math.floor(10 + Math.random() * 90)

  // Final code
  return `${nameBase}-${randomNum}`
}

// Get random description for developer type
const getRandomDescription = (type: string) => {
  const descriptions = developerDescriptions[type] || ["You are a unique developer with special talents."]
  return descriptions[Math.floor(Math.random() * descriptions.length)]
}

// Glowing audio visualization component
const AudioVisualization = () => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative flex items-center justify-center"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      >
        {/* Main circle */}
        <motion.div
          className="w-12 h-12 rounded-full bg-white/20"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              "0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.2)",
              "0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3)",
              "0 0 10px rgba(255,255,255,0.3), 0 0 20px rgba(255,255,255,0.2)",
            ],
          }}
          transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* Inner circle */}
        <motion.div
          className="absolute w-6 h-6 rounded-full bg-white/40"
          animate={{
            scale: [1, 0.8, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* Center dot */}
        <motion.div
          className="absolute w-2 h-2 rounded-full bg-white"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />

        {/* Outer glow effect */}
        <motion.div
          className="absolute w-16 h-16 rounded-full border border-white/30"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  )
}

// 완전히 분리된 LanguageToggle 컴포넌트
const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage()
  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="flex items-center bg-black/50 rounded-full p-0.5 sm:p-1 border border-white/20">
        <Button
          variant="ghost"
          size="sm"
          className={`rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm transition-all ${
            language === "kr" ? "bg-white text-black font-medium" : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setLanguage("kr")
          }}
        >
          KOR
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={`rounded-full px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm transition-all ${
            language === "en" ? "bg-white text-black font-medium" : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setLanguage("en")
          }}
        >
          ENG
        </Button>
      </div>
    </div>
  )
}

export default function IntroAnimation({ onComplete, planetRef }: IntroAnimationProps) {
  const { t, language, setLanguage } = useLanguage()
  const [fadeOut, setFadeOut] = useState(false)
  const [name, setName] = useState("")
  const [developerType, setDeveloperType] = useState("")
  const [showForm, setShowForm] = useState(true)
  const [welcomeMessage, setWelcomeMessage] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const [displayedMessage, setDisplayedMessage] = useState("")
  const [titleTypingComplete, setTitleTypingComplete] = useState(false)
  const [displayedTitle, setDisplayedTitle] = useState("")
  const [showNameField, setShowNameField] = useState(false)
  const [showTypeField, setShowTypeField] = useState(false)
  const [showButton, setShowButton] = useState(false)
  const [namePrompt, setNamePrompt] = useState("")
  const [typePrompt, setTypePrompt] = useState("")
  const [developerCode, setDeveloperCode] = useState("")
  const [showNextButton, setShowNextButton] = useState(false)

  // New states for the greeting animation
  const [showGreeting, setShowGreeting] = useState(true)
  const [greetingComplete, setGreetingComplete] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)

  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const titleTypingIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const namePromptTypingRef = useRef<NodeJS.Timeout | null>(null)
  const typePromptTypingRef = useRef<NodeJS.Timeout | null>(null)
  const nameInputRef = useRef<HTMLInputElement>(null)

  // Greeting animation sequence
  useEffect(() => {
    if (showGreeting) {
      // Start the greeting animation sequence
      const timer = setTimeout(() => {
        setGreetingComplete(true)

        // After greeting animation completes and fades out, show the welcome text
        setTimeout(() => {
          setShowGreeting(false)
          setShowWelcome(true)

          // Start the welcome text typing animation
          startWelcomeTyping()
        }, 3000) // Time for greeting to fade out
      }, 6000) // Time for greeting to be visible

      return () => clearTimeout(timer)
    }
  }, [showGreeting])

  // Welcome text typing effect
  const startWelcomeTyping = () => {
    // 언어에 따라 타이틀 텍스트 변경
    const titleText = language === "kr" ? "FEConf 2025에 오신 것을 환영합니다" : "Welcome to FEConf 2025"
    let index = 0
    setDisplayedTitle("") // Reset the displayed title
    setTitleTypingComplete(false) // 타이핑 완료 상태 초기화

    // 이전 타이머가 있다면 정리
    if (titleTypingIntervalRef.current) {
      clearInterval(titleTypingIntervalRef.current)
      titleTypingIntervalRef.current = null
    }

    // 타이핑 시작
    titleTypingIntervalRef.current = setInterval(() => {
      if (index < titleText.length) {
        setDisplayedTitle(titleText.substring(0, index + 1))
        index++
      } else {
        if (titleTypingIntervalRef.current) {
          clearInterval(titleTypingIntervalRef.current)
          titleTypingIntervalRef.current = null
        }
        setTitleTypingComplete(true)

        // Start name prompt typing after title is complete
        setTimeout(() => {
          startNamePromptTyping()
        }, 500)
      }
    }, 100)
  }

  // Name prompt typing effect
  const startNamePromptTyping = () => {
    const promptText = language === "kr" ? "이름을 입력하세요" : "Enter your Name"
    let index = 0
    setNamePrompt("")

    // 이전 타이머가 있다면 정리
    if (namePromptTypingRef.current) {
      clearInterval(namePromptTypingRef.current)
      namePromptTypingRef.current = null
    }

    namePromptTypingRef.current = setInterval(() => {
      if (index < promptText.length) {
        setNamePrompt(promptText.substring(0, index + 1))
        index++
      } else {
        if (namePromptTypingRef.current) {
          clearInterval(namePromptTypingRef.current)
          namePromptTypingRef.current = null
        }
        // Show name input field
        setShowNameField(true)
        // Set focus
        setTimeout(() => {
          if (nameInputRef.current) {
            nameInputRef.current.focus()
          }
        }, 100)
      }
    }, 80)
  }

  // Developer type prompt typing effect
  const startTypePromptTyping = () => {
    const promptText = language === "kr" ? "개발자 유형" : "Developer Type"
    let index = 0
    setTypePrompt("")

    if (typePromptTypingRef.current) {
      clearInterval(typePromptTypingRef.current)
    }

    typePromptTypingRef.current = setInterval(() => {
      if (index < promptText.length) {
        setTypePrompt(promptText.substring(0, index + 1))
        index++
      } else {
        if (typePromptTypingRef.current) {
          clearInterval(typePromptTypingRef.current)
        }
        // Show developer type selection field
        setShowTypeField(true)
      }
    }, 80)
  }

  // Name input completion handler
  const handleNameSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !showTypeField && name.trim().length > 0) {
      // Start developer type prompt
      startTypePromptTyping()
    }
  }

  // Developer type selection handler
  const handleTypeSelect = (type: string) => {
    setDeveloperType(type)
    // 타입이 선택되면 버튼 표시
    setShowButton(true)
  }

  // Typing effect function
  const startTypingEffect = (message: string) => {
    let index = 0
    setDisplayedMessage("")

    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current)
    }

    typingIntervalRef.current = setInterval(() => {
      if (index < message.length) {
        setDisplayedMessage(message.substring(0, index + 1))
        index++
      } else {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current)
        }
        setTypingComplete(true)
      }
    }, 50)
  }

  // Button click handler
  const handleStartCheck = () => {
    setShowForm(false)

    // Generate developer code with name
    const devCode = generateDeveloperCode(name, developerType)
    setDeveloperCode(devCode)
    // Save to localStorage for use in main screen
    localStorage.setItem("feconf-developer-code", devCode)
    const description = getRandomDescription(developerType)

    let message = ""
    if (name.trim() !== "") {
      message = language === "kr" ? `환영합니다, ${name}!\n${description}` : `Welcome, ${name}!\n${description}`
    } else {
      message = description
    }

    setWelcomeMessage(message)
    startTypingEffect(message)
  }

  // Transition to main screen after intro completion
  useEffect(() => {
    if (typingComplete) {
      const timeout = setTimeout(() => {
        setFadeOut(true)

        // Final planet scale up animation
        if (planetRef) {
          const timeline = gsap.timeline({
            onComplete: () => {
              setTimeout(onComplete, 500) // Trigger transition to main scene
            },
          })
          timeline.to(planetRef.scale, {
            x: 1.1,
            y: 1.1,
            z: 1.1,
            duration: 1.5,
            ease: "power2.out",
          })
        } else {
          setTimeout(onComplete, 2000)
        }
      }, 2000) // Wait 2 seconds after message display

      return () => clearTimeout(timeout)
    }
  }, [typingComplete, onComplete, planetRef])

  // Clean up timers on component unmount
  useEffect(() => {
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
      }
      if (titleTypingIntervalRef.current) {
        clearInterval(titleTypingIntervalRef.current)
      }
      if (namePromptTypingRef.current) {
        clearInterval(namePromptTypingRef.current)
      }
      if (typePromptTypingRef.current) {
        clearInterval(typePromptTypingRef.current)
      }
    }
  }, [])

  // Handle name input change
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
    // 이름이 입력되면 다음 버튼 표시
    setShowNextButton(e.target.value.trim().length > 0)
  }

  // Button style for the FEconf CTA button
  const buttonStyle = {
    background: `#FFFFFF`,
    color: "#0A2463",
    fontWeight: "bold",
    fontSize: "1.1rem",
    boxShadow: `0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.1)`,
    minWidth: "36.8%",
    height: "46.2px",
    padding: "0 1.5rem",
    transition: "all 0.3s ease", // Added smooth transition
  }

  // Button hover style
  const buttonHoverStyle = {
    background: `#FFFFFF`,
    boxShadow: `0 0 20px rgba(255,255,255,0.7), 0 0 40px rgba(255,255,255,0.4), 0 0 60px rgba(255,255,255,0.2)`,
    transition: "all 0.3s ease", // Added smooth transition
  }

  // 언어 변경 감지를 위한 useEffect 추가
  useEffect(() => {
    // 모든 타이핑 애니메이션 중지 및 상태 초기화 함수
    const resetAllTypingAnimations = () => {
      // 모든 타이머 정리
      if (titleTypingIntervalRef.current) {
        clearInterval(titleTypingIntervalRef.current)
        titleTypingIntervalRef.current = null
      }
      if (namePromptTypingRef.current) {
        clearInterval(namePromptTypingRef.current)
        namePromptTypingRef.current = null
      }
      if (typePromptTypingRef.current) {
        clearInterval(typePromptTypingRef.current)
        typePromptTypingRef.current = null
      }
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current)
        typingIntervalRef.current = null
      }
    }

    // 언어가 변경될 때마다 실행
    resetAllTypingAnimations()

    // 현재 화면 상태에 따라 적절한 애니메이션 시작
    if (showWelcome && !showForm) {
      // 결과 화면일 경우 메시지 다시 시작
      const description = getRandomDescription(developerType)
      let message = ""
      if (name.trim() !== "") {
        message = language === "kr" ? `환영합니다, ${name}!\n${description}` : `Welcome, ${name}!\n${description}`
      } else {
        message = description
      }
      setWelcomeMessage(message)
      startTypingEffect(message)
    } else if (showWelcome) {
      // 타이틀 화면일 경우
      if (showNameField) {
        // 이름 입력 화면
        const promptText = language === "kr" ? "이름을 입력하세요" : "Enter your Name"
        setNamePrompt(promptText)

        // 개발자 타입 선택 화면 - 항상 업데이트
        if (showTypeField || typePrompt) {
          const typeText = language === "kr" ? "개발자 유형" : "Developer Type"
          setTypePrompt(typeText)
        }
      } else {
        // 타이틀 타이핑 화면 - 지연 추가
        setTimeout(() => {
          startWelcomeTyping()
        }, 300)
      }
    }
  }, [language, showWelcome, showForm, showNameField, showTypeField, name, developerType])

  // 언어 변경 이벤트 리스너 추가
  useEffect(() => {
    // 언어 변경 이벤트 리스너
    const handleLanguageChange = () => {
      // 언어가 변경되었을 때 필요한 추가 작업
      console.log("Language changed to:", language)
    }

    // 이벤트 리스너 등록
    window.addEventListener("languageChange", handleLanguageChange)

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener("languageChange", handleLanguageChange)
    }
  }, [language])

  return (
    <AnimatePresence>
      {!fadeOut && (
        <motion.div
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          {/* 언어 토글을 완전히 분리하여 상단에 고정 */}
          <LanguageToggle />

          {/* Main content */}
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center px-6 max-w-md w-full mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            {showGreeting && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: greetingComplete ? 0 : 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  opacity: { duration: greetingComplete ? 1.5 : 1 },
                }}
              >
                <motion.div
                  className="flex flex-col items-center space-y-4 text-center"
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -50, opacity: 0 }}
                  transition={{ duration: 1.5, staggerChildren: 0.5 }}
                >
                  <motion.p
                    className="text-white text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                  >
                    {t("👋 안녕하세요, 프론트엔드 개발자 여러분.", "👋 Hello, frontend developers.")}
                  </motion.p>

                  <motion.p
                    className="text-white text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                  >
                    {t("당신의 호기심이 코드로 컴파일되는 곳,", "Where your curiosity compiles into code,")}
                  </motion.p>

                  <motion.p
                    className="text-white text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 3 }}
                  >
                    {t("대담한 아이디어가 실제 모멘텀을 만드는 곳,", "Where bold ideas spark real momentum,")}
                  </motion.p>
                </motion.div>
              </motion.div>
            )}

            {showForm && showWelcome ? (
              <div
                className="flex flex-col items-center w-full transform-gpu will-change-auto"
                style={{ transform: "translateZ(0)", backfaceVisibility: "hidden" }}
              >
                {/* Glowing audio visualization */}
                <motion.div
                  className="mb-6"
                  initial={{ scale: 1, y: 0 }}
                  animate={{
                    scale: showNameField ? 0.8 : 1,
                    y: showNameField ? -60 : 0,
                  }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                >
                  <AudioVisualization />
                </motion.div>

                {/* Title with typing effect - larger and bolder */}
                <motion.h1
                  className="text-white text-2xl md:text-3xl font-medium text-center mb-8 h-[60px]"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {displayedTitle}
                  <motion.span
                    animate={{ opacity: [0, 1] }}
                    transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  >
                    {titleTypingComplete ? "" : "_"}
                  </motion.span>
                </motion.h1>

                {/* Sequential form fields */}
                <div className="space-y-6 w-full max-w-md flex flex-col items-center">
                  {/* Name input field */}
                  <AnimatePresence>
                    {namePrompt && (
                      <motion.div
                        className="space-y-2 flex flex-col items-start w-full"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <label
                          htmlFor="name"
                          className="text-white text-base font-normal block mb-3 w-full text-left"
                          style={{ maxWidth: "374px" }}
                        >
                          {namePrompt}
                          <motion.span
                            animate={{ opacity: [0, 1] }}
                            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                          >
                            {showNameField ? "" : "_"}
                          </motion.span>
                        </label>

                        {showNameField && (
                          <motion.div
                            className="relative w-full"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className="flex items-center relative" style={{ maxWidth: "374px" }}>
                              <input
                                ref={nameInputRef}
                                id="name"
                                value={name}
                                onChange={handleNameChange}
                                onKeyDown={handleNameSubmit}
                                className="w-full bg-transparent border-b border-white/50 hover:border-white/70 focus:border-white outline-none text-white/50 hover:text-white/70 focus:text-white/90 py-1 text-base transition-colors duration-200"
                                placeholder="your name"
                              />
                              {name.trim().length > 0 && (
                                <motion.button
                                  className="absolute right-0 top-0 w-8 h-8 flex items-center justify-center rounded-full text-white transition-colors duration-200"
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ duration: 0.3 }}
                                  onClick={() => startTypePromptTyping()}
                                  aria-label={language === "kr" ? "다음" : "Next"}
                                >
                                  <ChevronRight size={18} />
                                </motion.button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Developer type selection */}
                  <AnimatePresence>
                    {typePrompt && (
                      <motion.div
                        className="space-y-3 flex flex-col w-full items-start"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <label
                          className="text-white text-base font-normal block w-full text-left"
                          style={{ maxWidth: "374px" }}
                        >
                          {language === "kr" ? "개발자 유형" : "Developer Type"}
                          <motion.span
                            animate={{ opacity: [0, 1] }}
                            transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                          >
                            {showTypeField ? "" : "_"}
                          </motion.span>
                        </label>

                        {showTypeField && (
                          <motion.div
                            className="space-y-3 mt-3 w-full"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{ maxWidth: "374px" }}
                          >
                            {developerTypes.map((type, index) => (
                              <div
                                key={type}
                                className="flex items-center space-x-3 group cursor-pointer"
                                onClick={() => handleTypeSelect(type)}
                              >
                                <div
                                  className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-200 ${
                                    developerType === type ? "bg-transparent" : "bg-transparent group-hover:bg-white/5"
                                  }`}
                                >
                                  <div
                                    className={`w-5 h-5 rounded-full border ${
                                      developerType === type
                                        ? "border-white"
                                        : "border-gray-500 group-hover:border-gray-300"
                                    } flex items-center justify-center transition-colors duration-200`}
                                  >
                                    {developerType === type && (
                                      <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
                                    )}
                                  </div>
                                </div>
                                <span
                                  className={`text-white text-base transition-colors duration-200 ${
                                    developerType === type ? "text-white" : "text-white/90 group-hover:text-white"
                                  }`}
                                >
                                  {type}
                                </span>
                              </div>
                            ))}
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Button - Updated to match FEconf CTA button style */}
                  <AnimatePresence>
                    {showButton && (
                      <motion.div
                        className="pt-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Button
                          onClick={handleStartCheck}
                          className="flex items-center justify-center gap-2 rounded-[200px] w-full"
                          style={buttonStyle}
                          onMouseEnter={(e) => {
                            Object.assign(e.currentTarget.style, buttonHoverStyle)
                          }}
                          onMouseLeave={(e) => {
                            Object.assign(e.currentTarget.style, buttonStyle)
                          }}
                        >
                          <span className="relative z-10">{t("이민 심사 시작", "Start Immigration Check")}</span>
                          <ChevronRight className="ml-1" size={16} />
                        </Button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : !showForm ? (
              <>
                {/* FEconf style modal for developer code result */}
                <motion.div
                  className="bg-black/60 backdrop-blur-xl rounded-2xl overflow-hidden relative outline outline-1 outline-white/20 w-full max-w-md"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    boxShadow: "0 0 20px rgba(255,255,255,0.1)",
                  }}
                >
                  {/* Animated glowing border effect */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    {/* Top border glow */}
                    <motion.div
                      className="absolute top-0 left-0 right-0 h-[1px]"
                      style={{
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent)",
                        boxShadow: "0 0 5px rgba(255,255,255,0.3), 0 0 10px rgba(255,255,255,0.2)",
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
                        background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.7), transparent)",
                        boxShadow: "0 0 5px rgba(255,255,255,0.3), 0 0 10px rgba(255,255,255,0.2)",
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
                        background: "linear-gradient(270deg, transparent, rgba(255,255,255,0.7), transparent)",
                        boxShadow: "0 0 5px rgba(255,255,255,0.3), 0 0 10px rgba(255,255,255,0.2)",
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
                        background: "linear-gradient(0deg, transparent, rgba(255,255,255,0.7), transparent)",
                        boxShadow: "0 0 5px rgba(255,255,255,0.3), 0 0 10px rgba(255,255,255,0.2)",
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

                  {/* Header */}
                  <div
                    className="px-4 py-3 flex items-center justify-between relative rounded-t-2xl"
                    style={{
                      background: "linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
                      borderBottom: "1px solid rgba(255,255,255,0.3)",
                    }}
                  >
                    <div
                      className="text-lg font-bold"
                      style={{
                        background: "linear-gradient(to right, #FFFFFF, #FFFFFF)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                      }}
                    >
                      IMMIGRATION CHECK COMPLETE
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Developer code section */}
                    <div className="mb-6">
                      <h2
                        className="text-lg font-bold mb-2"
                        style={{
                          background: "linear-gradient(to right, #FFFFFF, #FFFFFF)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        Developer Code
                      </h2>
                      <motion.div
                        className="h-px mb-4"
                        style={{
                          background: "linear-gradient(to right, #FFFFFF, #FFFFFF)",
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                      />

                      <div className="bg-white/10 p-4 rounded-lg border border-white/20 mb-6">
                        <div className="text-center">
                          <span className="text-2xl font-mono font-bold tracking-wider text-white">
                            {developerCode}
                          </span>
                        </div>
                      </div>

                      <div className="text-white/90 text-sm">
                        <div className="space-y-4">
                          <p className="whitespace-pre-line">
                            {displayedMessage}
                            <motion.span
                              animate={{ opacity: [0, 1] }}
                              transition={{ duration: 0.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                            >
                              {typingComplete ? "" : "_"}
                            </motion.span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </>
            ) : null}
          </motion.div>

          {/* Simplified footer */}
          <motion.div
            className="absolute bottom-8 left-0 right-0 text-center text-xs font-mono text-white/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p>© FECONF 2025</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Export the PlanetAnimationController for use in the PlanetExperience component
export function PlanetAnimationController({ planetRef }: { planetRef: React.RefObject<THREE.Group> }) {
  useEffect(() => {
    if (planetRef.current) {
      // Set up breathing animation
      const timeline = gsap.timeline({ repeat: -1, yoyo: true })

      timeline.to(planetRef.current.scale, {
        x: 1.02,
        y: 1.02,
        z: 1.02,
        duration: 2,
        ease: "sine.inOut",
      })

      return () => {
        timeline.kill()
      }
    }
  }, [planetRef])

  return null
}
