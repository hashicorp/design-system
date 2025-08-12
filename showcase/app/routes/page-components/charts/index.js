/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

// Donut data

const DONUT_SERVICE_HEALTH_DATA = [
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
const DONUT_CLUSTERS_DATA = [
  { group: 'Self-managed', value: 2 },
  {
    group: 'Consul Dedicated',
    value: 1,
  },
];

// Meter data

const METER_DATABASE_TRANSACTIONS_DATA = [
  {
    group: 'Create',
    value: 174,
  },
  {
    group: 'Update',
    value: 4,
  },
  {
    group: 'Replace',
    value: 13,
  },
  {
    group: 'Import',
    value: 84,
  },
  {
    group: 'Delete',
    value: 3,
  },
];

const METER_BILLABLE_RESOURCES_DATA = [
  {
    group: 'Stack resources',
    value: 1200,
  },
  {
    group: 'Workspace resources',
    value: 24500,
  },
];

export default class PageComponentsChartsRoute extends Route {
  async model() {
    return {
      DONUT_SERVICE_HEALTH_DATA,
      DONUT_CLUSTERS_DATA,
      METER_DATABASE_TRANSACTIONS_DATA,
      METER_BILLABLE_RESOURCES_DATA,
    };
  }
}
