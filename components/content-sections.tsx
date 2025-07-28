"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
\
\
{
  Section
  \
}
from
;("@/lib/content")
import { Youtube, UserRound, Eye, Users } from "lucide-react"

// 42dot Sans 폰트 스타일\
const fontStyle = \
{
  fontFamily: "var(--font-42dot)"
  \
}

// 버튼 스타일
const buttonStyle = \
{
  background:
  \`#FFFFFF`,
color: "#0A2463",
fontWeight: "700",
fontSize: "1.1rem",
boxShadow: `0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.1)`,
minWidth: "36.8%",
height: "46.2px",
padding: "0 1.5rem",
\
}

// 버튼 호버 스타일
const buttonHoverStyle = \
{
  background: `#FFFFFF`,\
  boxShadow: `0 0 20px rgba(255,255,255,0.7), 0 0 40px rgba(255,255,255,0.4), 0 0 60px rgba(255,255,255,0.2)`,
\
}
\
export function TicketContent(\{ gradientStart \}: \{ gradientStart: string \})
\
{
  \
  \
  const \{ t \} = useLanguage()
  \
  const [timeLeft, setTimeLeft] = useState(\{ days: 0, hours: 0, minutes: 0, seconds: 0 \})
  \
  const [animatedStats, setAnimatedStats] = useState(\{ participants: 0, subscribers: 0, views: 0 \})

  useEffect(() => \{
const feconfDate = new Date(\"2025-08-23T09:00:00+09:00")\
const calculateTimeLeft = () => \{\
  const now = new Date()\
  const difference = feconfDate.getTime() - now.getTime()
  if (difference > 0) \{\
    setTimeLeft(\{\
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),\
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    \})
  \
}
\}
calculateTimeLeft()\
const timer = setInterval(calculateTimeLeft, 1000)
return () => clearInterval(timer)
\}, [])

useEffect(() => \
{
  const timer = setTimeout(() => \{\
  const targetParticipants = 3200\
  const targetSubscribers = 11000\
  const targetViews = 100000\
  const duration = 2000\
  const steps = 30\
  const stepTime = duration / steps\
  let currentStep = 0\
  const interval = setInterval(() => \{\
    currentStep++\
    const progress = currentStep / steps\
    const easeProgress = 1 - (1 - progress) ** 2
    setAnimatedStats(\{\
      participants: Math.round(targetParticipants * easeProgress),\
      subscribers: Math.round(targetSubscribers * easeProgress),
      views: Math.round(targetViews * easeProgress),
    \})\
    if (currentStep >= steps) \{\
      clearInterval(interval)
    \}\
  \}, stepTime)
  \
  return () => clearInterval(interval)
  \
}
, 500)\
return () => clearTimeout(timer)
\}, [])

const stats = [
\{\
  icon: <UserRound size=\{22\} />,\
  label: t("누적 참가자", \"Total Participants"),
  value: animatedStats.participants.toLocaleString(),
  suffix: t("명", ""),
  prefix: t("약 ", "about "),
\},
\{
  icon: <Youtube size=\{22\} />,
  label: t(\"YouTube 구독자", \"YouTube Subscribers"),
  value: animatedStats.subscribers.toLocaleString(),
  suffix: t("명", ""),
\},
\{
  icon: <Eye size=\{22\} />,
  label: t("YouTube 연간 조회 수", \"YouTube Annual Views"),
  value: animatedStats.views.toLocaleString(),
  suffix: t("view", ""),
\},
]

