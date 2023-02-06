/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { STATUSES as STEP_STATUSES } from '@hashicorp/design-system-components/components/hds/stepper/step/indicator';
import { STATUSES as TASK_STATUSES } from '@hashicorp/design-system-components/components/hds/stepper/task/indicator';

export default class ComponentsStepperRoute extends Route {
  model() {
    const STATES = ['default', 'hover', 'active'];
    return { STATES, STEP_STATUSES, TASK_STATUSES };
  }
}
