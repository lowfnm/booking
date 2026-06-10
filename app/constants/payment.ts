export const PAYMENT_METHODS = [
  {
    id: 'cash',
    label: 'Cash',
    description: 'Pay at the atelier',
  },
  {
    id: 'apple-pay',
    label: 'Apple Pay',
    description: 'Fast checkout',
  },
  {
    id: 'google-pay',
    label: 'Google Pay',
    description: 'Fast checkout',
  },
  {
    id: 'visa',
    label: 'Visa',
    description: 'Credit or debit',
  },
  {
    id: 'mastercard',
    label: 'Mastercard',
    description: 'Credit or debit',
  },
  {
    id: 'amex',
    label: 'Amex',
    description: 'American Express',
  },
] as const

export const TIP_OPTIONS = [
  { id: 'none', label: 'No tip' },
  { id: '15', label: '15%' },
  { id: '18', label: '18%' },
  { id: '20', label: '20%' },
  { id: 'custom', label: 'Custom' },
] as const

export type PaymentMethodId = (typeof PAYMENT_METHODS)[number]['id']

export const CARD_ENTRY_PAYMENT_METHODS = [
  'visa',
  'mastercard',
  'amex',
] as const satisfies readonly PaymentMethodId[]

export const requiresCardEntry = (method: string) =>
  CARD_ENTRY_PAYMENT_METHODS.includes(
    method as (typeof CARD_ENTRY_PAYMENT_METHODS)[number]
  )
