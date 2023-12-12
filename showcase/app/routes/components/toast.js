/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

// the "Toast" is built on top of the "Alert" so it shares the same colors
import { COLORS } from '@hashicorp/design-system-components/components/hds/alert';

export default class ComponentsToastRoute extends Route {
  model() {
    return {
      COLORS,
    };
  }
}
