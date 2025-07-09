---
"@hashicorp/design-system-components": patch
---

<!-- START components/copy/button -->
`Copy::Button` - Made type of exported `SIZES` constant `HdsCopyButtonSizes[]` instead of `string[]` for improved type safety.
<!-- END -->

<!-- START components/copy/snippet -->
`Copy::Snippet` - Made type of exported `COLORS` constant `HdsCopySnippetColors[]` instead of `string[]` for improved type safety.
<!-- END -->

<!-- START components/dropdown -->
`Dropdown` - Updated the type for following exported constants for improved type safety:
* `POSITION`: is now typed as `HdsDropdownPositions[]`
* `COLORS`: is now typed as `HdsDropdownListItemInteractiveColors[]`
* `SIZES`: is now typed as `HdsDropdownToggleButtonSizes[]`
<!-- END -->
