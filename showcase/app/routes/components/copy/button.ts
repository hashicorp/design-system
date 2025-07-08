/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import {
  SIZES,
  SUCCESS_ICON,
  ERROR_ICON,
} from '@hashicorp/design-system-components/components/hds/copy/button/index';

import type { HdsCopyButtonSizes } from '@hashicorp/design-system-components/components/hds/copy/button/types';

export interface ComponentsCopyButtonModelSignature {
  SIZES: HdsCopyButtonSizes[];
  STATES: string[];
  SUCCESS_ICON: string;
  ERROR_ICON: string;
}

export default class ComponentsCopyButtonRoute extends Route<ComponentsCopyButtonModelSignature> {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus'];
    return {
      SIZES: SIZES as HdsCopyButtonSizes[],
      STATES,
      SUCCESS_ICON,
      ERROR_ICON,
    };
  }
}
