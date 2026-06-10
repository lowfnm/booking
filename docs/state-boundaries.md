# State Boundaries

## URL state

- Step index can be promoted to URL search params when deep-linking is needed.
- Current implementation keeps step in local UI state for speed.

## Server cache (TanStack Query)

- Option datasets (`customer-types`, `locations`) are loaded through query hooks:
  - `useCustomerTypes`
  - `useLocations`
- Query client is bootstrapped in `app/providers.tsx`.

## Form state

- Booking payload state is in `react-hook-form`:
  - `customer`, `location`, `dateTime`, `name`, `email`, `phone`, `specialRemark`, `concern`
- Validation belongs to form state, not query cache.

## Local UI state

- Animation and flow state:
  - current step
  - transition timing
  - local temporary calendar interactions

## Generated API types

- In production, mock contracts in `app/lib/mock-booking-api.ts` should be replaced by generated SDK types.
- Rule: map generated types once at boundary layer; never leak transport-level shapes into UI components.
