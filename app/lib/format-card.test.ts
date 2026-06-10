import { describe, expect, it } from 'vitest'

import {
  formatCardCvc,
  formatCardExpiry,
  formatCardNumber,
} from '@/lib/format-card'

describe('formatCardNumber', () => {
  it('groups digits in fours', () => {
    expect(formatCardNumber('4242424242424242')).toBe('4242 4242 4242 4242')
  })

  it('strips non-digits and limits length', () => {
    expect(formatCardNumber('4242-4242-4242-4242-9999')).toBe(
      '4242 4242 4242 4242'
    )
  })
})

describe('formatCardExpiry', () => {
  it('inserts slash after month', () => {
    expect(formatCardExpiry('1228')).toBe('12/28')
    expect(formatCardExpiry('1')).toBe('1')
  })
})

describe('formatCardCvc', () => {
  it('keeps up to four digits', () => {
    expect(formatCardCvc('12a34')).toBe('1234')
    expect(formatCardCvc('12345')).toBe('1234')
  })
})
