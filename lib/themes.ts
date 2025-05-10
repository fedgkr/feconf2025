// Define the theme interface with colors for different elements
export interface Theme {
  id: string
  name: string
  displayColor: string // Main color shown in the theme selector
  planetColor: string
  glowColor: string
  orbitColor: string
  starColor: string
  accentColor: string
  uiColor: string
  description?: string
  gradientCenter?: string // 중앙 그라디언트 색상
  gradientOuter?: string // 바깥쪽 그라디언트 색상
}

// Create a collection of predefined themes
export const themes: Theme[] = [
  {
    id: "cosmic-blue",
    name: "Cosmic Blue",
    displayColor: "#29B6F6",
    planetColor: "#29B6F6", // 원래 색상 유지
    glowColor: "#4FC3F7", // 원래 색상 유지
    orbitColor: "#BBDEFB",
    starColor: "#E3F2FD",
    accentColor: "#0288D1",
    uiColor: "#29B6F6",
    description: "A serene blue theme inspired by Earth viewed from space",
    gradientCenter: "#2867F9",
    gradientOuter: "#0AB5FF",
  },
  {
    id: "ruby",
    name: "Scarlet", // Ruby → Flamingo → Scarlet로 변경
    displayColor: "#F44336",
    planetColor: "#FF6750", // 유지
    glowColor: "#DF2D2A", // 유지
    orbitColor: "#FFCDD2",
    starColor: "#FFEBEE",
    accentColor: "#D32F2F",
    uiColor: "#F44336",
    description: "A bold red theme like the surface of Mars",
    gradientCenter: "#AF0707",
    gradientOuter: "#DF2D2A",
  },
  {
    id: "rose",
    name: "Flamingo", // Rose → Flamingo로 변경
    displayColor: "#E91E63",
    planetColor: "#FF459F", // 더 핑크빛으로 수정
    glowColor: "#FF83C9", // 유지
    orbitColor: "#F8BBD0",
    starColor: "#FCE4EC",
    accentColor: "#C2185B",
    uiColor: "#E91E63",
    description: "Vibrant pink hues like exotic cosmic dust",
    gradientCenter: "#FF2A7F", // 더 핑크빛으로 수정
    gradientOuter: "#FF83C9", // 유지
  },
  {
    id: "sunset",
    name: "Sunset",
    displayColor: "#FF9800",
    planetColor: "#FF7621", // 유지
    glowColor: "#FFCD43", // 유지
    orbitColor: "#FFE0B2",
    starColor: "#FFF3E0",
    accentColor: "#F57C00",
    uiColor: "#FF9800",
    description: "Warm orange hues like a distant sun setting on the horizon",
    gradientCenter: "#FF7621",
    gradientOuter: "#FFCD43",
  },
  {
    id: "golden",
    name: "Dandelion", // Golden → Dandelion 유지
    displayColor: "#FFC107",
    planetColor: "#FFC61C", // 유지
    glowColor: "#CCFF4B", // 유지
    orbitColor: "#FFECB3",
    starColor: "#FFF8E1",
    accentColor: "#FFA000",
    uiColor: "#FFC107",
    description: "Brilliant gold reminiscent of distant stars",
    gradientCenter: "#FFC61C",
    gradientOuter: "#CCFF4B",
  },
  {
    id: "emerald",
    name: "Emerald",
    displayColor: "#4CAF50",
    planetColor: "#13DDB8", // 유지
    glowColor: "#80FF40", // 유지
    orbitColor: "#C8E6C9",
    starColor: "#E8F5E9",
    accentColor: "#388E3C",
    uiColor: "#4CAF50",
    description: "A lush green theme reminiscent of verdant alien worlds",
    gradientCenter: "#13DDB8",
    gradientOuter: "#80FF40",
  },
  {
    id: "aqua",
    name: "Midnight", // Aqua → Midnight 유지
    displayColor: "#00BCD4",
    planetColor: "#941FF4", // 유지
    glowColor: "#1A57FF", // 유지
    orbitColor: "#B2EBF2",
    starColor: "#E0F7FA",
    accentColor: "#0097A7",
    uiColor: "#00BCD4",
    description: "Cool cyan tones like the oceans of an alien world",
    gradientCenter: "#1A57FF",
    gradientOuter: "#7709D2",
  },
  {
    id: "amethyst",
    name: "Violet", // Amethyst → Violet 유지
    displayColor: "#9C27B0",
    planetColor: "#D428FF", // 안쪽 색상 수정 - 더 강하게
    glowColor: "#F066FF", // 더 강한 발광 효과를 위해 수정
    orbitColor: "#E1BEE7",
    starColor: "#F3E5F5",
    accentColor: "#7B1FA2",
    uiColor: "#9C27B0",
    description: "Deep purple tones inspired by cosmic nebulae",
    gradientCenter: "#D428FF", // 안쪽 색상과 일치
    gradientOuter: "#F066FF", // 발광 색상과 일치
  },
  {
    id: "monochrome",
    name: "Frost", // Monochrome → Frost로 변경
    displayColor: "#FFFFFF",
    planetColor: "#FFFFFF",
    glowColor: "#EEEEEE",
    orbitColor: "#CCCCCC",
    starColor: "#FFFFFF",
    accentColor: "#AAAAAA",
    uiColor: "#FFFFFF",
    description: "Clean white and gray tones for a minimalist experience",
  },
]

// Function to generate a random theme
export function generateRandomTheme(): Theme {
  // Generate a base hue (0-360)
  const baseHue = Math.floor(Math.random() * 360)

  // Create complementary and analogous hues
  const complementaryHue = (baseHue + 180) % 360
  const analogousHue1 = (baseHue + 30) % 360
  const analogousHue2 = (baseHue + 60) % 360

  // Convert HSL to hex
  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100
    const a = (s * Math.min(l, 1 - l)) / 100
    const f = (n: number) => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color)
        .toString(16)
        .padStart(2, "0")
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  // Generate colors with different saturations and lightnesses
  const planetColor = hslToHex(baseHue, 70, 60)
  const glowColor = hslToHex(baseHue, 60, 70)
  const orbitColor = hslToHex(analogousHue1, 50, 80)
  const starColor = hslToHex(analogousHue2, 30, 90)
  const accentColor = hslToHex(baseHue, 80, 50)
  const uiColor = planetColor

  return {
    id: `random-${Date.now()}`,
    name: "Random Theme",
    displayColor: planetColor,
    planetColor,
    glowColor,
    orbitColor,
    starColor,
    accentColor,
    uiColor,
    description: "A randomly generated color theme",
  }
}
