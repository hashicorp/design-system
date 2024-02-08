The Helios Table [selection components](/components/table#multi-select) support the selection of one or more results within a Table and thus support performing bulk actions and edits on multiple results simultaneously.

Multi-selection aids the user in editing the same parameter across multiple results or creating more specific, customized views within a Table.

!!! Info

We don’t publish a specific component to support this functionality, instead these guidelines are intended to outline the requirements and recommendations to compose a Selection pattern using HDS components.
!!!

These guidelines are should serve as a starting point for a multi-select pattern, but do not cover all scenarios. If straying from the pattern in more complex scenarios, try to leverage the same core concepts and communication methods.

## Selection pattern

A Selection pattern is composed of multiple HDS components and foundational styles and consists of a number of functional and communication-oriented aspects.

### Selected count

Communicate how many rows or results have been selected in the _entire_ data set with a numerical selected count. This includes rows that are outside of the current view in the Table (e.g., in a different page if using Pagination), and should be represented using a numerical value.

This count should persist when:

- navigating between pages of a paginated Table
- if the Table is sorted by a different parameter
- depending on the implementation, if the restuls are filtered to include or exclude specific parameters (more details on this topic in the [interaction](/patterns/multi-selection?tab=interaction) guidelines).

Pair this with a **message** to clearly communicate that a selection has been made. This can be a simple generic message stating "{number in current selection} selected", or can be more specific by referencing the type of object in the data set (e.g., a user, cluster, workspace, etc).

![Generic and specific messaging](/assets/patterns/multi-selection/types-of-messages.png)

### Total count

If feasible or technically possible, communicate the selected count contrasted with the total number of results in the Table. This can give the user a better overall snapshop of what they have selected, and that Selected count refers to items that may not be included in their current page.

![Total count of items and count of selected items](/assets/patterns/multi-selection/total-count-selected-count.png)

!!! Info

Depending on how the data within a Table is fetched or if [cursor-based pagination](/components/pagination#numbered-vs-compact) is used, it may not be possible to get the total number of results in a data set.
!!!

### Bulk actions

The act of selecting multiple results in a Table implies that the the user wants to edit, remove, or transform these results in some way. Consolidate these actions in a [List](/components/dropdown#list) triggered by a `small` [Dropdown](/components/dropdown) inline with the selected count, message, and total count.

![Example of bulk actions](/assets/patterns/multi-selection/bulk-actions.png)

When working with more simple data sets or instances of a Table when only a single action might be necessary (e.g., bulk deleting a selection), use a small [Button](/components/button) in place of the Dropdown. We recommend limited Button use in this scenario to only `secondary` or `critical` depending on the intent of the action.

![Example of a single action](/assets/patterns/multi-selection/single-action.png)

### Bulk selection

Handle Selection within the entire data set or Table but consolidating bulk selection actions in Dropdown along with bulk actions to transform the data set. While the HDS team is not prescriptive of what these selection options are, some common examples include:

- **Select all:** select all of the restuls in a data set.
- **Deselect all/reset selection:** take the current selected items and deselect them.
- **Select inverse:** deselect the currently selected items, select the currently deselected items.
- **Select odd/select even:** only select odd or even-numbered results; determined by the current sorting mechanism.

![Example of bulk selection](/assets/patterns/multi-selection/bulk-selection.png)

## Usage in context

### Basic table

### With filter patterns

### Complex examples

