import { describe, expect, it } from 'vitest'

import { formatPhoneMask } from '@/lib/format-phone-mask'

describe('formatPhoneMask', () => {
  it('prefixes plus and groups digits', () => {
    expect(formatPhoneMask('15550001234')).toBe('+155 500 012 34')
  })

  it('returns empty string for empty input', () => {
    expect(formatPhoneMask('')).toBe('')
  })
})
