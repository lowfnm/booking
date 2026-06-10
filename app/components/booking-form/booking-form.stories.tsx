'use client'

import type { Meta, StoryObj } from '@storybook/react'

import BookingForm from '@/components/booking-form'
import { withQueryClient } from '@/lib/storybook-decorators'

const meta: Meta<typeof BookingForm> = {
  title: 'Noir Crown/Booking/BookingForm',
  component: BookingForm,
  tags: ['autodocs'],
  decorators: [withQueryClient],
  parameters: {
    layout: 'padded',
    chromatic: { viewports: [390, 1280] },
  },
}

export default meta
type Story = StoryObj<typeof BookingForm>

export const Default: Story = {
  render: () => (
    <div className="w-full max-w-2xl">
      <BookingForm />
    </div>
  ),
}
