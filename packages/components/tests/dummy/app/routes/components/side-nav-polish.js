/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

export const OPACITY_STOPS = ['10', '15', '20', '25', '30'];
export const GRADIENT_TESTS = [
  'visual-refresh',
  'visual-refresh-dark',
  'explore-01',
  'explore-02',
];

export default class ComponentsSideNavPolishRoute extends Route {
  model() {
    return {
      OPACITY_STOPS,
      GRADIENT_TESTS,
    };
  }
}
