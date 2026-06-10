import { describe, expect, it } from 'vitest'

import {
  buildServiceSummary,
  NONE_ADD_ON_ID,
  toggleAddOnIds,
} from '@/lib/service-add-ons'
import { mockBookingService } from '@/lib/test-fixtures'

describe('toggleAddOnIds', () => {
  it('selects none exclusively', () => {
    expect(toggleAddOnIds(['razor-line'], NONE_ADD_ON_ID)).toEqual(['none'])
  })

  it('supports multi-select', () => {
    expect(toggleAddOnIds(['none'], 'razor-line')).toEqual(['razor-line'])
    expect(toggleAddOnIds(['razor-line'], 'head-massage')).toEqual([
      'razor-line',
      'head-massage',
    ])
  })

  it('toggles off selected add-ons and falls back to none', () => {
    expect(toggleAddOnIds(['razor-line', 'head-massage'], 'razor-line')).toEqual(
      ['head-massage']
    )
    expect(toggleAddOnIds(['razor-line'], 'razor-line')).toEqual(['none'])
  })
})

describe('buildServiceSummary', () => {
  it('builds service-only summary', () => {
    expect(buildServiceSummary(mockBookingService, ['none'])).toBe('Skin fade')
  })

  it('joins selected add-ons', () => {
    expect(
      buildServiceSummary(mockBookingService, ['razor-line', 'head-massage'])
    ).toBe('Skin fade + Razor line-up + Head massage')
  })
})
