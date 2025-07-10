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

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsCopyButtonModel = ModelFrom<PageComponentsCopyButtonRoute>;

export default class PageComponentsCopyButtonRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus'];
    return {
      SIZES,
      STATES,
      SUCCESS_ICON,
      ERROR_ICON,
    };
  }
}
