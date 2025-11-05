## 4.24.1

Fixed color inheritance for Buttons within `DialogPrimitive` based components (such as the `Modal` and `Flyout`) when triggered from within the `SideNav`


## 4.22.0

Translated template strings


## 4.21.1

Removed extra transparent border when rendered as a `<button>` element

## 4.20.0

Fixed component types for `SideNav::Portal` and `SideNav::Portal::Target` to no longer require `@target` or `@name`.

## 4.19.0

Deprecated the `SideNav` component. Use the `AppSideNav` component in combination with the `AppHeader` component as a replacement.

Updated focus ring colors in interactive elements to fix a11y color contrast issues

## 4.18.1

Conditionally set `aria-labelledby` attribute for toggle button based on if `@ariaLabel` argument is provided.

## 4.14.0

Made accessibility-related improvements including:

- Changed `List::Title` to H3 and added visually hidden H2 to `SideNav`
- Replaced `aria-label` for `ToggleButton` with `aria-labelledby` and `aria-expanded`.

Fixed bug with hidden panels sometimes causing unnecessary overflow scrolling.

Deprecated the `@ariaLabel` argument as it is no longer needed. Its purpose is replaced by an added `aria-labelledby` attribute referencing the "hds-side-nav-header" `h2` combined with the use of `aria-expanded` on the Toggle button tab.

## 4.10.0

Added a default value of "#hds-main" for `@a11yRefocusSkipTo`.

Fixed styling issue to prevent `Button` and `Dropdown` nested within another `Dropdown` from inheriting dark theme.

Deprecated the `@withAppHeader` argument as it is no longer needed. If you are using this argument, simply remove it.

Deprecated the `SideNav::Header::IconButton` subcomponent. Use the [`Hds::Button` component](/components/button) with isIconOnly set to true as a replacement.

## 4.8.0

Added new `@withAppHeader` option to control the height of the Side Nav when there is also an [App Header](/components/app-header) in the application.
