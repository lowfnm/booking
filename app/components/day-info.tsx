import type { FC } from 'react'
import { format, isValid, parseISO, set } from 'date-fns'
import { useWatch, type UseFormReturn } from 'react-hook-form'

import { SUPPORT_PHONE } from '@/constants'
import Button from '@/components/ui/button'

type AvailableSlot = {
  time: string
}

const AVAILABLE_SLOTS: AvailableSlot[] = [
  { time: '12:00' },
  { time: '13:00' },
  { time: '14:00' },
  { time: '15:00' },
  { time: '16:00' },
  { time: '17:00' },
]

type Props = {
  selectedDate: Date | null
  onInputChange?: () => any
  inputName: string
  formState: UseFormReturn<any>
}

const DayInfo: FC<Props> = ({
  selectedDate,
  onInputChange = () => {},
  inputName,
  formState: { register, control },
}) => {
  const dateTimeValue = useWatch({ control, name: inputName })
  const selectedTime =
    dateTimeValue && isValid(parseISO(dateTimeValue))
      ? format(parseISO(dateTimeValue), 'HH:mm')
      : null

  return (
    <section className="lg:mt-26 mt-6 flex flex-1 flex-col justify-between text-center lg:self-end">
      {selectedDate && (
        <div className="mb-6 min-h-[200px]">
          <h2 className="font-dosis mb-5 text-5xl text-black">
            <time>{format(selectedDate, 'EEE MMM d yyyy')}</time>
          </h2>
          <fieldset className="flex flex-wrap justify-center gap-x-3 gap-y-2">
            {AVAILABLE_SLOTS.map((slot) => {
              const timeParsed = slot.time.split(':').map((n) => parseInt(n))

              if (!timeParsed || !Array.isArray(timeParsed)) return null

              const [hour, minute] = timeParsed

              return (
                <label key={slot.time}>
                  <input
                    {...register(inputName, {
                      onChange: onInputChange,
                      required: true,
                    })}
                    type="radio"
                    hidden
                    value={set(selectedDate, {
                      hours: hour,
                      minutes: minute,
                    }).toISOString()}
                  />
                  <Button
                    disabled={selectedTime === slot.time}
                    className={
                      selectedTime === slot.time
                        ? 'opacity-50 !shadow-none'
                        : ''
                    }
                  >
                    {slot.time}
                  </Button>
                </label>
              )
            })}
          </fieldset>
        </div>
      )}

      <div className="mt-auto flex flex-col items-center gap-2">
        <p>
          Contact:{' '}
          <a href={`tel:${SUPPORT_PHONE}`} className="text-highlight">
            {SUPPORT_PHONE}
          </a>
        </p>
        <p>We able to assist you as well</p>
      </div>
    </section>
  )
}

export default DayInfo
