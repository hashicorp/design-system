/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';

export default class Index extends Component {
  OPTIONS = [
    'Oregon (us-west-2)',
    'N. Virginia (us-east-1)',
    'Ireland (eu-west-1)',
    'London (eu-west-2)',
    'Frankfurt (eu-central-1)',
  ];

  GROUPED_OPTIONS = [
    { groupName: 'Most common', options: ['Kubernetes', 'AWS'] },
    { groupName: 'Others', options: ['CloudWise', 'SWA', 'Other'] },
  ];

  CLUSTER_SIZE_OPTIONS = [
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

  LONG_OPTIONS = [
    'AIzaSyDaGmWKa4JsXZHjGw7ISLn_3namBGewQe8mVLWwsAawjYr4Rx_Af50DDqtlxmfnc8mVLWws',
    'GmWKa4JsXZHjGw7zaCELgL.0imfnc8mVLWwsAawjYr4RxAf50DDqtlx_BGewQe8mVLWwsAa',
    '3namBGewQe8mVLWwsAawj_19803eb836a_64203a_22528ec4e9f4444_VLWwsAJsXZHjGw7zaCEL',
  ];

  SELECTED_OPTION = null;
  SELECTED_OPTIONS = null;
  SELECTED_LONG_OPTION = null;

  SELECTED_MULTIPLE = [this.OPTIONS[0], this.OPTIONS[1], this.OPTIONS[2]];

  PRE_SELECTED_OPTION = this.OPTIONS[1];
  PLACEHOLDER_SELECTED_OPTION = null;

  SELECTED_CLUSTER_SIZE_OPTION = this.CLUSTER_SIZE_OPTIONS[1];
  SELECTED_CLUSTER_SIZE_OPTIONS = [
    this.CLUSTER_SIZE_OPTIONS[1],
    this.CLUSTER_SIZE_OPTIONS[2],
  ];

  SELECTED_GROUPED_OPTION = this.GROUPED_OPTIONS[0].options[0];
  SELECTED_GROUPED_OPTIONS = [
    this.GROUPED_OPTIONS[0].options[0],
    this.GROUPED_OPTIONS[1].options[0],
  ];
  EXTRA_SELECTED_GROUPED_OPTION = this.GROUPED_OPTIONS[0].options[0];

  DD_WIDTH_SELECTED_OPTION = this.OPTIONS[1];
}
