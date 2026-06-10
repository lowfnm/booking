import type { PaymentMethodId } from '@/constants/payment'

export const PAYMENT_ICON_PATHS: Record<PaymentMethodId, string> = {
  cash: '/assets/icons/payment/cash.svg',
  'apple-pay': '/assets/icons/payment/apple-pay.svg',
  'google-pay': '/assets/icons/payment/google-pay.svg',
  visa: '/assets/icons/payment/visa.svg',
  mastercard: '/assets/icons/payment/mastercard.svg',
  amex: '/assets/icons/payment/amex.svg',
}

export const PAYMENT_ICON_DARK_SLOT = new Set<PaymentMethodId>(['apple-pay'])
