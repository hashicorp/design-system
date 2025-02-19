/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StepperController extends Controller {
  queryParams = ['currentStep_demo1', 'currentStep_demo2', 'currentStep_demo3'];

  @tracked currentStep_demo1;
  @tracked currentStep_demo2;
  @tracked currentStep_demo3;

  // =============================
  // DEMOS
  // =============================
  get currentStepDemo1() {
    return this.currentStep_demo1 !== undefined
      ? parseInt(this.currentStep_demo1, 10)
      : 1;
  }

  @action
  updateCurrentStepDemo1(_element, stepNumber) {
    this.currentStep_demo1 = stepNumber;
  }

  get currentStepDemo2() {
    return this.currentStep_demo2 !== undefined
      ? parseInt(this.currentStep_demo2, 10)
      : 1;
  }

  @action
  updateCurrentStepDemo2(_element, stepNumber) {
    this.currentStep_demo2 = stepNumber;
  }

  get currentStepDemo3() {
    return this.currentStep_demo3 !== undefined
      ? parseInt(this.currentStep_demo3, 10)
      : 1;
  }

  @action
  updateCurrentStepDemo3(_element, stepNumber) {
    this.currentStep_demo3 = stepNumber;
  }
}
