## 6.0.0

Updated router service declaration to align how services are declared


Fixed an a11y issue by preventing a screenreader from reading content outside the menu when expanded on narrow devices.


## 4.22.0

Translated template strings

## 4.21.1

Fixed issue causing the focus ring of the first and last items within the Panel to be cut off

Removed extra transparent border and background when rendered as a `<button>` element

Applied transparent background to the `AppSideNav::List::Link` element to avoid overlapping with previous item's focus ring

## 4.20.0

Removed usage of `--hds-app-desktop-breakpoint` CSS variable, added `@breakpoint` argument, and relied on it for override of mobile behavior

Fixed import path for `hds-breakpoints`

Fixed bug where scrolling was blocked when the `AppSideNav` was expanded on desktop views. Also fixed bug which allowed user to focus links that were visually hidden.

Fixed component types for `AppSideNav::Portal` and `AppSideNav::Portal::Target` to no longer require `@target` or `@name`.

## 4.19.0

Formally published the `AppSideNav` component. To be used in conjunction with the `AppFrame` and the `AppHeader` components.

## 4.15.0

Aligned private class properties to follow a standardized notation

## 4.8.0

Added the `AppSideNav` component and its sub-components, but did not publish them for public use.
