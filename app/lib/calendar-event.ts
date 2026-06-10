import { addMinutes, format } from 'date-fns'

type CalendarEventInput = {
  title: string
  start: Date
  durationMin: number
  description: string
  location: string
}

const formatIcsDate = (date: Date) => format(date, "yyyyMMdd'T'HHmmss")

const escapeIcs = (value: string) =>
  value.replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/,/g, '\\,')

export const buildCalendarEvent = ({
  title,
  start,
  durationMin,
  description,
  location,
}: CalendarEventInput) => {
  const end = addMinutes(start, durationMin)

  return {
    start,
    end,
    icsContent: [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'PRODID:-//Noir Crown Barber Atelier//EN',
      'BEGIN:VEVENT',
      `UID:noir-crown-${start.getTime()}@booking`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(start)}`,
      `DTEND:${formatIcsDate(end)}`,
      `SUMMARY:${escapeIcs(title)}`,
      `DESCRIPTION:${escapeIcs(description)}`,
      `LOCATION:${escapeIcs(location)}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n'),
    googleCalendarUrl: buildGoogleCalendarUrl({
      title,
      start,
      end,
      description,
      location,
    }),
  }
}

const buildGoogleCalendarUrl = ({
  title,
  start,
  end,
  description,
  location,
}: {
  title: string
  start: Date
  end: Date
  description: string
  location: string
}) => {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: title,
    dates: `${formatIcsDate(start)}/${formatIcsDate(end)}`,
    details: description,
    location,
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export const downloadIcsFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  link.remove()
  URL.revokeObjectURL(url)
}
