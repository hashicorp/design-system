/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { COLORS as TOGGLE_BUTTON_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/toggle/button';
import { COLORS as ITEM_INTERACTIVE_COLORS } from '@hashicorp/design-system-components/components/hds/dropdown/list-item/interactive';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsAppHeaderModel =
  ModelFrom<PageComponentsAppHeaderRoute>;

export default class PageComponentsAppHeaderRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const TOGGLE_STATES = ['default', 'hover', 'active', 'focus', 'disabled'];
    const ITEM_STATES = ['default', 'hover', 'active', 'focus'];
    return {
      TOGGLE_BUTTON_COLORS,
      TOGGLE_STATES,
      ITEM_INTERACTIVE_COLORS,
      ITEM_STATES,
    };
  }
}
