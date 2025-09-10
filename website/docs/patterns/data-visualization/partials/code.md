## How to use Carbon Charts components

We recommend using the Vanilla JavaScript version of IBM’s [Carbon Chart components](https://carbondesignsystem.com/data-visualization/chart-types/).

### Using within an Ember component

!!! info

Refer to the full [Carbon Charts API docs](https://charts.carbondesignsystem.com/api/) for the full list of available options for each component type.

!!!

The Vanilla JavaScript component files can be imported and utilized within Ember to create a customized component for your use case.

```handlebars{data-execute=false}
import { DonutChart } from '@carbon/charts';
import options from './options.js';
import '@carbon/charts/styles.css';
```

Expose various parts of the API as needed.

```handlebars{data-execute=false}
Args: {
  title?: string;
  data: Array<{ group: string; value: number }>;
  colorMap?: { [key: string]: string }; // Optional custom colors
};
```

### Setting options

The available component options, such as the [Donut Chart options](https://charts.carbondesignsystem.com/api/interfaces/donutchartoptions), can be set according to your needs. You can combine the preset options that you’ve chosen to include with any dynamic options you’ve exposed.

#### Options.js file with pre-set options

```handlebars{data-execute=false}
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

```handlebars{data-execute=false}
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
