---
"@hashicorp/design-system-components": patch
---

<!-- START components/form/text-input -->

`Form::TextInput` - Fixed the translation key for the password-hidden announcement.

Applications overriding `hds.components.form.text-input.field.toggle-password-is-hidden` must move that override to `hds.components.form.text-input.field.password-is-hidden`.

<!-- END -->
