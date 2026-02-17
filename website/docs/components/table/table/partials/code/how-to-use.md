## How to use this component

### Table with no model defined

If you want to use the component but have no model defined (e.g., there are only a few pieces of data but it’s still tabular data), you can manually add each row, or use an `each` to loop over the data (e.g., an array of objects defined in the route) to render the rows.

#### Manual row implementation

[[code-snippets/table-basic-manual]]

#### Using `each` to loop over records to create rows

[[code-snippets/table-basic-loop]]

### Non-sortable Table with model defined

To use a Table with a model, you will need to:

- pass the data model to the `@model` argument of the Table component
- provide a `@columns` argument to describe the expected columns (see [Component API](#component-api) for details)
- insert your own content into the `:body` block (the component will take care of looping over the `@model`)
- use the `.data` key to access the `@model` record content (it’s yielded as `data`)

[[code-snippets/table-basic-model]]

### Sortable table

!!! Insight

**Code tip**

This component takes advantage of the `sort-by` helper provided by [@nullvoxpopuli/ember-composable-helpers](https://github.com/NullVoxPopuli/ember-composable-helpers).
!!!

Add `isSortable=true` to the hash for each column that should be sortable.

[[code-snippets/table-sortable]]

#### Pre-sorting columns

To indicate that a specific column should be pre-sorted, add `@sortBy`, where the value is the column’s key.

[[code-snippets/table-pre-sort]]

##### Pre-sorting direction

By default, the sort order is set to ascending. To indicate that the column defined in `@sortBy` should be pre-sorted in descending order, pass in `@sortOrder="desc"`.

[[code-snippets/table-pre-sort-direction]]

#### Custom sort callback

To implement a custom sort callback on a column:

1. add a custom function as the value for `sortingFunction` in the column hash,
2. include a custom `onSort` action in your Table invocation to track the sorting order and use it in the custom sorting function.

This is useful for cases where the key might not be A-Z or 0-9 sortable by default, e.g., status, and you’re otherwise unable to influence the shape of the data in the model.

Here’s an example of what a custom sort function could look like. In this example, we are indicating that we want to sort on a status, which takes its order based on the position in the array.

[[code-snippets/table-custom-sort]]

#### Custom sorting using the yielded sorting arguments/functions

!!! Warning

This is a pretty advanced example, intended to cover some edge cases that we encountered. We strongly suggest using one of the sorting methods described above, or [contact the Design Systems Team](/about/support) before using this approach to make sure there are no better alternatives.

!!!


The `Hds::Table` exposes (via yielding) some of its internal properties and methods, to allow extremely customized sorting functionalities:

- `setSortBy` is the internal function used to set the `sortBy` and `sortOrder` tracked values
- `sortBy` is the "key" of the column used for sorting (when the table is sorted)
- `sortOrder` is the sorting direction (ascending or descending)

For more details about these properties refer to the [Component API](#component-api) section below.

In the `<:head>` the `setSortBy` function is invoked when the `<ThSort>` element is clicked to set the values of `sortBy` and `sortOrder` in the table; in turn these values are then used by the `<ThSort>` element to assign the sorting icon via the `@sortOrder` argument.

In the `<:body>` the values of `sortBy` and `sortOrder` are provided instead as arguments to a consumer-side function that takes care of custom sorting the model/data.

_Notice: in this case for the example we're using the [`call` helper](https://github.com/NullVoxPopuli/ember-composable-helpers?tab=readme-ov-file#call) from [@nullvoxpopuli/ember-composable-helpers](https://github.com/NullVoxPopuli/ember-composable-helpers)._

The sorting function in the backing class code will look something like this (the actual implementation will depend on the consumer-side/business-logic context):

[[code-snippets/table-custom-sort-yield]]

### Density

To create a condensed or spacious Table, add `@density` to the Table’s invocation. Note that it only affects the Table body, not the Table header.

[[code-snippets/table-density]]

### Alignment

#### Vertical alignment

To indicate that the table’s content should have a middle vertical-align, use `@valign` in the table’s invocation.

[[code-snippets/table-vertical-align]]

#### Vertical alignment with additional cell content

!!! Insight

**Code tip**

Note that vertical-align only applies to inline, inline-block and table-cell elements: you can’t use it to vertically align block-level elements ([see MDN reference](https://developer.mozilla.org/en-US/docs/Web/CSS/vertical-align)).

If you have more than just text content in the table cell, you'll want to wrap that content in a flex box and style accordingly.
!!!

[[code-snippets/table-vertical-align-complex]]

#### Horizontal alignment

To create a column that has right-aligned content, set `@align` to `right` on both the column’s header and cell (the cell’s horizontal content alignment should be the same as the column’s horizontal content alignment).

[[code-snippets/table-horizontal-align]]

### Tooltip

[Table headers](/components/table/table#headers) should be clear, concise, and straightforward whenever possible. However, there could be cases where the label is insufficient by itself and extra information is required. In this case, it’s possible to show a tooltip next to the label in the header:

[[code-snippets/table-tooltip]]

### Scrollable table

Consuming a large amount of data in a tabular format can lead to an intense cognitive load for the user. As a general principle, care should be taken to simplify the information within a table as much as possible.

We recommend using functionalities like [pagination](/components/pagination), [sorting](/components/table/table?tab=code#sortable-table), and [filtering](/patterns/filter-patterns) to reduce this load.

That said, there may be cases when it’s necessary to show a table with a large number of columns and allow the user to scroll horizontally. In this case the consumer can use different approaches, depending on their context, needs and design specs.

Below we show a couple of examples of how a scrollable table could be implemented: use them as starting point (your mileage may vary).

#### Using a container with `overflow: auto`

In most cases, wrapping the table with a container that has `overflow: auto` does the trick.

The default table layout is `auto` which means the browser will try to optimize the width of the columns to fit their different content. In some cases, this will mean the content may wrap (see the `Phone` column as an example) in which case you may want to apply a `width` to [suggest to the browser](https://www.w3.org/TR/WD-CSS2-971104/tables.html#h-17.2) to apply a specific width to a column (see the `Biography` column).


[[code-snippets/table-scroll-container]]

#### Using a container with `overflow: auto` and a sub-container with `width: max-content`

If you have specified the width of some of the columns, leaving the others to adapt to their content automatically, and you want to avoid the wrapping of content within the cells, you need to introduce a secondary wrapping element around the table with its `width` set to ` max-content`.

In this case the table layout is still set to `auto` (default). If instead you want to set it to `fixed` (using the `@isFixedLayout` argument) you will have to specify the width for **every** column or the table will explode horizontally.


[[code-snippets/table-scroll-container-fixed-width]]

### Multi-select table

A multi-select table includes checkboxes enabling users to select multiple rows in a table for purposes of performing bulk operations. Checking or unchecking the checkbox in the table header either selects or deselects the checkboxes on each row in the table body. Individual checkboxes in the rows can also be selected or deselected.

Add `isSelectable=true` to create a multi-select table. The `@onSelectionChange` argument can be used to pass a callback function to receive selection keys when the selected table rows change. You must also pass a `@selectionKey` argument to each row which gets passed back through the `@onSelectionChange` callback which maps the row selection on the table to an item in your data model.

#### Multi-select table using a model

!!! Info

**Code consideration**

If you want the state of the checkboxes to persist after the model updates, you will need to provide an `identityKey` value.
!!!

This is a simple example of a table with multi-selection. Notice the `@selectionKey` argument provided to the rows, used by the `@onSelectionChange` callback to provide the list of selected/deselected rows as argument(s) for the invoked function.

[[code-snippets/table-multi-select]]

!!! Warning

**Accessibility alert**

To make the table correctly accessible, each checkbox used for the selection needs to have a distinct `aria-label`. For this reason, you need to provide a `@selectionAriaLabelSuffix` value (possibly unique) to the rows in the table’s `tbody`.
!!!

For details about the arguments provided to the `@onSelectionChange` callback function, refer to the [Component API](#component-api) section.


!!! Info

**Code consideration**

While it’s technically possible to use the multi-select feature in a table implemented without using a model, we strongly suggest converting the code to provide a `@model` to the table using a local dataset (created using the information/data you need to display).
!!!

#### Multi-select table using a model with sorting by selection state

To enable sorting by selected rows in a table, you need to set `@selectableColumnKey` to the key in each row that tracks its selection state. This allows you to sort the table based on whether rows are selected or not.

In the demo below, we set up a multi-select table that can be sorted based on the selection state of its rows.

[[code-snippets/table-sort-by-selected]]

#### Multi-select table without a model with sorting by selection state

To enable sorting by selected rows in a table without using a model, you need to manage the data, selection state, and sorting logic. Set `@selectableColumnKey `to the key in each row that tracks its selection state. Implement the `@onSelectionChange` and `@onSort` actions to handle selection changes and sorting events, updating your data and sorting parameters accordingly.

In the demo below, we set up a multi-select table without a model, where the selection and sorting are controlled externally. This approach allows the table to be sorted based on the selection state of its rows.

[[code-snippets/table-sort-by-selected-yield]]

#### Multi-select table with pagination and persisted selection status

This is a more complex example, where a table with multi-selection is associated with a [Pagination](/components/pagination) element (a similar use case would apply if a [filter](/patterns/filter-patterns) is applied to the data used to populate the table). In this case, a **subset of rows** is displayed on screen.

When a user selects a row, if the displayed rows are replaced with other ones (e.g., when the user clicks on the “next” button or on a different page number) there’s the question of what happens to the previous selection: is it persisted in the data/model underlying the table? Or is it lost?

In the demo below, we are persisting the selection in the data/model, so that when navigating to different pages, the row selections persist across table re-renderings.

[[code-snippets/table-pagination]]

For details about the arguments provided to the `@onSelectionChange` callback function, refer to the [Component API](#component-api) section.


#### Usability and accessibility considerations

Since the “selected” state of a row is communicated by the checkbox, there are some important considerations to keep in mind when implementing a multi-select table.

If the selection status of the rows is persisted even when a row is not displayed in the UI, consider what the expectations of the user might be: how are they made aware that the action they are going to perform may involve rows that were previously selected but not displayed in the current view?

Even more complex is the case of the “Select all” checkbox in the table header. While the expected behavior might seem straightforward when all rows are displayed in the table, it may not be obvious what the expected behavior is when the table rows are paginated or have been filtered.

Consider the experience of a user intending to select all or a subset of all possible rows:

If a user interacts with a “Select all” function or button, is the expectation that only displayed rows are selected (what happens in the example above), or that all of the rows in the data set/model are selected, even if not displayed in the current view?

In the first scenario, the “Select all” state changes depending on what rows are in view and can be confusing.

In the second scenario it might not be obvious that all of the rows have been selected and may result in the user unintentionally performing a destructive action under the assumption that they have only selected the rows in the current view.

Whatever functionality you decide to implement, be mindful of all these possible subtleties and complexities.

At a bare minimum we recommend clearly communicating to the user if they have selected rows outside of their current view and how many out of the total data set are selected. We're working to document these scenarios as they arise, in the meantime [contact the Design Systems Team](/about/support) for assistance.

### More examples

#### Visually hidden table headers

Labels within the table header are intended to provide contextual information about the column’s content to the end user. There may be special cases in which that label is redundant from a visual perspective, because the kind of content can be inferred by looking at it (eg. a contextual dropdown).

In this example we’re visually hiding the label in the last column by passing `isVisuallyHidden=true` to it:

[[code-snippets/table-visually-hidden-header]]

_Notice: only non-sortable headers can be visually hidden._

#### Internationalized column headers, overflow menu dropdown

Here’s a Table implementation that uses an array hash with strings for the column headers, indicates which columns should be sortable, and adds an overflow menu.

[[code-snippets/table-intl execute=false]]
