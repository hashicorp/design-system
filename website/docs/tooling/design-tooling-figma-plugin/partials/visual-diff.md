Visual Diff compares two Figma layers pixel-by-pixel and provides a similarity score and visual outputs for review. Use it to focus review on visual changes after an HDS-to-Carbon migration or library update. The result identifies differences; it doesn't determine whether a design is correct.

## Before you begin

Choose two comparable layers and use matching states and content where possible. Visual Diff can export Figma layers that support image export.

Visual Diff normalizes references with different dimensions before comparing them. A difference in reference size affects the analysis, so compare layers with matching dimensions whenever possible.

## Compare two references

1. Select the first layer on the Figma canvas.
2. Open **Visual Diff** and select **Set selection as Reference A**.
3. Select the second layer on the canvas.
4. In the plugin, select **Use Selection** for **Reference B**.
5. Select **Compare**.
6. Review the similarity score and visual output.

Use **Refresh selection** after changing your Figma selection. Use **Clear comparison** to reset Reference B and the current results.

![Placeholder: the Visual Diff plugin with Reference A and Reference B selected.](/assets/tooling/design-tooling-figma-plugin/visual-diff-reference-selection.png)

## Interpret and share results

A high similarity score means fewer pixel-level differences. It doesn't confirm that a migration or design review is complete. Intentional changes to content, layout, theme, typography, or component behavior can lower the score.

Use the onion-skin and highlighted-difference views to locate changes. Inspect the related Figma layers and relevant HDS or Carbon guidance to determine whether action is needed.

Drag either result preview onto the Figma canvas to create an image layer for review or discussion.

![Placeholder: the Visual Diff result showing the similarity score, onion-skin mode, and highlighted-difference mode.](/assets/tooling/design-tooling-figma-plugin/visual-diff-results.png)

![Placeholder: dragging a Visual Diff result preview from the plugin onto the Figma canvas.](/assets/tooling/design-tooling-figma-plugin/visual-diff-canvas-placement.png)

## Reference storage

Reference A is saved in the plugin's local storage and can be used when you move between Figma files. It may not be available in every Figma environment. If it isn't available, select the source layer again and save a new Reference A.

## Troubleshooting

### I can't set a reference

Select a layer that Figma can export as an image, then try again.

### I can't compare the references

Check that both references are set. Review their dimensions and states so the resulting differences are meaningful.

### I can't place a result on the canvas

Try comparing smaller layers or reducing the image dimensions before comparing. If the issue continues, submit the error details through **Submit Feedback** in the plugin.
