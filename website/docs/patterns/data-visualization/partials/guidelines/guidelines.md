## Deciding how best to represent data

Consider whether a data visualization is actually appropriate for the type of data you wish to present or whether a table may be clearer or more appropriate. Data visualizations offer a quick way to identify trends or patterns or as a way to visually summarize data. Tables, on the other hand, are better for examining precise or multi-dimensional data. Carbon Charts components, in a way, allow you to do both. The built-in toolbar enables users to view a table of the presented data in the data visualization.

### Considerations for using data visualization

- **Information density**: If a table requires too many columns to fit within a screen consider whether using a data visualization would make the information easier to consume.
- **Frequency of outliers**: If most data points are clustered but there are a few outliers, this is less apparent using a table so a data visualization may be clearer.

## Carbon charts components

IBM’s Carbon Design System includes various [chart components](https://carbondesignsystem.com/data-visualization/chart-types/) that we recommend using to create data visualizations. These components are available in Figma and code and utilize Carbon Elements for [font styles](https://carbondesignsystem.com/elements/typography/overview/) and [color palettes](https://carbondesignsystem.com/elements/color/overview/).

### Commonly used chart examples

- [Vertical bar charts](https://charts.carbondesignsystem.com/bar#vertical) are the most common representation of categorical data. They allow a user to quickly compare the amounts of a value based on the heights of the bars in the chart. Examples in our products may include displaying cost per month or resource use per quarter.

![Vertical bar chart data visualization](/assets/patterns/data-visualization/color-usage/data-visualization-example-vertical-bar.png)

- [Proportional meters]( https://carbondesignsystem.com/data-visualization/simple-charts/#meter-(proportional)) are used to show the breakdown of categories within a bar that equal 100% of the bar. This is may be used in our products to show the health of a group of resources or the amount of resources used toward a specific cap.

![Proportional meter chart data visualization](/assets/patterns/data-visualization/color-usage/data-visualization-example-proportional-meter.png)

- [Donut charts](https://carbondesignsystem.com/data-visualization/simple-charts/#donut) are circular graphs that display data as a portion of a whole divided into slices. This type of chart may be used in a similar way as proportional meter charts but offers a different presentation of the information.

![Donut chart data visualization](/assets/patterns/data-visualization/color-usage/data-visualization-example-donut.png)


## Color palettes

When creating data visualizations, use the color palette created for the type of data being presented and consider that color choice can impact meaning. Carbon Charts offers preset [color palettes](https://carbondesignsystem.com/data-visualization/color-palettes/) for each type of data representation, making it simple to select appropriate and accessibility-compliant values.

There are three main types of color palettes used in data visualization:

1. Categorical palettes
2. Sequential palettes
3. Diverging palettes

Carbon’s data visualization palettes include categorical palettes with one to five colors, a full categorical palette for needs requiring more than five distinctions, a sequential palette, a diverging palette, and a gradient palette.

### Categorical palettes

Use categorical palettes for presenting data that has no intrinsic order, such as in a pie or donut chart. They are also good for multi-line charts, area charts, stacked or grouped bar charts, etc.

![](/assets/patterns/data-visualization/color-usage/data-visualization-categorical.png)

### Sequential palettes

Use sequential palettes for quantitative or ordered values in a continuum. This palette is useful for heat maps and grouped horizontal bar charts that compare sequential groups, such as age ranges, etc.

![](/assets/patterns/data-visualization/color-usage/data-visualization-sequential.png)

A gradient palette is a type of sequential palette that can be used to distinguish elements without inherent axes or directions, such as in maps or geographic representations.

![](/assets/patterns/data-visualization/color-usage/data-visualization-graduated-sequence.png)

### Diverging palettes

Use diverging palettes when presenting two sequences of ordered values that share a central value. This type of palette can be used for diverging bar charts, horizon charts, heat maps, etc.

![](/assets/patterns/data-visualization/color-usage/data-visualization-diverging.png)
