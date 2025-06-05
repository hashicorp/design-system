## 4.20.0

Removed usage of `--hds-app-desktop-breakpoint` CSS variable and relied on the `@breakpoint` argument for override of mobile behavior

Fixed import path for `hds-breakpoints`

## 4.19.0

Formally published the `AppHeader` component. To be used in conjunction with the `AppFrame` and the `AppSideNav` components.

## 4.15.0

Aligned private class properties to follow a standardized notation

## 4.10.0

Changed default value of `@a11yRefocusSkipTo` from "#main" to "#hds-main"

Hid the closed menu content in mobile view using CSS instead of conditionally rendering/not rendering the menu content.

Added `NavigationNarrator` with associated arguments to provide a "skip link".

Styled inoperable actions as disabled (which occurs when the `SideNav` is expanded in mobile view)

Fixed styling issue to prevent `Button` and `Dropdown` nested within another `Dropdown` from inheriting dark theme.

Fixed issue with mobile menu to prevent tabbing to hidden content and hiding it from assistive technology when closed.

## 4.8.0

Added the `AppHeader` component and its sub-components, but did not publish them for public use.

Also added the following design tokens:

- `--token-app-header-height`
- `--token-app-header-home-link-size`
- `--token-app-header-logo-size`
