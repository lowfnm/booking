'use client'

import type { Meta, StoryObj } from '@storybook/react'

import CheckoutStep from '@/components/booking-form/steps/checkout-step'
import { useStorybookBookingForm } from '@/lib/storybook-booking-form'
import { withQueryClient } from '@/lib/storybook-decorators'

type CheckoutPlaygroundProps = {
  paymentMethod?: string
  tipOption?: string
  tipCustomAmount?: string
  serviceId?: string
  addOnIds?: string[]
}

const CheckoutPlayground = ({
  paymentMethod = 'visa',
  tipOption = '18',
  tipCustomAmount = '',
  serviceId = 'skin-fade',
  addOnIds = ['razor-line'],
}: CheckoutPlaygroundProps) => {
  const form = useStorybookBookingForm({
    paymentMethod,
    tipOption,
    tipCustomAmount,
    serviceId,
    addOnIds,
    name: 'John Wick',
  })

  return (
    <div className="w-full max-w-4xl">
      <CheckoutStep
        values={form.getValues()}
        register={form.register}
        errors={form.formState.errors}
        touchedFields={form.formState.touchedFields}
      />
    </div>
  )
}

const meta: Meta<typeof CheckoutPlayground> = {
  title: 'Noir Crown/Booking/CheckoutStep',
  component: CheckoutPlayground,
  tags: ['autodocs'],
  decorators: [withQueryClient],
  parameters: {
    layout: 'padded',
    chromatic: { viewports: [390, 1280] },
  },
}

export default meta
type Story = StoryObj<typeof CheckoutPlayground>

export const CardPayment: Story = {
  args: {
    paymentMethod: 'visa',
    tipOption: '18',
    addOnIds: ['razor-line', 'head-massage'],
  },
}

export const ApplePay: Story = {
  args: {
    paymentMethod: 'apple-pay',
    tipOption: 'none',
    addOnIds: ['none'],
  },
}

export const Cash: Story = {
  args: {
    paymentMethod: 'cash',
    tipOption: '15',
  },
}
