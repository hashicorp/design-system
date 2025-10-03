---
"@hashicorp/design-system-components": patch
---

<!-- START components/modal -->
`Modal` - Refactored the component to not use `ember-render-modifiers` which fixes issues where the DOM may not be cleaned up when the Modal is closed. 
<!-- END -->

<!-- START components/flyout -->
`Flyout` - Refactored the component to not use `ember-render-modifiers` which fixes issues where the DOM may not be cleaned up when the Flyout is closed. 
<!-- END -->