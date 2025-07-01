## Column resizing

The Advanced Table supports resizing individual columns to display the entire contents of a cell.

This is supported via an interactive "resize border" that functions either by clicking and dragging on the horizontal axis with a mouse or by moving the focus to the resize border with the keyboard and using the right and left arrow keys.

The Figma component does not support a specific property to communicate resizing. Instead, we publish a [Resize Border](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto&node-id=80647-127234&t=UHpPyO7erZKLy4SD-1) component individually for use in prototypes or interactive demonstrations. [Templates](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto&node-id=72039-5091&t=UHpPyO7erZKLy4SD-1) are available on the Advanced Table stickersheet to provide a starting point for expressing this interaction.

![The interactive resize border in its active state being dragged with a mouse](/assets/components/table/advanced-table/advanced-table-resize-interaction.png)

### Minimum and maximum width

To prevent a column from being resized beyond a reasonable amount, the Advanced Table enforces a default minimum and maximum width of `150px` and `800px`, respectively. These can be overridden via the [component API](/components/table/advanced-table?tab=code#advancedtable), if necessary.

![An example of a column being resized to the minimum default width](/assets/components/table/advanced-table/advanced-table-resize-min-width.png)

### Content wrapping

By default, content within the cells of the Advanced Table will wrap according to the browser’s natural reflow. This may result in the layout shifting.

How resizing for the cell content works is determined by the implementation. For example, truncation with an ellipsis can be achieved by applying custom CSS to the relevant element within the table cell, e.g., `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;`.