'use client'

import type { Meta, StoryObj } from '@storybook/react'
import { useMemo } from 'react'

import OrderSummary from '@/components/booking-form/order-summary'
import { useServices } from '@/lib/queries/use-booking-options'
import { withQueryClient } from '@/lib/storybook-decorators'

type OrderSummaryPlaygroundProps = {
  serviceId?: string
  addOnIds?: string[]
  tipOption?: string
  tipCustomAmount?: string
  paymentMethodLabel?: string
}

const OrderSummaryPlayground = ({
  serviceId = 'skin-fade',
  addOnIds = ['razor-line'],
  tipOption = '18',
  tipCustomAmount = '',
  paymentMethodLabel = 'Visa',
}: OrderSummaryPlaygroundProps) => {
  const servicesQuery = useServices()
  const service = useMemo(
    () => servicesQuery.data?.find((item) => item.id === serviceId),
    [serviceId, servicesQuery.data]
  )

  return (
    <div className="w-full max-w-sm">
      <OrderSummary
        service={service}
        addOnIds={addOnIds}
        tipOption={tipOption}
        tipCustomAmount={tipCustomAmount}
        paymentMethodLabel={paymentMethodLabel}
      />
    </div>
  )
}

const meta: Meta<typeof OrderSummaryPlayground> = {
  title: 'Noir Crown/Booking/OrderSummary',
  component: OrderSummaryPlayground,
  tags: ['autodocs'],
  decorators: [withQueryClient],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof OrderSummaryPlayground>

export const Default: Story = {}

export const WithMultipleAddOns: Story = {
  args: {
    addOnIds: ['razor-line', 'head-massage'],
    tipOption: '20',
  },
}
