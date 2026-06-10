'use client'

import { useForm } from 'react-hook-form'

import { BOOKING_FORM_DEFAULTS } from '@/constants/booking-form'
import type { BookingFormStateType } from '@/types/booking-form'

export const useStorybookBookingForm = (
  defaults?: Partial<BookingFormStateType>
) =>
  useForm<BookingFormStateType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: {
      ...BOOKING_FORM_DEFAULTS,
      ...defaults,
    },
  })
