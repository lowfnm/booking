# Agent Playbook (Codex / Claude Code)

## Prompt template for next screen

Use this exact structure:

1. **Goal**: one screen only.
2. **Reused components**: list `app/components/ui/*` and domain reusable blocks.
3. **State split**: URL / query cache / form / local UI.
4. **Acceptance matrix**: loading + empty + error + selected.
5. **Do not**: no duplicate components, no inline token values.

## Guardrails checklist (must pass)

- [ ] No duplicate card/button component introduced.
- [ ] Story added for each new reusable component.
- [ ] Query hooks only in `app/lib/queries`.
- [ ] Form schema remains in form layer.
- [ ] Responsive behavior tested in Storybook viewport.

## Diff examples to reject

1. **Component fork**
   - Adds `ServiceOptionCardV2` with mostly identical styles.
   - Reject: extend existing variants instead.

2. **State mixing**
   - Stores fetched options in `useState` and bypasses React Query.
   - Reject: breaks cache semantics and loading states.

3. **Token bypass**
   - Hardcoded colors (`#b08f55`) directly in JSX classes.
   - Reject: must use semantic tokens (`primary`, `muted`, etc.).
