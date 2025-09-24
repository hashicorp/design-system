---
"@hashicorp/design-system-components": major
---

<!-- START components/application-state -->

`ApplicationState` - Removed the opinionated `margin: 0 auto;` rule from the component's root element to delegate horizontal alignment control to the consumer.

- Added the new `@isAutoCentered` argument (which defaults to `true`) to preserve the existing centering behavior while allowing consumers to disable it when needed.
<!-- END -->
