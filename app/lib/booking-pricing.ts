import { BOOKING_VAT_RATE } from '@/constants/booking-pricing'
import type { BookingService } from '@/lib/mock-booking-api'

export type BookingPriceLineItem = {
  label: string
  amount: number
}

export type BookingPriceBreakdown = {
  subtotal: number
  tip: number
  vat: number
  total: number
  vatRate: number
  lineItems: BookingPriceLineItem[]
}

export const formatMoney = (amount: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)

export const calculateTipAmount = (
  subtotal: number,
  tipOption: string,
  tipCustomAmount: string
) => {
  if (tipOption === 'none') return 0

  if (tipOption === 'custom') {
    const amount = Number.parseFloat(tipCustomAmount.replace(/[^\d.]/g, ''))
    return Number.isFinite(amount) ? amount : 0
  }

  const percent = Number.parseInt(tipOption, 10)
  if (!Number.isFinite(percent)) return 0

  return Math.round(subtotal * percent) / 100
}

export const calculateBookingPriceBreakdown = (
  service: BookingService | undefined,
  addOnIds: string[],
  tipOption: string,
  tipCustomAmount: string
): BookingPriceBreakdown => {
  const servicePrice = service?.price ?? 0
  const selectedAddOns =
    service?.addOns.filter(
      (addOn) => addOnIds.includes(addOn.id) && addOn.id !== 'none'
    ) ?? []
  const addOnsTotal = selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0)
  const subtotal = servicePrice + addOnsTotal

  const lineItems: BookingPriceLineItem[] = [
    ...(servicePrice > 0
      ? [{ label: service?.title ?? 'Service', amount: servicePrice }]
      : []),
    ...selectedAddOns.map((addOn) => ({
      label: addOn.title,
      amount: addOn.price,
    })),
  ]

  const tip = calculateTipAmount(subtotal, tipOption, tipCustomAmount)
  const vat = Math.round(subtotal * BOOKING_VAT_RATE * 100) / 100
  const total = Math.round((subtotal + vat + tip) * 100) / 100

  return {
    subtotal,
    tip,
    vat,
    total,
    vatRate: BOOKING_VAT_RATE,
    lineItems,
  }
}
