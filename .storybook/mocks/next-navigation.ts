'use client'

import { useMemo } from 'react'

export const useRouter = () =>
  useMemo(
    () => ({
      replace: () => undefined,
      push: () => undefined,
      back: () => undefined,
      forward: () => undefined,
      refresh: () => undefined,
      prefetch: async () => undefined,
    }),
    []
  )

export const usePathname = () => '/'

export const useSearchParams = () => useMemo(() => new URLSearchParams(), [])
