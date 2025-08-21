/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { TrackedObject } from 'tracked-built-ins';

import type { PageComponentsFormTextareaModel } from 'showcase/routes/page-components/form/textarea';

export default class PageComponentsFormTextareaController extends Controller {
  declare model: PageComponentsFormTextareaModel;

  values = new TrackedObject({
    defaultText: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    customText: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco',
    withErrorMessage:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco',
  });

  maxLength = 50;

  @action
  noop() {}

  get fieldIsInvalid() {
    return this.values.withErrorMessage.length > this.maxLength;
  }

  @action
  updateValue(propName: keyof typeof this.values, event: Event) {
    const { value } = event.target as HTMLTextAreaElement;
    this.values[propName] = value;
  }
}
