---
"@hashicorp/design-system-components": minor
---

`ApplicationState`:

- Spacing and alignment updates
- New `@align` (`left` (default), `center`) argument for aligning content
- Added new yielded `Media` child component

`ApplicationState::Header`:

- The header now supports an optional `@titleTag` argument that can override the default title element (`div`)

`ApplicationState::Footer`:

- The footer now yields `Button` and `Dropdown` components as well as `LinkStandalone`
- The visual separator has been removed to modernize the component’s visual look
