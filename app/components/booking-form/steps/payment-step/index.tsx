'use client'

import type { FieldErrors, UseFormRegister } from 'react-hook-form'

import { PaymentMethodIconMark } from '@/components/booking-form/payment-method-icons'
import StepHeading from '@/components/booking-form/steps/step-heading'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  PAYMENT_METHODS,
  TIP_OPTIONS,
  type PaymentMethodId,
} from '@/constants/payment'
import { cn } from '@/lib/utils'
import type { BookingFormStateType } from '@/types/booking-form'

type PaymentStepProps = {
  paymentMethod: string
  tipOption: string
  tipCustomAmount: string
  errors: FieldErrors<BookingFormStateType>
  register: UseFormRegister<BookingFormStateType>
  onPaymentMethodChange: (methodId: PaymentMethodId) => void
  onTipOptionChange: (tipId: string) => void
}

const PaymentStep = ({
  paymentMethod,
  tipOption,
  tipCustomAmount,
  errors,
  register,
  onPaymentMethodChange,
  onTipOptionChange,
}: PaymentStepProps) => (
  <>
    <StepHeading>Step 6 - Payment</StepHeading>

    <input
      type="hidden"
      {...register('paymentMethod', {
        required: 'Select a payment method',
      })}
    />
    <input type="hidden" {...register('tipOption')} />
    <input type="hidden" {...register('tipCustomAmount')} />

    <div className="space-y-3">
      <Label className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
        Payment method
      </Label>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {PAYMENT_METHODS.map((method) => {
          const isSelected = paymentMethod === method.id

          return (
            <button
              key={method.id}
              type="button"
              onClick={() => onPaymentMethodChange(method.id)}
              className={cn(
                'flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors',
                isSelected
                  ? 'border-primary bg-primary/10'
                  : 'border-border bg-secondary/40 hover:border-primary/40 hover:bg-secondary/70'
              )}
            >
              <PaymentMethodIconMark methodId={method.id} />
              <span className="min-w-0">
                <span className="block text-sm font-semibold uppercase tracking-[0.08em] text-foreground">
                  {method.label}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {method.description}
                </span>
              </span>
            </button>
          )
        })}
      </div>
      {errors.paymentMethod && (
        <p className="text-xs text-destructive">{errors.paymentMethod.message}</p>
      )}
    </div>

    <div className="space-y-3">
      <Label className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
        Tip option
      </Label>
      <div className="flex flex-wrap gap-2">
        {TIP_OPTIONS.map((option) => {
          const isSelected = tipOption === option.id

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onTipOptionChange(option.id)}
              className={cn(
                'rounded-full border px-4 py-2 text-xs uppercase tracking-[0.1em] transition-colors',
                isSelected
                  ? 'border-primary bg-primary/15 text-primary'
                  : 'border-border bg-secondary/50 text-muted-foreground hover:border-primary/40 hover:text-foreground'
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>

      {tipOption === 'custom' && (
        <div className="space-y-2">
          <Label htmlFor="tipCustomAmount">Custom tip amount</Label>
          <Input
            id="tipCustomAmount"
            inputMode="decimal"
            placeholder="$0"
            {...register('tipCustomAmount', {
              validate: (value, formValues) => {
                if (formValues.tipOption !== 'custom') return true
                const amount = Number.parseFloat(value.replace(/[^\d.]/g, ''))
                return (
                  (Number.isFinite(amount) && amount > 0) ||
                  'Enter a valid tip amount'
                )
              },
              onChange: (event) => {
                const digits = event.target.value.replace(/[^\d.]/g, '')
                event.target.value = digits ? `$${digits}` : ''
              },
            })}
          />
          {errors.tipCustomAmount && (
            <p className="text-xs text-destructive">
              {errors.tipCustomAmount.message}
            </p>
          )}
        </div>
      )}
    </div>

    <div className="rounded-lg border border-border/80 bg-secondary/30 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
        Cancellation policy
      </p>
      <div className="mt-2 flex items-center justify-between gap-3 text-sm text-foreground">
        <span>Cancel free 24h ahead</span>
        <span className="text-xs uppercase tracking-[0.1em] text-primary">
          No charge
        </span>
      </div>
    </div>
  </>
)

export default PaymentStep
