import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Hyreshjälpen - Enkel fastighetshantering för småskaliga hyresvärdar',
  description: 'Allt du behöver för att vara en bra hyresvärd — utan pappersröran. Håll koll på hyresgäster, hyror och felanmälningar.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="sv">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
