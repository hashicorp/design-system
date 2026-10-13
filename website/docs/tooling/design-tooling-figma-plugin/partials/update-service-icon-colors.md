Use **Update Service Icon Colors** to find HDS service icon color variants, such as `aws-color` and `azure-color`. These icons use brand colors, so they don't transition between IBM Carbon light and dark themes.

Project Solar's carbonization work requires color service icons to be replaced with dynamic, non-color variants. These variants accept semantic and core colors from HDS libraries. The HDS team has added these variants to the [HDS Icons](https://www.figma.com/design/TLnoT5AYQfy3tZ0H68BgOr/HDS-Icons?m=auto&node-id=164-0&t=2SV6iizqmgRpPLZ8-1) library. In design files, you still need to apply the appropriate semantic variable.

## Find color service icons

1. Open **Update Service Icon Colors**.
2. Select **Select All on Page** to scan every instance on the current page.
3. To limit the scan, select a layer on the canvas, then choose **Select Icons in Current Selection**.
4. Review the matching icons that the plugin selects on the canvas.

The plugin finds HDS icon component instances whose names follow the color service icon pattern and ends in `-color`.

![](/assets/tooling/design-tooling-figma-plugin/update-service-icon-colors.png)
