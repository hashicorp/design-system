/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { COLORS as ITEM_INTERACTIVE_COLORS } from '@hashicorp/design-system-components/components/hds/copy-button';

export default class ComponentsCopyButtonRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const ITEM_STATES = ['default', 'hover', 'active', 'focus'];
    return {
      ITEM_INTERACTIVE_COLORS,
      ITEM_STATES,
    };
  }
}
