import type { ReactNode } from 'react'
import type {
  FieldErrors,
  UseFormRegister,
  UseFormReturn,
} from 'react-hook-form'

import {
  BranchStep,
  ClientTypeStep,
  CheckoutStep,
  ContactDetailsStep,
  DateAndTimeStep,
  PaymentStep,
  ServiceStep,
} from '@/components/booking-form/steps'
import type { PaymentMethodId } from '@/constants/payment'
import type { BookingStepNumber } from '@/constants/booking-steps'
import type { BookingFormStateType } from '@/types/booking-form'

export type BookingStepContentContext = {
  values: BookingFormStateType
  register: UseFormRegister<BookingFormStateType>
  errors: FieldErrors<BookingFormStateType>
  touchedFields: UseFormReturn<BookingFormStateType>['formState']['touchedFields']
  setValue: UseFormReturn<BookingFormStateType>['setValue']
  onSelectCustomerType: (type: string) => void
  onSelectLocation: (location: string) => void
  onServiceChange: (
    serviceId: string,
    addOnIds: string[],
    summary: string
  ) => void
  onPaymentMethodChange: (methodId: PaymentMethodId) => void
  onTipOptionChange: (tipId: string) => void
}

type BookingStepRenderer = (
  context: BookingStepContentContext
) => ReactNode

const bookingStepContent: Record<BookingStepNumber, BookingStepRenderer> = {
  1: ({ values, onSelectCustomerType }) => (
    <ClientTypeStep
      customer={values.customer}
      onSelect={onSelectCustomerType}
    />
  ),
  2: ({ values, onSelectLocation }) => (
    <BranchStep location={values.location} onSelect={onSelectLocation} />
  ),
  3: ({ values, errors, register, setValue }) => (
    <DateAndTimeStep
      dateTime={values.dateTime}
      errors={errors}
      register={register}
      onChange={(nextValue) => {
        setValue('dateTime', nextValue, { shouldValidate: true })
      }}
    />
  ),
  4: ({ values, errors, register, onServiceChange }) => (
    <ServiceStep
      serviceId={values.serviceId}
      addOnIds={values.addOnIds}
      errors={errors}
      register={register}
      onChange={onServiceChange}
    />
  ),
  5: ({ register, errors, touchedFields }) => (
    <ContactDetailsStep
      register={register}
      errors={errors}
      touchedFields={touchedFields}
    />
  ),
  6: ({
    values,
    errors,
    register,
    onPaymentMethodChange,
    onTipOptionChange,
  }) => (
    <PaymentStep
      paymentMethod={values.paymentMethod}
      tipOption={values.tipOption}
      tipCustomAmount={values.tipCustomAmount}
      errors={errors}
      register={register}
      onPaymentMethodChange={onPaymentMethodChange}
      onTipOptionChange={onTipOptionChange}
    />
  ),
  7: ({ values, register, errors, touchedFields }) => (
    <CheckoutStep
      values={values}
      register={register}
      errors={errors}
      touchedFields={touchedFields}
    />
  ),
}

export const renderBookingStepContent = (
  step: number,
  context: BookingStepContentContext
): ReactNode => {
  const renderer = bookingStepContent[step as BookingStepNumber]
  return renderer?.(context) ?? null
}
