## Column resizing

The Advanced Table supports resizing individual columns to display the entire contents of a cell or to give hierarchical preference to specific columns within the table.

The Ember component supports this via an interactive "resize border" which functions either by clicking and dragging on the horizontal axis with a mouse, or by moving focus to the resize border with a keyboard and using the right and left arrow keys.

The Figma component does not support a specific property to communicate resizing. Instead, we publish a [Resize Border](#jory-to-update-this-link-when-figma-is-published) component individually for use in prototypes or interactive demonstrations. [Templates](#jory-to-update-this-link-when-figma-is-published) are available on the Advanced Table stickersheet to provide a starting point for expressing this interaction.

![The interactive resize border in its active state being dragged with a mouse](/assets/components/table/advanced-table/advanced-table-resize-interaction.png)

### Minimum and maximum width

To prevent a column from being resized beyond a reasonable amount, the Advanced Table enforces a default minimum and maximum width of `150px` and `800px` respectively, but can be overridden if necessary via the [component API](/components/table/advanced-table?tab=code#advancedtable).

![An example of a column being resized to the minimum default width](/assets/components/table/advanced-table/advanced-table-resize-min-width.png)

### Content wrapping

By default, content within the cells of the Advanced Table will wrap according to the browser’s natural reflow. This may result in content breaking to multiple lines and layout shift within the table, especially when `hasResizableColumns` is set to `true` in the Ember component.

How cell content responds to resizing is determined by the implementation. For example, truncation with an ellipsis can be achieved by applying custom CSS (e.g., `text-overflow: ellipsis; white-space: nowrap; overflow: hidden;`) to the relevant element within the table cell. The component provides flexibility to support a range of approaches based on project requirements.
