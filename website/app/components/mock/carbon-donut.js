/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import { DonutChart } from '@carbon/charts';
import data from './data';
import options from './options';
import '@carbon/charts/styles.css';

export default class MockCarbonDonut extends Component {
  chart = null;

  @action
  setupChart(element) {
    // Merge the dynamic options into the default options
    const chartOptions = {
      ...options,
      title: this.args.title || options.title,
    };

    // Create the DonutChart instance
    this.chart = new DonutChart(element, {
      data,
      options: chartOptions,
    });
  }
}
