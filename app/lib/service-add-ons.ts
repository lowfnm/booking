import type { BookingService, ServiceAddOn } from '@/lib/mock-booking-api'

export const NONE_ADD_ON_ID = 'none'

export const getSelectedAddOns = (
  service: BookingService,
  addOnIds: string[]
): ServiceAddOn[] =>
  service.addOns.filter(
    (addOn) => addOnIds.includes(addOn.id) && addOn.id !== NONE_ADD_ON_ID
  )

export const buildServiceSummary = (
  service: BookingService,
  addOnIds: string[]
) => {
  const selectedAddOns = getSelectedAddOns(service, addOnIds)
  if (!selectedAddOns.length) return service.title
  return `${service.title} + ${selectedAddOns.map((addOn) => addOn.title).join(' + ')}`
}

export const toggleAddOnIds = (currentIds: string[], clickedId: string) => {
  if (clickedId === NONE_ADD_ON_ID) return [NONE_ADD_ON_ID]

  const withoutNone = currentIds.filter((id) => id !== NONE_ADD_ON_ID)

  if (withoutNone.includes(clickedId)) {
    const next = withoutNone.filter((id) => id !== clickedId)
    return next.length ? next : [NONE_ADD_ON_ID]
  }

  return [...withoutNone, clickedId]
}
