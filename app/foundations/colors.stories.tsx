import type { Meta, StoryObj } from '@storybook/react'

import { COLOR_TOKENS } from '@/foundations/tokens'

const ColorSwatch = ({
  name,
  variable,
  hsl,
  className,
  textClassName = 'text-foreground',
}: (typeof COLOR_TOKENS)[number]) => (
  <div className="overflow-hidden rounded-lg border border-border/80 bg-card">
    <div className={`flex h-24 items-end p-3 ${className}`}>
      <span className={`text-xs font-medium ${textClassName}`}>{name}</span>
    </div>
    <div className="space-y-1 p-3 text-xs text-muted-foreground">
      <p className="font-mono text-foreground">{variable}</p>
      <p>hsl({hsl})</p>
      <p className="font-mono">{className}</p>
    </div>
  </div>
)

const ColorsOverview = () => (
  <div className="w-full space-y-8">
    <header className="space-y-2">
      <p className="text-xs uppercase tracking-[0.14em] text-primary">
        Foundations
      </p>
      <h1 className="text-2xl font-semibold uppercase tracking-[0.12em] text-foreground">
        Colors
      </h1>
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Semantic tokens from <code className="text-foreground">globals.css</code>{' '}
        mapped to Tailwind in <code className="text-foreground">tailwind.config.ts</code>.
        Noir Crown uses a black canvas with bronze-gold primary accents.
      </p>
    </header>

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {COLOR_TOKENS.map((token) => (
        <ColorSwatch key={token.variable} {...token} />
      ))}
    </section>

    <section className="rounded-lg border border-border/80 bg-secondary/30 p-4">
      <p className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
        Surface example
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-lg border border-border bg-background p-4 text-sm text-foreground">
          Background
        </div>
        <div className="rounded-lg border border-border bg-card p-4 text-sm text-foreground">
          Card
        </div>
        <div className="rounded-lg border border-primary/40 bg-primary/10 p-4 text-sm text-primary">
          Primary tint
        </div>
      </div>
    </section>
  </div>
)

const meta: Meta<typeof ColorsOverview> = {
  title: 'Noir Crown/Foundations/Colors',
  component: ColorsOverview,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    chromatic: { viewports: [1280] },
  },
}

export default meta
type Story = StoryObj<typeof ColorsOverview>

export const Palette: Story = {}
