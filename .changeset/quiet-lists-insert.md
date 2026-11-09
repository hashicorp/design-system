---
"@hashicorp/design-system-components": patch
---

<!-- START components/alert -->
`Alert` - Replaced internal usage of `@ember/render-modifiers` with `ember-modifier`. The `role` and `aria-live` attributes now update when `@color` changes.
<!-- END -->

<!-- START components/breadcrumb -->
`Breadcrumb` - Replaced internal usage of `@ember/render-modifiers` with `ember-modifier`. `@didInsert` is still called once with the list element, which is now reflected in its type, but it now runs once rendering has finished instead of during it.
<!-- END -->

<!-- START components/dropdown -->
`Dropdown` - Replaced internal usage of `@ember/render-modifiers` with `ember-modifier` in the list of items.
<!-- END -->

<!-- START components/app-side-nav -->
`AppSideNav` - Replaced internal usage of `@ember/render-modifiers` with `ember-modifier` in `List::Title`.
<!-- END -->

<!-- START components/table/table -->
`Table` - Replaced internal usage of `@ember/render-modifiers` with `ember-modifier` in `ThSelectable`.
<!-- END -->

<!-- START components/time -->
`Time` - Replaced internal usage of `@ember/render-modifiers` with `ember-modifier`. Fixed a leak where the time service kept ticking for a date passed as a string, or for the previous date after `@date` changed.
<!-- END -->
