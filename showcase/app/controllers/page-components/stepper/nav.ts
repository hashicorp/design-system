/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

import type { PageComponentsStepperNavModel } from 'showcase/routes/page-components/stepper/nav';

export default class PageComponentsStepperNavController extends Controller {
  declare model: PageComponentsStepperNavModel;

  queryParams = [
    'currentStep_demo1',
    'currentStep_demo2',
    'currentStep_demo3',
    'currentStep_demo4',
  ];

  @tracked currentStep_demo1 = 1;
  @tracked currentStep_demo2 = 1;
  @tracked currentStep_demo3 = 1;
  @tracked currentStep_demo4 = 1;
  @tracked currentStep_demo5 = 0;

  demoStep1 = {
    title: 'Step 1',
  };

  demoStep2 = {
    title: 'Step 2',
  };

  demoStepNew = {
    title: 'Step new',
  };

  demoStepLast = {
    title: 'Step last',
  };

  @tracked steps_demo5 = [this.demoStep1, this.demoStep2, this.demoStepLast];

  // =============================
  // DEMOS
  // =============================
  get currentStepDemo1() {
    return this.currentStep_demo1 !== undefined ? this.currentStep_demo1 : 1;
  }

  @action
  updateCurrentStepDemo1(_event: MouseEvent, stepNumber: number) {
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
    return this.currentStep_demo2 !== undefined ? this.currentStep_demo2 : 1;
  }

  @action
  updateCurrentStepDemo2(_event: MouseEvent, stepNumber: number) {
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
    return this.currentStep_demo3 !== undefined ? this.currentStep_demo3 : 1;
  }

  @action
  updateCurrentStepDemo3(_event: MouseEvent, stepNumber: number) {
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

  get currentStepDemo4() {
    return this.currentStep_demo4 !== undefined ? this.currentStep_demo4 : 1;
  }

  @action
  updateCurrentStepDemo4(_event: MouseEvent, stepNumber: number) {
    this.currentStep_demo4 = stepNumber;
  }

  @action
  onNextClickDemo4() {
    this.currentStep_demo4++;
  }

  @action
  onPreviousClickDemo4() {
    this.currentStep_demo4--;
  }

  get currentStepDemo5() {
    return this.currentStep_demo5 !== undefined ? this.currentStep_demo5 : 0;
  }

  @action
  updateCurrentStepDemo5(_event: MouseEvent, stepNumber: number) {
    this.currentStep_demo5 = stepNumber;
  }

  @action
  onNextClickDemo5() {
    if (this.currentStep_demo5 === 0) {
      this.steps_demo5 = [this.demoStep1, this.demoStep2, this.demoStepLast];
    }
    this.currentStep_demo5++;
  }

  @action
  onPreviousClickDemo5() {
    this.currentStep_demo5--;
  }

  @action
  onNextAddStepsClickDemo5() {
    this.currentStep_demo5++;
    this.steps_demo5 = [
      this.demoStep1,
      this.demoStep2,
      this.demoStepNew,
      this.demoStepLast,
    ];
  }
}
