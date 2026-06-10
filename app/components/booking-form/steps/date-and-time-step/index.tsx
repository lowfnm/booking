'use client'

import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import DateTimeStep from '@/components/booking-form/date-time-step'
import StepHeading from '@/components/booking-form/steps/step-heading'
import type { BookingFormStateType } from '@/types/booking-form'

type DateAndTimeStepProps = {
  dateTime: string
  errors: FieldErrors<BookingFormStateType>
  register: UseFormRegister<BookingFormStateType>
  onChange: (value: string) => void
}

const DateAndTimeStep = ({
  dateTime,
  errors,
  register,
  onChange,
}: DateAndTimeStepProps) => (
  <>
    <StepHeading>Step 3 - Date and time</StepHeading>
    <input
      type="hidden"
      {...register('dateTime', {
        required: 'Choose preferred slot',
      })}
    />
    <DateTimeStep value={dateTime} onChange={onChange} />
    {errors.dateTime && (
      <p className="text-xs text-destructive">{errors.dateTime.message}</p>
    )}
  </>
)

export default DateAndTimeStep
