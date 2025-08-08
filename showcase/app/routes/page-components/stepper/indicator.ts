/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { STATUSES as STEP_STATUSES } from '@hashicorp/design-system-components/components/hds/stepper/step/indicator';
import { STATUSES as TASK_STATUSES } from '@hashicorp/design-system-components/components/hds/stepper/task/indicator';

import type { ModelFrom } from 'showcase/utils/ModelFromRoute';

export type PageComponentsStepperIndicatorModel =
  ModelFrom<PageComponentsStepperIndicatorRoute>;

export default class PageComponentsStepperIndicatorRoute extends Route {
  model() {
    const INDICATOR_STATES = ['default', 'hover', 'active'];
    return {
      INDICATOR_STATES,
      STEP_STATUSES,
      TASK_STATUSES,
    };
  }
}
