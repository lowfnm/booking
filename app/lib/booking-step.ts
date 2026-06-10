import { BOOKING_STEPS, MAX_BOOKING_STEP } from '@/constants/booking-steps'
import {
  isContactDetailsValid,
  isPaymentStepValid,
} from '@/lib/booking-form-validation'
import type { BookingFormStateType } from '@/types/booking-form'

export const getBookingStepMeta = (step: number) =>
  BOOKING_STEPS.find((item) => item.step === step) ?? BOOKING_STEPS[0]

export const getNextBookingStep = (step: number) => {
  const index = BOOKING_STEPS.findIndex((item) => item.step === step)
  return BOOKING_STEPS[index + 1]?.step
}

export const stepShowsFooter = (step: number) =>
  getBookingStepMeta(step).showFooter

export const stepIsSubmit = (step: number) => {
  const meta = getBookingStepMeta(step)
  return 'isSubmit' in meta && meta.isSubmit === true
}

export const getStepNextFields = (step: number) => {
  const meta = getBookingStepMeta(step)
  return 'nextFields' in meta ? meta.nextFields : undefined
}

export const formatStepParam = (step: number) => {
  const meta = getBookingStepMeta(step)
  return `${meta.step}-${meta.slug}`
}

export const parseStepParam = (value: string | null) => {
  if (!value) return 1

  const namedMatch = value.match(/^(\d+)-([a-z0-9-]+)$/)
  if (namedMatch) {
    const step = Number.parseInt(namedMatch[1], 10)
    const slug = namedMatch[2]
    const meta = BOOKING_STEPS.find(
      (item) => item.step === step && item.slug === slug
    )
    if (meta) return meta.step
    if (Number.isFinite(step)) {
      return Math.min(MAX_BOOKING_STEP, Math.max(1, step))
    }
  }

  const parsed = Number.parseInt(value, 10)
  if (!Number.isFinite(parsed)) return 1
  return Math.min(MAX_BOOKING_STEP, Math.max(1, parsed))
}

export const isCanonicalStepParam = (value: string | null, step: number) =>
  value === formatStepParam(step)

export const getMaxAllowedStep = (values: Partial<BookingFormStateType>) => {
  if (!values.customer) return 1
  if (!values.location) return 2
  if (!values.dateTime) return 3
  if (!values.serviceId) return 4
  if (!isContactDetailsValid(values as BookingFormStateType)) return 5
  if (!isPaymentStepValid(values as BookingFormStateType)) return 6
  return MAX_BOOKING_STEP
}

export const clampStepToProgress = (
  step: number,
  values: Partial<BookingFormStateType>
) => Math.min(parseStepParam(String(step)), getMaxAllowedStep(values))
