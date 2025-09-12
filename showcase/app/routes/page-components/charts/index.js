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

// Bar data

const BAR_MANAGED_RESOURCES_DATA = [
  {
    date: '2025-01',
    value: 9000,
  },
  {
    date: '2025-02',
    value: 12000,
  },
  {
    date: '2025-03',
    value: 10000,
  },
  {
    date: '2025-04',
    value: 13000,
  },
  {
    date: '2025-05',
    value: 14000,
  },
  {
    date: '2025-06',
    value: 15000,
  },
  {
    date: '2025-07',
    value: 15000,
  },
  {
    date: '2025-08',
    value: 18000,
  },
  {
    date: '2025-09',
    value: 21000,
  },
  {
    date: '2025-10',
    value: 22000,
  },
  {
    date: '2025-11',
    value: 24000,
  },
  {
    date: '2025-12',
    value: 27000,
  },
];

export default class PageComponentsChartsRoute extends Route {
  async model() {
    return {
      DONUT_SERVICE_HEALTH_DATA,
      DONUT_CLUSTERS_DATA,
      METER_DATABASE_TRANSACTIONS_DATA,
      METER_BILLABLE_RESOURCES_DATA,
      BAR_MANAGED_RESOURCES_DATA,
    };
  }
}
