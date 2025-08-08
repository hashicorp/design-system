/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { STATUSES as STEP_STATUSES } from '@hashicorp/design-system-components/components/hds/stepper/step/indicator';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsStepperListModel =
  ModelFrom<PageComponentsStepperListRoute>;

export default class PageComponentsStepperListRoute extends Route {
  model() {
    return {
      STEP_STATUSES,
    };
  }
}
