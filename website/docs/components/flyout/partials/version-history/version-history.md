## 5.2.0

Updated variable controlling the `Flyout` max-width to align with the `AppSideNav` minimized width


## 5.0.0

Removed deprecated `HdsFlyoutHeader`, `HdsFlyoutBody`, `HdsFlyoutDescription`, and `HdsFlyoutFooter` subcomponents.


## 4.24.1

Refactored the component to not use `ember-render-modifiers` which fixes issues where the DOM may not be cleaned up when the Flyout is closed.


## 4.15.0

Aligned private class properties to follow a standardized notation

## 4.13.0

Added `@returnFocusTo` argument to control where the browser focus is returned once the flyout is closed

Removed `@isDismissDisabled` from signature (not an actual argument)

## 4.12.0

Fixed issue with `box-sizing` inheritance due to a `all: unset` CSS rule applied to the `DialogPrimitive` subcomponent

## 4.10.0

Changed the HTML element wrapping the tagline and title from a `<div>` to a `<h1>` in `Flyout.Header`. If you have a heading HTML tag inside the header yield block, either remove it or change it to a `<span>`.

## 4.7.0

In this version, the Flyout sub-components have been deprecated and replaced with the equivalent [DialogPrimitive](/utilities/dialog-primitive) sub-components (shared also with the [Modal](/components/modal) component). The deprecated Flyout sub-components will be removed in the next major release.

To do the migration, if you use the `<Hds::Flyout::***>` invocation:

| Deprecated:           | Replace with:                  |
|-----------------------|--------------------------------|
| `Flyout::Header`      | `DialogPrimitive::Header`      |
| `Flyout::Description` | `DialogPrimitive::Description` |
| `Flyout::Body`        | `DialogPrimitive::Body`        |
| `Flyout::Footer`      | `DialogPrimitive::Footer`      |

If instead you use the `(component hds/flyout/***)`:

| Deprecated:              | Replace with:                     |
|--------------------------|-----------------------------------|
| `hds/flyout/header`      | `hds/dialogprimitive/header`      |
| `hds/flyout/description` | `hds/dialogprimitive/description` |
| `hds/flyout/body`        | `hds/dialogprimitive/body`        |
| `hds/flyout/footer`      | `hds/dialogprimitive/footer`      |

In the refactoring, we have been able to maintain existing CSS class names to avoid breaking current tests and CSS overrides in consumers' codebases.
