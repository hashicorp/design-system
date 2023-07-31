/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';
import { SIZES } from '@hashicorp/design-system-components/components/hds/copy/button';

export default class ComponentsCopyButtonRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus'];
    const STATUS = ['idle', 'success', 'error'];
    return { SIZES, STATES, STATUS };
  }
}
