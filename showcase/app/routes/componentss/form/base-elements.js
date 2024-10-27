/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

export default class ComponentsFormBaseElementsRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const SAMPLE_ERROR_MESSAGES = [
      'First error message',
      'Second error message',
    ];
    return {
      SAMPLE_ERROR_MESSAGES,
    };
  }
}
