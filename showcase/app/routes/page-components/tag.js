/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { COLORS } from '@hashicorp/design-system-components/components/hds/tag/index';
import { TOOLTIP_PLACEMENTS } from '@hashicorp/design-system-components/components/hds/tag/index';

export default class PageComponentsTagRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus'];
    const range = Array(1000)
      .fill(1)
      .map((n, i) => ({ index: n + i }));
    return { range, COLORS, TOOLTIP_PLACEMENTS, STATES };
  }
}
