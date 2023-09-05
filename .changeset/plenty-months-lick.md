---
"@hashicorp/design-system-components": major
---

 - Add `Hds::Form::VisibilityToggle` as a form base element
 - `Hds::Form::TextInput::Field` - Add `Hds::Form::VisibilityToggle` to password inputs (controlled via `@hasVisibilityToggle`)
 - `Hds::Form::MaskedInput` - Refactor to use `Hds::Form::VisibilityToggle`
 - `Hds::Form::MaskedInput` - Rename `@isMasked` to `@isContentMasked`
