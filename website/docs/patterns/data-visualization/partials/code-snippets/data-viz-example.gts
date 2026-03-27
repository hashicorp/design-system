/* eslint-disable ember/no-at-ember-render-modifiers */
import Component from '@glimmer/component';
import didInsert from '@ember/render-modifiers/modifiers/did-insert';
import { DonutChart } from '@carbon/charts';
import '@carbon/charts/styles.css';

import USER_DATA from 'website/mocks/user-data.js';
import options from './data-viz-chart-options.js';

interface LocalComponentSignature {
  Args: {
    title?: string;
    colorMap?: string[];
  };
  Element: HTMLDivElement;
}

export default class LocalComponent extends Component<LocalComponentSignature> {
  chart: DonutChart | null = null;

  setupChart = (element: HTMLDivElement) => {
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
  };

  <template>
    <div {{didInsert this.setupChart}} ...attributes></div>
  </template>
}
