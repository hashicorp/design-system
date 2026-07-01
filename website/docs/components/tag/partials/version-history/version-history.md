## 6.3.0

Multiple changes:

- Added extra modifier classes `hds-tag--is-interactive`/`hds-tag--is-static` to variants.
- Fixed classes selectors for `focus` state (no visible changes).

## 6.2.0

Fixed a runtime error when `ResizeObserver` is undefined (e.g. SSR).

## 6.1.0

Removed usage of `hdsLinkToModels` and `hdsLinkToQuery` helpers, instead forward the arguments to `HdsInteractive`.


Converted component to gts format.


## 4.21.1

Fixed a performance issue when many tags are present on a page caused by the ResizeObserver

## 4.19.0

Updated structure to prevent inheritance overrides for font styles

## 4.17.1

Truncated any text that is longer than about 20 characters, and added a tooltip with the full text when truncation occurs

Added `@tooltipPlacement` argument
