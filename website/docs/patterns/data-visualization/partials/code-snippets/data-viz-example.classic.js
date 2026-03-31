import Component from '@glimmer/component';
import { action } from '@ember/object';
import { DonutChart } from '@carbon/charts';
import '@carbon/charts/styles.css';

import USER_DATA from 'website/mocks/user-data.js';
import options from './data-viz-chart-options.js';

export default class LocalComponent extends Component {
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
      data: USER_DATA,
      options: chartOptions,
    });
  }
}