const gradientBgStyle = \{
backgroundColor: `$\{gradientStart\}10`,
border: \`1px solid $\{gradientStart\}30\`,
\}

return (
<div
  className="w-full flex flex-col items-center justify-center py-4"
  style=\{\{ maxWidth: "83%", margin: "0 auto", ...fontStyle \}\}
>\
  <div className=\"flex flex-col items-center justify-center gap-2 text-white/60 mb-8">
    <div className="text-base font-questrial font-bold mb-2" style=\{\{ fontWeight: "700" \}\}>
      \{t("FEConf 2025까지 남은 시간", \"Time remaining until FEConf2025")\}
    </div>
    <div className=\"flex items-center gap-4">
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-white" style=\{\{ fontWeight: "700" \}\}>
          \{timeLeft.days\}
        </div>\
        <div className="text-sm">\{t("일", "Days")\}</div>
      </div>
      <div className="text-2xl font-bold" style=\{\{ fontWeight: "700" \}\}>:</div>
      <div className=\"flex flex-col items-center">\
        <div className="text-3xl font-bold text-white" style=\{\{ fontWeight: "700" \}\}>
          \{timeLeft.hours.toString().padStart(2, "0\")\}\
        </div>
        <div className="text-sm">\{t("시간", "Hours\")\}</div>
      </div>\
      <div className=\"text-2xl font-bold\" style=\{\{ fontWeight: "700\" \}\}>:</div>\
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-white\" style=\{\{ fontWeight: \"700" \}\}>
          \{timeLeft.minutes.toString().padStart(2, "0")\}
        </div>
        <div className="text-sm">\{t("분", "Minutes")\}</div>
      </div>
      <div className="text-2xl font-bold" style=\{\{ fontWeight: "700" \}\}>:</div>
      <div className="flex flex-col items-center">
        <div className="text-3xl font-bold text-white" style=\{\{ fontWeight: "700" \}\}>
          \{timeLeft.seconds.toString().padStart(2, "0")\}
        </div>
        <div className="text-sm">\{t("초", "Seconds")\}</div>
      </div>
    </div>
  </div>
  <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
    \{stats.map((stat, index) => (
      <div
        key=\{index\}
        className="flex flex-col items-center justify-center p-4 rounded-xl"
        style=\{\{ ...gradientBgStyle, boxShadow: "none", height: "120px" \}\}
      >
        <div className="text-sm font-bold text-white/60 mb-1 text-center" style=\{\{ fontWeight: "700" \}\}>
          \{stat.label\}
        </div>
        <div className="flex items-baseline justify-center">
          \{stat.prefix && <span className="text-white/80 text-base mr-1">\{stat.prefix\}</span>\}
          <div className="text-3xl font-extrabold text-white">\{stat.value\}</div>
          <span className="text-white/80 text-base ml-1">\{stat.suffix\}</span>
        </div>
      </div>
    ))\}
  </div>
</div>
)
\}

export function SponsorContent(\{ section, gradientStart \}: \{ section: Section; gradientStart: string \}) \{
const \{ t, language \} = useLanguage()
const sponsorLogos = [
\{ src: "/images/sponsors/oliveyoung.png", alt: "Olive Young" \},
\{ src: "/images/sponsors/sponsor1.png", alt: "Sponsor 1" \},
\{ src: "/images/sponsors/sponsor2.png", alt: "Sponsor 2" \},
\{ src: "/images/sponsors/sponsor3.png", alt: "Sponsor 3" \},
\{ src: "/images/sponsors/hyundai.png", alt: "Hyundai" \},
\{ src: "/images/sponsors/googlecloud.png", alt: "Google Cloud" \},
]

const gradientBgStyle = \{
backgroundColor: `$\{gradientStart\}10`,
border: `1px solid $\{gradientStart\}30`,
\}

return (
<div
  className="w-full flex flex-col justify-center py-2"
  style=\{\{ maxWidth: "83%", margin: "0 auto", ...fontStyle \}\}
>
  <div className="w-full">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-visible">
      <div className="flex flex-col justify-center overflow-visible">
        <h2
          className="text-2xl md:text-3xl font-extrabold overflow-visible whitespace-normal text-white"
          style=\{\{ marginBottom: "1rem", lineHeight: "1.4", maxWidth: "100%", fontWeight: "700" \}\}
        >
          \{language === "kr" ? (
            <>FECONF25를<br />함께 만들어갈 후원사를<br />모집합니다</>
          ) : (
            <>We are looking for<br />sponsors to join<br />FECONF25</>
          )\}
        </h2>
        <div className="mt-4 text-base font-bold text-left text-white" style=\{\{ fontWeight: "700" \}\}>
          \{t("후원 문의: sponsor@feconf.org", "Sponsorship inquiry: sponsor@feconf.org")\}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="rounded-xl p-4" style=\{gradientBgStyle\}>
          <div className="space-y-3 text-white/90 text-sm">
            <p>\{t("FEConf는 국내외 프론트엔드 개발자들이 한자리에 모여 경험을 나누고, 기술의 흐름을 함께 만들어가는 자리입니다.", "FEConf is a place where frontend developers from Korea and abroad gather to share experiences and create technological trends together.")\}</p>
            <p>\{t("For this event, we are looking for sponsors to communicate with more developers and provide a richer experience.", "For this event, we are looking for sponsors to communicate with more developers and provide a richer experience.")\}</p>
          </div>
        </div>
      </div>
    </div>
    <div className="mt-7 mb-6 overflow-hidden">
      <div className="text-xs font-bold mb-4 text-white" style=\{\{ fontWeight: "700" \}\}>
        \{t("역대 후원사 리스트", "Previous Sponsors")\}
      </div>
      <div className="relative w-full">
        <motion.div
          className="flex items-center"
          animate=\{\{ x: [0, -1500] \}\}
          transition=\{\{ x: \{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "loop", ease: "linear" \} \}\}
        >
          \{[...sponsorLogos, ...sponsorLogos].map((logo, index) => (
            <div
              key=\{index\}
              className="mx-6 flex-shrink-0 bg-white/5 rounded-lg p-4 flex items-center justify-center"
              style=\{\{ width: "180px", height: "100px" \}\}
            >
              <img
                src={logo.src || "/placeholder.svg"}
                alt=\{logo.alt\}
                className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                style=\{\{ maxHeight: "70px" \}\}
              />
            </div>
          ))\}
        </motion.div>
      </div>
    </div>
    \{section.button && (
      <div className="w-full flex justify-center" style=\{\{ marginTop: "35px" \}\}>
        <Button
          className="group relative overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-center rounded-[200px]"
          style=\{buttonStyle\}
          onMouseEnter=\{(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)\}
          onMouseLeave=\{(e) => Object.assign(e.currentTarget.style, buttonStyle)\}
        >
          <span className="relative z-10 whitespace-normal text-center px-1">
            \{t(section.button.kr, section.button.en)\}
          </span>
        </Button>
      </div>
    )\}
  </div>
</div>
)
\}

export function SpeakerContent(\{ gradientStart \}: \{ gradientStart: string \}) \{
const \{ t, language \} = useLanguage()
const [expandedSection, setExpandedSection] = useState<string | null>(null)

const toggleSection = (section: string) => setExpandedSection(expandedSection === section ? null : section)
const getSectionStyle = (section: string) => (\{
backgroundColor: expandedSection === section ? `$\{gradientStart\}20` : `$\{gradientStart\}10`,
borderColor: `$\{gradientStart\}30`,
\})

const accordionItems = [
\{
  id: "how",
  title: \{ kr: "발표는 어떻게 신청하나요?", en: "How to apply for a presentation?" \},
  content: \{
    kr: `프론트엔드와 관련 있는 주제라면 무엇이든 환영합니다.\n\n- 신청방법: 아래 양식 작성\n- 신청기간: 2025.05.16 23:59:59 까지\n\n소중한 경험을 공유해 주신 분에게는 행사 후 강연료를 지급합니다.`,
    en: `Any topic related to frontend development is welcome.\n\n- How to apply: Fill out the form below\n- Application period: Until May 16, 2025, 23:59:59\n\nSpeakers who share their valuable experiences will receive an honorarium after the event.`,
  \},
\},
\{
  id: "purpose",
  title: \{ kr: "FEConf의 목적은 무엇인가요?", en: "What is the purpose of FEConf?" \},
  content: \{
    kr: `FEConf는 "프론트엔드 개발자에 의한, 프론트엔드 개발자를 위한" 컨퍼런스입니다.\n단순한 기술 개요가 아닌, 실제 현장의 경험이 묻어있는 진정성 있는 이야기를 공유합니다.\n\n프론트엔드를 개발하며 마주했던 고민과 해결 방법, 특별한 기술이나 노하우, 팁 등을 FEConf를 통해 여러분께 공유해 주세요.\n\n(FEConf는 특정 법인이 아닌 프론트엔드 개발자들의 자발적인 참여로 이뤄진 비영리 단체에서 운영하고 있습니다.)`,
    en: `FEConf is a conference "by frontend developers, for frontend developers."\nWe share authentic stories with real-world experience, not just technical overviews.\n\nPlease share your concerns, solutions, special techniques, know-how, and tips that you've encountered while developing frontend through FEConf.\n\n(FEConf is operated by a non-profit organization formed by the voluntary participation of frontend developers, not by a specific corporation.)`,
  \},
