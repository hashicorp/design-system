/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { STATUSES as STATUS_LINK_STATUSES } from '@hashicorp/design-system-components/components/hds/app-footer/status-link';

import type { ModelFrom } from 'showcase/utils/model-from-route';

export type PageComponentsAppFooterModel =
  ModelFrom<PageComponentsAppFooterRoute>;

export default class PageComponentsAppFooterRoute extends Route {
  model() {
    // these are used only for presentation purpose in the showcase
    const LINK_STATES = ['default', 'hover', 'active', 'focus'];

    return { LINK_STATES, STATUS_LINK_STATUSES };
  }
}
