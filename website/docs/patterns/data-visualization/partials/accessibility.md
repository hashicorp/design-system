!!! Info

Refer to [Carbon’s Accessibility page](https://carbondesignsystem.com/guidelines/accessibility/overview/) for complete guidelines.

!!!

## Conformance rating

Because this is an IBM Carbon component, please refer to their documentation for conformance information.

## Accessibility considerations

### Add labels to charts & chart elements

Text-based labels on charts and chart elements must be present. Text must not be truncated (a keyboard-only user has no way to access truncated data). While the Carbon Charts components include `truncation` options for text, the value should be set to `false` in order to meet our conformance requirements.

![Data visualization showcasing labels](/assets/patterns/data-visualization/color-usage/data-visualization-ally-label.png)
<Doc::ImageCaption @text="Clearly labeling elements can enhance the experience for all users." />

### Don’t rely on color only to convey information

Be sure to always add appropriate text, such as labels or descriptions of the visual information in the chart. Using patterns, in addition to (or instead of) color can enhance accessibility, although Carbon Charts components and palettes don’t include them at this time. A thin separating line between adjacent colors helps to visually distinguish chart areas.

![Data visualization donut chart](/assets/patterns/data-visualization/color-usage/data-visualization-ally-donut.png)
<Doc::ImageCaption @text="Carbon Charts components include thin white separators to help distinguish colors" />

### Ensure charts are readable when resized

Always test that chart information is legible, even on smaller viewports (e.g. mobile devices). Per WCAG Success Criteria, users must also be able to zoom in on their browser ([up to 400%](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html)) and also [resize text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html) associated with charts.



### Use interactive elements appropriately

Interactive elements should be focusable using a keyboard, with a clear focus indicator that is not clipped or cut off. They should have unique and clear names to clearly differentiate them from one another and make their purpose clear. The visible text can be enhanced with additional information using the `aria-description` or `aria-describedby` attributes.