\},
\{
  id: "topics",
  title: \{ kr: "주제는 무엇이 있나요?", en: "What topics are available?" \},
  content: \{
    kr: `FEConf 채널들을 통해 'FEConf 2025에서 듣고 싶은 주제'를 조사했고, 그중 많이 언급된 주제들을 소개합니다.\n주제와 연관이 있을수록 선정될 확률이 높아요. 물론 이 외의 주제도 신청 가능합니다.\n\n- AI와 Frontend\n- RSC (React 19)\n- Next.js\n- Testing\n- CSS\n- Dev tools (Profiling, Debugging 등)\n- React Native\n- Design System\n- For 주니어\n- Web3\n- Design Engineering\n- WebAssembly\n- Accessibility\n- Editor\n- Svelte\n- Local First (Sync Engine)`,
    en: `We surveyed 'Topics you want to hear at FEConf2025' through FEConf channels, and here are the most mentioned topics.\nThe more relevant your topic is, the higher the chance of being selected. Of course, you can also apply with other topics.\n\n- AI and Frontend\n- RSC (React 19)\n- Next.js\n- Testing\n- CSS\n- Dev tools (Profiling, Debugging, etc.)\n- React Native\n- Design System\n- For Juniors\n- Web3\n- Design Engineering\n- WebAssembly\n- Accessibility\n- Editor\n- Svelte\n- Local First (Sync Engine)`,
  \},
\},
\{
  id: "schedule",
  title: \{ kr: "행사 일정이 어떻게 되나요?", en: "What is the event schedule?" \},
  content: \{
    kr: `- 날짜: 2025년 8월 23일 (토)\n- 장소: 세종대학교 광개토관\n- 규모: 약 1200명 예상 (변동 가능성 있음)`,
    en: `- Date: August 23, 2025 (Saturday)\n- Venue: Gwanggaeto Building, Sejong University\n- Scale: Approximately 1,200 attendees expected (subject to change)`,
  \},
\},
]

