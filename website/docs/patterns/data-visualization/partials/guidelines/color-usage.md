## Color usage

When creating data visualizations, care should be taken to select colors geared towards the type of data being presented. General color palettes created for web UIs and/or marketing purposes are not always suitable as the colors can lack contrast and distinguishability or else be visually unsuitable when used together in a data context. Keep in mind that color choice can also impact meaning.

**There are three main types of color palettes used for data visualization:**

1. Categorical palettes
2. Sequential palettes
3. Diverging palettes

### Categorical palettes

Use for presenting categorical data that has no intrinsic order, such as a pie or donut chart. Also used for multi-line charts, area charts, stacked or grouped bar charts, etc.

**Categorical palettes should:**

- Use distinct colors.
- Be limited to a max of 10 colors.
- Be distinguished primarily by hue.  
  (**Important:** For accessibility, use patterns, symbols, or text in addition to or instead of color.)
- Avoid problematic color pairs (e.g., red-green, blue-purple).

![Color usage for categorical data visualization](/assets/patterns/data-visualization/color-usage/data-visualization-categorical.png)

### Sequential palettes

Use for presenting quantitative or inherently ordered values in a continuum. Useful for heat maps and grouped horizontal bar charts comparing sequential groups such as age ranges, etc.

**Sequential palettes should:**

- Vary lightness or hue to create a graduated color sequence (e.g., light blue to dark blue, blue to yellow)
- Ensure enough contrast between the lightest and darkest colors to make differences easily perceivable.

![Color usage for sequential data visualization](/assets/patterns/data-visualization/color-usage/data-visualization-sequential.png)

A graduated color sequence can distinguish elements in visualizations without inherent axes or directions, like maps or geographic representations.

![Color usage using a graduated color sequence](/assets/patterns/data-visualization/color-usage/data-visualization-graduated-sequence.png)

### Diverging palettes

Use for presenting two sequences of ordered values with a shared central value. Useful for diverging bar charts, horizon charts, heatmaps, etc.

**Diverging palettes should:**

- Vary lightness to create two graduated color sequences.
- Contrast the two color sequences by using different hues.
- Use lighter values for colors converging towards the center.

![Color usage for diverging data visualization](/assets/patterns/data-visualization/color-usage/data-visualization-diverging.png)
