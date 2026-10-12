## 6.6.0

Fixed a few accessibility issues in `Form::MaskedInput::Base` and `Form::MaskedInput::Field`, including:

- Changed `@visibilityToggleAriaLabel` to have a static value for visible and hidden states. Added the `aria-pressed` attribute to the visibility toggle button to communicate state.
- Added `@visibilityToggleAriaMessageTextWhenVisible` argument to set a custom message for the visible state.

## 6.2.0

Fixed element typing to match the underlying control element (`input` or `textarea`) instead of a generic `HTMLElement`.

## 6.1.0

Converted component to gts format.


## 6.0.0

Updated HdsIntlService service declaration to align how services are declared


## 4.22.0

Translated template strings


## 4.21.0

Added `@ariaDescribedBy` argument to `Form::MaskedInput::Base`.

## 4.17.1

Added support for externally controlled content masking

## 4.12.0

Changed textarea `scrollbar-width` to `thin` to reduce overlap with toggle button.
