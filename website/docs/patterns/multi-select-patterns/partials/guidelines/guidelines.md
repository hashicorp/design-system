The Helios Table [selection components](/components/table#multi-select) support the selection of one or more results within a Table, or multi-selection, and enables the user to edit the same parameter across multiple results or creating more specific, customized views within a Table.

!!! Info

We don’t publish a specific component (or components) to support this functionality, instead these guidelines are intended to outline the requirements and recommendations to compose a Multi-select pattern using HDS components.
!!!

These guidelines are should serve as a starting point for a multi-select pattern, but do not cover all scenarios. If straying from the pattern in more complex scenarios, try to leverage the same core concepts and communication methods.

## Selected count

Communicate how many rows or results have been selected in the _entire_ data set. This includes rows that are outside of the current view in the Table (e.g., in a different page if using [Pagination](/components/pagination)), and should be represented using a numerical value.

---

**Potentially remove this and move to interaction**

This count should persist when:

- navigating between pages of a paginated Table
- if the Table is sorted by a different parameter
- depending on the implementation, if the restuls are filtered to include or exclude specific parameters (more details on this topic in the [interaction](/patterns/multi-selection?tab=interaction) guidelines).

---

Pair this with a **message** to clearly communicate that a selection has been made. This can be a simple generic message stating "{number in current selection} selected", or can be more specific to the type of object in the data set (e.g., a user, cluster, workspace, etc).

![Generic and specific messaging](/assets/patterns/multi-select-patterns/types-of-messages.png)

## Total count

If feasible or technically possible, communicate the selected count as a portion of the total number of results in the Table. This can give the user a better overall snapshop of what they have selected and how the selection compares to the entire data set. This can also more effectively communicate that there may be results that are selected across multiple pages.

![Total count of items and count of selected items](/assets/patterns/multi-select-patterns/total-count-selected-count.png)

!!! Info

Depending on how the data within a Table is fetched or if [cursor-based pagination](/components/pagination#numbered-vs-compact) is used, it may not be possible to get the total number of results in a data set.
!!!

## Bulk actions

The act of selecting multiple results in a Table implies that the the user wants to edit, remove, or transform these results in some way. Consolidate these actions in a [List](/components/dropdown#list) toggled by a `small` [Dropdown](/components/dropdown) inline with the selected count, message, and total count.

![Example of bulk actions](/assets/patterns/multi-select-patterns/bulk-actions.png)

When working with instances of a Table where only a single action might be necessary (e.g., bulk deleting a selection), use a small [Button](/components/button) in place of the Dropdown. We recommend using only `secondary` or `critical` Buttons in this scenario depending on the intent of the action.

![Example of a single action](/assets/patterns/multi-select-patterns/single-action.png)

### Editing results

With a selection made, consider using a [Modal](/components/modal) to perform bulk edits or updates to parameters of the selection. This is generally appropriate for editing five parameters or less. For more complex scenarios consider shifting the editing experience to a separate page.

![Editing results in a Modal](/assets/patterns/multi-select-patterns/multi-select-edit-modal.png)

### Deleting results

Deleting or performing destructive actions on results should use an additional confirmation to ensure that only the intended results are effected. This can done with a critical [Modal](/components/modal) communicating the number of restults effected and what repurcusions might result from deletion.

![Deleting results in a Modal](/assets/patterns/multi-select-patterns/multi-select-delete-modal.png)

## Bulk selection

Consolidate bulk selection functions in a Dropdown List paired with bulk actions. Some common examples of bulk selection include:

- **Select all:** select all of the restuls in a data set.
- **Deselect all/reset selection:** take the current selected items and deselect them.
- **Select inverse:** deselect the currently selected items, select the currently deselected items.
- **Select odd/select even:** only select odd or even-numbered results; determined by the current sorting mechanism.

![Example of bulk selection](/assets/patterns/multi-select-patterns/bulk-selection.png)

