/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { TYPES } from '@hashicorp/design-system-components/components/hds/form/text-input/base';

export default class ComponentsFormTextInputRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'focus'];
    return {
      TYPES,
      STATES,
    };
  }
}
