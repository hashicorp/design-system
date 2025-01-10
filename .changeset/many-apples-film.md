---
"@hashicorp/design-system-components": patch
---

`Breadcrumb` - Implement `aria-controls` in `Breadcrumb::Truncation` for a11y improvements with toggled content from `PopoverPrimitive`
`Dropdown` - Implement `aria-controls` in `Dropdown::Toggle::Button` for a11y improvements with toggled content from `PopoverPrimitive`
`PopoverPrimitve` - Implement `aria-controls` in toggle element for a11y improvements with toggled content
`RichTooltip` - Remove explicitly setting `aria-controls` in `RichTooltip::Toggle` as it is now set through the `PopoverPrimitive`
