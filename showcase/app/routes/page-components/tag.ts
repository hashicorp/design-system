/**
 * Copyright (c) HashiCorp, Inc.
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
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus'];
    return { COLORS, TOOLTIP_PLACEMENTS, STATES };
  }
}
