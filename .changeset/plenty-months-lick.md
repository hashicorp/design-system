---
"@hashicorp/design-system-components": major
---

`Hds::Form::VisibilityToggle` - Added component as a form base element

`Hds::Form::TextInput::Field` - Added `Hds::Form::VisibilityToggle` to password inputs (controlled via `@hasVisibilityToggle` - Notice that this is set to be visible by default now)

`Hds::Form::MaskedInput` - Refactored to use `Hds::Form::VisibilityToggle`

`Hds::Form::MaskedInput` - Renamed `@isMasked` to `@isContentMasked`

To migrate:

- in `Hds::Form::MaskedInput` instances replace `@isMasked` arguments with `@isContentMasked`
