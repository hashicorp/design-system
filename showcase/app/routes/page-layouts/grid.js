/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import {
  ALIGNS,
  GAPS,
} from '@hashicorp/design-system-components/components/hds/layout/grid/index';

export default class PageLayoutsGridRoute extends Route {
  model() {
    return { ALIGNS, GAPS };
  }
}
