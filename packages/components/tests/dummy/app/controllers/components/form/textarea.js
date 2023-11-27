/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormTextareaController extends Controller {
  @tracked fieldIsInvalid;

  @action
  noop() {}

  @action onFieldInput(args) {
    this.fieldIsInvalid = args.currentLength > args.maxLength;
  }
}
