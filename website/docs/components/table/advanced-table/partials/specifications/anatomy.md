## Anatomy

### Advanced Table headers

![](/assets/components/table/advanced-table/advanced-table-header-select-anatomy.png)

| Element        | Usage                                               |
| -------------- | --------------------------------------------------- |
| Checkbox       | Optional, but required when cells yield a checkbox  |
| Label          | Required                                            |
| Tooltip button | Optional                                            |
| Sort button    | Optional, Options: none, ascending, descending      |
| Context menu   | Renders when `@hasResizableColumns` is set to true. |
| Container      | Required                                            |

#### Context menu

![](/assets/components/table/advanced-table/advanced-table-header-context-menu-anatomy.png)

| Element                          | Usage                                                                       |
| -------------------------------- | --------------------------------------------------------------------------- |
| Context menu and actions | Optional, conditionally renders when a column has context menu actions available for interactions such as resizing, reordering, or pinning.  |

### Advanced Table cells

#### Expandable cell

![](/assets/components/table/advanced-table/advanced-table-cell-parent-anatomy.png)

| Element      | Usage    |
| ------------ | -------- |
| Expand       | Optional |
| Cell content | Required |
| Icon         | Optional |
| Container    | Required |

#### Nested cell

![](/assets/components/table/advanced-table/advanced-table-cell-nested-anatomy.png)

| Element      | Usage    |
| ------------ | -------- |
| Nested       | Required |
| Cell content | Required |
| Icon         | Optional |
| Container    | Required |

#### Selection cell

![](/assets/components/table/advanced-table/advanced-table-cell-select-anatomy.png)

| Element      | Usage                                                    |
| ------------ | -------------------------------------------------------- |
| Checkbox     | Optional, but required when the header yields a checkbox |
| Cell content | Required                                                 |
| Icon         | Optional                                                 |
| Container    | Required                                                 |
