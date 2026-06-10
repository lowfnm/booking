'use client'

import {
  addDays,
  addMonths,
  format,
  getDay,
  isBefore,
  isSameDay,
  isSameMonth,
  isValid,
  parseISO,
  set,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns'
import { useMemo, useState } from 'react'

import {
  DATE_FORMAT,
  DAYS_PER_PAGE,
  SLOT_TIMES,
  WEEK_DAYS_HEADINGS,
} from '@/constants'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type DateTimeStepProps = {
  value: string
  onChange: (value: string) => void
}

type DayCell = {
  date: Date
  dateString: string
  isBeforeToday: boolean
  isToday: boolean
  isCurrentMonth: boolean
}

const getPageDays = (month: Date): DayCell[] => {
  const days: DayCell[] = []
  const monthStart = startOfMonth(month)
  const mondayOffset = (getDay(monthStart) + 6) % 7
  let currentDate = subDays(monthStart, mondayOffset)

  for (let i = 0; i < DAYS_PER_PAGE; i += 1) {
    days.push({
      dateString: format(currentDate, DATE_FORMAT),
      date: currentDate,
      isBeforeToday: isBefore(startOfDay(currentDate), startOfDay(new Date())),
      isToday: isSameDay(currentDate, new Date()),
      isCurrentMonth: isSameMonth(currentDate, month),
    })
    currentDate = addDays(currentDate, 1)
  }

  return days
}

const DateTimeStep = ({ value, onChange }: DateTimeStepProps) => {
  const today = startOfDay(new Date())
  const parsedValue = value ? parseISO(value) : null
  const initialDate =
    parsedValue && isValid(parsedValue) ? startOfDay(parsedValue) : today
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(initialDate))
  const [selectedDate, setSelectedDate] = useState<Date>(initialDate)

  const days = useMemo(() => getPageDays(currentMonth), [currentMonth])
  const selectedTime =
    parsedValue && isValid(parsedValue) ? format(parsedValue, 'HH:mm') : null

  const onSelectDate = (date: Date) => {
    setSelectedDate(date)
    onChange('')
  }

  const onSelectTime = (time: string) => {
    const [hour, minute] = time.split(':').map(Number)
    const nextDateTime = set(selectedDate, {
      hours: hour,
      minutes: minute,
      seconds: 0,
      milliseconds: 0,
    })
    onChange(nextDateTime.toISOString())
  }

  return (
    <div className="grid gap-3 lg:grid-cols-[1fr_240px]">
      <div className="rounded-lg border border-border bg-secondary/40 p-3">
        <div className="mb-2 flex items-center justify-between">
          <h4 className="text-base font-semibold text-foreground">
            {format(currentMonth, 'MMMM yyyy')}
          </h4>
          <div className="flex gap-2">
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-8 px-2 text-[11px]"
              onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))}
              disabled={isSameMonth(currentMonth, startOfMonth(new Date()))}
            >
              Prev
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-8 px-2 text-[11px]"
              onClick={() => setCurrentMonth(startOfMonth(new Date()))}
            >
              Today
            </Button>
            <Button
              type="button"
              size="sm"
              variant="ghost"
              className="h-8 px-2 text-[11px]"
              onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
            >
              Next
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center text-[10px] uppercase tracking-[0.08em] text-muted-foreground">
          {WEEK_DAYS_HEADINGS.map((day) => (
            <div key={day}>{day}</div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-7 gap-1">
          {days.map((day) => (
            <button
              key={day.dateString}
              type="button"
              disabled={day.isBeforeToday}
              onClick={() => onSelectDate(day.date)}
              className={cn(
                'h-8 rounded-md border text-xs transition',
                day.isCurrentMonth
                  ? 'border-border bg-background text-foreground'
                  : 'border-border/40 bg-background/30 text-muted-foreground',
                day.isToday && 'border-primary text-primary',
                isSameDay(selectedDate, day.date) &&
                  'border-primary bg-primary text-primary-foreground',
                day.isBeforeToday && 'cursor-not-allowed opacity-40'
              )}
            >
              {format(day.date, 'd')}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-lg border border-border bg-secondary/40 p-3">
        <h4 className="mb-2 text-[11px] uppercase tracking-[0.12em] text-muted-foreground">
          Available slots
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {SLOT_TIMES.map((time) => (
            <Button
              key={time}
              type="button"
              size="sm"
              className="h-8 px-2 text-xs"
              variant={selectedTime === time ? 'default' : 'secondary'}
              onClick={() => onSelectTime(time)}
            >
              {time}
            </Button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DateTimeStep
