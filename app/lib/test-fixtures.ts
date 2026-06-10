import type { BookingService } from '@/lib/mock-booking-api'
import type { BookingFormStateType } from '@/types/booking-form'

export const mockBookingService: BookingService = {
  id: 'skin-fade',
  title: 'Skin fade',
  description: 'Clean fade',
  category: 'haircuts',
  durationMin: 45,
  price: 40,
  addOns: [
    { id: 'none', title: 'No extra', durationMin: 0, price: 0 },
    { id: 'razor-line', title: 'Razor line-up', durationMin: 5, price: 8 },
    { id: 'head-massage', title: 'Head massage', durationMin: 15, price: 20 },
  ],
}

export const createBookingFormValues = (
  overrides: Partial<BookingFormStateType> = {}
): BookingFormStateType => ({
  customer: 'New',
  location: 'Downtown',
  dateTime: '2026-06-10T12:00:00.000Z',
  serviceId: 'skin-fade',
  addOnIds: ['razor-line'],
  service: 'Skin fade + Razor line-up',
  name: 'John Wick',
  email: 'john@noircrown.bar',
  phone: '15550001234',
  specialRemark: '',
  concern: '',
  paymentMethod: 'visa',
  tipOption: '18',
  tipCustomAmount: '',
  cardNumber: '4242424242424242',
  cardExpiry: '12/28',
  cardCvc: '123',
  cardholderName: 'John Wick',
  ...overrides,
})
