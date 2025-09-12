## How to use Carbon Charts components

We recommend using the Vanilla JavaScript version of IBM’s [Carbon Chart components](https://charts.carbondesignsystem.com).

### Getting started

1. Install the Vanilla JavaScript Carbon Charts library as a [dependency](https://charts.carbondesignsystem.com/installation).
2. Import the component you wish to use, for example the `DonutChart`
3. Create an options.js file if you wish to customize the component’s available options.
4. Import the component styles so the component will have the correct visual appearance.

```javascript
import { DonutChart } from '@carbon/charts';
import options from './options.js';
import '@carbon/charts/styles.css';
```

### Customizing options

!!! info

Refer to the [Carbon Charts API docs](https://charts.carbondesignsystem.com/api/) for the full list of available options for each component type.

!!!

The component options, such as the [Donut Chart options](https://charts.carbondesignsystem.com/api/interfaces/donutchartoptions), can be set according to your needs. You can combine the preset options that you’ve included with dynamic options you’ve exposed.

#### Options.js file with pre-set options

```javascript
export default {
  title: '', // Set title using @title on the component
  resizable: true,
  legend: {
    // alignment: 'left', // = alignment w/i container, options: 'left', 'right', 'center'
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

#### Ember component code exposing some options

```javascript
chart: DonutChart | null = null;

@action
setupChart(element: HTMLDivElement): void {
  const chartData = this.args.data;

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
    data: chartData,
    options: chartOptions,
  });
}
```
