/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import {
  SIZES as BADGE_COUNT_SIZES,
  TYPES as BADGE_COUNT_TYPES,
  COLORS as BADGE_COUNT_COLORS,
} from '@hashicorp/design-system-components/components/hds/badge-count/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsBadgeCountModel =
  ModelFrom<PageComponentsBadgeCountRoute>;

export default class PageComponentsBadgeCountRoute extends Route {
  model() {
    return {
      BADGE_COUNT_SIZES,
      BADGE_COUNT_TYPES,
      BADGE_COUNT_COLORS,
    };
  }
}
