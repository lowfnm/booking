'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

import type { BookingService, ServiceCategory } from '@/lib/mock-booking-api'
import { useServices } from '@/lib/queries/use-booking-options'
import {
  buildServiceSummary,
  getSelectedAddOns,
  NONE_ADD_ON_ID,
  toggleAddOnIds,
} from '@/lib/service-add-ons'
import { cn } from '@/lib/utils'

type ServiceSelectionStepProps = {
  serviceId: string
  addOnIds: string[]
  onChange: (serviceId: string, addOnIds: string[], summary: string) => void
}

type CategoryFilter = 'all' | ServiceCategory

const CATEGORIES: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'combos', label: 'Combos' },
  { id: 'haircuts', label: 'Haircuts' },
  { id: 'beard', label: 'Beard & shaving' },
  { id: 'extras', label: 'Extras & treatment' },
]

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours > 0 && mins > 0) return `${hours}h ${mins}min`
  if (hours > 0) return `${hours}h`
  return `${mins} min`
}

const formatPrice = (price: number) => `$${price}`

const ServiceSelectionStep = ({
  serviceId,
  addOnIds,
  onChange,
}: ServiceSelectionStepProps) => {
  const servicesQuery = useServices()
  const [category, setCategory] = useState<CategoryFilter>('all')

  const services = servicesQuery.data ?? []

  const filteredServices = useMemo(
    () =>
      category === 'all'
        ? services
        : services.filter((service) => service.category === category),
    [category, services]
  )

  const selectedService = useMemo(
    () => services.find((service) => service.id === serviceId) ?? null,
    [serviceId, services]
  )

  const selectedAddOns = useMemo(
    () =>
      selectedService ? getSelectedAddOns(selectedService, addOnIds) : [],
    [addOnIds, selectedService]
  )

  const emitChange = (service: BookingService, nextAddOnIds: string[]) => {
    onChange(service.id, nextAddOnIds, buildServiceSummary(service, nextAddOnIds))
  }

  useEffect(() => {
    if (!services.length || serviceId) return
    const first = filteredServices[0] ?? services[0]
    if (first) emitChange(first, [NONE_ADD_ON_ID])
  }, [filteredServices, serviceId, services])

  useEffect(() => {
    if (!selectedService) return

    const validIds = new Set(selectedService.addOns.map((addOn) => addOn.id))
    const normalized = addOnIds.filter((id) => validIds.has(id))

    if (!normalized.length) {
      emitChange(selectedService, [NONE_ADD_ON_ID])
      return
    }

    if (
      normalized.length !== addOnIds.length ||
      normalized.some((id, index) => id !== addOnIds[index])
    ) {
      emitChange(selectedService, normalized)
    }
  }, [addOnIds, selectedService])

  const totalDuration =
    (selectedService?.durationMin ?? 0) +
    selectedAddOns.reduce((sum, addOn) => sum + addOn.durationMin, 0)
  const totalPrice =
    (selectedService?.price ?? 0) +
    selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0)

  const selectService = (service: BookingService) => {
    emitChange(service, [NONE_ADD_ON_ID])
  }

  const toggleAddOn = (addOnId: string) => {
    if (!selectedService) return
    emitChange(
      selectedService,
      toggleAddOnIds(addOnIds, addOnId)
    )
  }

  if (servicesQuery.isLoading) {
    return (
      <div className="flex min-h-[420px] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (servicesQuery.isError) {
    return <p className="text-sm text-destructive">Failed to load services.</p>
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setCategory(item.id)}
              className={cn(
                'rounded-full border px-3 py-1.5 text-xs uppercase tracking-[0.1em] transition-colors',
                category === item.id
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="max-h-[min(52vh,520px)] space-y-2 overflow-y-auto pr-1">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredServices.map((service) => {
              const isSelected = service.id === serviceId
              return (
                <motion.button
                  key={service.id}
                  type="button"
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  onClick={() => selectService(service)}
                  className={cn(
                    'w-full rounded-lg border p-4 text-left transition-colors',
                    isSelected
                      ? 'border-primary bg-primary/10'
                      : 'border-border bg-secondary/50 hover:border-primary/40 hover:bg-secondary'
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <p className="text-sm font-semibold uppercase tracking-[0.1em] text-foreground">
                        {service.title}
                      </p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {service.description}
                      </p>
                    </div>
                    <p className="shrink-0 text-xs uppercase tracking-[0.08em] text-muted-foreground">
                      {formatDuration(service.durationMin)} /{' '}
                      {formatPrice(service.price)}
                    </p>
                  </div>
                </motion.button>
              )
            })}
          </AnimatePresence>

          {filteredServices.length === 0 && (
            <p className="py-8 text-center text-sm text-muted-foreground">
              No services in this category.
            </p>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedService ? (
          <motion.div
            key={selectedService.id}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="flex flex-col rounded-lg border border-border bg-secondary/30"
          >
            <div className="border-b border-border p-4">
              <p className="text-lg font-semibold uppercase tracking-[0.12em] text-foreground">
                {selectedService.title}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {selectedService.description}
              </p>
            </div>

            <div className="flex-1 p-4">
              <p className="mb-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Add-ons
              </p>
              <div className="space-y-2">
                {selectedService.addOns.map((addOn) => {
                  const isSelected = addOnIds.includes(addOn.id)
                  return (
                    <motion.button
                      key={addOn.id}
                      type="button"
                      whileTap={{ scale: 0.99 }}
                      onClick={() => toggleAddOn(addOn.id)}
                      className={cn(
                        'grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 rounded-lg border px-3 py-2.5 text-left transition-colors',
                        isSelected
                          ? 'border-primary/60 bg-primary/10'
                          : 'border-border/80 bg-background/40 hover:border-primary/30'
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-colors',
                          isSelected
                            ? 'border-primary bg-primary text-primary-foreground'
                            : 'border-border bg-background'
                        )}
                      >
                        {isSelected ? <Check className="h-3 w-3" /> : null}
                      </span>
                      <span className="min-w-0 text-sm leading-snug text-foreground">
                        {addOn.title}
                      </span>
                      <span className="shrink-0 whitespace-nowrap text-right text-xs tabular-nums text-muted-foreground">
                        {addOn.durationMin > 0
                          ? `${formatDuration(addOn.durationMin)} / ${formatPrice(addOn.price)}`
                          : '—'}
                      </span>
                    </motion.button>
                  )
                })}
              </div>
            </div>

            <div className="border-t border-border p-4">
              <div className="mb-4 flex items-end justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
                    Total time
                  </p>
                  <p className="text-sm text-foreground">
                    {formatDuration(totalDuration)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs uppercase tracking-[0.1em] text-muted-foreground">
                    Total
                  </p>
                  <p className="text-2xl font-semibold text-foreground">
                    {formatPrice(totalPrice)}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex min-h-[280px] items-center justify-center rounded-lg border border-dashed border-border p-6 text-sm text-muted-foreground"
          >
            Select a service to configure add-ons.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ServiceSelectionStep
