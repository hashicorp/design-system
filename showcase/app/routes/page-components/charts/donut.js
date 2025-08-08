/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

const SERVICE_HEALTH_DATA = [
  { group: 'Critical', value: 38 },
  { group: 'Warning', value: 34 },
  { group: 'Healthy', value: 18 },
];

/*
  Note: Currently, Donut chart does not natively support sub-groups or hierarchical (multi-level) data.
  (Sometimes called a "Sunburst chart".)

  Cannot do:
  {
    group: 'Consul Dedicated',
    value: [
      { group: "below v.1.4", value: 1 },
      { group: "above v1.14.0", value: 0 }
    ]
  },
*/
const CLUSTERS_DATA = [
  { group: 'Self-managed', value: 2 },
  {
    group: 'Consul Dedicated',
    value: 1,
  },
];

export default class PageComponentsChartsDonutRoute extends Route {
  async model() {
    return {
      SERVICE_HEALTH_DATA,
      CLUSTERS_DATA,
    };
  }
}
