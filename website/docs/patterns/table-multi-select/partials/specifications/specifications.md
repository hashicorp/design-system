## Anatomy

![Multi-select anatomy](/assets/patterns/table-multi-select/selection-anatomy.png)

| Element | Usage | 
|---------|-------|
| Selected count | Displays the number of selected items in the table. |
| Selected message | Communicates that results in the table have been selected. |
| Total results  | Displays the total number of results in the data set. |
| Actions trigger | Recommended to use either a `secondary` or `critical` [Button](/components/button) for single actions, or a `secondary` [Dropdown](/components/dropdown) for multiple actions. |
| Bulk actions | Consolidates multiple bulk actions into a single element. |
| Bulk selection | Consolidates multiple selection functions into a single element. |

## Spacing

### Multi-select pattern

Within the Multi-select pattern itself, use a 16px horizontal gap between the message and the actions.

![Spacing within the multi-select pattern](/assets/patterns/table-multi-select/multi-select-pattern-spacing.png)

### In context

When combining a Multi-select pattern with filtering and similar functions acting on Table data, use a 16px vertical gap between rows of related elements.

![Spacing in context with other elements](/assets/patterns/table-multi-select/multi-select-in-context-spacing.png)

## Layout

For a basic Table (e.g., one that doesn’t use filtering), place the selection pattern above the top-right corner of the Table.

![A basic multi-select example in context](/assets/patterns/table-multi-select/multi-select-in-context-basic.png)

### Layout with a filter pattern

When composing a Multi-select pattern together with a [Filter bar](/patterns/filter-patterns?tab=specifications#filter-bar-1) and [Applied filters](/patterns/filter-patterns?tab=specifications#applied-filters-1), maintain the same placement.

![Multi-select with a Filter Pattern](/assets/patterns/table-multi-select/multi-select-in-context-filters.png)

### Putting it all together

![Multi-select in a more complex scenario](/assets/patterns/table-multi-select/multi-select-in-context-complex-example.png)

### Reflow

As the viewport width shrinks, stack the elements around the Table and filter pattern in a single column.

![Example of reflow at a smaller viewport](/assets/patterns/table-multi-select/multi-select-reflow-example.png)

