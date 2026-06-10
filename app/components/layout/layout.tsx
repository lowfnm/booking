import type { FC, PropsWithChildren } from 'react'

import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-background">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(154,124,70,0.14),transparent_45%)]" />
      <Header />
      <main className="relative z-10 flex min-h-0 flex-1 overflow-y-auto px-3 py-3 md:px-4 md:py-4">
        <div className="mx-auto flex min-h-0 w-full max-w-[1400px] flex-1 flex-col">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Layout
