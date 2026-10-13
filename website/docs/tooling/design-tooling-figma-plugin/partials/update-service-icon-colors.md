Use **Update Service Icon Colors** to find HDS service icon color variants (e.g., `aws-color`, `azure-color`, etc). These icons use brand colors and don't transition between IBM Carbon light and dark themes.

Project Solar and the Carbonization requires color service icons to be replaced with their dynamic/non-color variants, which accept semantic and core colors from HDS libraries. This replacement has been handled by the HDS team behind the scenes in the [HDS Icons](https://www.figma.com/design/TLnoT5AYQfy3tZ0H68BgOr/HDS-Icons?m=auto&node-id=164-0&t=2SV6iizqmgRpPLZ8-1) library, however, appying the relevant semantic variable is still required in design files.

## Find color service icons

1. Open **Update Service Icon Colors**.
2. Select **Select All on Page** to scan every instance on the current page.
3. To limit the scan, select a layer on the canvas, then choose **Select Icons in Current Selection**.
4. Review the matching icons that the plugin selects on the canvas.

The plugin finds HDS icon component instances whose names follow the color service icon pattern and ends in `-color`.

![Placeholder: the Update Service Icon Colors plugin showing the page and selection scan controls, matching icon list, and selected icon instances on the Figma canvas.](/assets/tooling/design-tooling-figma-plugin/service-icon-finder-results.png)
