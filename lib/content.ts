export interface Section {
  id: string
  title: {
    kr: string
    en: string
  }
  description: {
    kr: string
    en: string
  }
  button?: {
    kr: string
    en: string
  }
}

export const sections: Section[] = [
  {
    id: "hero",
    title: {
      kr: "FEconf",
      en: "FEconf",
    },
    description: {
      kr: "한국 최대 프론트엔드 개발 컨퍼런스, FEconf에 오신 것을 환영합니다. 최신 기술과 트렌드를 경험하세요.",
      en: "Welcome to Korea's largest frontend development conference, FEconf. Experience the latest technologies and trends.",
    },
    button: {
      kr: "이전 영상 보러가기",
      en: "Watch Previous Videos",
    },
  },
  {
    id: "speaker",
    title: {
      kr: "스피커 모집",
      en: "Speaker",
    },
    description: {
      kr: "FECONF 스피커가 되어 한국 FE 문화를 선도해보세요",
      en: "Become a FECONF Speaker and lead the Korean FE culture",
    },
    button: {
      kr: "스피커 신청하기",
      en: "Become a speaker",
    },
  },
  {
    id: "lightning",
    title: {
      kr: "라이트닝톡 모집",
      en: "Lightning Talk",
    },
    description: {
      kr: "FECONF 내에서 가장 열정적으로 당신의 스토리를 공유하세요",
      en: "The most passionate within FECONF share your story",
    },
    button: {
      kr: "라이트닝톡 신청하기",
      en: "Sign up for LightningTalk",
    },
  },
  {
    id: "sponsor",
    title: {
      kr: "후원사 모집",
      en: "Sponsor",
    },
    description: {
      kr: "한국 최대 FE 컨퍼런스에서 기업 홍보, 인재 채용을 한번에",
      en: "At Korea's largest FE conference, promote your company and recruit talent at the same time",
    },
    button: {
      kr: "후원사 신청하기",
      en: "Sign up as a sponsor",
    },
  },
]
