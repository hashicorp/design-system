/**
 * Copyright (c) HashiCorp, Inc.
 * SPDX-License-Identifier: MPL-2.0
 */

import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { deepTracked } from 'ember-deep-tracked';

import type { PageComponentsFormMaskedInputModel } from 'showcase/routes/page-components/form/masked-input';

export default class PageComponentsFormMaskedInputController extends Controller {
  declare model: PageComponentsFormMaskedInputModel;

  @deepTracked fieldValues = {
    defaultText: 'Lorem ipsum dolor',
    customText: 'Lorem ipsum dolor',
    withErrorMessage: 'Lorem ipsum dolor sit amet',
    multilineDefaultText: 'Lorem ipsum dolor',
    multilineCustomText: 'Lorem ipsum dolor',
    multilineWithErrorMessage: 'Lorem ipsum dolor sit amet',
  };

  @tracked isContentMasked = true;

  multilineText1 = 'Lorem\nipsum\ndolor';
  multilineText2 = `Lorem
ipsum
dolor`;
  maxLength = 20;

  get textInputFieldIsInvalid() {
    return this.fieldValues.withErrorMessage.length > this.maxLength;
  }

  get textareaFieldIsInvalid() {
    return this.fieldValues.multilineWithErrorMessage.length > this.maxLength;
  }

  @action updateValue(propName: keyof typeof this.fieldValues, event: Event) {
    const { value } = event.target as HTMLInputElement;
    this.fieldValues[propName] = value;
  }

  @action updateIsMasked() {
    this.isContentMasked = !this.isContentMasked;
  }
}
