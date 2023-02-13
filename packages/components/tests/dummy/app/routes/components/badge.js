/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import {
  SIZES as BADGE_SIZES,
  TYPES as BADGE_TYPES,
  COLORS as BADGE_COLORS,
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
