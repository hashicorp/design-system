When combining a Multi-select table with filtering, sorting, or pagination, you may encounter complex scenarios regarding how selected results should be persisted across pages and what the user expects when traversing large data sets.

These interaction guidelines are not fully comprehensive. They should instead be considered as conversation starters between design and engineering on how best to optimize the user experience.

!!! Info

If you run into unique scenarios that these guidelines don’t account for, we would love to hear about them through our normal [support](/about/support) channels.
!!!

## Consistent communication

The most important method to ensure users are interacting with the results they intend to is to clearly communicate what they have selected, or even that a selection of results exists, **at all times**.

This can help to prevent unnecessary deletions of results or making unintended changes if what is currently selected is unclear.

## Persisting the selection

One of the most common questions around Multi-select patterns stems from when and how selected results are persisted when a user performs different actions on a Table. Consider the following scenario:

A user is viewing a data set consisting of 10,000 results that is presented in a Table. In order to make changes to specific results the user may take the following actions:

1. **Filter** the Table to display only a subset of the results.
2. **Sort** the Table by a specific parameter to order the results in a meaningful way.
3. Traverse through multiple pages of the Table through **Pagination**.

If not handled in a logical manner, how the selection is persisted across all of these actions can be confusing and open the end-user up to making unintended changes if what they have selected is persisted (or not persisted).

### Within a paginated Table

If a user makes a selection on one page of a paginated Table and progresses to the next page, persisting this selection can be communicated by the [selected count](/patterns/multi-select-patterns?tab=guidelines#selected-count) and can be helpful in scenarios where much of the data is similar or overlaps.

<video loop controls width="100%">
    <source
        src="/assets/patterns/table-multi-select/multi-select-pagination-interaction.mp4"
        type="video/mp4"
    />
</video>

### When filtering Table results

Filtering a data set implies removing or hiding results from rendering within a Table; a **reductive** action. In this scenario, performing a reductive action will impact multiple areas of the interface and surface a number of considerations for persisting the selection.

!!! Info

Consider these topics conversation starters to help make an informed decision around the user experience, the answers may vary depending on product architecture and broader application strategy.
!!!

- In a Multi-select pattern, should the [total count](/patterns/multi-select-patterns?tab=guidlines#total-count) change to reflect a reduction in the number of visible results?
- In Pagination, is the number of results reduced to reflect the those excluded by the filter?
- If a selection has been made prior to filtering, is the selected state persisted even if the filtered results are excluded from the data set?
- Are there any parameters in the data set that are variable in nature? E.g., status that is prone to changing if a cluster is starting up or spinning down.

In all of these scenarios it is most important to **clearly and consistently communicate** what results have been selected and what impact a change will have on them.

### Not persisting the selection

Depending on the scenario, it might not make sense or even be possible to persist the selection in a meaningful way; e.g., if filtering the data set results in a new fetch request that resets the state of the application. If this is the case, consider resetting the selection after each alteration to the Table. 