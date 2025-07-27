"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus } from "lucide-react"
import { useLanguage } from "../language-provider"
import type { Theme } from "@/lib/themes"

interface ProgramSectionProps {
  theme: Theme
}

// 세션 데이터 타입 정의
interface Session {
  id: string
  time: string
  title: {
    kr: string
    en: string
  }
  speaker?: {
    kr: string
    en: string
  }
  company?: {
    kr: string
    en: string
  }
  content?: {
    kr: string
    en: string
  }
}

// 세션 A 데이터 (좌측 스피커)
const sessionA: Session[] = [
  {
    id: "a1",
    time: "12:00 – 12:30",
    title: {
      kr: "60 FPS in React Native",
      en: "60 FPS in React Native",
    },
    speaker: {
      kr: "문대현",
      en: "Daehyun Moon",
    },
    company: {
      kr: "Callie",
      en: "Callie",
    },
    content: {
      kr: 'React Native에서 60 FPS 성능을 끌어내는 노하우를 공유합니다. React Native 만의 특수성을 이해하고, UI 성능 진단 방법과 최적화 핵심 포인트를 소개합니다. 끝으로 개인 프로젝트인 React Native 기반 2D 게임 "NeonCity:CityRunner" 에 적용한 최적화 사례를 코드 레벨에서 살펴보며 인사이트를 나눕니다.',
      en: 'Sharing know-how to achieve 60 FPS performance in React Native. Understanding React Native\'s unique characteristics, introducing UI performance diagnosis methods and optimization key points. Finally, examining optimization cases applied to the personal project React Native-based 2D game "NeonCity:CityRunner" at the code level and sharing insights.',
    },
  },
  {
    id: "a2",
    time: "12:50 – 13:20",
    title: {
      kr: "플러그인 시스템 기반의 유연한 React Native CodePush 대안",
      en: "Flexible React Native CodePush Alternative Based on Plugin System",
    },
    speaker: {
      kr: "강선규",
      en: "Seonkyu Kang",
    },
    company: {
      kr: "Toss RN Framework팀",
      en: "Toss RN Framework Team",
    },
    content: {
      kr: "App Center 종료 이후, React Native에서 벤더 종속 없이 OTA 업데이트를 적용할 수 있는 방법에 대해 이야기합니다. 기존 CodePush 방식의 한계를 극복하고, 플러그인 기반 아키텍처로 구성된 오픈소스 프로젝트 **hot-updater**를 소개드릴게요. 다양한 인프라—AWS, Supabase, Cloudflare, Firebase 등—와 유연하게 연동되는 구조와, 단일 명령어로 셀프 호스팅 가능한 업데이트 파이프라인을 어떻게 만들었는지 공유드리겠습니다.",
      en: "After App Center's discontinuation, discussing how to apply OTA updates in React Native without vendor lock-in. Overcoming the limitations of existing CodePush methods and introducing the open-source project **hot-updater** built with plugin-based architecture. Sharing how we created a structure that flexibly integrates with various infrastructures—AWS, Supabase, Cloudflare, Firebase, etc.—and an update pipeline that enables self-hosting with a single command.",
    },
  },
  {
    id: "a3",
    time: "13:40 – 14:10",
    title: {
      kr: "Swift·Kotlin 한줄 없이 사용하는 Expo 전용 OTA 업데이트 시스템 (feat. Next.js)",
      en: "Expo-specific OTA Update System without Swift/Kotlin (feat. Next.js)",
    },
    speaker: {
      kr: "김도윤",
      en: "Doyoon Kim",
    },
    company: {
      kr: "온아웃",
      en: "OnOut",
    },
    content: {
      kr: "Expo를 사용하면 React Native로 간단하게 앱을 만들 수 있습니다. 하지만 Expo에서 제공하는 OTA(eas update)는 비용이 비싸고, 대부분의 서드파티 솔루션은 Swift나 Kotlin으로의 네이티브 코드 수정 또는 복잡한 설정을 요구합니다. 이를 해결하기 위해 네이티브 코드 작성 없이, 프론트엔드 개발자에게 친화적인 방식으로 Expo 프로젝트에서 OTA를 구현하는 방법을 소개합니다.",
      en: "Using Expo makes it easy to create apps with React Native. However, Expo's OTA (eas update) is expensive, and most third-party solutions require native code modifications in Swift or Kotlin or complex configurations. To solve this, we introduce how to implement OTA in Expo projects in a frontend developer-friendly way without writing native code.",
    },
  },
  {
    id: "a4",
    time: "14:30 – 15:00",
    title: {
      kr: "완전한 ZERO COST CSS-IN-JS, Devup-UI",
      en: "Complete ZERO COST CSS-IN-JS, Devup-UI",
    },
    speaker: {
      kr: "오정민",
      en: "Jeongmin Oh",
    },
    company: {
      kr: "㈜데브파이브",
      en: "DevFive Inc.",
    },
    content: {
      kr: "정말 티끌 하나도 코스트가 없는 CSS IN JS 라이브러리 Devup-UI! 그러면서 반응형, 선택자, 테마까지 많은 기능을 제공하는 Devup-UI는 어떻게 이런 성능과 기능들을 모두 제공할 수 있을까? Nextjs 의 서버컴포넌트 도입으로 하락세를 겪고 있는 CSS IN JS 라이브러리에 대한 완벽한 대안기능 구현에 대한 아이디어부터 Rust 와 웹 어셈블리를 통하여 개발하게 된 개발기 그리고 실제 작동까지 어떤 라이브러리 보다 효율적이고 성능 이슈가 전혀 없는 완벽한 해결법을 향한 여정을 공유드립니다.",
      en: "Devup-UI, a truly zero-cost CSS-in-JS library! How can Devup-UI provide all these performance benefits and features while offering responsive design, selectors, themes, and many other functionalities? From the idea of implementing a perfect alternative to CSS-in-JS libraries that are experiencing a decline due to the introduction of Next.js server components, to the development story through Rust and WebAssembly, and actual operation - sharing the journey toward a perfect solution that is more efficient than any library and has no performance issues at all.",
    },
  },
  {
    id: "a5",
    time: "15:20 – 16:20",
    title: {
      kr: "후원사 프로그램 - 개발자를 위한 모션 그래픽 솔루션: Lottie의 기술 진화와 활용 전략",
      en: "Sponsor Program - Motion Graphics Solutions for Developers: Lottie's Technology Evolution and Utilization Strategies",
    },
    speaker: {
      kr: "LottieFiles",
      en: "LottieFiles",
    },
    company: {
      kr: "",
      en: "",
    },
    content: {
      kr: "LottieFiles에서 진행하는 후원 프로그램입니다.",
      en: "Sponsor program presented by LottieFiles.",
    },
  },
  {
    id: "a6",
    time: "16:30 – 17:00",
    title: {
      kr: "프론트엔드에서 1,000만 개 데이터를 실시간으로 처리하라고요? WebGL2를 활용한 GPGPU의 세계로",
      en: '"Processing 10 Million Data in Real-time on Frontend?" WebGL2 GPGPU Pipeline',
    },
    speaker: {
      kr: "김한슬마로",
      en: "Hanseulmaro Kim",
    },
    company: {
      kr: "Portrai Inc.",
      en: "Portrai Inc.",
    },
    content: {
      kr: "AI 기술의 확산으로 산업 전반에서 데이터의 규모와 중요성이 급격히 커지고 있습니다. 이에 따라 백엔드뿐만 아니라 프론트엔드에서도, 브라우저 상에서 대규모 데이터를 실시간으로 분석하고 시각화하려는 요구가 빠르게 증가하고 있습니다. 이번 세션에서는 이러한 흐름에 맞춰, GPU 가속을 활용해 브라우저 내에서 데이터를 효과적으로 처리하는 기술을 소개합니다.",
      en: "With the spread of AI technology, the scale and importance of data across industries are rapidly growing. Accordingly, there is a rapidly increasing demand for real-time analysis and visualization of large-scale data in browsers, not only on the backend but also on the frontend. In this session, in line with this trend, we introduce technology for effectively processing data within browsers using GPU acceleration.",
    },
  },
  {
    id: "a7",
    time: "17:10 – 17:40",
    title: {
      kr: "모노레포 절망편, 14개 레포로 부활하기까지 걸린 1년",
      en: "Monorepo Despair → One Year to Revival with 14 Repositories",
    },
    speaker: {
      kr: "김종혁",
      en: "Jonghyeok Kim",
    },
    company: {
      kr: "플렉스팀",
      en: "Flex Team",
    },
    content: {
      kr: "4년에 가까운 시간동안 flex 웹 제품을 지탱해오던 모노레포는 제품과 팀의 규모가 꾸준히 커지며 여러 문제에 맞닥뜨렸습니다. 개발 속도는 느려지고 복잡한 의존관계로 인해 제품 안정성이 위협받았습니다. flex 웹 클라이언트 플랫폼 팀은 제품 개발과 릴리즈를 멈추지 않으면서, 1년간 하나의 레포지토리를 14개의 개별 레포지토리로 분리했습니다. 그 과정에서 안정적이고 빠른 마이그레이션 전략을 만들고, 팀과 제품 규모에 맞는 코드베이스 전략이 무엇인지 깊이 고민했습니다. 모노레포가 어떻게 절망이 되었는지, 그리고 팀이 그것을 극복하기 위해 어떤 기술적·조직적 판단을 내렸는지 공유합니다.",
      en: "The monorepo that had been supporting flex web products for nearly 4 years encountered various problems as the product and team scale steadily grew. Development speed slowed down and product stability was threatened by complex dependencies. The flex web client platform team separated one repository into 14 individual repositories over a year without stopping product development and releases. In the process, we created stable and fast migration strategies and deeply considered what codebase strategy fits the team and product scale. We share how the monorepo became a despair and what technical and organizational decisions the team made to overcome it.",
    },
  },
]

