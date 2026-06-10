import type { Meta, StoryObj } from '@storybook/react'

import BookingConfirmation from '@/components/booking-form/booking-confirmation'

import { withQueryClient } from '@/lib/storybook-decorators'

const meta: Meta<typeof BookingConfirmation> = {
  title: 'Noir Crown/Booking/BookingConfirmation',
  component: BookingConfirmation,
  tags: ['autodocs'],
  decorators: [withQueryClient],
  args: {
    name: 'John Wick',
    customer: 'New',
    location: 'Downtown',
    service: 'Skin fade + Razor line-up',
    serviceId: 'skin-fade',
    addOnIds: ['razor-line'],
    dateTime: '2026-06-10T12:00:00.000Z',
  },
}

export default meta
type Story = StoryObj<typeof BookingConfirmation>

export const Default: Story = {}

export const WithoutName: Story = {
  args: {
    name: '',
  },
}

export const MultipleAddOns: Story = {
  args: {
    service: 'Skin fade + Razor line-up + Head & face massage',
    addOnIds: ['razor-line', 'head-massage'],
  },
}
