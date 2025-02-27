/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class StepperController extends Controller {
  queryParams = ['currentStep_demo1', 'currentStep_demo2', 'currentStep_demo3'];

  @tracked currentStep_demo1 = 1;
  @tracked currentStep_demo2 = 1;
  @tracked currentStep_demo3 = 1;

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

  @action
  onNextClickDemo1() {
    this.currentStep_demo1++;
  }

  @action
  onPreviousClickDemo1() {
    this.currentStep_demo1--;
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

  @action
  onNextClickDemo2() {
    this.currentStep_demo2++;
  }

  @action
  onPreviousClickDemo2() {
    this.currentStep_demo2--;
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

  @action
  onNextClickDemo3() {
    this.currentStep_demo3++;
  }

  @action
  onPreviousClickDemo3() {
    this.currentStep_demo3--;
  }
}
