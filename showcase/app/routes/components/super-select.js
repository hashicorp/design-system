/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

export default class ComponentsSuperSelectRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];
    const SELECTED = ['Option 1'];
    const SELECTEDMULTIPLE = ['Option 1', 'Option 2'];

    const GROUPED_OPTIONS = [
      { groupName: 'Smalls', options: ['one', 'two', 'three'] },
      { groupName: 'Mediums', options: ['four', 'five', 'six'] },
      {
        groupName: 'Bigs',
        options: [
          { groupName: 'Fairly big', options: ['seven', 'eight', 'nine'] },
          { groupName: 'Really big', options: ['ten', 'eleven', 'twelve'] },
          'thirteen',
        ],
      },
      'one hundred',
      'one thousand',
    ];
    const SELECTED_GROUPED_OPTION = ['two'];

    // Use for examples? (Delete later if not used)
    const US_STATES_OPTIONS = [
      'Oregon (us-west-2)',
      'N. Virginia (us-east-1)',
      'Ireland (eu-west-1)',
      'London(eu-west-2)',
      'ALongUnbrokenStringALongUnbrokenStringALongUnbrokenString',
      'Frankfurt (eu-central-1)',
    ];
    const US_STATES_SELECTED = ['Oregon (us-west-2)'];
    const US_STATES_SELECTEDMULTIPLE = [
      'Oregon (us-west-2)',
      'N. Virginia (us-east-1)',
      'Ireland (eu-west-1)',
    ];

    return {
      OPTIONS,
      SELECTED,
      SELECTEDMULTIPLE,
      GROUPED_OPTIONS,
      SELECTED_GROUPED_OPTION,
      US_STATES_OPTIONS,
      US_STATES_SELECTED,
      US_STATES_SELECTEDMULTIPLE,
    };
  }
}
