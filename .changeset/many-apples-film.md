---
"@hashicorp/design-system-components": patch
---

`Breadcrumb` - Implemented `aria-controls` in `Breadcrumb::Truncation` for a11y improvements with toggled content from `PopoverPrimitive`
`Dropdown` - Implemented `aria-controls` in `Dropdown::Toggle::Button` for a11y improvements with toggled content from `PopoverPrimitive`
`PopoverPrimitve` - Implemented `aria-controls` in toggle element for a11y improvements with toggled content
`RichTooltip` - Removed explicitly setting `aria-controls` in `RichTooltip::Toggle` as it is now set through the `PopoverPrimitive`
