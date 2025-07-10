/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { SIZES } from '@hashicorp/design-system-components/components/hds/flyout/index';

export default class PageComponentsFlyoutRoute extends Route {
  model() {
    return {
      SIZES,
    };
  }
}
