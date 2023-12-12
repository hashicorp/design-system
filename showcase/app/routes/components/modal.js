/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import {
  COLORS,
  SIZES,
} from '@hashicorp/design-system-components/components/hds/modal';

export default class ComponentsModalRoute extends Route {
  model() {
    return {
      COLORS,
      SIZES,
    };
  }
}
