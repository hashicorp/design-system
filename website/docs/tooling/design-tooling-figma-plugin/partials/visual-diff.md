Visual Diff compares two Figma layers pixel-by-pixel, grades them based on similarity, and generates a visual overlap/onion skin that can be placed on the canvas for review. Use it to focus review on visual changes after an HDS-to-Carbon migration or library update. The result identifies differences; it doesn't determine whether a design is correct.

## Before you begin

Choose two comparable layers and use matching states and content where possible. Visual Diff can export Figma layers that support image export.

Visual Diff does not resize references that have different dimensions before comparing them. This can affect the results, so compare layers that are the same size whenever possible.

## Compare two references

1. Open **Visual Diff** and select select a layer on the Figma canvas.
2.  Set selection as **Reference A**.
3. Select the second layer on the canvas, select **Use Selection** for **Reference B**.
4. Select **Compare**.
5. Review the similarity score and, optionally, drag the reference overlays onto the Figma canvas to more closely inspect the differences.
6. Use **Refresh selection** after changing your Figma selection. Use **Clear comparison** to reset Reference B and the current results.

![Placeholder: the Visual Diff plugin with Reference A and Reference B selected.](/assets/tooling/design-tooling-figma-plugin/visual-diff-reference-selection.png)

## Interpret and share results

A high similarity percentage means fewer pixel-level differences. It doesn't confirm that a migration or design review is complete. Intentional changes to content, layout, theme, typography, or component behavior can lower the score.

Use the onion skin and highlighted difference views to identify differences. Inspect the related Figma layers and relevant HDS or Carbon guidance to determine whether action is needed.

Drag either result preview onto the Figma canvas to create an image layer for review or discussion.

![Placeholder: the Visual Diff result showing the similarity score, onion-skin mode, and highlighted-difference mode.](/assets/tooling/design-tooling-figma-plugin/visual-diff-results.png)

![Placeholder: dragging a Visual Diff result preview from the plugin onto the Figma canvas.](/assets/tooling/design-tooling-figma-plugin/visual-diff-canvas-placement.png)

## Reference storage

Visual Diff works across Figma pages and files; Reference A is saved in the plugin's local storage and recalled when the plugin is opened in another File.

!!! Info

**A note about reference storage**

Storing the reference frame in the plugin's local storage has been tested across a number of different files and resources. If for some reason you encounter issues with a reference persisting, try clearing the selection or restarting the plugin. If this fails, please submit a [feedback/support request](https://forms.cloud.microsoft/r/Ka1D9i712k).
!!!
