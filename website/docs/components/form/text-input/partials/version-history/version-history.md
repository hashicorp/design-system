## 6.6.0

Fixed a few accessibility issues in `Form::TextInput::Field`, including:

- Changed `@visibilityToggleAriaLabel` to have a static value for visible and hidden states. Added the `aria-pressed` attribute to the visibility toggle button to communicate state.
- Added `@visibilityToggleAriaMessageTextWhenVisible` argument to set a custom message for the visible state.

## 6.1.1

Fixed `TextInputField` signature element to be `HTMLInputElement` instead of `HTMLElement`.


## 6.1.0

Converted component to gts format.


## 4.21.0

Added `@id` and `@ariaDescribedBy` arguments to `Form::TextInput::Base`.

## 4.15.0

Aligned private class properties to follow a standardized notation

## 4.7.0

Added support for `month`, `week`, and `tel` input types
