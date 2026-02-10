## 6.0.0

Fixed issue with disabled styles for nested elements in AppHeader not applying to non-HDS components when AppSideNav is open in mobile view


## 5.1.0

Optimized CSS used to apply dark theme styles to Buttons & Dropdowns


## 5.0.0

Fixed the type of `@a11yRefocusRouteChangeValidator` to match the expected type from `ember-a11y-refocus`. The new type is `(transition: Transition) => boolean` instead of `string`.


## 4.24.1

Fixed color inheritance for Buttons within `DialogPrimitive` based components (such as the `Modal` and `Flyout`) when triggered from within the `AppHeader`


## 4.23.0

return `close` callback to the `:logo` named block so the menu actions can be hidden programmatically when the component is in a mobile view.


Fixed classname so that non-active controls in the `AppHeader` will be styled as disabled when the `AppSideNav` is expanded and in overlay mode


## 4.22.0

Changed the default breakpoint from `lg` to `md`.


## 4.21.1

Added `close` callback to the `:globalActions` and `:utilityActions` named blocks so the menu actions can be hidden programmatically when the component is in a mobile view.

## 4.21.0

Refactored the Home Link, removed the `@ariaLabel` argument, added `@text` (should replace `@ariaLabel`) and `@isIconOnly` arguments.

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
