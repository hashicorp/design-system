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

  @deepTracked fieldValues = {
    defaultText: 'Lorem ipsum dolor',
    customText: 'Lorem ipsum dolor',
    withHelperText: 'Lorem ipsum dolor sit amet',
  };

  maxLength = 20;

  @action
  noop() {}

  get fieldIsInvalid() {
    return this.fieldValues.withHelperText.length > this.maxLength;
  }

  @action
  updateValue(propName: keyof typeof this.fieldValues, event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.fieldValues[propName] = value;
  }
}
