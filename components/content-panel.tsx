'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Mic,
  Ticket,
  Users,
  Sparkles,
  Building2,
  Youtube,
  UserRound,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from './language-provider';
import type { Section } from '@/lib/content';
import { useEffect, useState, useRef } from 'react';
import { sections } from '@/lib/content';
import { type Theme, themes } from '@/lib/themes';

// Countdown Timer Component
function CountdownTimer({ initialMinutes }: { initialMinutes: number }) {
  const [timeLeft, setTimeLeft] = useState<number>(initialMinutes * 60);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          // Reset to initial time when it reaches zero
          return initialMinutes * 60;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [initialMinutes]);

  // Format time as 00:05:00
  const formatTime = () => {
    const hours = Math.floor(timeLeft / 3600);
    const minutes = Math.floor((timeLeft % 3600) / 60);
    const seconds = timeLeft % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <motion.div
      className="text-2xl mb-2"
      animate={{
        scale: timeLeft <= 10 ? [1, 1.1, 1] : 1,
        color: timeLeft <= 10 ? ['#FFFFFF', '#FF4D4D', '#FFFFFF'] : '#FFFFFF',
      }}
      transition={{
        duration: timeLeft <= 10 ? 0.5 : 0,
        repeat: timeLeft <= 10 ? Number.POSITIVE_INFINITY : 0,
        repeatType: 'reverse',
      }}
    >
      {formatTime()}
    </motion.div>
  );
}

// ContentPanel 컴포넌트의 props 인터페이스에 useDefaultUIColor 추가
interface ContentPanelProps {
  section: Section;
  onClose: () => void;
  onSectionChange?: (sectionId: string) => void;
  sidebarOpen?: boolean;
  sidebarWidth?: number;
  theme?: Theme;
  useDefaultUIColor?: boolean; // 기본 UI 색상 사용 여부 플래그 추가
}

// 기본 UI 색상 상수 추가 (Cosmic Blue 테마의 색상)
const defaultUIColor = '#FFFFFF';

