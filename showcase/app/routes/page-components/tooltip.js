/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { PLACEMENTS } from '@hashicorp/design-system-components/components/hds/tooltip-button/index';

export default class PageComponentsTooltipRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'focus'];
    return { PLACEMENTS, STATES };
  }
}
