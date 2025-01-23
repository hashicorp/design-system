The Helios Table [multi-select functionality](/components/table/table#multi-select) supports performing bulk actions and selection of one or more rows within a Table.

![Example of Table multi-select in context](/assets/patterns/table-multi-select/multi-select-preview-image.png)

!!! Info

These guidelines are meant to assist teams in designing and building Tables that have bulk editing and selection functionality. Currently there aren’t Ember or Figma components to support these advanced patterns, but they can be composed using a combination of HDS components.
!!!

## Selected count

Display the **selected count** to communicate how many rows or results have been selected in the _entire_ data set. This includes Table rows that are outside of the current view in the Table (e.g., in a different page if using [Pagination](/components/pagination)), and should be represented using a numerical value.

![Example of the selected count](/assets/patterns/table-multi-select/selected-count.png)

Pair this with a **message** to clearly communicate that a selection has been made. This can be a simple generic message stating "{selected count} selected", or can be more specific to the type of object in the data set (e.g., a user, cluster, workspace, etc).

![Generic and specific messaging](/assets/patterns/table-multi-select/types-of-messages.png)

## Total count

If technically feasible, communicate the selected count as a portion of the **total count**, or total number of results in the Table. This can give the user a better overall snapshot of what they have selected and how the selection compares to the entire data set. This can also more effectively communicate that there may be results that are selected across multiple pages.

![Total count of items and count of selected items](/assets/patterns/table-multi-select/total-count-selected-count.png)

## Bulk actions

Bulk actions allow the user to edit, delete, or transform one or more results in a Table. Consolidate these actions in a `small` [Dropdown](/components/dropdown) inline with the selected count, message, and total count.

![Example of bulk actions](/assets/patterns/table-multi-select/bulk-actions.png)

For Table instances requiring a single action (like bulk deletion), use a `small` [Button](/components/button) instead of a Dropdown. We advise using either `secondary` or `critical` Buttons, based on the action’s intent.

![Example of a single action](/assets/patterns/table-multi-select/single-action.png)

### Editing results

With a selection made, consider using a [Modal](/components/modal) to perform bulk edits or updates to parameters of the selected results. This is generally appropriate for editing five parameters or less; for more complex scenarios, consider shifting the editing experience to a separate page.

![Editing results in a Modal](/assets/patterns/table-multi-select/multi-select-edit-modal.png)

### Deleting results

Deleting or performing destructive actions on results should use an additional confirmation to ensure that only the intended results are affected. Use a `critical` [Modal](/components/modal) to communicate the number of results affected and what consequences might occur from deletion.

![Deleting results in a Modal](/assets/patterns/table-multi-select/multi-select-delete-modal.png)

## Bulk selection

Bulk selection is global in scope, meaning that all results in the data set are affected, even those outside of the current view. Consolidate these functions in a Dropdown paired with bulk actions.

_Note:_ This type of selection is **not** a replacement for the selection in the header of the Table. Where the selection is made implies a different [scope](/patterns/table-multi-select?tab=interaction%20concepts#selection-scope) and is handled by different UI elements.

Examples of bulk selection include:

- **Select all:** Select all of the results in a data set.
- **Reset selection:** Take the current selected results and deselect them.
- **Select inverse:** Deselect the currently selected results; select those that are currently deselected.

![Example of bulk selection](/assets/patterns/table-multi-select/bulk-selection.png)

