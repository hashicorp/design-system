## Deciding how best to represent data
<!--
  TODO: Reach out for input on this section from members of the Data Viz Working Group #wg-data-viz
-->

Consider first whether a data visualization is actually appropriate for the type of data you wish to present. Oftentimes, just using a table may be clearer or more appropriate.

## Carbon charts components
<!-- 
  TODO: This section links to examples in code. It should be rewritten to instead focus more on design aspects with appropriate illustrations & links added.
-->

IBM’s Carbon Design System includes various [chart components](https://carbondesignsystem.com/data-visualization/chart-types/) that we recommend using as a basis for creating visualizations.

### Commonly used chart examples

* [Vertical bar chart](https://charts.carbondesignsystem.com/bar#vertical)
* [Proportional Meter]( https://carbondesignsystem.com/data-visualization/simple-charts/#meter-(proportional) )
* [Donut chart](https://carbondesignsystem.com/data-visualization/simple-charts/#donut)

## Color palettes
<!--
  TODO: Include examples & links for Carbon Charts color palettes (update illustrations)

  * Note: Bullet points explaining key differences for each palette type have been edited to somewhat condense them. They have been commented out however in case it's better to just delete them entirely.
-->

When creating data visualizations, care should be taken to use colors geared towards the type of data being presented. Color choice can also impact meaning.

**There are three main types of color palettes used for data visualization:**

1. Categorical palettes
2. Sequential palettes
3. Diverging palettes

### Categorical palettes

Use for presenting data that has no intrinsic order, such as in a pie or donut chart. Also used for multi-line charts, area charts, stacked or grouped bar charts, etc.

<!-- **Categorical palettes should:**

* Use distinct colors limited to a max of 10.
* Be distinguished primarily by hue. (a11y tip: also use patterns, symbols, or text.)
* Avoid problematic color pairs (e.g., red-green, an issue with color blindness). -->

![Color usage for categorical data visualization](/assets/patterns/data-visualization/color-usage/data-visualization-categorical.png)

### Sequential palettes

Use for quantitative or ordered values in a continuum. Useful for heat maps and grouped horizontal bar charts comparing sequential groups such as age ranges, etc.

<!-- **Sequential palettes should:**

- Graduate lightness or hue. (e.g., light blue to dark blue, blue to yellow)
- Ensure sufficient contrast between color values for clear distinction. -->

![Color usage for sequential data visualization](/assets/patterns/data-visualization/color-usage/data-visualization-sequential.png)

A graduated color sequence can also distinguish elements in visualizations without inherent axes or directions, such as maps or geographic representations.

![Color usage using a graduated color sequence](/assets/patterns/data-visualization/color-usage/data-visualization-graduated-sequence.png)

### Diverging palettes

Use for presenting two sequences of ordered values with a shared central value. Can be used for diverging bar charts, horizon charts, heat maps, etc.

<!-- **Diverging palettes should:**

- Vary lightness to create two graduated color sequences.
- Contrast the two color sequences by using different hues.
- Use lighter values for colors converging towards the center. -->

![Color usage for diverging data visualization](/assets/patterns/data-visualization/color-usage/data-visualization-diverging.png)

