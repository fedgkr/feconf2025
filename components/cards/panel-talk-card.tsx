"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useState, useMemo, useCallback } from "react"
import { useLanguage } from "../language-provider"
import { Plus, Minus, Github, YoutubeIcon, Briefcase } from "lucide-react"
import type { Theme } from "@/lib/themes"
import Image from "next/image"
import { Button } from "@/components/ui/button"

interface PanelTalkCardProps {
  theme: Theme
}

interface PastExperience {
  kr: string
  en: string
}

interface Panelist {
  name: { kr: string; en: string }
  role: { kr: string; en: string }
  company: { kr: string; en: string }
  description: { kr: string; en: string }
  image: string
  links: {
    linkedin?: string
    github?: string
    youtube?: string
  }
  pastExperiences?: PastExperience[]
  isModerator?: boolean
}

export default function PanelTalkCard({ theme }: PanelTalkCardProps) {
  const { t, language } = useLanguage()
  const [expandedMainTalkTopic, setExpandedMainTalkTopic] = useState<number | null>(null)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [expandedPanelist, setExpandedPanelist] = useState<number | null>(null)

  // 메모이제이션으로 불필요한 재계산 방지
  const panelists: Panelist[] = useMemo(
    () => [
      {
        name: { kr: "한재엽", en: "Jaeyeop Han" },
        role: { kr: "FEConf Organizer", en: "FEConf Organizer" },
        company: { kr: "Moderator", en: "Moderator" },
        description: {
          kr: "내 생각을 세상에 실현시키고 싶어 코딩을 시작했습니다. 웹 프론트엔드 개발을 주로 하며 영역을 넓혀 나가는 것을 지향합니다. 글을 쓰고 공유합니다. 전문적으로 배우지 않았지만 향기로운 글을 쓰기 위해 퇴고합니다. 주로 개인적인 생각을 정리하며 가끔 웹을 소재로 쓰곤 합니다. 누군가에게 도움이 되길 바라며 9년째 블로그를 운영하고 있습니다. 지속 가능성을 고민합니다. 소프트웨어 설계 뿐만 아니라 프로세스, 시스템, 문화에 대해 고민하곤 합니다. 개발 생태계에도 관심이 많아 여러 행사에서 발표를 통해 경험을 공유했으며 프론트엔드 개발 컨퍼런스, FEConf를 9년동안 운영하고 있으며 jbee.io 블로그를 운영하고 있습니다.",
          en: "I started coding because I wanted to bring my ideas to life. I primarily focus on web frontend development and aim to expand my expertise. I write and share. Although not professionally trained, I revise my writing to make it more impactful. I mostly organize my personal thoughts and occasionally write about web-related topics. Hoping to help someone, I've been running a blog for 9 years. I contemplate sustainability, not just in software design but also in processes, systems, and culture. I'm also very interested in the development ecosystem, have shared my experiences through presentations at various events, and have been organizing the frontend development conference, FEConf, for 9 years.",
        },
        image: "/images/panelists/han-jaeyeop.png",
        links: {
          linkedin: "https://www.linkedin.com/in/jbee37142/",
          github: "https://github.com/jbee37142",
        },
        pastExperiences: [
          { kr: "전) 당근 Frontend Developer", en: "(Former) Karrot Frontend Developer" },
          { kr: "전) 토스페이먼츠 프론트엔드 챕터 리드", en: "(Former) Toss Payments Frontend Chapter Lead" },
          { kr: "전) LINE Financial Frontend Developer", en: "(Former) LINE Financial Frontend Developer" },
          { kr: "전) NAVER Frontend Developer", en: "(Former) NAVER Frontend Developer" },
        ],
        isModerator: true,
      },
      {
        name: { kr: "박서진", en: "Seojin Park" },
        role: { kr: "토스 Head of Frontend", en: "Head of Frontend" },
        company: { kr: "토스", en: "Toss" },
        description: {
          kr: "2018년 토스에 첫 회사로 합류한 이후, 10명 규모의 프론트엔드 팀이 100명 이상의 규모로 성장하는 과정에 함께했다. '아름다운 프론트엔드 화면을 만들고 싶다'는 단순한 목표로 시작했지만, 말 좋은 프론트엔드를 만들기 위해서는 물 흐르는 듯 일할 수 있는 개발환경과 좋은 조직문화가 중요하다는 것을 깨달았습니다. '언제든 더 나아질 수 있다'는 철학 아래에서, 실패를 허용하는 조직 문화를 조성하고 주니어 개발자들이 성장할 수 있는 환경을 구축하는 데에 집중하고 있어요. FEConf, App.js Conf, Slash 등 국내외 컨퍼런스에서 기술과 리더십에 대해 이야기해왔으며, 온라인에서는 raon0211 아이디로 활동합니다.",
          en: "After joining Toss as my first company in 2018, I've been part of the journey as the frontend team grew from 10 to over 100 members. I started with a simple goal to 'create beautiful frontend screens,' but realized that a seamless development environment and a good organizational culture are crucial for truly great frontend development. Under the philosophy that 'we can always improve,' I focus on fostering a culture that allows failure and building an environment where junior developers can grow. I've spoken about technology and leadership at domestic and international conferences like FEConf, App.js Conf, and Slash, and I'm active online under the ID raon0211.",
        },
        image: "/images/panelists/park-seojin.png",
        links: {
          linkedin: "https://www.linkedin.com/in/raon0211/",
          github: "https://github.com/raon0211",
        },
      },
      {
        name: { kr: "장기효", en: "Kihyo Jang" },
        role: { kr: "네이버 쇼핑 프론트엔드 개발자", en: "Naver Shopping Frontend Developer" },
        company: { kr: "네이버", en: "NAVER" },
        description: {
          kr: "네이버에서 FE 라운지와 밋업을 해 사내 프론트엔드 생태계를 활기차게 만들고자 노력하고 있으며, 소속된 사업부에서는 동료들과 함께 성장하는 문화를 만들기 위해 '기술 성장' 프로그램을 운영하고 있습니다. 회사 밖에서는 강의와 집필, 멘토링을 통해 프론트엔드 지식을 나누고 있습니다. 현재까지 인프런에서 약 4.7만 명의 수강생과 함께했고, 『쉽게 시작하는 타입스크립트』, 『Do it! Vue.js 입문』, 『나는 네이버 프론트엔드 개발자입니다』를 집필했습니다. 또한 '캡틴판교'라는 이름으로 유튜브에서 개발자들의 고민을 함께 나누는 콘텐츠도 운영하고 있습니다. 개발자들과 함께 성장하고 연결되는 일에 늘 즐거움을 느끼고 있습니다.",
          en: "At Naver, I strive to invigorate the in-house frontend ecosystem through FE lounges and meetups. In my department, I run a 'technical growth' program to foster a culture of growth with colleagues. Outside of work, I share frontend knowledge through lectures, writing, and mentoring. To date, I've taught about 47,000 students on Inflearn and authored 'Easy Start TypeScript,' 'Do it! Vue.js Introduction,' and 'I am a Naver Frontend Developer.' I also run a YouTube channel called 'Captain Pangyo,' sharing content about developers' concerns. I always find joy in growing and connecting with developers.",
        },
        image: "/images/panelists/jang-kihyo.png",
        links: {
          youtube: "https://www.youtube.com/@captainpangyo",
          github: "https://github.com/joshua1988",
        },
      },
      {
        name: { kr: "원지혁", en: "Jihyeok Won" },
        role: { kr: "당근 프론트엔드 리더", en: "Frontend Core & Chapter Lead" },
        company: { kr: "당근", en: "Karrot" },
        description: {
          kr: "당근의 33번째 멤버이자 초기 프론트엔드 개발자로 70명 규모의 챕터로 성장하기까지 프론트엔드 개발자분들이 더 행복하게 일할 수 있도록 기술 전반을 가꾸는 역할을 맡아왔습니다. 초기 프로덕트와 팀 빌딩부터, 단단하고 성숙한 플랫폼을 만드는 것까지 다양한 경험을 함께 나누고 싶습니다.",
          en: "As the 33rd member and an early frontend developer at Karrot, I've been dedicated to cultivating the overall technology to help frontend developers work happier as the chapter grew to 70 members. I want to share diverse experiences from initial product and team building to creating a solid and mature platform.",
        },
        image: "/images/panelists/won-jihyeok.png",
        links: {
          linkedin: "https://www.linkedin.com/in/jeehyukwon/",
          github: "https://github.com/tonyfromundefined",
        },
        pastExperiences: [
          {
            kr: "(전) 당근알바, 당근미니, 내근처, 검색",
            en: "(Former) Karrot Part-time, Karrot Mini, Near Me, Search",
          },
        ],
      },
    ],
    [],
  )

  const mainTalkTopics = useMemo(
    () => [
      {
        id: 1,
        title: { kr: "어느 방향으로 성장해야 할까?", en: "In which direction should we grow?" },
        description: {
          kr: "프론트엔드 개발자로서의 성장 방향성과 커리어 패스에 대한 심도 있는 논의를 진행합니다. 기술 심화, 매니지먼트, 스페셜리스트 등 다양한 경로를 탐색합니다. AI 시대를 맞이하여 프론트엔드 개발자로서 어떤 역할을 담당해야 할지 어떻게 진화해나가야 할지 아니면 이대로도 문제 없는지 토론합니다.",
          en: "In-depth discussion on the growth direction and career path for frontend developers. Exploring various paths such as technical deepening, management, and specialist roles. Discussing what role frontend developers should take on in the AI era, how to evolve, or whether it's okay to stay as is.",
        },
      },
      {
        id: 2,
        title: { kr: "리더가 생각하는 좋은 동료, 좋은 팔로워는 어떤 모습일까?", en: "What makes a good colleague, a good follower?" },
        description: {
          kr: "리더가 생각하는 좋은 동료, 좋은 팔로워의 모습에 대해 이야기 나눕니다. 다소 추상적일 수 있는 주제를 구체적인 경험을 중심으로 이야기를 나눕니다. 지금의 리더들은 좋은 팔로워 였을지, 어떤 아쉬움이 남는지도 함께 이야기 할 수 있을 것 같습니다.",
          en: "Discussing the ideal characteristics of a good colleague and a good follower. While this topic may be somewhat abstract, we'll discuss it concretely through shared experiences. It might also be interesting to discuss whether the current leaders were good followers and what they might have missed.",
        },
      },
      {
        id: 3,
        title: { kr: "리더로서 겪는 도전과 배움은 무엇이 있나? 매니저로 가면 커리어 꼬이는거 아닌가?", en: "What are the challenges and learnings as a leader? Will my career be ruined if I become a manager?" },
        description: {
          kr: "리더로서 마주하는 다양한 도전 과제들과 이를 통해 얻은 교훈, 그리고 성장 스토리를 나눕니다. 한국에는 특히 매니저가 되면 더이상 개발을 하지 않게 되게 되면서 몸값이 떨어지거나 커리어가 꼬인 다는 인식이 팽배한 것 같습니다. 실제로 리더 역할을 수행하면서 느꼈던 점들을 이야기 합니다.",
          en: "Discussing various challenges faced as a leader, lessons learned, and growth stories. In Korea, particularly, there is a widespread perception that becoming a manager means no longer doing development, which leads to a decrease in value or a ruined career. I'll share my experiences as a leader.",
        },
      },
      {
        id: 4,
        title: { kr: "좋은 프론트엔드 조직이란 무엇일까? 우리 팀도 함께 성장할 수 있을까?", en: "What makes a good frontend organization? Can we grow together as a team?" },
        description: {
          kr: "좋은 프론트엔드 조직을 만들기 위한 핵심 요소들과 실제 경험을 공유합니다. 팀 구조, 문화, 기술 스택 선택 등 다양한 측면을 다룹니다. 우리 팀도 함께 성장할 수 있을까? 라는 질문에 대해 이야기 나눕니다. 프론트엔드 개발자로서 조직을 만들고 관리하는 경험을 공유합니다.",
          en: "Sharing key elements and real experiences in building a good frontend organization. Covers various aspects like team structure, culture, and technology stack choices. Discussing whether we can grow together as a team. Sharing experiences in building and managing a frontend organization.",
        },
      },
    ],
    [],
  )

  const faqItems = useMemo(
    () => [
      {  
        id: 1,
        question: { kr: "어떤 내용을 주로 다루나요?", en: "What topics do you mainly cover?" },
        answer: {
          kr: "신청과 함께 받은 질문을 기반으로 주제와 질문들을 정리할 예정이며 각 패널들의 깊이있는 경험을 바탕으로 고민한 내용들을 전달하려고 합니다.",
          en: "This session is provided only for a pre-determined number of people, so on-site purchase is not available.",
        },
      },
      {  
        id: 2,
        question: { kr: "현장에서 질문이 가능한가요?", en: "What topics do you mainly cover?" },
        answer: {
          kr: "패널 토크에 할당한 시간은 2시간 정도이며 현장의 분위기에 맞춰 유동적으로 진행할 예정입니다. 깊이 있는 토론을 나눌 수 있는 좋은 질문이 있다면 그 주제만을 다룰 수도 있고 그렇지 않다면 사전에 제출된 내용을 중심으로 토크를 진행할 예정입니다.",
          en: "We’ve allocated about two hours for the panel talk, and it will be conducted flexibly depending on the atmosphere at the venue. If there are great questions that lead to in-depth discussion, we may focus solely on those topics. Otherwise, the talk will center around the questions submitted in advance.",
        },
      },
      {
        id: 3,
        question: { kr: "온라인으로 패널 토크 내용을 볼 수 있나요?", en: "Can I watch the panel talk online?" },
        answer: {
          kr: "본 세션은 오프라인에서만 이뤄지며 온라인으로 제공되지 않습니다.",
          en: "This session is offline-only and will not be available online.",
        },
      },
      {  
        id: 4,
        question: { kr: "현장 추가 구매로 입장할 수 있나요?", en: "Can I buy a ticket on-site?" },
        answer: {
          kr: "사전에 정해진 인원에 대해서만 제공하는 세션이기 때문에 현장 구매로 참여하기는 어렵습니다.",
          en: "This session is provided only for a pre-determined number of people, so on-site purchase is not available.",
        },
      },
    ],
    [],
  )

  // 콜백 최적화
  const toggleMainTalkTopic = useCallback((topicIndex: number) => {
    setExpandedMainTalkTopic((prev) => (prev === topicIndex ? null : topicIndex))
  }, [])

  const toggleFaq = useCallback((faqIndex: number) => {
    setExpandedFaq((prev) => (prev === faqIndex ? null : faqIndex))
  }, [])

  const togglePanelist = useCallback((panelistIndex: number) => {
    setExpandedPanelist((prev) => (prev === panelistIndex ? null : panelistIndex))
  }, [])

  // 애니메이션 설정 최적화 - 더 가벼운 애니메이션
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.3,
        staggerChildren: 0.05, // 스태거 시간 단축
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 }, // y 값 감소
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.2 }, // 애니메이션 시간 단축
    },
  }

  return (
    <div className="max-w-6xl mx-auto rounded-xl bg-[#118274d] backdrop-blur-md border-0">
      <motion.div
        className=""
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {/* 헤더 섹션 */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h3
            className="text-3xl md:text-4xl text-white font-semibold mb-4 break-keep"
            style={{
              fontFamily: "Jost, sans-serif",
              fontWeight: 600,
            }}
          >
            {language === "kr" ? "Frontend Leader Talk" : "Frontend Leader Talk"}
          </h3>
          <p className="text-gray-400 text-sm mb-4 break-keep">
            {language === "kr"
              ? "국내 FE 개발 리더들과의 Private 패널 토크"
              : "Private panel talk with frontend developers at FEConf"}
          </p>
          <Button
            className="w-fit px-4 py-2 bg-blue-500/20 backdrop-blur-md rounded-lg border border-blue-400/30 mt-2"
            style={{
              background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)",
              borderColor: "rgba(59, 130, 246, 0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              Object.assign(e.currentTarget.style, {
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.3) 0%, rgba(147, 51, 234, 0.3) 100%)",
                borderColor: "rgba(59, 130, 246, 0.5)",
                transform: "translateY(-1px)",
              })
            }}
            onMouseLeave={(e) => {
              Object.assign(e.currentTarget.style, {
                background: "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 51, 234, 0.2) 100%)",
                borderColor: "rgba(59, 130, 246, 0.3)",
                transform: "translateY(0px)",
              })
            }}
            onClick={() => {
              const ticketSection = document.getElementById("section-ticket")
              if (ticketSection) {
                ticketSection.scrollIntoView({ behavior: "smooth", block: "start" })
              }
            }}
          >
            <span className="text-blue-200 text-sm font-medium break-keep flex items-center gap-1">
              {language === "kr" ? "골드 티켓 전용" : "Gold Ticket Only"}
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </span>
          </Button>
        </motion.div>

        {/* 패널리스트 프로필 리스트 - 애니메이션 최적화 */}
        <div className="space-y-0 mb-16">
          {panelists.map((panelist, index) => (
            <motion.div key={index} variants={itemVariants} className="border-t border-gray-700 first:border-t-0">
              {/* Panelist Header - Clickable */}
              <div className="flex items-center gap-6 py-6 cursor-pointer group" onClick={() => togglePanelist(index)}>
                {/* Profile Image */}
                <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
                  <div className="relative w-full h-full rounded-full overflow-hidden">
                    <Image
                      src={panelist.image || "/placeholder.svg"}
                      alt={t(panelist.name.kr, panelist.name.en)}
                      layout="fill"
                      objectFit="cover"
                      loading="lazy" // 지연 로딩 추가
                    />
                  </div>
                </div>

                {/* Panelist Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4
                      className="text-xl text-white transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] break-keep"
                      style={{ fontWeight: 700 }}
                    >
                      {t(panelist.name.kr, panelist.name.en)}
                    </h4>

                    {/* Social Links */}
                    <div className="flex space-x-2">
                      {panelist.links.linkedin && (
                        <a
                          href={panelist.links.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${t(panelist.name.kr, panelist.name.en)} LinkedIn`}
                        >
                          <svg width="16" height="16" viewBox="0 0 382 382" className="fill-current">
                            <path
                              fill="currentColor"
                              d="M347.445,0H34.555C15.471,0,0,15.471,0,34.555v312.889C0,366.529,15.471,382,34.555,382h312.889
                              C366.529,382,382,366.529,382,347.444V34.555C382,15.471,366.529,0,347.445,0z M118.207,329.844c0,5.554-4.502,10.056-10.056,10.056
                              H65.345c-5.554,0-10.056-4.502-10.056-10.056V150.403c0-5.554,4.502,10.056,10.056,10.056h42.806
                              c5.554,0,10.056,4.502,10.056,10.056V329.844z M86.748,123.432c-22.459,0-40.666-18.207-40.666-40.666S64.289,42.1,86.748,42.1
                              s40.666,18.207,40.666,40.666S109.208,123.432,86.748,123.432z M341.91,330.654c0,5.106-4.14,9.246-9.246,9.246H286.73
                              c-5.106,0-9.246-4.14-9.246-9.246v-84.168c0-12.556,3.683-55.021-32.813-55.021c-28.309,0-34.051,29.066-35.204,42.11v97.079
                              c0,5.106-4.139,9.246-9.246,9.246h-44.426c-5.106,0-9.246-4.14-9.246-9.246V149.593c0-5.106,4.14-9.246,9.246-9.246h44.426
                              c5.106,0,9.246,4.14,9.246,9.246v15.655c10.497-15.753,26.097-27.912,59.312-27.912c73.552,0,73.131,68.716,73.131,106.472
                              L341.91,330.654L341.91,330.654z"
                            />
                          </svg>
                        </a>
                      )}
                      {panelist.links.github && (
                        <a
                          href={panelist.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${t(panelist.name.kr, panelist.name.en)} Github`}
                        >
                          <Github size={16} />
                        </a>
                      )}
                      {panelist.links.youtube && (
                        <a
                          href={panelist.links.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                          aria-label={`${t(panelist.name.kr, panelist.name.en)} YouTube`}
                        >
                          <YoutubeIcon size={16} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center text-gray-400 text-sm">
                    <span className="font-medium break-keep text-left">{t(panelist.role.kr, panelist.role.en)}</span>
                    <span className="mx-2">|</span>
                    <span className={panelist.isModerator ? "text-blue-400 break-keep" : "text-gray-400 break-keep"}>
                      {t(panelist.company.kr, panelist.company.en)}
                    </span>
                  </div>
                </div>

                {/* Expand/Collapse Icon */}
                <div className="flex-shrink-0">
                  <motion.div
                    animate={{ rotate: expandedPanelist === index ? 180 : 0 }}
                    transition={{ duration: 0.15 }} // 애니메이션 시간 단축
                  >
                    {expandedPanelist === index ? (
                      <Minus size={20} className="text-gray-400" />
                    ) : (
                      <Plus size={20} className="text-gray-400" />
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Expanded Content - 애니메이션 최적화 */}
              <AnimatePresence mode="wait">
                {expandedPanelist === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }} // 애니메이션 시간 단축
                    className="overflow-hidden"
                  >
                    <div className="md:pl-[104px] md:pr-12 pb-6">
                      {/* Description */}
                      <div className="mb-6">
                        <p className="text-gray-300 text-sm leading-relaxed break-keep text-left">
                          {t(panelist.description.kr, panelist.description.en)}
                        </p>
                      </div>

                      {/* Past Experiences */}
                      {panelist.pastExperiences && panelist.pastExperiences.length > 0 && (
                        <div>
                          <h5 className="text-sm font-semibold text-gray-300 mb-3 flex items-center break-keep">
                            <Briefcase size={14} className="mr-2 text-gray-400" />
                            {t("주요 경력", "Past Experiences")}
                          </h5>
                          <ul className="list-disc list-inside space-y-1 pl-4">
                            {panelist.pastExperiences.map((exp, i) => (
                              <li key={i} className="text-sm text-gray-400 break-keep text-left">
                                {t(exp.kr, exp.en)}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* 상세 정보 섹션 - 애니메이션 최적화 */}
        <div className="my-16 space-y-6">
          {/* 패널 토크란? 카드 */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-xl bg-gray-900/30 backdrop-blur-md border border-gray-800 w-full"
          >
            <div>
              <h4 className="text-xl font-bold text-white mb-4 text-center break-keep">
                {t("Frontend Leader Talk란?", "What is the Frontend Leader Talk?")}
              </h4>
              <p className="text-gray-300 text-sm leading-relaxed text-center break-keep">
                {t(
                  "빠르게 진화하는 웹 기술 속에서 팀을 이끌고, 기술을 선택하며, 제품을 만들어내는 프론트엔드 리더 3인이 모였습니다. 이번 패널 토크에서는 각기 다른 조직에서 활약 중인 리더들이 실제 현장에서의 리더십, 팀 문화 설계까지 생생한 경험을 바탕으로 이야기를 나눕니다.",
                  "In the rapidly evolving world of web technology, three frontend leaders who lead teams, select technologies, and create products have come together. In this panel talk, leaders active in different organizations will share stories based on their vivid experiences, from on-the-ground leadership to team culture design.",
                )}
              </p>
            </div>
          </motion.div>

          {/* 토크 주제 카드 */}

          {/* FAQ */}
          <motion.div variants={itemVariants} className="w-full pt-6">
            <h4 className="text-xl font-bold text-white mb-4 text-center break-keep">FAQ</h4>
            <div className="space-y-0">
              {faqItems.map((item, index) => (
                <div key={item.id} className="border-b border-gray-700 last:border-b-0">
                  <div className="group cursor-pointer py-4" onClick={() => toggleFaq(index)}>
                    <div className="flex items-center justify-between">
                      <h5 className="text-base font-medium text-white break-keep">
                        {t(item.question.kr, item.question.en)}
                      </h5>
                      <div className="text-white/60">
                        {expandedFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                      </div>
                    </div>
                  </div>
                  <AnimatePresence mode="wait">
                    {expandedFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }} // 애니메이션 시간 단축
                        className="overflow-hidden"
                      >
                        <div className="pb-4">
                          <p className="text-white/70 text-sm break-keep">{t(item.answer.kr, item.answer.en)}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
