## How to use this component

A simple invocation of the component requires a contextual `<PH.Title>` which yields its content within an `<h1>`.

[[code-snippets/page-header-basic]]

### Contextual components

!!! Info

**Code consideration**

The layout of this component is responsive and adjusts based on the width of its bounding container. The examples captured here may not be indicative of how the component will render within a specific application or layout.

The responsive layout is achieved using [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_container_queries), which creates a new [stacking context](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context). We recommend setting the appropriate `z-index` value to the Page Header (or its parent container) to make sure its content–for example a Dropdown–is not obscured by other elements on the page.
!!!

The Page Header uses a number of contextual components that either yield their content or render a specific Helios component.

[[code-snippets/page-header-contextual]]

### Custom content

Pass custom metadata to the component with a `generic` contextual component that yields its contents.

[[code-snippets/page-header-custom]]
