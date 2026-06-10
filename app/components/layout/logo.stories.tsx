import type { Meta, StoryObj } from '@storybook/react'

import Logo from '@/components/layout/logo'

const meta: Meta<typeof Logo> = {
  title: 'Noir Crown/Layout/Logo',
  component: Logo,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Logo>

export const Default: Story = {}
