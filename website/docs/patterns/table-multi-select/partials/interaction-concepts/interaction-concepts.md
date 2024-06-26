When combining a Multi-select table with filtering, sorting, or pagination, you may encounter complex scenarios regarding how selected results should be persisted across pages and what the user expects when traversing large data sets.

These interaction guidelines are not fully comprehensive. They should instead be considered as conversation starters between design and engineering on how best to optimize the user experience.

!!! Info

If you run into unique scenarios that these guidelines don’t account for, we would love to hear about them through our normal [support](/about/support) channels.
!!!

## Consistent communication

To help prevent unnecessary editing or deleting and to ensure users are interacting with the results they intend to, it is vital to consistently communicate their selections, or the existence of a selection, **at all times**.

Persisting this communication in the selected count can help to avoid mishaps, but it may also be necessary to confirm with the user prior to making changes that cannot be reversed.

![Example of a double confirmation](/assets/patterns/table-multi-select/multi-select-double-confirmation.png)

## Selection scope

_Where_ a selection is made in the UI can imply differences in how the selection is scoped, and can be broken down into three different levels of hierarchy.

1. **Global scope:** Selection applies to all rows in the table and is made via bulk selection in the Multi-select pattern.
2. **Page-level scope:** Selection applies to all rows in the current page of a paginated table and is made via the Checkbox in the Table header.
3. **Row-level scope:** Selection applies only to a single row, result, or item in a Table, and is made via the checkbox at the start of the row.

![Selection scope](/assets/patterns/table-multi-select/selection-scope.png)

## Persisting the selection

One of the most common questions around Multi-select patterns stems from when and how selected results are persisted when a user performs different actions on a Table. Consider the following scenario:

A user is viewing a Table displaying a data set consisting of 10,000 results. In order to make changes to specific results, the user may take the following actions:

1. **Filter** the Table to display only a subset of the results.
2. **Sort** the Table by a specific parameter to order the results in a meaningful way.
3. Traverse through multiple pages of the Table through **Pagination**.

If not handled in a clear and logical manner, how the selection is persisted across all of these actions can be confusing and open the user up to making unintended changes if what they have selected is persisted (or not persisted).

### Within a paginated Table

If a user makes a selection on one page of a paginated Table and progresses to the next page, persisting this selection can be communicated by the [selected count](/patterns/table-multi-select?tab=guidelines#selected-count) and can be helpful in scenarios where much of the data is similar or overlaps.

<video loop controls width="100%">
    <source
        src="/assets/patterns/table-multi-select/multi-select-pagination-interaction.mp4"
        type="video/mp4"
    />
</video>

### When filtering Table results

Filtering a data set is a reductive action that removes results from being displayed within a Table. This impacts multiple areas of the interface while raising a number of considerations around persisting the selection.

!!! Info

Consider these topics as conversation starters to help make an informed decision about the user experience. The answers may vary depending on product architecture and broader application strategy.
!!!

- In a Multi-select pattern, should the [total count](/patterns/table-multi-select?tab=guidlines#total-count) change to reflect a reduction in the number of visible results?
- In Pagination, is the number of results reduced to reflect those excluded by the filter?
- If a selection has been made prior to filtering, is the selected state persisted even if the filtered results are excluded from the data set?
- Are there any parameters in the data set that are variable in nature? E.g., status that is prone to changing if a cluster is starting up or spinning down.

In all of these scenarios, it is important to **clearly and consistently communicate** what results have been selected and what impact a change will have on them.

### Not persisting the selection

Depending on the scenario, it might not make sense or even be possible to persist the selection in a meaningful way, e.g., if filtering the data set results in a new fetch request that resets the state of the application. If this is the case, consider resetting the selection after each alteration to the Table.