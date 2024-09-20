/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import {
  COLORS,
  SIZES,
} from '@hashicorp/design-system-components/components/hds/modal';

export default class ComponentsModalRoute extends Route {
  model() {
    const SUPERSELECT_OPTIONS1 = ['Option 1', 'Option 2', 'Option 3'];
    const SUPERSELECT_SELECTED_OPTION1 = SUPERSELECT_OPTIONS1[0];
    const SUPERSELECT_OPTIONS2 = ['Option 1', 'Option 2', 'Option 3'];
    const SUPERSELECT_SELECTED_OPTION2 = SUPERSELECT_OPTIONS2[0];

    return {
      COLORS,
      SIZES,
      SUPERSELECT_OPTIONS1,
      SUPERSELECT_SELECTED_OPTION1,
      SUPERSELECT_OPTIONS2,
      SUPERSELECT_SELECTED_OPTION2,
    };
  }
}
