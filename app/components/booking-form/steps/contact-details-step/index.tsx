'use client'

import type {
  FieldErrors,
  UseFormRegister,
  UseFormReturn,
} from 'react-hook-form'

import StepHeading from '@/components/booking-form/steps/step-heading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { formatPhoneMask } from '@/lib/format-phone-mask'
import type { BookingFormStateType } from '@/types/booking-form'

type ContactDetailsStepProps = {
  register: UseFormRegister<BookingFormStateType>
  errors: FieldErrors<BookingFormStateType>
  touchedFields: UseFormReturn<BookingFormStateType>['formState']['touchedFields']
}

const ContactDetailsStep = ({
  register,
  errors,
  touchedFields,
}: ContactDetailsStepProps) => (
  <>
    <StepHeading>Step 5 - Contact details</StepHeading>
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          autoFocus
          placeholder="John Wick"
          {...register('name', { required: 'Name is required' })}
        />
        {touchedFields.name && errors.name && (
          <p className="text-xs text-destructive">{errors.name.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          inputMode="numeric"
          autoComplete="tel"
          maxLength={16}
          placeholder="+1 555 000 123"
          {...register('phone', {
            required: 'Phone is required',
            validate: (value) =>
              value.replace(/\D/g, '').length >= 10 ||
              'Enter valid phone number',
            onChange: (event) => {
              event.target.value = formatPhoneMask(event.target.value)
            },
            setValueAs: (value) => value.replace(/\D/g, ''),
          })}
        />
        {touchedFields.phone && errors.phone && (
          <p className="text-xs text-destructive">{errors.phone.message}</p>
        )}
      </div>
    </div>
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input
        id="email"
        type="email"
        placeholder="you@grace.barber"
        {...register('email', {
          required: 'Email is required',
          pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Enter valid email',
          },
        })}
      />
      {touchedFields.email && errors.email && (
        <p className="text-xs text-destructive">{errors.email.message}</p>
      )}
    </div>
    <div className="space-y-2">
      <Label htmlFor="concern">Notes</Label>
      <Textarea
        id="concern"
        placeholder="Any preferences or requests..."
        {...register('concern')}
      />
    </div>
  </>
)

export default ContactDetailsStep
