import type { BookingFormStateType } from '@/types/booking-form'

export const BOOKING_STEP_QUERY_PARAM = 'step'
export const MAX_BOOKING_STEP = 7

export const BOOKING_STEPS = [
  {
    step: 1,
    slug: 'client-type',
    label: 'Client type',
    showFooter: false,
  },
  {
    step: 2,
    slug: 'branch',
    label: 'Branch',
    showFooter: false,
  },
  {
    step: 3,
    slug: 'date-time',
    label: 'Date and time',
    showFooter: true,
    nextFields: ['dateTime'] satisfies (keyof BookingFormStateType)[],
  },
  {
    step: 4,
    slug: 'service',
    label: 'Service',
    showFooter: true,
    nextFields: ['serviceId'] satisfies (keyof BookingFormStateType)[],
  },
  {
    step: 5,
    slug: 'contact',
    label: 'Contact details',
    showFooter: true,
    nextFields: ['name', 'phone', 'email'] satisfies (keyof BookingFormStateType)[],
  },
  {
    step: 6,
    slug: 'payment',
    label: 'Payment',
    showFooter: true,
    nextFields: ['paymentMethod'] satisfies (keyof BookingFormStateType)[],
  },
  {
    step: 7,
    slug: 'checkout',
    label: 'Checkout',
    showFooter: true,
    isSubmit: true,
  },
] as const

export type BookingStepMeta = (typeof BOOKING_STEPS)[number]
export type BookingStepNumber = BookingStepMeta['step']
