'use client'

import { CreditCard, Smartphone, Wallet } from 'lucide-react'
import { useMemo } from 'react'
import type {
  FieldErrors,
  UseFormRegister,
  UseFormReturn,
} from 'react-hook-form'

import OrderSummary from '@/components/booking-form/order-summary'
import StepHeading from '@/components/booking-form/steps/step-heading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PAYMENT_METHODS, requiresCardEntry } from '@/constants/payment'
import {
  formatCardCvc,
  formatCardExpiry,
  formatCardNumber,
} from '@/lib/format-card'
import { useServices } from '@/lib/queries/use-booking-options'
import type { BookingFormStateType } from '@/types/booking-form'

type CheckoutStepProps = {
  values: BookingFormStateType
  register: UseFormRegister<BookingFormStateType>
  errors: FieldErrors<BookingFormStateType>
  touchedFields: UseFormReturn<BookingFormStateType>['formState']['touchedFields']
}

const CheckoutStep = ({
  values,
  register,
  errors,
  touchedFields,
}: CheckoutStepProps) => {
  const servicesQuery = useServices()
  const selectedService = useMemo(
    () =>
      servicesQuery.data?.find((service) => service.id === values.serviceId),
    [servicesQuery.data, values.serviceId]
  )

  const paymentMethodLabel = PAYMENT_METHODS.find(
    (method) => method.id === values.paymentMethod
  )?.label

  const needsCard = requiresCardEntry(values.paymentMethod)
  const isWallet =
    values.paymentMethod === 'apple-pay' ||
    values.paymentMethod === 'google-pay'
  const isCash = values.paymentMethod === 'cash'

  return (
    <>
      <StepHeading>Step 7 - Review and pay</StepHeading>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="space-y-4">
          {needsCard && (
            <div className="rounded-lg border border-border/80 bg-secondary/20 p-4">
              <div className="mb-4 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-primary" />
                <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  Card details
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardholderName">Name on card</Label>
                  <Input
                    id="cardholderName"
                    autoComplete="cc-name"
                    placeholder="John Wick"
                    {...register('cardholderName', {
                      validate: (value) => {
                        if (!requiresCardEntry(values.paymentMethod)) return true
                        return value.trim().length > 1 || 'Enter cardholder name'
                      },
                    })}
                  />
                  {touchedFields.cardholderName && errors.cardholderName && (
                    <p className="text-xs text-destructive">
                      {errors.cardholderName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card number</Label>
                  <Input
                    id="cardNumber"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="4242 4242 4242 4242"
                    {...register('cardNumber', {
                      validate: (value) => {
                        if (!requiresCardEntry(values.paymentMethod)) return true
                        const digits = value.replace(/\D/g, '')
                        return (
                          digits.length >= 15 || 'Enter a valid card number'
                        )
                      },
                      onChange: (event) => {
                        event.target.value = formatCardNumber(event.target.value)
                      },
                      setValueAs: (value) => value.replace(/\D/g, ''),
                    })}
                  />
                  {touchedFields.cardNumber && errors.cardNumber && (
                    <p className="text-xs text-destructive">
                      {errors.cardNumber.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="cardExpiry">Expiry</Label>
                    <Input
                      id="cardExpiry"
                      inputMode="numeric"
                      autoComplete="cc-exp"
                      placeholder="MM/YY"
                      maxLength={5}
                      {...register('cardExpiry', {
                        validate: (value) => {
                          if (!requiresCardEntry(values.paymentMethod))
                            return true
                          return (
                            /^\d{2}\/\d{2}$/.test(value) ||
                            'Use MM/YY format'
                          )
                        },
                        onChange: (event) => {
                          event.target.value = formatCardExpiry(
                            event.target.value
                          )
                        },
                      })}
                    />
                    {touchedFields.cardExpiry && errors.cardExpiry && (
                      <p className="text-xs text-destructive">
                        {errors.cardExpiry.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cardCvc">CVC</Label>
                    <Input
                      id="cardCvc"
                      inputMode="numeric"
                      autoComplete="cc-csc"
                      placeholder="123"
                      maxLength={4}
                      {...register('cardCvc', {
                        validate: (value) => {
                          if (!requiresCardEntry(values.paymentMethod))
                            return true
                          return (
                            value.length >= 3 || 'Enter a valid CVC'
                          )
                        },
                        onChange: (event) => {
                          event.target.value = formatCardCvc(event.target.value)
                        },
                      })}
                    />
                    {touchedFields.cardCvc && errors.cardCvc && (
                      <p className="text-xs text-destructive">
                        {errors.cardCvc.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {isWallet && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
              <div className="flex items-start gap-3">
                <Smartphone className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {values.paymentMethod === 'apple-pay'
                      ? 'Apple Pay checkout'
                      : 'Google Pay checkout'}
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    Confirm your appointment and authorize payment through your
                    wallet on the next action.
                  </p>
                </div>
              </div>
            </div>
          )}

          {isCash && (
            <div className="rounded-lg border border-border/80 bg-secondary/20 p-4">
              <div className="flex items-start gap-3">
                <Wallet className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div>
                  <p className="text-sm font-medium text-foreground">
                    Pay at the atelier
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    No card required now. Settle your total when you arrive for
                    your appointment.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <OrderSummary
          service={selectedService}
          addOnIds={values.addOnIds}
          tipOption={values.tipOption}
          tipCustomAmount={values.tipCustomAmount}
          paymentMethodLabel={paymentMethodLabel}
        />
      </div>
    </>
  )
}

export default CheckoutStep
