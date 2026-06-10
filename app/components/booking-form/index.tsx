'use client'

import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useForm, useWatch, type UseFormReturn } from 'react-hook-form'

import BookingConfirmation from '@/components/booking-form/booking-confirmation'
import BookingProcessingStep from '@/components/booking-form/booking-processing-step'
import { renderBookingStepContent } from '@/components/booking-form/booking-step-content'
import { useBookingFormPersistence } from '@/components/booking-form/use-booking-form-persistence'
import { BOOKING_FORM_DEFAULTS } from '@/constants/booking-form'
import {
  isBookingReadyToSubmit,
  isPaymentStepValid,
} from '@/lib/booking-form-validation'
import {
  getNextBookingStep,
  getStepNextFields,
  stepIsSubmit,
  stepShowsFooter,
} from '@/lib/booking-step'
import { useSubmitBooking } from '@/lib/queries/use-submit-booking'
import type { PaymentMethodId } from '@/constants/payment'
import type { BookingFormStateType } from '@/types/booking-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import Loader from '@/components/ui/loader'

export type { BookingFormStateType }

export type FormChildrenProps = {
  formState: UseFormReturn<BookingFormStateType>
}

const BookingForm = () => {
  const formState = useForm<BookingFormStateType>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: BOOKING_FORM_DEFAULTS,
  })
  const { step, setStep, isHydrated, clearPersistence } =
    useBookingFormPersistence({ form: formState })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const submitBookingMutation = useSubmitBooking()
  const isSubmitting = submitBookingMutation.isPending

  const {
    register,
    control,
    trigger,
    setValue,
    formState: { errors, touchedFields },
  } = formState

  const values = useWatch({ control }) as BookingFormStateType
  const {
    customer,
    location,
    dateTime,
    serviceId,
    addOnIds,
    service,
    name,
  } = values
  const canSubmit = isBookingReadyToSubmit(values, isSubmitting)
  const showFooter = stepShowsFooter(step)
  const isSubmitStep = stepIsSubmit(step)

  const onSubmit = formState.handleSubmit((data) => {
    setSubmitError(null)
    submitBookingMutation.mutate(data, {
      onSuccess: () => {
        clearPersistence()
        setIsSubmitted(true)
      },
      onError: () => {
        setSubmitError(
          'We could not secure your appointment. Please try again.'
        )
      },
    })
  })

  const goNext = async () => {
    const nextFields = getStepNextFields(step)
    if (!nextFields) return

    const fieldsToValidate = [...nextFields]
    if (step === 6 && values.tipOption === 'custom') {
      fieldsToValidate.push('tipCustomAmount')
    }

    const valid = await trigger(fieldsToValidate)
    if (!valid || (step === 6 && !isPaymentStepValid(values))) return

    const nextStep = getNextBookingStep(step)
    if (nextStep) setStep(nextStep)
  }

  const advanceAfterSelection = (fromStep: number) => {
    const nextStep = getNextBookingStep(fromStep)
    if (nextStep) setTimeout(() => setStep(nextStep), 180)
  }

  const onSelectCustomerType = (type: string) => {
    setValue('customer', type, { shouldValidate: true })
    advanceAfterSelection(1)
  }

  const onSelectLocation = (selectedLocation: string) => {
    setValue('location', selectedLocation, { shouldValidate: true })
    advanceAfterSelection(2)
  }

  const onServiceChange = (
    nextServiceId: string,
    nextAddOnIds: string[],
    summary: string
  ) => {
    setValue('serviceId', nextServiceId, { shouldValidate: true })
    setValue('addOnIds', nextAddOnIds, { shouldValidate: true })
    setValue('service', summary, { shouldValidate: true })
  }

  const onPaymentMethodChange = (methodId: PaymentMethodId) => {
    setValue('paymentMethod', methodId, { shouldValidate: true })
  }

  const onTipOptionChange = (tipId: string) => {
    setValue('tipOption', tipId, { shouldValidate: true })
    if (tipId !== 'custom') {
      setValue('tipCustomAmount', '', { shouldValidate: true })
    }
  }

  if (!isHydrated) {
    return (
      <Card className="flex min-h-[280px] w-full items-center justify-center">
        <Loader />
      </Card>
    )
  }

  if (isSubmitted) {
    return (
      <BookingConfirmation
        name={name}
        customer={customer}
        location={location}
        service={service}
        serviceId={serviceId}
        addOnIds={addOnIds}
        dateTime={dateTime}
      />
    )
  }

  if (isSubmitting) {
    return (
      <AnimatePresence mode="wait">
        <BookingProcessingStep
          location={location}
          dateTime={dateTime}
          service={service}
        />
      </AnimatePresence>
    )
  }

  return (
    <form onSubmit={onSubmit} className="w-full">
      <Card className="w-full">
        <CardContent className="space-y-4 py-4">
          <AnimatePresence mode="wait" initial={false}>
            <motion.section
              key={step}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22, ease: 'easeInOut' }}
              className="space-y-4"
            >
              {renderBookingStepContent(step, {
                values,
                register,
                errors,
                touchedFields,
                setValue,
                onSelectCustomerType,
                onSelectLocation,
                onServiceChange,
                onPaymentMethodChange,
                onTipOptionChange,
              })}
            </motion.section>
          </AnimatePresence>
        </CardContent>

        {showFooter && (
          <CardFooter className="flex flex-col gap-3 py-4">
            {submitError && (
              <p className="w-full text-center text-xs text-destructive">
                {submitError}
              </p>
            )}
            <div className="flex w-full items-center justify-between gap-3">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setStep((prev) => Math.max(1, prev - 1))}
              >
                Back
              </Button>
              {isSubmitStep ? (
                <Button type="submit" disabled={!canSubmit}>
                  Confirm appointment
                </Button>
              ) : (
                <Button type="button" onClick={goNext}>
                  Continue
                </Button>
              )}
            </div>
          </CardFooter>
        )}
      </Card>
    </form>
  )
}

export default BookingForm
