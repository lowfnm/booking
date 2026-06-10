import { requiresCardEntry } from '@/constants/payment'
import type { BookingFormStateType } from '@/types/booking-form'

export const isContactDetailsValid = ({
  name = '',
  phone = '',
  email = '',
}: Pick<BookingFormStateType, 'name' | 'phone' | 'email'>) =>
  Boolean(name.trim()) &&
  phone.replace(/\D/g, '').length >= 10 &&
  /\S+@\S+\.\S+/.test(email)

export const isPaymentStepValid = ({
  paymentMethod = '',
  tipOption = 'none',
  tipCustomAmount = '',
}: Pick<
  BookingFormStateType,
  'paymentMethod' | 'tipOption' | 'tipCustomAmount'
>) => {
  if (!paymentMethod) return false

  if (tipOption !== 'custom') return true

  const amount = Number.parseFloat(tipCustomAmount.replace(/[^\d.]/g, ''))
  return Number.isFinite(amount) && amount > 0
}

export const isCheckoutStepValid = (values: BookingFormStateType) => {
  if (!requiresCardEntry(values.paymentMethod)) return true

  const {
    cardholderName = '',
    cardNumber = '',
    cardExpiry = '',
    cardCvc = '',
  } = values

  return (
    cardholderName.trim().length > 1 &&
    cardNumber.replace(/\D/g, '').length >= 15 &&
    /^\d{2}\/\d{2}$/.test(cardExpiry) &&
    cardCvc.length >= 3
  )
}

export const isBookingReadyToSubmit = (
  values: BookingFormStateType,
  isSubmitting: boolean
) => {
  const { customer, location, dateTime, serviceId } = values

  return (
    Boolean(customer && location && dateTime && serviceId) &&
    isContactDetailsValid(values) &&
    isPaymentStepValid(values) &&
    isCheckoutStepValid(values) &&
    !isSubmitting
  )
}
