/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';

import type { PageComponentsStepperListModel } from 'showcase/routes/page-components/stepper/list';

import { HdsStepperStatusesValues as STEP_STATUSES_ENUM } from '@hashicorp/design-system-components/components/hds/stepper/types';

// basic function that clones an array of objects (not deep)
export const clone = <T>(arr: T[]): T[] => {
  return arr.map((item) => ({ ...item }));
};

type ListData = {
  title: string;
  status: STEP_STATUSES_ENUM;
  description: string;
};

const DEFAULT_DATA: ListData[] = [
  {
    title: 'Step 1',
    // TODO: will be fixed by https://hashicorp.atlassian.net/browse/HDS-5169
    status: STEP_STATUSES_ENUM.Complete,
    description: 'Description for Step 1',
  },
  {
    title: 'Step 2',
    // TODO: will be fixed by https://hashicorp.atlassian.net/browse/HDS-5169
    status: STEP_STATUSES_ENUM.Progress,
    description: 'Description for Step 2',
  },
  {
    title: 'Step 3',
    // TODO: will be fixed by https://hashicorp.atlassian.net/browse/HDS-5169
    status: STEP_STATUSES_ENUM.Incomplete,
    description: 'Description for Step 3',
  },
];

const updateSteps = (steps: ListData[], stepNumber: number) => {
  steps.forEach((step, index) => {
    if (index < stepNumber) {
      // TODO: will be fixed by https://hashicorp.atlassian.net/browse/HDS-5169
      step.status = STEP_STATUSES_ENUM.Complete;
    } else if (index === stepNumber) {
      // TODO: will be fixed by https://hashicorp.atlassian.net/browse/HDS-5169
      step.status = STEP_STATUSES_ENUM.Progress;
    } else {
      // TODO: will be fixed by https://hashicorp.atlassian.net/browse/HDS-5169
      step.status = STEP_STATUSES_ENUM.Incomplete;
    }
  });
};

const updateStepsProcessing = (steps: ListData[], stepNumber: number) => {
  steps.forEach((step, index) => {
    if (index < stepNumber) {
      // TODO: will be fixed by https://hashicorp.atlassian.net/browse/HDS-5169
      step.status = STEP_STATUSES_ENUM.Complete;
    } else if (index === stepNumber) {
      // TODO: will be fixed by https://hashicorp.atlassian.net/browse/HDS-5169
      step.status = STEP_STATUSES_ENUM.Processing;
    } else {
      // TODO: will be fixed by https://hashicorp.atlassian.net/browse/HDS-5169
      step.status = STEP_STATUSES_ENUM.Incomplete;
    }
  });
};

export default class PageComponentsStepperListController extends Controller {
  declare model: PageComponentsStepperListModel;

  @tracked currentStep_demo1 = 1;
  @tracked currentStep_demo2 = 1;

  @deepTracked steps_demo1 = clone(DEFAULT_DATA);
  @deepTracked steps_demo2 = clone(DEFAULT_DATA);

  // =============================
  // DEMOS
  // =============================
  @action
  onNextClickDemo1() {
    this.currentStep_demo1++;
    updateSteps(this.steps_demo1, this.currentStep_demo1);
  }

  @action
  onPreviousClickDemo1() {
    this.currentStep_demo1--;
    updateSteps(this.steps_demo1, this.currentStep_demo1);
  }

  @action
  onNextClickDemo2() {
    this.currentStep_demo2++;
    updateSteps(this.steps_demo2, this.currentStep_demo2);
  }

  @action
  onProcessingClickDemo2() {
    updateStepsProcessing(this.steps_demo2, this.currentStep_demo2);
    window.setTimeout(() => {
      this.currentStep_demo2++;
      updateSteps(this.steps_demo2, this.currentStep_demo2);
    }, 3000);
  }

  @action
  onPreviousClickDemo2() {
    this.currentStep_demo2--;
    updateSteps(this.steps_demo2, this.currentStep_demo2);
  }
}
