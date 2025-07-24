/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import {
  TYPES,
  COLORS,
} from '@hashicorp/design-system-components/components/hds/alert/index';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsAlertModel = ModelFrom<PageComponentsAlertRoute>;

export default class PageComponentsAlertRoute extends Route {
  model() {
    return {
      TYPES,
      COLORS,
    };
  }
}
