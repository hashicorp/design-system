---
"@hashicorp/design-system-components": minor
---

<!-- START components/form/masked-input -->
`Form::MaskedInput` - Fixed a few accessibility issues in `Form::MaskedInput::Base` and `Form::MaskedInput::Field`, including:
- Changed `@visibilityToggleAriaLabel` to have a static value for visible and hidden states. Added the `aria-pressed` attribute to the visibility toggle button to communicate state.
- Added `@visibilityToggleAriaMessageTextWhenVisible` argument to set a custom message for the visible state.
<!-- END -->

<!-- START components/form/text-input -->
`Form::TextInput` - Fixed a few accessibility issues in `Form::TextInput::Field`, including:
- Changed `@visibilityToggleAriaLabel` to have a static value for visible and hidden states. Added the `aria-pressed` attribute to the visibility toggle button to communicate state.
- Added `@visibilityToggleAriaMessageTextWhenVisible` argument to set a custom message for the visible state.
<!-- END -->

<!-- START components/form/primitives/visibility-toggle -->
`Form::VisibilityToggle` - Added `@ariaMessageTextWhenVisible` argument to set a message for the visible state.
<!-- END -->
