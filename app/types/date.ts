export type DayType = {
  date: Date
  dateString: string
  isBeforeToday: boolean
  isToday: boolean
  isCurrentMonth: boolean
  isPrevMonth: boolean
  isNextMonth: boolean
}

export type SelectedDateType = Date | null
