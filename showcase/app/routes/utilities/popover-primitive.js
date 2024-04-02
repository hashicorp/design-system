/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { PLACEMENTS } from '@hashicorp/design-system-components/components/hds/popover-primitive';

export default class ComponentsPopoverRoute extends Route {
  model() {
    return { PLACEMENTS };
  }
}
