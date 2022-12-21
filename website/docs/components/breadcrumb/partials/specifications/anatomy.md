## Anatomy

### Breadcrumb item

![Anatomy of a breadcrumb item](/assets/components/breadcrumb/breadcrumb-item-anatomy.png)

| Element | Usage |
| ------- | ----- |
| Text | Required (unless using a truncated item) |
| Leading icon | Optional - color and size of the icon is pre-defined. **Note:** If a truncated item, the leading icon must be a "more-horizontal" icon. |
| Focus ring | Focus state only |

### Breadcrumb container

![Anatomy of a breadcrumb component](/assets/components/breadcrumb/breadcrumb-container-anatomy.png)

| Element | Usage |
| ------- | ----- |
| Item | Multiple items can be passed to the breadcrumb container of varying types and combinations |
| Separator | Required for all breadcrumb items except the last item. | 
| Current page | The last item in the breadcrumb should always be the current page, not interactive, and styled with `Foreground / Strong` for the text color to meet accessibility requirements. |
