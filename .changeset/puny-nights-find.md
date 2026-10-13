---
"@hashicorp/design-system-components": patch
---

<!-- START components/form/primitives -->
`Form::Field` - Fixed the DOM order of the `flag` layout (used by Checkbox, Radio, and Toggle) so the `<input>` appears before the `<label>`, matching the visual order for screen readers. The visual layout is unchanged.
<!-- END -->

<!-- START components/form/radio -->
`Form::Radio::Field` - Fixed the DOM order so the `<input>` appears before the `<label>`, matching the visual order for screen readers.
<!-- END -->

<!-- START components/form/checkbox -->
`Form::Checkbox::Field` - Fixed the DOM order so the `<input>` appears before the `<label>`, matching the visual order for screen readers.
<!-- END -->

<!-- START components/form/toggle -->
`Form::Toggle::Field` - Fixed the DOM order so the `<input>` appears before the `<label>`, matching the visual order for screen readers.
<!-- END -->