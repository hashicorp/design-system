/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { DISPLAYS } from '@hashicorp/design-system-components/services/hds-time';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsTimeModel = ModelFrom<PageComponentsTimeRoute>;

export default class PageComponentsTimeRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    // const STATES = ['default', 'hover', 'focus']; TODO: Do we need to design states?
    return { DISPLAYS };
  }
}
