/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { AVAILABLE_COLORS } from '@hashicorp/design-system-components/components/hds/icon/index';

export default class PageComponentsIconRoute extends Route {
  model() {
    return {
      AVAILABLE_COLORS,
    };
  }
}
