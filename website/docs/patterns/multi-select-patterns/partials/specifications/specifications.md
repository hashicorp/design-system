## Anatomy

![Multi-select anatomy](/assets/patterns/multi-select-patterns/selection-anatomy.png)

| Element | Usage | 
|---------|-------|
| Selected count | Required; displays the number of selected items in the table. |
| Selected message | Required; explicitly communicates that results in the table have been selected. |
| Total results  | Optional, but recommended; displays the total number of results in the data set. |
| Actions trigger | Required; use either a `secondary` or `critical` [Button](/components/button)for single actions, or a `secondary` [Dropdown](/components/dropdown) for multiple actions. |
| Bulk actions | Optional; consolidates multiple bulk actions into a single element. |
| Bulk selection | Optional; consolidates multiple selection functions into a single element. |

## Spacing

### Multi-select pattern

Within the Multi-select pattern itself, use a 16px horizontal gap between the message and the actions.

![Spacing within the multi-select pattern](/assets/patterns/multi-select-patterns/multi-select-pattern-spacing.png)

### In context

Within a larger context, use a 16px vertical gap between the filter elements, multi-selection pattern, and table.

![Spacing in context with other elements](/assets/patterns/multi-select-patterns/multi-select-in-context-spacing.png)

## Layout

In a basic example of a Table, place the selection pattern above the top-right corner of the Table.

![A basic multi-select example in context](/assets/patterns/multi-select-patterns/multi-select-in-context-basic.png)

### Layout with a filter pattern

When composing a Multi-select pattern with a [Filter bar](/patterns/filter-patterns?tab=specifications#filter-bar-1) and [Applied filters](/patterns/filter-patterns?tab=specifications#applied-filters-1), maintain the same placement.

![Multi-select with a Filter Pattern](/assets/patterns/multi-select-patterns/multi-select-in-context-filters.png)

### Putting it all together

![Multi-select in a more complex scenario](/assets/patterns/multi-select-patterns/multi-select-in-context-complex-example.png)

