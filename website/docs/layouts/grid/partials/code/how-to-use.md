## How to use this component

!!! Insight

**Code tip**

While it’s not necessary to be familiar with CSS3 grid specifications to use this component, some knowledge may be helpful in achieving more complex layouts.

A helpful reference with clear examples: [CSS Tricks: Complete grid layout guide](https://css-tricks.com/snippets/css/complete-guide-grid/).
!!!

The `Layout::Grid` and optional `Layout::Grid::Item` components provide a way to quickly build out flexible grid-based layouts of components or elements without needing to write a lot of custom CSS code or understand all the intricacies of CSS grid styles.

### Basic usage


!!! Info

**Code consideration**

There is no strict need to use the `Layout::Grid::Item` subcomponent as a direct child of `Layout::Grid`; use it only when necessary to tweak grid styles of an individual child item such as via the `@colspan/@rowspan` arguments (to avoid rendering an extra Ember component).
!!!

The simplest way to implement a grid layout is by using the `Layout::Grid` component to wrap content directly. A grid layout of equal width “columns” is created by default.

[[code-snippets/grid-basic]]

Every child of the **grid container** will be stretched to fit evenly within the underlying grid column tracks behaving as a **grid item** (for details on what this means, refer to the guide linked at the top of the page).

In some cases, it may be necessary to wrap one or more content items within the optional `Layout::Grid::Item` component. i.e., to group content together within a column or row, prevent content from being stretched to fit the underlying grid column width, or to make use of `rowspan` and `colspan` options in order to create more complex layouts. (See below for more details and examples on these features.)

### Preventing content stretch

Wrap content in a `Grid::Item` to prevent it from stretching to fill the grid column.

[[code-snippets/grid-no-stretch]]

### Tag

!!! Warning

**Accessibility alert**

While, by default, the component renders a `<div>`, we invite consumers to consider which semantic HTML tag is the correct one for the context in which the text is used to meet WCAG Success Criterion [1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html) as the visual experience should match what is presented to the user with assistive technology.

!!!

To specify the HTML tag used to render the grid container and/or item(s), use the `@tag` argument.

[[code-snippets/grid-tag execute=false]]

### Spacing

!!! Warning

**Important**

The **pre-defined value(s)** passed to the `@gap` argument **must be string(s)**, not numbers!

!!!

To control the spacing between grid items, use the `@gap` argument.

Pass a single value to set equal spacing between columns & rows.

[[code-snippets/grid-spacing]]

To differentiate the vertical and horizontal spacing between items when they wrap on multiple rows, provide an array of two values to the `@gap` argument.

[[code-snippets/grid-spacing-complex]]

The first value in the array refers to the vertical gap between “rows” of items (`row-gap` in CSS), the second one to the horizontal spacing between “columns” of items (`column-gap` in CSS).

The `@gap` argument accepts only **pre-defined values**, it can’t be used to provide custom spacing values. Refer to the [Component API](#component-api) section for details on which values are accepted.

If you need to provide custom spacing values, see below how you can use a special escape hatch for this.

#### Non-standard gap values

If you absolutely have to use non-standard spacing value(s) for the grid `gap`, you can use the internal `--hds-layout-grid-row-gap` and `--hds-layout-grid-column-gap` CSS variables and pass custom values to them (e.g., via a local CSS variable or an inline style).

[[code-snippets/grid-spacing-custom execute=false]]

In this case we’re overwriting only the “column” gap value via the custom CSS class.

If the grid items are wrapping on multiple lines, you have to overwrite both the “row” and “column” gap values.

[[code-snippets/grid-spacing-custom-complex execute=false]]

## Column width management

There are two options for controlling the widths of columns within the `Grid`, `@columnMinWidth` and `@columnWidth`.

Using `@columnMinWidth` creates a semi-fluid layout. This means that if there are fewer items than fit in a single row, the columns will automatically adjust so that their combined widths add up to 100%.

If you instead want to create a more “fixed” layout, in which the column widths remain consistent no matter how few items are in a single row, use `@columnWidth` instead.

### Column min width

<!-- !!! Info

Using `@columnMinWidth` creates a semi-fluid layout. This means that if there are fewer items than fit in a single row, the columns will automatically adjust so that their combined widths add up to 100%.

If you instead want to create a more “fixed” layout, in which the column widths remain consistent no matter how few items are in a single row, use `@columnWidth` instead.

!!! -->

Specify a `columnMinWidth` size to exercise control over the maximum number of columns to occupy a row. If the total widths of the columns add up to more than 100% of the parent, they will automatically wrap to the next row as necessary to fit.

Note: The `gap` size will be automatically subtracted from the `columnMinWidth`, so take this into account when specifying a column min width.

#### Using percentage values

Column min-widths specified as a percentage value will maintain the same size ratio in all browser screen widths.

[[code-snippets/grid-min-width-default]]

#### Semi-fluid width behavior

Column-width will automatically adjust to maintain a combined width of 100%.

[[code-snippets/grid-min-width-percentage]]

#### Using fixed unit values

Column min-widths specified using pixels or other fixed units, allows you to create layouts which are “automatically” responsive.

##### Grid within a wider view

Narrow your browser window to see the responsive behavior.

[[code-snippets/grid-min-width-fixed]]

##### The same grid within a narrower view

At the specified column min width, columns are forced to stack in this narrower view.

[[code-snippets/grid-min-width-fixed-mobile]]

### Column width

To create column layouts that are more “fixed” vs. fluid, use `columnWidth` to specify a width for the columns.

[[code-snippets/grid-width-fixed]]

### Align

Use the `@align` argument to align grid items to the "start", "end", "center" or "stretch" them within the grid parent.

Note: The `Grid` parent will need a height set for the effect to be visible.

[[code-snippets/grid-align]]

### Colspan & rowspan

Use the `colspan` and `rowspan` arguments of the `Grid::Item` component to set the number of columns or rows an item should occupy.

The following example has an underlying 4-column grid specified by setting a `columnMinWidth` of “25%”. It uses `colspan` and `rowspan` to create a flexible layout roughly resembling a typical web page layout.

Note: By default, if a height is set on the `Grid` parent, grid row heights will stretch proportionally to fill the `Grid`. To instead make a row conform to the minimum height of its content, you can pass an inline style as shown in the example.

[[code-snippets/grid-span]]

---

## Common layout patterns

!!! Warning

**Important**

The examples below are meant to show how one _could_ use the `Layout::Grid` component to implement certain common/standard UI patterns. They're **not** meant to be taken literally as they are and be used in production code. 

!!!

Below are examples of common layout patterns that can be achieved using the `Layout::Grid` component in combination with other HDS components.

### Card layouts

Note: The following example makes use of nested `Grid` and [Flex](/layouts/flex) components to achieve its layout. This may be overkill in actual practice but demonstrates the possibilities for achieving layouts with just these layout components alone.

#### Basic 3-column layout

[[code-snippets/grid-card-column]]

#### More complex layout

Wrap content with a `Grid::Item` as needed to achieve more complex layouts.

[[code-snippets/grid-card-complex]]
