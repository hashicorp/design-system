/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { SIZES } from '@hashicorp/design-system-components/components/hds/flyout/index';

import type { ModelFrom } from 'showcase/utils/model-from-route';

export type PageComponentsFlyoutModel = ModelFrom<PageComponentsFlyoutRoute>;

export default class PageComponentsFlyoutRoute extends Route {
  model() {
    return {
      SIZES,
    };
  }
}
