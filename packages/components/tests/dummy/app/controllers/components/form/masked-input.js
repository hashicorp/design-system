/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormMaskedInputController extends Controller {
  @tracked textInputFieldIsInvalid;
  @tracked textareaFieldIsInvalid;

  @action onFieldInput(
    control,
    maxLength,
    minLength,
    remaining,
    shortfall,
    currentLength
  ) {
    if (control.localName === 'input') {
      this.textInputFieldIsInvalid = currentLength > maxLength;
    } else if (control.localName === 'textarea') {
      this.textareaFieldIsInvalid = currentLength > maxLength;
    }
  }
}
