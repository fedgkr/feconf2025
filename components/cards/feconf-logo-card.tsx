"use client"

import { useLanguage } from "../language-provider"
import type { Theme } from "@/lib/themes"

interface FeconfLogoCardProps {
  theme: Theme
}

export default function FeconfLogoCard({ theme }: FeconfLogoCardProps) {
  const { t } = useLanguage()

  const cardStyle = {
    background: `linear-gradient(135deg, ${theme.uiColor}15 0%, ${theme.uiColor}08 100%), rgba(0, 0, 0, 0.6)`,
    border: `1px solid ${theme.uiColor}40`,
    boxShadow: `0 8px 32px ${theme.uiColor}25`,
    backdropFilter: "blur(15px)",
  }

  return null
}
