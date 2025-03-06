/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

export default class ComponentsStepperRoute extends Route {
  model() {
    const NAV_STATES = ['default', 'hover', 'active', 'focus'];
    const INDICATOR_STATES = ['default', 'hover', 'active'];
    return {
      NAV_STATES,
      INDICATOR_STATES,
    };
  }
}
