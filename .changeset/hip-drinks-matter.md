---
"@hashicorp/design-system-components": major
---

`Form::CharacterCount` - refactored the component, removing `onInsert` callback and adding use `@value` argument

To migrate:

- for standalone `Form::CharacterCount` instances you must pass in a `@value` arguments representing the value of the referenced input
- when used as a contextual component `F.CharacterCount` in `Form::[MaskedInput|TextInput|Textarea]::Field` make sure the form control is updating the associated `@value` on input (usually using `{{on "input" (fn this.updateValue)}}` function)