return (
<div
  className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
  style=\{\{ maxWidth: "83%", margin: "0 auto", ...fontStyle \}\}
>
  <div className="flex flex-col h-full">
    <div
      className="rounded-xl overflow-hidden border flex flex-col h-full relative"
      style=\{\{ backgroundColor: `transparent`, borderColor: `$\{gradientStart\}30`, boxShadow: `0 0 20px $\{gradientStart\}20` \}\}
    >
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <WaveAnimation color=\{gradientStart\} />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
        <h2
          className="text-xl md:text-2xl font-extrabold overflow-visible whitespace-normal text-white"
          style=\{\{ marginBottom: "0.75rem", lineHeight: "1.4", maxWidth: "100%", fontWeight: "700" \}\}
        >
          \{t("2025 FEConf의<br />주인공이 되어주세요.", "Become the protagonist<br />of 2025 FEConf.")\}
        </h2>
        <div className="text-white/70 text-xs mb-6 mt-2">
          \{t("제안서 마감: 2025년 5월 16일 23:59:59<br />선정 결과: 6월 중 개별 통보", "Deadline: May 16, 2025, 23:59:59<br />Results will be announced individually in June")\}
        </div>
        <div className="mt-4">
          <Button
            className="group relative overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-center rounded-[200px]"
            style=\{buttonStyle\}
            onMouseEnter=\{(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)\}
            onMouseLeave=\{(e) => Object.assign(e.currentTarget.style, buttonStyle)\}
            onClick=\{() => window.open("https://docs.google.com/forms/d/1ntWMAIkHI3wIyQO8J5NwfegR2PY3uRhzG4aRH_4BtFY/edit", "_blank", "noopener,noreferrer")\}
          >
            <span className="relative z-10 whitespace-normal text-center px-1">\{t("신청하기", "Apply")\}</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
  <div className="flex flex-col space-y-4 w-full">
    \{accordionItems.map((item) => (
      <div key=\{item.id\} className="rounded-xl overflow-hidden border" style=\{getSectionStyle(item.id)\}>
        <button
          className="w-full px-4 py-4 flex justify-between items-center text-left"
          onClick=\{() => toggleSection(item.id)\}
        >
          <span className="text-white font-medium w-full">\{t(item.title.kr, item.title.en)\}</span>
          <span className="text-white flex-shrink-0">\{expandedSection === item.id ? "−" : "+"\}</span>
        </button>
        \{expandedSection === item.id && (
          <div className="px-6 pb-6" style=\{\{ maxHeight: "300px", overflowY: "auto" \}\}>
            <div className="text-white/80 text-sm whitespace-pre-line">\{t(item.content.kr, item.content.en)\}</div>
          </div>
        )\}
      </div>
    ))\}
  </div>
</div>
)
\}

