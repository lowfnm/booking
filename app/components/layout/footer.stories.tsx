import type { Meta, StoryObj } from '@storybook/react'

import Footer from '@/components/layout/footer'

const meta: Meta<typeof Footer> = {
  title: 'Noir Crown/Layout/Footer',
  component: Footer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta
type Story = StoryObj<typeof Footer>

export const Default: Story = {}
