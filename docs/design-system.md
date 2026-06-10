# Design System Rules

## Foundations

- Theme tokens are defined in `app/globals.css` via CSS variables.
- Tailwind semantic mapping is defined in `tailwind.config.ts`.
- Primitive UI components live in `app/components/ui/*` (shadcn-style API).

## Reusable component policy

- Repeating UI blocks must be extracted once and reused.
- Current reusable booking block: `ServiceOptionCard`.
- Variant/state surface must be explicit and finite.

## Storybook requirement

For each reusable component, stories must include:

- default
- selected/active
- loading
- disabled
- empty

If one of these states is not applicable, explain why in story docs.

## Naming conventions

- Domain reusable components: `app/components/<domain>/...`
- UI primitives: `app/components/ui/...`
- Hooks with external data: `app/lib/queries/use-*.ts`
- Mock API contracts: `app/lib/mock-*.ts`