// 세션 B 데이터 (우측 스피커)
const sessionB: Session[] = [
  {
    id: "b1",
    time: "12:00 – 12:30",
    title: {
      kr: "스벨트를 사랑해주세요",
      en: "Please love Svelte",
    },
    speaker: {
      kr: "문대승",
      en: "Daeseung Moon",
    },
    company: {
      kr: "개인",
      en: "Individual",
    },
    content: {
      kr: "\"프론트엔드 vs 리액트엔드: 당신은 어떤 개발자인가요?\"\n\n리액트 생태계에만 갇혀있다면 당신은 '리액트엔드' 개발자일 수도 있습니다. 리액트식 성능 최적화, 끝없는 리렌더링 문제, 보일러플레이트 지옥에서 벗어나 시그널 패턴과 컴파일러 최적화로 무장한 스벨트의 세계를 경험해보세요. 진정한 프론트엔드 개발자로 진화하는 시간이 될 것입니다.",
      en: "\"Frontend vs Reactend: What kind of developer are you?\"\n\nIf you're trapped only in the React ecosystem, you might be a 'Reactend' developer. Escape from React-style performance optimization, endless re-rendering problems, and boilerplate hell to experience the world of Svelte armed with signal patterns and compiler optimization. It will be a time to evolve into a true frontend developer.",
    },
  },
  {
    id: "b2",
    time: "12:50 – 13:20",
    title: {
      kr: "'memo'를 지울 결심 : React Compiler가 제안하는 미래",
      en: "The Decision to Erase 'memo' - The Future Proposed by React Compiler",
    },
    speaker: {
      kr: "장용석",
      en: "Yongseok Jang",
    },
    company: {
      kr: "리멤버앤컴퍼니",
      en: "Remember and Company",
    },
    content: {
      kr: "Memoization을 위해 React 코드에서 흔히 사용되던 memo, useMemo와 이제는 헤어질 시간입니다. React Compiler가 어떻게 우리를 대신해 최적화를 수행하는지, 실제 React 코드가 어떻게 변화하는지 파이프라인을 따라 깊이 있게 살펴보고 앞으로 어떤 멘탈모델을 가지고 React 코드를 작성해야할지 이야기해봅니다.",
      en: "It's time to say goodbye to memo and useMemo that were commonly used in React code for memoization. We'll take a deep dive into how React Compiler performs optimization on our behalf, how actual React code changes through the pipeline, and discuss what mental model we should have when writing React code in the future.",
    },
  },
  {
    id: "b3",
    time: "13:40 – 14:10",
    title: {
      kr: "중요하지만 긴급하지 않은 일, 그럼에도 계획해야 하는 웹 접근성",
      en: "Important but Not Urgent, Web Accessibility That Still Needs to Be Planned",
    },
    speaker: {
      kr: "김무훈",
      en: "Muhun Kim",
    },
    company: {
      kr: "A11YKR 커뮤니티",
      en: "A11YKR Community",
    },
    content: {
      kr: "웹 서비스 개발에서 시멘틱 HTML과 웹 접근성 기술은 여전히 제도적으로 의무화된 항공사 웹 서비스 외에 모범 사례와 관심이 흔하지 않고, 확실한 정답이 정해져 있지 않은 분야입니다. 혹시 웹 접근성이 장애 사용자만을 위한 특수 경험이라고 오해하고 계신가요? 장애 여부와 관계없는 웹 접근성의 포괄적인 의의와 본질, 몇 가지 원칙을 소개합니다. 웹 접근성을 고려한 웹 서비스, UI 컴포넌트 설계에 막연함을 느끼시나요? 웹 표준과 접근성을 지키면서, 일관된 UI 제어 경험을 실제로 어떻게 계획하는지 알려드립니다.",
      en: "In web service development, semantic HTML and web accessibility technologies are still areas where best practices and interest are not common outside of institutionally mandated airline web services, and there are no definitive answers. Do you misunderstand web accessibility as a special experience only for users with disabilities? We introduce the comprehensive significance, essence, and several principles of web accessibility regardless of disability status. Do you feel vague about designing web services and UI components considering web accessibility? We'll show you how to actually plan consistent UI control experiences while maintaining web standards and accessibility.",
    },
  },
  {
    id: "b4",
    time: "14:30 – 15:00",
    title: {
      kr: "음성 인터페이스 개발에서 DX 향상하기: 모델 비교부터 직관적인 인터페이스 설계",
      en: "The Journey of Voice Interface Development - From Model Selection to Usability",
    },
    speaker: {
      kr: "김민수",
      en: "Minsu Kim",
    },
    company: {
      kr: "DevCra",
      en: "DevCra",
    },
    content: {
      kr: "음성 인식, 합성의 최근 기술 동향을 살펴보고 종합 핵심 키워드를 파악합니다. 음성 인터페이스를 만들기 위한 요구사항 분석 및 기술 검토부터 어떻게 구현할 수 있을지 고민해보고 Web API의 한계, 다양한 클라우드 서비스 모델 중 적합한 모델을 선택하기 위해 디자인 패턴을 활용했던 설계를 소개합니다. 그리고 좋은 사용자 경험을 제공하기 위해 에러 처리, 사용성을 고려한 엔지니어링, 유틸리티 등 경험을 공유합니다.",
      en: "We examine recent technology trends in speech recognition and synthesis and identify comprehensive key keywords. From requirements analysis and technical review for creating voice interfaces, we consider how to implement them and introduce designs that utilized design patterns to select suitable models among various cloud service models, overcoming Web API limitations. We also share experiences in error handling, usability-focused engineering, and utilities to provide good user experiences.",
    },
  },
  {
    id: "b5",
    time: "15:20 – 16:20",
    title: {
      kr: "후원사 프로그램 - 1년에 10억 원을 절약한, 강남언니의 SEO 웹 전략 공개",
      en: "Sponsor Program - Gangnam Unni's SEO Web Strategy That Saved 1 Billion Won in 1 Year",
    },
    speaker: {
      kr: "손준혁",
      en: "Junhyuk Son",
    },
    company: {
      kr: "힐링페이퍼(강남언니)",
      en: "Healing Paper (UNNI)",
    },
    content: {
      kr: "강남언니에서 프론트 엔지니어로 시작해 글로벌 웹을 전담하는 TPO가 되기까지. 그 전환점에 '성능 최적화'라는 개발 작업이 SEO 성과로, 그리고 유입 성장과 마케팅 비용 절감이라는 비즈니스 임팩트로 이어졌다는 명확한 연결이 있었습니다. 위 경험을 바탕으로 프론트 개발자로 비즈니스 임팩트를 내는 Technical SEO의 전략 모델을 공유합니다.",
      en: "From starting as a front-end engineer at Gangnam Unni to becoming a TPO in charge of global web. At that turning point, there was a clear connection where 'performance optimization' development work led to SEO results, and then to business impact of traffic growth and marketing cost reduction. Based on this experience, we share a strategic model of Technical SEO that creates business impact as a front-end developer.",
    },
  },
  {
    id: "b6",
    time: "16:30 – 17:00",
    title: {
      kr: "TanStack Query 너머를 향해! 쿼리를 라우트까지 전파시키기",
      en: "Beyond TanStack Query! Propagating Queries to Routes",
    },
    speaker: {
      kr: "임상원",
      en: "Sangwon Lim",
    },
    company: {
      kr: "라프텔",
      en: "Laftel",
    },
    content: {
      kr: "TanStack Query에서 SSR 지원을 위해 수동으로 prefetchQuery를 관리하는 건 까다롭습니다. RSC와 Suspense만으로는 실패하기 쉬운데요. 여러 사례를 바탕으로 컴포넌트와 쿼리를 근처 두며 쉽게 prefetchQuery를 수행하는 방법론을 정리해 소개합니다. 나아가 이 방법론 위에 구성한 라이브러리 설계 과정을 공유합니다.",
      en: "Manually managing prefetchQuery for SSR support in TanStack Query is tricky. RSC and Suspense alone are prone to failure. Based on various cases, we organize and introduce a methodology for easily performing prefetchQuery by keeping components and queries close together. Furthermore, we share the library design process built on top of this methodology.",
    },
  },
  {
    id: "b7",
    time: "17:10 – 17:40",
    title: {
      kr: "그리드 기반 웹 에디터 / 빌더 구현기",
      en: "Grid-based Web Editor / Builder Implementation Story",
    },
    speaker: {
      kr: "이선협",
      en: "Sunhyup Lee",
    },
    company: {
      kr: "마플코퍼레이션",
      en: "Marpple Corporation",
    },
    content: {
      kr: "그리드 기반 에디터는 웹에 최적화된 자유도를 가진 에디터입니다. 이런 장점을 기반으로 노코드 웹사이트 제작, 사용자 정의 대시보드 등 다양한 제품에서 사용할 수 있습니다. 대표적으로 Squarespace, 큐샵과 같은 서비스에서도 사용하고 있습니다. 본 발표에선 그리드 기반 에디터에 대한 소개와 구현 전략, 구현시 주의할 점에 대해 다룹니다.",
      en: "Grid-based editors are editors with degrees of freedom optimized for the web. Based on these advantages, they can be used in various products such as no-code website creation and custom dashboards. They are notably used in services like Squarespace and Qshop. This presentation covers an introduction to grid-based editors, implementation strategies, and points to consider during implementation.",
    },
  },
]

