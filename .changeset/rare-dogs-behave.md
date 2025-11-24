---
"@hashicorp/design-system-components": patch
---

Removed Safari bug fix styles and :focus fallbacks from focus ring mixin styles.

<!-- START components/button -->
Remove outdated browser compatibility styles in focus states that are no longer necessary.

* Removed Safari bug fix outline-style declaration
* Simplified focus state handling by removing :focus fallbacks and keeping only :focus-visible
* Added missing :focus-visible selectors to disabled button states
<!-- END -->

<!-- START components/dropdown -->
Removed Safari bug fix styles and simplified dropdown focus state handling.
<!-- END -->
