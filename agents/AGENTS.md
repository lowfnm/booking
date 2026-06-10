# Agents

This repository is optimized for coding agents (Codex / Claude Code) with strict guardrails.

## Before you code

1. Read `docs/design-system.md`.
2. Read `docs/state-boundaries.md`.
3. Read `docs/agent-playbook.md`.

## Non-negotiable rules

- Do not fork UI primitives. Reuse `app/components/ui/*`.
- Do not create one-off "copy components" for each screen.
- Keep data boundaries explicit:
  - query cache (`TanStack Query`)
  - form state (`react-hook-form`)
  - local UI state (`useState`)
  - URL state (router/search params)
- Every reusable component must have Storybook coverage before merge.
- Never merge happy-path only UI: loading, empty, error must exist.
