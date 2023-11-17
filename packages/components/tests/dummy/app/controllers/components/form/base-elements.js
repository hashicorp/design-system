/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class BaseElementsController extends Controller {
  @tracked showHighlight = false;

  @action
  toggleHighlight() {
    this.showHighlight = !this.showHighlight;
  }

  @action
  onInput(inputControl, maxLength, minLength, currentLength, remainingLength) {
    console.log('inputControl', inputControl);
    console.log('maxLength', maxLength);
    console.log('minLength', minLength);
    console.log('currentLength', currentLength);
    console.log('remainingLength', remainingLength);
  }
}
