!!! Info

For more support in  using the Carbon Chart library, please message the Carbon Core team in the IBM Slack channel [#carbon-charts-design](https://ibm.enterprise.slack.com/archives/C01DTUSCQAJ) or [#carbon-charts](https://ibm.enterprise.slack.com/archives/CCA7L4MS9).

!!!

## How to use Carbon Charts components

We recommend using the Vanilla JavaScript version of IBM’s [Carbon Chart components](https://charts.carbondesignsystem.com).

### Helpful resources

- [Carbon Charts Introduction](https://charts.carbondesignsystem.com/introduction)
- [Carbon Charts installation](https://charts.carbondesignsystem.com/installation)
- [Carbon Charts API](https://charts.carbondesignsystem.com/api/)

### Getting started

Refer to the [Carbon Charts installation & setup page](https://charts.carbondesignsystem.com/installation) for more complete instructions.

#### Basic steps

1. Install the Vanilla JavaScript Carbon Charts library as a dependency.
2. Import the component you wish to use, for example the `DonutChart`
3. Create an options.js file if you wish to customize the component’s available options.
4. Ensure components will have the correct visual appearance by
    - linking to font definitions within your HTML document
    - importing the component styles

### Importing files

In HTML:

[[code-snippets/data-viz-imports-html]]

Within JavaScript:

[[code-snippets/data-viz-imports-js]]

### Ember component example

A simple example using the [Carbon Charts Donut](https://charts.carbondesignsystem.com/donut) component.

[[code-snippets/data-viz-example execute=false]]

#### Options.js file with example pre-set options

The component options, such as the [Donut Chart options](https://charts.carbondesignsystem.com/api/interfaces/donutchartoptions), can be set according to your needs. You can combine the preset options that you’ve included with dynamic options you’ve exposed.

[[code-snippets/data-viz-chart-options]]

!!! info

Refer to the [Carbon Charts API docs](https://charts.carbondesignsystem.com/api/) for the full list of available options for each component type.

!!!

#### Application

Font definition links should only be included once within the HTML application page.

[[code-snippets/data-viz-fonts]]

#### Rendered chart

This will render a chart similar to this one:

![Example of a rendered Carbon Donut Chart](/assets/patterns/data-visualization/code-demo-donut-chart.png)
