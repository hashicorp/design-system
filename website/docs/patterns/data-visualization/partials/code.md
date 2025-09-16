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

```html{data-execute=false}
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon/plex/sans.css" />
<link rel="stylesheet" href="https://1.www.s81c.com/common/carbon/plex/sans-condensed.css" />
```

Within JavaScript:

```javascript
import { DonutChart } from '@carbon/charts';
import '@carbon/charts/styles.css';
```

### Ember component example

A simple example using the [Carbon Charts Donut](https://charts.carbondesignsystem.com/donut) component.

#### JavaScript

```javascript
// app/components/demo-carbon-donut/index.js

import Component from '@glimmer/component';
import { action } from '@ember/object';

import { DonutChart } from '@carbon/charts';
import data from './data';
import options from './options';
import '@carbon/charts/styles.css';

export default class DemoCarbonDonut extends Component {
  chart = null;

  @action
  setupChart(element) {
    // Merge the dynamic options into the default options
    const chartOptions = {
      ...options,
      title: this.args.title || options.title,
      color: {
        scale: this.args.colorMap,
      },
    };

    // Create the DonutChart instance
    this.chart = new DonutChart(element, {
      data,
      options: chartOptions,
    });
  }
}
```

#### Options.js file with example pre-set options

The component options, such as the [Donut Chart options](https://charts.carbondesignsystem.com/api/interfaces/donutchartoptions), can be set according to your needs. You can combine the preset options that you’ve included with dynamic options you’ve exposed.

```javascript
// app/components/demo-carbon-donut/options.js

export default {
  title: '', // Set title using @title on the component
  resizable: true,
  legend: {
    position: 'left', // = position relative to chart, options: 'top', 'bottom', 'left', 'right'
    truncation: {
      type: 'none',
    },
  },
  donut: {
    alignment: 'center', // = alignment w/i container, options: 'center', 'left', 'right'
  },
  pie: {
    labels: {
      enabled: true,
      formatter: (data) => data.value,
    },
  },
  height: '175px',
};
```

!!! info

Refer to the [Carbon Charts API docs](https://charts.carbondesignsystem.com/api/) for the full list of available options for each component type.

!!!


#### Template

Attach the `setupChart` action to a generic container element.

```handlebars{data-execute=false}
<!-- app/components/demo-carbon-donut/index.hbs -->

<div {{did-insert this.setupChart}} ...attributes></div>
```

#### Application

Font definition links should only be included once within the HTML application page.

```handlebars{data-execute=false}
<!-- app/index.html -->

<html lang="en">
  <head>
    ...
    <!-- include the Plex fonts in the main application -->
    <link rel="stylesheet" href="https://1.www.s81c.com/common/carbon/plex/sans.css" />
    <link rel="stylesheet" href="https://1.www.s81c.com/common/carbon/plex/sans-condensed.css" />
    ...
  </head>
  <body>
    ...
  </body>
</html>
```


#### Rendered chart

This will render a chart similar to this one:

![Example of a rendered Carbon Donut Chart](/assets/patterns/data-visualization/code-demo-donut-chart.png)
