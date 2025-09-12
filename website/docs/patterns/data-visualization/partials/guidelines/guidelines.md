## Deciding how best to represent data

Consider whether a data visualization is actually appropriate for the type of data you wish to present. Often, using a table may be clearer or more appropriate. Carbon Charts components, in a way, allow you to do both. The built-in toolbar allows users to view a table of the presented data in the data visualization.

### Considerations for using a data visualization

* **Information density**: If a table requires too many columns to fit within a screen.
* **Frequency of outliers**: If most data points are clustered but there are a few outliers, this is less apparent using a table.

## Carbon charts components

IBM’s Carbon Design System includes various [chart components](https://carbondesignsystem.com/data-visualization/chart-types/) that we recommend using for creating data visualizations. These components are available in Figma and code. They use the Carbon library for font styles and color palettes to make it easier to implement consistent data visualization styling across products.

### Commonly used chart examples

* [Vertical bar chart](https://charts.carbondesignsystem.com/bar#vertical)
* [Proportional Meter]( https://carbondesignsystem.com/data-visualization/simple-charts/#meter-(proportional) )
* [Donut chart](https://carbondesignsystem.com/data-visualization/simple-charts/#donut)

## Color palettes

When creating data visualizations, use the color palette created for the type of data being presented. Color choice can impact meaning. Carbon Charts offers preset [palettes](https://carbondesignsystem.com/data-visualization/color-palettes/) for each type of data representation to make it simple to select appropriate and accessibility-compliant values.

**There are three main types of color palettes used in data visualization:**

1. Categorical palettes
2. Sequential palettes
3. Diverging palettes

Carbon's data visualization palettes separate color styles for you to make pairing colors easier. Their color styles include categorical palettes from one to five colors, a full categorical palette for needs above five distinctions, a sequential palette, a diverging palette, and a gradient palette.

### Categorical palettes

Use for presenting data that has no intrinsic order, such as in a pie or donut chart. Also should be used in multi-line charts, area charts, stacked or grouped bar charts, etc.

![Color usage for categorical data visualization](/assets/patterns/data-visualization/color-usage/data-visualization-categorical.png)

### Sequential palettes

Use for quantitative or ordered values in a continuum. This palette is useful for heat maps and grouped horizontal bar charts that compare sequential groups such as age ranges, etc.

![Color usage for sequential data visualization](/assets/patterns/data-visualization/color-usage/data-visualization-sequential.png)

The gradient palette may be used to distinguish elements in visualizations without inherent axes or directions, such as maps or geographic representations.

![Color usage using a graduated color sequence](/assets/patterns/data-visualization/color-usage/data-visualization-graduated-sequence.png)

### Diverging palettes

Use for presenting two sequences of ordered values with a shared central value. Can be used for diverging bar charts, horizon charts, heat maps, etc.

![Color usage for diverging data visualization](/assets/patterns/data-visualization/color-usage/data-visualization-diverging.png)
