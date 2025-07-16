/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageFoundationsElevationModel =
  ModelFrom<PageFoundationsElevationRoute>;

export default class PageFoundationsElevationRoute extends Route {
  model() {
    const ELEVATIONS = ['inset', 'low', 'mid', 'high', 'higher', 'overlay'];
    const SURFACES = [
      'inset',
      'base',
      'low',
      'mid',
      'high',
      'higher',
      'overlay',
    ];
    return { ELEVATIONS, SURFACES };
  }
}
