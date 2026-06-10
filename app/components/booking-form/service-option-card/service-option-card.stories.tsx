import type { Meta, StoryObj } from '@storybook/react'

import ServiceOptionCard from '@/components/booking-form/service-option-card'

const meta: Meta<typeof ServiceOptionCard> = {
  title: 'Noir Crown/Booking/ServiceOptionCard',
  component: ServiceOptionCard,
  tags: ['autodocs'],
  args: {
    title: 'Classic Cut',
    description: '45 min with senior barber',
    meta: '$40',
    selected: false,
    loading: false,
    disabled: false,
    empty: false,
  },
}

export default meta
type Story = StoryObj<typeof ServiceOptionCard>

export const Default: Story = {}

export const Selected: Story = {
  args: {
    selected: true,
  },
}

export const Loading: Story = {
  args: {
    loading: true,
  },
}

export const Empty: Story = {
  args: {
    title: 'Add-ons',
    empty: true,
    description: '',
    meta: '',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
}
