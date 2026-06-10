import { describe, expect, it } from 'vitest'

import { normalizeBookingDraftValues } from '@/lib/booking-form-persistence'

describe('normalizeBookingDraftValues', () => {
  it('migrates legacy addOnId to addOnIds array', () => {
    expect(
      normalizeBookingDraftValues({
        addOnId: 'razor-line',
      }).addOnIds
    ).toEqual(['razor-line'])
  })

  it('defaults legacy none add-on to array', () => {
    expect(
      normalizeBookingDraftValues({
        addOnId: 'none',
      }).addOnIds
    ).toEqual(['none'])
  })

  it('keeps existing addOnIds array', () => {
    expect(
      normalizeBookingDraftValues({
        addOnIds: ['razor-line', 'head-massage'],
      }).addOnIds
    ).toEqual(['razor-line', 'head-massage'])
  })
})
