---
"@hashicorp/design-system-components": minor
---

`Tabs` - Refactored logic for `Tabs` component + `Tab/Panel` sub-components to support more complex use cases:

- introduced `@selectedTabIndex` argument to control the "selected" tab from the consuming application, e.g. via query params (effort spearheaded by @MiniHeyd)
- fixed issue with nested tabs not initializing the "selected" indicator correctly
- fixed issue with dynamic tab content not updating the "selected" indicator correctly

