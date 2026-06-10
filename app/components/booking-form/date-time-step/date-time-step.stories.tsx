'use client'

import type { Meta, StoryObj } from '@storybook/react'
import { useState } from 'react'

import DateTimeStep from '@/components/booking-form/date-time-step'

const DateTimeStepPlayground = ({
  initialValue = '',
}: {
  initialValue?: string
}) => {
  const [value, setValue] = useState(initialValue)

  return (
    <div className="w-full max-w-3xl">
      <DateTimeStep value={value} onChange={setValue} />
      <p className="mt-4 text-xs text-muted-foreground">
        Selected: {value || 'none'}
      </p>
    </div>
  )
}

const meta: Meta<typeof DateTimeStepPlayground> = {
  title: 'Noir Crown/Booking/DateTimeStep',
  component: DateTimeStepPlayground,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof DateTimeStepPlayground>

export const Default: Story = {}

export const WithSelection: Story = {
  args: {
    initialValue: '2026-06-10T12:00:00.000Z',
  },
}
