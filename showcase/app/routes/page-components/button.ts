/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import {
  SIZES,
  COLORS,
} from '@hashicorp/design-system-components/components/hds/button/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentButtonModel = ModelFrom<PageComponentsButtonRoute>;

export default class PageComponentsButtonRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus', 'disabled'];
    return { SIZES, COLORS, STATES };
  }
}
