/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { PLACEMENTS } from '@hashicorp/design-system-components/components/hds/tooltip-button';

export default class ComponentsTooltipRoute extends Route {
  model() {
    return { PLACEMENTS };
  }
}
