'use client'

import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import ServiceSelectionStep from '@/components/booking-form/service-selection-step'
import StepHeading from '@/components/booking-form/steps/step-heading'
import type { BookingFormStateType } from '@/types/booking-form'

type ServiceStepProps = {
  serviceId: string
  addOnIds: string[]
  errors: FieldErrors<BookingFormStateType>
  register: UseFormRegister<BookingFormStateType>
  onChange: (serviceId: string, addOnIds: string[], summary: string) => void
}

const ServiceStep = ({
  serviceId,
  addOnIds,
  errors,
  register,
  onChange,
}: ServiceStepProps) => (
  <>
    <StepHeading>Step 4 - Choose your service</StepHeading>
    <input
      type="hidden"
      {...register('serviceId', {
        required: 'Select a service',
      })}
    />
    <input type="hidden" {...register('service')} />
    <ServiceSelectionStep
      serviceId={serviceId}
      addOnIds={addOnIds}
      onChange={onChange}
    />
    {errors.serviceId && (
      <p className="text-xs text-destructive">{errors.serviceId.message}</p>
    )}
  </>
)

export default ServiceStep