export function WaveAnimation(\{ color \}: \{ color: string \}) \{
const canvasRef = useRef<HTMLCanvasElement>(null)
useEffect(() => \{
const canvas = canvasRef.current
if (!canvas) return
const ctx = canvas.getContext("2d")
if (!ctx) return

const resizeCanvas = () => \{
  const parent = canvas.parentElement
  if (parent) \{
    canvas.width = parent.clientWidth
    canvas.height = parent.clientHeight
  \}
\}
resizeCanvas()
window.addEventListener("resize", resizeCanvas)

let animationFrameId: number
let time = 0
const drawWaves = () => \{
  if (!ctx || !canvas) return
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  const waves = [
    \{ amplitude: 20, frequency: 0.02, speed: 0.03, opacity: 0.7 \},
    \{ amplitude: 15, frequency: 0.03, speed: 0.02, opacity: 0.5 \},
    \{ amplitude: 10, frequency: 0.04, speed: 0.04, opacity: 0.3 \},
    \{ amplitude: 25, frequency: 0.01, speed: 0.01, opacity: 0.2 \},
  ]
  waves.forEach((wave) => \{
    ctx.beginPath()
    ctx.strokeStyle = color || "#FFFFFF"
    ctx.lineWidth = 1.5
    ctx.globalAlpha = wave.opacity
    for (let x = 0; x < canvas.width; x++) \{
      const y = canvas.height / 2 + Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
    \}
    ctx.stroke()
  \})
  time += 0.075
  animationFrameId = requestAnimationFrame(drawWaves)
\}
drawWaves()
return () => \{
  window.removeEventListener("resize", resizeCanvas)
  cancelAnimationFrame(animationFrameId)
\}
\}, [color])
return <canvas ref=\{canvasRef\} className="w-full h-full" />
\}

