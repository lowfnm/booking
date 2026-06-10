import {
  addDays,
  addMonths,
  format,
  getDay,
  isBefore,
  isSameDay,
  isSameMonth,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
} from 'date-fns'
import type { Dispatch, FC, SetStateAction } from 'react'
import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'tabler-icons-react'

import { DATE_FORMAT, DAYS_PER_PAGE, WEEK_DAYS_HEADINGS } from '@/constants'
import type { DayType, SelectedDateType } from '@/types/date'

const getPageDays = ({ month }: { month: Date }) => {
  const days: DayType[] = []
  const monthStart = startOfMonth(month)
  const mondayOffset = (getDay(monthStart) + 6) % 7
  let currentDate = subDays(monthStart, mondayOffset)
  for (let i = 0; i < DAYS_PER_PAGE; i++) {
    days.push({
      dateString: format(currentDate, DATE_FORMAT),
      date: currentDate,
      isBeforeToday: isBefore(startOfDay(currentDate), startOfDay(new Date())),
      isToday: isSameDay(currentDate, new Date()),
      isCurrentMonth: isSameMonth(currentDate, month),
      isPrevMonth: currentDate < monthStart,
      isNextMonth: currentDate > monthStart && !isSameMonth(currentDate, month),
    })
    currentDate = addDays(currentDate, 1)
  }
  return days
}

const getTitle = (date: Date) => format(date, 'MMMM yyyy')

type DayStyleKey =
  | 'isPrevMonth'
  | 'isBeforeToday'
  | 'isToday'
  | 'isNextMonth'
  | 'isSelected'

const DAY_STYLES_MAP: Record<DayStyleKey, string> = {
  isPrevMonth: 'bg-stone-100 ',
  isBeforeToday: '!bg-gray-300 !cursor-not-allowed ',
  isToday: '!bg-amber-50 ',
  isNextMonth: 'bg-stone-100 ',
  isSelected: '!bg-primaryColor text-white ',
}

const getCellsStyles = (day: DayType, selectedDate: Date | null) => {
  const keysForCheck: Array<Exclude<DayStyleKey, 'isSelected'>> = [
    'isPrevMonth',
    'isBeforeToday',
    'isToday',
    'isNextMonth',
  ]
  const styles = []
  for (const key of keysForCheck) {
    if (day[key]) {
      styles.push(DAY_STYLES_MAP[key])
    }
  }
  if (selectedDate && isSameDay(day.date, selectedDate)) {
    styles.push(DAY_STYLES_MAP.isSelected)
  }
  return styles.join(' ')
}

type Props = {
  dateState: [SelectedDateType, Dispatch<SetStateAction<SelectedDateType>>]
}

const Calendar: FC<Props> = ({ dateState: [, setDate] }) => {
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()))
  const [selectedDate, setSelectedDate] = useState<SelectedDateType>(null)

  const days = useMemo(
    () => getPageDays({ month: currentMonth }),
    [currentMonth]
  )

  useEffect(() => {
    if (selectedDate) setDate(selectedDate)
    else setDate(null)
  }, [selectedDate, setDate])

  return (
    <div className="w-5/6 flex-1 drop-shadow-md sm:w-3/5 lg:flex lg:w-1/3 lg:flex-col">
      <header className="relative z-20 flex items-center justify-between py-4 md:px-2 lg:flex-none lg:px-6">
        <h1 className="font-dosis text-3xl font-semibold">
          <time>{getTitle(currentMonth)}</time>
        </h1>
        <div className="flex items-center">
          <div className="flex items-center rounded-md md:items-stretch">
            <button
              type="button"
              disabled={false}
              onClick={() => setCurrentMonth(() => startOfMonth(new Date()))}
              className="mr-5 rounded-md bg-amber-50 px-4 py-2 drop-shadow hover:bg-amber-100 focus:relative"
            >
              today
            </button>
            <button
              type="button"
              disabled={isSameMonth(currentMonth, startOfMonth(new Date()))}
              onClick={() => setCurrentMonth((prev) => subMonths(prev, 1))}
              className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative disabled:bg-gray-100 disabled:hover:bg-gray-100 disabled:hover:text-gray-400 md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Previous month</span>
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
            <button
              type="button"
              disabled={false}
              onClick={() => setCurrentMonth((prev) => addMonths(prev, 1))}
              className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
            >
              <span className="sr-only">Next month</span>
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>
      <div className="mx-auto w-full overflow-hidden rounded-md shadow ring-1 ring-black ring-opacity-5 lg:flex lg:flex-col">
        <div className="grid w-full grid-cols-7 gap-px border-b border-gray-300 text-center text-xs font-semibold leading-6 lg:flex-none">
          {WEEK_DAYS_HEADINGS.map((item) => (
            <div key={item} className="bg-white py-2">
              {item}
            </div>
          ))}
        </div>
        <div className="relative flex text-xs leading-6 lg:flex-auto">
          <div className="grid w-full grid-cols-7 grid-rows-6 gap-px bg-gray-200">
            {days.map((day: DayType, idx) => (
              <button
                type="button"
                disabled={day.isBeforeToday}
                key={day.dateString ?? idx}
                onClick={() => setSelectedDate(day.date)}
                className={`sm:14 relative flex h-10 w-full cursor-pointer bg-primary p-1 transition-colors duration-300 ease-in-out hover:bg-gray-200 ${getCellsStyles(day, selectedDate)}`}
              >
                <time className="ml-auto">{format(day.date, 'd')}</time>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calendar
