import type { Metadata } from 'next'
import { Bubblegum_Sans, Andika } from 'next/font/google'
import './globals.css'

const andika = Andika({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-andika',
})

const bubblegumSans = Bubblegum_Sans({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-bubblegum',
})

export const metadata: Metadata = {
  title: 'PAL Vocabulary Tool',
  description: 'Supplemental learning tool for Class 3 students',
  manifest: '/manifest.json',
  themeColor: '#ef4444',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'PAL Vocab',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${andika.variable} ${bubblegumSans.variable}`}>
      <body className="font-sans antialiased bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  )
}
