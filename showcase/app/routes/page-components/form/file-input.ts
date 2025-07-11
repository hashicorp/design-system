/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsFormFileInputModel =
  ModelFrom<PageComponentsFormFileInputRoute>;

export default class PageComponentsFormFileInputRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const STATES = ['default', 'hover', 'active', 'focus'];
    return { STATES };
  }
}
