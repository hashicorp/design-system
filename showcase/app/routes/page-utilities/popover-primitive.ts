/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { PLACEMENTS } from '@hashicorp/design-system-components/modifiers/hds-anchored-position';
import type { HdsAnchoredPositionOptions } from '@hashicorp/design-system-components/modifiers/hds-anchored-position';
import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageUtilitiesPopoverPrimitiveModel =
  ModelFrom<PageUtilitiesPopoverPrimitiveRoute>;

export default class PageUtilitiesPopoverPrimitiveRoute extends Route {
  model() {
    const DETECTIONS: HdsAnchoredPositionOptions['enableCollisionDetection'][] =
      [false, true, 'flip', 'shift', 'auto'];
    const STRATEGIES: HdsAnchoredPositionOptions['strategy'][] = [
      'absolute',
      'fixed',
    ];
    return { PLACEMENTS, STRATEGIES, DETECTIONS };
  }
}
