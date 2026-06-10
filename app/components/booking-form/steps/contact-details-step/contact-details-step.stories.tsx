'use client'

import type { Meta, StoryObj } from '@storybook/react'

import ContactDetailsStep from '@/components/booking-form/steps/contact-details-step'
import { useStorybookBookingForm } from '@/lib/storybook-booking-form'

type ContactDetailsPlaygroundProps = {
  name?: string
  email?: string
  phone?: string
  concern?: string
}

const ContactDetailsPlayground = ({
  name = '',
  email = '',
  phone = '',
  concern = '',
}: ContactDetailsPlaygroundProps) => {
  const form = useStorybookBookingForm({ name, email, phone, concern })

  return (
    <div className="w-full max-w-xl">
      <ContactDetailsStep
        register={form.register}
        errors={form.formState.errors}
        touchedFields={form.formState.touchedFields}
      />
    </div>
  )
}

const meta: Meta<typeof ContactDetailsPlayground> = {
  title: 'Noir Crown/Booking/ContactDetailsStep',
  component: ContactDetailsPlayground,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
  },
}

export default meta
type Story = StoryObj<typeof ContactDetailsPlayground>

export const Empty: Story = {}

export const Prefilled: Story = {
  args: {
    name: 'John Wick',
    email: 'john@noircrown.bar',
    phone: '15550001234',
    concern: 'Low fade, clean line-up',
  },
}
