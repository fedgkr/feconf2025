import type React from 'react';
import type { Metadata } from 'next';
import { Questrial, Orbitron, Zen_Dots } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';

const questrial = Questrial({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-questrial',
  display: 'swap',
});

// Coral Pixels 대신 Orbitron 폰트를 사용 (픽셀 스타일 디지털 폰트)
const orbitron = Orbitron({
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
});

// Zen Dots 폰트 추가
const zenDots = Zen_Dots({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-zen-dots',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'FEConf 2025',
  description: 'The largest frontend development conference in Korea',
  icons: {
    icon: '/metadata/fe2025_fav.png',
  },
  openGraph: {
    title: 'FEConf 2025',
    description: 'The largest frontend development conference in Korea',
    images: [
      {
        url: 'https://2025.feconf.kr/metadata/fe2025_og.jpg',
        width: 1200,
        height: 630,
        alt: 'FEConf 2025',
      },
    ],
  },
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* 42dot Sans 폰트 추가 - CDN에서 로드 */}
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/packages/pretendard/dist/web/static/pretendard.css"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/gh/hyundai-42dot/42dot-font@main/dist/web/css/42dot_font.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${questrial.className} ${questrial.variable} ${orbitron.variable} ${zenDots.variable}`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