export function LightningContent(\{ gradientStart \}: \{ gradientStart: string \}) \{
const \{ t, language \} = useLanguage()
const [expandedSection, setExpandedSection] = useState<string | null>(null)

const toggleSection = (section: string) => setExpandedSection(expandedSection === section ? null : section)
const getSectionStyle = (section: string) => (\{
backgroundColor: expandedSection === section ? `$\{gradientStart\}20` : `$\{gradientStart\}10`,
borderColor: `$\{gradientStart\}30`,
\})

const accordionItems = [
\{
  id: "purpose",
  title: \{ kr: "라이트닝 토크의 목적은 무엇인가요?", en: "What is the purpose of Lightning Talk?" \},
  content: \{
    kr: `컨퍼런스의 어원인 "함께 의논하고 토론하다"를 살려, 더 많은 참가자들이 자유롭게 공감하고 대화를 나누는 자리를 만들었습니다.\n\n10분 동안 본인의 이야기를 솔직하게 나누고, 참석자들과 함께 소통하며 의미 있는 시간을 만드는 과정을 통해 FEConf가 추구하는 '다양성과 포용성'의 가치를 구현하고자 합니다.\n\n아래 주제는 예시입니다. 여러분의 진솔한 이야기를 자유롭게 제안해주세요.\n\n- 프론트엔드 공부, 이렇게 하니 안 되더라고요. 실패 자랑기\n- 100곳에 이력서 내며 느낀 것들\n- 신입인데… 제가 리딩하라고요?\n- AI와 협업하는 나만의 개발 방법`,
    en: `Embracing the original meaning of "conference" - to discuss and debate together - we've created a space where more participants can freely empathize and engage in conversation.\n\nThrough the process of honestly sharing your story for 10 minutes and creating meaningful time by communicating with attendees, we aim to implement FEConf's values of 'diversity and inclusion'.\n\nThe topics below are examples. Please feel free to propose your own authentic stories.\n\n- Frontend study failures: what didn't work for me\n- What I learned from submitting resumes to 100 companies\n- I'm a newcomer... and I'm supposed to lead?\n- My own development methods collaborating with AI`,
  \},
\},
\{
  id: "who",
  title: \{ kr: "누가 발표할 수 있나요?", en: "Who can present?" \},
  content: \{
    kr: `프론트엔드 개발과 관련된 경험을 공유하고 싶은 모든 분들입니다.\n\n- 공부하면서 얻은 통찰을 나누고 싶은 대학생\n- 취업 준비 과정에서 배운 점을 나누고 싶은 분\n- 다양한 도전과 성장을 경험한 주니어 개발자\n- 본인의 프론트엔드 개발 경험을 나누고 싶은 모든 분`,
    en: `Anyone who wants to share experiences related to frontend development.\n\n- College students who want to share insights gained while studying\n- Those who want to share what they learned during job preparation\n- Junior developers who have experienced various challenges and growth\n- Anyone who wants to share their frontend development experience`,
  \},
\},
\{
  id: "first",
  title: \{ kr: "발표가 처음인데 괜찮을까요?", en: "Is it okay if this is my first presentation?" \},
  content: \{
    kr: `걱정 마세요! 핵심 메시지 정리와 발표 연습을 위한 사전 워크숍이 진행됩니다.\n다른 발표자들과 피드백을 나누며 더욱 자신감 있게 준비할 수 있습니다.\n\n프론트엔드 개발 과정에서 마주한 도전, 해결방법, 특별한 기술이나 노하우, 팁 등 여러분의 경험을 FEConf와 공유해 주세요.\n\n만약 궁금한 점이 있다면 언제든지 feconf@googlegroups.com로 문의 부탁드립니다.`,
    en: `Don't worry! A pre-workshop will be held to organize key messages and practice presentations.\nYou can prepare with more confidence by sharing feedback with other presenters.\n\nPlease share your experiences with FEConf, such as challenges faced during frontend development, solutions, special techniques or know-how, tips, etc.\n\nIf you have any questions, please feel free to contact us at feconf@googlegroups.com.`,
  \},
\},
]

return (
<div
  className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
  style=\{\{ maxWidth: "83%", margin: "0 auto", ...fontStyle \}\}
>
  <div className="flex flex-col h-full">
    <div
      className="rounded-xl overflow-hidden border flex flex-col h-full relative"
      style=\{\{ backgroundColor: `transparent`, borderColor: `$\{gradientStart\}30`, boxShadow: `0 0 20px $\{gradientStart\}20` \}\}
    >
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <WaveAnimation color=\{gradientStart\} />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
        <h2
          className="text-xl md:text-2xl font-extrabold overflow-visible whitespace-normal text-white"
          style=\{\{ marginBottom: "0.75rem", lineHeight: "1.4", maxWidth: "100%", fontWeight: "700" \}\}
        >
          \{language === "kr" ? (
            <>단 10분,<br />짧지만 강렬하게<br />모두와 소통하세요</>
          ) : (
            "Just 10 minutes, communicate with everyone briefly but intensely"
          )\}
        </h2>
        <div className="text-white/70 text-xs mb-6 mt-2">
          \{t("제안서 마감: 2025년 5월 16일 23:59:59<br />선정 결과: 6월 중 개별 통보", "Deadline: May 16, 2025, 23:59:59<br />Results will be announced individually in June")\}
        </div>
        <div className="mt-4">
          <Button
            className="group relative overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-center rounded-[200px]"
            style=\{buttonStyle\}
            onMouseEnter=\{(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)\}
            onMouseLeave=\{(e) => Object.assign(e.currentTarget.style, buttonStyle)\}
          >
            <span className="relative z-10 whitespace-normal text-center px-1">\{t("신청하기", "Apply")\}</span>
          </Button>
        </div>
      </div>
    </div>
  </div>
  <div className="flex flex-col space-y-4 w-full">
    \{accordionItems.map((item) => (
      <div key=\{item.id\} className="rounded-xl overflow-hidden border" style=\{getSectionStyle(item.id)\}>
        <button
          className="w-full px-4 py-4 flex justify-between items-center text-left"
          onClick=\{() => toggleSection(item.id)\}
        >
          <span className="text-white font-medium w-full">\{t(item.title.kr, item.title.en)\}</span>
          <span className="text-white flex-shrink-0">\{expandedSection === item.id ? "−" : "+"\}</span>
        </button>
        \{expandedSection === item.id && (
          <div className="px-6 pb-6" style=\{\{ maxHeight: "300px", overflowY: "auto" \}\}>
            <div className="text-white/80 text-sm whitespace-pre-line">\{t(item.content.kr, item.content.en)\}</div>
          </div>
        )\}
      </div>
    ))\}
  </div>
</div>
)
\}

