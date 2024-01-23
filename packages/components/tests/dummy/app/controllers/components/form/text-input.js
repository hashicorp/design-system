/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormTextInputController extends Controller {
  @tracked defaultText = 'Lorem ipsum dolor';
  @tracked customText = 'Lorem ipsum dolor';
  @tracked withHelperText = 'Lorem ipsum dolor sit amet';

  @action
  noop() {}

  get fieldIsInvalid() {
    return this.withHelperText.length > 20;
  }

  @action updateValue(propName, event) {
    this[propName] = event.target.value;
  }
}
