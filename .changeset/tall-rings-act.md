---
'@hashicorp/design-system-components': patch
---

Introduce the `hds-resolve-link-to-component` utility to correctly resolve the LinkTo component when `@isRouteExternal` is set on `HdsBreadcrumbItem` or `HdsInteractive`. Consumers are now required to install `ember-engines` when `@isRouteExternal` is `true`.
