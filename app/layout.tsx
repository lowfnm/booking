import type { Metadata } from 'next'
import type { ReactNode } from 'react'

import './globals.css'
import Providers from '@/providers'

export const metadata: Metadata = {
  title: 'Noir Crown Barber Atelier | Booking',
  description: 'Premium black-theme booking flow for Noir Crown Barber Atelier',
  icons: {
    icon: '/favicon.ico',
  },
}

type RootLayoutProps = {
  children: ReactNode
}

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" className="dark">
      <body
        className="bg-background text-foreground"
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}

export default RootLayout
