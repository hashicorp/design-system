/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { deepTracked } from 'ember-deep-tracked';

import type { PageComponentsFormTextInputModel } from 'showcase/routes/page-components/form/text-input';

export default class PageComponentsFormTextInputController extends Controller {
  declare model: PageComponentsFormTextInputModel;

  @deepTracked values = {
    defaultText: 'Lorem ipsum dolor',
    customText: 'Lorem ipsum dolor',
    withHelperText: 'Lorem ipsum dolor sit amet',
  };

  maxLength = 20;

  @action
  noop() {}

  get fieldIsInvalid() {
    return this.values.withHelperText.length > this.maxLength;
  }

  @action
  updateValue(propName: keyof typeof this.values, event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.values[propName] = value;
  }
}
