## Column resizing

The Advanced Table supports resizing individual columns to display the entire contents of a cell.

This is supported via an interactive "resize border" that functions either by clicking and dragging on the horizontal axis with a mouse or by moving the focus to the resize border with the keyboard and using the right and left arrow keys.

The Figma component does not support this resizing feature. Instead, we publish a [Resize Border](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto&node-id=80647-127234&t=UHpPyO7erZKLy4SD-1) component and [Templates](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto&node-id=72039-5091&t=UHpPyO7erZKLy4SD-1) to use as a starting point for expressing this interaction.

![The interactive resize border in its active state being dragged with a mouse](/assets/components/table/advanced-table/advanced-table-resize-interaction.png)

### Minimum and maximum width

To prevent a column from being resized beyond a reasonable amount, the Advanced Table enforces a default minimum and maximum width of `150px` and `800px`, respectively. These can be overridden via the [component API](/components/table/advanced-table?tab=code#advancedtable), if necessary.

![An example of a column being resized to the minimum default width](/assets/components/table/advanced-table/advanced-table-resize-min-width.png)

## Column reordering

The Advanced Table supports reordering columns to customze the default visual order the data set is rendered in.

This is supported via multiple entry points:

- Hovering on the table header with a mouse and dragging the column with the drag target. When a drag event is detected, a drop target will be displayed to communicate where in the table the column will be rendered.
- "Move column" within the context menu moves focus to the drag target allowing reordering left and right with the arrow keys.
- "Move column to start/end" within the context menu will move the column either to the start or end of the table. These options are rendered _conditionally_, e.g., a column in the start/first position will not have an option to move to start because it already occupies that position.

![An example of a mouse user hovering on the table header which displays the drag target](/assets/components/table/advanced-table/advanced-table-hover-table-header.png)

![An example of a mouse user dragging a column to a new position in the table](/assets/components/table/advanced-table/advanced-table-drag-column.png)

![An example of the drag target in its focused state, allowing the user to move the column left and right with the arrow keys.](/assets/components/table/advanced-table/advanced-table-focus-drag-target.png)

In Figma, there is not a property to display the drag target directly within the component, instead we publish several components and [Templates](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto&node-id=72039-5091&t=UHpPyO7erZKLy4SD-1) to use as a starting point for expressing this interaction.
