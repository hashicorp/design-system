/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { PLACEMENTS } from '@hashicorp/design-system-components/modifiers/hds-anchored-position';

export default class ComponentsPopoverRoute extends Route {
  model() {
    return { PLACEMENTS };
  }
}
