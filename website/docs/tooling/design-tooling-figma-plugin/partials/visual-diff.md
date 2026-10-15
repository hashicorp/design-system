Visual Diff compares two Figma layers at the pixel level to calculate a similarity score and generate onion-skin and highlighted-difference views for review. Use it to focus review on visual changes after an HDS-to-Carbon migration or library update. The result identifies differences; it doesn't determine whether a design is correct.

## Before you begin

Choose two comparable layers and use matching states and content where possible. Visual Diff can export Figma layers that support image export.

Visual Diff doesn't resize references before comparing them. Different dimensions affect the result, so compare layers of the same size whenever possible.

## Compare two references

1. Open **Visual Diff** and select a layer for comparison on the Figma canvas.
2. Select **Use Selection** to set the selection as **Reference A**.
3. Select a second layer on the canvas, then select **Use Selection** for **Reference B**.
4. The **Compare** button will perform the comparison, generate a score based on pixel differences, and display thumbnails for onion skill and visual diff comparisons.
5. Review the similarity score. Drag the thumbnails from the "place on canvas" section onto the Figma canvas to more closely inspect the differences.
6. If **Reference A** has been updated use **Refresh selection** to reload it from the local plugin storage.
7. Use **Clear comparison** to reset **Reference B** and the current results.

![](/assets/tooling/design-tooling-figma-plugin/visual-diff-comparison-results.png)

## Interpret and share results

A high similarity percentage means fewer pixel-level differences. It doesn't confirm that a migration or design review is complete. Intentional changes to content, layout, theme, typography, or component behavior can lower the score.

![](/assets/tooling/design-tooling-figma-plugin/visual-diff-reference-selection.png)

Use the onion skin and highlighted difference views to identify differences. Inspect the related Figma layers and relevant HDS or Carbon guidance to determine whether action is needed.

Drag either result preview onto the Figma canvas to create an image layer for review or discussion.

![](/assets/tooling/design-tooling-figma-plugin/visual-diff-overlay.png)

## Reference storage

Visual Diff works across Figma pages and files. It saves **Reference A** in the plugin's local storage and recalls it when you open the plugin in another file.

!!! Info

**A note about reference storage**

If **Reference A** isn't available, clear the selection or restart the plugin. If the issue continues, submit a [feedback or support request](https://forms.cloud.microsoft/r/Ka1D9i712k).
!!!
