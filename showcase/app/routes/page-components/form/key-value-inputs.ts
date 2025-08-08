/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsFormKeyValueInputsModel =
  ModelFrom<PageComponentsFormKeyValueInputsRoute>;

export default class PageComponentsFormKeyValueInputsRoute extends Route {
  model() {
    // Super select demo options data
    const SUPERSELECT_OPTIONS = ['Option 1', 'Option 2', 'Option 3'];
    const SUPERSELECT_SELECTED_OPTION = SUPERSELECT_OPTIONS[0];
    const SUPERSELECT_SELECTED_OPTIONS = [
      SUPERSELECT_OPTIONS[0],
      SUPERSELECT_OPTIONS[1],
    ];

    return {
      SUPERSELECT_OPTIONS,
      SUPERSELECT_SELECTED_OPTION,
      SUPERSELECT_SELECTED_OPTIONS,
    };
  }
}
