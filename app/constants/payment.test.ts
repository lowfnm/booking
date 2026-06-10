import { describe, expect, it } from 'vitest'

import { requiresCardEntry } from '@/constants/payment'

describe('requiresCardEntry', () => {
  it('requires card entry for card brands', () => {
    expect(requiresCardEntry('visa')).toBe(true)
    expect(requiresCardEntry('mastercard')).toBe(true)
    expect(requiresCardEntry('amex')).toBe(true)
  })

  it('skips card entry for wallets and cash', () => {
    expect(requiresCardEntry('apple-pay')).toBe(false)
    expect(requiresCardEntry('google-pay')).toBe(false)
    expect(requiresCardEntry('cash')).toBe(false)
  })
})
