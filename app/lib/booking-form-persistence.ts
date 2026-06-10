import {
  BOOKING_DRAFT_STORAGE_KEY,
  BOOKING_FORM_DEFAULTS,
} from '@/constants/booking-form'
import type { BookingFormStateType } from '@/types/booking-form'

type BookingDraft = {
  values: BookingFormStateType
  updatedAt: string
}

const isBrowser = () => typeof window !== 'undefined'

export const normalizeBookingDraftValues = (
  values: Partial<BookingFormStateType> & Record<string, unknown>
): BookingFormStateType => {
  const hasModernAddOnIds = Array.isArray(values.addOnIds)
  const legacyAddOnId =
    typeof values.addOnId === 'string' ? values.addOnId : ''

  const merged = {
    ...BOOKING_FORM_DEFAULTS,
    ...values,
  } as BookingFormStateType & Record<string, unknown>

  if (!hasModernAddOnIds && legacyAddOnId) {
    merged.addOnIds =
      legacyAddOnId !== 'none' ? [legacyAddOnId] : ['none']
  } else if (!Array.isArray(merged.addOnIds)) {
    merged.addOnIds = ['none']
  }

  return merged
}

export const readBookingDraft = (): BookingDraft | null => {
  if (!isBrowser()) return null

  try {
    const raw = window.localStorage.getItem(BOOKING_DRAFT_STORAGE_KEY)
    if (!raw) return null

    const parsed = JSON.parse(raw) as BookingDraft
    if (!parsed?.values || typeof parsed.values !== 'object') return null

    return {
      values: normalizeBookingDraftValues(parsed.values),
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    }
  } catch {
    return null
  }
}

export const writeBookingDraft = (values: BookingFormStateType) => {
  if (!isBrowser()) return

  const draft: BookingDraft = {
    values,
    updatedAt: new Date().toISOString(),
  }

  window.localStorage.setItem(BOOKING_DRAFT_STORAGE_KEY, JSON.stringify(draft))
}

export const clearBookingDraft = () => {
  if (!isBrowser()) return
  window.localStorage.removeItem(BOOKING_DRAFT_STORAGE_KEY)
}
