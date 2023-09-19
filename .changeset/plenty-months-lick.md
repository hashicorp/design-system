---
"@hashicorp/design-system-components": major
---

 - Add `Hds::Form::VisibilityToggle` as a form base element
 - `Hds::Form::TextInput::Field` - Add `Hds::Form::VisibilityToggle` to password inputs (controlled via `@hasVisibilityToggle` - Notice that this is set to be visible by default now)
 - `Hds::Form::MaskedInput` - Refactor to use `Hds::Form::VisibilityToggle`
 - `Hds::Form::MaskedInput` - Rename `@isMasked` to `@isContentMasked`

To migrate `Hds::Form::MaskedInput` instances replace `@isMasked` arguments with `@isContentMasked`
