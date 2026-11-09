---
"@hashicorp/design-system-components": patch
---

<!-- START components/tabs -->
`Tabs` - Replaced internal usage of `@ember/render-modifiers` with `ember-modifier`. Tabs and panels now register once rendering has finished, and a selected tab rendered after the first render (for example in an `each` loop) is selected as soon as it registers.
<!-- END -->
