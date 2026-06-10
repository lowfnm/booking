import { getYear } from 'date-fns'

export const CURRENT_YEAR = getYear(new Date())
export const DATE_FORMAT = 'yyyy-MM-dd'

export const WEEK_DAYS_HEADINGS = [
  'Mon',
  'Tue',
  'Wed',
  'Thu',
  'Fri',
  'Sat',
  'Sun',
] as const
