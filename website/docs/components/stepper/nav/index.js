/**
 * Copyright IBM Corp. 2021, 2025
 * SPDX-License-Identifier: MPL-2.0
 */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class Index extends Component {
  @tracked demoCurrentStep = 1;

  @tracked demoButtonsCurrentStep = 0;

  @action
  demoOnStepChange(_element, stepNumber) {
    this.demoCurrentStep = stepNumber;
  }

  @action
  demoButtonsOnStepChange(_element, stepNumber) {
    this.demoButtonsCurrentStep = stepNumber;
  }

  @action
  onNextClickDemo() {
    this.demoButtonsCurrentStep++;
  }

  @action
  onPreviousClickDemo() {
    this.demoButtonsCurrentStep--;
  }
}
