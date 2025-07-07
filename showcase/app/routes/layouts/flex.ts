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

export default class LayoutsFlexRoute extends Route {
  model() {
    return { DIRECTIONS, JUSTIFYS, ALIGNS, GAPS };
  }
}
