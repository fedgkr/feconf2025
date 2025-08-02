'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../language-provider';
import type { Theme } from '@/lib/themes';

interface CodeOfConductCardProps {
  theme: Theme;
}

export default function CodeOfConductCard({ theme }: CodeOfConductCardProps) {
  const { t, language } = useLanguage();

  const conductItems = [
    {
      title: {
        kr: '다양성',
        en: 'Diversity',
      },
      content: {
        kr: 'FEConf는 개개인의 정체성과 개성 및 취향을 존중합니다. 하지만 성별, 성 정체성, 외모, 인종, 종교, 지역, 장애, 나이, 국가, 학벌 등에 대한 혐오와 폭력은 어떤 방식이라도 허용하지 않습니다.',
        en: 'FEConf respects individual identity, personality, and preferences. However, hatred and violence based on gender, sexual identity, appearance, race, religion, region, disability, age, nationality, academic background, etc. are not tolerated in any form.',
      },
    },
    {
      title: {
        kr: '사회적 책임',
        en: 'Social Responsibility',
      },
      content: {
        kr: 'FEConf참여자는 프론트엔드 분야의 성장에 대한 사회적 책임을 가집니다. 내가 알고 있는 지식은 아무리 작은 것이라도 다른 누군가에게 도움을 줄 수 있습니다. 이를 다양한 방법으로 공유하세요.',
        en: 'FEConf participants have social responsibility for the growth of the frontend field. Even the smallest knowledge you have can help someone else. Share it in various ways.',
      },
    },
    {
      title: {
        kr: '서로 돕고 협력하기',
        en: 'Mutual Help and Cooperation',
      },
      content: {
        kr: '참여자들의 다양한 배경은 FEConf의 큰 자산입니다. 서로 다른 경험과 관점을 존중하며, 도움이 필요한 분들을 먼저 도와주고, 모든 참여자가 자신의 생각을 자유롭게 표현할 수 있는 포용적인 환경을 만들어 주세요.',
        en: "Participants' diverse backgrounds are a great asset to FEConf. Please respect different experiences and perspectives, help those in need, and work together to create an inclusive environment where everyone can freely express their thoughts.",
      },
    },
    {
      title: {
        kr: '지식 재산권 및 개인 정보',
        en: 'Intellectual Property and Personal Information',
      },
      content: {
        kr: 'FEConf는 지식 재산권과 개인 정보 등의 권리를 존중합니다. 지식 재산권을 위배하거나 개인 정보를 침해하는 어떠한 콘텐츠도 FEConf에서 사용할 수 없습니다.',
        en: 'FEConf respects rights such as intellectual property and personal information. Any content that violates intellectual property rights or infringes on personal information cannot be used at FEConf.',
      },
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <h2 className="font-bold text-white mb-4 tracking-tight text-xl">
          {language === 'kr' ? (
            <>
              참여하시는 모든 분들은
              <br />
              다음 사항을 준수해주세요
            </>
          ) : (
            <>
              Everyone participating in FEConf
              <br />
              must comply with the following
            </>
          )}
        </h2>
      </div>

      {/* Code of Conduct 항목들 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {conductItems.map((item, index) => (
          <motion.div
            key={index}
            className="p-6 rounded-xl bg-gray-900/30 backdrop-blur-md border border-gray-800"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
          >
            <h4
              className="text-xl font-bold text-white mb-4"
              style={{ fontWeight: '700' }}
            >
              {language === 'kr' ? item.title.kr : item.title.en}
            </h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {language === 'kr' ? item.content.kr : item.content.en}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
