/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import {
  TYPES,
  COLORS,
} from '@hashicorp/design-system-components/components/hds/alert';

export default class ComponentsAlertRoute extends Route {
  model() {
    return {
      TYPES,
      COLORS,
    };
  }
}