// Hall C 데이터
const hallCSessions: Session[] = [
  {
    id: "c1",
    time: "12:10 – 14:10",
    title: {
      kr: "Frontend Leader Talk",
      en: "Frontend Leader Talk",
    },
    content: {
      kr: "100분간 진행되는 패널 토크 세션입니다.",
      en: "A 100-minute panel talk session.",
    },
  },
  {
    id: "c2",
    time: "14:30 – 15:50",
    title: {
      kr: "Lightning Talk - [그룹 1] 길을 만드는 개척자들",
      en: "Lightning Talk - [Group 1] Pioneers Who Make the Way",
    },
    content: {
      kr: "박정욱: 지속가능한 개발은 건강한 개발이다\n김재환: 과거에도 없었고 현재에도 없는 사수에게 기대지 않는 성장법\n임채준: 주니어 개발자의 1인 생존기 - 팀이 사라졌다!\n남은경: 비IT기업에서 웹 개발자로 살아남기\n정석호: 팀 리드인데, 팀원이 1명? 아 3명이요! 네? 다시 한명이요?\n원지혁: 팀 빌딩과 성공하는 습관 만들기\n조성진: AI시대에 평범한 프론트엔드 개발자가 살아남는 방법",
      en: "Park Jeongwook: Sustainable development is healthy development\nKim Jaehwan: Growth methods without relying on mentors that didn't exist in the past and don't exist now\nLim Chaejun: A junior developer's survival story - The team disappeared!\nNam Eunkyung: Surviving as a web developer in a non-IT company\nJung Seokho: I'm a team lead, but there's only 1 team member? Oh, 3 members! What? Back to 1 again?\nWon Jihyeok: Team building and creating successful habits\nJo Seongjin: How an ordinary frontend developer survives in the AI era",
    },
  },
  {
    id: "c3",
    time: "16:00 – 17:20",
    title: {
      kr: "Lightning Talk - [그룹2] 도구를 다루는 장인들",
      en: "Lightning Talk - [Group 2] Craftsmen Who Handle Tools",
    },
    content: {
      kr: "박현우: 킵올빌런 은퇴식\n한상욱: 오픈소스 밥상차리기: 환경설정과 디버깅편\n최관수: CSS로 할 수 있는 것들(가제)\n김재서: React memoization 언제 적용 하는 것이 좋을까요?\n손효정: UI 코드 생성 자동화를 프로덕션까지: 우리 팀은 Figma MCP + Cursor(AI)와 함께 일합니다\n오소현: 소규모 스타트업의 디자인 시스템, 도입부터 안정화까지\n유승완: UI와 Business Logic의 분리, 저 잘했죠?",
      en: "Park Hyunwoo: Keep All Villain retirement ceremony\nHan Sangwook: Setting the open source table: Environment setup and debugging edition\nChoi Gwansu: Things you can do with CSS (working title)\nKim Jaeseo: When should React memoization be applied?\nSon Hyojeong: UI code generation automation to production: Our team works with Figma MCP + Cursor(AI)\nOh Sohyun: Design system for small startups, from introduction to stabilization\nYoo Seungwan: Separation of UI and Business Logic, did I do well?",
    },
  },
]

