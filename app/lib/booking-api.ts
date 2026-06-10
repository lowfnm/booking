import type { BookingFormStateType } from '@/types/booking-form'

export type BookingSubmitResponse = {
  ok: boolean
  data: BookingFormStateType
}

export const submitBooking = async (
  payload: BookingFormStateType
): Promise<BookingSubmitResponse> => {
  const response = await fetch('/api/booking', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!response.ok) {
    throw new Error('Booking submission failed')
  }

  return response.json() as Promise<BookingSubmitResponse>
}
