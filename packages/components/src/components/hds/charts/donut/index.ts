/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import { DonutChart } from '@carbon/charts';
import options from './options.js';
import '@carbon/charts/styles.css';
export interface HdsChartsDonutSignature {
  Args: {
    title?: string;
    data: Array<{ group: string; value: number }>;
    colorMap?: { [key: string]: string }; // Optional custom colors for the chart segments/slices
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class HdsChartsDonut extends Component<HdsChartsDonutSignature> {
  chart: DonutChart | null = null;

  @action
  setupChart(element: HTMLDivElement): void {
    const chartData = this.args.data;

    // Merge the dynamic title into the options
    const chartOptions = {
      ...options,
      title: this.args.title || options.title,
      color: {
        scale: this.args.colorMap,
      },
    };

    this.chart = new DonutChart(element, {
      data: chartData,
      options: chartOptions,
    });
  }
}
