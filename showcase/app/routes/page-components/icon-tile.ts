/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import {
  SIZES,
  COLORS,
  PRODUCTS,
} from '@hashicorp/design-system-components/components/hds/icon-tile/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsIconTileModel =
  ModelFrom<PageComponentsIconTileRoute>;

export default class PageComponentsIconTileRoute extends Route {
  model() {
    return {
      SIZES,
      COLORS,
      PRODUCTS,
    };
  }
}
