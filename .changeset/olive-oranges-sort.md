---
"@hashicorp/design-system-components": patch
---

<!-- START layouts/app-frame -->
`AppFrame` - Added a default `aria-label` ("Sidebar") to the `AppFrame::Sidebar` `<aside>` element so the landmark has an accessible name. Consumers can override it by passing their own `aria-label` or `aria-labelledby`.
<!-- END -->

<!-- START components/app-side-nav -->
`AppSideNav` - Changed the visually hidden `<h2>` used as the accessible label to a `<div>`.
<!-- END -->