export function NetworkingContent(\{ gradientStart \}: \{ gradientStart: string \}) \{
const \{ t, language \} = useLanguage()

const gradientBgStyle = \{
backgroundColor: `$\{gradientStart\}10`,
border: `1px solid $\{gradientStart\}30`,
\}

return (
<div
  className="w-full flex flex-col justify-center py-2"
  style=\{\{ maxWidth: "83%", margin: "0 auto", ...fontStyle \}\}
>
  <div className="w-full">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
      \{/* 좌측 - 메인 콘텐츠 */\}
      <div className="flex flex-col justify-center md:col-span-3">
        <div className="flex items-center gap-4 mb-4">
          <span className="text-2xl md:text-3xl font-bold text-white" style=\{\{ fontWeight: "700" \}\}>
            FEConf
          </span>
          <span className="text-xl md:text-2xl font-bold text-white/80">x</span>
          <img src="/images/karrot-logo.png" alt="Karrot Logo" className="h-8 md:h-10" />
        </div>

        <h2
          className="text-2xl md:text-3xl font-extrabold text-white mb-6"
          style=\{\{ lineHeight: "1.4", fontWeight: "700" \}\}
        >
          \{t("네트워킹에서 새로운 인연을 만나세요", "Meet new connections at Networking")\}
        </h2>

        <p className="text-white/80 text-base mb-8">
          \{t(
            "이번에 당근과 함께하는 네트워킹 활동은 FEConf 세션 연사자 및 참여자들과 여러 주제로 대화를 나누어 볼 수 있는 활동이에요. 컨퍼런스에 참여한 누구나 네트워킹 모임에 참여할 수 있어요!",
            "This networking event, in collaboration with Karrot, is an opportunity to talk about various topics with FEConf speakers and attendees. Anyone at the conference can join the networking session!",
          )\}
        </p>

        <Button
          className="group relative overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-center rounded-[200px] w-fit"
          style=\{buttonStyle\}
          onMouseEnter=\{(e) => Object.assign(e.currentTarget.style, buttonHoverStyle)\}
          onMouseLeave=\{(e) => Object.assign(e.currentTarget.style, buttonStyle)\}
        >
          <span className="relative z-10 whitespace-normal text-center px-1">
            \{t("네트워킹 참여하기", "Join Networking")\}
          </span>
        </Button>
      </div>

      \{/* 우측 - 장식용 패널 */\}
      <div className="hidden md:flex flex-col items-center justify-center md:col-span-2 h-full">
        <div
          className="w-full h-full rounded-xl p-6 flex items-center justify-center"
          style=\{\{ ...gradientBgStyle, minHeight: "250px" \}\}
        >
          <div className="relative w-40 h-40">
            <motion.div
              className="absolute inset-0 rounded-full border-2"
              style=\{\{ borderColor: `$\{gradientStart\}40` \}\}
              animate=\{\{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] \}\}
              transition=\{\{ duration: 3, repeat: Infinity, ease: "easeInOut" \}\}
            />
            <motion.div
              className="absolute inset-4 rounded-full border-2"
              style=\{\{ borderColor: `$\{gradientStart\}60` \}\}
              animate=\{\{ scale: [1.1, 1, 1.1], opacity: [1, 0.5, 1] \}\}
              transition=\{\{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 \}\}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Users size=\{48\} className="text-white/80" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
)
\}

export function DefaultContent(\{
section,
showDetails,
gradientStart,
\}: \{
section: Section
showDetails: boolean
gradientStart: string
\}) \{
const \{ t \} = useLanguage()
return (
<div>
  <h2 className="text-white text-2xl">\{t("콘텐츠 준비 중", "Content Coming Soon")\}</h2>
  <p className="text-white/80 mt-2">
    \{t("이 섹션의 내용은 현재 준비 중에 있습니다. 곧 업데이트될 예정입니다!", "The content for this section is currently being prepared. It will be updated soon!")\}
  </p>
</div>
)
\}
