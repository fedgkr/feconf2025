'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, ChevronRight, X } from 'lucide-react';
import { useLanguage } from './language-provider';
import type { Section } from '@/lib/content';

interface ToggleSidebarProps {
  sections: Section[];
  activeSection: string | null;
  onSectionClick: (sectionId: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export default function ToggleSidebar({
  sections,
  activeSection,
  onSectionClick,
  isOpen,
  setIsOpen,
}: ToggleSidebarProps) {
  const { t, language, setLanguage } = useLanguage();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // 기본 UI 색상 상수 추가 (Cosmic Blue 테마의 색상)
  const defaultUIColor = '#FFFFFF';

  // 특정 색상 코드 정의 - 테마와 관계없이 고정 색상 사용
  const contentsColor = defaultUIColor;

  // Sidebar width - defined as a constant for consistent spacing
  const sidebarWidth = 240;
  const collapsedSidebarWidth = 70;

  // 모바일 화면 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    // 초기 체크
    checkMobile();

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        isOpen &&
        !target.closest('.sidebar-container') &&
        !target.closest('.sidebar-toggle')
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen]);

  // 섹션 인덱스에 따른 숫자 반환 (01, 02, 03, 04)
  const getSectionNumber = (index: number) => {
    return `${(index + 1).toString().padStart(2, '0')}`;
  };

  // 모바일 상태를 부모 컴포넌트에 알림
  useEffect(() => {
    // window 객체에 모바일 상태 저장 (전역 상태 공유)
    window.isMobileSidebar = isMobile;

    // 커스텀 이벤트 발생
    const event = new CustomEvent('mobileSidebarChange', {
      detail: { isMobile },
    });
    window.dispatchEvent(event);
  }, [isMobile]);

