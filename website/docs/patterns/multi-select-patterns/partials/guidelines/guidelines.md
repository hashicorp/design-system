The Helios Table [selection components](/components/table#multi-select) support the selection of one or more rows within a Table and enables the user to edit the same parameter across multiple results, creating more customized views within a Table, and bulk delete results from a data set.

!!! Info

We don’t publish a specific component to support this functionality, instead these guidelines are intended to outline the requirements and recommendations to compose a Multi-select pattern using HDS components and should serve as a starting point. Not all scenarios are covered, if straying from the pattern in more complex scenarios, try to leverage the same core concepts and communication methods.
!!!

## Selected count

Display the **selected count** to communicate how many rows or results have been selected in the _entire_ data set. This includes rows that are outside of the current view in the Table (e.g., in a different page if using [Pagination](/components/pagination)), and should be represented using a numerical value.

![Example of the selected count](/assets/patterns/multi-select-patterns/selected-count.png)

Pair this with a **message** to clearly communicate that a selection has been made. This can be a simple generic message stating "{number in current selection} selected", or can be more specific to the type of object in the data set (e.g., a user, cluster, workspace, etc).

![Generic and specific messaging](/assets/patterns/multi-select-patterns/types-of-messages.png)

## Total count

If technically feasible, communicate the selected count as a portion of the **total count**, or total number of results in the Table. This can give the user a better overall snapshot of what they have selected and how the selection compares to the entire data set. This can also more effectively communicate that there may be results that are selected across multiple pages.

![Total count of items and count of selected items](/assets/patterns/multi-select-patterns/total-count-selected-count.png)

!!! Info

Depending on how the data within a Table is fetched or if [cursor-based pagination](/components/pagination#numbered-vs-compact) is used, it may not be possible to get the total number of results in a data set.
!!!

## Bulk actions

The act of selecting multiple results in a Table implies that the the user wants to edit, remove, or transform these results in some way. Consolidate these actions in a [List](/components/dropdown#list) toggled by a `small` [Dropdown](/components/dropdown) inline with the selected count, message, and total count.

![Example of bulk actions](/assets/patterns/multi-select-patterns/bulk-actions.png)

When working with instances of a Table where only a single action is necessary (e.g., bulk deleting a selection), use a `small` [Button](/components/button) in place of the Dropdown. We recommend using only `secondary` or `critical` Buttons in this scenario depending on the intent of the action.

![Example of a single action](/assets/patterns/multi-select-patterns/single-action.png)

### Editing results

With a selection made, consider using a [Modal](/components/modal) to perform bulk edits or updates to parameters of the selected results. This is generally appropriate for editing five parameters or less, for more complex scenarios consider shifting the editing experience to a separate page.

![Editing results in a Modal](/assets/patterns/multi-select-patterns/multi-select-edit-modal.png)

### Deleting results

Deleting or performing destructive actions on results should use an additional confirmation to ensure that only the intended results are affected. Use a `critical` [Modal](/components/modal) to communicate the number of results affected and what consequences might occur from deletion.

![Deleting results in a Modal](/assets/patterns/multi-select-patterns/multi-select-delete-modal.png)

## Bulk selection

Use bulk selection to highlight additional, more complex methods of selecting rows in a Table. This type of selection should be global in scope, meaning that all results in the data set are affected, even those outside of the current view. Consolidate these functions in a Dropdown List paired with bulk actions.

Some common examples of bulk selection include:

- **Select all:** select all of the results in a data set.
- **Deselect all/reset selection:** take the current selected results and deselect them.
- **Select inverse:** deselect the currently selected results, select those that are currently deselected.
- **Select odd/select even:** only select odd or even-numbered results; this can in part be determined by the current sorting mechanism.

![Example of bulk selection](/assets/patterns/multi-select-patterns/bulk-selection.png)

