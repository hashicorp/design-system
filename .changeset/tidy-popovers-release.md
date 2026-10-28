---
"@hashicorp/design-system-components": patch
---

<!-- START utilities/popover-primitive -->
`PopoverPrimitive` - Fixed a memory leak where the positioning listeners on `window`, `visualViewport`, and scrollable ancestors were never removed, keeping destroyed popovers and their owners in memory. This also affects `Dropdown`, `RichTooltip`, and `Breadcrumb` truncation.
<!-- END -->

<!-- START components/form/super-select -->
`SuperSelect` - Fixed a memory leak where every reposition added another set of positioning listeners that were never removed.
<!-- END -->
