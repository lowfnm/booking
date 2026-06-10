import type { Meta, StoryObj } from '@storybook/react'

import {
  FONT_FAMILY,
  FONT_WEIGHTS,
  TYPOGRAPHY_TOKENS,
} from '@/foundations/tokens'

const TypographyOverview = () => (
  <div className="w-full space-y-10">
    <header className="space-y-2">
      <p className="text-xs uppercase tracking-[0.14em] text-primary">
        Foundations
      </p>
      <h1 className="text-2xl font-semibold uppercase tracking-[0.12em] text-foreground">
        Typography
      </h1>
      <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
        Primary typeface is <span className="text-foreground">{FONT_FAMILY}</span>.
        Booking UI relies on uppercase labels, wide tracking, and restrained body copy.
      </p>
    </header>

    <section className="space-y-4">
      <h2 className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
        Font family
      </h2>
      <div className="rounded-lg border border-border/80 bg-card p-5">
        <p className="text-4xl font-semibold text-foreground">{FONT_FAMILY}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Loaded from Google Fonts in globals.css
        </p>
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
        Weights
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {FONT_WEIGHTS.map((item) => (
          <div
            key={item.weight}
            className="rounded-lg border border-border/80 bg-secondary/30 px-4 py-3"
          >
            <p className={`text-lg text-foreground ${item.className}`}>
              {item.label} — ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              {item.weight} / {item.className}
            </p>
          </div>
        ))}
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
        Text styles
      </h2>
      <div className="space-y-3">
        {TYPOGRAPHY_TOKENS.map((token) => (
          <div
            key={token.name}
            className="rounded-lg border border-border/80 bg-card px-4 py-4"
          >
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs uppercase tracking-[0.1em] text-primary">
                {token.name}
              </p>
              <p className="text-xs text-muted-foreground">{token.usage}</p>
            </div>
            <p className={token.className}>{token.sample}</p>
            <p className="mt-3 font-mono text-[11px] text-muted-foreground">
              {token.className}
            </p>
          </div>
        ))}
      </div>
    </section>

    <section className="space-y-4">
      <h2 className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
        Tracking scale
      </h2>
      <div className="grid gap-2 rounded-lg border border-border/80 bg-secondary/20 p-4 text-sm uppercase text-foreground">
        <p className="tracking-[0.08em]">tracking-[0.08em] — meta / buttons</p>
        <p className="tracking-[0.1em]">tracking-[0.1em] — card titles</p>
        <p className="tracking-[0.12em]">tracking-[0.12em] — labels / steps</p>
        <p className="tracking-[0.14em]">tracking-[0.14em] — display accents</p>
      </div>
    </section>
  </div>
)

const meta: Meta<typeof TypographyOverview> = {
  title: 'Noir Crown/Foundations/Typography',
  component: TypographyOverview,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    chromatic: { viewports: [1280] },
  },
}

export default meta
type Story = StoryObj<typeof TypographyOverview>

export const Scale: Story = {}
