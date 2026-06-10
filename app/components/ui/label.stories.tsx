import type { Meta, StoryObj } from '@storybook/react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof Label> = {
  title: 'Noir Crown/UI/Label',
  component: Label,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: () => (
    <div className="space-y-2">
      <Label htmlFor="phone">Phone</Label>
      <Input id="phone" placeholder="+1 555 000 123" />
    </div>
  ),
}
