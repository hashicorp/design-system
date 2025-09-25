---
"@hashicorp/design-system-components": patch
---

Dependencies `ember-a11y-refocus` and `@glimmer/component` upgraded.

<!-- START components/side-nav -->
`SideNav` - Fixed the type of `@a11yRefocusNavigationText` to match the expected type from `ember-a11y-refocus`. The new type is `(transition: Transition) => boolean` instead of `string`.
<!-- END -->

<!-- START components/app-header -->
`AppHeader` - Fixed the type of `@a11yRefocusNavigationText` to match the expected type from `ember-a11y-refocus`. The new type is `(transition: Transition) => boolean` instead of `string`.
<!-- END -->
