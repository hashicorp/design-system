/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import {
  COLORS,
  SUCCESS_ICON,
  ERROR_ICON,
} from '@hashicorp/design-system-components/components/hds/copy/snippet/index';

import type { HdsCopySnippetColors } from '@hashicorp/design-system-components/components/hds/copy/snippet/types';

export interface ComponentsCopySnippetModelSignature {
  COLORS: HdsCopySnippetColors[];
  STATES: string[];
  SUCCESS_ICON: string;
  ERROR_ICON: string;
}

export default class ComponentsCopySnippetRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus'];
    return {
      COLORS: COLORS as HdsCopySnippetColors[],
      STATES,
      SUCCESS_ICON,
      ERROR_ICON,
    };
  }
}