// ContentPanel 함수 매개변수에 useDefaultUIColor 추가
export default function ContentPanel({
  section,
  onClose,
  onSectionChange,
  sidebarOpen = false,
  sidebarWidth = 0,
  theme = themes[0],
  useDefaultUIColor = true, // 기본값은 true로 설정
}: ContentPanelProps) {
  const { t, language } = useLanguage();
  const [showDetails, setShowDetails] = useState(false);
  const [activeSection, setActiveSection] = useState<string>(section.id);
  const [currentSection, setCurrentSection] = useState<Section>(section);
  const [hasScroll, setHasScroll] = useState(false);
  const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // 기본 UI 색상 정의 (Cosmic Blue 테마의 색상)
  const defaultUIColor = '#FFFFFF';

  // Use theme colors for styling or default UI color based on flag
  const accentColor = useDefaultUIColor ? defaultUIColor : theme.uiColor;

  // 티켓 모달(1번 모달)의 여백 값 - 15% 넓게 설정
  const ticketMargin = '29px';

  // 스피커 모달(2번 모달)의 여백 값 - 40% 넓게 설정
  const speakerMargin = '35px';

  // 라이트닝 톡 모달(4번 모달)의 여백 값 - 40% 넓게 설정
  const lightningMargin = '35px';

  // 표준 여백 값
  const standardMargin = '25px';

  // 그라데이션 배경 스타일
  const gradientBorderStyle = {
    borderColor: `${accentColor}50`, // 30% opacity
  };

  // 그라데이션 헤더 스타일
  const gradientHeaderStyle = {
    background: `linear-gradient(90deg, ${accentColor}20, ${accentColor}05)`,
    borderBottom: `1px solid ${accentColor}30`,
  };

  // 버튼 스타일 - 모든 모달에서 공통으로 사용 (솔리드 화이트로 변경)
  const buttonStyle = {
    background: `#FFFFFF`,
    color: '#0A2463',
    fontWeight: '700', // bold에서 700으로 변경
    fontSize: '1.1rem', // Increased font size
    boxShadow: `0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.1)`,
    minWidth: '36.8%', // 고정 width에서 minWidth로 변경
    height: '46.2px', // 42px * 1.1 (10% 증가)
    padding: '0 1.5rem', // 좌우 패딩 추가
  };

  // 버튼 호버 스타일
  const buttonHoverStyle = {
    background: `#FFFFFF`,
    boxShadow: `0 0 20px rgba(255,255,255,0.7), 0 0 40px rgba(255,255,255,0.4), 0 0 60px rgba(255,255,255,0.2)`,
  };

  // 42dot Sans 폰트 스타일
  const fontStyle = { fontFamily: 'var(--font-42dot)' };

  // Auto-show details after panel appears
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDetails(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Update current section when section prop changes
  useEffect(() => {
    setCurrentSection(section);
    setActiveSection(section.id);
  }, [section]);

  // 언어 변경 감지를 위한 useEffect 추가
  useEffect(() => {
    // 언어가 변경되어도 현재 모달 상태 유지
    // 이 useEffect는 언어 변경 시에만 실행됨

    // 현재 섹션 정보 유지
    const sectionData = sections.find((s) => s.id === activeSection);
    if (sectionData) {
      setCurrentSection(sectionData);
    }
  }, [language, activeSection]);

  // Handle section change within the modal
  const handleSectionChange = (sectionId: string) => {
    const newSection = sections.find((s) => s.id === sectionId);
    if (newSection) {
      setCurrentSection(newSection);
      setActiveSection(sectionId);

      // Notify parent component if callback is provided
      if (onSectionChange) {
        onSectionChange(sectionId);
      }
    }
  };

  // 섹션 ID에 따른 아이콘 반환
  const getSectionIcon = (sectionId: string, size = 16) => {
    switch (sectionId) {
      case 'hero':
        return <Ticket size={size} />;
      case 'speaker':
        return <Mic size={size} />;
      case 'lightning':
        return <Sparkles size={size} />;
      case 'sponsor':
        return <Building2 size={size} />;
      default:
        return <Users size={size} />;
    }
  };

  // 섹션 ID에 따라 다른 컨텐츠 렌더링
  const renderSectionContent = () => {
    switch (activeSection) {
      case 'hero':
        return (
          <TicketContent
            gradientStart={accentColor}
            gradientEnd={accentColor}
          />
        );
      case 'sponsor':
        return (
          <SponsorContent
            section={sections.find((s) => s.id === 'sponsor')!}
            gradientStart={accentColor}
            gradientEnd={accentColor}
          />
        );
      case 'speaker':
        return (
          <SpeakerContent
            gradientStart={accentColor}
            gradientEnd={accentColor}
          />
        );
      case 'lightning':
        return (
          <LightningContent
            gradientStart={accentColor}
            gradientEnd={accentColor}
          />
        );
      default:
        return (
          <DefaultContent
            section={sections.find((s) => s.id === activeSection)!}
            showDetails={showDetails}
            gradientStart={accentColor}
            gradientEnd={accentColor}
          />
        );
    }
  };

  // Calculate modal position based on sidebar state - 메인 콘텐츠 기준 가운데 정렬
  const getModalStyle = () => {
    return {
      left: `${sidebarWidth}px`,
      width: `calc(100% - ${sidebarWidth}px)`,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      transition: 'left 0.3s ease-in-out, width 0.3s ease-in-out',
    };
  };

  // 스크롤 감지를 위한 useEffect 추가
  useEffect(() => {
    const checkScroll = () => {
      const content = contentRef.current;
      if (!content) return;

      // 스크롤이 있는지 확인 - 더 정확한 계산
      const hasVerticalScroll =
        content.scrollHeight > content.clientHeight + 10; // 여유 값 증가
      setHasScroll(hasVerticalScroll);

      // 스크롤이 맨 아래에 있는지 확인 - 계산 방식 개선
      const isAtBottom =
        Math.abs(
          content.scrollHeight - content.scrollTop - content.clientHeight
        ) < 20;
      setIsScrolledToBottom(isAtBottom);

      // 스크롤 동작 감지 - 더 작은 값으로 변경하여 민감도 증가
      if (content.scrollTop > 5) {
        setHasScrolled(true);
      }
    };

    // 초기 체크
    checkScroll();

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkScroll);

    // 콘텐츠 영역에 스크롤 이벤트 리스너 추가
    const content = contentRef.current;
    if (content) {
      content.addEventListener('scroll', checkScroll);
    }

    return () => {
      window.removeEventListener('resize', checkScroll);
      if (content) {
        content.removeEventListener('scroll', checkScroll);
      }
    };
  }, [activeSection]); // activeSection이 변경될 때마다 다시 체크

  // 컴포넌트 마운트 후 약간의 지연을 두고 스크롤 상태 다시 확인
  useEffect(() => {
    // 컴포넌트가 렌더링된 후 약간의 지연을 두고 스크롤 상태 다시 확인
    const timer = setTimeout(() => {
      const content = contentRef.current;
      if (!content) return;

      const hasVerticalScroll =
        content.scrollHeight > content.clientHeight + 10;
      setHasScroll(hasVerticalScroll);

      const isAtBottom =
        Math.abs(
          content.scrollHeight - content.scrollTop - content.clientHeight
        ) < 20;
      setIsScrolledToBottom(isAtBottom);

      // 초기 상태에서는 hasScrolled를 false로 설정하여 넛지가 표시되도록 함
      setHasScrolled(false);
    }, 500); // 지연 시간 증가

    return () => clearTimeout(timer);
  }, [showDetails, activeSection]); // showDetails나 activeSection이 변경될 때 실행

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={getModalStyle()}
    >
      {/* Overlay with higher opacity for better dimming and enhanced blur effect */}
      <motion.div
        className="absolute inset-0 bg-black/98 backdrop-blur-md pointer-events-auto"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          className="relative pointer-events-auto"
          initial={{ scale: 0.9, y: 50, opacity: 0 }}
          animate={{
            scale: 1,
            y: 0,
            opacity: 1,
            height: 'auto',
          }}
          exit={{ scale: 0.9, opacity: 0 }}
          style={{
            width: 'calc(100% - 40px)',
            maxWidth: '900px', // 모달 가로 길이 증가 (800px → 900px)
            maxHeight: '85vh',
          }}
          transition={{
            type: 'spring',
            damping: 20,
            stiffness: 100,
          }}
        >
          {/* Main holographic panel with futuristic UI - 배경 투명도 증가 */}
          <div
            className="bg-black/60 backdrop-blur-xl rounded-2xl overflow-hidden
shadow-[0_0_30px_rgba(15,255,255,0.3)] relative outline outline-1 outline-white/20"
            style={gradientBorderStyle}
          >
            {/* Animated glowing border effect - more subtle */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              {/* Top border glow */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{
                  background: `linear-gradient(90deg, transparent, ${accentColor}70, transparent)`,
                  boxShadow: `0 0 5px ${accentColor}30, 0 0 10px ${accentColor}20`,
                }}
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                }}
              />

              {/* Right border glow */}
              <motion.div
                className="absolute top-0 right-0 bottom-0 w-[1px]"
                style={{
                  background: `linear-gradient(180deg, transparent, ${accentColor}70, transparent)`,
                  boxShadow: `0 0 5px ${accentColor}30, 0 0 10px ${accentColor}20`,
                }}
                initial={{ y: '-100%' }}
                animate={{ y: '100%' }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                  delay: 1,
                }}
              />

              {/* Bottom border glow */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[1px]"
                style={{
                  background: `linear-gradient(270deg, transparent, ${accentColor}70, transparent)`,
                  boxShadow: `0 0 5px ${accentColor}30, 0 0 10px ${accentColor}20`,
                }}
                initial={{ x: '100%' }}
                animate={{ x: '-100%' }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                  delay: 2,
                }}
              />

              {/* Left border glow */}
              <motion.div
                className="absolute top-0 left-0 bottom-0 w-[1px]"
                style={{
                  background: `linear-gradient(0deg, transparent, ${accentColor}70, transparent)`,
                  boxShadow: `0 0 5px ${accentColor}30, 0 0 10px ${accentColor}20`,
                }}
                initial={{ y: '100%' }}
                animate={{ y: '-100%' }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: 'linear',
                  delay: 3,
                }}
              />
            </div>

            {/* Decorative tech elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div
                className="absolute top-0 left-0 w-full h-1"
                style={{
                  background: `linear-gradient(to right, ${accentColor}00, ${accentColor}70, ${accentColor}00)`,
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-full h-1"
                style={{
                  background: `linear-gradient(to right, ${accentColor}00, ${accentColor}40, ${accentColor}00)`,
                }}
              />

              {/* Circular tech elements */}
              <div
                className="absolute -top-20 -right-20 w-40 h-40 rounded-full"
                style={{ border: `1px solid ${accentColor}20` }}
              />
              <div
                className="absolute -top-10 -right-10 w-20 h-20 rounded-full"
                style={{ border: `1px solid ${accentColor}30` }}
              />
            </div>

            {/* Header bar with minimal design - only close button */}
            <div
              className="border-b px-4 py-2 flex items-center justify-end relative rounded-t-2xl"
              style={gradientHeaderStyle}
            >
              {/* 닫기 버튼 - on right */}
              <button
                onClick={onClose}
                className="transition-colors rounded-full p-1"
                style={{
                  color: `${accentColor}70`,
                  backgroundColor: `${accentColor}10`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = `${accentColor}70`;
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div
              ref={contentRef}
              className="p-4 sm:p-6 md:p-8 overflow-y-auto max-h-[calc(100vh-180px)] sm:max-h-[calc(100vh-160px)] md:max-h-[calc(100vh-160px)] relative"
              style={fontStyle}
            >
              {/* Section title with animated underline - 여백 표준화 */}
              <div className="relative mb-6">
                <motion.h2
                  className="text-base md:text-lg font-normal text-white opacity-100 mb-2 flex items-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0 }}
                >
                  {t(currentSection.title.kr, currentSection.title.en)}
                </motion.h2>
                <motion.div
                  className="h-px"
                  style={{
                    background: `linear-gradient(to right, ${accentColor}, ${accentColor})`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ delay: 0, duration: 0.8 }}
                />
              </div>

              {/* 섹션 설명 추가 */}
              <div className="mb-6">
                <p className="text-white/80 text-sm md:text-base">
                  {activeSection === 'hero'
                    ? t(
                        '한국 최대 프론트엔드 개발 컨퍼런스, FEConf에서 다양한 기술과 트렌드를 경험하세요.',
                        "Experience various technologies and trends at Korea's largest frontend development conference, FEConf."
                      )
                    : t(
                        currentSection.description.kr,
                        currentSection.description.en
                      )}
                </p>
              </div>

              {/* Section specific content */}
              <div>{renderSectionContent()}</div>

              {/* Section button - 후원사 모달에서는 버튼을 내부로 이동시켰으므로 여기서는 표시하지 않음 */}
              {currentSection.button &&
                activeSection !== 'sponsor' &&
                activeSection !== 'speaker' &&
                activeSection !== 'lightning' &&
                activeSection !== 'speaker' &&
                activeSection !== 'lightning' && (
                  <div
                    className="w-full flex justify-center"
                    style={{
                      marginTop:
                        activeSection === 'hero'
                          ? ticketMargin
                          : standardMargin,
                    }}
                  >
                    <Button
                      className="group relative overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-center rounded-[200px]"
                      style={buttonStyle}
                      onMouseEnter={(e) => {
                        Object.assign(e.currentTarget.style, buttonHoverStyle);
                      }}
                      onMouseLeave={(e) => {
                        Object.assign(e.currentTarget.style, buttonStyle);
                      }}
                      onClick={() => {
                        // YouTube 채널 링크 열기
                        window.open(
                          'https://www.youtube.com/@feconfkorea',
                          '_blank',
                          'noopener,noreferrer'
                        );
                      }}
                    >
                      <span className="relative z-10 whitespace-normal text-center px-1">
                        {t(currentSection.button.kr, currentSection.button.en)}
                      </span>
                    </Button>
                  </div>
                )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

// 티켓 컨텐츠 컴포넌트 수정 - 카운트다운 타이머를 상단으로 이동
function TicketContent({
  gradientStart,
  gradientEnd,
}: {
  gradientStart: string;
  gradientEnd: string;
}) {
  const { t, language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // 42dot Sans 폰트 스타일
  const fontStyle = { fontFamily: 'var(--font-42dot)' };

  const [animatedStats, setAnimatedStats] = useState<{
    participants: number;
    subscribers: number;
    views: number;
  }>({
    participants: 0,
    subscribers: 0,
    views: 0,
  });

  // YouTube 채널 링크 열기 함수 추가
  const openYouTubeChannel = () => {
    window.open(
      'https://www.youtube.com/@feconfkorea',
      '_blank',
      'noopener,noreferrer'
    );
  };

  // FEconf 날짜 설정 (2025년 8월 23일)
  useEffect(() => {
    const feconfDate = new Date('2025-08-23T09:00:00+09:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = feconfDate.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    // 초기 계산
    calculateTimeLeft();

    // 1초마다 업데이트
    const timer = setInterval(calculateTimeLeft, 1000);

    // 컴포넌트 언마운트 시 타이머 정리
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Start the animation after a short delay
    const timer = setTimeout(() => {
      // Define the target values
      const targetParticipants = 3200;
      const targetSubscribers = 11000;
      const targetViews = 100000;

      // Animation duration in ms
      const duration = 2000;
      // Number of steps in the animation
      const steps = 30;
      // Time between steps
      const stepTime = duration / steps;

      let currentStep = 0;

      const interval = setInterval(() => {
        currentStep++;

        // Calculate current values based on easeOutQuad function
        const progress = currentStep / steps;
        const easeProgress = 1 - (1 - progress) * (1 - progress); // easeOutQuad

        setAnimatedStats({
          participants: Math.round(targetParticipants * easeProgress),
          subscribers: Math.round(targetSubscribers * easeProgress),
          views: Math.round(targetViews * easeProgress),
        });

        // Stop the animation when we reach the target
        if (currentStep >= steps) {
          clearInterval(interval);
        }
      }, stepTime);

      return () => {
        clearInterval(interval);
      };
    }, 500); // Start after 500ms

    return () => clearTimeout(timer);
  }, []);

  // 통계 데이터
  const stats = [
    {
      icon: <UserRound size={22} />,
      label: t('누적 참가자', 'Total Participants'),
      value: animatedStats.participants.toLocaleString(),
      suffix: t('명', ''),
      prefix: t('약 ', 'about '),
    },
    {
      icon: <Youtube size={22} />,
      label: t('Youtube 구독자', 'Youtube Subscribers'),
      value: animatedStats.subscribers.toLocaleString(),
      suffix: t('명', ''),
    },
    {
      icon: <Eye size={22} />,
      label: t('Youtube 연간 조회 수', 'Youtube Annual Views'),
      value: animatedStats.views.toLocaleString(),
      suffix: t('view', ''),
    },
  ];

  // 그라데이션 배경 스타일
  const gradientBgStyle = {
    backgroundColor: `${gradientStart}10`,
    border: `1px solid ${gradientStart}30`,
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center py-4"
      style={{ maxWidth: '83%', margin: '0 auto', ...fontStyle }}
    >
      {/* 카운트다운 타이머를 상단으로 이동 */}
      <div className="flex flex-col items-center justify-center gap-2 text-white/60 mb-8">
        <div
          className="text-base font-questrial font-bold mb-2"
          style={{ fontWeight: '700' }}
        >
          {t('FEConf 2025까지 남은 시간', 'Time remaining until FEConf 2025')}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <div
              className="text-3xl font-bold text-white"
              style={{ fontWeight: '700' }}
            >
              {timeLeft.days}
            </div>
            <div className="text-sm">{t('일', 'Days')}</div>
          </div>
          <div className="text-2xl font-bold" style={{ fontWeight: '700' }}>
            :
          </div>
          <div className="flex flex-col items-center">
            <div
              className="text-3xl font-bold text-white"
              style={{ fontWeight: '700' }}
            >
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <div className="text-sm">{t('시간', 'Hours')}</div>
          </div>
          <div className="text-2xl font-bold" style={{ fontWeight: '700' }}>
            :
          </div>
          <div className="flex flex-col items-center">
            <div
              className="text-3xl font-bold text-white"
              style={{ fontWeight: '700' }}
            >
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <div className="text-sm">{t('분', 'Minutes')}</div>
          </div>
          <div className="text-2xl font-bold" style={{ fontWeight: '700' }}>
            :
          </div>
          <div className="flex flex-col items-center">
            <div
              className="text-3xl font-bold text-white"
              style={{ fontWeight: '700' }}
            >
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <div className="text-sm">{t('초', 'Seconds')}</div>
          </div>
        </div>
      </div>

      {/* 통계 정보 - 숫자 강조 */}
      <div className="mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center p-4 rounded-xl"
            style={{
              ...gradientBgStyle,
              boxShadow: 'none',
              height: '120px', // Increased height by 20% (from ~100px)
            }}
          >
            <div
              className="text-sm font-bold text-white/60 mb-1 text-center"
              style={{ fontWeight: '700' }}
            >
              {stat.label}
            </div>
            <div className="flex items-baseline justify-center">
              {stat.prefix && (
                <span className="text-white/80 text-base mr-1">
                  {stat.prefix}
                </span>
              )}
              <div className="text-3xl font-extrabold text-white">
                {stat.value}
              </div>
              <span className="text-white/80 text-base ml-1">
                {stat.suffix}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Other content components would follow here...
// SponsorContent, SpeakerContent, LightningContent, DefaultContent

// For brevity, I'll include just one more component as an example
function SponsorContent({
  section,
  gradientStart,
  gradientEnd,
}: {
  section: Section;
  gradientStart: string;
  gradientEnd: string;
}) {
  const { t, language } = useLanguage();
  const [sponsorLogos] = useState([
    { src: '/images/sponsors/oliveyoung.png', alt: 'Olive Young' },
    { src: '/images/sponsors/sponsor1.png', alt: 'Sponsor 1' },
    { src: '/images/sponsors/sponsor2.png', alt: 'Sponsor 2' },
    { src: '/images/sponsors/sponsor3.png', alt: 'Sponsor 3' },
    { src: '/images/sponsors/hyundai.png', alt: 'Hyundai' },
    { src: '/images/sponsors/googlecloud.png', alt: 'Google Cloud' },
  ]);

  // 42dot Sans 폰트 스타일
  const fontStyle = { fontFamily: 'var(--font-42dot)' };

  // 그라데이션 배경 스타일
  const gradientBgStyle = {
    backgroundColor: `${gradientStart}10`,
    border: `1px solid ${gradientStart}30`,
  };

  // 버튼 스타일
  const buttonStyle = {
    background: `#FFFFFF`,
    color: '#0A2463',
    fontWeight: '700',
    fontSize: '1.1rem',
    boxShadow: `0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.1)`,
    minWidth: '36.8%',
    height: '46.2px',
    padding: '0 1.5rem',
  };

  // 버튼 호버 스타일
  const buttonHoverStyle = {
    background: `#FFFFFF`,
    boxShadow: `0 0 20px rgba(255,255,255,0.7), 0 0 40px rgba(255,255,255,0.4), 0 0 60px rgba(255,255,255,0.2)`,
  };

  return (
    <div
      className="w-full flex flex-col justify-center py-2"
      style={{ maxWidth: '83%', margin: '0 auto', ...fontStyle }}
    >
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-visible">
          <div className="flex flex-col justify-center overflow-visible">
            <div className="flex flex-col justify-center overflow-visible">
              <h2
                className="text-2xl md:text-3xl font-extrabold overflow-visible whitespace-normal text-white"
                style={{
                  marginBottom: '1rem',
                  lineHeight: '1.4',
                  maxWidth: '100%',
                  fontWeight: '700',
                }}
              >
                {language === 'kr' ? (
                  <>
                    FECONF25를
                    <br />
                    함께 만들어갈 후원사를
                    <br />
                    모집합니다
                  </>
                ) : (
                  <>
                    We are looking for
                    <br />
                    sponsors to join
                    <br />
                    FECONF25
                  </>
                )}
              </h2>
            </div>

            <div
              className="mt-4 text-base font-bold text-left text-white"
              style={{ fontWeight: '700' }}
            >
              {language === 'kr'
                ? '후원 문의: sponsor@feconf.org'
                : 'Sponsorship inquiry: sponsor@feconf.org'}
            </div>
          </div>

          <div className="flex flex-col">
            <div className="rounded-xl p-4" style={gradientBgStyle}>
              <div className="space-y-3 text-white/90 text-sm">
                <div className="flex items-start">
                  <p>
                    {language === 'kr'
                      ? 'FEConf는 국내외 프론트엔드 개발자들이 한자리에 모여 경험을 나누고, 기술의 흐름을 함께 만들어가는 자리입니다.'
                      : 'FEConf is a place where frontend developers from Korea and abroad gather to share experiences and create technological trends together.'}
                  </p>
                </div>

                <div className="flex items-start">
                  <p>
                    {language === 'kr'
                      ? 'For this event, we are looking for sponsors to communicate with more developers and provide a richer experience.'
                      : 'For this event, we are looking for sponsors to communicate with more developers and provide a richer experience.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 mb-6 overflow-hidden">
          <div
            className="text-xs font-bold mb-4 text-white"
            style={{ fontWeight: '700' }}
          >
            {language === 'kr' ? '역대 후원사 리스트' : 'Previous Sponsors'}
          </div>
          <div className="relative w-full">
            <motion.div
              className="flex items-center"
              animate={{
                x: [0, -1500],
              }}
              transition={{
                x: {
                  duration: 20,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: 'loop',
                  ease: 'linear',
                },
              }}
            >
              {sponsorLogos.map((logo, index) => (
                <div
                  key={`logo-${index}`}
                  className="mx-6 flex-shrink-0 bg-white/5 rounded-lg p-4 flex items-center justify-center"
                  style={{ width: '180px', height: '100px' }}
                >
                  <img
                    src={logo.src || '/placeholder.svg'}
                    alt={logo.alt}
                    className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                    style={{ maxHeight: '70px' }}
                  />
                </div>
              ))}

              {/* 두 번째 세트의 로고들 (무한 루프를 위해 복제) */}
              {sponsorLogos.map((logo, index) => (
                <div
                  key={`logo-dup-${index}`}
                  className="mx-6 flex-shrink-0 bg-white/5 rounded-lg p-4 flex items-center justify-center"
                  style={{ width: '180px', height: '100px' }}
                >
                  <img
                    src={logo.src || '/placeholder.svg'}
                    alt={logo.alt}
                    className="max-w-full max-h-full object-contain filter brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                    style={{ maxHeight: '70px' }}
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* 버튼을 중앙에 배치하고 티켓 모달과 동일한 스타일로 변경 */}
        {section.button && (
          <div
            className="w-full flex justify-center"
            style={{ marginTop: '35px' }}
          >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSdIN9Yum9yOTNxq64uDVKUlxtQMZCPUmvxhQ_3YUGdsFtcVQQ/viewform?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none' }}
            >
              <Button
                className="group relative overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-center rounded-[200px]"
                style={buttonStyle}
                onMouseEnter={(e) => {
                  Object.assign(e.currentTarget.style, buttonHoverStyle);
                }}
                onMouseLeave={(e) => {
                  Object.assign(e.currentTarget.style, buttonStyle);
                }}
              >
                <span className="relative z-10 whitespace-normal text-center px-1">
                  {t(section.button.kr, section.button.en)}
                </span>
              </Button>
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// Define the missing content components
// SpeakerContent 함수를 이전 레이아웃으로 복구합니다.
// 다른 함수들은 그대로 유지합니다.

function SpeakerContent({
  gradientStart,
  gradientEnd,
}: {
  gradientStart: string;
  gradientEnd: string;
}) {
  const { t, language } = useLanguage();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // 42dot Sans 폰트 스타일
  const fontStyle = { fontFamily: 'var(--font-42dot)' };

  // 그라데이션 배경 스타일
  const gradientBgStyle = {
    backgroundColor: `${gradientStart}10`,
    border: `1px solid ${gradientStart}30`,
  };

  // 버튼 스타일
  const buttonStyle = {
    background: `#FFFFFF`,
    color: '#0A2463',
    fontWeight: '700',
    fontSize: '1.1rem',
    boxShadow: `0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.1)`,
    minWidth: '36.8%',
    height: '46.2px',
    padding: '0 1.5rem',
  };

  // 버튼 호버 스타일
  const buttonHoverStyle = {
    background: `#FFFFFF`,
    boxShadow: `0 0 20px rgba(255,255,255,0.7), 0 0 40px rgba(255,255,255,0.4), 0 0 60px rgba(255,255,255,0.2)`,
  };

  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Get section style based on expanded state
  const getSectionStyle = (section: string) => {
    const isExpanded = expandedSection === section;
    return {
      backgroundColor: isExpanded ? `${gradientStart}20` : `${gradientStart}10`,
      borderColor: `${gradientStart}30`,
    };
  };

  // 아코디언 아이템 데이터
  const accordionItems = [
    {
      id: 'how',
      title: {
        kr: '발표는 어떻게 신청하나요?',
        en: 'How to apply for a presentation?',
      },
      content: {
        kr: `프론트엔드와 관련 있는 주제라면 무엇이든 환영합니다.

- 신청방법: 신청하기 버튼 클릭 후 구글폼 작성하여 제출
- 신청기간: 2025.05.16 23:59:59`,
        en: `Any topic related to frontend development is welcome.

- How to apply: Click the Apply button and submit the Google Form
- Application period: Until May 16, 2025, 23:59:59`,
      },
    },
    {
      id: 'purpose',
      title: {
        kr: 'FEConf의 목적은 무엇인가요?',
        en: 'What is the purpose of FEConf?',
      },
      content: {
        kr: `FEConf는 "프론트엔드 개발자에 의한, 프론트엔드 개발자를 위한" 컨퍼런스입니다.
단순한 기술 개요가 아닌, 실제 현장의 경험이 묻어있는 진정성 있는 이야기를 공유합니다.

프론트엔드를 개발하며 마주했던 고민과 해결 방법, 특별한 기술이나 노하우, 팁 등을 FEConf를 통해 여러분께 공유해 주세요.

(FEConf는 특정 법인이 아닌 프론트엔드 개발자들의 자발적인 참여로 이뤄진 비영리 단체에서 운영하고 있습니다.)`,
        en: `FEConf is a conference "by frontend developers, for frontend developers."
We share authentic stories with real-world experience, not just technical overviews.

Please share your concerns, solutions, special techniques, know-how, and tips that you've encountered while developing frontend through FEConf.

(FEConf is operated by a non-profit organization formed by the voluntary participation of frontend developers, not by a specific corporation.)`,
      },
    },
    {
      id: 'topics',
      title: {
        kr: '주제는 무엇이 있나요?',
        en: 'What topics are available?',
      },
      content: {
        kr: `FEConf 채널들을 통해 'FEConf 2025에서 듣고 싶은 주제'를 조사했고, 그중 많이 언급된 주제들을 소개합니다.
주제와 연관이 있을수록 선정될 확률이 높아요. 물론 이 외의 주제도 신청 가능합니다.

- AI와 Frontend
- RSC (React 19)
- Next.js
- Testing
- CSS
- Dev tools (Profiling, Debugging 등)
- React Native
- Design System
- For 주니어
- Web3
- Design Engineering
- WebAssembly
- Accessibility
- Editor
- Svelte
- Local First (Sync Engine)`,
        en: `We surveyed 'Topics you want to hear at FEConf 2025' through FEConf channels, and here are the most mentioned topics.
The more relevant your topic is, the higher the chance of being selected. Of course, you can also apply with other topics.

- AI and Frontend
- RSC (React 19)
- Next.js
- Testing
- CSS
- Dev tools (Profiling, Debugging, etc.)
- React Native
- Design System
- For Juniors
- Web3
- Design Engineering
- WebAssembly
- Accessibility
- Editor
- Svelte
- Local First (Sync Engine)`,
      },
    },
    {
      id: 'schedule',
      title: {
        kr: '행사 일정이 어떻게 되나요?',
        en: 'What is the event schedule?',
      },
      content: {
        kr: `- 날짜: 2025년 8월 23일 (토)
- 장소: 세종대학교 광개토관
- 규모: 약 1200명 예상 (변동 가능성 있음)`,
        en: `- Date: August 23, 2025 (Saturday)
- Venue: Gwanggaeto Building, Sejong University
- Scale: Approximately 1,200 attendees expected (subject to change)`,
      },
    },
  ];

  return (
    <div
      className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
      style={{ maxWidth: '83%', margin: '0 auto', ...fontStyle }}
    >
      {/* 좌측 - 새로운 디자인으로 변경 */}
      <div className="flex flex-col h-full">
        <div
          className="rounded-xl overflow-hidden border flex flex-col h-full relative"
          style={{
            backgroundColor: `transparent`, // 배경색 제거
            borderColor: `${gradientStart}30`,
            boxShadow: `0 0 20px ${gradientStart}20`,
          }}
        >
          {/* 파동 그래픽 배경 */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <WaveAnimation color={gradientStart} />
          </div>

          {/* 콘텐츠 */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
            {/* 타이틀 */}
            <h2
              className="text-xl md:text-2xl font-extrabold overflow-visible whitespace-normal text-white"
              style={{
                marginBottom: '0.75rem',
                lineHeight: '1.4',
                maxWidth: '100%',
                fontWeight: '700',
              }}
            >
              {language === 'kr' ? (
                <>
                  2025 FEConf의
                  <br />
                  주인공이 되어주세요.
                </>
              ) : (
                <>
                  Become the protagonist
                  <br />
                  of 2025 FEConf.
                </>
              )}
            </h2>

            {/* 마감일 정보 추가 */}
            <div className="text-white/70 text-xs mb-6 mt-2">
              {language === 'kr' ? (
                <>
                  제안서 마감: 2025년 5월 16일 23:59:59
                  <br />
                  선정 결과: 6월 중 개별 통보
                </>
              ) : (
                <>
                  Deadline: May 16, 2025, 23:59:59
                  <br />
                  Results will be announced individually in June
                </>
              )}
            </div>

            {/* 버튼 */}
            <div className="mt-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfsCb3yeTBxqXMNgaH-a2U2EsFap9TZRF654lr2SfnA0XE_uQ/viewform?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button
                  className="group relative overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-center rounded-[200px]"
                  style={buttonStyle}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, buttonHoverStyle);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.currentTarget.style, buttonStyle);
                  }}
                >
                  <span className="relative z-10 whitespace-normal text-center px-1">
                    {language === 'kr' ? '신청하기' : 'Apply'}
                  </span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 우측 - 아코디언 컴포넌트 */}
      <div className="flex flex-col space-y-4 w-full">
        {accordionItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl overflow-hidden border"
            style={getSectionStyle(item.id)}
          >
            <button
              className="w-full px-4 py-4 flex justify-between items-center text-left"
              onClick={() => toggleSection(item.id)}
            >
              <span className="text-white font-medium w-full">
                {language === 'kr' ? item.title.kr : item.title.en}
              </span>
              <span className="text-white flex-shrink-0">
                {expandedSection === item.id ? '−' : '+'}
              </span>
            </button>

            {expandedSection === item.id && (
              <div
                className="px-6 pb-6"
                style={{ maxHeight: '300px', overflowY: 'auto' }}
              >
                <div className="text-white/80 text-sm whitespace-pre-line">
                  {language === 'kr' ? item.content.kr : item.content.en}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// 파동 애니메이션 컴포넌트 추가
function WaveAnimation({ color }: { color: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 캔버스 크기 설정
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 파동 애니메이션 설정
    let animationFrameId: number;
    let time = 0;

    // 파동 그리기 함수
    const drawWaves = () => {
      if (!ctx || !canvas) return;

      // 캔버스 초기화
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 파동 설정
      const waves = [
        { amplitude: 20, frequency: 0.02, speed: 0.03, opacity: 0.7 },
        { amplitude: 15, frequency: 0.03, speed: 0.02, opacity: 0.5 },
        { amplitude: 10, frequency: 0.04, speed: 0.04, opacity: 0.3 },
        { amplitude: 25, frequency: 0.01, speed: 0.01, opacity: 0.2 },
      ];

      // 각 파동 그리기
      waves.forEach((wave, index) => {
        ctx.beginPath();

        // 파동 색상 설정 (테마 색상 사용)
        ctx.strokeStyle = color || '#FFFFFF';
        ctx.lineWidth = 1.5;
        ctx.globalAlpha = wave.opacity;

        // 파동 경로 그리기
        for (let x = 0; x < canvas.width; x++) {
          const y =
            canvas.height / 2 +
            Math.sin(x * wave.frequency + time * wave.speed) * wave.amplitude;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      });

      // 시간 업데이트 - 1.5배 빠르게 수정
      time += 0.075;

      // 애니메이션 반복
      animationFrameId = requestAnimationFrame(drawWaves);
    };

    // 애니메이션 시작
    drawWaves();

    // 컴포넌트 언마운트 시 정리
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color]);

  return <canvas ref={canvasRef} className="w-full h-full" />;
}

// LightningContent 함수를 새로운 레이아웃으로 수정
function LightningContent({
  gradientStart,
  gradientEnd,
}: {
  gradientStart: string;
  gradientEnd: string;
}) {
  const { t, language } = useLanguage();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // 42dot Sans 폰트 스타일
  const fontStyle = { fontFamily: 'var(--font-42dot)' };

  // 그라데이션 배경 스타일
  const gradientBgStyle = {
    backgroundColor: `${gradientStart}10`,
    border: `1px solid ${gradientStart}30`,
  };

  // 버튼 스타일
  const buttonStyle = {
    background: `#FFFFFF`,
    color: '#0A2463',
    fontWeight: '700',
    fontSize: '1.1rem',
    boxShadow: `0 0 15px rgba(255,255,255,0.5), 0 0 30px rgba(255,255,255,0.3), 0 0 45px rgba(255,255,255,0.1)`,
    minWidth: '36.8%',
    height: '46.2px',
    padding: '0 1.5rem',
  };

  // 버튼 호버 스타일
  const buttonHoverStyle = {
    background: `#FFFFFF`,
    boxShadow: `0 0 20px rgba(255,255,255,0.7), 0 0 40px rgba(255,255,255,0.4), 0 0 60px rgba(255,255,255,0.2)`,
  };

  // Toggle section expansion
  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  // Get section style based on expanded state
  const getSectionStyle = (section: string) => {
    const isExpanded = expandedSection === section;
    return {
      backgroundColor: isExpanded ? `${gradientStart}20` : `${gradientStart}10`,
      borderColor: `${gradientStart}30`,
    };
  };

  // 아코디언 아이템 데이터
  const accordionItems = [
    {
      id: 'purpose',
      title: {
        kr: '라이트닝 토크의 목적은 무엇인가요?',
        en: 'What is the purpose of Lightning Talk?',
      },
      content: {
        kr: `컨퍼런스의 어원인 "함께 의논하고 토론하다"를 살려, 더 많은 참가자들이 자유롭게 공감하고 대화를 나누는 자리를 만들었습니다.

10분 동안 본인의 이야기를 솔직하게 나누고, 참석자들과 함께 소통하며 의미 있는 시간을 만드는 과정을 통해 FEConf가 추구하는 '다양성과 포용성'의 가치를 구현하고자 합니다.

아래 주제는 예시입니다. 여러분의 진솔한 이야기를 자유롭게 제안해주세요.

- 프론트엔드 공부, 이렇게 하니 안 되더라고요. 실패 자랑기
- 100곳에 이력서 내며 느낀 것들
- 신입인데… 제가 리딩하라고요?
- AI와 협업하는 나만의 개발 방법`,
        en: `Embracing the original meaning of "conference" - to discuss and debate together - we've created a space where more participants can freely empathize and engage in conversation.

Through the process of honestly sharing your story for 10 minutes and creating meaningful time by communicating with attendees, we aim to implement FEConf's values of 'diversity and inclusion'.

The topics below are examples. Please feel free to propose your own authentic stories.

- Frontend study failures: what didn't work for me
- What I learned from submitting resumes to 100 companies
- I'm a newcomer... and I'm supposed to lead?
- My own development methods collaborating with AI`,
      },
    },
    {
      id: 'who',
      title: {
        kr: '누가 발표할 수 있나요?',
        en: 'Who can present?',
      },
      content: {
        kr: `프론트엔드 개발과 관련된 경험을 공유하고 싶은 모든 분들입니다.

- 공부하면서 얻은 통찰을 나누고 싶은 대학생
- 취업 준비 과정에서 배운 점을 나누고 싶은 분
- 다양한 도전과 성장을 경험한 주니어 개발자
- 본인의 프론트엔드 개발 경험을 나누고 싶은 모든 분`,
        en: `Anyone who wants to share experiences related to frontend development.

- College students who want to share insights gained while studying
- Those who want to share what they learned during job preparation
- Junior developers who have experienced various challenges and growth
- Anyone who wants to share their frontend development experience`,
      },
    },
    {
      id: 'first',
      title: {
        kr: '발표가 처음인데 괜찮을까요?',
        en: 'Is it okay if this is my first presentation?',
      },
      content: {
        kr: `걱정 마세요! 핵심 메시지 정리와 발표 연습을 위한 사전 워크숍이 진행됩니다.
다른 발표자들과 피드백을 나누며 더욱 자신감 있게 준비할 수 있습니다.

프론트엔드 개발 과정에서 마주한 도전, 해결방법, 특별한 기술이나 노하우, 팁 등 여러분의 경험을 FEConf와 공유해 주세요.

만약 궁금한 점이 있다면 언제든지 feconf@googlegroups.com로 문의 부탁드립니다.`,
        en: `Don't worry! A pre-workshop will be held to organize key messages and practice presentations.
You can prepare with more confidence by sharing feedback with other presenters.

Please share your experiences with FEConf, such as challenges faced during frontend development, solutions, special techniques or know-how, tips, etc.

If you have any questions, please feel free to contact us at feconf@googlegroups.com.`,
      },
    },
  ];

  return (
    <div
      className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
      style={{ maxWidth: '83%', margin: '0 auto', ...fontStyle }}
    >
      {/* 좌측 - 제목과 부제목 */}
      <div className="flex flex-col h-full">
        <div
          className="rounded-xl overflow-hidden border flex flex-col h-full relative"
          style={{
            backgroundColor: `transparent`,
            borderColor: `${gradientStart}30`,
            boxShadow: `0 0 20px ${gradientStart}20`,
          }}
        >
          {/* 파동 그래픽 배경 */}
          <div className="absolute inset-0 overflow-hidden opacity-30">
            <WaveAnimation color={gradientStart} />
          </div>

          {/* 콘텐츠 */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full p-8 text-center">
            {/* 타이틀 */}
            <h2
              className="text-xl md:text-2xl font-extrabold overflow-visible whitespace-normal text-white"
              style={{
                marginBottom: '0.75rem',
                lineHeight: '1.4',
                maxWidth: '100%',
                fontWeight: '700',
              }}
            >
              {language === 'kr' ? (
                <>
                  단 10분,
                  <br />
                  짧지만 강렬하게
                  <br />
                  모두와 소통하세요
                </>
              ) : (
                'Just 10 minutes, communicate with everyone briefly but intensely'
              )}
            </h2>

            {/* 마감일 정보 추가 */}
            <div className="text-white/70 text-xs mb-6 mt-2">
              {language === 'kr' ? (
                <>
                  제안서 마감: 2025년 5월 16일 23:59:59
                  <br />
                  선정 결과: 6월 중 개별 통보
                </>
              ) : (
                <>
                  Deadline: May 16, 2025, 23:59:59
                  <br />
                  Results will be announced individually in June
                </>
              )}
            </div>

            {/* 버튼 */}
            <div className="mt-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfsCb3yeTBxqXMNgaH-a2U2EsFap9TZRF654lr2SfnA0XE_uQ/viewform?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button
                  className="group relative overflow-hidden transition-all duration-300 ease-in-out flex items-center justify-center rounded-[200px]"
                  style={buttonStyle}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, buttonHoverStyle);
                  }}
                  onMouseLeave={(e) => {
                    Object.assign(e.currentTarget.style, buttonStyle);
                  }}
                >
                  <span className="relative z-10 whitespace-normal text-center px-1">
                    {language === 'kr' ? '신청하기' : 'Apply'}
                  </span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 우측 - 아코디언 컴포넌트 */}
      <div className="flex flex-col space-y-4 w-full">
        {accordionItems.map((item) => (
          <div
            key={item.id}
            className="rounded-xl overflow-hidden border"
            style={getSectionStyle(item.id)}
          >
            <button
              className="w-full px-4 py-4 flex justify-between items-center text-left"
              onClick={() => toggleSection(item.id)}
            >
              <span className="text-white font-medium w-full">
                {language === 'kr' ? item.title.kr : item.title.en}
              </span>
              <span className="text-white flex-shrink-0">
                {expandedSection === item.id ? '−' : '+'}
              </span>
            </button>

            {expandedSection === item.id && (
              <div
                className="px-6 pb-6"
                style={{ maxHeight: '300px', overflowY: 'auto' }}
              >
                <div className="text-white/80 text-sm whitespace-pre-line">
                  {language === 'kr' ? item.content.kr : item.content.en}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function DefaultContent({
  section,
  showDetails,
  gradientStart,
  gradientEnd,
}: {
  section: Section;
  showDetails: boolean;
  gradientStart: string;
  gradientEnd: string;
}) {
  return (
    <div>
      <h2>Default Content</h2>
      {/* Add your default content here */}
    </div>
  );
}
