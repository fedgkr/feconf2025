"use client"

import { useState } from "react"
import { useLanguage } from "../language-provider"
import type { Theme } from "@/lib/themes"

interface LightningSectionProps {
  theme: Theme
}

export default function LightningSection({ theme }: LightningSectionProps) {
  const { t, language } = useLanguage()
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  const buttonStyle = {
    background: `#FFFFFF`,
    color: "#0A2463",
    fontWeight: "700",
    fontSize: "1.1rem",
    boxShadow: `0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.1)`,
    minWidth: "200px",
    height: "46.2px",
    padding: "0 1.5rem",
  }

  const buttonHoverStyle = {
    background: `#FFFFFF`,
    boxShadow: `0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3), 0 0 60px rgba(255,255,255,0.1)`,
  }

  return (
    <section id="lightning" className="pt-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{t("hallC")}</h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">{t("lightningDescription")}</p>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            <div className="rounded-lg shadow-lg bg-gray-900/75 backdrop-blur-sm backdrop-filter">
              <dt className="text-lg font-medium leading-6 text-white p-5">
                <button
                  style={buttonStyle}
                  className="w-full rounded-md"
                  onClick={() => toggleSection("panelTalk")}
                  onMouseOver={(e) => {
                    Object.assign(e.target.style, buttonHoverStyle)
                  }}
                  onMouseOut={(e) => {
                    Object.assign(e.target.style, buttonStyle)
                  }}
                >
                  12:10 ~ 14:10
                </button>
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-300 px-5 pb-5">
                {expandedSection === "panelTalk" ? <>{t("panelTalkDescription")}</> : t("panelTalkTitle")}
              </dd>
            </div>

            <div className="rounded-lg shadow-lg bg-gray-900/75 backdrop-blur-sm backdrop-filter">
              <dt className="text-lg font-medium leading-6 text-white p-5">
                <button
                  style={buttonStyle}
                  className="w-full rounded-md"
                  onClick={() => toggleSection("lightningTalk1")}
                  onMouseOver={(e) => {
                    Object.assign(e.target.style, buttonHoverStyle)
                  }}
                  onMouseOut={(e) => {
                    Object.assign(e.target.style, buttonStyle)
                  }}
                >
                  14:30 ~ 15:50
                </button>
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-300 px-5 pb-5">
                {expandedSection === "lightningTalk1" ? (
                  <>{t("lightningTalk1Description")}</>
                ) : (
                  t("lightningTalk1Title")
                )}
              </dd>
            </div>

            <div className="rounded-lg shadow-lg bg-gray-900/75 backdrop-blur-sm backdrop-filter">
              <dt className="text-lg font-medium leading-6 text-white p-5">
                <button
                  style={buttonStyle}
                  className="w-full rounded-md"
                  onClick={() => toggleSection("lightningTalk2")}
                  onMouseOver={(e) => {
                    Object.assign(e.target.style, buttonHoverStyle)
                  }}
                  onMouseOut={(e) => {
                    Object.assign(e.target.style, buttonStyle)
                  }}
                >
                  16:00 - 17:20
                </button>
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-300 px-5 pb-5">
                {expandedSection === "lightningTalk2" ? (
                  <>{t("lightningTalk2Description")}</>
                ) : (
                  t("lightningTalk2Title")
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  )
}
