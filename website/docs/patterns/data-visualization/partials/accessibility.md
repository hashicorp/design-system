## Accessibility considerations

### Add labels to charts & chart elements

Include text-based labels on charts and chart elements and do not truncate text. For Carbon Charts components that include `truncation` options for text, we advise setting the value to `false`.

![Data visualization showcasing labels](/assets/patterns/data-visualization/color-usage/data-visualization-ally-label.png)
<Doc::ImageCaption @text="Clearly labeling elements can enhance the experience for all users." />

### Don’t rely on color only to convey information

Be sure to always add appropriate text, such as labels or descriptions of the visual information in the chart. Patterns or symbols can be optionally combined with or used instead of color as another means of distinguishing chart elements. A thin separating line between adjacent colors helps to visually distinguish chart areas.

TODO: ADD IMAGE OF CARBON COMPONENTS DONUT CHART HERE
<Doc::ImageCaption @text="Carbon Charts components include thin white separators to help distinguish colors" />

### Ensure charts are readable when resized

In small screens such as on mobile devices, test that chart information is still legible. Users should also be able to zoom in to enlarge text associated with charts.

### Use interactive elements appropriately

Interactive elements should be focusable using a keyboard. They should have unique and clear names to clearly differentiate them and make their purpose clear.
