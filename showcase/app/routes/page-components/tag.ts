/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import {
  COLORS,
  TOOLTIP_PLACEMENTS,
} from '@hashicorp/design-system-components/components/hds/tag/index';

import type { ModelFrom } from 'showcase/utils/model-from-route';

export type PageComponentsTagModel = ModelFrom<PageComponentsTagRoute>;

export default class PageComponentsTagRoute extends Route {
  model(): {
    COLORS: typeof COLORS;
    TOOLTIP_PLACEMENTS: typeof TOOLTIP_PLACEMENTS;
    STATES: string[];
  } {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus'];
    return { COLORS, TOOLTIP_PLACEMENTS, STATES };
  }
}
