"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useLanguage } from "../language-provider"
import type { Theme } from "@/lib/themes"

interface FeconfCardProps {
  theme: Theme
}

export default function FeconfCard({ theme }: FeconfCardProps) {
  const { t, language } = useLanguage()
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const stats = [
    {
      label: t("누적 참가자", "Total Participants"),
      value: "3,200",
      suffix: t("명", ""),
    },
    {
      label: t("YouTube 구독자", "YouTube Subscribers"),
      value: "11,000",
      suffix: t("명", ""),
    },
    {
      label: t("YouTube 조회수", "YouTube Views"),
      value: "100,000",
      suffix: t("회", ""),
    },
  ]

  useEffect(() => {
    const feconfDate = new Date("2025-08-23T09:00:00+09:00")

    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = feconfDate.getTime() - now.getTime()

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(timer)
  }, [])

  const buttonStyle = {
    background: `#FFFFFF`,
    color: "#0A2463",
    fontWeight: "700",
    boxShadow: `0 0 15px rgba(255,255,255,0.5)`,
  }

  return (
    <motion.div
      className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[60vh]"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      {/* Main Content Container */}
      <div className="w-full flex flex-col items-center justify-center gap-12 text-center">
        {/* FECONF Logo Section */}
        <div className="flex-shrink-0">
          <motion.div className="flex items-center justify-center">
            <div className="text-white w-84 h-18 sm:w-96 sm:h-21 md:w-108 md:h-24 lg:w-120 lg:h-27 xl:w-120 xl:h-27">
              <svg className="w-full h-full" viewBox="0 0 388 83" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 80.492H4.54256V43.782H39.2505V39.2495H4.54256V6.88797H39.2505V2.34863H0V80.492Z"
                  fill="currentColor"
                />
                <path
                  d="M53.5322 80.5874H92.7827V76.0549H58.0748V43.6934H92.7827V39.154H58.0748V6.79253H92.7827V2.26001H53.5322V80.5874Z"
                  fill="currentColor"
                />
                <path
                  d="M329.807 71.6991L277.694 2.36863H274.34V80.5869H278.89V11.5155L330.805 80.5869H334.357V2.36182H329.807V71.6991Z"
                  fill="currentColor"
                />
                <path
                  d="M387.893 6.94241V2.40308H348.642V80.5464H353.185V43.8364H387.893V39.2971H353.185V6.94241H387.893Z"
                  fill="currentColor"
                />
                <path
                  d="M177.892 63.1147C171.219 72.1048 160.508 77.9255 148.451 77.9255C128.211 77.9255 111.742 61.4857 111.742 41.2973C111.742 21.1088 128.218 4.65547 148.451 4.65547C160.494 4.65547 171.205 10.4762 177.899 19.4458L180.488 15.1927C172.892 5.93003 161.355 0.00708008 148.451 0.00708008C125.629 0.00708008 107.069 18.5257 107.069 41.2973C107.069 64.0689 125.629 82.5875 148.451 82.5875C161.355 82.5875 172.906 76.6578 180.488 67.3814C180.071 66.7816 179.675 66.175 179.3 65.5616C178.808 64.7846 178.33 63.9599 177.885 63.1079L177.892 63.1147Z"
                  fill="url(#paint0_linear_2788_1868)"
                />
                <path
                  d="M218.89 0C205.085 0 192.857 6.76811 185.33 17.1554C184.756 17.9597 184.189 18.7844 183.677 19.6296V19.6432C182.707 21.1972 181.832 22.8262 181.074 24.5097C180.569 25.6479 180.118 26.8066 179.708 27.9857C178.28 32.157 177.501 36.6418 177.501 41.2902C177.501 45.9386 178.28 50.4234 179.708 54.5947C180.118 55.7806 180.569 56.9257 181.074 58.0639C181.825 59.7474 182.693 61.3764 183.663 62.9304C184.175 63.7824 184.729 64.6071 185.316 65.4046C192.83 75.8055 205.085 82.5804 218.89 82.5804C241.705 82.5804 260.272 64.0482 260.272 41.2902C260.272 18.5322 241.698 0 218.89 0ZM218.89 77.9252C205.877 77.9252 194.422 71.1367 187.905 60.9266C187.317 59.9928 186.764 59.0386 186.252 58.0571C185.617 56.8371 185.056 55.583 184.571 54.3016C184.223 53.4019 183.923 52.509 183.663 51.5889C182.693 48.3241 182.181 44.8685 182.181 41.297C182.181 37.7255 182.672 34.4608 183.581 31.2778C183.834 30.3576 184.134 29.458 184.469 28.5651C184.981 27.1815 185.582 25.8251 186.252 24.5233C186.764 23.5418 187.317 22.5876 187.905 21.6538C194.422 11.4438 205.877 4.6552 218.89 4.6552C239.13 4.6552 255.599 21.095 255.599 41.297C255.599 61.4991 239.123 77.9252 218.89 77.9252Z"
                  fill="currentColor"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2788_1868"
                    x1="158.968"
                    y1="41.2973"
                    x2="178.5"
                    y2="41.2973"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="currentColor" />
                    <stop offset="1" stopColor="currentColor" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col items-center gap-6">
          {/* Description Text */}
          <h2
            className="text-base text-white text-center leading-relaxed md:text-xl leading-8 my-2.5 font-thin tracking-normal"
            style={{
              fontFamily: "var(--font-42dot)",
              fontWeight: "400",
            }}
          >
            {language === "kr" ? (
              <>
                프론트엔드 개발 중 경험한 모든 순간들을 존중합니다.
                <br />
                마주했던 치열한 고민과 깊은 인사이트를 함께 공유하며,
                <br />
                FEconf는 여러분과 함께 성장합니다
              </>
            ) : (
              <>
                We respect all moments experienced during frontend development.
                <br />
                By sharing the intense concerns and deep insights we've encountered together,
                <br />
                FEConf grows with you
              </>
            )}
          </h2>

          {/* Divider */}

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {stats.map((stat, index) => (
              <div key={index} className="flex flex-col justify-center rounded-lg backdrop-blur-md items-center">
                <div className="flex items-baseline justify-center">
                  {stat.prefix && <span className="text-white/80 text-sm mr-1">{stat.prefix}</span>}
                  <div
                    className="text-2xl md:text-3xl font-extrabold text-white"
                    style={{ fontFamily: "Jost, sans-serif", fontWeight: "700" }}
                  >
                    {stat.value}
                  </div>
                  <span className="text-white/80 text-sm ml-1">{stat.suffix}</span>
                </div>
                <div className="text-xs font-bold text-white/60 mt-2" style={{ fontWeight: "700" }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}
