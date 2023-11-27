/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormTextInputController extends Controller {
  @tracked fieldIsInvalid;

  @action
  noop() {}

  @action onFieldInput(
    control,
    maxLength,
    minLength,
    remaining,
    shortfall,
    currentLength
  ) {
    this.fieldIsInvalid = currentLength > maxLength;
  }
}
