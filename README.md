# Booking BL (Next.js)

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- ESLint + Prettier
- Husky + lint-staged
- pnpm

## Development

```sh
pnpm install
pnpm dev
```

App runs on [http://localhost:3000](http://localhost:3000).

## Storybook

```sh
pnpm storybook
```

Static build:

```sh
pnpm build-storybook
```

## Quality

```sh
pnpm lint
pnpm typecheck
pnpm format:check
```

## Architecture Docs

- `agents/AGENTS.md`
- `docs/design-system.md`
- `docs/state-boundaries.md`
- `docs/agent-playbook.md`
- `docs/web-test-task-writeup.md`
- `docs/ai-disclosure.md`
