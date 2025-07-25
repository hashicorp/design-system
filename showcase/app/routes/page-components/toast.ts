/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

// the "Toast" is built on top of the "Alert" so it shares the same colors
import { COLORS } from '@hashicorp/design-system-components/components/hds/alert/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsToastModel = ModelFrom<PageComponentsToastRoute>;

export default class PageComponentsToastRoute extends Route {
  model() {
    return {
      COLORS,
    };
  }
}
