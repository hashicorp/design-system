/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { COLORS } from '@hashicorp/design-system-components/components/hds/link/inline';
import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsLinkInlineModel =
  ModelFrom<PageComponentsLinkInlineRoute>;

export default class PageComponentsLinkInlineRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus'];
    return { COLORS, STATES };
  }
}
