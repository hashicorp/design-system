/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { TrackedArray, TrackedObject } from 'tracked-built-ins';

import type { HdsStepperStatuses } from '@hashicorp/design-system-components/components/hds/stepper/types';
import type { PageComponentsStepperListModel } from 'showcase/routes/page-components/stepper/list';

type ListData = {
  title: string;
  status: HdsStepperStatuses;
  description: string;
};

const updateSteps = (steps: ListData[], stepNumber: number) => {
  steps.forEach((step, index) => {
    if (index < stepNumber) {
      step.status = 'complete';
    } else if (index === stepNumber) {
      step.status = 'progress';
    } else {
      step.status = 'incomplete';
    }
  });
};

const updateStepsProcessing = (steps: ListData[], stepNumber: number) => {
  steps.forEach((step, index) => {
    if (index < stepNumber) {
      step.status = 'complete';
    } else if (index === stepNumber) {
      step.status = 'processing';
    } else {
      step.status = 'incomplete';
    }
  });
};

export default class PageComponentsStepperListController extends Controller {
  declare model: PageComponentsStepperListModel;

  @tracked currentStep_demo1 = 1;
  @tracked currentStep_demo2 = 1;

  steps_demo1: ListData[] = new TrackedArray([
    new TrackedObject({
      title: 'Step 1',
      status: 'complete',
      description: 'Description for Step 1',
    }),
    new TrackedObject({
      title: 'Step 2',
      status: 'progress',
      description: 'Description for Step 2',
    }),
    new TrackedObject({
      title: 'Step 3',
      status: 'incomplete',
      description: 'Description for Step 3',
    }),
  ]);

  steps_demo2: ListData[] = new TrackedArray([
    new TrackedObject({
      title: 'Step 1',
      status: 'complete',
      description: 'Description for Step 1',
    }),
    new TrackedObject({
      title: 'Step 2',
      status: 'progress',
      description: 'Description for Step 2',
    }),
    new TrackedObject({
      title: 'Step 3',
      status: 'incomplete',
      description: 'Description for Step 3',
    }),
  ]);

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
