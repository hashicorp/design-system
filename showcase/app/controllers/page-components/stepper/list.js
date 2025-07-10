/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';

const updateSteps = (steps, stepNumber) => {
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

const updateStepsProcessing = (steps, stepNumber) => {
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

export default class PageStepperListController extends Controller {
  @tracked currentStep_demo1 = 1;
  @tracked currentStep_demo2 = 1;

  @deepTracked steps_demo1 = this.model.stepsDemo1;
  @deepTracked steps_demo2 = this.model.stepsDemo2;

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
