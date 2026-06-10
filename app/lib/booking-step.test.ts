import { describe, expect, it } from 'vitest'

import {
  clampStepToProgress,
  formatStepParam,
  getMaxAllowedStep,
  getNextBookingStep,
  isCanonicalStepParam,
  parseStepParam,
  stepIsSubmit,
} from '@/lib/booking-step'
import { createBookingFormValues } from '@/lib/test-fixtures'

describe('parseStepParam', () => {
  it('parses canonical step params', () => {
    expect(parseStepParam('3-date-time')).toBe(3)
    expect(parseStepParam('7-checkout')).toBe(7)
  })

  it('falls back for invalid values', () => {
    expect(parseStepParam(null)).toBe(1)
    expect(parseStepParam('abc')).toBe(1)
    expect(parseStepParam('99-unknown')).toBe(7)
  })
})

describe('formatStepParam', () => {
  it('formats step slugs', () => {
    expect(formatStepParam(6)).toBe('6-payment')
    expect(isCanonicalStepParam('6-payment', 6)).toBe(true)
  })
})

describe('getNextBookingStep', () => {
  it('returns the next configured step', () => {
    expect(getNextBookingStep(5)).toBe(6)
    expect(getNextBookingStep(7)).toBeUndefined()
  })
})

describe('stepIsSubmit', () => {
  it('marks checkout as submit step', () => {
    expect(stepIsSubmit(6)).toBe(false)
    expect(stepIsSubmit(7)).toBe(true)
  })
})

describe('getMaxAllowedStep', () => {
  it('gates progress by filled form data', () => {
    expect(getMaxAllowedStep({})).toBe(1)
    expect(getMaxAllowedStep({ customer: 'New' })).toBe(2)
    expect(
      getMaxAllowedStep(
        createBookingFormValues({
          paymentMethod: '',
        })
      )
    ).toBe(6)
    expect(getMaxAllowedStep(createBookingFormValues())).toBe(7)
  })
})

describe('clampStepToProgress', () => {
  it('clamps requested step to allowed progress', () => {
    expect(clampStepToProgress(7, { customer: 'New' })).toBe(2)
    expect(clampStepToProgress(4, createBookingFormValues())).toBe(4)
  })
})
