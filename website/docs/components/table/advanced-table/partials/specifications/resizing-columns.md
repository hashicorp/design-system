## Column resizing

The Advanced Table supports resizing individual columns to display the entire contents of a cell.

This is supported via an interactive "resize border" that functions either by clicking and dragging on the horizontal axis with a mouse or by moving the focus to the resize border with the keyboard and using the right and left arrow keys.

The Figma component does not support this resizing feature. Instead, we publish a [Resize Border](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto&node-id=80647-127234&t=UHpPyO7erZKLy4SD-1) component and [Templates](https://www.figma.com/design/iweq3r2Pi8xiJfD9e6lOhF/HDS-Components-v2.0?m=auto&node-id=72039-5091&t=UHpPyO7erZKLy4SD-1) to use as a starting point for expressing this interaction.

![The interactive resize border in its active state being dragged with a mouse](/assets/components/table/advanced-table/advanced-table-resize-interaction.png)

### Minimum and maximum width

The Advanced Table sets a default minimum column width of `150px` and a maximum of `2000px`. These limits ensure table usability and accessibility. To use different values, they can be overridden via the [component API](/components/table/advanced-table?tab=code#advancedtable).

![An example of a column being resized to the minimum default width](/assets/components/table/advanced-table/advanced-table-resize-min-width.png)
