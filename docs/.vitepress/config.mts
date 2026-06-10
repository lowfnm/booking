import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Noir Crown Docs',
  description: 'Documentation for the Noir Crown booking platform',
  lang: 'en-US',
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: 'Guide', link: '/design-system' },
      { text: 'Playbook', link: '/agent-playbook' },
    ],
    sidebar: [
      {
        text: 'Product',
        items: [
          { text: 'Design System', link: '/design-system' },
          { text: 'State Boundaries', link: '/state-boundaries' },
          { text: 'Web Test Writeup', link: '/web-test-task-writeup' },
        ],
      },
      {
        text: 'Engineering',
        items: [
          { text: 'Agent Playbook', link: '/agent-playbook' },
          { text: 'AI Disclosure', link: '/ai-disclosure' },
        ],
      },
    ],
    footer: {
      message: 'Noir Crown Barber Atelier',
      copyright: 'Internal engineering documentation',
    },
  },
})
