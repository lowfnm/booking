# Web Test Task Writeup

## Component map

- `Button` (`app/components/ui/button.tsx`) — **reuse**.
- `Card` family (`app/components/ui/card.tsx`) — **reuse**.
- `Input` / `Textarea` / `Label` — **reuse**.
- `ServiceOptionCard` — **build new reusable** (repeating choice row).
- `DateTimeStep` — **screen-flow reusable** (calendar + slots).
- `BookingForm` — **screen integration** (composition + orchestration).

## State plan

- URL state: not required yet; step can be promoted to search params later.
- Server cache: option lists via TanStack Query hooks.
- Form state: all booking fields via `react-hook-form`.
- Local UI state: step transitions + animation state.
- Generated API types: boundary at query layer; mock contracts to be replaced by SDK types.

## Agent plan

- Prompt agents with explicit "reuse list" and "state split" before coding.
- Require stories for every new reusable component.
- Reject diffs that:
  - fork existing components instead of extending variants
  - bypass React Query with ad-hoc local fetch state
  - hardcode design values outside DS tokens
