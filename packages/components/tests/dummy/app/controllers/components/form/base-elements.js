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
  onInput(args) {
    console.log('inputControl', args.inputControl);
    console.log('maxLength', args.maxLength);
    console.log('minLength', args.minLength);
    console.log('currentLength', args.currentLength);
    console.log('remaining', args.remaining);
    console.log('shortfall', args.shortfall);
  }
}
