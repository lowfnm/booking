'use client'

import { format, isValid, parseISO } from 'date-fns'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Crown } from 'lucide-react'
import { useEffect, useState } from 'react'

import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

const PROCESSING_PHASES = [
  'Checking your preferred time',
  'Reserving your chair',
  'Preparing your ritual',
  'Securing the reservation',
] as const

type BookingProcessingStepProps = {
  location: string
  dateTime: string
  service: string
}

const BookingProcessingStep = ({
  location,
  dateTime,
  service,
}: BookingProcessingStepProps) => {
  const [phaseIndex, setPhaseIndex] = useState(0)

  const parsedDateTime = dateTime ? parseISO(dateTime) : null
  const formattedDateTime =
    parsedDateTime && isValid(parsedDateTime)
      ? format(parsedDateTime, 'dd MMM yyyy · HH:mm')
      : ''

  useEffect(() => {
    const interval = window.setInterval(() => {
      setPhaseIndex((prev) =>
        prev < PROCESSING_PHASES.length - 1 ? prev + 1 : prev
      )
    }, 700)

    return () => window.clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      className="w-full"
    >
      <Card className="w-full overflow-hidden border-border/80">
        <CardContent className="flex min-h-[320px] flex-col items-center justify-center px-6 py-12 text-center sm:px-10">
          <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
            <motion.span
              className="absolute inset-0 rounded-full border border-primary/30"
              animate={{ scale: [1, 1.08, 1], opacity: [0.45, 0.9, 0.45] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.span
              className="absolute inset-2 rounded-full border border-primary/20"
              animate={{ scale: [1, 1.12, 1], opacity: [0.25, 0.55, 0.25] }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.35,
              }}
            />
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-primary/40 bg-primary/10">
              <Crown className="h-7 w-7 text-primary" strokeWidth={1.25} />
            </div>
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-primary">
            Preparing your visit
          </p>

          <div className="mt-4 h-8">
            <AnimatePresence mode="wait">
              <motion.p
                key={PROCESSING_PHASES[phaseIndex]}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="text-lg font-medium uppercase tracking-[0.1em] text-foreground"
              >
                {PROCESSING_PHASES[phaseIndex]}
              </motion.p>
            </AnimatePresence>
          </div>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {service}
            {formattedDateTime ? ` · ${formattedDateTime}` : ''}
            {location ? ` · ${location}` : ''}
          </p>

          <ul className="mt-8 w-full max-w-xs space-y-2 text-left">
            {PROCESSING_PHASES.map((phase, index) => {
              const isDone = index < phaseIndex
              const isActive = index === phaseIndex

              return (
                <motion.li
                  key={phase}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className={cn(
                    'flex items-center gap-3 rounded-lg border px-3 py-2 text-xs uppercase tracking-[0.1em] transition-colors',
                    isDone && 'border-primary/30 bg-primary/5 text-foreground',
                    isActive &&
                      'border-primary/50 bg-primary/10 text-foreground',
                    !isDone &&
                      !isActive &&
                      'border-border/60 text-muted-foreground'
                  )}
                >
                  <span
                    className={cn(
                      'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border',
                      isDone && 'border-primary bg-primary text-primary-foreground',
                      isActive && 'border-primary/60 bg-background',
                      !isDone && !isActive && 'border-border bg-background'
                    )}
                  >
                    {isDone ? (
                      <Check className="h-3 w-3" />
                    ) : isActive ? (
                      <motion.span
                        className="h-2 w-2 rounded-full bg-primary"
                        animate={{ opacity: [0.35, 1, 0.35] }}
                        transition={{
                          duration: 1.1,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    ) : null}
                  </span>
                  <span>{phase}</span>
                </motion.li>
              )
            })}
          </ul>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default BookingProcessingStep
