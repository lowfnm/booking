import type { Meta, StoryObj } from '@storybook/react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const meta: Meta<typeof Input> = {
  title: 'Noir Crown/UI/Input',
  component: Input,
  tags: ['autodocs'],
  args: {
    placeholder: 'John Wick',
    disabled: false,
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  render: (args) => (
    <div className="space-y-2">
      <Label htmlFor="name">Name</Label>
      <Input id="name" {...args} />
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    disabled: true,
    value: 'Disabled value',
  },
  render: (args) => (
    <div className="space-y-2">
      <Label htmlFor="name-disabled">Name</Label>
      <Input id="name-disabled" {...args} />
    </div>
  ),
}

export const Email: Story = {
  args: {
    type: 'email',
    placeholder: 'you@grace.barber',
  },
  render: (args) => (
    <div className="space-y-2">
      <Label htmlFor="email">Email</Label>
      <Input id="email" {...args} />
    </div>
  ),
}
