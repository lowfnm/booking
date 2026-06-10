'use client'

import type { Meta, StoryObj } from '@storybook/react'
import { useWatch } from 'react-hook-form'

import PaymentStep from '@/components/booking-form/steps/payment-step'
import type { PaymentMethodId } from '@/constants/payment'
import { useStorybookBookingForm } from '@/lib/storybook-booking-form'

type PaymentStepPlaygroundProps = {
  paymentMethod?: string
  tipOption?: string
  tipCustomAmount?: string
}

const PaymentStepPlayground = ({
  paymentMethod = '',
  tipOption = 'none',
  tipCustomAmount = '',
}: PaymentStepPlaygroundProps) => {
  const form = useStorybookBookingForm({
    paymentMethod,
    tipOption,
    tipCustomAmount,
  })
  const values = useWatch({ control: form.control }) as {
    paymentMethod: string
    tipOption: string
    tipCustomAmount: string
  }

  return (
    <div className="w-full max-w-xl space-y-4">
      <PaymentStep
        paymentMethod={values.paymentMethod}
        tipOption={values.tipOption}
        tipCustomAmount={values.tipCustomAmount}
        errors={form.formState.errors}
        register={form.register}
        onPaymentMethodChange={(methodId: PaymentMethodId) => {
          form.setValue('paymentMethod', methodId, { shouldValidate: true })
        }}
        onTipOptionChange={(tipId) => {
          form.setValue('tipOption', tipId, { shouldValidate: true })
          if (tipId !== 'custom') {
            form.setValue('tipCustomAmount', '', { shouldValidate: true })
          }
        }}
      />
      <p className="text-xs text-muted-foreground">
        Selected: {values.paymentMethod || 'none'} · tip {values.tipOption}
        {values.tipCustomAmount ? ` (${values.tipCustomAmount})` : ''}
      </p>
    </div>
  )
}

const meta: Meta<typeof PaymentStepPlayground> = {
  title: 'Noir Crown/Booking/PaymentStep',
  component: PaymentStepPlayground,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    chromatic: { viewports: [390, 768] },
  },
}

export default meta
type Story = StoryObj<typeof PaymentStepPlayground>

export const Default: Story = {}

export const ApplePaySelected: Story = {
  args: {
    paymentMethod: 'apple-pay',
    tipOption: '18',
  },
}

export const CustomTip: Story = {
  args: {
    paymentMethod: 'visa',
    tipOption: 'custom',
    tipCustomAmount: '$25',
  },
}
