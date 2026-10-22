---
"@hashicorp/design-system-components": patch
---

<!-- START components/code-editor -->
`CodeEditor` - Fixed a race condition where the editor setup was not tracked by Ember's test waiters, so `render()` and `settled()` could resolve before the editor existed.
<!-- END -->
