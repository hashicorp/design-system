/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import {
  AVAILABLE_SIZES as BADGE_SIZES,
  AVAILABLE_TYPES as BADGE_TYPES,
  AVAILABLE_COLORS as BADGE_COLORS,
} from '@hashicorp/design-system-components/components/hds/badge';

export default class ComponentsBadgeRoute extends Route {
  model() {
    return {
      BADGE_SIZES,
      BADGE_TYPES,
      BADGE_COLORS,
    };
  }
}
