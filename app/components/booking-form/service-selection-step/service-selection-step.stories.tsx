'use client'

import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import ServiceSelectionStep from '@/components/booking-form/service-selection-step'

import { withQueryClient } from '@/lib/storybook-decorators'

type ServiceSelectionPlaygroundProps = {
  initialServiceId?: string
  initialAddOnIds?: string[]
}

const ServiceSelectionPlayground = ({
  initialServiceId = 'skin-fade',
  initialAddOnIds = ['none'],
}: ServiceSelectionPlaygroundProps) => {
  const [serviceId, setServiceId] = useState(initialServiceId)
  const [addOnIds, setAddOnIds] = useState(initialAddOnIds)

  return (
    <div className="w-full max-w-5xl">
      <ServiceSelectionStep
        serviceId={serviceId}
        addOnIds={addOnIds}
        onChange={(nextServiceId, nextAddOnIds) => {
          setServiceId(nextServiceId)
          setAddOnIds(nextAddOnIds)
        }}
      />
    </div>
  )
}

const meta: Meta<typeof ServiceSelectionPlayground> = {
  title: 'Noir Crown/Booking/ServiceSelectionStep',
  component: ServiceSelectionPlayground,
  tags: ['autodocs'],
  decorators: [withQueryClient],
  parameters: {
    layout: 'padded',
    chromatic: { viewports: [1280] },
  },
}

export default meta
type Story = StoryObj<typeof ServiceSelectionPlayground>

export const Default: Story = {}

export const MultipleAddOns: Story = {
  args: {
    initialAddOnIds: ['razor-line', 'head-massage'],
  },
}
