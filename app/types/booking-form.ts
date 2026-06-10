export type BookingFormStateType = {
  customer: string
  location: string
  dateTime: string
  serviceId: string
  addOnIds: string[]
  service: string
  name: string
  email: string
  phone: string
  specialRemark: string
  concern: string
  paymentMethod: string
  tipOption: string
  tipCustomAmount: string
  cardNumber: string
  cardExpiry: string
  cardCvc: string
  cardholderName: string
} & Record<string, string | string[]>
