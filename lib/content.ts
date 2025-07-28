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
      kr: "FEConf",
      en: "FEConf",
    },
    description: {
      kr: "FEconf에서 여러분이 /경험할 수 있는 것은?",
      en: "What you can /experience at FEConf?",
    },
    button: {
      kr: "이전 영상 보러가기",
      en: "Watch Previous Videos",
    },
  },
  {
    id: "program",
    title: {
      kr: "프로그램 소개",
      en: "Program Introduction",
    },
    description: {
      kr: "FEConf를 빛낼 /스피커와 프로그램",
      en: "Speakers and Programs /that will shine at FEConf",
    },
    button: {
      kr: "전체 프로그램 보기",
      en: "View Full Program",
    },
  },
  {
    id: "panel",
    title: {
      kr: "리더쉽 토크",
      en: "Leadership Talk",
    },
    description: {
      kr: "FEConf 현장에서 함께하는 /한국 대표 프론트엔드 리더들과의 대담",
      en: "Dialogue with Korea's leading /frontend leaders at FEConf",
    },
    button: {
      kr: "리더쉽 토크 참여하기",
      en: "Join Leadership Talk",
    },
  },
  {
    id: "networking",
    title: {
      kr: "네트워킹 세션",
      en: "Networking Session",
    },
    description: {
      kr: "FEconf에서 모두와 함께/어울리고 소통하세요",
      en: "Connect and communicate /with everyone at FEConf",
    },
    button: {
      kr: "네트워킹 참여하기",
      en: "Join Networking",
    },
  },
  {
    id: "ticket",
    title: {
      kr: "티켓 안내",
      en: "Ticket Information",
    },
    description: {
      kr: "FEConf 2025 /티켓을 지금 구매하세요",
      en: "Purchase your /FEConf 2025 tickets now",
    },
    button: {
      kr: "티켓 구매하기",
      en: "Buy Tickets",
    },
  },
  {
    id: "sponsor",
    title: {
      kr: "후원사 소개",
      en: "Sponsor Introduction",
    },
    description: {
      kr: "FEconf를 함께하는 /한국 대표 FE 기업들",
      en: "Korea's leading FE companies /supporting FEConf",
    },
  },
  {
    id: "conduct",
    title: {
      kr: "행동 규범",
      en: "Code of Conduct",
    },
    description: {
      kr: "FEConf에 참여하는 분들은 /다음 사항을 준수해주세요",
      en: "Participants in FEConf /must comply with the following",
    },
    button: {
      kr: "행동 규범 보기",
      en: "View Code of Conduct",
    },
  },
]
