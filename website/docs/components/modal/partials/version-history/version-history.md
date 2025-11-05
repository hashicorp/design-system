## 5.0.0

Removed deprecated `HdsModalHeader`, `HdsModalBody`, and `HdsModalFooter` subcomponents.


## 4.24.1

Refactored the component to not use `ember-render-modifiers` which fixes issues where the DOM may not be cleaned up when the Modal is closed.


## 4.20.2

Reverted changes introduced in [#2846](https://github.com/hashicorp/design-system/pull/2846) and [#2902](https://github.com/hashicorp/design-system/pull/2902) related to the click behavior outside the modal when dismissing is disabled

## 4.20.0

Fixed bug with click event listener not properly removed

## 4.19.0

Fixed issue where conditionally disabling ability to dismiss the `Modal` breaks click outside to dismiss.

Fixed issue with focus trap when modal is displayed inline.

## 4.15.0

Aligned private class properties to follow a standardized notation

## 4.13.0

Added `@returnFocusTo` argument to control where the browser focus is returned once the modal is closed

Fixed `@isDismissDisabled` functionality

## 4.12.0

Fixed issue with `box-sizing` inheritance due to a `all: unset` CSS rule applied to the `DialogPrimitive` subcomponent

## 4.10.0

Changed the HTML element wrapping the tagline and title from a `<div>` to a `<h1>` in `Modal.Header`. If you have a heading HTML tag inside the header yield block, either remove it or change it to a `<span>`.

## 4.7.0

In this version, the Modal sub-components have been deprecated and replaced with the equivalent [DialogPrimitive](/utilities/dialog-primitive) sub-components (shared also with the [Flyout](/components/flyout) component). The deprecated Modal sub-components will be removed in the next major release.

To do the migration, if you use the `<Hds::Modal::***>` invocation:

| Deprecated:           | Replace with:                  |
|-----------------------|--------------------------------|
| `Modal::Header`      | `DialogPrimitive::Header`      |
| `Modal::Body`        | `DialogPrimitive::Body`        |
| `Modal::Footer`      | `DialogPrimitive::Footer`      |

If instead you use the `(component hds/modal/***)`:

| Deprecated:              | Replace with:                     |
|--------------------------|-----------------------------------|
| `hds/modal/header`      | `hds/dialogprimitive/header`      |
| `hds/modal/body`        | `hds/dialogprimitive/body`        |
| `hds/modal/footer`      | `hds/dialogprimitive/footer`      |

In the refactoring, we have been able to maintain existing CSS class names to avoid breaking current tests and CSS overrides in consumers' codebases.