export default function ProgramSection({ theme }: ProgramSectionProps) {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState<"a" | "b" | "c">("a")
  const [expandedSession, setExpandedSession] = useState<string | null>(null)

  const sessions = activeTab === "a" ? sessionA : activeTab === "b" ? sessionB : hallCSessions

  const toggleSession = (sessionId: string) => {
    setExpandedSession(expandedSession === sessionId ? null : sessionId)
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 섹션 타이틀 */}
      <div className="text-center mb-6 md:mb-8">
        <h2
          className="text-3xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
          style={{ fontFamily: "Jost, sans-serif", fontWeight: 700 }}
        >
          Program Overview
        </h2>
      </div>

      {/* 메인 콘텐츠 */}
      <div className="flex flex-col md:flex-row md:items-start gap-4 md:gap-8">
        {/* 탭 버튼 */}
        <div className="flex-shrink-0 self-start md:sticky md:top-28 z-10">
          <div className="flex flex-row md:flex-col w-full md:w-[160px] gap-0.5 md:gap-2 bg-[#118274d] backdrop-blur-md border-gray-800 rounded-lg md:rounded-xl p-0.5 md:p-3 border-0">
            <button
              className={`flex-1 md:w-full p-2 md:p-3 rounded-md text-xs md:text-sm transition-all whitespace-nowrap text-center md:text-left ${
                activeTab === "a" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
              }`}
              onClick={() => {
                setActiveTab("a")
                setExpandedSession(null)
              }}
            >
              Hall A
            </button>
            <button
              className={`flex-1 md:w-full p-2 md:p-3 rounded-md text-xs md:text-sm transition-all whitespace-nowrap text-center md:text-left ${
                activeTab === "b" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
              }`}
              onClick={() => {
                setActiveTab("b")
                setExpandedSession(null)
              }}
            >
              Hall B
            </button>
            <button
              className={`flex-1 md:w-full p-2 md:p-3 rounded-md text-xs md:text-sm transition-all whitespace-nowrap text-center md:text-left ${
                activeTab === "c" ? "bg-gray-800 text-white" : "text-gray-400 hover:text-white"
              }`}
              onClick={() => {
                setActiveTab("c")
                setExpandedSession(null)
              }}
            >
              Hall C
            </button>
          </div>
        </div>

        {/* 세션 목록 */}
        <div className="flex-1 min-w-0">
          <div className="space-y-0">
            {sessions.map((session, index) => (
              <motion.div
                key={session.id}
                className="border-t border-gray-700 first:border-t-0"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Session Header */}
                <div
                  className={`flex flex-col gap-1 md:gap-3 py-3 md:py-6 cursor-pointer group`}
                  onClick={() => {
                    if (session.id === "c1") {
                      const panelSection = document.getElementById("section-panel")
                      if (panelSection) {
                        panelSection.scrollIntoView({ behavior: "smooth", block: "start" })
                      }
                    } else {
                      toggleSession(session.id)
                    }
                  }}
                >
                  {/* Time */}
                  <div className="w-12 md:w-32 flex-shrink-0 md:mb-0">
                    <div className="text-gray-400 text-xs md:text-sm flex flex-row md:items-center">
                      <span className="leading-tight text-left whitespace-nowrap">{session.time}</span>
                    </div>
                  </div>

                  {/* Session Info and Icon Container */}
                  <div className="flex items-center justify-between gap-2 lg:flex-1">
                    {/* Session Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4
                          className="text-sm md:text-lg text-white transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] leading-relaxed text-left"
                          style={{ fontWeight: 700 }}
                        >
                          {language === "kr" ? session.title.kr : session.title.en}
                        </h4>
                        {session.id === "c1" && (
                          <span className="text-blue-400 text-xs font-bold whitespace-nowrap">
                            {language === "kr" ? "골드티켓 전용" : "Gold Ticket Only"}
                          </span>
                        )}
                      </div>

                      {session.speaker && (
                        <div className="flex flex-wrap items-center text-gray-400 text-xs">
                          <span className="font-medium">
                            {language === "kr" ? session.speaker.kr : session.speaker.en}
                          </span>
                          {session.company && session.id !== "a5" && (
                            <>
                              <span className="mx-1">|</span>
                              <span>{language === "kr" ? session.company.kr : session.company.en}</span>
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Expand Icon or FE Talk Button */}
                    <div className="flex-shrink-0">
                      {session.id === "c1" ? (
                        <button
                          className="flex items-center justify-center"
                          aria-label={language === "kr" ? "FE Talk 섹션으로 이동" : "Go to FE Talk section"}
                        >
                          <Plus size={16} className="text-gray-400" />
                        </button>
                      ) : (
                        <motion.div
                          animate={{ rotate: expandedSession === session.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {expandedSession === session.id ? (
                            <Minus size={16} className="text-gray-400" />
                          ) : (
                            <Plus size={16} className="text-gray-400" />
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {expandedSession === session.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="pb-3 md:pb-6">
                        {/* Session Content */}
                        {session.content && (
                          <div className="mb-4">
                            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
                              {activeTab === "c"
                                ? (language === "kr" ? session.content.kr : session.content.en)
                                    .split("\n")
                                    .map((line, index) => (line.trim() ? `• ${line}` : line))
                                    .join("\n")
                                : language === "kr"
                                  ? session.content.kr
                                  : session.content.en}
                            </p>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
