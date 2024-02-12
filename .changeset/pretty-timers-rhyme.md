---
"@hashicorp/design-system-components": major
---

`DialogPrimitive` - Added set of utility "dialog" sub-components to act as primitives for `Modal` and `Flyout` (and to be used as standalone subcomponents if needed)

`Modal` - Removed subcomponents `Modal::Header`, `Modal::Body`, and `Modal::Footer`.

`Flyout` - Removed subcomponents `Flyout::Header`, `Flyout::Description`, `Flyout::Body`, and `Flyout::Footer`.


How to migrate:

- for the `Modal` and `Flyout` subcomponents replace them with the equivalent corresponding `DialogPrimitive` ones
- we have introduced a new intermediate element in the DOM structure of `Modal` and `Flyout`; this may result in some CSS selectors being "broken" on the consumers side, if direct relying on the internal DOM structure, in which case consumers will have to manually update the CSS selectors to account for the updated DOM structure