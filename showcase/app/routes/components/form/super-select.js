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
    const SELECTED_MULTIPLE = ['Option 1', 'Option 2'];

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
    const PLACES_OPTIONS = [
      'Oregon (us-west-2)',
      'N. Virginia (us-east-1)',
      'ALongUnbrokenStringALongUnbrokenStringALongUnbrokenStringALongUnbrokenStringALongUnbrokenString',
      'Ireland (eu-west-1)',
      'London(eu-west-2)',
      'Frankfurt (eu-central-1)',
    ];
    const PLACES_SELECTED = ['Oregon (us-west-2)'];
    const PLACES_SELECTED_MULTIPLE = [
      'Oregon (us-west-2)',
      'N. Virginia (us-east-1)',
      'Ireland (eu-west-1)',
    ];

    return {
      OPTIONS,
      SELECTED,
      SELECTED_MULTIPLE,
      GROUPED_OPTIONS,
      SELECTED_GROUPED_OPTION,
      PLACES_OPTIONS,
      PLACES_SELECTED,
      PLACES_SELECTED_MULTIPLE,
    };
  }
}
