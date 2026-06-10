import type { Meta, StoryObj } from '@storybook/react'

import BookingProcessingStep from '@/components/booking-form/booking-processing-step'
import { withFormWidth } from '@/lib/storybook-decorators'

const meta: Meta<typeof BookingProcessingStep> = {
  title: 'Noir Crown/Booking/BookingProcessingStep',
  component: BookingProcessingStep,
  tags: ['autodocs'],
  decorators: [withFormWidth],
  args: {
    location: 'Downtown',
    dateTime: '2026-06-10T12:00:00.000Z',
    service: 'Skin fade + Razor line-up + Hot towel treatment',
  },
  parameters: {
    layout: 'padded',
    chromatic: { viewports: [390, 768] },
  },
}

export default meta
type Story = StoryObj<typeof BookingProcessingStep>

export const Default: Story = {}
