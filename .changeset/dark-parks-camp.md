---
"@hashicorp/design-system-components": minor
---

HdsModal - Only call the `onClose` action when the modal is explicitly closed rather than just removed from the DOM

<!-- START components/modal -->

`Modal` - Fixed a teardown race condition by preventing @onClose from firing when the component is destroyed, avoiding "owner destroyed" errors in consumers

<!-- END -->

<!-- START components/flyout -->

`Flyout` - Fixed a teardown race condition by preventing @onClose from firing when the component is destroyed, avoiding "owner destroyed" errors in consumers

<!-- END -->
