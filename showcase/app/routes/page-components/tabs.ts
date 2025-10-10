/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { SIZES } from '@hashicorp/design-system-components/components/hds/tabs/index';

import type { ModelFrom } from 'showcase/utils/model-from-route';

export type PageComponentsTabsModel = ModelFrom<PageComponentsTabsRoute>;

export default class PageComponentsTabsRoute extends Route {
  model() {
    return {
      SIZES,
    };
  }
}
