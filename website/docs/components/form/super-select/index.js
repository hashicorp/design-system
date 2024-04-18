/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class Index extends Component {
  get OPTIONS() {
    return [
      'Oregon (us-west-2)',
      'N. Virginia (us-east-1)',
      'Ireland (eu-west-1)',
      'London (eu-west-2)',
      'Frankfurt (eu-central-1)',
    ];
  }

  get SELECTED() {
    return ['Oregon (us-west-2)'];
  }

  get SELECTEDMULTIPLE() {
    return [
      'Oregon (us-west-2)',
      'N. Virginia (us-east-1)',
      'Ireland (eu-west-1)',
    ];
  }

  get GROUPED_OPTIONS() {
    return [
      { groupName: 'Most common', options: ['Kubernetes', 'AWS'] },
      { groupName: 'Others', options: ['CloudWise', 'SWA', 'Other'] },
    ];
  }

  get SELECTED_GROUPED_OPTION() {
    return ['Kubernetes'];
  }

  get SELECTED_GROUPED_OPTIONS() {
    return ['AWS', 'CloudWise'];
  }

  get CLUSTER_SIZE_OPTIONS() {
    return [
      {
        size: 'Extra Small',
        description: '2 vCPU | 1 GiB RAM',
        price: '$0.02',
      },
      { size: 'Small', description: '2 vCPU | 2 GiB RAM', price: '$0.04' },
      { size: 'Medium', description: '4 vCPU | 4 GiB RAM', price: '$0.08' },
      { size: 'Large', description: '8 vCPU | 8 GiB RAM', price: '$0.16' },
      {
        size: 'Extra Large',
        description: '16 vCPU | 16 GiB RAM',
        price: '$0.32',
      },
    ];
  }

  get SELECTED_CLUSTER_SIZE_OPTION() {
    return this.CLUSTER_SIZE_OPTIONS[1];
  }

  get SELECTED_CLUSTER_SIZE_OPTIONS() {
    return [this.CLUSTER_SIZE_OPTIONS[1], this.CLUSTER_SIZE_OPTIONS[2]];
  }

  // notice: this is used as "noop" function for the onDismiss callback of the SuperSelect component
  @action
  noop() {
    //
  }
}