  return (
    <>
      {/* 모바일용 햄버거 아이콘 */}
      {isMobile && (
        <div className="fixed top-4 left-0 w-[70px] flex justify-center z-50">
          <motion.button
            className="p-3 rounded-full transition-colors duration-200 bg-transparent hover:bg-white/10 sidebar-toggle outline-none"
            style={{ color: 'white' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ rotate: mobileMenuOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Menu size={20} />
          </motion.button>
        </div>
      )}

      {/* 데스크톱용 햄버거 아이콘 */}
      {!isMobile && (
        <div className="fixed top-4 left-0 w-[70px] flex justify-center z-50">
          <motion.button
            className="p-3 rounded-full transition-colors duration-200 bg-transparent hover:bg-white/10 sidebar-toggle outline-none"
            style={{ color: 'white' }}
            onClick={() => setIsOpen(!isOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <Menu size={20} />
          </motion.button>
        </div>
      )}

      {/* 모바일 전체 화면 메뉴 */}
      {isMobile && (
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black/90 backdrop-blur-md z-40 flex flex-col"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              {/* 닫기 버튼 */}
              <div className="absolute top-4 right-4">
                <button
                  className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white outline-none"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              {/* 모바일 메뉴 콘텐츠 */}
              <div className="flex-1 flex flex-col items-center justify-center px-6 pt-16 pb-8">
                {/* 언어 토글 제거 - 헤더에만 표시 */}
                <div
                  className="text-lg font-bold tracking-wider mb-6"
                  style={{ color: contentsColor }}
                >
                  CONTENTS
                </div>

                <div className="w-full max-w-sm space-y-4">
                  {sections.map((section, index) => (
                    <div key={section.id} className="w-full">
                      <button
                        className={`text-left py-4 w-full transition-all duration-200 text-base flex items-center rounded-md ${
                          activeSection === section.id
                            ? `font-bold bg-white/10`
                            : 'text-white/90 hover:bg-white/5 font-medium'
                        }`}
                        style={{
                          color:
                            activeSection === section.id
                              ? contentsColor
                              : undefined,
                        }}
                        onClick={() => {
                          onSectionClick(section.id);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <span className="mr-4 font-sans font-thin tracking-wider">
                          {getSectionNumber(index)}
                        </span>
                        <span className="flex-1">
                          {t(section.title.kr, section.title.en)}
                        </span>
                        <ChevronRight
                          size={16}
                          className={`transition-transform ${
                            activeSection === section.id
                              ? 'opacity-100'
                              : 'opacity-0'
                          }`}
                        />
                      </button>
                      {index < sections.length - 1 && (
                        <div className="h-px bg-white/20 w-full mt-2"></div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="mt-auto pt-8 w-full max-w-sm">
                  {/* 언어 토글 제거 */}
                  <div className="text-sm text-white/50 text-center font-light">
                    <div className="mb-2">© FECONF 2025</div>
                    <div className="h-px bg-white/20 w-full mb-2"></div>
                    <div>SYSTEM VERSION 2.5.0</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* 데스크톱 사이드바 - 모바일에서는 렌더링하지 않음 */}
      {!isMobile && (
        <motion.div
          className="fixed left-0 top-0 bottom-0 z-40 sidebar-container bg-black/30 backdrop-blur-md border-r border-white/10 transition-width duration-300"
          style={{ width: isOpen ? sidebarWidth : collapsedSidebarWidth }}
        >
          <div className="h-full pt-16 overflow-hidden">
            <div className="text-white h-full relative">
              {/* 확장된 사이드바 내용 */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    className="px-6 absolute inset-0 pt-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2, ease: 'easeInOut' }}
                  >
                    <div
                      className="text-sm font-bold tracking-wider mb-2 pl-2"
                      style={{ color: contentsColor }}
                    >
                      CONTENTS
                    </div>

                    <div
                      className="w-full h-px mb-4"
                      style={{ backgroundColor: contentsColor }}
                    ></div>

                    <div className="flex flex-col">
                      {sections.map((section, index) => (
                        <div key={section.id}>
                          <button
                            className={`text-left py-3 w-full transition-all duration-200 text-sm pl-2 flex items-center ${
                              activeSection === section.id
                                ? `font-bold bg-white/10 rounded-none`
                                : 'text-white/90 hover:text-[#92CBDA] hover:bg-white/5 font-medium rounded-md'
                            }`}
                            style={{
                              color:
                                activeSection === section.id
                                  ? contentsColor
                                  : undefined,
                            }}
                            onClick={() => onSectionClick(section.id)}
                          >
                            <span className="mr-3 font-sans font-thin tracking-wider">
                              {getSectionNumber(index)}
                            </span>
                            <span className="flex-1">
                              {t(section.title.kr, section.title.en)}
                            </span>
                            <ChevronRight
                              size={14}
                              className={`transition-transform ${
                                activeSection === section.id
                                  ? 'opacity-100'
                                  : 'opacity-0'
                              }`}
                            />
                          </button>
                          {/* 마지막 항목(후원사 모집) 아래에는 라인 없음 */}
                          {index < sections.length - 1 && (
                            <div className="h-px bg-white/20 w-full"></div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="absolute bottom-8 left-0 right-0 px-6">
                      <div className="text-xs text-white/50 text-left font-light">
                        <div className="mb-2">© FECONF 2025</div>
                        <div className="h-px bg-white/20 w-full mb-2"></div>
                        <div>SYSTEM VERSION 2.5.0</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* 접힌 사이드바 내용 (숫자만 표시) */}
              <AnimatePresence>
                {!isOpen && (
                  <motion.div
                    className="flex flex-col items-center pt-16"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {sections.map((section, index) => (
                      <motion.button
                        key={section.id}
                        className={`p-3 my-2 rounded-full transition-colors duration-200 outline-none ${
                          activeSection === section.id
                            ? 'bg-white/15'
                            : 'bg-transparent hover:bg-white/10'
                        }`}
                        style={{
                          color:
                            activeSection === section.id
                              ? contentsColor
                              : 'white',
                        }}
                        onClick={() => onSectionClick(section.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="font-sans font-thin tracking-wider">
                          {getSectionNumber(index)}
                        </span>
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </>
  );
}
