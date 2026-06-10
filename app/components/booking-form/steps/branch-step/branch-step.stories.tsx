'use client'

import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import BranchStep from '@/components/booking-form/steps/branch-step'
import { withQueryClient } from '@/lib/storybook-decorators'

const BranchPlayground = ({ initialLocation = '' }: { initialLocation?: string }) => {
  const [location, setLocation] = useState(initialLocation)

  return (
    <div className="w-full max-w-xl space-y-3">
      <BranchStep location={location} onSelect={setLocation} />
      <p className="text-xs text-muted-foreground">
        Selected: {location || 'none'}
      </p>
    </div>
  )
}

const meta: Meta<typeof BranchPlayground> = {
  title: 'Noir Crown/Booking/BranchStep',
  component: BranchPlayground,
  tags: ['autodocs'],
  decorators: [withQueryClient],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof BranchPlayground>

export const Default: Story = {}

export const WithSelection: Story = {
  args: {
    initialLocation: 'Downtown',
  },
}
