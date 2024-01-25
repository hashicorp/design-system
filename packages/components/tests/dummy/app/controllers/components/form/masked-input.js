/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormMaskedInputController extends Controller {
  @tracked defaultText = 'Lorem ipsum dolor';
  @tracked customText = 'Lorem ipsum dolor';
  @tracked withErrorMessage = 'Lorem ipsum dolor sit amet';
  @tracked multilineDefaultText = 'Lorem ipsum dolor';
  @tracked multilineCustomText = 'Lorem ipsum dolor';
  @tracked multilineWithErrorMessage = 'Lorem ipsum dolor sit amet';

  multilineText1 = 'Lorem\nipsum\ndolor';
  multilineText2 = `Lorem
ipsum
dolor`;

  get textInputFieldIsInvalid() {
    return this.withErrorMessage.length > 20;
  }

  get textareaFieldIsInvalid() {
    return this.multilineWithErrorMessage.length > 20;
  }

  @action updateValue(propName, event) {
    this[propName] = event.target.value;
  }
}
