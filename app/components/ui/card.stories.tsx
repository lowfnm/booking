import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

const meta: Meta<typeof Card> = {
  title: 'Noir Crown/UI/Card',
  component: Card,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  render: () => (
    <Card>
      <CardHeader>
        <CardTitle>Appointment details</CardTitle>
        <CardDescription>Review your slot before confirming.</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Downtown · Skin fade · 10 Jun 2026, 12:00
      </CardContent>
      <CardFooter className="justify-end gap-3">
        <Button variant="ghost">Back</Button>
        <Button>Confirm</Button>
      </CardFooter>
    </Card>
  ),
}

export const ContentOnly: Story = {
  render: () => (
    <Card>
      <CardContent className="py-6 text-sm text-muted-foreground">
        Compact card without header/footer.
      </CardContent>
    </Card>
  ),
}
