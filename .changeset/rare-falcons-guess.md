---
"@hashicorp/design-system-components": patch
---

<!-- START components/flyout -->
`Flyout` - Replaced custom box shadow with standard `elevation-overlay-box-shadow` token.
<!-- END -->

<!-- START components/form/primitives -->
`Form Primitives` - Replaced rendering of text via HDS `Text` component and used standard HTML tags, then updated CSS styles to use newly added component-level design tokens.

Components updated:

- `FormCharacterCount`
- `FormError`
- `FormHelperText`
- `FormIndicator`
- `FormLabel`
- `FormLegend`
<!-- END -->

<!-- START components/icon-tile -->
`IconTile` - Replaced `[product]-colored` icon with standard `[product]` icon in `@logo="[product]"` variant.
<!-- END -->

<!-- START components/link/standalone -->
`LinkStandalone` - Set explicit secondary hover state color to avoid possible overrides.
<!-- END -->

<!-- START components/pagination -->
`Pagination` - Multiple changes:

- Added extra modifier classes `hds-pagination--numbered`/`hds-pagination—compact` to variants.
- Removed extra whitespace in label for `PaginationSizeSelector`.
<!-- END -->

<!-- START components/tag -->
`Tag` - Multiple changes:

- Added extra modifier classes `hds-tag--is-interactive`/`hds-tag--is-static` to variants.
- Fixed classes selectors for `focus` state (no visible changes).
<!-- END -->
