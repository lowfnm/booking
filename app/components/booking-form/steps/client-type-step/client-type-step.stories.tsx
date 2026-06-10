'use client'

import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import ClientTypeStep from '@/components/booking-form/steps/client-type-step'
import { withQueryClient } from '@/lib/storybook-decorators'

const ClientTypePlayground = ({ initialCustomer = '' }: { initialCustomer?: string }) => {
  const [customer, setCustomer] = useState(initialCustomer)

  return (
    <div className="w-full max-w-xl space-y-3">
      <ClientTypeStep customer={customer} onSelect={setCustomer} />
      <p className="text-xs text-muted-foreground">
        Selected: {customer || 'none'}
      </p>
    </div>
  )
}

const meta: Meta<typeof ClientTypePlayground> = {
  title: 'Noir Crown/Booking/ClientTypeStep',
  component: ClientTypePlayground,
  tags: ['autodocs'],
  decorators: [withQueryClient],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof ClientTypePlayground>

export const Default: Story = {}

export const WithSelection: Story = {
  args: {
    initialCustomer: 'New',
  },
}
