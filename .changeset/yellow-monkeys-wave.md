---
"@hashicorp/design-system-components": major
---

`Form::RadioCard` - remove the `@layout` property
`Form::RadioCard::Group` - repurpose the `@layout` property to either `horizontal` (default) or `vertical`

To migrate `Form::RadioCard` and `Form::RadioCard::Group` instances without encountering visual changes:
 - make sure all instances with `@layout="fixed"` have a `@maxWidth` defined, then remove the `@layout="fixed"` definition
 - remove all `@layout="fluid"` definitions
