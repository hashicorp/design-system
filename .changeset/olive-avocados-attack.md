---
"@hashicorp/design-system-components": major
---

Add `Checkmark`, `Checkbox` and `Radio` as `Hds::Dropdown::ListItem`s

Rename `Hds::Dropdown::ListItem` internal CSS classes as follows:
 - `hds-dropdown-list-item--copy-item` → `hds-dropdown-list-item--variant-copy-item`
 - `hds-dropdown-list-item--description` → `hds-dropdown-list-item--variant-description`
 - `hds-dropdown-list-item--generic` → `hds-dropdown-list-item--variant-generic`
 - `hds-dropdown-list-item--interactive` → `hds-dropdown-list-item--variant-interactive`
 - `hds-dropdown-list-item--separator` → `hds-dropdown-list-item--variant-separator`
 - `hds-dropdown-list-item--title` → `hds-dropdown-list-item--variant-title`

**Note:** If test assertions are relying on these class names, tests will fail. If extensions/overrides have been applied to these classes, they will suffer visual changes.
