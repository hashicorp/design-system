/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Route from '@ember/routing/route';

import { STATUSES as STEP_STATUSES } from '@hashicorp/design-system-components/components/hds/stepper/step/indicator';

// basic function that clones an array of objects (not deep)
const clone = <T>(arr: T[]): T[] => {
  return arr.map((item) => ({ ...item }));
};

export default class ComponentsStepperListRoute extends Route {
  model() {
    const listData = [
      {
        title: 'Step 1',
        status: 'complete',
      },
      {
        title: 'Step 2',
        status: 'progress',
      },
      {
        title: 'Step 3',
        status: 'incomplete',
      },
    ];

    return {
      stepsDemo1: clone(listData),
      stepsDemo2: clone(listData),
      STEP_STATUSES,
    };
  }
}
