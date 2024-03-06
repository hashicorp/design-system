/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

export default class ComponentsSuperSelectRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const OPTIONS = [
      'Oregon (us-west-2)',
      'N. Virginia (us-east-1)',
      'Ireland (eu-west-1)',
      'London(eu-west-2)',
      'ALongUnbrokenStringALongUnbrokenStringALongUnbrokenString',
      'Frankfurt (eu-central-1)',
    ];
    const SELECTED = ['Oregon (us-west-2)'];
    const SELECTEDMULTIPLE = [
      'Oregon (us-west-2)',
      'N. Virginia (us-east-1)',
      'Ireland (eu-west-1)',
    ];

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
    
    return { OPTIONS, SELECTED, SELECTEDMULTIPLE, GROUPED_OPTIONS, SELECTED_GROUPED_OPTION };
  }
}
