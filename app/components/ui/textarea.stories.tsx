import type { Meta, StoryObj } from '@storybook/react'

import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

const meta: Meta<typeof Textarea> = {
  title: 'Noir Crown/UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  args: {
    placeholder: 'Any preferences or requests...',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Textarea>

export const Default: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Label htmlFor="notes">Notes</Label>
      <Textarea id="notes" {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled notes field',
  },
  render: (args) => (
    <div className="space-y-2">
      <Label htmlFor="notes-disabled">Notes</Label>
      <Textarea id="notes-disabled" {...args} />
    </div>
  ),
}
