import { describe, expect, it } from 'vitest'

import {
  calculateBookingPriceBreakdown,
  calculateTipAmount,
  formatMoney,
} from '@/lib/booking-pricing'
import { mockBookingService } from '@/lib/test-fixtures'

describe('calculateTipAmount', () => {
  it('returns 0 for no tip', () => {
    expect(calculateTipAmount(100, 'none', '')).toBe(0)
  })

  it('calculates percentage tips', () => {
    expect(calculateTipAmount(100, '15', '')).toBe(15)
    expect(calculateTipAmount(50, '20', '')).toBe(10)
  })

  it('parses custom tip amounts', () => {
    expect(calculateTipAmount(100, 'custom', '$25')).toBe(25)
    expect(calculateTipAmount(100, 'custom', 'invalid')).toBe(0)
  })
})

describe('calculateBookingPriceBreakdown', () => {
  it('sums service, add-ons, vat and tip', () => {
    const breakdown = calculateBookingPriceBreakdown(
      mockBookingService,
      ['razor-line', 'head-massage'],
      '18',
      ''
    )

    expect(breakdown.subtotal).toBe(68)
    expect(breakdown.tip).toBe(12.24)
    expect(breakdown.vat).toBe(5.44)
    expect(breakdown.total).toBe(85.68)
    expect(breakdown.lineItems).toHaveLength(3)
  })

  it('ignores none add-on id', () => {
    const breakdown = calculateBookingPriceBreakdown(
      mockBookingService,
      ['none'],
      'none',
      ''
    )

    expect(breakdown.subtotal).toBe(40)
    expect(breakdown.tip).toBe(0)
  })
})

describe('formatMoney', () => {
  it('formats USD currency', () => {
    expect(formatMoney(85.68)).toBe('$85.68')
  })
})
