export type ColorToken = {
  name: string
  variable: string
  hsl: string
  className: string
  textClassName?: string
}

export const COLOR_TOKENS: ColorToken[] = [
  {
    name: 'Background',
    variable: '--background',
    hsl: '0 0% 0%',
    className: 'bg-background',
    textClassName: 'text-foreground',
  },
  {
    name: 'Foreground',
    variable: '--foreground',
    hsl: '0 0% 100%',
    className: 'bg-foreground',
    textClassName: 'text-background',
  },
  {
    name: 'Card',
    variable: '--card',
    hsl: '0 0% 7%',
    className: 'bg-card',
    textClassName: 'text-card-foreground',
  },
  {
    name: 'Primary',
    variable: '--primary',
    hsl: '38 38% 44%',
    className: 'bg-primary',
    textClassName: 'text-primary-foreground',
  },
  {
    name: 'Secondary',
    variable: '--secondary',
    hsl: '0 0% 12%',
    className: 'bg-secondary',
    textClassName: 'text-secondary-foreground',
  },
  {
    name: 'Muted',
    variable: '--muted',
    hsl: '0 0% 18%',
    className: 'bg-muted',
    textClassName: 'text-muted-foreground',
  },
  {
    name: 'Muted foreground',
    variable: '--muted-foreground',
    hsl: '0 0% 70%',
    className: 'bg-muted-foreground',
    textClassName: 'text-background',
  },
  {
    name: 'Accent',
    variable: '--accent',
    hsl: '38 38% 44%',
    className: 'bg-accent',
    textClassName: 'text-accent-foreground',
  },
  {
    name: 'Destructive',
    variable: '--destructive',
    hsl: '0 84% 60%',
    className: 'bg-destructive',
    textClassName: 'text-destructive-foreground',
  },
  {
    name: 'Border',
    variable: '--border',
    hsl: '0 0% 24%',
    className: 'bg-border',
    textClassName: 'text-foreground',
  },
  {
    name: 'Ring',
    variable: '--ring',
    hsl: '38 38% 44%',
    className: 'bg-ring',
    textClassName: 'text-background',
  },
]

export type TypographyToken = {
  name: string
  usage: string
  className: string
  sample: string
}

export const TYPOGRAPHY_TOKENS: TypographyToken[] = [
  {
    name: 'Display',
    usage: 'Confirmation hero, major milestones',
    className: 'text-3xl font-semibold uppercase tracking-[0.14em] text-foreground',
    sample: 'Your chair awaits',
  },
  {
    name: 'Section title',
    usage: 'Step headings, panel titles',
    className: 'text-sm uppercase tracking-[0.12em] text-muted-foreground',
    sample: 'Step 4 - Choose your service',
  },
  {
    name: 'Card title',
    usage: 'Service cards, payment options',
    className: 'text-sm font-semibold uppercase tracking-[0.1em] text-foreground',
    sample: 'Skin fade',
  },
  {
    name: 'Body',
    usage: 'Descriptions, helper copy',
    className: 'text-sm leading-relaxed text-muted-foreground',
    sample: 'Premium black-theme booking flow for Noir Crown Barber Atelier.',
  },
  {
    name: 'Label',
    usage: 'Form labels, summary rows',
    className: 'text-xs uppercase tracking-[0.12em] text-muted-foreground',
    sample: 'Payment method',
  },
  {
    name: 'Meta',
    usage: 'Duration, price, chips',
    className: 'text-xs uppercase tracking-[0.08em] text-muted-foreground',
    sample: '45 min / $40',
  },
  {
    name: 'Price',
    usage: 'Totals, emphasis amounts',
    className: 'text-2xl font-semibold text-foreground',
    sample: '$85.68',
  },
  {
    name: 'Button',
    usage: 'Primary actions',
    className: 'text-sm font-medium uppercase tracking-[0.08em]',
    sample: 'Confirm appointment',
  },
]

export const FONT_WEIGHTS = [
  { weight: 400, label: 'Regular', className: 'font-normal' },
  { weight: 500, label: 'Medium', className: 'font-medium' },
  { weight: 600, label: 'Semibold', className: 'font-semibold' },
  { weight: 700, label: 'Bold', className: 'font-bold' },
] as const

export const FONT_FAMILY = 'Inter'
