/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import {
  ALIGNS,
  GAPS,
} from '@hashicorp/design-system-components/components/hds/layout/grid/index';

import { HdsCardLevelValues } from '@hashicorp/design-system-components/components/hds/card/types';

import type { HdsLayoutGridGaps } from '@hashicorp/design-system-components/components/hds/layout/grid/types';
import type { ModelFrom } from 'showcase/utils/model-from-route';

export type PageLayoutsGridModel = ModelFrom<PageLayoutsGridRoute>;

export default class PageLayoutsGridRoute extends Route {
  model() {
    const DEMO_GAP_ARRAYS:
      | HdsLayoutGridGaps
      | [HdsLayoutGridGaps, HdsLayoutGridGaps][] = [
      ['4', '48'],
      ['8', '32'],
      ['12', '24'],
      ['16', '16'],
    ];
    return { ALIGNS, GAPS, DEMO_GAP_ARRAYS, HdsCardLevelValues };
  }
}
