/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { COLORS } from '@hashicorp/design-system-components/components/hds/icon/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsIconModel = ModelFrom<PageComponentsIconRoute>;

export default class PageComponentsIconRoute extends Route {
  model() {
    return {
      COLORS,
    };
  }
}
