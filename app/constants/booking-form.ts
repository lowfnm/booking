import type { BookingFormStateType } from '@/types/booking-form'

export const BOOKING_DRAFT_STORAGE_KEY = 'noir-crown-booking-draft'

export const BOOKING_FORM_DEFAULTS: BookingFormStateType = {
  customer: '',
  location: '',
  dateTime: '',
  serviceId: '',
  addOnIds: ['none'],
  service: '',
  name: '',
  email: '',
  phone: '',
  specialRemark: '',
  concern: '',
  paymentMethod: '',
  tipOption: 'none',
  tipCustomAmount: '',
  cardNumber: '',
  cardExpiry: '',
  cardCvc: '',
  cardholderName: '',
}
