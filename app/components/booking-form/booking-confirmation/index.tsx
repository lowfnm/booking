'use client'

import { format, isValid, parseISO } from 'date-fns'
import { motion } from 'framer-motion'
import { CalendarPlus, Crown } from 'lucide-react'
import { useMemo } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { SUPPORT_PHONE } from '@/constants'
import { buildCalendarEvent, downloadIcsFile } from '@/lib/calendar-event'
import { useServices } from '@/lib/queries/use-booking-options'

type BookingConfirmationProps = {
  name: string
  customer: string
  location: string
  service: string
  serviceId: string
  addOnIds: string[]
  dateTime: string
}

const DetailRow = ({
  label,
  value,
  className,
  valueClassName,
}: {
  label: string
  value: string
  className?: string
  valueClassName?: string
}) => (
  <div
    className={`rounded-lg border border-border/70 bg-secondary/30 px-3 py-2.5 ${className ?? ''}`}
  >
    <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
      {label}
    </p>
    <p
      className={`mt-0.5 text-sm font-medium leading-snug text-foreground ${valueClassName ?? ''}`}
      title={value}
    >
      {value}
    </p>
  </div>
)

const BookingConfirmation = ({
  name,
  customer,
  location,
  service,
  serviceId,
  addOnIds,
  dateTime,
}: BookingConfirmationProps) => {
  const servicesQuery = useServices()

  const parsedDateTime = dateTime ? parseISO(dateTime) : null
  const formattedDateTime =
    parsedDateTime && isValid(parsedDateTime)
      ? format(parsedDateTime, 'dd MMM yyyy · HH:mm')
      : ''

  const durationMin = useMemo(() => {
    const selectedService = servicesQuery.data?.find(
      (item) => item.id === serviceId
    )
    if (!selectedService) return 60

    const selectedAddOns = selectedService.addOns.filter(
      (item) => addOnIds.includes(item.id) && item.id !== 'none'
    )

    return (
      selectedService.durationMin +
      selectedAddOns.reduce((sum, addOn) => sum + addOn.durationMin, 0)
    )
  }, [addOnIds, serviceId, servicesQuery.data])

  const calendarEvent = useMemo(() => {
    if (!parsedDateTime || !isValid(parsedDateTime)) return null

    return buildCalendarEvent({
      title: `Noir Crown — ${service}`,
      start: parsedDateTime,
      durationMin,
      description: [
        `Guest: ${name || customer}`,
        `Service: ${service}`,
        `Branch: ${location}`,
        '',
        'We recommend arriving five minutes early.',
      ].join('\n'),
      location: `Noir Crown Barber Atelier · ${location}`,
    })
  }, [customer, durationMin, location, name, parsedDateTime, service])

  const handleAddToCalendar = () => {
    if (!calendarEvent) return
    downloadIcsFile(calendarEvent.icsContent, 'noir-crown-appointment.ics')
  }

  const handleOpenGoogleCalendar = () => {
    if (!calendarEvent) return
    window.open(
      calendarEvent.googleCalendarUrl,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const greeting = name ? `${name}, your chair awaits` : 'Your chair awaits'

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="mx-auto w-full max-w-2xl"
    >
      <Card className="overflow-hidden border-border/80">
        <CardContent className="px-5 py-5 text-center sm:px-8 sm:py-6">
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.08, duration: 0.4, ease: 'easeOut' }}
            className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10 shadow-[0_0_40px_rgba(154,124,70,0.18)]"
          >
            <Crown className="h-8 w-8 text-primary" strokeWidth={1.25} />
          </motion.div>

          <p className="text-[11px] uppercase tracking-[0.2em] text-primary">
            Reservation confirmed
          </p>
          <h2 className="mt-2 text-balance text-xl font-semibold uppercase tracking-[0.12em] text-foreground sm:text-2xl">
            {greeting}
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-snug text-muted-foreground">
            Your appointment is secured. Arrive five minutes early for a calm,
            precise session.
          </p>

          <div className="mt-5 grid gap-2 text-left sm:grid-cols-2">
            <DetailRow label="Guest profile" value={customer} />
            <DetailRow label="Atelier" value={location} />
            <DetailRow label="Scheduled" value={formattedDateTime || '—'} />
            <DetailRow
              label="Service ritual"
              value={service}
              className="sm:col-span-2"
              valueClassName="line-clamp-2"
            />
          </div>

          {calendarEvent && (
            <div className="mt-5 grid gap-2 sm:grid-cols-2">
              <Button type="button" onClick={handleAddToCalendar}>
                <CalendarPlus className="mr-2 h-4 w-4" />
                Add to calendar
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={handleOpenGoogleCalendar}
              >
                Google Calendar
              </Button>
            </div>
          )}

          <p className="mt-4 text-[11px] leading-snug text-muted-foreground">
            Need to adjust your visit? Call{' '}
            <a
              href={`tel:${SUPPORT_PHONE}`}
              className="text-primary underline-offset-4 hover:underline"
            >
              {SUPPORT_PHONE}
            </a>
          </p>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default BookingConfirmation
