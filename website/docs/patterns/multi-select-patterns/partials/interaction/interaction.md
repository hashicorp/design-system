When combining multi-select with filtering, sorting, pagination, etc, you _will_ encounter confusing scenarios about how selected results should be persisted across different pages and what the user expects when traversing large data sets.

These interaction guidelines are _not exhaustive_ of every scenario, but instead should serve as conversation starters between design and engineering for how best to handle the user experience.

!!! Info

If you run into unique scenarios that these guidelines don’t account for, we would love to hear about them through our normal [support](/about/support) channels.
!!!

## Consistent communication

The most important aspect to ensure users are interacting with the results they intend to is to clearly communicate what they have selected, or even that a selection of results exists, at all times.

This can help to prevent unnecessary deletions of results or making unintended changes if 

- Always communicating to the users that they have some results selected, even if they are out of view.
- Putting safeguards in place to ensure that unintended changes or deletions don't happen with selected results that are out of view.

## Persisting the selection

One of the most common questions around mutli-select patterns stems from when and how selected results are persisted when a user performs different actions on a Table. Consider the following scenario:

A user is viewing a data set consisting of 10,000 results that is presented in a Table. In order to make changes to specific results the user may decide to take the following actions:

1. Filter the Table to only display a subset of the results.
2. Sort the Table by a specific parameter to order the results in a meaningful way.
3. Traverse the Table through pagination.

How the selection is persisted across all of these actions can be confusing and open the user up to making unintended changes if what they have selected is persisted (or doesn’t persist) in a logical manner.

!!! Info

Use these example scenarios as thought starters to make an informed decision about persisting a selection.
!!!

### Within a paginated Table

If a user makes a selection on one page of a paginated Table and progresses to the next page, persisting this selection can be communicated by the [Selected count](/patterns/multi-select-patterns?tab=guidelines#selected-count) and can be helpful in scenarios where much of the data is similar or overlaps.

<video loop controls width="100%">
    <source
        src="/assets/patterns/multi-select-patterns/multi-select-pagination-interaction.mp4"
        type="video/mp4"
    />
</video>

### When filtering Table results

Filtering a data set implies removing or preventing irrelevant results from rendering within a Table; a **reductive** action. In this scenario, performing a reductive action will impact multiple areas of the interface and surface a number of considerations for persisting the selection.

- In a Multi-select pattern, is the [total count](/patterns/multi-select-patterns?tab=guidlines#total-count) effected to reflect a reduction in the number of visible results?
- In Pagination, is the number of results reduced to reflect the those excluded by the filtering mechanism?
- If a selection has been made prior to filtering, is the selected state persisted even if the filtered results are excluded from the data set?
- Are there any parameters in the data set that are variable in nature? E.g., status that is prone to changing if cluster is starting up or spinning down.

In all of these scenarios it is most important to **clearly communicate in a consistent way** what results have been selected and what impact a change will make to them.

### Not persisting the selection

Depending on the scenario, it might not make sense or even be possible to persist the selection in a meaningful way; e.g., if filtering the data set results in a new fetch request that resets the state of the application. If this is the case, consider resetting after each alteration to the Table. 