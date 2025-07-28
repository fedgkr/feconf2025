import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: 'FEConf2025',
  description: 'The largest frontend development conference in Korea',
  icons: {
    icon: '/metadata/fe2025_fav.png',
  },
  openGraph: {
    title: 'FEConf2025',
    description: 'The largest frontend development conference in Korea',
    images: [
      {
        url: 'https://2025.feconf.kr/metadata/fe2025_og.jpg',
        width: 1200,
        height: 630,
        alt: 'FEConf2025',
      },
    ],
  },
  generator: 'v0.dev',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="w-full h-full">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </head>
      <body className="w-full min-h-screen bg-black text-white">
        <div className="w-full text-white px-0">{children}</div>
      </body>
    </html>
  )
}
