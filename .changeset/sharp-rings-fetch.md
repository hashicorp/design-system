---
"@hashicorp/design-system-components": major
---

Add `Hds::Dropdown::Header` and `Hds::Dropdown::Footer` as generic blocks to `Hds::Dropdown`

Rename `Hds::Dropdown` internal CSS class `hds-dropdown-list` → `hds-dropdown__list`

The `hds-dropdown__list` element is now wrapped in a `hds-dropdown__content` element to accommodate the new header and footer elements. As a result, the following modifiers will be applied to the wrapper element.
 - `hds-dropdown-list--fixed-width` → `hds-dropdown__content--fixed-width`
 - `hds-dropdown-list--position-left` → `hds-dropdown__content--position-left`
 - `hds-dropdown-list--position-right` → `hds-dropdown__content--position-right`

**Note:** If test assertions are relying on these class names, tests will fail. If extensions/overrides have been applied to these classes, they will suffer visual changes.
