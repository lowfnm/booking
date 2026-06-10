import type { Meta, StoryObj } from '@storybook/react'

import BrandVideoPanel from '@/components/layout/brand-video-panel'

import { withPanelHeight } from '@/lib/storybook-decorators'

const meta: Meta<typeof BrandVideoPanel> = {
  title: 'Noir Crown/Layout/BrandVideoPanel',
  component: BrandVideoPanel,
  tags: ['autodocs'],
  decorators: [withPanelHeight],
  parameters: {
    layout: 'fullscreen',
    chromatic: { viewports: [1280] },
  },
}

export default meta
type Story = StoryObj<typeof BrandVideoPanel>

export const Default: Story = {}
