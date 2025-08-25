/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import { SimpleBarChart } from '@carbon/charts';
import options from './options.js';
import '@carbon/charts/styles.css';

export interface HdsChartsBarSignature {
  Args: {
    title?: string;
    data: Array<{ group: string; date: string; value: number }>;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsChartsBar extends Component<HdsChartsBarSignature> {
  chart: SimpleBarChart | null = null;

  @action
  setupChart(element: HTMLDivElement): void {
    const chartData = this.args.data;

    // Merge the dynamic options into the default options
    const chartOptions = {
      ...options,
      title: this.args.title || options.title,
    };

    // Create the SimpleBarChart instance
    this.chart = new SimpleBarChart(element, {
      data: chartData,
      options: chartOptions,
    });
  }
}
