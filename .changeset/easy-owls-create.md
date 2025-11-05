---
"@hashicorp/design-system-components": major
---

<!-- START components/application-state -->

`ApplicationState` - Replaced the default opinionated `margin: 0 auto;` rule from the component's root element with a new `@isAutoCentered` argument (which defaults to `true`, to preserve the existing centering behavior). This delegates the horizontal alignment control to the consumers, allowing them to disable it when needed.
<!-- END -->
