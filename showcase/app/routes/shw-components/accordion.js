/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { SIZES } from '@hashicorp/design-system-components/components/hds/accordion/item/index';
import { TYPES } from '@hashicorp/design-system-components/components/hds/accordion/item/index';

export default class ShwComponentsAccordionRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'focus', 'active'];
    return { SIZES, TYPES, STATES };
  }
}
