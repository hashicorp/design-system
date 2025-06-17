/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

export default class ComponentsSuperSelectRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'focus'];

    // Options data
    const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];
    const SELECTED_OPTION = OPTIONS[0];
    const SELECTED_OPTIONS = [OPTIONS[0], OPTIONS[1]];
    const SELECTED_OPTIONS_SINGLE = [OPTIONS[0]];

    const GROUPED_OPTIONS = [
      { groupName: 'Group', options: ['Option 1', 'Option 2'] },
      { groupName: 'Group', options: ['Option 3', 'Option 4'] },
      {
        groupName: 'Group',
        options: [
          { groupName: 'Subgroup', options: ['Option 5', 'Option 6'] },
          { groupName: 'Subgroup', options: ['Option 7', 'Option 8'] },
        ],
      },
      {
        groupName: 'Group',
        options: [
          { groupName: 'Subgroup', options: ['Option 10', 'Option 11'] },
          { groupName: 'Subgroup', options: ['Option 12', 'Option 13'] },
        ],
      },
    ];
    const SELECTED_GROUPED_OPTION = GROUPED_OPTIONS[0].options[0];
    const SELECTED_GROUPED_OPTIONS = [
      GROUPED_OPTIONS[0].options[0],
      GROUPED_OPTIONS[1].options[0],
    ];

    const PLACES_OPTIONS = [
      'Oregon (us-west-2)',
      'N. Virginia (us-east-1)',
      'ALongUnbrokenStringALongUnbrokenStringALongUnbrokenStringALongUnbrokenStringALongUnbrokenStringALongUnbrokenStringALongUnbrokenString',
      'Ireland (eu-west-1)',
      'London(eu-west-2)',
      'Frankfurt (eu-central-1)',
    ];
    const SELECTED_PLACES_OPTION = PLACES_OPTIONS[0];
    const SELECTED_PLACES_OPTIONS = [
      PLACES_OPTIONS[0],
      PLACES_OPTIONS[1],
      PLACES_OPTIONS[3],
    ];
    const SELECTED_PLACES_OPTIONS_SINGLE = [PLACES_OPTIONS[0]];

    const CLUSTER_SIZE_OPTIONS = [
      {
        size: 'Extra Small',
        description: '2 vCPU | 1 GiB RAM',
        price: '$0.02',
      },
      {
        size: 'Small',
        description: '2 vCPU | 2 GiB RAM',
        price: '$0.04',
        disabled: true,
      },
      {
        size: 'Medium',
        description: '4 vCPU | 4 GiB RAM',
        price: '$0.08',
        disabled: true,
      },
      { size: 'Large', description: '8 vCPU | 8 GiB RAM', price: '$0.16' },
      {
        size: 'Extra Large',
        description: '16 vCPU | 16 GiB RAM',
        price: '$0.32',
      },
    ];
    const SELECTED_CLUSTER_SIZE_OPTION = CLUSTER_SIZE_OPTIONS[1];
    const SELECTED_CLUSTER_SIZE_OPTIONS = [
      CLUSTER_SIZE_OPTIONS[1],
      CLUSTER_SIZE_OPTIONS[3],
    ];

    return {
      STATES,
      OPTIONS,
      SELECTED_OPTION,
      SELECTED_OPTIONS,
      SELECTED_OPTIONS_SINGLE,
      GROUPED_OPTIONS,
      SELECTED_GROUPED_OPTION,
      SELECTED_GROUPED_OPTIONS,
      SELECTED_PLACES_OPTIONS_SINGLE,
      PLACES_OPTIONS,
      SELECTED_PLACES_OPTION,
      SELECTED_PLACES_OPTIONS,
      CLUSTER_SIZE_OPTIONS,
      SELECTED_CLUSTER_SIZE_OPTION,
      SELECTED_CLUSTER_SIZE_OPTIONS,
    };
  }
}
