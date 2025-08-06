/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

import { DonutChart } from '@carbon/charts';
import options from './options.js';
import data from './data.js';
import '@carbon/charts/styles.css';

export interface HdsChartsDonutSignature {
  // Args: {};
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}
// More info on types and signatures: https://hashicorp.atlassian.net/wiki/spaces/HDS/pages/3245932580/Using+Typescript

export default class HdsChartsDonut extends Component<HdsChartsDonutSignature> {
  chart: DonutChart | null = null;

  @action
  setupChart(element: HTMLDivElement): void {
    this.chart = new DonutChart(element, {
      data,
      options,
    });
  }
}
