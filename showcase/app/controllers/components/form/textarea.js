/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormTextareaController extends Controller {
  @tracked defaultText =
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco';
  @tracked customText =
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco';
  @tracked withErrorMessage =
    'Ut enim ad minim veniam, quis nostrud exercitation ullamco';
  maxLength = 50;

  @action
  noop() {}

  get fieldIsInvalid() {
    return this.withErrorMessage.length > this.maxLength;
  }

  @action updateValue(propName, event) {
    this[propName] = event.target.value;
  }
}
