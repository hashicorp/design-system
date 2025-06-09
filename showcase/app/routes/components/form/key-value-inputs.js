/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

export default class ComponentsKeyValueInputsRoute extends Route {
  model() {
    // Options data
    const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];
    const SELECTED_OPTION = OPTIONS[0];
    const SELECTED_OPTIONS = [OPTIONS[0], OPTIONS[1]];

    return {
      OPTIONS,
      SELECTED_OPTION,
      SELECTED_OPTIONS,
    };
  }
}
