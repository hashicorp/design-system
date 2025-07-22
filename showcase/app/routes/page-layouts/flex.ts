/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import {
  DIRECTIONS,
  JUSTIFYS,
  ALIGNS,
  GAPS,
} from '@hashicorp/design-system-components/components/hds/layout/flex/index';

import type { HdsLayoutFlexGaps } from '@hashicorp/design-system-components/components/hds/layout/flex/types';
import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageLayoutsFlexModel = ModelFrom<PageLayoutsFlexRoute>;

export default class PageLayoutsFlexRoute extends Route {
  model() {
    const DEMO_GAP_ARRAYS:
      | HdsLayoutFlexGaps
      | [HdsLayoutFlexGaps, HdsLayoutFlexGaps][] = [
      ['4', '48'],
      ['8', '32'],
      ['12', '24'],
      ['16', '16'],
    ];
    return { DIRECTIONS, JUSTIFYS, ALIGNS, GAPS, DEMO_GAP_ARRAYS };
  }
}
