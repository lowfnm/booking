import type { Preview } from '@storybook/react'

import { withFormWidth } from './decorators'

import '../app/globals.css'

const preview: Preview = {
  decorators: [withFormWidth],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#000000' },
        { name: 'card', value: '#111111' },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
    options: {
      storySort: {
        order: [
          'Noir Crown',
          ['Foundations', 'UI', 'Booking', 'Layout'],
          ['*', 'Docs'],
        ],
      },
    },
  },
  tags: ['autodocs'],
}

export default preview
