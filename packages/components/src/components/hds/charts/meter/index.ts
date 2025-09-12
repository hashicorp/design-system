/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import { MeterChart } from '@carbon/charts';
import options from './options.js';
import '@carbon/charts/styles.css';

export interface HdsChartsMeterSignature {
  Args: {
    title?: string;
    data: Array<{ group: string; value: number }>;
    total?: number; // if not passed in it will be calculated from the data
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsChartsMeter extends Component<HdsChartsMeterSignature> {
  chart: MeterChart | null = null;

  @action
  setupChart(element: HTMLDivElement): void {
    const chartData = this.args.data;

    // Dynamically calculate the total from the passed-in data
    const chartTotal = chartData.reduce(
      (sum, item): number => sum + item.value,
      0
    );

    // Merge the dynamic options into the default options
    const chartOptions = {
      ...options,
      title: this.args.title || options.title,
      meter: {
        ...options.meter,
        proportional: {
          ...options.meter.proportional,
          total: this.args.total || chartTotal,
        },
      },
    };

    // Create the MeterChart instance
    this.chart = new MeterChart(element, {
      data: chartData,
      options: chartOptions,
    });
  }
}
