---
"@hashicorp/design-system-components": minor
---

Added new custom sort feature support to table component:

- Adds `sortingFunction` support in `@columns` declaration
- Adds `sortedMessageText` support for custom sorting message
- Updates the `aria-sort` to fallback to "none" instead of "null" (per spec)
- Adds support for the `{{each}}` loop's `key` to be defined with `identityKey` (optional; falls back to the Ember default if none is provided)
