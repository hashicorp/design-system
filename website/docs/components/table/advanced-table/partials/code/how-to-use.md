## How to use this component

The Advanced Table is a component meant to display tabular data to overcome limitations with the HTML `<table>` elements and increase the accessibility for complex features, like [nested rows](#nested-rows) and [a sticky header](#vertical-scrolling).

Instead of using the `<table>` elements, the Advanced Table uses `<div>`s with explicitly set roles (for example, instead of `<tr>`, it uses `<div role="row">`). This allows the Advanced Table to use [CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/grid) for styling.

### Basic Advanced Table

!!! Warning

**Consumer responsibility**

For documentation purposes, we’re imitating fetching data from an API and working with that as data model. Depending on your context and needs, you may want to manipulate and adapt the structure of your data to better suit your needs in the template code.

!!!

To use an Advanced Table, you will need to:

- pass the data model to the `@model` argument of the AdvancedTable component
- provide a `@columns` argument to describe the expected columns (see [Component API](#component-api) for details)
- insert your own content into the `:body` block (the component will take care of looping over the `@model`)
- use the `.data` key to access the `@model` record content (it’s yielded as `data`)

[[code-snippets/advanced-table-basic]]

### Nested rows

!!! Warning

It is not currently supported to have `@isStriped`, multi-select, or sortable columns with nested rows. If your use case requires any of these features, please [contact the Design Systems Team](/about/support).

!!!

For complex data sets where there is a parent row with several children, you can render them as nested rows. By default, the Advanced Table uses the `children` key on the `@model` argument to render the nested rows. To change the key used, set the `@childrenKey` argument on the Advanced Table.

To ensure the Advanced Table is accessible, the columns in the nested rows **must** match the columns of the parent rows. Otherwise the relationship between the parent and nested rows will not be clear to users.

Similar to the basic Advanced Table, you can insert your own content into the `:body` block and the component will take care of looping over the `@model` provided for the parent and nested rows. The component adds the expand/collapse button to the `[B].Th` component in each row that has children.

[[code-snippets/advanced-table-nested]]

### Reordering columns

!!! Info

Reorderable columns are not supported in instances of the Advanced Table that have nested rows or sticky columns.
!!!

Set the `@hasReorderableColumns` argument to `true` in order to make columns reorderable either by clicking and dragging on the column reorder handle, or by moving focus to the handle and using the right and left arrow keys.

Columns will render in the order they appear in the `@columns` array. However, this order can be overridden by providing an array of column keys to the `@columnOrder` argument.

Optionally, the `@onColumnReorder` attribute accepts a callback function that receives the updated column key order.

[[code-snippets/advanced-table-reorder]]

### Resizing columns

!!! Info

Resizable columns are not supported in instances of the Advanced Table that have nested rows.
!!!

Set the `@hasResizableColumns` argument to `true` in order to make columns resizable either by clicking and dragging on the column border with a mouse, or by moving focus to the resize border with a keyboard and using the right and left arrow keys.

Optionally, the `@onColumnResize` attribute accepts a callback function that receives the resized column's key and new size in CSS pixels (e.g., `"12px"`).

Reset the column to its original width by choosing the "Reset column width" option in the header cell context menu.

[[code-snippets/advanced-table-resize]]

By default, the minimum and maximum width of each column are set to `150px` and `800px` respectively. This can be overridden if necessary by passing either a `minWidth` or `maxWidth` argument to the `columns` array.

[[code-snippets/advanced-table-resize-customized]]

#### Content wrapping

By default, content within the cells will wrap according to the browser’s natural reflow. This may result in the layout shifting.

How resizing for the cell content works is determined by the implementation. For example, truncation with an ellipsis can be achieved by applying custom CSS to the relevant element within the table cell, e.g., `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;`.

[[code-snippets/advanced-table-wrapping]]

### Sorting

!!! Info

At this time, the Advanced Table does not support sortable nested rows. If this is a use case you require, please [contact the Design Systems Team](/about/support).
!!!

Add `isSortable=true` to the hash for each column that should be sortable.

[[code-snippets/advanced-table-sort]]

#### Pre-sorting columns

To indicate that a specific column should be pre-sorted, add `@sortBy`, where the value is the column’s key.

[[code-snippets/advanced-table-presort]]

##### Pre-sorting direction

By default, the sort order is set to ascending. To indicate that the column defined in `@sortBy` should be pre-sorted in descending order, pass in `@sortOrder="desc"`.

[[code-snippets/advanced-table-presort-order]]

#### Custom sort callback

To implement a custom sort callback on a column:

1. add a custom function as the value for `sortingFunction` in the column hash.
2. include a custom `onSort` action in your Table invocation to track the sorting order and use it in the custom sorting function.

This is useful for cases where the key might not be A-Z or 0-9 sortable by default, e.g., status, and you’re otherwise unable to influence the shape of the data in the model.

In this example, we are indicating that we want to sort on a status, which takes its order based on the position in the array:

[[code-snippets/advanced-table-custom-sort]]

### Filtering

The Advanced Table supports filtering through the `actions` named block and the `FilterBar` contextual component. The `FilterBar` contextual component utilizes the HDS Filter Bar component. You can read more about how the component works, and the features supported within it in the [Filter Bar component docs](/components/filter-bar).

The Filter Bar component doesn't handle filtering the data, that must still be done by the consumer, but it provides a way for users to submit filters and for the applied filters to be displayed.

[[code-snippets/advanced-table-filtering]]

### Density

To create a condensed or spacious Advanced Table, add `@density` to the Advanced Table’s invocation. Note that it only affects the table body, not the table header.

[[code-snippets/advanced-table-density]]

#### Horizontal alignment

To create a column that has right-aligned content, set `@align` to `right` on both the column’s header and cell (the cell’s horizontal content alignment should be the same as the column’s horizontal content alignment).

[[code-snippets/advanced-table-horizontal-align]]

### Tooltip

[Header cells](/components/table/advanced-table#headers) should be clear, concise, and straightforward whenever possible. However, there could be cases where the label is insufficient by itself and extra information is required. In this case, it’s possible to show a tooltip next to the label in the header:

[[code-snippets/advanced-table-tooltip]]

### Scrollable table

Consuming a large amount of data in a tabular format can lead to an intense cognitive load for the user. As a general principle, care should be taken to simplify the information within a table as much as possible.

We recommend using functionalities like [pagination](/components/pagination), [sorting](/components/table/advanced-table?tab=code#sortable-advanced-table), and [filtering](/patterns/filter-patterns) to reduce this load.

#### Vertical scrolling

For situations where the default number of rows visible may be high, it can be difficult for users to track which column is which once they scroll. In this case, the `maxHeight` argument can be used to set the maximum height of the Advanced Table which will also add a sticky header. This will make the column headers persist as the user scrolls.

If you want to set the `maxHeight` but not have a sticky header, set `hasStickyHeader` to false.

[[code-snippets/advanced-table-vertical-scroll]]

#### Horizontal scrolling

!!! Info

`@hasStickyFirstColumn` is not supported in instances of the Advanced Table that have nested rows.
!!!

There may be cases when it’s necessary to show an Advanced Table with a large number of columns and allow the user to scroll horizontally. The `@hasStickyFirstColumn` argument can be used to help users identify each row by persisting the first column as they scroll. In the header cell context menu, the user can also control pinning or unpinning the column.

The component adds the sticky styles to the `[B].Th` component in each row. If there is not a `[B].Th`, the styles will not work correctly.

[[code-snippets/advanced-table-sticky-column]]

If `@hasStickyFirstColumn` is set to `false`, the column will not be sticky, but in the header cell context menu there will be the option for the user to pin or unpin the column. If `@hasStickyFirstColumn` is `undefined`, no option will be available in the header cell context menu.

[[code-snippets/advanced-table-pin-column]]

### Empty state

When the data model for the Advanced Table contains no entries, an empty state is shown with a message stating that the table has no data available.

[[code-snippets/advanced-table-empty-state]]

The content shown when the model is empty can be customized using the `<:emptyState>` named block. Any content inside the block will be shown instead of the default message. It is recommended to use the [Application State](/components/application-state) component inside this block.

[[code-snippets/advanced-table-empty-state-custom]]

### Multi-select Advanced Table

!!! Callout

At this time, the Advanced Table does not support multi-select nested rows. If this is a use case you require, please [contact the Design Systems Team](/about/support).
!!!

A multi-select Advanced Table includes checkboxes enabling users to select multiple rows for purposes of performing bulk operations. Checking or unchecking the checkbox in the Advanced Table header either selects or deselects the checkboxes on each row in the body. Individual checkboxes in the rows can also be selected or deselected.

Add `isSelectable=true` to create a multi-select Advanced Table. The `onSelectionChange` argument can be used to pass a callback function to receive selection keys when the selected rows change. You must also pass a `selectionKey` to each row which gets passed back through the `onSelectionChange` callback which maps the row selection on the Advanced Table to an item in your data model.

#### Simple multi-select

!!! Warning

**Accessibility alert**

To make the Advanced Table accessible, each checkbox used for the selection needs to have a distinct `aria-label`. For this reason, you need to provide a `@selectionAriaLabelSuffix` value (possibly unique) to the rows in the Advanced Table's body.
!!!

This is a simple example of an Advanced Table with multi-selection. Notice the `@selectionKey` argument provided to the rows, used by the `@onSelectionChange` callback to provide the list of selected/deselected rows as argument(s) for the invoked function.

!!! Info

**Code consideration**

If you want the state of the checkboxes to persist after the model updates, you will need to provide an `identityKey` value.
!!!

[[code-snippets/advanced-table-multi-select]]

For details about the arguments provided to the `@onSelectionChange` callback function, refer to the [Component API](#component-api) section.

#### Multi-select with sorting by selection state

To enable sorting by selected rows in an Advanced Table, you need to set `@selectableColumnKey` to the key in each row that tracks its selection state. This allows you to sort based on whether rows are selected or not.

In the demo below, we set up a multi-select Advanced Table that can be sorted based on the selection state of its rows.

[[code-snippets/advanced-table-sort-by-selected]]

#### Multi-select with pagination and persisted selection status

This is a more complex example, where an Advanced Table with multi-selection is associated with a [Pagination](/components/pagination) element (a similar use case would apply if a [filter](/patterns/filter-patterns) is applied to the data used to populate the Advanced Table). In this case, a **subset of rows** is displayed on screen.

When a user selects a row, if the displayed rows are replaced with other ones (e.g., when the user clicks on the “next” button or on a different page number) there’s the question of what happens to the previous selection: is it persisted in the data/model underlying the table? Or is it lost?

In the demo below, we are persisting the selection in the data/model, so that when navigating to different pages, the row selections persist across table re-renderings.

[[code-snippets/advanced-table-pagination]]

Depending on the expected behavior, you will need to implement the consumer-side logic that handles the persistence (or not) using the `@onSelectionChange` callback function.

For details about the arguments provided to the `@onSelectionChange` callback function, refer to the [Component API](#component-api) section.

#### Usability and accessibility considerations

Since the “selected” state of a row is communicated with the checkbox selection, there are some important considerations to keep in mind when implementing a multi-select Advanced Table.

If the selection status of the rows is persisted even when a row is not displayed in the UI, consider what the expectations of the user might be: how are they made aware that the action they are going to perform may involve rows that were previously selected but not displayed in the current view?

Even more complex is the case of the “Select all” checkbox in the Advanced Table header. While the expected behavior might seem straightforward when all rows are displayed, it may not be obvious what the expected behavior is when the rows are paginated or have been filtered.

Consider the experience of a user intending to select all or a subset of all possible rows:

If a user interacts with a “Select all” function or button, is the expectation that only displayed rows are selected (what happens in the example above), or that all of the rows in the data set/model are selected, even if not displayed in the current view?

In the first scenario, the “Select all” state changes depending on what rows are in view and can be confusing.

In the second scenario it might not be obvious that all of the rows have been selected and may result in the user unintentionally performing a destructive action under the assumption that they have only selected the rows in the current view.

Whatever functionality you decide to implement, be mindful of all these possible subtleties and complexities.

At a bare minimum we recommend clearly communicating to the user if they have selected rows outside of their current view and how many out of the total data set are selected. We're working to document these scenarios as they arise, in the meantime [contact the Design Systems Team](/about/support) for assistance.

### More examples

#### Visually hidden headers

Labels within the header cells are intended to provide contextual information about the column’s content to the end user. There may be special cases in which that label is redundant from a visual perspective, because the kind of content can be inferred by looking at it (eg. a contextual dropdown).

In this example we’re visually hiding the label in the last column by passing `isVisuallyHidden=true` to it:

[[code-snippets/advanced-table-hidden-header]]

_Notice: only non-sortable headers can be visually hidden._

#### Internationalized column headers, overflow menu dropdown

Here’s an Advanced Table implementation that uses an array hash with strings for the column headers. It indicates which columns should be sortable, and adds an overflow menu.

[[code-snippets/advanced-table-i18n execute=false]]
