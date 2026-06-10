import { useMutation } from '@tanstack/react-query'

import { submitBooking } from '@/lib/booking-api'

export const useSubmitBooking = () =>
  useMutation({
    mutationKey: ['booking', 'submit'],
    mutationFn: submitBooking,
  })
