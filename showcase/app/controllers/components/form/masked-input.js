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

  @action onFieldInput(args) {
    if (args.inputControl.localName === 'input') {
      this.textInputFieldIsInvalid = args.currentLength > args.maxLength;
    } else if (args.inputControl.localName === 'textarea') {
      this.textareaFieldIsInvalid = args.currentLength > args.maxLength;
    }
  }
}
