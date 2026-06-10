import { describe, expect, it } from 'vitest'

import {
  isBookingReadyToSubmit,
  isCheckoutStepValid,
  isContactDetailsValid,
  isPaymentStepValid,
} from '@/lib/booking-form-validation'
import { createBookingFormValues } from '@/lib/test-fixtures'

describe('isContactDetailsValid', () => {
  it('accepts complete contact details', () => {
    expect(
      isContactDetailsValid({
        name: 'John',
        phone: '15550001234',
        email: 'john@test.com',
      })
    ).toBe(true)
  })

  it('rejects invalid email or short phone', () => {
    expect(
      isContactDetailsValid({
        name: 'John',
        phone: '123',
        email: 'bad-email',
      })
    ).toBe(false)
  })
})

describe('isPaymentStepValid', () => {
  it('requires payment method', () => {
    expect(isPaymentStepValid({ paymentMethod: '' })).toBe(false)
    expect(isPaymentStepValid({ paymentMethod: 'visa' })).toBe(true)
  })

  it('requires positive custom tip', () => {
    expect(
      isPaymentStepValid({
        paymentMethod: 'visa',
        tipOption: 'custom',
        tipCustomAmount: '$0',
      })
    ).toBe(false)

    expect(
      isPaymentStepValid({
        paymentMethod: 'visa',
        tipOption: 'custom',
        tipCustomAmount: '$12',
      })
    ).toBe(true)
  })
})

describe('isCheckoutStepValid', () => {
  it('skips card validation for cash', () => {
    expect(
      isCheckoutStepValid(createBookingFormValues({ paymentMethod: 'cash' }))
    ).toBe(true)
  })

  it('requires card fields for card payments', () => {
    expect(isCheckoutStepValid(createBookingFormValues())).toBe(true)
    expect(
      isCheckoutStepValid(
        createBookingFormValues({
          cardNumber: '4242',
          cardExpiry: '1228',
        })
      )
    ).toBe(false)
  })
})

describe('isBookingReadyToSubmit', () => {
  it('returns true for a complete booking', () => {
    expect(isBookingReadyToSubmit(createBookingFormValues(), false)).toBe(true)
  })

  it('blocks while submitting', () => {
    expect(isBookingReadyToSubmit(createBookingFormValues(), true)).toBe(false)
  })
})
